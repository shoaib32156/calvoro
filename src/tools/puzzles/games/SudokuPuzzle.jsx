import { useMemo, useState } from "react";
import { SUDOKU_PUZZLES } from "../content.js";
import { getDailyIndex } from "../logic/daily.js";
import {
  findSudokuConflicts,
  isSudokuComplete,
  parseSudokuGrid,
} from "../logic/sudoku.js";

const DIFFICULTY_LABELS = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

function SudokuBoard({ puzzle, daily, onNewPuzzle }) {
  const givenGrid = useMemo(() => parseSudokuGrid(puzzle.puzzle), [puzzle]);
  const solution = useMemo(() => parseSudokuGrid(puzzle.solution), [puzzle]);
  const [grid, setGrid] = useState(givenGrid);
  const [selected, setSelected] = useState(null);
  const [hintedIndices, setHintedIndices] = useState([]);
  const [message, setMessage] = useState("");
  const [complete, setComplete] = useState(false);

  const conflicts = useMemo(() => findSudokuConflicts(grid), [grid]);
  const givenCount = givenGrid.filter(Boolean).length;

  const enterValue = (value) => {
    if (complete) return;

    if (selected === null) {
      setMessage("Select an empty cell first.");
      return;
    }

    if (givenGrid[selected]) {
      setMessage("That number is part of the starting puzzle.");
      return;
    }

    const next = [...grid];
    next[selected] = value;
    setGrid(next);
    setHintedIndices((current) => current.filter((index) => index !== selected));

    if (isSudokuComplete(next)) {
      setComplete(true);
      setMessage("Solved! The grid is complete and conflict-free.");
    } else {
      setMessage("");
    }
  };

  const clearCell = () => {
    if (selected === null || givenGrid[selected] || complete) return;
    const next = [...grid];
    next[selected] = 0;
    setGrid(next);
    setHintedIndices((current) => current.filter((index) => index !== selected));
    setMessage("Cell cleared.");
  };

  const revealHint = () => {
    if (complete) return;

    let target = selected;

    if (
      target === null ||
      givenGrid[target] ||
      grid[target] === solution[target]
    ) {
      target = grid.findIndex((value, index) => value !== solution[index]);
    }

    if (target < 0) {
      setMessage("Every cell already matches the solution.");
      return;
    }

    const next = [...grid];
    next[target] = solution[target];
    setGrid(next);
    setSelected(target);
    setHintedIndices((current) =>
      current.includes(target) ? current : [...current, target]
    );

    if (isSudokuComplete(next)) {
      setComplete(true);
      setMessage("Solved with a hint. The grid is complete.");
    } else {
      setMessage("One hint filled in. Try the next cell yourself.");
    }
  };

  const checkGrid = () => {
    if (isSudokuComplete(grid)) {
      setComplete(true);
      setMessage("Solved! The grid is complete and conflict-free.");
      return;
    }

    if (conflicts.size > 0) {
      setMessage(
        `There ${conflicts.size === 1 ? "is 1 conflict" : `are ${conflicts.size} conflicts`} to fix.`
      );
      return;
    }

    setMessage("No conflicts so far. Keep going.");
  };

  const reset = () => {
    setGrid(givenGrid);
    setSelected(null);
    setHintedIndices([]);
    setComplete(false);
    setMessage("Puzzle reset to its starting clues.");
  };

  const handleKeyDown = (event) => {
    if (/^[1-9]$/.test(event.key)) {
      event.preventDefault();
      enterValue(Number(event.key));
      return;
    }

    if (event.key === "Backspace" || event.key === "Delete" || event.key === "0") {
      event.preventDefault();
      clearCell();
      return;
    }

    if (!event.key.startsWith("Arrow") || selected === null) return;

    event.preventDefault();
    const row = Math.floor(selected / 9);
    const column = selected % 9;
    let nextRow = row;
    let nextColumn = column;

    if (event.key === "ArrowUp") nextRow = Math.max(0, row - 1);
    if (event.key === "ArrowDown") nextRow = Math.min(8, row + 1);
    if (event.key === "ArrowLeft") nextColumn = Math.max(0, column - 1);
    if (event.key === "ArrowRight") nextColumn = Math.min(8, column + 1);

    setSelected(nextRow * 9 + nextColumn);
  };

  return (
    <>
      <div className="calvoro-puzzle-toolbar">
        <div>
          <h3>Sudoku</h3>
          <p>Fill each row, column, and 3 × 3 box with the digits 1–9.</p>
        </div>
        <div className="calvoro-tool-actions">
          <span className="calvoro-puzzle-tag">
            {DIFFICULTY_LABELS[puzzle.difficulty]}
          </span>
          <button
            type="button"
            className="calvoro-tool-button is-secondary"
            onClick={reset}
          >
            Reset
          </button>
          {!daily && (
            <button
              type="button"
              className="calvoro-tool-button"
              onClick={onNewPuzzle}
            >
              New puzzle
            </button>
          )}
        </div>
      </div>

      <div className="calvoro-puzzle-controls">
        <span className="calvoro-puzzle-stat">
          Clues <strong>{givenCount}</strong>
        </span>
        <span className="calvoro-puzzle-stat">
          Hints <strong>{hintedIndices.length}</strong>
        </span>
        <span className="calvoro-puzzle-stat">
          Filled <strong>{grid.filter(Boolean).length}/81</strong>
        </span>
      </div>

      <div className="calvoro-sudoku-layout">
        <div
          className="calvoro-sudoku-board"
          role="group"
          aria-label="Sudoku board"
          onKeyDown={handleKeyDown}
        >
          {grid.map((value, index) => {
            const row = Math.floor(index / 9);
            const column = index % 9;
            const isGiven = Boolean(givenGrid[index]);
            const classes = [
              "calvoro-sudoku-cell",
              isGiven ? "is-given" : "",
              selected === index ? "is-selected" : "",
              conflicts.has(index) ? "is-conflict" : "",
              hintedIndices.includes(index) ? "is-hinted" : "",
              (column + 1) % 3 === 0 && column !== 8 ? "is-box-right" : "",
              (row + 1) % 3 === 0 && row !== 8 ? "is-box-bottom" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <button
                key={index}
                type="button"
                className={classes}
                onClick={() => setSelected(index)}
                aria-label={`Row ${row + 1}, column ${column + 1}${
                  isGiven ? ", given" : ""
                }${value ? `, ${value}` : ", empty"}`}
                aria-pressed={selected === index}
              >
                {value ? value : ""}
              </button>
            );
          })}
        </div>

        <div className="calvoro-sudoku-side">
          <div className="calvoro-sudoku-pad" aria-label="Number pad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
              <button
                key={value}
                type="button"
                className="calvoro-sudoku-pad-key"
                onClick={() => enterValue(value)}
              >
                {value}
              </button>
            ))}
          </div>

          <div className="calvoro-tool-actions">
            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={clearCell}
            >
              Erase
            </button>
            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={revealHint}
            >
              Hint
            </button>
            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={checkGrid}
            >
              Check
            </button>
          </div>

          <p className="calvoro-puzzle-muted">
            Select a cell, then use the number pad or type 1–9. Arrow keys move
            between cells, and Backspace clears an entry.
          </p>
        </div>
      </div>

      <p
        className={
          complete
            ? "calvoro-tool-status is-success"
            : "calvoro-tool-status"
        }
        role="status"
        aria-live="polite"
      >
        {message ||
          (complete
            ? "Solved!"
            : "Every row, column, and box must contain each digit exactly once.")}
      </p>
    </>
  );
}

export default function SudokuPuzzle({ daily, dateStamp }) {
  const [puzzleIndex, setPuzzleIndex] = useState(() =>
    daily
      ? getDailyIndex(dateStamp, "sudoku", SUDOKU_PUZZLES.length)
      : Math.floor(Math.random() * SUDOKU_PUZZLES.length)
  );
  const puzzle = SUDOKU_PUZZLES[puzzleIndex];

  const nextPuzzle = () => {
    setPuzzleIndex((current) => {
      if (SUDOKU_PUZZLES.length < 2) return current;
      let next = current;
      while (next === current) {
        next = Math.floor(Math.random() * SUDOKU_PUZZLES.length);
      }
      return next;
    });
  };

  return (
    <div className="calvoro-puzzle-game">
      <SudokuBoard
        key={`${daily ? `daily-${dateStamp}` : "free"}-${puzzle.id}`}
        puzzle={puzzle}
        daily={daily}
        onNewPuzzle={nextPuzzle}
      />
    </div>
  );
}
