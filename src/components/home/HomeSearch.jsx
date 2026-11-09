import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import {
  calculatorCatalog,
  extraDirectoryTools,
  matchesCatalogSearch,
  utilityTools,
} from "../../calculatorCatalog.js";
import { categoryColor } from "../../design/categoryIcons.js";
import ToolGlyph from "../tools/ToolGlyph.jsx";

const allTools = [...utilityTools, ...calculatorCatalog, ...extraDirectoryTools];

export default function HomeSearch() {
  const navigate = useNavigate();
  const listId = useId();
  const rootRef = useRef(null);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => {
    const trimmed = query.trim();

    if (!trimmed) {
      return [];
    }

    return allTools.filter((tool) => matchesCatalogSearch(tool, trimmed));
  }, [query]);

  const visibleResults = results.slice(0, 6);
  const hasQuery = query.trim().length > 0;

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open]);

  const goToTool = (tool) => {
    setOpen(false);
    navigate(tool.path);
  };

  const goToDirectory = () => {
    const trimmed = query.trim();
    setOpen(false);
    navigate(trimmed ? `/tools?q=${encodeURIComponent(trimmed)}` : "/tools");
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) =>
        visibleResults.length ? (index + 1) % visibleResults.length : 0
      );
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      setActiveIndex((index) =>
        visibleResults.length
          ? (index - 1 + visibleResults.length) % visibleResults.length
          : 0
      );
      return;
    }

    if (event.key === "Enter") {
      if (visibleResults[activeIndex]) {
        event.preventDefault();
        goToTool(visibleResults[activeIndex]);
      }
      return;
    }

    if (event.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div className="calvoro-search" ref={rootRef}>
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          goToDirectory();
        }}
      >
        <label className="calvoro-visually-hidden" htmlFor="calvoro-tool-search">
          Search calculators and tools
        </label>

        <div className="calvoro-search-shell">
          <Search size={20} aria-hidden="true" />

          <input
            id="calvoro-tool-search"
            type="search"
            role="combobox"
            aria-expanded={open && visibleResults.length > 0}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={
              open && visibleResults[activeIndex]
                ? `${listId}-${activeIndex}`
                : undefined
            }
            autoComplete="off"
            placeholder="Search a calculator or tool — try BMI, EMI, PDF, GPA"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onKeyDown={handleKeyDown}
          />

          {hasQuery ? (
            <button
              type="button"
              className="calvoro-search-clear"
              aria-label="Clear search"
              onClick={() => {
                setQuery("");
                setActiveIndex(0);
                setOpen(false);
              }}
            >
              <X size={16} aria-hidden="true" />
            </button>
          ) : null}

          <button type="submit" className="calvoro-search-submit">
            Search
          </button>
        </div>
      </form>

      {open && hasQuery ? (
        <div className="calvoro-search-results" id={listId} role="listbox">
          {visibleResults.length > 0 ? (
            visibleResults.map((tool, index) => {
              return (
                <button
                  key={tool.path}
                  id={`${listId}-${index}`}
                  type="button"
                  role="option"
                  aria-selected={index === activeIndex}
                  className={`calvoro-search-result${
                    index === activeIndex ? " is-active" : ""
                  }`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => goToTool(tool)}
                >
                  <span
                    className="calvoro-search-result-icon"
                    style={{ background: categoryColor(tool.category) }}
                    aria-hidden="true"
                  >
                    <ToolGlyph tool={tool} size={16} strokeWidth={2} />
                  </span>

                  <span className="calvoro-search-result-copy">
                    <strong>{tool.name}</strong>
                    <small>{tool.description}</small>
                  </span>

                  <span
                    className="calvoro-search-result-category"
                    style={{ color: categoryColor(tool.category) }}
                  >
                    {tool.category}
                  </span>
                </button>
              );
            })
          ) : (
            <p className="calvoro-search-results-empty">
              No tools match “{query.trim()}”. Try a shorter word or browse the
              full directory.
            </p>
          )}

          <button type="button" className="calvoro-search-all" onClick={goToDirectory}>
            See all {results.length} results in the directory
            <span aria-hidden="true">→</span>
          </button>
        </div>
      ) : null}
    </div>
  );
}
