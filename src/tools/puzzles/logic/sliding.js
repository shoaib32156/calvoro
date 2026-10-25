import { randomInt } from "./random.js";

export function getSolvedSlidingBoard(size) {
  const total = size * size;
  const board = Array.from({ length: total }, (_, index) => index + 1);
  board[total - 1] = 0;
  return board;
}

export function getBlankIndex(board) {
  return board.indexOf(0);
}

export function areAdjacent(first, second, size) {
  if (first < 0 || second < 0 || first >= size * size || second >= size * size) {
    return false;
  }

  const firstRow = Math.floor(first / size);
  const firstColumn = first % size;
  const secondRow = Math.floor(second / size);
  const secondColumn = second % size;

  return (
    Math.abs(firstRow - secondRow) + Math.abs(firstColumn - secondColumn) === 1
  );
}

export function getSlidingLegalMoves(board, size) {
  const blank = getBlankIndex(board);
  if (blank < 0) return [];

  return board
    .map((_, index) => index)
    .filter((index) => areAdjacent(blank, index, size));
}

export function moveSlidingTile(board, index, size) {
  if (!Number.isInteger(index) || !areAdjacent(getBlankIndex(board), index, size)) {
    return null;
  }

  const next = [...board];
  const blank = getBlankIndex(board);
  [next[blank], next[index]] = [next[index], next[blank]];
  return next;
}

export function isSlidingSolved(board) {
  return board.every((value, index) =>
    index === board.length - 1 ? value === 0 : value === index + 1
  );
}

export function countSlidingInversions(board) {
  const values = board.filter((value) => value !== 0);
  let inversions = 0;

  for (let first = 0; first < values.length; first += 1) {
    for (let second = first + 1; second < values.length; second += 1) {
      if (values[first] > values[second]) inversions += 1;
    }
  }

  return inversions;
}

export function isSlidingSolvable(board, size) {
  const inversions = countSlidingInversions(board);
  const blank = getBlankIndex(board);

  if (blank < 0) return false;

  if (size % 2 === 1) return inversions % 2 === 0;

  const blankRowFromBottom = size - Math.floor(blank / size);
  return (inversions + blankRowFromBottom) % 2 === 1;
}

export function shuffleSlidingBoard(size, rng, steps = size * size * 80) {
  const random = typeof rng === "function" ? rng : Math.random;
  let board = getSolvedSlidingBoard(size);
  let previousBlank = -1;

  for (let step = 0; step < steps; step += 1) {
    const moves = getSlidingLegalMoves(board, size).filter(
      (index) => index !== previousBlank
    );

    if (!moves.length) break;

    const blank = getBlankIndex(board);
    const nextIndex = moves[randomInt(random, 0, moves.length - 1)];
    const nextBoard = moveSlidingTile(board, nextIndex, size);

    if (!nextBoard) break;
    previousBlank = blank;
    board = nextBoard;
  }

  if (isSlidingSolved(board)) {
    const moves = getSlidingLegalMoves(board, size);
    const nextBoard = moveSlidingTile(
      board,
      moves[randomInt(random, 0, moves.length - 1)],
      size
    );
    if (nextBoard) board = nextBoard;
  }

  return board;
}
