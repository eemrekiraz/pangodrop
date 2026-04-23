export const CHUNK_SIZE = 64 * 1024;

export async function* chunkFile(file, chunkSize = CHUNK_SIZE) {
  // İŞTE VİTE VE NETLIFY'I ÇÖZECEK O SİHİRLİ SATIR BURASI (../../ yaptık)
  const worker = new Worker(new URL("../../workers/chunk.worker.js", import.meta.url), {
    type: "module",
  });

  let resolveNext = null;
  let nextChunkData = null;

  // İşçiden gelen cevapları dinle
  worker.onmessage = (e) => {
    nextChunkData = e.data;
    if (resolveNext) resolveNext();
  };

  // İşçiye dosyayı ver ve başlat
  worker.postMessage({ type: "init", file, chunkSize });
  await new Promise((r) => { resolveNext = r; }); // 'ready' gelene kadar bekle
  resolveNext = null;

  // Sırayla parçaları iste (Sonsuz Döngü - Sadece dosya bitince kırılır)
  while (true) {
    worker.postMessage({ type: "next" });
    
    // İşçi parçayı kesip gönderene kadar bekle
    await new Promise((r) => { resolveNext = r; });
    resolveNext = null;

    if (nextChunkData.type === "done") {
      break;
    }

    if (nextChunkData.type === "chunk") {
      yield {
        index: nextChunkData.index,
        payload: nextChunkData.payload,
      };
    }
  }

  // İşimiz bittiğinde işçiyi öldür (RAM'i temizle)
  worker.terminate();
}