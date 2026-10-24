import { useEffect, useReducer, useRef } from "react";
import { Link } from "react-router-dom";
import ToolPage from "./ToolPage.jsx";
import {
  createFlashcardState,
  flashcardReducer,
  getFlashcardSummary,
} from "./learningUtils.js";
import {
  getVocabularyDeck,
  vocabularyDecks,
} from "./vocabularyDecks.js";

function markLabel(mark) {
  if (mark === "known") return "Known";
  if (mark === "review") return "Needs review";
  return "Not marked yet";
}

export default function VocabularyFlashcards() {
  const [state, dispatch] = useReducer(
    flashcardReducer,
    null,
    createFlashcardState
  );
  const summaryHeadingRef = useRef(null);

  const deck = getVocabularyDeck(state.deckId);
  const card =
    deck?.cards.find((entry) => entry.id === state.order[state.index]) ||
    null;
  const summary = getFlashcardSummary(state, deck);
  const currentMark = card ? state.marks[card.id] || null : null;
  const isLastCard =
    state.order.length > 0 && state.index === state.order.length - 1;

  useEffect(() => {
    if (state.completed) {
      summaryHeadingRef.current?.focus();
    }
  }, [state.completed]);

  const selectDeck = (nextDeck) => {
    if (nextDeck.id === state.deckId) return;

    dispatch({
      type: "SELECT_DECK",
      deck: nextDeck,
      random: Math.random,
    });
  };

  const shuffleCards = () => {
    if (!deck) return;

    dispatch({
      type: "SHUFFLE",
      cardIds: deck.cards.map((entry) => entry.id),
      random: Math.random,
    });
  };

  const restartDeck = () => {
    if (!deck) return;

    dispatch({
      type: "RESTART",
      cardIds: deck.cards.map((entry) => entry.id),
      random: Math.random,
    });
  };

  const reviewDifficultWords = () => {
    dispatch({
      type: "REVIEW_DIFFICULT",
      random: Math.random,
    });
  };

  return (
    <ToolPage
      title="Vocabulary Flashcards"
      kicker="Word study"
      description="Study 60 curated words across everyday, academic, and in-context decks. Try to recall each meaning before revealing the definition and example."
      seoTitle="Vocabulary Flashcards - Free Word Study Practice | CALVORO"
      seoDescription="Study 60 curated vocabulary words with reveal-and-review flashcards, known and review marks, shuffle, and a session summary. No account needed."
      privacyBadge="Runs in this browser tab. No account, upload, or saved marks."
      privacyNote="Deck selection, card order, and known or review marks stay in this browser tab. CALVORO does not receive them, and refreshing the page resets the session."
      steps={[
        "Choose one of the three 20-word decks.",
        "Read the word, say the meaning out loud, then reveal the definition and example.",
        "Mark each card as known or needs review, then move through the deck.",
        "Use the summary to review difficult words or restart the deck with a fresh shuffle.",
      ]}
      related={[
        { name: "GPA Calculator", path: "/gpa" },
        { name: "Multiplication Practice", path: "/multiplication-practice" },
      ]}
      notes={[
        "Marks stay in this tab only. Refreshing or closing the page clears the deck and every mark.",
        "Each card shows one common meaning of a word. Many words have additional senses, so check a dictionary when the context matters.",
        "The decks are curated study sets, not a complete dictionary. Read [how to use vocabulary flashcards](/blog/how-to-use-vocabulary-flashcards) for a fuller study routine.",
      ]}
    >
      <span className="calvoro-sr-only" role="status" aria-live="polite">
        {state.notice}
      </span>

      <section
        className="calvoro-tool-panel"
        aria-labelledby="flashcard-deck-heading"
      >
        <span className="calvoro-tool-kicker">Word study</span>
        <h2 id="flashcard-deck-heading">Choose a deck</h2>
        <p>
          Three curated decks, 20 words each. Choosing another deck starts a
          new session and clears the current marks.
        </p>

        <div className="calvoro-deck-grid">
          {vocabularyDecks.map((entry) => {
            const selected = entry.id === state.deckId;

            return (
              <button
                key={entry.id}
                type="button"
                className="calvoro-deck-button"
                aria-pressed={selected}
                onClick={() => selectDeck(entry)}
              >
                <strong>{entry.title}</strong>
                <span>{entry.description}</span>
                <small>{entry.cards.length} words</small>
              </button>
            );
          })}
        </div>

        {!deck && (
          <div className="calvoro-deck-empty" role="status">
            <strong>Pick a deck to begin.</strong>
            <p>
              You can study the cards in the given order, shuffle them, and
              mark the words that need another pass.
            </p>
          </div>
        )}

        {!deck && (
          <p className="calvoro-inline-note">
            No account is needed. Nothing you mark leaves this browser tab.
          </p>
        )}
      </section>

      {deck && !state.completed && card && (
        <section
          className="calvoro-tool-panel"
          aria-labelledby="flashcard-session-heading"
        >
          <div className="calvoro-practice-meta">
            <div>
              <span className="calvoro-tool-kicker">{deck.title}</span>
              <h2 id="flashcard-session-heading">
                Card {state.index + 1} of {state.order.length}
              </h2>
            </div>
            <p>
              {summary.known} known · {summary.review} to review
              <br />
              {summary.unmarked} not marked
            </p>
          </div>

          <progress
            className="calvoro-learning-progress"
            max={state.order.length}
            value={state.index + 1}
            aria-label="Deck progress"
          >
            Card {state.index + 1} of {state.order.length}
          </progress>

          <div className="calvoro-flashcard">
            <div
              className="calvoro-flashcard-reading"
              aria-live="polite"
              aria-atomic="true"
            >
              <p className="calvoro-flashcard-word">{card.word}</p>
              <p className="calvoro-flashcard-pos">
                {card.partOfSpeech}
              </p>

              {state.revealed ? (
                <div className="calvoro-flashcard-answer">
                  <h3>Definition</h3>
                  <p>{card.definition}</p>

                  <div className="calvoro-flashcard-example">
                    <strong>In a sentence</strong>
                    <p>{card.example}</p>
                  </div>

                  {card.synonym && (
                    <p className="calvoro-flashcard-synonym">
                      Close synonym: {card.synonym}
                    </p>
                  )}
                </div>
              ) : (
                <p className="calvoro-flashcard-prompt">
                  Say the meaning out loud, then reveal the definition to
                  check yourself.
                </p>
              )}
            </div>

            {state.revealed && (
              <p className="calvoro-flashcard-mark-state">
                Current mark: {markLabel(currentMark)}
              </p>
            )}
          </div>

          <div className="calvoro-flashcard-controls">
            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={() => dispatch({ type: "PREVIOUS" })}
              disabled={state.index === 0}
            >
              Previous
            </button>

            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={() =>
                dispatch({
                  type: state.revealed ? "HIDE" : "REVEAL",
                })
              }
            >
              {state.revealed ? "Hide definition" : "Reveal definition"}
            </button>

            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={() =>
                dispatch({ type: "MARK", status: "known" })
              }
              disabled={!state.revealed}
              aria-pressed={currentMark === "known"}
            >
              Known
            </button>

            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={() =>
                dispatch({ type: "MARK", status: "review" })
              }
              disabled={!state.revealed}
              aria-pressed={currentMark === "review"}
            >
              Needs review
            </button>

            <button
              type="button"
              className="calvoro-tool-button"
              onClick={() => dispatch({ type: "NEXT" })}
            >
              {isLastCard ? "Finish deck" : "Next card"}
            </button>
          </div>

          <div className="calvoro-flashcard-toolbar">
            <button
              type="button"
              className="calvoro-tool-button is-ghost"
              onClick={shuffleCards}
            >
              Shuffle cards
            </button>
            <span className="calvoro-inline-note">
              Shuffling keeps your marks and starts again at the first card.
            </span>
          </div>
        </section>
      )}

      {deck && state.completed && (
        <section
          className="calvoro-tool-panel"
          aria-labelledby="flashcard-summary-heading"
        >
          <span className="calvoro-tool-kicker">Session summary</span>
          <h2
            id="flashcard-summary-heading"
            ref={summaryHeadingRef}
            tabIndex={-1}
          >
            Deck complete
          </h2>
          <p>
            You rated {summary.rated} of {summary.total} words before
            finishing {deck.title}. The marks are your own check on what felt
            secure and what needs another pass.
          </p>

          <div className="calvoro-stat-grid">
            <div className="calvoro-stat-card">
              <span>Known</span>
              <strong>{summary.known}</strong>
            </div>
            <div className="calvoro-stat-card">
              <span>Needs review</span>
              <strong>{summary.review}</strong>
            </div>
            <div className="calvoro-stat-card">
              <span>Not marked</span>
              <strong>{summary.unmarked}</strong>
            </div>
            <div className="calvoro-stat-card">
              <span>Deck size</span>
              <strong>{summary.total}</strong>
            </div>
          </div>

          <div className="calvoro-tool-actions">
            <button
              type="button"
              className="calvoro-tool-button"
              onClick={restartDeck}
            >
              Study this deck again
            </button>
            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={reviewDifficultWords}
              disabled={summary.review === 0}
            >
              Review difficult words
            </button>
          </div>
          <p className="calvoro-inline-note">
            Studying again clears every mark and reshuffles the full deck.
            Review difficult words uses only the cards marked “Needs review.”
          </p>
        </section>
      )}

      <section
        className="calvoro-tool-panel calvoro-flashcard-guide"
        aria-labelledby="flashcard-guide-heading"
      >
        <span className="calvoro-tool-kicker">Study method</span>
        <h2 id="flashcard-guide-heading">Retrieve first, then check</h2>
        <p>
          Reading a definition feels productive, but recognition is not the
          same as recall. A short attempt before the reveal makes the study
          session more useful.
        </p>

        <div className="calvoro-strategy-grid">
          <div className="calvoro-strategy-card">
            <h3>Say it before you flip</h3>
            <p>
              Cover the definition mentally and put the meaning into your own
              words. If you can explain it in a sentence, you are practicing
              retrieval rather than rereading.
            </p>
          </div>

          <div className="calvoro-strategy-card">
            <h3>Use the example</h3>
            <p>
              Connect the word to the situation in the example. Context gives
              the meaning a place to live, which makes it easier to recognize
              the word in your own reading.
            </p>
          </div>

          <div className="calvoro-strategy-card">
            <h3>Mark honestly</h3>
            <p>
              A word you recognize only after seeing the answer is not yet
              secure. Mark it for review and give it another pass instead of
              counting a lucky guess as known.
            </p>
          </div>

          <div className="calvoro-strategy-card">
            <h3>Return to difficult words</h3>
            <p>
              Use the summary to study the words marked for review. Short,
              repeated passes with a gap between them usually help more than
              one long session.
            </p>
            <Link to="/blog/how-to-use-vocabulary-flashcards">
              Read the full flashcard guide
            </Link>
          </div>
        </div>
      </section>
    </ToolPage>
  );
}
