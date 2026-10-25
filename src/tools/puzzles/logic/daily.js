import { todayStamp } from "../../utils.js";
import { createSeededRng, randomInt } from "./random.js";

export const PUZZLE_GAME_IDS = [
  "sliding",
  "sudoku",
  "word-search",
  "memory",
  "brain-teasers",
  "jigsaw",
  "2048",
  "word-scramble",
];

export function getDailyDate() {
  return todayStamp();
}

export function getDailySeed(dateStamp, gameId) {
  return `${dateStamp}:${gameId}`;
}

export function createDailyRng(dateStamp, gameId) {
  return createSeededRng(getDailySeed(dateStamp, gameId));
}

export function getDailyIndex(dateStamp, gameId, length) {
  if (!Number.isInteger(length) || length <= 0) return -1;
  return randomInt(createDailyRng(dateStamp, gameId), 0, length - 1);
}

export function getDailyGame(dateStamp) {
  return PUZZLE_GAME_IDS[getDailyIndex(dateStamp, "game", PUZZLE_GAME_IDS.length)];
}
