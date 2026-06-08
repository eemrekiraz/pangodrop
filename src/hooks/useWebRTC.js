import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Peer from "peerjs";
import { createRandomIdentity } from "../lib/identity/randomIdentity";
import { triggerTransferHaptics } from "../lib/utils/vibration";

const SAFE_CHUNK_SIZE = 16384; 

const INITIAL_TRANSFER = {
  phase: "idle",
  fileName: "",
  totalBytes: 0,
  transferredBytes: 0,
  percent: 0,
  speedBytesPerSecond: 0,
  remainingSeconds: 0
};

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function resolvePeerInput(value) {
  try {
    const asUrl = new URL(value);
    return asUrl.searchParams.get("peer") || value;
  } catch {
    return value.toUpperCase();
  }
}

export function useWebRTC() {
  const identity = useMemo(() => createRandomIdentity(), []);
  const peerRef = useRef(null);
  const connectionRef = useRef(null);
  const cancelRequestedRef = useRef(false);
  const outgoingTransferIdRef = useRef(null);
  const timeoutRef = useRef(null);
  const lastUiUpdateRef = useRef(0);

  const incomingRef = useRef({
    transferId: null,
    meta: null,
    chunks: [],
    receivedCount: 0,
    fileHandle: null,
    writable: null
  });

  const [peerId, setPeerId] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [connectionState, setConnectionState] = useState("booting");
  const [remotePeer, setRemotePeer] = useState(null);
  const [transfer, setTransfer] = useState(INITIAL_TRANSFER);

  // TEMİZLİK: OPFS (Hard disk) üzerindeki geçici kalıntıları siler
  const resetTransfer = useCallback(() => {
    cancelRequestedRef.current = false;
    outgoingTransferIdRef.current = null;

    const incoming = incomingRef.current;
    if (incoming.writable) {
      incoming.writable.abort().catch(() => {});
      if (incoming.transferId) {
        navigator.storage.getDirectory()
          .then(root => root.removeEntry(`temp-${incoming.transferId}`).catch(() => {}))
          .catch(() => {});
      }
    }

    incomingRef.current = { transferId: null, meta: null, chunks: [], receivedCount: 0, fileHandle: null, writable: null };
    lastUiUpdateRef.current = 0;
    setTransfer(INITIAL_TRANSFER);
  }, []);

  const attachConnection = useCallback(
    (connection) => {
      if (!connection) return;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }

      connectionRef.current = connection;
      setConnectionState("connecting");

      connection.on("open", () => {
        setConnectionState("connected");
        connection.send({ type: "intro", payload: { name: identity.name, avatar: identity.avatar, peerId: peerRef.current?.id || "" } });
      });

      connection.on("data", async (packet) => {
        if (!packet || typeof packet !== "object") return;
        if (packet.type === "intro") { setRemotePeer(packet.payload); return; }

        if (packet.type === "file-meta") {
          cancelRequestedRef.current = false;
          let fileHandle = null;
          let writable = null;

          // YENİ: RAM YERİNE DOĞRUDAN DİSKE YAZMA (OPFS) BAŞLATILMASI
          try {
            if (navigator.storage && navigator.storage.getDirectory) {
              const root = await navigator.storage.getDirectory();
              fileHandle = await root.getFileHandle(`temp-${packet.transferId}`, { create: true });
              writable = await fileHandle.createWritable();
            }
          } catch (err) {
            console.warn("Cihaz diske yazmayı desteklemiyor, RAM kullanılıyor.", err);
          }

          incomingRef.current = {
            transferId: packet.transferId,
            meta: packet,
            chunks: writable ? null : [], // Diske yazamıyorsa eski RAM usulüne dön
            receivedCount: 0,
            fileHandle,
            writable
          };

          setTransfer({ phase: "receiving", fileName: packet.fileName, totalBytes: packet.fileSize, transferredBytes: 0, percent: 0, speedBytesPerSecond: 0, remainingSeconds: 0 });
          return;
        }

        if (packet.type === "file-chunk") {
          const incoming = incomingRef.current;
          if (!incoming.meta || incoming.transferId !== packet.transferId) return;

          // YENİ: GELEN PARÇAYI RAM'E DEĞİL, ANINDA DİSKE YAZ
          if (incoming.writable) {
            await incoming.writable.write(packet.payload);
            incoming.receivedCount++;
          } else {
            if (!incoming.chunks[packet.index]) {
              incoming.chunks[packet.index] = packet.payload;
              incoming.receivedCount++;
            }
          }

          const now = performance.now();
          if (now - lastUiUpdateRef.current > 100 || incoming.receivedCount === incoming.meta.totalChunks) {
            lastUiUpdateRef.current = now;
            setTransfer((current) => {
              const transferredBytes = incoming.receivedCount * SAFE_CHUNK_SIZE;
              const speed = packet.throughput || current.speedBytesPerSecond;
              const remaining = Math.max(current.totalBytes - transferredBytes, 0);
              return { ...current, phase: "receiving", transferredBytes, percent: Math.min((transferredBytes / current.totalBytes) * 100, 100), speedBytesPerSecond: speed, remainingSeconds: speed > 0 ? remaining / speed : 0 };
            });
          }

          // DOSYA EKSİKSİZ TAMAMLANDIĞINDA
          if (incoming.receivedCount === incoming.meta.totalChunks) {
            let downloadTarget;

            if (incoming.writable) {
              await incoming.writable.close();
              downloadTarget = await incoming.fileHandle.getFile(); // RAM harcamadan diskteki dosyayı çağır
            } else {
              downloadTarget = new Blob(incoming.chunks, { type: incoming.meta.fileType || "application/octet-stream" });
            }

            downloadBlob(downloadTarget, incoming.meta.fileName || "download");
            triggerTransferHaptics();

            setTransfer((current) => ({ ...current, phase: "completed", transferredBytes: current.totalBytes, percent: 100, remainingSeconds: 0 }));
            connection.send({ type: "transfer-ack", transferId: packet.transferId });

            // Diske yazdığımız geçici dosyayı temizle ki cihazda yer kaplamasın
            if (incoming.writable) {
              try {
                const root = await navigator.storage.getDirectory();
                await root.removeEntry(`temp-${packet.transferId}`);
              } catch (e) { console.error("Geçici dosya silinemedi", e); }
            }
          }
          return;
        }

        if (packet.type === "transfer-cancel") { resetTransfer(); return; }
        if (packet.type === "transfer-ack") {
          triggerTransferHaptics();
          outgoingTransferIdRef.current = null;
          setTransfer((current) => ({ ...current, phase: "completed", percent: 100, remainingSeconds: 0 }));
        }
      });

      connection.on("close", () => { connectionRef.current = null; setRemotePeer(null); setConnectionState("ready"); resetTransfer(); });
      connection.on("error", () => setConnectionState("error"));
    },
    [identity.avatar, identity.name, resetTransfer]
  );

  useEffect(() => {
    const initPeer = () => {
      const myCode = Math.floor(1000000 + Math.random() * 9000000).toString();
      const customPeerId = `pangodrop-${myCode}`;
      
      const peer = new Peer(customPeerId, {
        debug: 1,
        config: {
          iceServers: [
            { urls: "stun:stun.l.google.com:19302" },
            { urls: "stun:global.stun.twilio.com:3478" },
            { urls: "turn:openrelay.metered.ca:80", username: "openrelayproject", credential: "openrelayproject" },
            { urls: "turn:openrelay.metered.ca:443", username: "openrelayproject", credential: "openrelayproject" },
            { urls: "turn:openrelay.metered.ca:443?transport=tcp", username: "openrelayproject", credential: "openrelayproject" }
          ]
        }
      });
      
      peerRef.current = peer;

      peer.on("open", (id) => {
        setPeerId(myCode);
        setRoomCode(myCode);
        setShareLink(`${window.location.origin}?peer=${encodeURIComponent(id)}`);
        setConnectionState("ready");
        timeoutRef.current = setTimeout(() => { peer.destroy(); setConnectionState("error"); }, 10 * 60 * 1000);

        const peerFromUrl = new URLSearchParams(window.location.search).get("peer");
        if (peerFromUrl && peerFromUrl !== id) attachConnection(peer.connect(peerFromUrl, { reliable: true }));
      });
      peer.on("connection", attachConnection);
      peer.on("error", (err) => {
        if (err.type === "unavailable-id") { peer.destroy(); initPeer(); }
        else { setConnectionState("error"); }
      });
    };
    initPeer();
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); connectionRef.current?.close(); peerRef.current?.destroy(); };
  }, [attachConnection]);

  const connectToPeer = useCallback((value) => {
    let targetPeerId = value.trim();
    if (/^\d{6,7}$/.test(targetPeerId)) targetPeerId = `pangodrop-${targetPeerId}`;
    else targetPeerId = resolvePeerInput(targetPeerId);
    if (!targetPeerId || !peerRef.current) return false;
    attachConnection(peerRef.current.connect(targetPeerId, { reliable: true }));
    return true;
  }, [attachConnection]);

  const sendFile = useCallback(async (fileOrFiles) => {
    const connection = connectionRef.current;
    if (!connection?.open || !fileOrFiles) return;

    const files = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles];
    if (files.length === 0) return;

    cancelRequestedRef.current = false;
    const dc = connection.dataChannel || connection._dataChannel;

    for (let i = 0; i < files.length; i++) {
      if (cancelRequestedRef.current) break;

      const file = files[i];
      const transferId = crypto.randomUUID();
      const totalChunks = Math.ceil(file.size / SAFE_CHUNK_SIZE);
      let sentBytes = 0;
      const startedAt = performance.now();

      outgoingTransferIdRef.current = transferId;
      setTransfer({ phase: "sending", fileName: file.name, totalBytes: file.size, transferredBytes: 0, percent: 0, speedBytesPerSecond: 0, remainingSeconds: 0 });
      connection.send({ type: "file-meta", transferId, fileName: file.name, fileType: file.type || "application/octet-stream", fileSize: file.size, totalChunks });

      let offset = 0;
      let chunkIndex = 0;

      while (offset < file.size) {
        if (cancelRequestedRef.current) break;

        if (dc && dc.bufferedAmount > 65536) {
          await new Promise(r => setTimeout(r, 10));
          continue; 
        }

        const slice = file.slice(offset, offset + SAFE_CHUNK_SIZE);
        const buffer = await slice.arrayBuffer();

        sentBytes += buffer.byteLength;
        const elapsedSeconds = Math.max((performance.now() - startedAt) / 1000, 0.001);
        const speedBytesPerSecond = sentBytes / elapsedSeconds;
        const remainingSeconds = Math.max(file.size - sentBytes, 0) / speedBytesPerSecond;

        connection.send({ type: "file-chunk", transferId, index: chunkIndex, payload: buffer, throughput: speedBytesPerSecond });

        const now = performance.now();
        if (now - lastUiUpdateRef.current > 100) {
          lastUiUpdateRef.current = now;
          setTransfer({ phase: "sending", fileName: file.name, totalBytes: file.size, transferredBytes: sentBytes, percent: (sentBytes / file.size) * 100, speedBytesPerSecond, remainingSeconds });
        }

        offset += SAFE_CHUNK_SIZE;
        chunkIndex++;
      }

      if (cancelRequestedRef.current) { outgoingTransferIdRef.current = null; break; }

      while (outgoingTransferIdRef.current === transferId) {
        if (cancelRequestedRef.current) break;
        await new Promise(r => setTimeout(r, 50));
      }
      
      if (i < files.length - 1) await new Promise(r => setTimeout(r, 500));
    }
  }, []);

  const cancelTransfer = useCallback(() => {
    cancelRequestedRef.current = true;
    const connection = connectionRef.current;
    const transferId = outgoingTransferIdRef.current || incomingRef.current.transferId;
    if (connection?.open && transferId) connection.send({ type: "transfer-cancel", transferId });
    resetTransfer();
  }, [resetTransfer]);

  return { identity, peerId, roomCode, shareLink, remotePeer, connectionState, transfer, connectToPeer, sendFile, cancelTransfer, resetTransfer };
}