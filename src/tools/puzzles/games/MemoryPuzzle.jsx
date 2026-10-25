import { useEffect, useMemo, useReducer, useState } from "react";
import { MEMORY_SYMBOLS } from "../content.js";
import { createDailyRng } from "../logic/daily.js";
import { createSeededRng } from "../logic/random.js";
import {
  createMemoryDeck,
  createMemoryState,
  getMemoryScore,
  isMemoryComplete,
  memoryReducer,
} from "../logic/memory.js";

function MemoryBoard({ deck }) {
  const [state, dispatch] = useReducer(memoryReducer, deck, createMemoryState);

  useEffect(() => {
    if (!state.locked) return undefined;
    const timer = setTimeout(() => dispatch({ type: "resolve" }), 850);
    return () => clearTimeout(timer);
  }, [state.locked]);

  const complete = isMemoryComplete(state);
  const pairCount = Math.round(deck.length / 2);

  return (
    <>
      <div
        className="calvoro-memory-board"
        role="group"
        aria-label="Memory matching board"
      >
        {state.deck.map((card, index) => {
          const isMatched = state.matchedPairIds.includes(card.pairId);
          const isOpen = state.openIndices.includes(index) || isMatched;
          const classes = [
            "calvoro-memory-card",
            isOpen ? "is-open" : "",
            isMatched ? "is-matched" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={card.id}
              type="button"
              className={classes}
              onClick={() => dispatch({ type: "flip", index })}
              aria-label={`Card ${index + 1}, ${
                isOpen ? `symbol ${card.symbol}` : "face down"
              }`}
              aria-pressed={isOpen}
              disabled={isMatched}
            >
              <span aria-hidden="true">{isOpen ? card.symbol : "?"}</span>
            </button>
          );
        })}
      </div>

      <div className="calvoro-puzzle-controls">
        <span className="calvoro-puzzle-stat">
          Moves <strong>{state.moves}</strong>
        </span>
        <span className="calvoro-puzzle-stat">
          Pairs <strong>{state.matchedPairIds.length}/{pairCount}</strong>
        </span>
        {complete && (
          <span className="calvoro-puzzle-stat">
            Score <strong>{getMemoryScore(state.moves, pairCount)}</strong>
          </span>
        )}
        <button
          type="button"
          className="calvoro-tool-button is-secondary"
          onClick={() => dispatch({ type: "reset", deck })}
        >
          Restart board
        </button>
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
        {complete
          ? `All ${pairCount} pairs matched in ${state.moves} moves.`
          : state.lastResult === "match"
            ? "Match found. Keep going."
            : state.lastResult === "mismatch" && !state.locked
              ? "Not a match. Those cards are face down again."
              : "Turn over two cards to look for a matching pair."}
      </p>
    </>
  );
}

export default function MemoryPuzzle({ daily, dateStamp }) {
  const [pairCount, setPairCount] = useState(8);
  const [session, setSession] = useState(0);
  const activePairCount = daily ? 8 : pairCount;
  const deck = useMemo(
    () =>
      createMemoryDeck(
        MEMORY_SYMBOLS,
        activePairCount,
        daily
          ? createDailyRng(dateStamp, "memory")
          : createSeededRng(`memory-free-${session}-${activePairCount}`)
      ),
    [daily, dateStamp, activePairCount, session]
  );

  return (
    <div className="calvoro-puzzle-game">
      <div className="calvoro-puzzle-toolbar">
        <div>
          <h3>Memory Matching</h3>
          <p>
            Flip two cards at a time and match every pair. Fewer moves is
            better.
          </p>
        </div>
        <div className="calvoro-tool-actions">
          {!daily && (
            <button
              type="button"
              className="calvoro-tool-button"
              onClick={() => setSession((current) => current + 1)}
            >
              Shuffle cards
            </button>
          )}
        </div>
      </div>

      <div className="calvoro-puzzle-controls">
        {!daily ? (
          <label className="calvoro-field calvoro-puzzle-inline-field">
            <span className="calvoro-field-label">Pairs</span>
            <select
              value={pairCount}
              onChange={(event) => setPairCount(Number(event.target.value))}
            >
              <option value={6}>6 pairs</option>
              <option value={8}>8 pairs</option>
              <option value={10}>10 pairs</option>
            </select>
          </label>
        ) : (
          <span className="calvoro-puzzle-tag">Daily 8 pairs</span>
        )}
        <p className="calvoro-puzzle-muted">
          Symbols stay in this tab. No scores, streaks, or progress are saved.
        </p>
      </div>

      <MemoryBoard
        key={`${daily ? "daily" : "free"}-${activePairCount}-${session}`}
        deck={deck}
      />
    </div>
  );
}
