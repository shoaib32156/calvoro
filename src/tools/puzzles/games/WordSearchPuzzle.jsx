import { useMemo, useState } from "react";
import { WORD_SEARCH_THEMES } from "../content.js";
import { createDailyRng, getDailyIndex } from "../logic/daily.js";
import { createSeededRng } from "../logic/random.js";
import {
  findWordSearchSelection,
  generateWordSearch,
} from "../logic/wordSearch.js";

function WordSearchBoard({ puzzle, theme }) {
  const [startCell, setStartCell] = useState(null);
  const [foundWords, setFoundWords] = useState([]);
  const [foundCells, setFoundCells] = useState([]);
  const [message, setMessage] = useState("");
  const complete =
    puzzle.words.length > 0 && foundWords.length === puzzle.words.length;

  const chooseCell = (row, column) => {
    if (complete) return;

    if (!startCell) {
      setStartCell({ row, column });
      setMessage("Start letter selected. Choose the last letter of the word.");
      return;
    }

    if (startCell.row === row && startCell.column === column) {
      setStartCell(null);
      setMessage("Selection cleared.");
      return;
    }

    const remaining = puzzle.words.filter(
      (word) => !foundWords.includes(word)
    );
    const result = findWordSearchSelection(
      puzzle.grid,
      startCell,
      { row, column },
      remaining
    );

    if (!result) {
      setStartCell({ row, column });
      setMessage("No listed word on that line. New start selected.");
      return;
    }

    const nextFoundWords = [...foundWords, result.word];
    setFoundWords(nextFoundWords);
    setFoundCells([
      ...foundCells,
      ...result.cells.map((cell) => `${cell.row}-${cell.column}`),
    ]);
    setStartCell(null);
    setMessage(
      nextFoundWords.length === puzzle.words.length
        ? `All ${puzzle.words.length} words found. Theme complete!`
        : `Found ${result.word}.`
    );
  };

  const reset = () => {
    setStartCell(null);
    setFoundWords([]);
    setFoundCells([]);
    setMessage("Progress cleared. The same board is still here.");
  };

  return (
    <>
      <div className="calvoro-puzzle-controls">
        <span className="calvoro-puzzle-stat">
          Found <strong>{foundWords.length}/{puzzle.words.length}</strong>
        </span>
        <button
          type="button"
          className="calvoro-tool-button is-secondary"
          onClick={reset}
        >
          Reset
        </button>
      </div>

      <div className="calvoro-wordsearch-layout">
        <div
          className="calvoro-wordsearch-board"
          style={{
            gridTemplateColumns: `repeat(${puzzle.size}, minmax(0, 1fr))`,
          }}
          role="group"
          aria-label={`Word search board: ${theme.title}`}
        >
          {puzzle.grid.map((row, rowIndex) =>
            row.map((letter, columnIndex) => {
              const key = `${rowIndex}-${columnIndex}`;
              const isStart =
                startCell?.row === rowIndex &&
                startCell?.column === columnIndex;
              const isFound = foundCells.includes(key);
              const classes = [
                "calvoro-wordsearch-cell",
                isStart ? "is-start" : "",
                isFound ? "is-found" : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <button
                  key={key}
                  type="button"
                  className={classes}
                  onClick={() => chooseCell(rowIndex, columnIndex)}
                  aria-label={`Row ${rowIndex + 1}, column ${columnIndex + 1}: ${letter}${
                    isFound ? ", found" : ""
                  }`}
                >
                  {letter}
                </button>
              );
            })
          )}
        </div>

        <div className="calvoro-wordsearch-side">
          <h4>Words to find</h4>
          <ul className="calvoro-wordsearch-wordlist">
            {puzzle.words.map((word) => (
              <li
                key={word}
                className={foundWords.includes(word) ? "is-found" : ""}
              >
                {word}
                {foundWords.includes(word) && (
                  <span aria-label="found"> ✓</span>
                )}
              </li>
            ))}
          </ul>
          <p className="calvoro-puzzle-muted">
            Tap or click the first letter, then the last letter. Words can run
            forward or backward and diagonally.
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
            ? `All ${puzzle.words.length} words found. Theme complete!`
            : "Select the first and last letter of each hidden word.")}
      </p>
    </>
  );
}

export default function WordSearchPuzzle({ daily, dateStamp }) {
  const dailyThemeIndex = getDailyIndex(
    dateStamp,
    "word-search-theme",
    WORD_SEARCH_THEMES.length
  );
  const [themeIndex, setThemeIndex] = useState(dailyThemeIndex);
  const [session, setSession] = useState(0);
  const theme = WORD_SEARCH_THEMES[daily ? dailyThemeIndex : themeIndex];
  const puzzle = useMemo(
    () =>
      generateWordSearch({
        words: theme.words,
        size: 12,
        rng: daily
          ? createDailyRng(dateStamp, `word-search-${theme.id}`)
          : createSeededRng(`word-search-free-${session}-${theme.id}`),
      }),
    [theme, daily, dateStamp, session]
  );

  const newBoard = () => {
    if (!daily) {
      setThemeIndex((current) => {
        if (WORD_SEARCH_THEMES.length < 2) return current;
        let next = current;
        while (next === current) {
          next = Math.floor(Math.random() * WORD_SEARCH_THEMES.length);
        }
        return next;
      });
    }
    setSession((current) => current + 1);
  };

  return (
    <div className="calvoro-puzzle-game">
      <div className="calvoro-puzzle-toolbar">
        <div>
          <h3>Word Search</h3>
          <p>
            Find every {theme.title.toLowerCase()} word in the 12 × 12 grid.
            Words run in eight directions.
          </p>
        </div>
        <div className="calvoro-tool-actions">
          <span className="calvoro-puzzle-tag">{theme.title}</span>
          {!daily && (
            <label className="calvoro-field calvoro-puzzle-inline-field">
              <span className="calvoro-field-label">Theme</span>
              <select
                value={themeIndex}
                onChange={(event) => {
                  setThemeIndex(Number(event.target.value));
                  setSession((current) => current + 1);
                }}
              >
                {WORD_SEARCH_THEMES.map((option, index) => (
                  <option key={option.id} value={index}>
                    {option.title}
                  </option>
                ))}
              </select>
            </label>
          )}
          {!daily && (
            <button
              type="button"
              className="calvoro-tool-button"
              onClick={newBoard}
            >
              New board
            </button>
          )}
        </div>
      </div>

      <WordSearchBoard
        key={`${daily ? `daily-${dateStamp}` : `free-${session}`}-${theme.id}`}
        puzzle={puzzle}
        theme={theme}
      />
    </div>
  );
}
