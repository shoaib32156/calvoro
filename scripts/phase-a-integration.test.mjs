import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import {
  directoryCategories,
  matchesCatalogSearch,
  utilityCategories,
  utilityTools,
} from "../src/calculatorCatalog.js";
import {
  getArticle,
  getArticleWordCount,
  searchArticles,
} from "../src/content/articles/index.js";

const repoFile = (path) => new URL(`../${path}`, import.meta.url);

const newTools = [
  {
    path: "/meme-generator",
    name: "Meme Generator",
    category: "Image",
    query: "meme generator",
  },
  {
    path: "/passport-photo-maker",
    name: "Passport Photo Maker",
    category: "Image",
    query: "passport photo",
  },
  {
    path: "/puzzle-games",
    name: "Puzzle Games",
    category: "Games",
    query: "daily puzzle",
  },
];

const newArticles = [
  {
    slug: "how-to-make-a-meme-without-uploading-photos",
    category: "Everyday",
    toolPath: "/meme-generator",
  },
  {
    slug: "passport-photo-sizes-and-printing-guide",
    category: "Everyday",
    toolPath: "/passport-photo-maker",
  },
  {
    slug: "daily-puzzle-challenge-benefits-and-how-to-play",
    category: "Productivity",
    toolPath: "/puzzle-games",
  },
];

test("Phase A tools are registered, searchable, and not featured", () => {
  for (const expected of newTools) {
    const tool = utilityTools.find(
      (entry) => entry.path === expected.path
    );

    assert.ok(tool, `${expected.path} should be in utilityTools`);
    assert.equal(tool.name, expected.name);
    assert.equal(tool.category, expected.category);
    assert.ok(tool.description.length > 40);
    assert.ok(tool.aliases.length >= 5);
    assert.equal(tool.featured, undefined);
    assert.equal(matchesCatalogSearch(tool, expected.query), true);
  }

  assert.ok(utilityCategories.includes("Games"));
  assert.equal(
    utilityCategories.filter((category) => category === "Games").length,
    1
  );
  assert.ok(directoryCategories.includes("Games"));
  assert.equal(
    new Set(utilityTools.map((tool) => tool.path)).size,
    utilityTools.length
  );
});

test("Phase A tool routes are lazy-loaded in App.jsx", async () => {
  const appSource = await readFile(repoFile("src/App.jsx"), "utf8");

  assert.match(
    appSource,
    /"\/meme-generator": lazy\(\(\) =>\s*import\("\.\/tools\/MemeGenerator\.jsx"\)/
  );
  assert.match(
    appSource,
    /"\/passport-photo-maker": lazy\(\(\) =>\s*import\("\.\/tools\/PassportPhotoMaker\.jsx"\)/
  );
  assert.match(
    appSource,
    /"\/puzzle-games": lazy\(\(\) =>\s*import\("\.\/tools\/PuzzleGames\.jsx"\)/
  );
});

test("Phase A articles meet the approved length and structure", () => {
  for (const expected of newArticles) {
    const article = getArticle(expected.slug);

    assert.ok(article, `${expected.slug} should exist`);
    assert.equal(article.category, expected.category);
    assert.equal(article.date, "2026-10-24");
    assert.equal(article.tool.path, expected.toolPath);
    assert.ok(article.tool.description.length > 20);
    assert.ok(article.excerpt.length > 40);
    assert.ok(article.takeaways.length >= 4);
    assert.ok(article.sections.length >= 8);
    assert.ok(article.faq.length >= 3);

    const wordCount = getArticleWordCount(article);
    assert.ok(
      wordCount >= 1300 && wordCount <= 1500,
      `${expected.slug} should be 1300-1500 words, got ${wordCount}`
    );

    const searchableText = JSON.stringify(article);
    assert.ok(
      searchableText.includes(`](${expected.toolPath})`),
      `${expected.slug} should link to ${expected.toolPath}`
    );
    assert.ok(
      searchArticles(article.title).some(
        (entry) => entry.slug === expected.slug
      ),
      `${expected.slug} should be searchable by title`
    );
  }
});

test("the sitemap includes all Phase A pages and remains well formed", async () => {
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

  for (const tool of newTools) {
    assert.ok(
      urls.includes(`https://calvorotool.com${tool.path}`),
      `${tool.path} should be in the sitemap`
    );
  }

  for (const article of newArticles) {
    assert.ok(
      urls.includes(
        `https://calvorotool.com/blog/${article.slug}`
      ),
      `${article.slug} should be in the sitemap`
    );
  }
});

test("Phase A tools avoid storage, cookies, and network requests", async () => {
  const puzzleFiles = (
    await readdir(repoFile("src/tools/puzzles"), {
      recursive: true,
    })
  )
    .filter((path) => /\.(js|jsx)$/.test(path))
    .map((path) => `src/tools/puzzles/${path.replaceAll("\\", "/")}`);

  const sources = await Promise.all(
    [
      "src/tools/MemeGenerator.jsx",
      "src/tools/PassportPhotoMaker.jsx",
      "src/tools/PuzzleGames.jsx",
      "src/tools/creativeUtils.js",
      "src/tools/memeUtils.js",
      "src/tools/passportUtils.js",
      ...puzzleFiles,
    ].map(async (path) => ({
      path,
      source: await readFile(repoFile(path), "utf8"),
    }))
  );

  const forbidden = [
    /(?:window\.)?localStorage\s*[.[]/,
    /(?:window\.)?sessionStorage\s*[.[]/,
    /\bdocument\.cookie\b/,
    /\bfetch\s*\(/,
    /\bXMLHttpRequest\b/,
    /\bsendBeacon\b/,
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
});
