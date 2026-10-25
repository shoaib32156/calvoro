import { randomInt } from "./random.js";

export const GAME_2048_DIRECTIONS = ["left", "right", "up", "down"];

const LINE_INDICES = {
  left: Array.from({ length: 4 }, (_, row) =>
    [0, 1, 2, 3].map((column) => row * 4 + column)
  ),
  right: Array.from({ length: 4 }, (_, row) =>
    [3, 2, 1, 0].map((column) => row * 4 + column)
  ),
  up: Array.from({ length: 4 }, (_, column) =>
    [0, 1, 2, 3].map((row) => row * 4 + column)
  ),
  down: Array.from({ length: 4 }, (_, column) =>
    [3, 2, 1, 0].map((row) => row * 4 + column)
  ),
};

export function createEmpty2048Board() {
  return Array(16).fill(0);
}

export function spawn2048Tile(board, rng = Math.random) {
  const emptyIndices = board
    .map((value, index) => (value === 0 ? index : -1))
    .filter((index) => index >= 0);

  if (!emptyIndices.length) return board;

  const index = emptyIndices[randomInt(rng, 0, emptyIndices.length - 1)];
  const next = [...board];
  next[index] = rng() < 0.9 ? 2 : 4;
  return next;
}

export function create2048Board(rng = Math.random) {
  let board = createEmpty2048Board();
  board = spawn2048Tile(board, rng);
  board = spawn2048Tile(board, rng);
  return board;
}

export function merge2048Line(line) {
  const compact = line.filter((value) => value > 0);
  const output = [];
  let gained = 0;

  for (let index = 0; index < compact.length; index += 1) {
    if (compact[index] === compact[index + 1]) {
      const merged = compact[index] * 2;
      output.push(merged);
      gained += merged;
      index += 1;
    } else {
      output.push(compact[index]);
    }
  }

  while (output.length < 4) output.push(0);
  return { line: output, gained };
}

export function move2048(board, direction) {
  if (!LINE_INDICES[direction]) {
    return { board, moved: false, gained: 0 };
  }

  const next = [...board];
  let gained = 0;

  for (const indices of LINE_INDICES[direction]) {
    const values = indices.map((index) => board[index]);
    const merged = merge2048Line(values);
    gained += merged.gained;
    indices.forEach((boardIndex, offset) => {
      next[boardIndex] = merged.line[offset];
    });
  }

  return {
    board: next,
    moved: next.some((value, index) => value !== board[index]),
    gained,
  };
}

export function is2048GameOver(board) {
  if (board.includes(0)) return false;

  for (let row = 0; row < 4; row += 1) {
    for (let column = 0; column < 4; column += 1) {
      const index = row * 4 + column;
      if (column < 3 && board[index] === board[index + 1]) return false;
      if (row < 3 && board[index] === board[index + 4]) return false;
    }
  }

  return true;
}

export function has2048Tile(board) {
  return board.some((value) => value >= 2048);
}

export function get2048HighestTile(board) {
  return board.reduce((highest, value) => Math.max(highest, value), 0);
}
