import { shuffleWithRng } from "./random.js";

export function createMemoryDeck(symbols, pairCount, rng = Math.random) {
  if (!Array.isArray(symbols) || !symbols.length) return [];
  const count = Math.min(
    Math.max(1, Math.floor(pairCount)),
    symbols.length
  );
  const chosen = shuffleWithRng(symbols, rng).slice(0, count);
  const deck = chosen.flatMap((symbol, pairId) => [
    { id: `${pairId}-a`, pairId, symbol },
    { id: `${pairId}-b`, pairId, symbol },
  ]);

  return shuffleWithRng(deck, rng);
}

export function createMemoryState(deck) {
  return {
    deck: [...deck],
    openIndices: [],
    matchedPairIds: [],
    moves: 0,
    locked: false,
    lastResult: "",
  };
}

export function memoryReducer(state, action) {
  if (action.type === "reset") {
    return createMemoryState(action.deck || state.deck);
  }

  if (action.type === "resolve") {
    if (!state.locked) return state;
    return {
      ...state,
      openIndices: [],
      locked: false,
      lastResult: "mismatch",
    };
  }

  if (action.type !== "flip") return state;

  const index = action.index;
  if (
    state.locked ||
    !Number.isInteger(index) ||
    index < 0 ||
    index >= state.deck.length ||
    state.openIndices.includes(index) ||
    state.matchedPairIds.includes(state.deck[index].pairId)
  ) {
    return state;
  }

  const openIndices = [...state.openIndices, index];

  if (openIndices.length === 1) {
    return {
      ...state,
      openIndices,
      lastResult: "",
    };
  }

  const [first, second] = openIndices;
  const moves = state.moves + 1;

  if (state.deck[first].pairId === state.deck[second].pairId) {
    return {
      ...state,
      openIndices: [],
      matchedPairIds: [...state.matchedPairIds, state.deck[first].pairId],
      moves,
      lastResult: "match",
    };
  }

  return {
    ...state,
    openIndices,
    moves,
    locked: true,
    lastResult: "mismatch",
  };
}

export function isMemoryComplete(state) {
  return (
    state.deck.length > 0 &&
    state.matchedPairIds.length * 2 === state.deck.length
  );
}

export function getMemoryScore(moves, pairCount) {
  const minimumMoves = Math.max(1, pairCount);
  return Math.max(100, 2000 - (moves - minimumMoves) * 30);
}
