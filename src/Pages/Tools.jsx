import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { LayoutGrid, Search, SlidersHorizontal } from "lucide-react";
import SEO from "../SEO";
import ToolCard from "../components/tools/ToolCard.jsx";
import Breadcrumbs from "../components/editorial/Breadcrumbs.jsx";
import {
  calculatorCatalog,
  directoryCategories,
  extraDirectoryTools,
  featuredCalculatorPaths,
  featuredUtilityTools,
  matchesCatalogSearch,
  utilityTools,
} from "../calculatorCatalog.js";

const tools = [...utilityTools, ...calculatorCatalog, ...extraDirectoryTools];

const featuredPaths = new Set([
  ...featuredCalculatorPaths,
  ...featuredUtilityTools.map((tool) => tool.path),
]);

const calculatorPaths = new Set(calculatorCatalog.map((tool) => tool.path));

const SORT_OPTIONS = [
  { value: "recommended", label: "Recommended" },
  { value: "az", label: "Name A–Z" },
  { value: "category", label: "Category" },
];

export default function Tools() {
  const [params, setParams] = useSearchParams();
  const rawCategory = params.get("category");
  const activeCategory = directoryCategories.includes(rawCategory)
    ? rawCategory
    : "All";
  const search = params.get("q") || "";
  const sort = SORT_OPTIONS.some((option) => option.value === params.get("sort"))
    ? params.get("sort")
    : "recommended";

  const updateParams = (changes) => {
    const next = new URLSearchParams(params);

    Object.entries(changes).forEach(([key, value]) => {
      if (!value || value === "All") {
        next.delete(key);
      } else {
        next.set(key, value);
      }
    });

    setParams(next, { replace: true });
  };

  const filteredTools = useMemo(() => {
    const filtered = tools.filter((tool) => {
      const matchesCategory =
        activeCategory === "All" || tool.category === activeCategory;

      return matchesCategory && matchesCatalogSearch(tool, search);
    });

    return [...filtered].sort((a, b) => {
      if (sort === "az") {
        return a.name.localeCompare(b.name);
      }

      if (sort === "category") {
        return (
          a.category.localeCompare(b.category) || a.name.localeCompare(b.name)
        );
      }

      const featuredDelta =
        Number(featuredPaths.has(b.path)) - Number(featuredPaths.has(a.path));

      return featuredDelta || a.name.localeCompare(b.name);
    });
  }, [activeCategory, search, sort]);

  const clearFilters = () => {
    const next = new URLSearchParams();
    next.set("sort", sort);
    setParams(next, { replace: true });
  };

  return (
    <div className="calvoro-tools-page">
      <SEO
        title="All CALVORO Tools - Calculators, PDF, Image, Text and Developer Tools"
        description="Browse CALVORO calculators plus browser-based PDF, image, text, developer and productivity tools. Search by task and filter by category."
      />

      <section className="calvoro-page-hero">
        <div className="calvoro-container">
          <div className="calvoro-page-hero-inner">
            <Breadcrumbs
              items={[{ label: "Home", to: "/" }, { label: "All tools" }]}
            />

            <span className="ui-eyebrow">Tool directory</span>
            <h1>Every CALVORO tool in one directory.</h1>
            <p>
              Calculators and browser utilities, searchable by task and filterable
              by category. PDF and image tools process files on your device, text
              and developer tools run locally, and every calculator keeps its
              existing page.
            </p>

            <div className="calvoro-page-hero-meta">
              <span className="calvoro-page-hero-chip">
                <LayoutGrid size={14} aria-hidden="true" />
                {tools.length} tools
              </span>
              <span className="calvoro-page-hero-chip">
                {calculatorCatalog.length} calculators
              </span>
              <span className="calvoro-page-hero-chip">
                {utilityTools.length} browser tools
              </span>
            </div>
          </div>
        </div>
      </section>

      <main className="calvoro-tools-main">
        <div className="calvoro-container">
          <div className="calvoro-directory-toolbar">
            <label htmlFor="all-tools-search">
              <span>
                <Search size={14} aria-hidden="true" /> Search calculators and
                browser tools
              </span>
              <input
                id="all-tools-search"
                type="search"
                value={search}
                onChange={(event) => updateParams({ q: event.target.value })}
                placeholder="Try PDF, BMI, image, JSON, or mortgage"
                className="calvoro-search-input"
                autoComplete="off"
              />
            </label>

            <label className="calvoro-tools-sort" htmlFor="all-tools-sort">
              <span>
                <SlidersHorizontal size={14} aria-hidden="true" /> Sort by
              </span>
              <select
                id="all-tools-sort"
                value={sort}
                onChange={(event) => updateParams({ sort: event.target.value })}
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            {(search || activeCategory !== "All") && (
              <button
                type="button"
                className="calvoro-clear-filters"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            )}
          </div>

          <div
            className="calvoro-category-row"
            role="group"
            aria-label="Tool categories"
          >
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
                  onClick={() => updateParams({ category })}
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
                <ToolCard
                  key={tool.path}
                  tool={tool}
                  action={
                    calculatorPaths.has(tool.path) ? "Open calculator" : "Open tool"
                  }
                />
              ))}
            </div>
          ) : (
            <div className="calvoro-empty-state" role="status">
              <strong>No tools found</strong>
              <p>
                Nothing matched that search in{" "}
                {activeCategory === "All" ? "the full list" : activeCategory}.
                Try a shorter word, another category, or clear the filters.
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
