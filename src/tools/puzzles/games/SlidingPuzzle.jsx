import { useMemo, useState } from "react";
import {
  getSlidingLegalMoves,
  isSlidingSolved,
  moveSlidingTile,
  shuffleSlidingBoard,
} from "../logic/sliding.js";
import { createDailyRng } from "../logic/daily.js";
import { createSeededRng } from "../logic/random.js";

function SlidingBoard({ initialBoard, size, daily, onNewPuzzle }) {
  const [board, setBoard] = useState(initialBoard);
  const [moves, setMoves] = useState(0);
  const [solved, setSolved] = useState(false);
  const [message, setMessage] = useState("");

  const move = (index) => {
    if (solved) return;
    const next = moveSlidingTile(board, index, size);
    if (!next) return;

    setBoard(next);
    setMoves((current) => current + 1);
    setSolved(isSlidingSolved(next));
    setMessage(
      isSlidingSolved(next)
        ? "Solved! Every number is back in order."
        : ""
    );
  };

  const reset = () => {
    setBoard(initialBoard);
    setMoves(0);
    setSolved(false);
    setMessage("Puzzle reset. The same layout has been restored.");
  };

  const handleKeyDown = (event) => {
    const blank = board.indexOf(0);
    const keyMoves = {
      ArrowUp: blank + size,
      ArrowDown: blank - size,
      ArrowLeft: blank + 1,
      ArrowRight: blank - 1,
    };

    if (!(event.key in keyMoves)) return;
    event.preventDefault();
    move(keyMoves[event.key]);
  };

  return (
    <>
      <div className="calvoro-puzzle-controls">
        <span className="calvoro-puzzle-stat">
          Moves <strong>{moves}</strong>
        </span>
        <span className="calvoro-puzzle-stat">
          Board <strong>{size} × {size}</strong>
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

      <div className="calvoro-sliding-shell">
        <div
          className="calvoro-sliding-board"
          style={{ gridTemplateColumns: `repeat(${size}, minmax(0, 1fr))` }}
          role="group"
          aria-label={`Sliding number puzzle, ${size} by ${size}`}
        >
          {board.map((value, index) => (
            <button
              key={value}
              type="button"
              className={
                value === 0
                  ? "calvoro-sliding-tile is-empty"
                  : "calvoro-sliding-tile"
              }
              onClick={() => move(index)}
              onKeyDown={handleKeyDown}
              aria-disabled={value === 0 || solved}
              aria-label={value === 0 ? "Empty space" : `Tile ${value}`}
            >
              {value === 0 ? "" : value}
            </button>
          ))}
        </div>

        <div className="calvoro-sliding-info">
          <p>
            Use the arrow keys while the board is focused, or select a tile
            next to the empty space.
          </p>
          <p>
            Solvable positions only. A 3 × 3 board has 181,440 reachable
            layouts.
          </p>
          <p className="calvoro-puzzle-muted">
            Legal moves right now: {getSlidingLegalMoves(board, size).length}
          </p>
        </div>
      </div>

      <p
        className={
          solved
            ? "calvoro-tool-status is-success"
            : "calvoro-tool-status"
        }
        role="status"
        aria-live="polite"
      >
        {message ||
          (solved
            ? "Solved!"
            : "Arrange the tiles from 1 upward, with the empty space last.")}
      </p>
    </>
  );
}

export default function SlidingPuzzle({ daily, dateStamp }) {
  const [size, setSize] = useState(3);
  const [session, setSession] = useState(0);
  const activeSize = daily ? 3 : size;
  const initialBoard = useMemo(
    () =>
      shuffleSlidingBoard(
        activeSize,
        daily
          ? createDailyRng(dateStamp, "sliding")
          : createSeededRng(`sliding-free-${session}`)
      ),
    [activeSize, daily, dateStamp, session]
  );

  return (
    <div className="calvoro-puzzle-game">
      <div className="calvoro-puzzle-toolbar">
        <div>
          <h3>Sliding Number Puzzle</h3>
          <p>Slide the numbered tiles into order with the empty space.</p>
        </div>
        {!daily && (
          <label className="calvoro-field calvoro-puzzle-inline-field">
            <span className="calvoro-field-label">Board size</span>
            <select
              value={size}
              onChange={(event) => {
                setSize(Number(event.target.value));
                setSession((current) => current + 1);
              }}
            >
              <option value={3}>3 × 3</option>
              <option value={4}>4 × 4</option>
            </select>
          </label>
        )}
      </div>

      <SlidingBoard
        key={`${daily ? `daily-${dateStamp}` : `free-${session}`}-${activeSize}`}
        initialBoard={initialBoard}
        size={activeSize}
        daily={daily}
        onNewPuzzle={() => setSession((current) => current + 1)}
      />
    </div>
  );
}
