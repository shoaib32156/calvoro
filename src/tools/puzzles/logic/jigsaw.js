import { shuffleWithRng } from "./random.js";

export function createJigsawBoard(size, rng = Math.random) {
  const total = size * size;
  let board = Array.from({ length: total }, (_, index) => index);
  let attempts = 0;

  do {
    board = shuffleWithRng(board, rng);
    attempts += 1;
  } while (isJigsawSolved(board) && attempts < 20);

  return board;
}

export function isJigsawSolved(board) {
  return board.every((piece, slot) => piece === slot);
}

export function swapJigsawTiles(board, first, second) {
  if (
    !Number.isInteger(first) ||
    !Number.isInteger(second) ||
    first < 0 ||
    second < 0 ||
    first >= board.length ||
    second >= board.length ||
    first === second
  ) {
    return null;
  }

  const next = [...board];
  [next[first], next[second]] = [next[second], next[first]];
  return next;
}

export function countJigsawMisplaced(board) {
  return board.reduce(
    (total, piece, slot) => total + (piece === slot ? 0 : 1),
    0
  );
}

export function getJigsawPieceStyle(pieceIndex, size) {
  const row = Math.floor(pieceIndex / size);
  const column = pieceIndex % size;
  const last = Math.max(1, size - 1);

  return {
    backgroundSize: `${size * 100}% ${size * 100}%`,
    backgroundPosition: `${(column / last) * 100}% ${(row / last) * 100}%`,
  };
}
