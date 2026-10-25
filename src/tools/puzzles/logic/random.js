export function hashString(value) {
  let hash = 2166136261;
  const text = String(value);

  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

export function mulberry32(seed) {
  let state = seed >>> 0;

  return function nextRandom() {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export function createSeededRng(seed) {
  const numericSeed =
    typeof seed === "number" ? seed >>> 0 : hashString(seed);
  return mulberry32(numericSeed);
}

export function randomInt(rng, min, max) {
  return Math.floor(rng() * (max - min + 1)) + min;
}

export function pickRandom(rng, items) {
  if (!items.length) return undefined;
  return items[randomInt(rng, 0, items.length - 1)];
}

export function shuffleWithRng(items, rng) {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(rng, 0, index);
    [result[index], result[swapIndex]] = [
      result[swapIndex],
      result[index],
    ];
  }

  return result;
}

export function shuffle(items) {
  return shuffleWithRng(items, Math.random);
}
