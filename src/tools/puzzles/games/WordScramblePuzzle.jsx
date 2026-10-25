import { useMemo, useState } from "react";
import { SCRAMBLE_WORDS } from "../content.js";
import { createDailyRng } from "../logic/daily.js";
import { createSeededRng } from "../logic/random.js";
import {
  createScrambleRounds,
  isScrambleCorrect,
} from "../logic/scramble.js";

function ScrambleGame({ rounds }) {
  const [index, setIndex] = useState(0);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState({ kind: "", message: "" });
  const [score, setScore] = useState(0);
  const [solvedCount, setSolvedCount] = useState(0);
  const [hintUsed, setHintUsed] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const round = rounds[index];
  const maxScore = rounds.length * 10;

  const resetRoundState = () => {
    setGuess("");
    setFeedback({ kind: "", message: "" });
    setHintUsed(false);
    setAnswered(false);
  };

  const restart = () => {
    setIndex(0);
    setScore(0);
    setSolvedCount(0);
    setFinished(false);
    resetRoundState();
  };

  const next = () => {
    if (index >= rounds.length - 1) {
      setFinished(true);
      return;
    }
    setIndex((current) => current + 1);
    resetRoundState();
  };

  const submit = (event) => {
    event.preventDefault();
    if (!round || answered) return;

    if (isScrambleCorrect(round.answer, guess)) {
      const gained = hintUsed ? 5 : 10;
      setScore((current) => current + gained);
      setSolvedCount((current) => current + 1);
      setAnswered(true);
      setFeedback({
        kind: "success",
        message: `Correct! ${round.answer} earns ${gained} points.`,
      });
      return;
    }

    setFeedback({
      kind: "error",
      message: "Not quite. Rearrange the letters and try again, or use a hint.",
    });
  };

  const revealHint = () => {
    if (answered) return;
    setHintUsed(true);
    setFeedback({
      kind: "warning",
      message: `Hint: the answer starts with ${round.answer.slice(0, 2)} and is ${round.answer.length} letters long. A correct answer now earns 5 points.`,
    });
  };

  const showAnswer = () => {
    if (answered) return;
    setAnswered(true);
    setFeedback({
      kind: "warning",
      message: `The answer is ${round.answer}. Move on to the next round.`,
    });
  };

  if (finished) {
    return (
      <div className="calvoro-puzzle-finish" role="status">
        <span className="calvoro-tool-kicker">Set complete</span>
        <h4>
          {solvedCount} of {rounds.length} words solved
        </h4>
        <p>
          Score: <strong>{score}</strong> out of {maxScore}. Every answer came
          from the bundled word list, and nothing was saved.
        </p>
        <div className="calvoro-tool-actions">
          <button type="button" className="calvoro-tool-button" onClick={restart}>
            Restart set
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="calvoro-puzzle-controls">
        <span className="calvoro-puzzle-stat">
          Round <strong>{index + 1}/{rounds.length}</strong>
        </span>
        <span className="calvoro-puzzle-stat">
          Score <strong>{score}</strong>
        </span>
        <span className="calvoro-puzzle-stat">
          Solved <strong>{solvedCount}</strong>
        </span>
      </div>

      <div className="calvoro-scramble-card">
        <span className="calvoro-puzzle-tag">Clue</span>
        <p className="calvoro-scramble-clue">{round.clue}</p>

        <div className="calvoro-scramble-letters" aria-label="Scrambled letters">
          {round.scrambled.split("").map((letter, letterIndex) => (
            <span key={`${letter}-${letterIndex}`}>{letter}</span>
          ))}
        </div>

        <form className="calvoro-scramble-form" onSubmit={submit}>
          <label className="calvoro-field">
            <span className="calvoro-field-label">Your answer</span>
            <input
              type="text"
              value={guess}
              onChange={(event) => setGuess(event.target.value)}
              placeholder={`${round.answer.length} letters`}
              maxLength={24}
              disabled={answered}
              autoComplete="off"
              autoCapitalize="characters"
            />
          </label>
          <div className="calvoro-tool-actions">
            <button
              type="submit"
              className="calvoro-tool-button"
              disabled={answered || !guess.trim()}
            >
              Check answer
            </button>
            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={revealHint}
              disabled={answered || hintUsed}
            >
              Hint
            </button>
            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={showAnswer}
              disabled={answered}
            >
              Show answer
            </button>
            {answered && (
              <button type="button" className="calvoro-tool-button" onClick={next}>
                {index === rounds.length - 1 ? "See results" : "Next word"}
              </button>
            )}
          </div>
        </form>
      </div>

      <p
        className={`calvoro-tool-status${
          feedback.kind === "success"
            ? " is-success"
            : feedback.kind === "error"
              ? " is-error"
              : feedback.kind === "warning"
                ? " is-warning"
                : ""
        }`}
        role="status"
        aria-live="polite"
      >
        {feedback.message ||
          "Unscramble the letters to match the clue. Ten points for a clean solve, five with a hint."}
      </p>
    </>
  );
}

export default function WordScramblePuzzle({ daily, dateStamp }) {
  const [session, setSession] = useState(0);
  const rounds = useMemo(
    () =>
      createScrambleRounds(
        SCRAMBLE_WORDS,
        5,
        daily
          ? createDailyRng(dateStamp, "word-scramble")
          : createSeededRng(`word-scramble-free-${session}`)
      ),
    [daily, dateStamp, session]
  );

  return (
    <div className="calvoro-puzzle-game">
      <div className="calvoro-puzzle-toolbar">
        <div>
          <h3>Word Scramble</h3>
          <p>
            Rearrange the letters to spell the word described by each clue.
            Five words per set.
          </p>
        </div>
        <div className="calvoro-tool-actions">
          {!daily && (
            <button
              type="button"
              className="calvoro-tool-button"
              onClick={() => setSession((current) => current + 1)}
            >
              New words
            </button>
          )}
        </div>
      </div>

      <ScrambleGame
        key={`${daily ? "daily" : "free"}-${session}`}
        rounds={rounds}
      />
    </div>
  );
}
