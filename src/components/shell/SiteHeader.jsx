import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { calculatorCategories } from "../../calculatorCatalog.js";
import { categoryColor, categoryIcons } from "../../design/categoryIcons.js";
import BrandMark from "./BrandMark.jsx";

const navItems = [
  { label: "Calculators", to: "/#calculators" },
  { label: "Journal", to: "/blog" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const browseCategories = calculatorCategories.filter(
  (category) => category !== "All"
);

export default function SiteHeader() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const toggleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMenuOpen(false);
    setCategoriesOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== "Escape") {
        return;
      }

      if (categoriesOpen) {
        setCategoriesOpen(false);
        toggleRef.current?.focus();
      }

      setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [categoriesOpen]);

  useEffect(() => {
    if (!categoriesOpen) {
      return undefined;
    }

    const onPointerDown = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setCategoriesOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [categoriesOpen]);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const isPathActive = (path) =>
    path === "/"
      ? location.pathname === "/"
      : location.pathname === path || location.pathname.startsWith(`${path}/`);

  return (
    <>
      <header
        className={`calvoro-global-header${scrolled ? " is-scrolled" : ""}${
          menuOpen ? " is-open" : ""
        }`}
      >
        <div className="calvoro-header-inner">
          <Link to="/" className="calvoro-brand" aria-label="CALVORO home">
            <BrandMark />
            <span className="calvoro-brand-name">
              CALVORO<span className="calvoro-brand-dot">.</span>
            </span>
            <span className="calvoro-brand-tools">Tools</span>
          </Link>

          <nav className="calvoro-main-nav" aria-label="Main navigation">
            <Link
              to="/#calculators"
              className={`calvoro-nav-link${
                location.pathname === "/" && location.hash === "#calculators"
                  ? " active"
                  : ""
              }`}
            >
              Calculators
            </Link>

            <div
              className={`calvoro-nav-dropdown${categoriesOpen ? " is-open" : ""}`}
              ref={dropdownRef}
            >
              <button
                type="button"
                ref={toggleRef}
                className="calvoro-nav-link"
                aria-expanded={categoriesOpen}
                aria-haspopup="true"
                onClick={() => setCategoriesOpen((open) => !open)}
              >
                Categories
                <ChevronDown size={14} aria-hidden="true" />
              </button>

              <div className="calvoro-nav-dropdown-panel">
                <div className="calvoro-nav-dropdown-grid">
                  {browseCategories.map((category) => {
                    const Icon = categoryIcons[category] || Search;

                    return (
                      <Link
                        key={category}
                        to={`/tools?category=${encodeURIComponent(category)}`}
                        className="calvoro-nav-dropdown-item"
                        onClick={() => setCategoriesOpen(false)}
                      >
                        <span
                          className="calvoro-nav-dropdown-icon"
                          style={{ background: categoryColor(category) }}
                          aria-hidden="true"
                        >
                          <Icon size={15} />
                        </span>
                        {category}
                      </Link>
                    );
                  })}
                </div>

                <Link
                  to="/tools"
                  className="calvoro-nav-dropdown-all"
                  onClick={() => setCategoriesOpen(false)}
                >
                  Browse every tool <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {navItems.slice(1).map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`calvoro-nav-link${
                  isPathActive(item.to) ? " active" : ""
                }`}
                aria-current={isPathActive(item.to) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="calvoro-header-actions">
            <Link to="/tools" className="calvoro-header-button">
              <Search size={15} aria-hidden="true" />
              Find a tool
            </Link>

            <button
              type="button"
              className="calvoro-menu-toggle"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
              aria-controls="calvoro-mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? (
                <X size={21} aria-hidden="true" />
              ) : (
                <Menu size={21} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div
          id="calvoro-mobile-navigation"
          className="calvoro-mobile-drawer is-open"
        >
          <div className="calvoro-mobile-drawer-header">
            <Link
              to="/"
              className="calvoro-brand"
              onClick={() => setMenuOpen(false)}
            >
              <BrandMark />
              <span className="calvoro-brand-name">
                CALVORO<span className="calvoro-brand-dot">.</span>
              </span>
            </Link>

            <button
              type="button"
              className="calvoro-mobile-drawer-close"
              aria-label="Close navigation menu"
              onClick={() => setMenuOpen(false)}
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          <nav className="calvoro-mobile-drawer-nav" aria-label="Mobile navigation">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home <span aria-hidden="true">→</span>
            </Link>
            <Link to="/tools" onClick={() => setMenuOpen(false)}>
              All tools <span aria-hidden="true">→</span>
            </Link>
            <Link to="/#calculators" onClick={() => setMenuOpen(false)}>
              Calculators <span aria-hidden="true">→</span>
            </Link>
            <Link to="/blog" onClick={() => setMenuOpen(false)}>
              Journal <span aria-hidden="true">→</span>
            </Link>
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              About <span aria-hidden="true">→</span>
            </Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>
              Contact <span aria-hidden="true">→</span>
            </Link>
          </nav>

          <p className="calvoro-mobile-drawer-label">Browse categories</p>

          <div className="calvoro-mobile-drawer-categories">
            {browseCategories.map((category) => (
              <Link
                key={category}
                to={`/tools?category=${encodeURIComponent(category)}`}
                onClick={() => setMenuOpen(false)}
              >
                {category}
              </Link>
            ))}
          </div>

          <div className="calvoro-mobile-drawer-cta">
            <Link
              to="/tools"
              className="calvoro-primary-button"
              onClick={() => setMenuOpen(false)}
            >
              <Search size={16} aria-hidden="true" />
              Find a tool
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
