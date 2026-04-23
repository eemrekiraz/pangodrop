export const CHUNK_SIZE = 64 * 1024;

export async function* chunkFile(file, chunkSize = CHUNK_SIZE) {
  let index = 0;

  for (let offset = 0; offset < file.size; offset += chunkSize) {
    const blob = file.slice(offset, offset + chunkSize);
    const payload = await blob.arrayBuffer();

    yield {
      index,
      payload
    };

    index += 1;
  }
}
