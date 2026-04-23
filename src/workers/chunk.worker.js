// src/workers/chunk.worker.js

let currentFile = null;
let currentChunkSize = 0;
let offset = 0;
let currentIndex = 0;

self.onmessage = async (event) => {
  const { type, file, chunkSize } = event.data;

  // 1. İşçiyi hazırlama aşaması
  if (type === "init") {
    currentFile = file;
    currentChunkSize = chunkSize;
    offset = 0;
    currentIndex = 0;
    self.postMessage({ type: "ready" });
  } 
  
  // 2. Ana ekrandan "Sıradaki parçayı gönder" emri geldiğinde
  else if (type === "next") {
    if (!currentFile || offset >= currentFile.size) {
      self.postMessage({ type: "done" });
      return;
    }

    // Dosyadan bir dilim kes (Slice anında belleği yormaz)
    const blob = currentFile.slice(offset, offset + currentFile.chunkSize || currentChunkSize);
    const payload = await blob.arrayBuffer();

    // Veriyi kopyalamadan (Sıfır RAM tüketimiyle) ana ekrana fırlat
    self.postMessage(
      { type: "chunk", index: currentIndex, payload },
      [payload]
    );

    offset += currentChunkSize;
    currentIndex += 1;
  }
};