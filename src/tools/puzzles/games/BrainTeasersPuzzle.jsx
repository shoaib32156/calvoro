import { useMemo, useState } from "react";
import { BRAIN_TEASERS } from "../content.js";
import { createDailyRng } from "../logic/daily.js";
import { createSeededRng, shuffleWithRng } from "../logic/random.js";

function TeaserSet({ items, daily, onNewSet }) {
  const [revealed, setRevealed] = useState([]);
  const allRevealed = revealed.length === items.length;

  const toggle = (id) => {
    setRevealed((current) =>
      current.includes(id)
        ? current.filter((entry) => entry !== id)
        : [...current, id]
    );
  };

  return (
    <>
      <div className="calvoro-puzzle-toolbar">
        <div>
          <h3>Daily Brain Teasers</h3>
          <p>
            Read each question, commit to an answer, then reveal the
            explanation.
          </p>
        </div>
        <div className="calvoro-tool-actions">
          <button
            type="button"
            className="calvoro-tool-button is-secondary"
            onClick={() => setRevealed([])}
          >
            Hide answers
          </button>
          {!daily && (
            <button type="button" className="calvoro-tool-button" onClick={onNewSet}>
              New set
            </button>
          )}
        </div>
      </div>

      <div className="calvoro-puzzle-controls">
        <span className="calvoro-puzzle-stat">
          Revealed <strong>{revealed.length}/{items.length}</strong>
        </span>
        <span className="calvoro-puzzle-tag">
          {daily ? "Daily set of 3" : "Set of 5"}
        </span>
      </div>

      <div className="calvoro-teaser-list">
        {items.map((teaser, index) => {
          const isRevealed = revealed.includes(teaser.id);

          return (
            <article className="calvoro-teaser-card" key={teaser.id}>
              <div className="calvoro-teaser-heading">
                <span className="calvoro-puzzle-tag">{teaser.category}</span>
                <span className="calvoro-puzzle-muted">Teaser {index + 1}</span>
              </div>
              <h4>{teaser.question}</h4>
              <button
                type="button"
                className="calvoro-tool-button is-secondary"
                onClick={() => toggle(teaser.id)}
                aria-expanded={isRevealed}
              >
                {isRevealed ? "Hide answer" : "Reveal answer"}
              </button>
              {isRevealed && (
                <div className="calvoro-teaser-answer">
                  <strong>{teaser.answer}</strong>
                  <p>{teaser.explanation}</p>
                </div>
              )}
            </article>
          );
        })}
      </div>

      <p
        className={
          allRevealed
            ? "calvoro-tool-status is-success"
            : "calvoro-tool-status"
        }
        role="status"
        aria-live="polite"
      >
        {allRevealed
          ? `All ${items.length} teasers revealed.`
          : "Answer first, then reveal to compare your reasoning."}
      </p>
    </>
  );
}

export default function BrainTeasersPuzzle({ daily, dateStamp }) {
  const count = daily ? 3 : 5;
  const [session, setSession] = useState(0);
  const items = useMemo(
    () =>
      shuffleWithRng(
        BRAIN_TEASERS,
        daily
          ? createDailyRng(dateStamp, "brain-teasers")
          : createSeededRng(`brain-teasers-free-${session}`)
      ).slice(0, count),
    [daily, dateStamp, count, session]
  );

  return (
    <div className="calvoro-puzzle-game">
      <TeaserSet
        key={`${daily ? `daily-${dateStamp}` : `free-${session}`}`}
        items={items}
        daily={daily}
        onNewSet={() => setSession((current) => current + 1)}
      />
    </div>
  );
}
