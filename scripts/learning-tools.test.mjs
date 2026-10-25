import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import {
  buildMultiplicationPool,
  createFlashcardState,
  createMultiplicationSession,
  createPracticeState,
  flashcardReducer,
  getAvailableCounts,
  getFactStrategy,
  getFlashcardSummary,
  getPracticeSummary,
  parseWholeNumberAnswer,
  practiceReducer,
  shuffle,
} from "../src/tools/learningUtils.js";
import {
  getVocabularyDeck,
  vocabularyDecks,
} from "../src/tools/vocabularyDecks.js";
import {
  directoryCategories,
  matchesCatalogSearch,
  utilityTools,
} from "../src/calculatorCatalog.js";
import {
  featuredArticles,
  getArticle,
  getArticleWordCount,
} from "../src/content/articles/index.js";

const repoFile = (path) => new URL(`../${path}`, import.meta.url);

const practiceSession = {
  poolSize: 2,
  questions: [
    { id: "q1", a: 7, b: 8, answer: 56, key: "7x8" },
    { id: "q2", a: 6, b: 9, answer: 54, key: "6x9" },
  ],
};

const testDeck = {
  id: "test-deck",
  title: "Test Deck",
  description: "A deck used by the automated tests.",
  cards: [
    { id: "alpha", word: "alpha" },
    { id: "beta", word: "beta" },
    { id: "gamma", word: "gamma" },
  ],
};

function markCurrentCard(state, status) {
  const revealed = flashcardReducer(state, { type: "REVEAL" });
  return flashcardReducer(revealed, { type: "MARK", status });
}

test("shuffle returns a new permutation without mutating its input", () => {
  const input = [1, 2, 3, 4, 5];
  const output = shuffle(input, () => 0);

  assert.notEqual(output, input);
  assert.deepEqual([...output].sort((a, b) => a - b), input);
  assert.deepEqual(input, [1, 2, 3, 4, 5]);
});

test("multiplication pools deduplicate reversed facts and respect ranges", () => {
  const defaultPool = buildMultiplicationPool(
    [2, 3, 4, 5, 6, 7, 8, 9, 10],
    1,
    10
  );
  const allTables = buildMultiplicationPool(
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    1,
    12
  );
  const oneTable = buildMultiplicationPool([7], 1, 12);
  const twoTables = buildMultiplicationPool([7, 8], 1, 12);

  assert.equal(defaultPool.length, 54);
  assert.equal(allTables.length, 78);
  assert.equal(oneTable.length, 12);
  assert.equal(twoTables.length, 23);
  assert.equal(
    new Set(defaultPool.map((fact) => fact.key)).size,
    defaultPool.length
  );
  assert.equal(
    defaultPool.filter((fact) => fact.key === "7x8").length,
    1
  );

  for (const fact of allTables) {
    assert.equal(fact.answer, fact.a * fact.b);
    assert.equal(
      fact.key,
      `${Math.min(fact.a, fact.b)}x${Math.max(fact.a, fact.b)}`
    );
    assert.ok(fact.a >= 1 && fact.a <= 12);
    assert.ok(fact.b >= 1 && fact.b <= 12);
  }

  assert.deepEqual(buildMultiplicationPool([], 1, 10), []);
  assert.equal(
    buildMultiplicationPool([7, 7, 7], 1, 10).length,
    10
  );
});

test("available question counts match the size of the fact pool", () => {
  assert.deepEqual(getAvailableCounts(54), [10, 20, 30]);
  assert.deepEqual(getAvailableCounts(23), [10, 20]);
  assert.deepEqual(getAvailableCounts(12), [10]);
  assert.deepEqual(getAvailableCounts(5), [5]);
  assert.deepEqual(getAvailableCounts(0), []);
});

test("practice sessions contain unique, correctly answered questions", () => {
  const session = createMultiplicationSession({
    tables: [7, 8],
    minFactor: 1,
    maxFactor: 12,
    questionCount: 20,
    random: () => 0.5,
  });

  assert.equal(session.poolSize, 23);
  assert.equal(session.questions.length, 20);
  assert.equal(
    new Set(session.questions.map((question) => question.key)).size,
    session.questions.length
  );

  for (const question of session.questions) {
    assert.equal(question.answer, question.a * question.b);
    assert.match(question.id, /^fact-\d+-/);
  }

  const fallback = createMultiplicationSession({
    tables: [7, 8],
    minFactor: 1,
    maxFactor: 12,
    questionCount: 30,
    random: () => 0.5,
  });
  assert.equal(fallback.questions.length, 20);

  const shortPool = createMultiplicationSession({
    tables: [12],
    minFactor: 1,
    maxFactor: 12,
    questionCount: 20,
    random: () => 0.5,
  });
  assert.equal(shortPool.questions.length, 10);
});

test("whole-number answers are parsed strictly", () => {
  assert.equal(parseWholeNumberAnswer("56"), 56);
  assert.equal(parseWholeNumberAnswer(" 56 "), 56);
  assert.equal(parseWholeNumberAnswer("056"), 56);
  assert.equal(parseWholeNumberAnswer(""), null);
  assert.equal(parseWholeNumberAnswer("5.6"), null);
  assert.equal(parseWholeNumberAnswer("-3"), null);
  assert.equal(parseWholeNumberAnswer("fifty-six"), null);
  assert.equal(parseWholeNumberAnswer(undefined), null);
});

test("fact strategies are accurate for every supported factor pair", () => {
  for (let a = 0; a <= 12; a += 1) {
    for (let b = 0; b <= 12; b += 1) {
      const strategy = getFactStrategy(a, b);
      assert.ok(strategy.length > 0);
      assert.ok(
        strategy.includes(String(a * b)),
        `${a} x ${b} strategy should include ${a * b}`
      );
    }
  }

  assert.match(
    getFactStrategy(7, 8),
    /7 × 8 = 7 × 5 \+ 7 × 3 = 35 \+ 21 = 56/
  );
  assert.match(getFactStrategy(6, 9), /6 × 9 = 6 × 10 − 6 = 54/);
  assert.match(
    getFactStrategy(4, 7),
    /double 2 × 7 twice = 28/
  );
});

test("practice reducer scores answers, advances, and restarts cleanly", () => {
  let state = createPracticeState();
  assert.equal(state.status, "idle");

  state = practiceReducer(state, {
    type: "START",
    session: practiceSession,
  });
  assert.equal(state.status, "active");
  assert.equal(state.index, 0);

  state = practiceReducer(state, {
    type: "SET_INPUT",
    value: "54",
  });
  state = practiceReducer(state, { type: "SUBMIT" });

  assert.equal(state.feedback.type, "incorrect");
  assert.equal(state.answers.length, 1);
  assert.equal(state.answers[0].submitted, 54);
  assert.equal(state.answers[0].correct, false);
  assert.match(state.feedback.strategy, /56/);

  assert.equal(
    practiceReducer(state, { type: "SUBMIT" }),
    state,
    "a second submit should not create a duplicate answer"
  );
  assert.equal(
    practiceReducer(state, { type: "SET_INPUT", value: "99" }),
    state,
    "input should be locked after an answer"
  );

  state = practiceReducer(state, { type: "NEXT" });
  assert.equal(state.index, 1);
  assert.equal(state.input, "");
  assert.equal(state.feedback, null);

  state = practiceReducer(state, {
    type: "SET_INPUT",
    value: "54",
  });
  state = practiceReducer(state, { type: "SUBMIT" });
  assert.equal(state.feedback.type, "correct");

  state = practiceReducer(state, { type: "NEXT" });
  assert.equal(state.status, "complete");

  const summary = getPracticeSummary(state);
  assert.deepEqual(
    {
      total: summary.total,
      answered: summary.answered,
      correct: summary.correct,
      incorrect: summary.incorrect,
      accuracy: summary.accuracy,
    },
    { total: 2, answered: 2, correct: 1, incorrect: 1, accuracy: 50 }
  );
  assert.equal(summary.missed.length, 1);
  assert.equal(summary.missed[0].a, 7);

  const restarted = practiceReducer(state, { type: "RESTART" });
  assert.equal(restarted.status, "idle");
  assert.equal(restarted.session, null);
  assert.deepEqual(restarted.answers, []);
});

test("practice reducer handles invalid answers without scoring them", () => {
  let state = practiceReducer(createPracticeState(), {
    type: "START",
    session: practiceSession,
  });

  state = practiceReducer(state, {
    type: "SET_INPUT",
    value: "not a number",
  });
  state = practiceReducer(state, { type: "SUBMIT" });

  assert.equal(state.feedback.type, "invalid");
  assert.equal(state.answers.length, 0);
  assert.equal(
    practiceReducer(state, { type: "NEXT" }),
    state,
    "invalid feedback should not advance the session"
  );

  state = practiceReducer(state, {
    type: "SET_INPUT",
    value: "56",
  });
  assert.equal(state.feedback, null);

  state = practiceReducer(state, { type: "SUBMIT" });
  assert.equal(state.feedback.type, "correct");
  assert.equal(state.answers.length, 1);
});

test("practice reducer ignores invalid start and input actions", () => {
  const idle = createPracticeState();

  assert.equal(
    practiceReducer(idle, {
      type: "START",
      session: { questions: [] },
    }),
    idle
  );
  assert.equal(
    practiceReducer(idle, { type: "SET_INPUT", value: "5" }),
    idle
  );
  assert.equal(practiceReducer(idle, { type: "SUBMIT" }), idle);
});

test("vocabulary decks contain 60 complete, consistent entries", () => {
  assert.equal(vocabularyDecks.length, 3);
  assert.equal(getVocabularyDeck("everyday")?.title, "Everyday Words");
  assert.equal(getVocabularyDeck("missing"), null);

  const allCards = vocabularyDecks.flatMap((deck) => deck.cards);
  const allIds = allCards.map((card) => card.id);

  assert.equal(allCards.length, 60);
  assert.equal(new Set(allIds).size, 60);
  assert.equal(new Set(vocabularyDecks.map((deck) => deck.id)).size, 3);

  for (const deck of vocabularyDecks) {
    assert.ok(deck.title.length > 0);
    assert.ok(deck.description.length > 0);
    assert.equal(deck.cards.length, 20);
    assert.equal(
      new Set(deck.cards.map((card) => card.id)).size,
      deck.cards.length
    );
  }

  for (const card of allCards) {
    assert.equal(card.id, card.word);
    assert.match(card.word, /^[a-z]+$/);
    assert.ok(
      ["noun", "verb", "adjective"].includes(card.partOfSpeech),
      `${card.word} should have a supported part of speech`
    );
    assert.ok(card.definition.length >= 10);
    assert.ok(card.example.length >= 20);

    const exampleTokens = card.example.toLowerCase().split(/[^a-z]+/);
    assert.ok(
      exampleTokens.includes(card.word),
      `${card.word} should appear in its example sentence`
    );

    const definitionTokens = card.definition
      .toLowerCase()
      .split(/[^a-z]+/);
    assert.ok(
      !definitionTokens.includes(card.word),
      `${card.word} should not define itself`
    );

    if (card.synonym) {
      assert.notEqual(card.synonym, card.word);
      assert.ok(card.synonym.length > 0);
    }
  }
});

test("flashcard reducer reveals, marks, navigates, and summarizes a deck", () => {
  let state = createFlashcardState(testDeck, () => 0);

  assert.equal(state.deckId, "test-deck");
  assert.equal(state.order.length, 3);
  assert.equal(state.index, 0);
  assert.equal(state.revealed, false);
  assert.equal(state.completed, false);
  assert.deepEqual(state.marks, {});
  assert.deepEqual(
    [...state.order].sort(),
    ["alpha", "beta", "gamma"]
  );

  const beforeReveal = flashcardReducer(state, {
    type: "MARK",
    status: "known",
  });
  assert.deepEqual(beforeReveal.marks, {});

  state = flashcardReducer(state, { type: "REVEAL" });
  assert.equal(state.revealed, true);

  state = flashcardReducer(state, {
    type: "MARK",
    status: "known",
  });
  assert.equal(state.marks[state.order[state.index]], "known");
  assert.match(state.notice, /known/i);

  state = flashcardReducer(state, { type: "NEXT" });
  assert.equal(state.index, 1);
  assert.equal(state.revealed, false);

  state = markCurrentCard(state, "review");
  state = flashcardReducer(state, { type: "NEXT" });
  state = markCurrentCard(state, "review");
  assert.equal(state.index, 2);

  state = flashcardReducer(state, { type: "NEXT" });
  assert.equal(state.completed, true);

  const summary = getFlashcardSummary(state, testDeck);
  assert.deepEqual(summary, {
    total: 3,
    known: 1,
    review: 2,
    unmarked: 0,
    rated: 3,
  });

  assert.equal(
    flashcardReducer(state, { type: "PREVIOUS" }).completed,
    false
  );
});

test("flashcard navigation cannot move before the first card", () => {
  const state = createFlashcardState(testDeck, () => 0);

  assert.equal(
    flashcardReducer(state, { type: "PREVIOUS" }),
    state
  );
});

test("shuffle and restart keep or clear marks as documented", () => {
  let state = createFlashcardState(testDeck, () => 0);
  state = markCurrentCard(state, "known");
  const knownId = state.order[0];

  state = flashcardReducer(state, { type: "NEXT" });

  const shuffled = flashcardReducer(state, {
    type: "SHUFFLE",
    cardIds: testDeck.cards.map((card) => card.id),
    random: () => 0,
  });

  assert.equal(shuffled.index, 0);
  assert.equal(shuffled.revealed, false);
  assert.equal(shuffled.completed, false);
  assert.equal(shuffled.marks[knownId], "known");
  assert.deepEqual(
    [...shuffled.order].sort(),
    ["alpha", "beta", "gamma"]
  );

  const restarted = flashcardReducer(shuffled, {
    type: "RESTART",
    cardIds: testDeck.cards.map((card) => card.id),
    random: () => 0,
  });

  assert.equal(restarted.index, 0);
  assert.deepEqual(restarted.marks, {});
  assert.match(restarted.notice, /restarted/i);
});

test("review difficult uses only cards marked for review", () => {
  let state = createFlashcardState(testDeck, () => 0);

  state = markCurrentCard(state, "known");
  state = flashcardReducer(state, { type: "NEXT" });
  state = markCurrentCard(state, "review");
  state = flashcardReducer(state, { type: "NEXT" });
  state = markCurrentCard(state, "review");

  const difficult = flashcardReducer(state, {
    type: "REVIEW_DIFFICULT",
    random: () => 0,
  });

  assert.equal(difficult.order.length, 2);
  assert.equal(difficult.index, 0);
  assert.equal(difficult.completed, false);
  assert.equal(difficult.marks[state.order[0]], "known");
  for (const cardId of difficult.order) {
    assert.equal(state.marks[cardId], "review");
    assert.notEqual(cardId, state.order[0]);
  }
  assert.match(difficult.notice, /2 difficult words/);

  const noReview = {
    ...state,
    marks: { [state.order[0]]: "known" },
  };
  assert.equal(
    flashcardReducer(noReview, { type: "REVIEW_DIFFICULT" }),
    noReview
  );
});

test("selecting a deck resets marks and starts a fresh order", () => {
  let state = createFlashcardState(testDeck, () => 0);
  state = markCurrentCard(state, "known");

  const nextDeck = {
    id: "next-deck",
    title: "Next Deck",
    cards: [
      { id: "one", word: "one" },
      { id: "two", word: "two" },
    ],
  };
  const selected = flashcardReducer(state, {
    type: "SELECT_DECK",
    deck: nextDeck,
    random: () => 0,
  });

  assert.equal(selected.deckId, "next-deck");
  assert.deepEqual(selected.marks, {});
  assert.deepEqual(
    [...selected.order].sort(),
    ["one", "two"]
  );
  assert.match(selected.notice, /Started Next Deck/);
});

test("learning tools are registered and searchable in the catalog", () => {
  const expectedTools = [
    {
      path: "/multiplication-practice",
      name: "Multiplication Practice",
      query: "times tables",
    },
    {
      path: "/vocabulary-flashcards",
      name: "Vocabulary Flashcards",
      query: "flashcards",
    },
  ];

  for (const expected of expectedTools) {
    const tool = utilityTools.find(
      (entry) => entry.path === expected.path
    );

    assert.ok(tool, `${expected.path} should be in utilityTools`);
    assert.equal(tool.name, expected.name);
    assert.equal(tool.category, "Education");
    assert.ok(tool.description.length > 40);
    assert.ok(tool.aliases.length >= 5);
    assert.equal(tool.featured, undefined);
    assert.equal(matchesCatalogSearch(tool, expected.query), true);
  }

  assert.equal(
    new Set(utilityTools.map((tool) => tool.path)).size,
    utilityTools.length
  );
  assert.equal(
    directoryCategories.filter(
      (category) => category === "Education"
    ).length,
    1
  );
});

test("routes and the blog call-to-action are wired to the new tools", async () => {
  const appSource = await readFile(repoFile("src/App.jsx"), "utf8");
  const blogSource = await readFile(
    repoFile("src/Pages/BlogArticle.jsx"),
    "utf8"
  );

  assert.match(
    appSource,
    /"\/multiplication-practice": lazy\(\(\) =>\s*import\("\.\/tools\/MultiplicationPractice\.jsx"\)/
  );
  assert.match(
    appSource,
    /"\/vocabulary-flashcards": lazy\(\(\) =>\s*import\("\.\/tools\/VocabularyFlashcards\.jsx"\)/
  );
  assert.match(blogSource, /post\.tool\.description \|\|/);
});

test("education articles meet the approved length and structure", () => {
  const expected = [
    {
      slug: "multiplication-facts-without-pressure",
      toolPath: "/multiplication-practice",
      link: "/multiplication-practice",
    },
    {
      slug: "how-to-use-vocabulary-flashcards",
      toolPath: "/vocabulary-flashcards",
      link: "/vocabulary-flashcards",
    },
  ];

  for (const entry of expected) {
    const article = getArticle(entry.slug);

    assert.ok(article, `${entry.slug} should exist`);
    assert.equal(article.category, "Education");
    assert.equal(article.date, "2026-10-24");
    assert.equal(article.tool.path, entry.toolPath);
    assert.ok(article.tool.description.length > 20);
    assert.ok(article.excerpt.length > 40);
    assert.ok(article.takeaways.length >= 4);
    assert.ok(article.sections.length >= 8);
    assert.ok(article.faq.length >= 3);

    const wordCount = getArticleWordCount(article);
    assert.ok(
      wordCount >= 1300 && wordCount <= 1500,
      `${entry.slug} should be 1300-1500 words, got ${wordCount}`
    );

    const searchableText = JSON.stringify(article);
    assert.ok(
      searchableText.includes(`](${entry.link})`),
      `${entry.slug} should link to ${entry.link}`
    );
  }

  const featuredSlugs = featuredArticles.map(
    (article) => article.slug
  );
  assert.ok(
    !featuredSlugs.includes("multiplication-facts-without-pressure")
  );
  assert.ok(
    !featuredSlugs.includes("how-to-use-vocabulary-flashcards")
  );
});

test("the sitemap contains valid, unique URLs for all new pages", async () => {
  const sitemap = await readFile(
    repoFile("public/sitemap.xml"),
    "utf8"
  );
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (match) => match[1]
  );

  assert.match(sitemap, /^<\?xml version="1\.0" encoding="UTF-8"\?>/);
  assert.match(sitemap, /<urlset[^>]+>/);
  assert.match(sitemap, /<\/urlset>\s*$/);
  assert.equal(urls.length, 133);
  assert.equal(new Set(urls).size, urls.length);

  for (const url of urls) {
    assert.match(url, /^https:\/\/calvorotool\.com\//);
    assert.doesNotMatch(url, /\s/);
  }

  assert.ok(
    urls.includes(
      "https://calvorotool.com/multiplication-practice"
    )
  );
  assert.ok(
    urls.includes(
      "https://calvorotool.com/vocabulary-flashcards"
    )
  );
  assert.ok(
    urls.includes(
      "https://calvorotool.com/blog/multiplication-facts-without-pressure"
    )
  );
  assert.ok(
    urls.includes(
      "https://calvorotool.com/blog/how-to-use-vocabulary-flashcards"
    )
  );
});

test("learning tools avoid storage, cookies, and network requests", async () => {
  const sources = await Promise.all(
    [
      "src/tools/MultiplicationPractice.jsx",
      "src/tools/VocabularyFlashcards.jsx",
      "src/tools/learningUtils.js",
      "src/tools/vocabularyDecks.js",
    ].map(async (path) => ({
      path,
      source: await readFile(repoFile(path), "utf8"),
    }))
  );

  const forbidden = [
    /\blocalStorage\b/,
    /\bsessionStorage\b/,
    /\bindexedDB\b/,
    /\bdocument\.cookie\b/,
    /\bfetch\s*\(/,
    /\bXMLHttpRequest\b/,
    /\bsendBeacon\b/,
    /\bWebSocket\b/,
  ];

  for (const file of sources) {
    for (const pattern of forbidden) {
      assert.doesNotMatch(
        file.source,
        pattern,
        `${file.path} should not use ${pattern}`
      );
    }
  }

  const utilsSource = sources.find(
    (file) => file.path === "src/tools/learningUtils.js"
  ).source;
  assert.doesNotMatch(utilsSource, /from "react"/);
});

test("accessibility hooks are present in the learning interfaces", async () => {
  const practiceSource = await readFile(
    repoFile("src/tools/MultiplicationPractice.jsx"),
    "utf8"
  );
  const flashcardSource = await readFile(
    repoFile("src/tools/VocabularyFlashcards.jsx"),
    "utf8"
  );
  const css = await readFile(
    repoFile("src/tools/tools.css"),
    "utf8"
  );

  assert.match(practiceSource, /<fieldset/);
  assert.match(practiceSource, /<legend>/);
  assert.match(practiceSource, /aria-live="polite"/);
  assert.match(practiceSource, /aria-invalid=/);
  assert.match(practiceSource, /inputMode="numeric"/);
  assert.match(practiceSource, /"alert"\s*:\s*"status"/);

  assert.match(flashcardSource, /aria-live="polite"/);
  assert.match(flashcardSource, /aria-pressed=/);
  assert.match(flashcardSource, /role="status"/);
  assert.match(flashcardSource, /tabIndex=\{-1\}/);

  for (const selector of [
    ".calvoro-learning-checkbox",
    ".calvoro-practice-feedback",
    ".calvoro-deck-button",
    ".calvoro-flashcard-word",
    ".calvoro-flashcard-controls",
  ]) {
    assert.ok(
      css.includes(selector),
      `tools.css should style ${selector}`
    );
  }
  assert.match(css, /@media \(max-width: 680px\)/);
});

test("the package exposes the zero-dependency test command", async () => {
  const packageJson = JSON.parse(
    await readFile(repoFile("package.json"), "utf8")
  );

  assert.equal(
    packageJson.scripts.test,
    "node --test scripts/learning-tools.test.mjs scripts/creative-tools.test.mjs scripts/puzzle-games.test.mjs scripts/phase-a-integration.test.mjs"
  );
});
