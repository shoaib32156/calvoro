import { randomInt, shuffleWithRng } from "./random.js";

export function normalizeScrambleWord(value) {
  return String(value).toUpperCase().replace(/[^A-Z]/g, "");
}

export function scrambleWord(word, rng = Math.random) {
  const answer = normalizeScrambleWord(word);

  if (answer.length < 2) {
    return { answer, scrambled: answer };
  }

  let letters = [...answer];

  for (let attempt = 0; attempt < 24; attempt += 1) {
    letters = shuffleWithRng([...answer], rng);
    if (letters.join("") !== answer) break;
  }

  return { answer, scrambled: letters.join("") };
}

export function isScrambleCorrect(answer, guess) {
  const normalizedAnswer = normalizeScrambleWord(answer);
  return (
    normalizedAnswer.length > 0 &&
    normalizedAnswer === normalizeScrambleWord(guess)
  );
}

export function createScrambleRounds(entries, count, rng = Math.random) {
  const rounds = [];
  let pool = shuffleWithRng(entries, rng);
  let poolIndex = 0;

  while (rounds.length < count && entries.length) {
    if (poolIndex >= pool.length) {
      pool = shuffleWithRng(entries, rng);
      poolIndex = 0;
    }

    const entry = pool[poolIndex];
    poolIndex += 1;
    const scrambled = scrambleWord(entry.word, rng);
    rounds.push({
      word: entry.word,
      clue: entry.clue || "",
      answer: scrambled.answer,
      scrambled: scrambled.scrambled,
    });
  }

  return rounds;
}

export function getScrambleLetterSlots(word) {
  return normalizeScrambleWord(word).split("");
}

export function getRandomScrambleIndex(rng, count) {
  if (count <= 0) return 0;
  return randomInt(rng, 0, count - 1);
}
