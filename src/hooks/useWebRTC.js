import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Peer from "peerjs";
import { createRandomIdentity } from "../lib/identity/randomIdentity";
import { generateRoomCode } from "../lib/peer/roomCode";
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
        if (!packet || typeof packet !== "object") {
          return;
        }

        if (packet.type === "intro") {
          setRemotePeer(packet.payload);
          return;
        }

        if (packet.type === "file-meta") {
          cancelRequestedRef.current = false;
          incomingRef.current = {
            transferId: packet.transferId,
            meta: packet,
            chunks: new Array(packet.totalChunks)
          };

          setTransfer({
            phase: "receiving",
            fileName: packet.fileName,
            totalBytes: packet.fileSize,
            transferredBytes: 0,
            percent: 0,
            speedBytesPerSecond: 0,
            remainingSeconds: 0
          });
          return;
        }

        if (packet.type === "file-chunk") {
          const incoming = incomingRef.current;
          if (!incoming.meta || incoming.transferId !== packet.transferId) {
            return;
          }

          incoming.chunks[packet.index] = packet.payload;

          setTransfer((current) => {
            const transferredBytes = current.transferredBytes + packet.payload.byteLength;
            const speed = Math.max(packet.throughput || current.speedBytesPerSecond, 0);
            const remaining = Math.max(current.totalBytes - transferredBytes, 0);

            return {
              ...current,
              phase: "receiving",
              transferredBytes,
              percent: current.totalBytes ? (transferredBytes / current.totalBytes) * 100 : 0,
              speedBytesPerSecond: speed,
              remainingSeconds: speed > 0 ? remaining / speed : 0
            };
          });
          return;
        }

        if (packet.type === "file-complete") {
          const incoming = incomingRef.current;
          const blob = new Blob(incoming.chunks, {
            type: incoming.meta?.fileType || "application/octet-stream"
          });

          downloadBlob(blob, incoming.meta?.fileName || "download");
          triggerTransferHaptics();

          setTransfer((current) => ({
            ...current,
            phase: "completed",
            transferredBytes: current.totalBytes,
            percent: 100,
            remainingSeconds: 0
          }));

          connection.send({ type: "transfer-ack", transferId: packet.transferId });
          return;
        }

        if (packet.type === "transfer-cancel") {
          resetTransfer();
          return;
        }

        if (packet.type === "transfer-ack") {
          triggerTransferHaptics();
          outgoingTransferIdRef.current = null;
          setTransfer((current) => ({
            ...current,
            phase: "completed",
            percent: 100,
            remainingSeconds: 0
          }));
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
    // Sadece 6 haneli rastgele bir RAKAM üretiyoruz
    const generateNumericCode = () => {
      return Math.floor(100000 + Math.random() * 900000).toString();
    };
    
    const myCode = generateNumericCode();
    const customPeerId = `pangodrop-${myCode}`;

    // PeerJS'e kimliğimizi veriyoruz
    const peer = new Peer(customPeerId, {
      debug: 1
    });

    peerRef.current = peer;

    peer.on("open", (id) => {
      setPeerId(myCode);
      setRoomCode(myCode); // Kullanıcı sadece myCode (6 rakam) görecek
      setShareLink(`${window.location.origin}?peer=${encodeURIComponent(id)}`);
      setConnectionState("ready");

      const peerFromUrl = new URLSearchParams(window.location.search).get("peer");
      if (peerFromUrl && peerFromUrl !== id) {
        const outbound = peer.connect(peerFromUrl, { reliable: true });
        attachConnection(outbound);
      }
    });

    peer.on("connection", (connection) => {
      attachConnection(connection);
    });

    peer.on("error", () => {
      setConnectionState("error");
    });

    return () => {
      connectionRef.current?.close();
      peer.destroy();
    };
  }, [attachConnection]);

  const connectToPeer = useCallback(
    (value) => {
      let targetPeerId = value.trim();
      
      // EĞER KULLANICI SADECE 6 RAKAM GİRDİYSE, GİZLİCE ÖNEK EKLE
      if (/^\d{6}$/.test(targetPeerId)) {
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
    async (file) => {
      const connection = connectionRef.current;

      if (!connection?.open || !file) {
        return;
      }

      const transferId = crypto.randomUUID();
      const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
      const startedAt = performance.now();
      let sentBytes = 0;
      cancelRequestedRef.current = false;
      outgoingTransferIdRef.current = transferId;

      setTransfer({
        phase: "sending",
        fileName: file.name,
        totalBytes: file.size,
        transferredBytes: 0,
        percent: 0,
        speedBytesPerSecond: 0,
        remainingSeconds: 0
      });

      connection.send({
        type: "file-meta",
        transferId,
        fileName: file.name,
        fileType: file.type || "application/octet-stream",
        fileSize: file.size,
        totalChunks
      });

      for await (const chunk of chunkFile(file, CHUNK_SIZE)) {
        if (cancelRequestedRef.current) {
          outgoingTransferIdRef.current = null;
          return;
        }

        while (connection.dataChannel?.bufferedAmount > CHUNK_SIZE * 4) {
          await wait(16);
        }

        sentBytes += chunk.payload.byteLength;
        const elapsedSeconds = Math.max((performance.now() - startedAt) / 1000, 0.001);
        const speedBytesPerSecond = sentBytes / elapsedSeconds;
        const remainingSeconds = Math.max(file.size - sentBytes, 0) / speedBytesPerSecond;

        connection.send({
          type: "file-chunk",
          transferId,
          index: chunk.index,
          payload: chunk.payload,
          throughput: speedBytesPerSecond
        });

        setTransfer({
          phase: "sending",
          fileName: file.name,
          totalBytes: file.size,
          transferredBytes: sentBytes,
          percent: (sentBytes / file.size) * 100,
          speedBytesPerSecond,
          remainingSeconds
        });

        await wait(0);
      }

      if (cancelRequestedRef.current) {
        outgoingTransferIdRef.current = null;
        return;
      }

      connection.send({ type: "file-complete", transferId });
    },
    []
  );

  const cancelTransfer = useCallback(() => {
    cancelRequestedRef.current = true;

    const connection = connectionRef.current;
    const transferId = outgoingTransferIdRef.current || incomingRef.current.transferId;

    if (connection?.open && transferId) {
      connection.send({
        type: "transfer-cancel",
        transferId
      });
    }

    resetTransfer();
  }, [resetTransfer]);

  return {
    identity,
    peerId,
    roomCode,
    shareLink,
    remotePeer,
    connectionState,
    transfer,
    connectToPeer,
    sendFile,
    cancelTransfer,
    resetTransfer
  };
}