import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../SEO";
import ArticleCard from "../components/editorial/ArticleCard.jsx";
import Breadcrumbs from "../components/editorial/Breadcrumbs.jsx";
import {
  articleCategories,
  articles,
  featuredArticles,
  formatArticleDate,
  getCategoryCount,
  getReadTime,
  searchArticles,
} from "../content/articles/index.js";

const PAGE_SIZE = 12;

const popularTools = [
  { name: "Percentage Calculator", path: "/percentage" },
  { name: "Loan Calculator", path: "/loan" },
  { name: "BMI Calculator", path: "/bmi" },
  { name: "GPA Calculator", path: "/gpa" },
];

const newTools = [
  { name: "PDF Studio", path: "/pdf-studio" },
  { name: "Image Studio", path: "/image-studio" },
  { name: "Word Counter", path: "/word-counter" },
  { name: "QR Code Generator", path: "/qr-code-generator" },
];

export default function Blog() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredArticles = useMemo(
    () => searchArticles(search, activeCategory),
    [search, activeCategory]
  );

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search, activeCategory]);

  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const remaining = Math.max(0, filteredArticles.length - visibleArticles.length);
  const showFeatured =
    !search.trim() && activeCategory === "All" && featuredArticles.length > 0;
  const leadArticle = featuredArticles[0];
  const supportingArticles = featuredArticles.slice(1, 3);

  return (
    <div className="calvoro-journal-page">
      <SEO
        title="CALVORO Journal - Practical Guides for Everyday Numbers"
        description="Browse original CALVORO guides about percentages, loans, health, education, time, business, productivity and everyday browser tools."
      />

      <section className="calvoro-journal-hero">
        <div className="calvoro-journal-container">
          <Breadcrumbs
            tone="dark"
            items={[{ label: "Home", to: "/" }, { label: "Journal" }]}
          />

          <div className="calvoro-journal-hero-layout">
            <div>
              <span className="calvoro-journal-kicker">CALVORO Journal</span>
              <h1>Guides for the numbers behind everyday decisions.</h1>
              <p>
                Clear explanations, worked examples, and direct links to the
                calculator or browser tool that does the arithmetic. No account
                and no upload required.
              </p>
            </div>

            <dl className="calvoro-journal-stats">
              <div>
                <dt>Guides</dt>
                <dd>{articles.length}</dd>
              </div>
              <div>
                <dt>Topics</dt>
                <dd>{articleCategories.length - 1}</dd>
              </div>
              <div>
                <dt>Processed locally</dt>
                <dd>100%</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <main className="calvoro-journal-main">
        <div className="calvoro-journal-container">
          {showFeatured && leadArticle && (
            <section
              className="calvoro-journal-featured"
              aria-labelledby="featured-guide-heading"
            >
              <Link
                to={`/blog/${leadArticle.slug}`}
                className="calvoro-journal-featured-lead"
              >
                <div className="calvoro-journal-featured-visual" aria-hidden="true">
                  <span>{leadArticle.category}</span>
                  <strong>{String(featuredArticles.length).padStart(2, "0")}</strong>
                  <small>Editor's picks</small>
                </div>
                <div className="calvoro-journal-featured-copy">
                  <span className="calvoro-journal-kicker">Featured guide</span>
                  <h2 id="featured-guide-heading">{leadArticle.title}</h2>
                  <p>{leadArticle.excerpt}</p>
                  <div className="calvoro-journal-featured-meta">
                    <span>{formatArticleDate(leadArticle.date)}</span>
                    <span>{getReadTime(leadArticle)}</span>
                  </div>
                  <span className="calvoro-journal-read-link">
                    Read the guide <b aria-hidden="true">→</b>
                  </span>
                </div>
              </Link>

              <div className="calvoro-journal-featured-side">
                <h2>Also worth reading</h2>
                {supportingArticles.map((article) => (
                  <Link
                    key={article.slug}
                    to={`/blog/${article.slug}`}
                    className="calvoro-journal-mini-card"
                  >
                    <span>{article.category}</span>
                    <strong>{article.title}</strong>
                    <small>{getReadTime(article)}</small>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="calvoro-journal-grid">
            <section className="calvoro-journal-content" aria-labelledby="all-guides-heading">
              <div className="calvoro-journal-heading-row">
                <div>
                  <span className="calvoro-journal-kicker">The archive</span>
                  <h2 id="all-guides-heading">All guides</h2>
                </div>
                <span className="calvoro-journal-count">
                  {filteredArticles.length}{" "}
                  {filteredArticles.length === 1 ? "guide" : "guides"}
                </span>
              </div>

              <div className="calvoro-journal-toolbar">
                <label htmlFor="journal-search">
                  Search the journal
                  <input
                    id="journal-search"
                    type="search"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Try percentage, mortgage, GPA, or PDF"
                    className="calvoro-search-input"
                    autoComplete="off"
                  />
                </label>

                {(search || activeCategory !== "All") && (
                  <button
                    type="button"
                    className="calvoro-clear-filters"
                    onClick={() => {
                      setSearch("");
                      setActiveCategory("All");
                    }}
                  >
                    Clear search and topic
                  </button>
                )}
              </div>

              <div
                className="calvoro-category-row"
                role="group"
                aria-label="Article topics"
              >
                {articleCategories.map((category) => {
                  const active = activeCategory === category;
                  const count = getCategoryCount(category);

                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActiveCategory(category)}
                      className={
                        active ? "calvoro-category active" : "calvoro-category"
                      }
                      aria-pressed={active}
                    >
                      <span>{category}</span>
                      <small>
                        {count} {count === 1 ? "guide" : "guides"}
                      </small>
                    </button>
                  );
                })}
              </div>

              <p className="calvoro-filter-status" aria-live="polite">
                Showing {filteredArticles.length} of {articles.length} guides
                {activeCategory === "All" ? "" : ` in ${activeCategory}`}
                {search.trim() ? ` matching “${search.trim()}”` : ""}.
              </p>

              {visibleArticles.length > 0 ? (
                <>
                  <div className="calvoro-editorial-grid">
                    {visibleArticles.map((article) => (
                      <ArticleCard key={article.slug} article={article} />
                    ))}
                  </div>

                  {remaining > 0 && (
                    <div className="calvoro-journal-pagination">
                      <button
                        type="button"
                        className="calvoro-journal-load-more"
                        onClick={() =>
                          setVisibleCount((count) => count + PAGE_SIZE)
                        }
                      >
                        Show {Math.min(PAGE_SIZE, remaining)} more guides
                      </button>
                      <span>
                        {visibleArticles.length} of {filteredArticles.length} shown
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <div className="calvoro-journal-empty" role="status">
                  <strong>No guides matched that search.</strong>
                  <p>
                    Try a shorter phrase or choose a different topic. You can
                    also browse every calculator in the tool directory.
                  </p>
                  <div>
                    <button
                      type="button"
                      className="calvoro-journal-load-more"
                      onClick={() => {
                        setSearch("");
                        setActiveCategory("All");
                      }}
                    >
                      Reset filters
                    </button>
                    <Link to="/tools" className="calvoro-journal-text-link">
                      Browse tools →
                    </Link>
                  </div>
                </div>
              )}
            </section>

            <aside className="calvoro-journal-sidebar" aria-label="Journal sidebar">
              <section className="calvoro-journal-side-card">
                <span className="calvoro-journal-kicker">Start with a tool</span>
                <h2>Popular calculators</h2>
                <div className="calvoro-journal-link-list">
                  {popularTools.map((tool) => (
                    <Link key={tool.path} to={tool.path}>
                      {tool.name}
                      <span aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="calvoro-journal-side-card">
                <span className="calvoro-journal-kicker">New in CALVORO</span>
                <h2>Browser tools</h2>
                <div className="calvoro-journal-link-list">
                  {newTools.map((tool) => (
                    <Link key={tool.path} to={tool.path}>
                      {tool.name}
                      <span aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="calvoro-journal-side-card calvoro-journal-side-note">
                <h2>How the journal works</h2>
                <p>
                  Every guide is written to explain a calculation or workflow
                  you can check yourself. Articles link to the matching CALVORO
                  tool, and every tool runs on your device unless a page states
                  otherwise.
                </p>
                <Link to="/about">About CALVORO →</Link>
              </section>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
