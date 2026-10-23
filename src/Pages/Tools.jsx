import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../SEO";
import {
  calculatorCatalog,
  directoryCategories,
  extraDirectoryTools,
  matchesCatalogSearch,
  utilityTools,
} from "../calculatorCatalog.js";

const tools = [
  ...utilityTools,
  ...calculatorCatalog,
  ...extraDirectoryTools,
];

export default function Tools() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory =
        activeCategory === "All" || tool.category === activeCategory;

      return matchesCategory && matchesCatalogSearch(tool, search);
    });
  }, [search, activeCategory]);

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("All");
  };

  return (
    <div className="calvoro-tools-page">
      <SEO
        title="All CALVORO Tools - Calculators, PDF, Image, Text and Developer Tools"
        description="Browse CALVORO calculators plus browser-based PDF, image, text, developer and productivity tools. Search by task and filter by category."
      />

      <section className="calvoro-home-hero calvoro-tools-hero">
        <div className="calvoro-container">
          <span className="calvoro-hero-label">Tool directory</span>
          <h1>All CALVORO tools</h1>
          <p>
            Calculators and browser utilities in one directory. PDF and image
            tools process files on your device, text and developer tools run
            locally, and every calculator keeps its existing page.
          </p>
        </div>
      </section>

      <main className="calvoro-home-section calvoro-paper-band">
        <div className="calvoro-container">
          <div className="calvoro-directory-toolbar">
            <label htmlFor="all-tools-search">
              Search calculators and extra tools
              <input
                id="all-tools-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Try PDF, BMI, image, JSON, or mortgage"
                className="calvoro-search-input"
                autoComplete="off"
              />
            </label>
            {(search || activeCategory !== "All") && (
              <button
                type="button"
                className="calvoro-clear-filters"
                onClick={clearFilters}
              >
                Clear search and category
              </button>
            )}
          </div>

          <div className="calvoro-category-row" role="group" aria-label="Tool categories">
            {directoryCategories.map((category) => {
              const count =
                category === "All"
                  ? tools.length
                  : tools.filter((tool) => tool.category === category).length;
              const active = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={active ? "calvoro-category active" : "calvoro-category"}
                  aria-pressed={active}
                >
                  <span>{category}</span>
                  <small>
                    {count} {count === 1 ? "tool" : "tools"}
                  </small>
                </button>
              );
            })}
          </div>

          <p className="calvoro-filter-status" aria-live="polite" aria-atomic="true">
            Showing {filteredTools.length} of {tools.length}
            {activeCategory === "All" ? " tools" : ` in ${activeCategory}`}
            {search.trim() ? ` matching “${search.trim()}”` : ""}.
          </p>

          {filteredTools.length > 0 ? (
            <div className="calvoro-calculator-grid">
              {filteredTools.map((tool) => (
                <Link
                  key={tool.path}
                  to={tool.path}
                  className="calvoro-calculator-card"
                >
                  <div className="calvoro-calculator-top">
                    <span className="calvoro-calculator-category">
                      {tool.category}
                    </span>
                    <span className="calvoro-calculator-arrow">→</span>
                  </div>
                  <h2>{tool.name}</h2>
                  <p>{tool.description}</p>
                  <span className="calvoro-calculator-link">Open tool</span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="calvoro-empty-state" role="status">
              <strong>No tools found</strong>
              <p>
                Nothing matched that search in{" "}
                {activeCategory === "All" ? "the full list" : activeCategory}.
              </p>
              <button
                type="button"
                className="calvoro-clear-filters"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
