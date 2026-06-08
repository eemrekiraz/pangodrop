// En temel, evrensel ve sade renkler
const COLORS = [
  { name: "Red", emoji: "🔴" },
  { name: "Blue", emoji: "🔵" },
  { name: "Green", emoji: "🟢" },
  { name: "Yellow", emoji: "🟡" },
  { name: "Purple", emoji: "🟣" },
  { name: "Orange", emoji: "🟠" },
  { name: "Black", emoji: "⚫" },
  { name: "White", emoji: "⚪" },
  { name: "Brown", emoji: "🟤" }
];

export function createRandomIdentity() {
  const color = COLORS[Math.floor(Math.random() * COLORS.length)];

  return {
    name: color.name,
    avatar: color.emoji
  };
}