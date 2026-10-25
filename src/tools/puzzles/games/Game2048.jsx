import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { createDailyRng } from "../logic/daily.js";
import { createSeededRng } from "../logic/random.js";
import {
  create2048Board,
  get2048HighestTile,
  has2048Tile,
  is2048GameOver,
  move2048,
  spawn2048Tile,
} from "../logic/game2048.js";

const TILE_COLORS = {
  2: { background: "#eee4da", color: "#776e65" },
  4: { background: "#ede0c8", color: "#776e65" },
  8: { background: "#f2b179", color: "#ffffff" },
  16: { background: "#f59563", color: "#ffffff" },
  32: { background: "#f67c5f", color: "#ffffff" },
  64: { background: "#f65e3b", color: "#ffffff" },
  128: { background: "#edcf72", color: "#ffffff" },
  256: { background: "#edcc61", color: "#ffffff" },
  512: { background: "#edc850", color: "#ffffff" },
  1024: { background: "#edc53f", color: "#ffffff" },
  2048: { background: "#edc22e", color: "#ffffff" },
};

const KEY_DIRECTIONS = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  a: "left",
  s: "down",
  d: "right",
  W: "up",
  A: "left",
  S: "down",
  D: "right",
};

function create2048Game(initialBoard) {
  return {
    board: initialBoard,
    score: 0,
    moves: 0,
    won: has2048Tile(initialBoard),
    gameOver: is2048GameOver(initialBoard),
  };
}

function game2048Reducer(state, action) {
  if (action.type === "restart") {
    return create2048Game(action.initialBoard);
  }

  if (action.type !== "move" || state.gameOver) return state;

  const result = move2048(state.board, action.direction);
  if (!result.moved) return state;

  const board = spawn2048Tile(result.board, action.rng);
  return {
    board,
    score: state.score + result.gained,
    moves: state.moves + 1,
    won: state.won || has2048Tile(result.board),
    gameOver: is2048GameOver(board),
  };
}

function Game2048Board({ initialBoard }) {
  const [state, dispatch] = useReducer(
    game2048Reducer,
    initialBoard,
    create2048Game
  );
  const [message, setMessage] = useState("");
  const pointerStart = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const tag = event.target?.tagName;

      if (tag === "INPUT" || tag === "SELECT" || tag === "TEXTAREA") return;

      const direction = KEY_DIRECTIONS[event.key];
      if (!direction) return;

      event.preventDefault();
      dispatch({ type: "move", direction, rng: Math.random });
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const move = (direction) => {
    if (state.gameOver) return;
    const result = move2048(state.board, direction);
    if (!result.moved) {
      setMessage("That direction does not move any tiles.");
      return;
    }
    setMessage("");
    dispatch({ type: "move", direction, rng: Math.random });
  };

  const handlePointerDown = (event) => {
    pointerStart.current = {
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handlePointerUp = (event) => {
    if (!pointerStart.current) return;

    const deltaX = event.clientX - pointerStart.current.x;
    const deltaY = event.clientY - pointerStart.current.y;
    pointerStart.current = null;

    if (Math.max(Math.abs(deltaX), Math.abs(deltaY)) < 24) return;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      move(deltaX > 0 ? "right" : "left");
    } else {
      move(deltaY > 0 ? "down" : "up");
    }
  };

  return (
    <>
      <div className="calvoro-2048-layout">
        <div
          className="calvoro-2048-board"
          role="group"
          aria-label={`2048 board. Score ${state.score}. Highest tile ${get2048HighestTile(state.board)}.`}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          {state.board.map((value, index) => {
            const colors = value ? TILE_COLORS[value] || TILE_COLORS[2048] : null;

            return (
              <div
                key={index}
                className={`calvoro-2048-cell${value ? " has-tile" : ""}${
                  value >= 1024 ? " is-large" : ""
                }`}
                style={
                  colors
                    ? { background: colors.background, color: colors.color }
                    : undefined
                }
              >
                {value || ""}
              </div>
            );
          })}
        </div>

        <div className="calvoro-2048-side">
          <div className="calvoro-puzzle-controls">
            <span className="calvoro-puzzle-stat">
              Score <strong>{state.score}</strong>
            </span>
            <span className="calvoro-puzzle-stat">
              Moves <strong>{state.moves}</strong>
            </span>
            <span className="calvoro-puzzle-stat">
              Best tile <strong>{get2048HighestTile(state.board)}</strong>
            </span>
          </div>

          <div className="calvoro-2048-pad" aria-label="Move controls">
            <button type="button" onClick={() => move("up")} aria-label="Move up">
              ↑
            </button>
            <button type="button" onClick={() => move("left")} aria-label="Move left">
              ←
            </button>
            <button type="button" onClick={() => move("down")} aria-label="Move down">
              ↓
            </button>
            <button type="button" onClick={() => move("right")} aria-label="Move right">
              →
            </button>
          </div>

          <p className="calvoro-puzzle-muted">
            Use the arrow keys, WASD, the direction pad, or swipe across the
            board. Tiles with the same number merge once per move.
          </p>

          <div className="calvoro-tool-actions">
            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={() => {
                setMessage("Board restarted from the same starting position.");
                dispatch({ type: "restart", initialBoard });
              }}
            >
              Restart board
            </button>
          </div>
        </div>
      </div>

      <p
        className={
          state.gameOver
            ? "calvoro-tool-status is-warning"
            : state.won
              ? "calvoro-tool-status is-success"
              : "calvoro-tool-status"
        }
        role="status"
        aria-live="polite"
      >
        {message ||
          (state.gameOver
            ? `No moves left. Final score: ${state.score}.`
            : state.won
              ? "You reached 2048! Keep going for a higher tile and score."
              : "Merge matching tiles to reach 2048.")}
      </p>
    </>
  );
}

export default function Game2048({ daily, dateStamp }) {
  const [session, setSession] = useState(0);
  const initialBoard = useMemo(
    () =>
      create2048Board(
        daily
          ? createDailyRng(dateStamp, "2048")
          : createSeededRng(`2048-free-${session}`)
      ),
    [daily, dateStamp, session]
  );

  return (
    <div className="calvoro-puzzle-game">
      <div className="calvoro-puzzle-toolbar">
        <div>
          <h3>2048</h3>
          <p>
            Slide the board and merge equal tiles. Each merge frees space and
            adds to your score.
          </p>
        </div>
        <div className="calvoro-tool-actions">
          {!daily && (
            <button
              type="button"
              className="calvoro-tool-button"
              onClick={() => setSession((current) => current + 1)}
            >
              New game
            </button>
          )}
        </div>
      </div>

      <Game2048Board
        key={`${daily ? "daily" : "free"}-${session}`}
        initialBoard={initialBoard}
      />
    </div>
  );
}
