export function parseSudokuGrid(input) {
  const text = String(input)
    .replace(/[^0-9.]/g, "")
    .replace(/0/g, ".");

  if (text.length !== 81) {
    throw new Error("A Sudoku grid must contain 81 cells.");
  }

  return [...text].map((character) =>
    character === "." ? 0 : Number(character)
  );
}

export function serializeSudokuGrid(grid) {
  return grid.map((value) => (value ? String(value) : "0")).join("");
}

export function getSudokuGroups() {
  const groups = [];

  for (let row = 0; row < 9; row += 1) {
    groups.push(
      Array.from({ length: 9 }, (_, column) => row * 9 + column)
    );
  }

  for (let column = 0; column < 9; column += 1) {
    groups.push(
      Array.from({ length: 9 }, (_, row) => row * 9 + column)
    );
  }

  for (let boxRow = 0; boxRow < 3; boxRow += 1) {
    for (let boxColumn = 0; boxColumn < 3; boxColumn += 1) {
      const indices = [];
      for (let row = 0; row < 3; row += 1) {
        for (let column = 0; column < 3; column += 1) {
          indices.push(
            (boxRow * 3 + row) * 9 + boxColumn * 3 + column
          );
        }
      }
      groups.push(indices);
    }
  }

  return groups;
}

const SUDOKU_GROUPS = getSudokuGroups();

export function findSudokuConflicts(grid) {
  const conflicts = new Set();

  for (const group of SUDOKU_GROUPS) {
    const positions = new Map();

    for (const index of group) {
      const value = grid[index];
      if (!value) continue;
      const matches = positions.get(value) || [];
      matches.push(index);
      positions.set(value, matches);
    }

    for (const matches of positions.values()) {
      if (matches.length > 1) {
        matches.forEach((index) => conflicts.add(index));
      }
    }
  }

  return conflicts;
}

export function isValidSudokuPlacement(grid, index, value) {
  if (!Number.isInteger(index) || index < 0 || index >= 81) return false;
  if (!Number.isInteger(value) || value < 1 || value > 9) return false;

  const row = Math.floor(index / 9);
  const column = index % 9;
  const boxRow = Math.floor(row / 3) * 3;
  const boxColumn = Math.floor(column / 3) * 3;

  for (let offset = 0; offset < 9; offset += 1) {
    const rowIndex = row * 9 + offset;
    const columnIndex = offset * 9 + column;
    const boxIndex =
      (boxRow + Math.floor(offset / 3)) * 9 +
      boxColumn +
      (offset % 3);

    if (rowIndex !== index && grid[rowIndex] === value) return false;
    if (columnIndex !== index && grid[columnIndex] === value) return false;
    if (boxIndex !== index && grid[boxIndex] === value) return false;
  }

  return true;
}

export function getSudokuCandidates(grid, index) {
  if (grid[index]) return [];
  return Array.from({ length: 9 }, (_, value) => value + 1).filter(
    (value) => isValidSudokuPlacement(grid, index, value)
  );
}

export function isSudokuComplete(grid) {
  return !grid.includes(0) && findSudokuConflicts(grid).size === 0;
}

export function countSudokuSolutions(input, limit = 2) {
  const board = Array.isArray(input) ? [...input] : parseSudokuGrid(input);
  let count = 0;
  let solution = null;

  function search() {
    if (count >= limit) return;

    let bestIndex = -1;
    let bestCandidates = null;

    for (let index = 0; index < 81; index += 1) {
      if (board[index] !== 0) continue;

      const candidates = getSudokuCandidates(board, index);

      if (!candidates.length) return;

      if (!bestCandidates || candidates.length < bestCandidates.length) {
        bestIndex = index;
        bestCandidates = candidates;
        if (candidates.length === 1) break;
      }
    }

    if (bestIndex === -1) {
      count += 1;
      if (!solution) solution = [...board];
      return;
    }

    for (const value of bestCandidates) {
      board[bestIndex] = value;
      search();
      board[bestIndex] = 0;
      if (count >= limit) return;
    }
  }

  search();
  return { count, solution };
}

export function validateSudokuPuzzle(puzzleInput, solutionInput) {
  try {
    const puzzle = Array.isArray(puzzleInput)
      ? [...puzzleInput]
      : parseSudokuGrid(puzzleInput);
    const solution = Array.isArray(solutionInput)
      ? [...solutionInput]
      : parseSudokuGrid(solutionInput);

    if (!isSudokuComplete(solution)) return false;

    for (let index = 0; index < 81; index += 1) {
      if (puzzle[index] && puzzle[index] !== solution[index]) return false;
    }

    return countSudokuSolutions(puzzle, 2).count === 1;
  } catch {
    return false;
  }
}

export function getSudokuHint(grid, solution, selectedIndex = -1) {
  if (
    selectedIndex >= 0 &&
    selectedIndex < 81 &&
    grid[selectedIndex] !== solution[selectedIndex]
  ) {
    return {
      index: selectedIndex,
      value: solution[selectedIndex],
    };
  }

  const emptyIndex = grid.findIndex((value) => value === 0);

  if (emptyIndex === -1) return null;

  return {
    index: emptyIndex,
    value: solution[emptyIndex],
  };
}
