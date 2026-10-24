import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ToolPage from "./ToolPage.jsx";
import {
  buildMultiplicationPool,
  createMultiplicationSession,
  createPracticeState,
  getAvailableCounts,
  getPracticeSummary,
  practiceReducer,
} from "./learningUtils.js";

const TABLE_CHOICES = Array.from({ length: 12 }, (_, index) => index + 1);
const DEFAULT_TABLES = [2, 3, 4, 5, 6, 7, 8, 9, 10];

function describeTables(tables) {
  const sorted = [...tables].sort((a, b) => a - b);

  if (sorted.length === 0) return "No tables selected";
  if (sorted.length === 1) return `Table ${sorted[0]}`;

  const consecutive = sorted.every(
    (table, index) => index === 0 || table === sorted[index - 1] + 1
  );

  return consecutive
    ? `Tables ${sorted[0]}–${sorted[sorted.length - 1]}`
    : `Tables ${sorted.join(", ")}`;
}

export default function MultiplicationPractice() {
  const [tables, setTables] = useState(DEFAULT_TABLES);
  const [factorMax, setFactorMax] = useState(10);
  const [questionCount, setQuestionCount] = useState(10);
  const [state, dispatch] = useReducer(
    practiceReducer,
    undefined,
    createPracticeState
  );
  const nextButtonRef = useRef(null);
  const summaryHeadingRef = useRef(null);

  const pool = useMemo(
    () => buildMultiplicationPool(tables, 1, factorMax),
    [tables, factorMax]
  );
  const availableCounts = getAvailableCounts(pool.length);
  const effectiveCount = availableCounts.includes(questionCount)
    ? questionCount
    : availableCounts[0] || 0;
  const summary = getPracticeSummary(state);
  const question = state.session?.questions?.[state.index] || null;
  const locked = Boolean(
    state.feedback && state.feedback.type !== "invalid"
  );
  const isLastQuestion = state.session
    ? state.index === state.session.questions.length - 1
    : false;

  useEffect(() => {
    if (state.feedback && state.feedback.type !== "invalid") {
      nextButtonRef.current?.focus();
    }
  }, [state.feedback]);

  useEffect(() => {
    if (state.status === "complete") {
      summaryHeadingRef.current?.focus();
    }
  }, [state.status]);

  const toggleTable = (table) => {
    setTables((current) =>
      current.includes(table)
        ? current.filter((value) => value !== table)
        : [...current, table].sort((a, b) => a - b)
    );
  };

  const startSession = () => {
    if (tables.length === 0 || effectiveCount === 0) return;

    dispatch({
      type: "START",
      session: createMultiplicationSession({
        tables,
        minFactor: 1,
        maxFactor: factorMax,
        questionCount: effectiveCount,
      }),
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({ type: "SUBMIT" });
  };

  const accuracyMessage =
    summary.accuracy === 100
      ? "Every answer was correct. Try a wider factor range or a longer session when you are ready."
      : summary.accuracy >= 80
        ? "A strong session. Read the strategies for any missed facts, then try those facts again."
        : "Accuracy grows with short, regular practice. Review the missed facts below before starting another round.";

  return (
    <ToolPage
      title="Multiplication Practice"
      kicker="Learning practice"
      description="Practice times tables at your own pace with untimed questions, instant feedback, worked strategies, and a review of the facts you miss."
      seoTitle="Multiplication Practice - Untimed Times Tables Practice | CALVORO"
      seoDescription="Practice times tables with untimed 10, 20, or 30 question sessions. Get instant feedback, worked strategies, and a review of every fact you miss."
      privacyBadge="Runs in this browser tab. No account, upload, or stored score."
      privacyNote="Every question is generated and checked in this browser tab. CALVORO does not receive your answers, and refreshing the page clears the session."
      steps={[
        "Tick the tables you want to practice and choose a factor range.",
        "Pick 10, 20, or 30 questions, then start the untimed session.",
        "Type a whole-number answer and check it to see the result and a strategy.",
        "Review any missed facts at the end, then practice again or change the settings.",
      ]}
      related={[
        { name: "Percentage Calculator", path: "/percentage" },
        { name: "GPA Calculator", path: "/gpa" },
      ]}
      notes={[
        "Practice is untimed. Speed is never scored, and no result is stored or sent anywhere.",
        "Refreshing or closing the tab clears the current session and its missed-fact review.",
        "Answers must be whole numbers. Read the [multiplication strategies guide](/blog/multiplication-facts-without-pressure) for the reasoning behind each shortcut.",
      ]}
    >
      {state.status === "idle" && (
        <section
          className="calvoro-tool-panel"
          aria-labelledby="practice-setup-heading"
        >
          <h2 id="practice-setup-heading">Build your practice session</h2>
          <p>
            Choose the facts you want to work on. Reversed facts count once,
            so 7 × 8 and 8 × 7 are practiced as the same underlying fact.
          </p>

          <fieldset className="calvoro-learning-fieldset">
            <legend>Tables to practice</legend>
            <div className="calvoro-learning-quick-row">
              <span>Select any tables from 1 to 12.</span>
              <div className="calvoro-learning-quick">
                <button
                  type="button"
                  onClick={() => setTables(TABLE_CHOICES)}
                >
                  Select all
                </button>
                <button type="button" onClick={() => setTables([])}>
                  Clear
                </button>
              </div>
            </div>

            <div className="calvoro-learning-checkboxes">
              {TABLE_CHOICES.map((table) => {
                const checked = tables.includes(table);

                return (
                  <label
                    key={table}
                    className={
                      checked
                        ? "calvoro-learning-checkbox is-checked"
                        : "calvoro-learning-checkbox"
                    }
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleTable(table)}
                    />
                    <span>{table}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div className="calvoro-learning-setup">
            <div className="calvoro-field">
              <label htmlFor="practice-factor-range">Factor range</label>
              <select
                id="practice-factor-range"
                value={factorMax}
                onChange={(event) =>
                  setFactorMax(Number(event.target.value))
                }
              >
                <option value={10}>1 to 10</option>
                <option value={12}>1 to 12</option>
              </select>
              <span className="calvoro-field-hint">
                Every selected table is paired with factors in this range.
              </span>
            </div>

            <div className="calvoro-field">
              <label htmlFor="practice-question-count">Questions</label>
              {availableCounts.length > 0 ? (
                <select
                  id="practice-question-count"
                  value={effectiveCount}
                  onChange={(event) =>
                    setQuestionCount(Number(event.target.value))
                  }
                >
                  {availableCounts.map((count) => (
                    <option key={count} value={count}>
                      {count} questions
                    </option>
                  ))}
                </select>
              ) : (
                <p className="calvoro-field-hint">
                  Select at least one table to see the question options.
                </p>
              )}
              <span className="calvoro-field-hint">
                {pool.length} unique{" "}
                {pool.length === 1 ? "fact" : "facts"} available for this
                selection.
              </span>
            </div>
          </div>

          <div className="calvoro-tool-actions">
            <button
              type="button"
              className="calvoro-tool-button"
              onClick={startSession}
              disabled={tables.length === 0 || effectiveCount === 0}
            >
              Start practice
            </button>
            <span className="calvoro-inline-note">
              Untimed session · feedback after every answer
            </span>
          </div>
        </section>
      )}

      {state.status === "active" && question && (
        <section
          className="calvoro-tool-panel"
          aria-labelledby="practice-session-heading"
        >
          <div className="calvoro-practice-meta">
            <div>
              <span className="calvoro-tool-kicker">Practice session</span>
              <h2 id="practice-session-heading">
                Question {state.index + 1} of{" "}
                {state.session.questions.length}
              </h2>
            </div>
            <p>
              {describeTables(tables)} · factors 1–{factorMax}
              <br />
              {summary.correct} correct of {summary.answered} answered
            </p>
          </div>

          <progress
            className="calvoro-learning-progress"
            max={state.session.questions.length}
            value={summary.answered}
            aria-label="Practice progress"
          >
            {summary.answered} of {state.session.questions.length} questions
            answered
          </progress>

          <h3
            id="practice-question"
            className="calvoro-practice-question"
          >
            {question.a} × {question.b} = ?
          </h3>

          <form
            className="calvoro-practice-form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="calvoro-field">
              <label htmlFor="practice-answer">
                Your answer for {question.a} × {question.b}
              </label>
              <input
                key={state.index}
                id="practice-answer"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={4}
                autoComplete="off"
                spellCheck="false"
                value={state.input}
                onChange={(event) =>
                  dispatch({
                    type: "SET_INPUT",
                    value: event.target.value,
                  })
                }
                disabled={locked}
                aria-invalid={state.feedback?.type === "invalid"}
                aria-describedby="practice-answer-hint"
                autoFocus
              />
              <span
                id="practice-answer-hint"
                className="calvoro-field-hint"
              >
                Whole numbers only. Press Enter to check your answer.
              </span>
            </div>

            {!locked && (
              <button
                type="submit"
                className="calvoro-tool-button"
                disabled={state.input.trim() === ""}
              >
                Check answer
              </button>
            )}
          </form>

          {state.feedback && (
            <div
              className={
                state.feedback.type === "incorrect"
                  ? "calvoro-practice-feedback is-error"
                  : state.feedback.type === "invalid"
                    ? "calvoro-practice-feedback is-warning"
                    : "calvoro-practice-feedback"
              }
              role={
                state.feedback.type === "invalid" ? "alert" : "status"
              }
              aria-live="polite"
            >
              <strong>
                {state.feedback.type === "invalid"
                  ? "Check your answer"
                  : state.feedback.message}
              </strong>

              {state.feedback.type === "invalid" && (
                <p>{state.feedback.message}</p>
              )}

              {state.feedback.type === "incorrect" && (
                <p>Your answer: {state.feedback.submitted}.</p>
              )}

              {state.feedback.strategy && (
                <p className="calvoro-practice-strategy">
                  {state.feedback.strategy}
                </p>
              )}

              {locked && (
                <div className="calvoro-tool-actions">
                  <button
                    ref={nextButtonRef}
                    type="button"
                    className="calvoro-tool-button"
                    onClick={() => dispatch({ type: "NEXT" })}
                  >
                    {isLastQuestion ? "See results" : "Next question"}
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {state.status === "complete" && (
        <section
          className="calvoro-tool-panel"
          aria-labelledby="practice-summary-heading"
        >
          <span className="calvoro-tool-kicker">Session summary</span>
          <h2 id="practice-summary-heading" ref={summaryHeadingRef} tabIndex={-1}>
            Session complete
          </h2>
          <p>{accuracyMessage}</p>

          <div className="calvoro-stat-grid">
            <div className="calvoro-stat-card">
              <span>Correct</span>
              <strong>{summary.correct}</strong>
            </div>
            <div className="calvoro-stat-card">
              <span>Incorrect</span>
              <strong>{summary.incorrect}</strong>
            </div>
            <div className="calvoro-stat-card">
              <span>Accuracy</span>
              <strong>{summary.accuracy}%</strong>
            </div>
            <div className="calvoro-stat-card">
              <span>Questions</span>
              <strong>{summary.total}</strong>
            </div>
          </div>

          <div className="calvoro-practice-review">
            <h3>Facts to review</h3>
            {summary.missed.length > 0 ? (
              <ul className="calvoro-practice-review-list">
                {summary.missed.map((answer) => (
                  <li key={answer.id}>
                    <strong>
                      {answer.a} × {answer.b} = {answer.answer}
                    </strong>
                    <p>
                      Your answer: {answer.submitted}. {answer.strategy}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>
                No missed facts in this session. Every answer was correct.
              </p>
            )}
          </div>

          <div className="calvoro-tool-actions">
            <button
              type="button"
              className="calvoro-tool-button"
              onClick={startSession}
            >
              Practice again
            </button>
            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={() => dispatch({ type: "RESTART" })}
            >
              Change settings
            </button>
          </div>
          <p className="calvoro-inline-note">
            Practice again reshuffles the same selection. Nothing is saved
            after you refresh or close the tab.
          </p>
        </section>
      )}

      <section
        className="calvoro-tool-panel calvoro-practice-guide"
        aria-labelledby="practice-guide-heading"
      >
        <span className="calvoro-tool-kicker">Study guide</span>
        <h2 id="practice-guide-heading">Strategies that make facts stick</h2>
        <p>
          Knowing a fact means being able to find it reliably, not saying it
          instantly. These routes build understanding that survives a pause.
        </p>

        <div className="calvoro-strategy-grid">
          <div className="calvoro-strategy-card">
            <h3>Build equal groups</h3>
            <p>
              Read 7 × 8 as seven groups of eight. Draw the groups as dots or
              as rows of an array. Counting the array shows why the answer is
              56, and it gives you a picture to return to.
            </p>
          </div>

          <div className="calvoro-strategy-card">
            <h3>Use the commutative property</h3>
            <p>
              Seven groups of eight contain the same total as eight groups of
              seven. Knowing 7 × 8 also gives you 8 × 7, which is why reversing
              a fact is a legitimate shortcut rather than a guess.
            </p>
          </div>

          <div className="calvoro-strategy-card">
            <h3>Break a fact apart</h3>
            <p>
              Split one factor into parts you already know, then add the
              partial products. The total stays the same because the groups
              were only regrouped.
            </p>
            <span className="calvoro-strategy-equation">
              7 × 8 = 7 × 5 + 7 × 3 = 35 + 21 = 56
            </span>
          </div>

          <div className="calvoro-strategy-card">
            <h3>Use ten as an anchor</h3>
            <p>
              For a 9 fact, start with ten groups and subtract one group. This
              works for every factor and keeps the arithmetic close to a fact
              most people already know.
            </p>
            <span className="calvoro-strategy-equation">
              6 × 9 = 6 × 10 − 6 = 54
            </span>
          </div>

          <div className="calvoro-strategy-card">
            <h3>Double when you can</h3>
            <p>
              Multiplying by 4 is doubling twice, and multiplying by 8 is
              doubling three times. Each double is easy to check, so a large
              fact becomes a short chain of smaller ones.
            </p>
            <span className="calvoro-strategy-equation">
              4 × 7 = double 2 × 7 twice = 28
            </span>
          </div>

          <div className="calvoro-strategy-card">
            <h3>Practice without a clock</h3>
            <p>
              Short, untimed rounds let you choose a strategy and notice
              mistakes. Accuracy comes first; comfortable speed follows when
              retrieval becomes easier.
            </p>
            <Link to="/blog/multiplication-facts-without-pressure">
              Read the full multiplication guide
            </Link>
          </div>
        </div>
      </section>
    </ToolPage>
  );
}
