export function generateRoomCode(peerId) {
  const source = (peerId || "000000").replace(/[^a-z0-9]/gi, "").toUpperCase();
  return source.slice(0, 6).padEnd(6, "0");
}
