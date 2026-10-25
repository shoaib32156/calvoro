import { randomInt } from "./random.js";

export const WORD_SEARCH_DIRECTIONS = [
  [0, 1],
  [1, 0],
  [1, 1],
  [-1, 1],
  [0, -1],
  [-1, 0],
  [-1, -1],
  [1, -1],
];

const FILLER_LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export function normalizeWordSearchWord(word) {
  return String(word).toUpperCase().replace(/[^A-Z]/g, "");
}

function directionRange(length, step, size) {
  if (step === 1) return [0, size - length];
  if (step === -1) return [length - 1, size - 1];
  return [0, size - 1];
}

function canPlaceWord(grid, word, row, column, rowStep, columnStep) {
  for (let index = 0; index < word.length; index += 1) {
    const cell = grid[row + index * rowStep][column + index * columnStep];
    if (cell && cell !== word[index]) return false;
  }
  return true;
}

export function placeWordSearchWord(grid, word, rng, directions = WORD_SEARCH_DIRECTIONS) {
  const size = grid.length;
  const attempts = size * size * 6;

  for (let attempt = 0; attempt < attempts; attempt += 1) {
    const [rowStep, columnStep] =
      directions[randomInt(rng, 0, directions.length - 1)];
    const [minimumRow, maximumRow] = directionRange(word.length, rowStep, size);
    const [minimumColumn, maximumColumn] = directionRange(
      word.length,
      columnStep,
      size
    );

    if (maximumRow < minimumRow || maximumColumn < minimumColumn) continue;

    const row = randomInt(rng, minimumRow, maximumRow);
    const column = randomInt(rng, minimumColumn, maximumColumn);

    if (!canPlaceWord(grid, word, row, column, rowStep, columnStep)) {
      continue;
    }

    const cells = [];
    for (let index = 0; index < word.length; index += 1) {
      const nextRow = row + index * rowStep;
      const nextColumn = column + index * columnStep;
      grid[nextRow][nextColumn] = word[index];
      cells.push({ row: nextRow, column: nextColumn });
    }

    return {
      word,
      row,
      column,
      rowStep,
      columnStep,
      cells,
    };
  }

  return null;
}

export function generateWordSearch({ words, size = 12, rng = Math.random }) {
  const normalized = [];
  const seen = new Set();

  for (const candidate of words) {
    const word = normalizeWordSearchWord(candidate);
    if (word.length < 3 || word.length > size || seen.has(word)) continue;
    seen.add(word);
    normalized.push(word);
  }

  if (!normalized.length) {
    return {
      size,
      grid: [],
      placements: [],
      words: [],
      unplaced: [],
      error: "Add at least one word that fits on the board.",
    };
  }

  const grid = Array.from({ length: size }, () => Array(size).fill(""));
  const placements = [];
  const unplaced = [];
  const ordered = [...normalized].sort((first, second) => second.length - first.length);

  for (const word of ordered) {
    const placement = placeWordSearchWord(grid, word, rng);
    if (placement) placements.push(placement);
    else unplaced.push(word);
  }

  for (let row = 0; row < size; row += 1) {
    for (let column = 0; column < size; column += 1) {
      if (!grid[row][column]) {
        grid[row][column] = FILLER_LETTERS[randomInt(rng, 0, FILLER_LETTERS.length - 1)];
      }
    }
  }

  return {
    size,
    grid,
    placements,
    words: normalized,
    unplaced,
    error: "",
  };
}

export function getWordSearchLine(grid, start, end) {
  if (!start || !end || !grid.length) return null;
  if (
    !Number.isInteger(start.row) ||
    !Number.isInteger(start.column) ||
    !Number.isInteger(end.row) ||
    !Number.isInteger(end.column)
  ) {
    return null;
  }

  const rowDelta = end.row - start.row;
  const columnDelta = end.column - start.column;
  const length = Math.max(Math.abs(rowDelta), Math.abs(columnDelta)) + 1;

  if (length < 2) return null;

  const rowStep = Math.sign(rowDelta);
  const columnStep = Math.sign(columnDelta);

  if (rowDelta !== 0 && columnDelta !== 0 && Math.abs(rowDelta) !== Math.abs(columnDelta)) {
    return null;
  }

  const size = grid.length;
  const cells = [];
  let word = "";

  for (let index = 0; index < length; index += 1) {
    const row = start.row + index * rowStep;
    const column = start.column + index * columnStep;

    if (row < 0 || column < 0 || row >= size || column >= size) return null;

    cells.push({ row, column });
    word += grid[row][column];
  }

  return { word, cells };
}

export function findWordSearchSelection(grid, start, end, words) {
  const line = getWordSearchLine(grid, start, end);
  if (!line) return null;

  const forward = line.word;
  const backward = [...forward].reverse().join("");
  const normalized = new Set(words.map(normalizeWordSearchWord));

  if (normalized.has(forward)) {
    return { word: forward, cells: line.cells };
  }

  if (normalized.has(backward)) {
    return { word: backward, cells: [...line.cells].reverse() };
  }

  return null;
}
