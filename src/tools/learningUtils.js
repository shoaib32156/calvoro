// Pure helpers for the learning tools. Kept free of React and browser APIs so
// the practice and flashcard flows can be tested with Node's built-in runner.

export function shuffle(items, random = Math.random) {
  const result = [...items];

  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.min(
      index,
      Math.floor(random() * (index + 1))
    );
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }

  return result;
}

function clampFactorRange(minFactor, maxFactor) {
  const low = Number.isInteger(minFactor)
    ? Math.min(12, Math.max(1, minFactor))
    : 1;
  const high = Number.isInteger(maxFactor)
    ? Math.min(12, Math.max(low, maxFactor))
    : 10;

  return { low, high };
}

export function buildMultiplicationPool(
  tables = [],
  minFactor = 1,
  maxFactor = 10
) {
  const selectedTables = [
    ...new Set(
      tables
        .map((table) => Number(table))
        .filter((table) => Number.isInteger(table) && table >= 1 && table <= 12)
    ),
  ].sort((a, b) => a - b);

  const { low, high } = clampFactorRange(minFactor, maxFactor);
  const seen = new Set();
  const pool = [];

  selectedTables.forEach((table) => {
    for (let factor = low; factor <= high; factor += 1) {
      const lower = Math.min(table, factor);
      const upper = Math.max(table, factor);
      const key = `${lower}x${upper}`;

      if (seen.has(key)) continue;

      seen.add(key);
      pool.push({
        a: table,
        b: factor,
        answer: table * factor,
        key,
      });
    }
  });

  return pool;
}

export function getAvailableCounts(totalFacts) {
  const total = Number.isInteger(totalFacts) ? totalFacts : 0;
  const counts = [10, 20, 30].filter((count) => count <= total);

  if (counts.length > 0) return counts;
  return total > 0 ? [total] : [];
}

export function createMultiplicationSession({
  tables = [],
  minFactor = 1,
  maxFactor = 10,
  questionCount = 10,
  random = Math.random,
} = {}) {
  const pool = buildMultiplicationPool(tables, minFactor, maxFactor);
  const availableCounts = getAvailableCounts(pool.length);
  const requested = Number.isInteger(questionCount) ? questionCount : 0;
  const count = availableCounts.includes(requested)
    ? requested
    : availableCounts[availableCounts.length - 1] || 0;

  const questions = shuffle(pool, random)
    .slice(0, count)
    .map((fact, index) => ({
      ...fact,
      id: `fact-${index}-${fact.key}`,
    }));

  return { questions, poolSize: pool.length };
}

export function parseWholeNumberAnswer(value) {
  const text = String(value ?? "").trim();

  if (!/^\d+$/.test(text)) return null;

  const answer = Number(text);
  return Number.isSafeInteger(answer) ? answer : null;
}

export function getFactStrategy(a, b) {
  const product = a * b;
  const equation = `${a} × ${b}`;

  if (a === 0 || b === 0) {
    return `Any number times 0 is 0. ${equation} = 0.`;
  }

  if (a === 1 || b === 1) {
    const kept = a === 1 ? b : a;
    return `Multiplying by 1 keeps the number the same. ${equation} = ${kept}.`;
  }

  if (a === 10 || b === 10) {
    const base = a === 10 ? b : a;
    return `Multiplying by 10 adds a zero to ${base}. ${equation} = ${product}.`;
  }

  if (a === 2 || b === 2) {
    const base = a === 2 ? b : a;
    return `Doubling is the same as multiplying by 2. ${equation} = ${base} + ${base} = ${product}.`;
  }

  if (a === 5 || b === 5) {
    const base = a === 5 ? b : a;
    return `Multiply by 10 and halve the result. 10 × ${base} = ${base * 10}, and half of ${base * 10} is ${product}. So ${equation} = ${product}.`;
  }

  if (a === 9 || b === 9) {
    const base = a === 9 ? b : a;
    return `Use ten groups and take one away: ${equation} = ${base} × 10 − ${base} = ${product}.`;
  }

  if (a === 4 || b === 4) {
    const base = a === 4 ? b : a;
    return `Double twice: ${equation} = double 2 × ${base} twice = ${product} (2 × ${base} = ${base * 2}, then 2 × ${base * 2} = ${product}).`;
  }

  if (a === 3 || b === 3) {
    const base = a === 3 ? b : a;
    return `Double the number and add one more group: ${equation} = 2 × ${base} + ${base} = ${base * 2} + ${base} = ${product}.`;
  }

  if (a === 6 || b === 6) {
    const base = a === 6 ? b : a;
    return `Use five groups plus one more: ${equation} = 5 × ${base} + ${base} = ${base * 5} + ${base} = ${product}.`;
  }

  if (a === 8 || b === 8) {
    const base = a === 8 ? b : a;

    if ((a === 7 && b === 8) || (a === 8 && b === 7)) {
      return a === 7
        ? `Break 8 into 5 + 3: ${equation} = ${a} × 5 + ${a} × 3 = ${a * 5} + ${a * 3} = ${product}.`
        : `Break 7 into 5 + 2: ${equation} = ${a} × 5 + ${a} × 2 = ${a * 5} + ${a * 2} = ${product}.`;
    }

    return `Double three times: ${equation} = ((2 × ${base}) × 2) × 2 = ${product}.`;
  }

  if (a === 11 || b === 11) {
    const base = a === 11 ? b : a;
    return `Use ten groups plus one more: ${equation} = 10 × ${base} + ${base} = ${base * 10} + ${base} = ${product}.`;
  }

  if (a === 12 || b === 12) {
    const base = a === 12 ? b : a;
    return `Split 12 into 10 + 2: ${equation} = 10 × ${base} + 2 × ${base} = ${base * 10} + ${base * 2} = ${product}.`;
  }

  if (b > 5) {
    const rest = b - 5;
    return `Break ${b} into 5 + ${rest}: ${equation} = ${a} × 5 + ${a} × ${rest} = ${a * 5} + ${a * rest} = ${product}.`;
  }

  if (a > 5) {
    const rest = a - 5;
    return `Break ${a} into 5 + ${rest}: ${equation} = 5 × ${b} + ${rest} × ${b} = ${5 * b} + ${rest * b} = ${product}.`;
  }

  return `${equation} = ${product}. Count equal groups of ${b} until you reach ${product}.`;
}

export const initialPracticeState = {
  status: "idle",
  session: null,
  index: 0,
  answers: [],
  input: "",
  feedback: null,
};

export function createPracticeState() {
  return {
    ...initialPracticeState,
    answers: [],
  };
}

export function practiceReducer(state, action) {
  switch (action.type) {
    case "START": {
      const questions = action.session?.questions || [];

      if (questions.length === 0) return state;

      return {
        ...createPracticeState(),
        status: "active",
        session: action.session,
      };
    }

    case "SET_INPUT": {
      if (state.status !== "active") return state;
      if (state.feedback && state.feedback.type !== "invalid") return state;

      return {
        ...state,
        input: String(action.value ?? ""),
        feedback:
          state.feedback?.type === "invalid" ? null : state.feedback,
      };
    }

    case "SUBMIT": {
      if (state.status !== "active" || state.feedback) return state;

      const question = state.session?.questions?.[state.index];

      if (!question) return state;

      const submitted = parseWholeNumberAnswer(state.input);

      if (submitted === null) {
        return {
          ...state,
          feedback: {
            type: "invalid",
            message: "Enter a whole number using digits only.",
            strategy: "",
          },
        };
      }

      const correct = submitted === question.answer;
      const strategy = getFactStrategy(question.a, question.b);
      const record = {
        ...question,
        submitted,
        correct,
        strategy,
      };

      return {
        ...state,
        answers: [...state.answers, record],
        feedback: {
          type: correct ? "correct" : "incorrect",
          message: correct
            ? `Correct. ${question.a} × ${question.b} = ${question.answer}.`
            : `Not quite. ${question.a} × ${question.b} = ${question.answer}.`,
          strategy,
          submitted,
        },
      };
    }

    case "NEXT": {
      if (
        state.status !== "active" ||
        !state.feedback ||
        state.feedback.type === "invalid"
      ) {
        return state;
      }

      const nextIndex = state.index + 1;

      if (nextIndex >= (state.session?.questions?.length || 0)) {
        return {
          ...state,
          status: "complete",
          input: "",
          feedback: null,
        };
      }

      return {
        ...state,
        index: nextIndex,
        input: "",
        feedback: null,
      };
    }

    case "RESTART":
      return createPracticeState();

    default:
      return state;
  }
}

export function getPracticeSummary(state) {
  const total = state.session?.questions?.length || 0;
  const answered = state.answers.length;
  const correct = state.answers.filter((answer) => answer.correct).length;

  return {
    total,
    answered,
    correct,
    incorrect: answered - correct,
    accuracy:
      answered === 0 ? 0 : Math.round((correct / answered) * 100),
    missed: state.answers.filter((answer) => !answer.correct),
  };
}

export function createFlashcardState(deck, random = Math.random) {
  const cardIds = deck?.cards?.map((card) => card.id) || [];

  return {
    deckId: deck?.id || null,
    order: shuffle(cardIds, random),
    index: 0,
    revealed: false,
    marks: {},
    completed: false,
    notice: "",
  };
}

export function flashcardReducer(state, action) {
  switch (action.type) {
    case "SELECT_DECK": {
      if (!action.deck) return state;

      return {
        ...createFlashcardState(action.deck, action.random),
        notice: `Started ${action.deck.title}: ${action.deck.cards.length} words.`,
      };
    }

    case "REVEAL": {
      if (!state.deckId || state.completed) return state;

      return { ...state, revealed: true, notice: "" };
    }

    case "HIDE": {
      if (!state.deckId || state.completed) return state;

      return { ...state, revealed: false, notice: "" };
    }

    case "NEXT": {
      if (!state.deckId || state.completed) return state;

      if (state.index < state.order.length - 1) {
        return {
          ...state,
          index: state.index + 1,
          revealed: false,
          notice: "",
        };
      }

      return {
        ...state,
        completed: true,
        revealed: false,
        notice: "Deck finished. Your summary is below.",
      };
    }

    case "PREVIOUS": {
      if (!state.deckId || state.index === 0) return state;

      return {
        ...state,
        index: state.index - 1,
        revealed: false,
        completed: false,
        notice: "",
      };
    }

    case "MARK": {
      if (!state.deckId || !state.revealed || state.completed) return state;
      if (action.status !== "known" && action.status !== "review") {
        return state;
      }

      const cardId = state.order[state.index];

      if (!cardId) return state;

      return {
        ...state,
        marks: {
          ...state.marks,
          [cardId]: action.status,
        },
        notice:
          action.status === "known"
            ? "Marked as known."
            : "Marked for review.",
      };
    }

    case "SHUFFLE": {
      if (!state.deckId) return state;

      const cardIds = action.cardIds || [];

      return {
        ...state,
        order: shuffle(cardIds, action.random),
        index: 0,
        revealed: false,
        completed: false,
        notice: "Cards shuffled. Starting from the first card.",
      };
    }

    case "RESTART": {
      if (!state.deckId) return state;

      const cardIds = action.cardIds || [];

      return {
        ...createFlashcardState(
          { id: state.deckId, cards: cardIds.map((id) => ({ id })) },
          action.random
        ),
        notice: "Deck restarted with a fresh shuffle.",
      };
    }

    case "REVIEW_DIFFICULT": {
      if (!state.deckId) return state;

      const difficultIds = Object.keys(state.marks).filter(
        (cardId) => state.marks[cardId] === "review"
      );

      if (difficultIds.length === 0) return state;

      return {
        ...state,
        order: shuffle(difficultIds, action.random),
        index: 0,
        revealed: false,
        completed: false,
        notice: `Reviewing ${difficultIds.length} difficult ${
          difficultIds.length === 1 ? "word" : "words"
        }.`,
      };
    }

    default:
      return state;
  }
}

export function getFlashcardSummary(state, deck) {
  const cards = deck?.cards || [];
  const known = cards.filter(
    (card) => state.marks[card.id] === "known"
  ).length;
  const review = cards.filter(
    (card) => state.marks[card.id] === "review"
  ).length;

  return {
    total: cards.length,
    known,
    review,
    unmarked: Math.max(0, cards.length - known - review),
    rated: known + review,
  };
}
