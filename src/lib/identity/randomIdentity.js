const ADJECTIVES = [
  "Blue",
  "Sunny",
  "Nova",
  "Swift",
  "Luna",
  "Velvet",
  "Polar",
  "Echo"
];

const ANIMALS = [
  "Panda",
  "Fox",
  "Otter",
  "Owl",
  "Koala",
  "Lynx",
  "Whale",
  "Robin"
];

const AVATARS = ["P", "F", "O", "W", "K", "L", "R", "S"];

export function createRandomIdentity() {
  const adjective = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
  const animal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)];
  const avatar = AVATARS[Math.floor(Math.random() * AVATARS.length)];

  return {
    name: `${adjective} ${animal}`,
    avatar
  };
}
