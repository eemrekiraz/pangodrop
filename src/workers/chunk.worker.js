self.onmessage = async (event) => {
  const { file, chunkSize } = event.data || {};

  if (!file) {
    return;
  }

  let index = 0;
  for (let offset = 0; offset < file.size; offset += chunkSize) {
    const payload = await file.slice(offset, offset + chunkSize).arrayBuffer();
    self.postMessage({ index, payload }, [payload]);
    index += 1;
  }

  self.postMessage({ done: true });
};
