import test from "node:test";
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import {
  BRAIN_TEASERS,
  MEMORY_SYMBOLS,
  SCRAMBLE_WORDS,
  SUDOKU_PUZZLES,
  WORD_SEARCH_THEMES,
} from "../src/tools/puzzles/content.js";
import {
  PUZZLE_GAME_IDS,
  createDailyRng,
  getDailyDate,
  getDailyIndex,
  getDailySeed,
} from "../src/tools/puzzles/logic/daily.js";
import {
  areAdjacent,
  getSlidingLegalMoves,
  isSlidingSolved,
  isSlidingSolvable,
  moveSlidingTile,
  shuffleSlidingBoard,
} from "../src/tools/puzzles/logic/sliding.js";
import {
  countSudokuSolutions,
  findSudokuConflicts,
  isSudokuComplete,
  parseSudokuGrid,
  validateSudokuPuzzle,
} from "../src/tools/puzzles/logic/sudoku.js";
import {
  findWordSearchSelection,
  generateWordSearch,
  getWordSearchLine,
} from "../src/tools/puzzles/logic/wordSearch.js";
import {
  createMemoryDeck,
  createMemoryState,
  isMemoryComplete,
  memoryReducer,
} from "../src/tools/puzzles/logic/memory.js";
import {
  countJigsawMisplaced,
  createJigsawBoard,
  getJigsawPieceStyle,
  isJigsawSolved,
  swapJigsawTiles,
} from "../src/tools/puzzles/logic/jigsaw.js";
import {
  create2048Board,
  createEmpty2048Board,
  has2048Tile,
  is2048GameOver,
  merge2048Line,
  move2048,
  spawn2048Tile,
} from "../src/tools/puzzles/logic/game2048.js";
import {
  createScrambleRounds,
  isScrambleCorrect,
  normalizeScrambleWord,
  scrambleWord,
} from "../src/tools/puzzles/logic/scramble.js";
import { shuffleWithRng } from "../src/tools/puzzles/logic/random.js";
import { todayStamp } from "../src/tools/utils.js";

const repoFile = (path) => new URL(`../${path}`, import.meta.url);
const DATE = "2026-10-24";

test("daily seeds and game selection are deterministic across reloads", () => {
  assert.equal(getDailyDate(), todayStamp());
  assert.match(getDailyDate(), /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(PUZZLE_GAME_IDS.length, 8);
  assert.equal(getDailySeed(DATE, "sudoku"), "2026-10-24:sudoku");
  assert.equal(
    getDailyIndex(DATE, "sudoku", SUDOKU_PUZZLES.length),
    getDailyIndex(DATE, "sudoku", SUDOKU_PUZZLES.length)
  );
  assert.notEqual(
    getDailyIndex(DATE, "sudoku", 999),
    getDailyIndex("2026-10-25", "sudoku", 999)
  );
});

test("every game reproduces its daily challenge from the same date", () => {
  const buildDaily = (gameId) => {
    if (gameId === "sliding") {
      return shuffleSlidingBoard(
        3,
        createDailyRng(DATE, "sliding")
      );
    }

    if (gameId === "sudoku") {
      return SUDOKU_PUZZLES[
        getDailyIndex(DATE, "sudoku", SUDOKU_PUZZLES.length)
      ].id;
    }

    if (gameId === "word-search") {
      const theme =
        WORD_SEARCH_THEMES[
          getDailyIndex(
            DATE,
            "word-search-theme",
            WORD_SEARCH_THEMES.length
          )
        ];
      return {
        theme: theme.id,
        puzzle: generateWordSearch({
          words: theme.words,
          size: 12,
          rng: createDailyRng(DATE, `word-search-${theme.id}`),
        }),
      };
    }

    if (gameId === "memory") {
      return createMemoryDeck(
        MEMORY_SYMBOLS,
        8,
        createDailyRng(DATE, "memory")
      );
    }

    if (gameId === "brain-teasers") {
      return shuffleWithRng(
        BRAIN_TEASERS,
        createDailyRng(DATE, "brain-teasers")
      )
        .slice(0, 3)
        .map((teaser) => teaser.id);
    }

    if (gameId === "jigsaw") {
      return createJigsawBoard(
        3,
        createDailyRng(DATE, "jigsaw")
      );
    }

    if (gameId === "2048") {
      return create2048Board(createDailyRng(DATE, "2048"));
    }

    return createScrambleRounds(
      SCRAMBLE_WORDS,
      5,
      createDailyRng(DATE, "word-scramble")
    );
  };

  for (const gameId of PUZZLE_GAME_IDS) {
    assert.deepEqual(
      buildDaily(gameId),
      buildDaily(gameId),
      `${gameId} should reproduce the same daily challenge`
    );
  }
});

test("sliding puzzle shuffles into a solvable, unsolved board", () => {
  const rngA = createDailyRng(DATE, "sliding");
  const rngB = createDailyRng(DATE, "sliding");
  const boardA = shuffleSlidingBoard(3, rngA);
  const boardB = shuffleSlidingBoard(3, rngB);

  assert.deepEqual(boardA, boardB);
  assert.equal(boardA.length, 9);
  assert.equal(new Set(boardA).size, 9);
  assert.equal(isSlidingSolved(boardA), false);
  assert.equal(isSlidingSolvable(boardA, 3), true);

  const moves = getSlidingLegalMoves(boardA, 3);
  assert.ok(moves.length >= 2 && moves.length <= 4);
  assert.equal(areAdjacent(moves[0], boardA.indexOf(0), 3), true);

  const next = moveSlidingTile(boardA, moves[0], 3);
  assert.ok(next);
  assert.equal(next[boardA.indexOf(0)], boardA[moves[0]]);
  assert.equal(moveSlidingTile(boardA, -1, 3), null);
});

test("every bundled Sudoku puzzle has exactly one solution", () => {
  assert.equal(SUDOKU_PUZZLES.length, 9);

  for (const puzzle of SUDOKU_PUZZLES) {
    const grid = parseSudokuGrid(puzzle.puzzle);
    const solution = parseSudokuGrid(puzzle.solution);

    assert.equal(findSudokuConflicts(grid).size, 0);
    assert.equal(isSudokuComplete(solution), true);
    assert.equal(countSudokuSolutions(grid, 2).count, 1, puzzle.id);
    assert.equal(validateSudokuPuzzle(puzzle.puzzle, puzzle.solution), true);
  }
});

test("word search places every theme word and detects selections", () => {
  assert.equal(WORD_SEARCH_THEMES.length, 8);

  for (const theme of WORD_SEARCH_THEMES) {
    const result = generateWordSearch({
      words: theme.words,
      size: 12,
      rng: createDailyRng(DATE, `word-search:${theme.id}`),
    });

    assert.equal(result.unplaced.length, 0, theme.id);
    assert.equal(result.placements.length, theme.words.length);
    assert.equal(result.grid.length, 12);

    for (const placement of result.placements) {
      const letters = placement.cells
        .map(({ row, column }) => result.grid[row][column])
        .join("");
      assert.equal(letters, placement.word);
    }

    const first = result.placements[0];
    const start = first.cells[0];
    const end = first.cells[first.cells.length - 1];
    assert.deepEqual(getWordSearchLine(result.grid, start, end).word, first.word);
    assert.equal(
      findWordSearchSelection(
        result.grid,
        start,
        end,
        theme.words
      ).word,
      first.word
    );
    assert.equal(
      findWordSearchSelection(result.grid, { row: 0, column: 0 }, {
        row: 2,
        column: 1,
      }, theme.words),
      null
    );
  }
});

test("memory deck is paired, deterministic and the reducer locks mismatches", () => {
  const rngA = createDailyRng(DATE, "memory");
  const rngB = createDailyRng(DATE, "memory");
  const deckA = createMemoryDeck(MEMORY_SYMBOLS, 8, rngA);
  const deckB = createMemoryDeck(MEMORY_SYMBOLS, 8, rngB);

  assert.deepEqual(deckA, deckB);
  assert.equal(deckA.length, 16);
  assert.equal(new Set(deckA.map((card) => card.pairId)).size, 8);
  for (const pairId of new Set(deckA.map((card) => card.pairId))) {
    assert.equal(deckA.filter((card) => card.pairId === pairId).length, 2);
  }

  let state = createMemoryState(deckA);
  state = memoryReducer(state, { type: "flip", index: 0 });
  assert.equal(state.openIndices.length, 1);

  const partnerIndex = deckA.findIndex(
    (card, index) => index !== 0 && card.pairId === deckA[0].pairId
  );
  state = memoryReducer(state, { type: "flip", index: partnerIndex });
  assert.deepEqual(state.matchedPairIds, [deckA[0].pairId]);
  assert.equal(state.lastResult, "match");

  const wrongIndex = deckA.findIndex(
    (card, index) => index !== 0 && index !== partnerIndex
  );
  const secondWrongIndex = deckA.findIndex(
    (card, index) =>
      index !== 0 &&
      index !== partnerIndex &&
      index !== wrongIndex &&
      card.pairId !== deckA[wrongIndex].pairId
  );
  state = memoryReducer(state, { type: "flip", index: wrongIndex });
  state = memoryReducer(state, { type: "flip", index: secondWrongIndex });
  assert.equal(state.locked, true);
  const blocked = memoryReducer(state, { type: "flip", index: 2 });
  assert.equal(blocked, state);
  state = memoryReducer(state, { type: "resolve" });
  assert.equal(state.locked, false);
  assert.deepEqual(state.openIndices, []);

  const solved = {
    ...state,
    matchedPairIds: deckA.map((card) => card.pairId).filter(
      (pairId, index, list) => list.indexOf(pairId) === index
    ),
  };
  assert.equal(isMemoryComplete(solved), true);
});

test("jigsaw board swaps pieces and detects completion", () => {
  const rngA = createDailyRng(DATE, "jigsaw");
  const rngB = createDailyRng(DATE, "jigsaw");
  const boardA = createJigsawBoard(3, rngA);
  const boardB = createJigsawBoard(3, rngB);

  assert.deepEqual(boardA, boardB);
  assert.equal(boardA.length, 9);
  assert.equal(new Set(boardA).size, 9);
  assert.equal(isJigsawSolved(boardA), false);
  assert.ok(countJigsawMisplaced(boardA) >= 2);

  const swapped = swapJigsawTiles(boardA, 0, 1);
  assert.equal(swapped[0], boardA[1]);
  assert.equal(swapped[1], boardA[0]);
  assert.equal(swapJigsawTiles(boardA, 0, 0), null);

  const solved = Array.from({ length: 9 }, (_, index) => index);
  assert.equal(isJigsawSolved(solved), true);
  assert.deepEqual(getJigsawPieceStyle(8, 3), {
    backgroundSize: "300% 300%",
    backgroundPosition: "100% 100%",
  });
});

test("2048 merges each tile at most once and spawns deterministically", () => {
  assert.deepEqual(merge2048Line([2, 2, 2, 2]), { line: [4, 4, 0, 0], gained: 8 });
  assert.deepEqual(merge2048Line([2, 2, 4, 0]), { line: [4, 4, 0, 0], gained: 4 });
  assert.deepEqual(merge2048Line([4, 4, 4, 0]), { line: [8, 4, 0, 0], gained: 8 });
  assert.deepEqual(merge2048Line([0, 0, 0, 2]), { line: [2, 0, 0, 0], gained: 0 });

  const rngA = createDailyRng(DATE, "2048");
  const rngB = createDailyRng(DATE, "2048");
  const boardA = create2048Board(rngA);
  const boardB = create2048Board(rngB);

  assert.deepEqual(boardA, boardB);
  assert.equal(boardA.filter(Boolean).length, 2);
  assert.equal(createEmpty2048Board().length, 16);

  const withTile = spawn2048Tile([...Array(16).fill(0)], () => 0);
  assert.equal(withTile.filter(Boolean).length, 1);
  assert.equal(has2048Tile([2048, ...Array(15).fill(0)]), true);

  const fullBoard = [
    2, 4, 2, 4,
    4, 2, 4, 2,
    2, 4, 2, 4,
    4, 2, 4, 2,
  ];
  assert.equal(is2048GameOver(fullBoard), true);
  assert.equal(is2048GameOver([2, 2, ...Array(14).fill(4)]), false);

  const moved = move2048([2, 2, 0, 0, ...Array(12).fill(0)], "left");
  assert.equal(moved.moved, true);
  assert.equal(moved.gained, 4);
  assert.equal(moved.board[0], 4);
});

test("word scramble normalizes answers and produces deterministic rounds", () => {
  assert.equal(normalizeScrambleWord("  ice-cream  "), "ICECREAM");
  assert.equal(isScrambleCorrect("planet", "P L A N E T"), true);
  assert.equal(isScrambleCorrect("planet", "planes"), false);

  const scrambled = scrambleWord("PLANET", createDailyRng(DATE, "scramble"));
  assert.equal(scrambled.answer, "PLANET");
  assert.equal(scrambled.scrambled.split("").sort().join(""), "AELNPT");

  const rngA = createDailyRng(DATE, "word-scramble");
  const rngB = createDailyRng(DATE, "word-scramble");
  const roundsA = createScrambleRounds(SCRAMBLE_WORDS, 5, rngA);
  const roundsB = createScrambleRounds(SCRAMBLE_WORDS, 5, rngB);

  assert.deepEqual(roundsA, roundsB);
  assert.equal(roundsA.length, 5);
  assert.ok(SCRAMBLE_WORDS.length >= 40);
  for (const round of roundsA) {
    assert.ok(round.scrambled.length > 1);
    assert.notEqual(round.scrambled, round.answer);
    assert.ok(round.clue.length > 0);
  }
});

test("bundled puzzle content is complete and the jigsaw artwork is local", async () => {
  assert.ok(BRAIN_TEASERS.length >= 20);
  assert.ok(SCRAMBLE_WORDS.length >= 40);
  assert.ok(WORD_SEARCH_THEMES.every((theme) => theme.words.length >= 6));
  assert.ok(MEMORY_SYMBOLS.length >= 16);

  const artworkPath = repoFile("src/assets/jigsaw-default.svg");
  await access(artworkPath);
  const artwork = await readFile(artworkPath, "utf8");
  assert.match(artwork, /^<svg/);
  assert.match(artwork, /viewBox="0 0 1200 800"/);
});
