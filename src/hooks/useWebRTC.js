import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Peer from "peerjs";
import { createRandomIdentity } from "../lib/identity/randomIdentity";
// import { generateRoomCode } from "../lib/peer/roomCode"; // (Bunu artık kullanmayabilirsin, kod kendi üretiyor)
import { chunkFile, CHUNK_SIZE } from "../lib/transfer/chunkFile";
import { triggerTransferHaptics } from "../lib/utils/vibration";

const INITIAL_TRANSFER = {
  phase: "idle",
  fileName: "",
  totalBytes: 0,
  transferredBytes: 0,
  percent: 0,
  speedBytesPerSecond: 0,
  remainingSeconds: 0
};

function wait(ms) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

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
  
  // YENİ: Bekleme odası sayacını hafızada tutmak için
  const timeoutRef = useRef(null); 

  const incomingRef = useRef({
    transferId: null,
    meta: null,
    chunks: []
  });

  const [peerId, setPeerId] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [connectionState, setConnectionState] = useState("booting");
  const [remotePeer, setRemotePeer] = useState(null);
  const [transfer, setTransfer] = useState(INITIAL_TRANSFER);

  const resetTransfer = useCallback(() => {
    cancelRequestedRef.current = false;
    outgoingTransferIdRef.current = null;
    incomingRef.current = {
      transferId: null,
      meta: null,
      chunks: []
    };
    setTransfer(INITIAL_TRANSFER);
  }, []);

  const attachConnection = useCallback(
    (connection) => {
      if (!connection) {
        return;
      }

      // --- C ŞIKKI KURTARICI: Biri bağlandığı an sayacı durdur! ---
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
        console.log("Bağlantı sağlandı! 10 dakikalık zaman aşımı iptal edildi.");
      }

      connectionRef.current = connection;
      setConnectionState("connecting");

      connection.on("open", () => {
        setConnectionState("connected");
        connection.send({
          type: "intro",
          payload: {
            name: identity.name,
            avatar: identity.avatar,
            peerId: peerRef.current?.id || ""
          }
        });
      });

      connection.on("data", async (packet) => {
        // ... (Eski data dinleme kodların tamamen aynı kalıyor)
        if (!packet || typeof packet !== "object") return;
        if (packet.type === "intro") { setRemotePeer(packet.payload); return; }
        if (packet.type === "file-meta") {
          cancelRequestedRef.current = false;
          incomingRef.current = { transferId: packet.transferId, meta: packet, chunks: new Array(packet.totalChunks) };
          setTransfer({ phase: "receiving", fileName: packet.fileName, totalBytes: packet.fileSize, transferredBytes: 0, percent: 0, speedBytesPerSecond: 0, remainingSeconds: 0 });
          return;
        }
        if (packet.type === "file-chunk") {
          const incoming = incomingRef.current;
          if (!incoming.meta || incoming.transferId !== packet.transferId) return;
          incoming.chunks[packet.index] = packet.payload;
          setTransfer((current) => {
            const transferredBytes = current.transferredBytes + packet.payload.byteLength;
            const speed = Math.max(packet.throughput || current.speedBytesPerSecond, 0);
            const remaining = Math.max(current.totalBytes - transferredBytes, 0);
            return { ...current, phase: "receiving", transferredBytes, percent: current.totalBytes ? (transferredBytes / current.totalBytes) * 100 : 0, speedBytesPerSecond: speed, remainingSeconds: speed > 0 ? remaining / speed : 0 };
          });
          return;
        }
        if (packet.type === "file-complete") {
          const incoming = incomingRef.current;
          const blob = new Blob(incoming.chunks, { type: incoming.meta?.fileType || "application/octet-stream" });
          downloadBlob(blob, incoming.meta?.fileName || "download");
          triggerTransferHaptics();
          setTransfer((current) => ({ ...current, phase: "completed", transferredBytes: current.totalBytes, percent: 100, remainingSeconds: 0 }));
          connection.send({ type: "transfer-ack", transferId: packet.transferId });
          return;
        }
        if (packet.type === "transfer-cancel") { resetTransfer(); return; }
        if (packet.type === "transfer-ack") {
          triggerTransferHaptics();
          outgoingTransferIdRef.current = null;
          setTransfer((current) => ({ ...current, phase: "completed", percent: 100, remainingSeconds: 0 }));
        }
      });

      connection.on("close", () => {
        connectionRef.current = null;
        setRemotePeer(null);
        setConnectionState("ready");
        resetTransfer();
      });

      connection.on("error", () => {
        setConnectionState("error");
      });
    },
    [identity.avatar, identity.name, resetTransfer]
  );

  useEffect(() => {
    // Kapsayıcı bir başlatma fonksiyonu oluşturduk (Çakışma olursa kendini tekrar çağırabilsin diye)
    const initPeer = () => {
      // 7 HANELİ RAKAM ÜRETİCİSİ (1.000.000 - 9.999.999 arası 9 milyon ihtimal)
      const generateNumericCode = () => {
        return Math.floor(1000000 + Math.random() * 9000000).toString();
      };
      
      const myCode = generateNumericCode();
      const customPeerId = `pangodrop-${myCode}`;

      const peer = new Peer(customPeerId, { debug: 1 });
      peerRef.current = peer;

      peer.on("open", (id) => {
        setPeerId(myCode);
        setRoomCode(myCode); // Kullanıcı sadece 7 rakam görecek
        setShareLink(`${window.location.origin}?peer=${encodeURIComponent(id)}`);
        setConnectionState("ready");

        // --- C ŞIKKI: AKILLI BEKLEME SÜRESİ (10 DAKİKA) ---
        timeoutRef.current = setTimeout(() => {
          peer.destroy();
          alert("Güvenlik nedeniyle 10 dakikalık bekleme süresi doldu. Lütfen sayfayı yenileyerek yeni bir kod alın.");
          setConnectionState("error");
        }, 10 * 60 * 1000);

        const peerFromUrl = new URLSearchParams(window.location.search).get("peer");
        if (peerFromUrl && peerFromUrl !== id) {
          const outbound = peer.connect(peerFromUrl, { reliable: true });
          attachConnection(outbound);
        }
      });

      peer.on("connection", (connection) => {
        attachConnection(connection);
      });

      peer.on("error", (err) => {
        // --- B ŞIKKI: ÇAKIŞMA KALKANI ---
        if (err.type === "unavailable-id") {
          console.warn("Milyonda bir ihtimal gerçekleşti! Kod başkasında var, gizlice yenisi üretiliyor...");
          peer.destroy(); // Çakışan bağlantıyı yok et
          initPeer(); // Baştan temiz bir şekilde tekrar başlat
        } else {
          setConnectionState("error");
        }
      });
    };

    initPeer(); // Sistemi ilk kez çalıştır

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      connectionRef.current?.close();
      peerRef.current?.destroy();
    };
  }, [attachConnection]);

  const connectToPeer = useCallback(
    (value) => {
      let targetPeerId = value.trim();
      
      // YENİ: EĞER KULLANICI SADECE 6 VEYA 7 RAKAM GİRDİYSE ÖNEK EKLE 
      // (Geçiş sürecinde 6 girenleri de bozmamak için {6,7} yaptık)
      if (/^\d{6,7}$/.test(targetPeerId)) {
        targetPeerId = `pangodrop-${targetPeerId}`;
      } else {
        targetPeerId = resolvePeerInput(targetPeerId);
      }

      if (!targetPeerId || !peerRef.current) {
        return false;
      }

      const connection = peerRef.current.connect(targetPeerId, { reliable: true });
      attachConnection(connection);
      return true;
    },
    [attachConnection]
  );

  const sendFile = useCallback(
    async (fileOrFiles) => {
      const connection = connectionRef.current;
      if (!connection?.open || !fileOrFiles) return;

      // Tek dosya veya dizi gelme ihtimaline karşı veriyi diziye çevir
      const files = Array.isArray(fileOrFiles) ? fileOrFiles : [fileOrFiles];
      if (files.length === 0) return;

      cancelRequestedRef.current = false;

      // Dosyaları sırayla (kuyruk mantığıyla) gönder
      for (let i = 0; i < files.length; i++) {
        if (cancelRequestedRef.current) break;

        const file = files[i];
        const transferId = crypto.randomUUID();
        const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
        const startedAt = performance.now();
        let sentBytes = 0;
        
        outgoingTransferIdRef.current = transferId;

        setTransfer({ phase: "sending", fileName: file.name, totalBytes: file.size, transferredBytes: 0, percent: 0, speedBytesPerSecond: 0, remainingSeconds: 0 });

        connection.send({ type: "file-meta", transferId, fileName: file.name, fileType: file.type || "application/octet-stream", fileSize: file.size, totalChunks });

        for await (const chunk of chunkFile(file, CHUNK_SIZE)) {
          if (cancelRequestedRef.current) { outgoingTransferIdRef.current = null; break; }
          while (connection.dataChannel?.bufferedAmount > CHUNK_SIZE * 4) { await wait(16); }
          
          sentBytes += chunk.payload.byteLength;
          const elapsedSeconds = Math.max((performance.now() - startedAt) / 1000, 0.001);
          const speedBytesPerSecond = sentBytes / elapsedSeconds;
          const remainingSeconds = Math.max(file.size - sentBytes, 0) / speedBytesPerSecond;

          connection.send({ type: "file-chunk", transferId, index: chunk.index, payload: chunk.payload, throughput: speedBytesPerSecond });
          setTransfer({ phase: "sending", fileName: file.name, totalBytes: file.size, transferredBytes: sentBytes, percent: (sentBytes / file.size) * 100, speedBytesPerSecond, remainingSeconds });
          await wait(0);
        }

        if (cancelRequestedRef.current) { outgoingTransferIdRef.current = null; break; }

        connection.send({ type: "file-complete", transferId });

        // YENİ: Karşı tarafın dosyayı indirip "tamamdır aldım (ack)" demesini bekle!
        while (outgoingTransferIdRef.current === transferId) {
          if (cancelRequestedRef.current) break;
          await wait(100);
        }
        
        // Sıradaki dosyaya geçmeden önce bağlantı nefes alsın diye 500ms bekle
        if (i < files.length - 1) {
          await wait(500);
        }
      }
    },
    []
  );

  const cancelTransfer = useCallback(() => {
    cancelRequestedRef.current = true;
    const connection = connectionRef.current;
    const transferId = outgoingTransferIdRef.current || incomingRef.current.transferId;
    if (connection?.open && transferId) { connection.send({ type: "transfer-cancel", transferId }); }
    resetTransfer();
  }, [resetTransfer]);

  return { identity, peerId, roomCode, shareLink, remotePeer, connectionState, transfer, connectToPeer, sendFile, cancelTransfer, resetTransfer };
}