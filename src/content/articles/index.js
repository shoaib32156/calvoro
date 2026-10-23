import { financeArticles } from "./finance.js";
import { mathArticles } from "./math.js";
import { healthArticles } from "./health.js";
import { educationArticles } from "./education.js";
import { everydayArticles } from "./everyday.js";
import { businessArticles } from "./business.js";
import { productivityArticles } from "./productivity.js";
import { technologyArticles } from "./technology.js";

const categoryOrder = [
  "Finance",
  "Math",
  "Health & Fitness",
  "Education",
  "Everyday",
  "Business",
  "Productivity",
  "Technology",
];

const allArticles = [
  ...financeArticles,
  ...mathArticles,
  ...healthArticles,
  ...educationArticles,
  ...everydayArticles,
  ...businessArticles,
  ...productivityArticles,
  ...technologyArticles,
];

export const articles = [...allArticles].sort((a, b) =>
  b.date.localeCompare(a.date)
);

export const articleCategories = [
  "All",
  ...categoryOrder.filter((category) =>
    articles.some((article) => article.category === category)
  ),
];

const featuredSlugs = [
  "how-to-calculate-percentage",
  "how-compound-interest-works",
  "how-to-calculate-bmi",
  "how-to-calculate-gpa",
  "how-to-calculate-emi",
  "running-pace-vs-speed",
  "how-to-merge-pdf-files-safely",
  "how-to-resize-images-for-the-web",
  "pomodoro-technique-explained",
];

export function getArticle(slug) {
  return articles.find((article) => article.slug === slug) || null;
}

export const featuredArticles = featuredSlugs
  .map((slug) => getArticle(slug))
  .filter(Boolean);

export function getArticleWordCount(article) {
  const chunks = [article.excerpt, ...(article.takeaways || [])];

  (article.sections || []).forEach((section) => {
    chunks.push(section.heading);
    chunks.push(...(section.paragraphs || []));
    chunks.push(...(section.list || []));
    if (section.formula) chunks.push(section.formula);
    if (section.note) chunks.push(section.note);
    if (section.example) {
      chunks.push(section.example.title);
      chunks.push(...(section.example.lines || []));
    }
  });

  (article.faq || []).forEach((item) => {
    chunks.push(item.question, item.answer);
  });

  return chunks
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

export function getReadTime(article) {
  const words = getArticleWordCount(article);
  return `${Math.max(3, Math.ceil(words / 220))} min read`;
}

export function formatArticleDate(value) {
  const date = new Date(`${value}T12:00:00Z`);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(date);
}

export function getRelatedArticles(article, limit = 3) {
  return articles
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => {
      let score = 0;

      if (candidate.category === article.category) score += 2;
      if (candidate.tool?.path === article.tool?.path) score += 3;

      return { article: candidate, score };
    })
    .sort(
      (a, b) =>
        b.score - a.score || b.article.date.localeCompare(a.article.date)
    )
    .slice(0, limit)
    .map((item) => item.article);
}

export function getArticleNeighbors(slug) {
  const index = articles.findIndex((article) => article.slug === slug);

  return {
    previous: index > 0 ? articles[index - 1] : null,
    next:
      index >= 0 && index < articles.length - 1
        ? articles[index + 1]
        : null,
  };
}

export function searchArticles(query, category = "All") {
  const searchText = String(query || "").toLowerCase().trim();

  return articles.filter((article) => {
    const matchesCategory =
      category === "All" || article.category === category;

    if (!matchesCategory) return false;
    if (!searchText) return true;

    return [
      article.title,
      article.excerpt,
      article.category,
      article.tool?.name,
      ...(article.takeaways || []),
      ...(article.sections || []).map((section) => section.heading),
    ]
      .join(" ")
      .toLowerCase()
      .includes(searchText);
  });
}

export function getCategoryCount(category) {
  if (category === "All") return articles.length;
  return articles.filter((article) => article.category === category).length;
}
