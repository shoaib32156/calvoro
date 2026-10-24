
import {
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  Calculator,
  CalendarDays,
  Check,
  FileStack,
  FileText,
  HeartPulse,
  Image as ImageIcon,
  KeyRound,
  Languages,
  Landmark,
  Mail,
  Menu,
  Percent,
  PenLine,
  QrCode,
  Sparkles,
  Timer,
  Type,
  X,
} from "lucide-react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import SEO from "./SEO";
import {
  calculatorCatalog,
  calculatorCategories,
  featuredCalculatorPaths,
  featuredUtilityTools,
  matchesCatalogSearch,
  utilityTools,
} from "./calculatorCatalog.js";
import {
  articles,
  featuredArticles,
} from "./content/articles/index.js";
import ArticleCard from "./components/editorial/ArticleCard.jsx";

import MathSolver from "./Pages/MathSolver.jsx";
import ImageMathSolver from "./Pages/ImageMathSolver.jsx";
import Contact from "./Pages/Contact.jsx";
import PrivacyPolicy from "./Pages/PrivacyPolicy.jsx";
import Terms from "./Pages/Terms.jsx";
import About from "./Pages/About.jsx";
import HomeSEOContent from "./Pages/HomeSEOContent.jsx";

import AISummarizer from "./Pages/AISummarizer.jsx";
import AITextRewriter from "./AITexterRewriter.jsx";
import AIGrammarChecker from "./AIGrammarChecker.jsx";
import AITranslator from "./AITranslator.jsx";
import AITextGenerator from "./Pages/AITextGenerator.jsx";
import AIEmailWriter from "./Pages/AIEmailWriter.jsx";

import FAQ from "./Pages/FAQ.jsx";
import HowItWorks from "./Pages/HowItWorks.jsx";
import Tools from "./Pages/Tools.jsx";
import CalculatorGuide from "./Pages/CalculatorGuide.jsx";

import Blog from "./Pages/Blog.jsx";
import BlogArticle from "./Pages/BlogArticle.jsx";

// ======================================================
// CALCULATORS
// ======================================================

const PercentageCalculator = lazy(() =>
  import("./Pages/PercentageCalculator.jsx")
);

const AgeCalculator = lazy(() =>
  import("./Pages/AgeCalculator.jsx")
);

const BMICalculator = lazy(() =>
  import("./Pages/BMICalculator.jsx")
);

const LoanCalculator = lazy(() =>
  import("./Pages/LoanCalculator.jsx")
);

const EMICalculator = lazy(() =>
  import("./Pages/EMICalculator.jsx")
);

const CurrencyConverter = lazy(() =>
  import("./Pages/CurrencyConverter.jsx")
);

const DiscountCalculator = lazy(() =>
  import("./Pages/DiscountCalculator.jsx")
);

const TipCalculator = lazy(() =>
  import("./Pages/TipCalculator.jsx")
);

const TimeZoneConverter = lazy(() =>
  import("./Pages/TimeZoneConverter.jsx")
);

const GPACalculator = lazy(() =>
  import("./Pages/GPACalculator.jsx")
);

const UnitConverter = lazy(() =>
  import("./Pages/UnitConverter.jsx")
);

const FuelCostCalculator = lazy(() =>
  import("./Pages/FuelCostCalculator.jsx")
);

const MortgageCalculator = lazy(() =>
  import("./Pages/MortgageCalculator.jsx")
);

const SalaryCalculator = lazy(() =>
  import("./Pages/SalaryCalculator.jsx")
);

const CompoundInterestCalculator = lazy(() =>
  import("./Pages/CompoundInterestCalculator.jsx")
);

const TaxCalculator = lazy(() =>
  import("./Pages/TaxCalculator.jsx")
);

const ProfitMarginCalculator = lazy(() =>
  import("./Pages/ProfitMarginCalculator.jsx")
);

const BreakEvenCalculator = lazy(() =>
  import("./Pages/BreakEvenCalculator.jsx")
);

const ROICalculator = lazy(() =>
  import("./Pages/ROICalculator.jsx")
);

const PaybackPeriodCalculator = lazy(() =>
  import("./Pages/PaybackPeriodCalculator.jsx")
);

const InvestmentCalculator = lazy(() =>
  import("./Pages/InvestmentCalculator.jsx")
);

const SavingsCalculator = lazy(() =>
  import("./Pages/SavingsCalculator.jsx")
);

const InflationCalculator = lazy(() =>
  import("./Pages/InflationCalculator.jsx")
);

const PresentValueCalculator = lazy(() =>
  import("./Pages/PresentValueCalculator.jsx")
);

const FutureValueCalculator = lazy(() =>
  import("./Pages/FutureValueCalculator.jsx")
);

const NetWorthCalculator = lazy(() =>
  import("./Pages/NetWorthCalculator.jsx")
);

const PercentageChangeCalculator = lazy(() =>
  import("./Pages/PercentageChangeCalculator.jsx")
);

const AverageCalculator = lazy(() =>
  import("./Pages/AverageCalculator.jsx")
);

const FractionCalculator = lazy(() =>
  import("./Pages/FractionCalculator.jsx")
);

const RatioCalculator = lazy(() =>
  import("./Pages/RatioCalculator.jsx")
);

const TimeDurationCalculator = lazy(() =>
  import("./Pages/TimeDurationCalculator.jsx")
);

const DateDifferenceCalculator = lazy(() =>
  import("./Pages/DateDifferenceCalculator.jsx")
);

const SpeedCalculator = lazy(() =>
  import("./Pages/SpeedCalculator.jsx")
);

const DistanceCalculator = lazy(() =>
  import("./Pages/DistanceCalculator.jsx")
);

const PaceCalculator = lazy(() =>
  import("./Pages/PaceCalculator.jsx")
);

const RunningSpeedCalculator = lazy(() =>
  import("./Pages/RunningSpeedCalculator.jsx")
);

const TimeToRunCalculator = lazy(() =>
  import("./Pages/TimeToRunCalculator.jsx")
);

const RunningTimeCalculator = lazy(() =>
  import("./Pages/RunningTimeCalculator.jsx")
);

const RunningPaceCalculator = lazy(() =>
  import("./Pages/RunningPaceCalculator.jsx")
);

// ======================================================
// BROWSER UTILITIES
// ======================================================

const utilityPreviewIcons = {
  "/pdf-studio": FileStack,
  "/image-studio": ImageIcon,
  "/word-counter": Type,
  "/qr-code-generator": QrCode,
  "/password-generator": KeyRound,
  "/pomodoro-timer": Timer,
};

const toolComponents = {
  "/pdf-studio": lazy(() => import("./tools/PdfStudio.jsx")),
  "/image-studio": lazy(() => import("./tools/ImageStudio.jsx")),
  "/word-counter": lazy(() => import("./tools/WordCounter.jsx")),
  "/text-compare": lazy(() => import("./tools/TextCompare.jsx")),
  "/remove-duplicate-lines": lazy(() =>
    import("./tools/DuplicateLineRemover.jsx")
  ),
  "/text-cleanup": lazy(() => import("./tools/TextCleanup.jsx")),
  "/find-replace": lazy(() => import("./tools/FindReplace.jsx")),
  "/line-sorter": lazy(() => import("./tools/LineSorter.jsx")),
  "/qr-code-generator": lazy(() =>
    import("./tools/QrCodeGenerator.jsx")
  ),
  "/password-generator": lazy(() =>
    import("./tools/PasswordGenerator.jsx")
  ),
  "/uuid-generator": lazy(() => import("./tools/UuidGenerator.jsx")),
  "/pomodoro-timer": lazy(() => import("./tools/PomodoroTimer.jsx")),
  "/json-formatter": lazy(() => import("./tools/JsonFormatter.jsx")),
  "/csv-viewer": lazy(() => import("./tools/CsvViewer.jsx")),
  "/markdown-previewer": lazy(() =>
    import("./tools/MarkdownPreviewer.jsx")
  ),
  "/website-metadata-checker": lazy(() =>
    import("./tools/WebsiteMetadataChecker.jsx")
  ),
  "/color-palette-generator": lazy(() =>
    import("./tools/ColorPaletteGenerator.jsx")
  ),
  "/multiplication-practice": lazy(() =>
    import("./tools/MultiplicationPractice.jsx")
  ),
  "/vocabulary-flashcards": lazy(() =>
    import("./tools/VocabularyFlashcards.jsx")
  ),
};

// ======================================================
// CALCULATOR DATA
// ======================================================

const calculatorComponents = {
  "/percentage": PercentageCalculator,
  "/age": AgeCalculator,
  "/bmi": BMICalculator,
  "/loan": LoanCalculator,
  "/emi": EMICalculator,
  "/currency": CurrencyConverter,
  "/discount": DiscountCalculator,
  "/tip": TipCalculator,
  "/timezone": TimeZoneConverter,
  "/gpa": GPACalculator,
  "/unit": UnitConverter,
  "/fuel-cost": FuelCostCalculator,
  "/mortgage": MortgageCalculator,
  "/salary": SalaryCalculator,
  "/compound-interest": CompoundInterestCalculator,
  "/tax": TaxCalculator,
  "/profit-margin": ProfitMarginCalculator,
  "/break-even": BreakEvenCalculator,
  "/roi": ROICalculator,
  "/payback-period": PaybackPeriodCalculator,
  "/investment": InvestmentCalculator,
  "/savings": SavingsCalculator,
  "/inflation": InflationCalculator,
  "/present-value": PresentValueCalculator,
  "/future-value": FutureValueCalculator,
  "/net-worth": NetWorthCalculator,
  "/percentage-change": PercentageChangeCalculator,
  "/average": AverageCalculator,
  "/fraction": FractionCalculator,
  "/ratio": RatioCalculator,
  "/time-duration": TimeDurationCalculator,
  "/date-difference": DateDifferenceCalculator,
  "/speed": SpeedCalculator,
  "/distance": DistanceCalculator,
  "/pace": PaceCalculator,
  "/running-speed": RunningSpeedCalculator,
  "/time-to-run": TimeToRunCalculator,
  "/running-time": RunningTimeCalculator,
  "/running-pace": RunningPaceCalculator,
};

const calculators = calculatorCatalog.map((item) => ({
  ...item,
  component: calculatorComponents[item.path],
}));

const categories = calculatorCategories;

const popularCalculators = featuredCalculatorPaths
  .map((path) => calculators.find((calculator) => calculator.path === path))
  .filter(Boolean);

const popularCalculatorIcons = {
  "/percentage": Percent,
  "/age": CalendarDays,
  "/bmi": HeartPulse,
  "/loan": Landmark,
  "/emi": Landmark,
  "/discount": Percent,
};

// ======================================================
// GLOBAL HEADER
// ======================================================

function GlobalHeader() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  const isCalculatorPage = calculators.some(
    (calculator) => calculator.path === location.pathname
  );

  const isUtilityPage = utilityTools.some(
    (tool) => tool.path === location.pathname
  );

  const navClassName = (active = false) =>
    active ? "calvoro-nav-link active" : "calvoro-nav-link";

  return (
    <header
      className={`calvoro-global-header${menuOpen ? " is-open" : ""}`}
    >
      <div className="calvoro-header-inner">
        <Link
          to="/"
          className="calvoro-brand"
          aria-label="CALVORO home"
          onClick={() => setMenuOpen(false)}
        >
          <span className="calvoro-brand-mark" aria-hidden="true">C</span>
          <span>
            <strong>CALVORO</strong>
            <small>Online calculators</small>
          </span>
        </Link>

        <nav
          id="calvoro-primary-navigation"
          className={`calvoro-main-nav${menuOpen ? " is-open" : ""}`}
          aria-label="Main navigation"
        >
          <a
            href="/#calculators"
            className={navClassName(
              isCalculatorPage ||
              (location.pathname === "/" && location.hash === "#calculators")
            )}
            aria-current={
              isCalculatorPage ||
              (location.pathname === "/" && location.hash === "#calculators")
                ? "location"
                : undefined
            }
            onClick={() => setMenuOpen(false)}
          >
            Calculators
          </a>
          <a
            href="/#calculator-categories"
            className={navClassName(location.hash === "#calculator-categories")}
            aria-current={
              location.hash === "#calculator-categories" ? "location" : undefined
            }
            onClick={() => setMenuOpen(false)}
          >
            Categories
          </a>
          <a
            href="/#guides"
            className={navClassName(location.hash === "#guides")}
            aria-current={location.hash === "#guides" ? "location" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            Guides
          </a>
          <Link
            to="/blog"
            className={navClassName(isActive("/blog"))}
            aria-current={isActive("/blog") ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </Link>
          <Link
            to="/about"
            className={navClassName(isActive("/about"))}
            aria-current={isActive("/about") ? "page" : undefined}
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/tools"
            className={navClassName(
              isActive("/tools") || isUtilityPage
            )}
            aria-current={
              isActive("/tools") || isUtilityPage
                ? "page"
                : undefined
            }
            onClick={() => setMenuOpen(false)}
          >
            All tools
          </Link>
        </nav>

        <div className="calvoro-header-actions">
          <Link
            to="/tools"
            className="calvoro-header-button"
            onClick={() => setMenuOpen(false)}
          >
            Browse all tools <span aria-hidden="true">→</span>
          </Link>
          <button
            className="calvoro-menu-toggle"
            type="button"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="calvoro-primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>
    </header>
  );
}

// ======================================================
// GLOBAL FOOTER
// ======================================================

function GlobalFooter() {
  return (
    <footer className="calvoro-global-footer">

      <div className="calvoro-footer-inner">

        <div className="calvoro-footer-grid">

          <div>
            <div className="calvoro-footer-brand">
              CALVORO
            </div>

            <p className="calvoro-footer-description">
              Free browser-based calculators and utilities for math,
              finance, health, school, files, text, and everyday planning.
            </p>
          </div>

          <div>
            <h3>Explore</h3>

            <Link to="/tools">
              All Tools
            </Link>

            <Link to="/blog">
              Blog
            </Link>

            <Link to="/about">
              About
            </Link>
          </div>

          <div>
            <h3>Browser tools</h3>

            <Link to="/pdf-studio">
              PDF Studio
            </Link>

            <Link to="/image-studio">
              Image Studio
            </Link>

            <Link to="/word-counter">
              Word Counter
            </Link>

            <Link to="/json-formatter">
              JSON Formatter
            </Link>
          </div>

          <div>
            <h3>Popular</h3>

            <Link to="/percentage">
              Percentage Calculator
            </Link>

            <Link to="/bmi">
              BMI Calculator
            </Link>

            <Link to="/loan">
              Loan Calculator
            </Link>
          </div>

          <div>
            <h3>Information</h3>

            <Link to="/contact">
              Contact
            </Link>

            <Link to="/privacy-policy">
              Privacy Policy
            </Link>

            <Link to="/terms">
              Terms
            </Link>
          </div>

        </div>

        <div className="calvoro-footer-bottom">

          <span>
            © {new Date().getFullYear()} CALVORO.
            All rights reserved.
          </span>

          <span>
            Results are estimates based on the values you enter.
          </span>

        </div>

      </div>

    </footer>
  );
}

// ======================================================
// PAGE FRAME
// ======================================================

function PageFrame({ children }) {
  return (
    <div className="calvoro-page-frame">
      {children}
    </div>
  );
}

function RouteHashScroll() {
  const location = useLocation();

  useEffect(() => {
    const targetId = location.hash.slice(1);

    if (!targetId) {
      return undefined;
    }

    const frame = requestAnimationFrame(() => {
      document.getElementById(targetId)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });

    return () => cancelAnimationFrame(frame);
  }, [location.hash, location.pathname]);

  return null;
}

// ======================================================
// LOADING
// ======================================================

function Loading() {
  return (
    <div className="calvoro-loading">

      <div className="calvoro-loading-box">

        <div className="calvoro-loading-mark">
          C
        </div>

        <div>
          <strong>CALVORO</strong>
          <span>Loading tool...</span>
        </div>

      </div>

    </div>
  );
}

// ======================================================
// CALCULATOR PAGE SEO WRAPPER
// ======================================================

function CalculatorPage({
  calculator,
}) {
  const CalculatorComponent =
    calculator.component;

  return (
    <>
      <SEO
        title={`${calculator.name} - Free Online Calculator | CALVORO`}
        description={`${calculator.description} Use the free ${calculator.name} on CALVORO for quick, clear and easy calculations.`}
      />

      {calculator.path === "/percentage" ? (
        <CalculatorComponent />
      ) : (
        <UniversalCalculatorFrame
          calculator={calculator}
        />
      )}
    </>
  );
}

// ======================================================
// UNIVERSAL CALCULATOR FRAME
// ======================================================

function UniversalCalculatorFrame({
  calculator,
}) {
  const CalculatorComponent =
    calculator.component;

  const relatedCalculators =
    calculators
      .filter(
        (item) =>
          item.path !== calculator.path &&
          item.category === calculator.category
      )
      .slice(0, 3);

  return (
    <div className="calvoro-universal-calculator-page">

      {/* HERO */}

      <section className="calvoro-universal-hero">

        <div className="calvoro-universal-container">

          <nav className="calvoro-universal-breadcrumb" aria-label="Breadcrumb">
            <ol>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/#calculators">Calculators</Link></li>
              <li aria-current="page">{calculator.name}</li>
            </ol>
          </nav>

          <div className="calvoro-universal-hero-grid">

            <div>

              <span className="calvoro-universal-category">
                {calculator.category}
              </span>

              <h1>
                {calculator.name}
              </h1>

              <p>
                {calculator.description}
              </p>

            </div>

            <div className="calvoro-universal-icon">
              <Calculator size={34} strokeWidth={1.7} aria-hidden="true" />
            </div>

          </div>

        </div>

      </section>

      {/* MAIN */}

      <main className="calvoro-universal-main">

        <div className="calvoro-universal-container">

          <div className="calvoro-universal-layout">

            {/* CALCULATOR */}

            <section className="calvoro-universal-tool-card">

              <div className="calvoro-universal-tool-heading">

                <span>
                  CALVORO TOOL
                </span>

                <h2>
                  {calculator.name}
                </h2>

              </div>

              <div className="calvoro-universal-tool">

                <CalculatorComponent />

              </div>

            </section>

            {/* SIDEBAR */}

            <aside className="calvoro-universal-sidebar">

              <div className="calvoro-universal-sidebar-card">

                <span>
                  ABOUT THIS TOOL
                </span>

                <div className="calvoro-universal-sidebar-icon">
                  <Calculator size={22} strokeWidth={1.8} aria-hidden="true" />
                </div>

                <h3>
                  {calculator.name}
                </h3>

                <p>
                  {calculator.description}
                </p>

                <div className="calvoro-universal-sidebar-category">
                  {calculator.category}
                </div>

              </div>

              {relatedCalculators.length > 0 && (
                <div className="calvoro-universal-sidebar-card">

                  <span>
                    RELATED TOOLS
                  </span>

                  <h3>
                    More calculators
                  </h3>

                  <div className="calvoro-universal-related">

                    {relatedCalculators.map(
                      (item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                        >
                          {item.name}

                          <small>
                            Open calculator →
                          </small>
                        </Link>
                      )
                    )}

                  </div>

                </div>
              )}

              <div className="calvoro-universal-sidebar-card calvoro-universal-blue">

                <span>
                  CALVORO JOURNAL
                </span>

                <h3>
                  Learn more
                </h3>

                <p>
                  Explore practical guides,
                  explanations, formulas,
                  and everyday tips in the
                  CALVORO Blog.
                </p>

                <Link to="/blog">
                  Read the Blog →
                </Link>

              </div>

            </aside>

          </div>

          {/* SHARED CALCULATOR GUIDE */}

          <CalculatorGuide
            calculator={calculator}
          />

        </div>

      </main>

      {/* UNIVERSAL CALCULATOR STYLES */}

      <style>
        {`
          .calvoro-universal-calculator-page {
            min-height: 100vh;
            background: var(--calvoro-bg);
            color: var(--calvoro-text);
          }

          .calvoro-universal-container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding-left: 24px;
            padding-right: 24px;
          }

          .calvoro-universal-hero {
            background: #ffffff;
            color: var(--calvoro-text);
            border-bottom: 1px solid var(--calvoro-border);
          }

          .calvoro-universal-breadcrumb {
            padding-top: 28px;
            margin-bottom: 25px;
          }

          .calvoro-universal-breadcrumb ol {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin: 0;
            padding: 0;
            list-style: none;
            color: var(--calvoro-muted);
            font-size: 12px;
          }

          .calvoro-universal-breadcrumb li + li::before {
            content: "/";
            margin-right: 8px;
            color: #94a3b8;
          }

          .calvoro-universal-breadcrumb a {
            color: #475569;
            text-decoration: none;
          }

          .calvoro-universal-breadcrumb a:hover {
            color: var(--calvoro-blue);
          }

          .calvoro-universal-breadcrumb [aria-current="page"] {
            color: var(--calvoro-navy);
            font-weight: 700;
          }

          .calvoro-universal-hero-grid {
            display: grid;
            grid-template-columns:
              minmax(0, 1fr) 95px;
            gap: 30px;
            align-items: center;
            padding-bottom: 42px;
          }

          .calvoro-universal-category {
            display: inline-flex;
            padding: 6px 10px;
            border: 1px solid #bfdbfe;
            border-radius: 6px;
            background: var(--calvoro-blue-light);
            color: var(--calvoro-blue-dark);
            font-size: 10px;
            font-weight: 900;
            letter-spacing: 1px;
            text-transform: uppercase;
          }

          .calvoro-universal-hero h1 {
            margin: 14px 0 10px;
            color: var(--calvoro-navy);
            font-size:
              clamp(36px,5vw,54px);
            line-height: 1.05;
            letter-spacing: -0.045em;
            font-weight: 950;
          }

          .calvoro-universal-hero p {
            max-width: 700px;
            margin: 0;
            color: var(--calvoro-muted);
            font-size: 16px;
            line-height: 1.8;
          }

          .calvoro-universal-icon {
            width: 88px;
            height: 88px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #bfdbfe;
            border-radius: 16px;
            background: var(--calvoro-blue-light);
            color: var(--calvoro-blue);
          }

          .calvoro-universal-main {
            padding: 48px 0 80px;
          }

          .calvoro-universal-layout {
            display: grid;
            grid-template-columns:
              minmax(0,1fr) 300px;
            gap: 28px;
            align-items: start;
          }

          .calvoro-universal-tool-card {
            background: #ffffff;
            border: 1px solid var(--calvoro-border);
            border-radius: 16px;
            box-shadow: var(--calvoro-shadow);
            overflow: hidden;
          }

          .calvoro-universal-tool-heading {
            padding: 22px 24px;
            border-bottom: 1px solid var(--calvoro-border);
            background: #ffffff;
          }

          .calvoro-universal-tool-heading span,
          .calvoro-universal-info > span,
          .calvoro-universal-sidebar-card > span {
            display: block;
            margin-bottom: 8px;
            color: #2563eb;
            font-size: 9px;
            font-weight: 900;
            letter-spacing: 1.1px;
          }

          .calvoro-universal-tool-heading h2 {
            margin: 0;
            color: #0f172a;
            font-size: 21px;
            font-weight: 900;
          }

          .calvoro-universal-tool {
            padding: 24px;
            min-width: 0;
          }

          .calvoro-universal-tool > div:first-child {
            min-height: auto !important;
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            background: transparent !important;
            box-shadow: none !important;
          }

          .calvoro-universal-tool header {
            display: none !important;
          }

          .calvoro-universal-tool footer {
            display: none !important;
          }

          .calvoro-universal-tool input,
          .calvoro-universal-tool textarea,
          .calvoro-universal-tool select {
            border-radius: 10px !important;
          }

          .calvoro-universal-tool button {
            border-radius: 10px !important;
          }

          .calvoro-universal-sidebar {
            display: grid;
            gap: 16px;
          }

          .calvoro-universal-sidebar-card {
            padding: 21px;
            background: #ffffff;
            border: 1px solid var(--calvoro-border);
            border-radius: 14px;
          }

          .calvoro-universal-sidebar-icon {
            width: 46px;
            height: 46px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 12px;
            border-radius: 9px;
            background: var(--calvoro-blue-light);
            color: var(--calvoro-blue);
          }

          .calvoro-universal-sidebar-card h3 {
            margin: 0 0 8px;
            color: #0f172a;
            font-size: 17px;
            font-weight: 900;
          }

          .calvoro-universal-sidebar-card p {
            margin: 0;
            color: #64748b;
            font-size: 12px;
            line-height: 1.75;
          }

          .calvoro-universal-sidebar-category {
            display: inline-flex;
            margin-top: 14px;
            padding: 5px 8px;
            border-radius: 4px;
            background: #f1f5f9;
            color: #475569;
            font-size: 9px;
            font-weight: 900;
            text-transform: uppercase;
          }

          .calvoro-universal-related {
            display: grid;
            gap: 8px;
          }

          .calvoro-universal-related a {
            display: block;
            padding: 10px;
            border: 1px solid #e2e8f0;
            border-radius: 9px;
            background: #f8fafc;
            color: #0f172a;
            text-decoration: none;
            font-size: 12px;
            font-weight: 800;
          }

          .calvoro-universal-related a:hover {
            color: #1d4ed8;
            border-color: #bfdbfe;
          }

          .calvoro-universal-related small {
            display: block;
            margin-top: 3px;
            color: #64748b;
            font-size: 9px;
            font-weight: 700;
          }

          .calvoro-universal-blue {
            background: var(--calvoro-blue-light);
            border: 1px solid #bfdbfe;
          }

          .calvoro-universal-blue > span {
            color: var(--calvoro-blue-dark);
          }

          .calvoro-universal-blue h3 {
            color: var(--calvoro-navy);
          }

          .calvoro-universal-blue p {
            color: #475569;
          }

          .calvoro-universal-blue a {
            display: inline-flex;
            margin-top: 15px;
            padding: 9px 11px;
            border-radius: 8px;
            background: var(--calvoro-blue);
            color: #ffffff;
            text-decoration: none;
            font-size: 11px;
            font-weight: 900;
          }

          @media (max-width: 900px) {

            .calvoro-universal-layout {
              grid-template-columns: 1fr;
            }

            .calvoro-universal-sidebar {
              grid-template-columns:
                repeat(2,minmax(0,1fr));
            }

            .calvoro-universal-blue {
              grid-column: 1 / -1;
            }

          }

          @media (max-width: 650px) {

            .calvoro-universal-container {
              padding-left: 17px;
              padding-right: 17px;
            }

            .calvoro-universal-hero-grid {
              grid-template-columns: 1fr 64px;
              gap: 12px;
            }

            .calvoro-universal-icon {
              width: 60px;
              height: 60px;
              justify-self: end;
            }

            .calvoro-universal-breadcrumb {
              padding-top: 20px;
            }

            .calvoro-universal-main {
              padding: 34px 0 55px;
            }

            .calvoro-universal-tool {
              padding: 16px;
            }

            .calvoro-universal-sidebar {
              grid-template-columns: 1fr;
            }

            .calvoro-universal-blue {
              grid-column: auto;
            }

          }
        `}
      </style>

    </div>
  );
}

// ======================================================
// AI TOOL CARD
// ======================================================

function AIToolCard({
  icon,
  badge,
  title,
  description,
  path,
}) {
  return (
    <Link
      to={path}
      className="calvoro-ai-card"
    >

      <div className="calvoro-ai-card-top">

        <span className="calvoro-ai-icon">
          {icon}
        </span>

        <span className="calvoro-ai-badge">
          {badge}
        </span>

      </div>

      <h3>
        {title}
      </h3>

      <p>
        {description}
      </p>

      <span className="calvoro-card-link">
        Open tool →
      </span>

    </Link>
  );
}

// ======================================================
// BROWSER TOOLS PREVIEW
// ======================================================

function BrowserToolsPreview() {
  const previewTools = featuredUtilityTools.slice(0, 6);

  return (
    <section
      id="browser-tools"
      className="calvoro-home-section calvoro-browser-tools-band"
    >

      <div className="calvoro-container">

        <div className="calvoro-editorial-heading calvoro-browser-tools-heading">

          <div>

            <span className="calvoro-eyebrow">
              Browser utilities
            </span>

            <h2>
              Useful tools for files, text, and code
            </h2>

            <p>
              PDF, image, writing, and developer utilities that run in
              your browser. Your files stay on your device.
            </p>

          </div>

          <Link
            to="/tools"
            className="calvoro-outline-button"
          >
            Browse all {utilityTools.length} tools →
          </Link>

        </div>

        <div className="calvoro-browser-tools-grid">

          {previewTools.map((tool) => {
            const Icon = utilityPreviewIcons[tool.path] || Calculator;

            return (
              <Link
                key={tool.path}
                to={tool.path}
                className="calvoro-browser-tool-card"
              >
                <div className="calvoro-browser-tool-top">
                  <span
                    className="calvoro-browser-tool-icon"
                    aria-hidden="true"
                  >
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                  <span className="calvoro-browser-tool-category">
                    {tool.category}
                  </span>
                </div>

                <h3>{tool.name}</h3>
                <p>{tool.description}</p>

                <span className="calvoro-browser-tool-action">
                  Open tool <b aria-hidden="true">→</b>
                </span>
              </Link>
            );
          })}

        </div>

      </div>

    </section>
  );
}

// ======================================================
// BLOG PREVIEW
// ======================================================

function BlogPreview() {
  return (
    <section
      id="guides"
      className="calvoro-home-section calvoro-light-band"
    >

      <div className="calvoro-container">

        <div className="calvoro-editorial-heading">

          <div>

            <span className="calvoro-eyebrow">
              CALVORO Journal
            </span>

            <h2>
              Guides for smarter everyday decisions
            </h2>

            <p>
              {articles.length} original guides explain the formulas,
              assumptions, and tradeoffs behind the calculators.
            </p>

          </div>

          <Link
            to="/blog"
            className="calvoro-outline-button"
          >
            Browse all {articles.length} guides →
          </Link>

        </div>

        <div className="calvoro-home-articles-grid">

          {featuredArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}

        </div>

      </div>

    </section>
  );
}

function AIToolsSection() {
  return (
    <section
      id="ai-tools"
      className="calvoro-home-section calvoro-white-band"
    >
      <div className="calvoro-container">
        <div className="calvoro-section-heading">
          <span className="calvoro-eyebrow">
            Extra writing tools
          </span>
          <h2>Optional AI writing helpers</h2>
          <p>
            These sit alongside the calculators. Use them when you need a
            summary, rewrite, translation, grammar check, or email draft.
          </p>
        </div>

        <div className="calvoro-ai-grid">
          <AIToolCard
            icon={<FileText size={21} strokeWidth={1.8} aria-hidden="true" />}
            badge="AVAILABLE"
            title="AI Text Summarizer"
            description="Turn long articles, notes and other text into clear, easy-to-read summaries."
            path="/ai-summarizer"
          />
          <AIToolCard
            icon={<PenLine size={21} strokeWidth={1.8} aria-hidden="true" />}
            badge="AVAILABLE"
            title="AI Text Rewriter"
            description="Rewrite your text in different tones while keeping the original meaning clear."
            path="/ai-rewriter"
          />
          <AIToolCard
            icon={<Check size={21} strokeWidth={2} aria-hidden="true" />}
            badge="AVAILABLE"
            title="AI Grammar Checker"
            description="Check grammar, spelling, punctuation and sentence clarity with CALVORO AI."
            path="/ai-grammar-checker"
          />
          <AIToolCard
            icon={<Languages size={21} strokeWidth={1.8} aria-hidden="true" />}
            badge="AVAILABLE"
            title="AI Text Translator"
            description="Translate your text into another language quickly and easily."
            path="/ai-translator"
          />
          <AIToolCard
            icon={<Sparkles size={21} strokeWidth={1.8} aria-hidden="true" />}
            badge="AVAILABLE"
            title="AI Text Generator"
            description="Generate useful content from a topic, content type and writing tone."
            path="/ai-text-generator"
          />
          <AIToolCard
            icon={<Mail size={21} strokeWidth={1.8} aria-hidden="true" />}
            badge="AVAILABLE"
            title="AI Email Writer"
            description="Create clear and professional emails from a simple description."
            path="/ai-email-writer"
          />
        </div>
      </div>
    </section>
  );
}

// ======================================================
// HOME
// ======================================================

function Home() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] =
    useState("All");

  const clearFilters = () => {
    setSearch("");
    setActiveCategory("All");
  };

  const filteredCalculators = useMemo(() => {
    return calculators.filter((calculator) => {
      const matchesCategory =
        activeCategory === "All" ||
        calculator.category === activeCategory;

      return (
        matchesCategory &&
        matchesCatalogSearch(calculator, search)
      );
    });
  }, [search, activeCategory]);

  return (
    <>

      <SEO
        title="CALVORO - Free Online Calculators"
        description="Search CALVORO's free online calculators for percentages, loans, BMI, GPA, savings, and other everyday calculations. Filter by category and open a tool in your browser."
      />

      {/* HERO */}

      <section className="calvoro-home-hero">

        <div className="calvoro-container">

          <div className="calvoro-hero-layout">

            <div className="calvoro-hero-copy">

              <span className="calvoro-hero-label">
                CALVORO • Free online calculators
              </span>

              <h1>
                Find a calculator
                <br />
                for the number you need.
              </h1>

              <p>
                Search by name or task, then filter by category.
                Each calculator runs in your browser and uses the
                values you enter.
              </p>

              <form
                className="calvoro-hero-search"
                role="search"
                onSubmit={(event) => {
                  event.preventDefault();
                  const calculatorSection =
                    document.getElementById("calculators");

                  if (calculatorSection) {
                    calculatorSection.scrollIntoView({
                      behavior: "smooth",
                    });
                  }
                }}
              >
                <label htmlFor="home-calculator-search">
                  Search the calculator library
                </label>

                <div className="calvoro-hero-search-controls">
                  <input
                    id="home-calculator-search"
                    type="search"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Try EMI, BMI, mortgage, tip, or GPA"
                    autoComplete="off"
                    className="calvoro-search-input"
                  />

                  <button
                    className="calvoro-hero-search-button"
                    type="submit"
                  >
                    Find a tool
                    <span aria-hidden="true">→</span>
                  </button>
                </div>
              </form>

              <div className="calvoro-hero-actions">

                <a
                  href="#calculators"
                  className="calvoro-primary-button"
                >
                  Explore calculators
                  <span>→</span>
                </a>

                <Link
                  to="/tools"
                  className="calvoro-secondary-button"
                >
                  View all tools
                </Link>

              </div>

            </div>

            <div className="calvoro-hero-feature">
              <div className="calvoro-featured-heading">
                <div>
                  <div className="calvoro-feature-kicker">A good place to start</div>
                  <h2>Featured calculators</h2>
                </div>
                <span className="calvoro-featured-count">
                  {calculators.length} tools
                </span>
              </div>

              <p className="calvoro-featured-intro">
                Open a frequently used calculator, or browse the full
                directory below.
              </p>

              <div className="calvoro-featured-tool-list">
                {popularCalculators.slice(0, 4).map((calculator) => {
                  const Icon =
                    popularCalculatorIcons[calculator.path] || Calculator;

                  return (
                    <Link
                      key={calculator.path}
                      to={calculator.path}
                      className="calvoro-featured-tool"
                    >
                      <span className="calvoro-featured-tool-icon">
                        <Icon size={18} strokeWidth={1.9} aria-hidden="true" />
                      </span>
                      <span className="calvoro-featured-tool-copy">
                        <strong>{calculator.name}</strong>
                        <small>{calculator.category}</small>
                      </span>
                      <span className="calvoro-featured-tool-arrow" aria-hidden="true">
                        →
                      </span>
                    </Link>
                  );
                })}
              </div>

              <a href="#calculators" className="calvoro-featured-all-link">
                Browse all calculators <span aria-hidden="true">→</span>
              </a>
            </div>

          </div>

        </div>

      </section>

      {/* CALCULATORS */}

      <section
        id="calculators"
        className="calvoro-home-section calvoro-paper-band"
      >

        <div className="calvoro-container">

          <div className="calvoro-editorial-heading">

            <div>

              <span className="calvoro-eyebrow">
                Calculator directory
              </span>

              <h2>
                Online calculators
              </h2>

              <p>
                Category buttons narrow the list. Search also
                matches common names such as EMI, body mass, or
                split bill.
              </p>

            </div>

            <div className="calvoro-tool-count">
              {calculators.length} tools
            </div>

          </div>

          <div className="calvoro-directory-toolbar">
            <label htmlFor="directory-calculator-search">
              Filter this list
              <input
                id="directory-calculator-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Type a calculator name or task"
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

          <div className="calvoro-category-row" id="calculator-categories">

            {categories.map((category) => {
              const count =
                category === "All"
                  ? calculators.length
                  : calculators.filter(
                      (calculator) => calculator.category === category
                    ).length;
              const active =
                activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setActiveCategory(
                      category
                    )
                  }
                  className={
                    active
                      ? "calvoro-category active"
                      : "calvoro-category"
                  }
                  aria-pressed={active}
                >
                  <span>{category}</span>
                  <small>{count} {count === 1 ? "tool" : "tools"}</small>
                </button>
              );
            })}

          </div>

          <p
            className="calvoro-filter-status"
            aria-live="polite"
            aria-atomic="true"
          >
            Showing {filteredCalculators.length} of {calculators.length}
            {activeCategory === "All"
              ? " calculators"
              : ` in ${activeCategory}`}
            {search.trim() ? ` matching “${search.trim()}”` : ""}.
          </p>

          {filteredCalculators.length > 0 ? (

            <div className="calvoro-calculator-grid">

              {filteredCalculators.map(
                (calculator) => (
                  <Link
                    key={calculator.path}
                    to={calculator.path}
                    className="calvoro-calculator-card"
                  >

                    <div className="calvoro-calculator-top">

                      <span className="calvoro-calculator-category">
                        {calculator.category}
                      </span>

                      <span className="calvoro-calculator-arrow">
                        →
                      </span>

                    </div>

                    <h3>
                      {calculator.name}
                    </h3>

                    <p>
                      {calculator.description}
                    </p>

                    <span className="calvoro-calculator-link">
                      Open calculator
                    </span>

                  </Link>
                )
              )}

            </div>

          ) : (

            <div className="calvoro-empty-state" role="status">

              <strong>
                No calculators found
              </strong>

              <p>
                Nothing matched that search in {activeCategory === "All" ? "the full list" : activeCategory}.
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

      </section>

      <section className="calvoro-home-section calvoro-white-band">

        <div className="calvoro-container">

          <div className="calvoro-about-layout">

            <div>

              <span className="calvoro-eyebrow">
                About CALVORO
              </span>

              <h2>
                Calculators first, extra tools second.
              </h2>

            </div>

            <div>

              <p className="calvoro-about-text">
                CALVORO is a directory of free calculators. Open a tool,
                enter the requested values, and read the result on the
                same page. Writing helpers and math solvers are listed
                separately so they do not mix into the calculator grid.
              </p>

              <Link
                to="/about"
                className="calvoro-text-link"
              >
                Learn more about CALVORO →
              </Link>

            </div>

          </div>

        </div>

      </section>

      <BrowserToolsPreview />

      <HomeSEOContent />

      <section className="calvoro-component-band">
        <HowItWorks />
      </section>

      <BlogPreview />

      <section className="calvoro-component-band">
        <FAQ />
      </section>

      <AIToolsSection />

    </>
  );
}

// ======================================================
// 404
// ======================================================

function NotFound() {
  return (
    <div className="calvoro-not-found">

      <div>

        <span className="calvoro-eyebrow">
          CALVORO
        </span>

        <div className="calvoro-404-number">
          404
        </div>

        <h1>
          Page not found
        </h1>

        <p>
          The page you're looking for doesn't
          exist or may have moved.
        </p>

        <Link
          to="/"
          className="calvoro-primary-button"
        >
          Back to CALVORO
          <span>→</span>
        </Link>

      </div>

    </div>
  );
}

// ======================================================
// GLOBAL CALVORO STYLE
// ======================================================

function GlobalCalvoroStyle() {
  return (
    <style>
      {`
        .calvoro-global-header {
          position: sticky;
          top: 0;
          z-index: 1000;
          width: 100%;
          background: #ffffff;
          color: #172033;
          border-bottom: 1px solid var(--calvoro-border);
          box-shadow: 0 3px 14px rgba(15, 23, 42, 0.035);
        }

        .calvoro-header-inner {
          width: 100%;
          max-width: 1240px;
          min-height: 72px;
          margin: 0 auto;
          padding: 0 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 28px;
        }

        .calvoro-brand {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          gap: 10px;
          color: var(--calvoro-navy);
          text-decoration: none;
        }

        .calvoro-brand:hover {
          color: var(--calvoro-navy);
        }

        .calvoro-brand-mark {
          width: 38px;
          height: 38px;
          border-radius: 11px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--calvoro-blue);
          color: #ffffff;
          font-size: 19px;
          font-weight: 900;
          box-shadow: 0 4px 11px rgba(37, 99, 235, 0.18);
        }

        .calvoro-brand strong {
          display: block;
          color: var(--calvoro-navy);
          font-size: 17px;
          font-weight: 900;
          letter-spacing: 1px;
          line-height: 1;
        }

        .calvoro-brand small {
          display: block;
          margin-top: 4px;
          color: var(--calvoro-muted);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.3px;
        }

        .calvoro-main-nav {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          margin-left: auto;
        }

        .calvoro-nav-link {
          display: inline-flex;
          align-items: center;
          min-height: 40px;
          padding: 0 11px;
          border-radius: 8px;
          color: #475569 !important;
          text-decoration: none;
          font-size: 13px;
          font-weight: 700;
          white-space: nowrap;
          transition: background-color 0.18s ease, color 0.18s ease;
        }

        .calvoro-nav-link:hover,
        .calvoro-nav-link:focus-visible,
        .calvoro-nav-link.active {
          background: var(--calvoro-blue-light);
          color: var(--calvoro-blue-dark) !important;
        }

        .calvoro-header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .calvoro-header-button {
          display: inline-flex;
          justify-content: center;
          min-height: 40px;
          align-items: center;
          gap: 9px;
          padding: 0 15px;
          border-radius: 9px;
          background: var(--calvoro-blue);
          color: #ffffff;
          text-decoration: none;
          font-size: 12px;
          font-weight: 800;
          white-space: nowrap;
        }

        .calvoro-header-button:hover {
          color: #ffffff;
          background: var(--calvoro-blue-dark);
        }

        .calvoro-menu-toggle {
          display: none;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border: 1px solid var(--calvoro-border);
          border-radius: 10px;
          background: #ffffff;
          color: var(--calvoro-navy);
          cursor: pointer;
        }

        .calvoro-page-frame {
          min-height: 65vh;
          background:
            linear-gradient(
              180deg,
              #f8fafc 0%,
              #f5f7fa 100%
            );
        }

        .calvoro-container {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding-left: 24px;
          padding-right: 24px;
        }

        .calvoro-home-section {
          padding:
            72px 0;
        }

        .calvoro-white-band {
          background: #ffffff;
          border-top:
            1px solid #eef2f7;
          border-bottom:
            1px solid #eef2f7;
        }

        .calvoro-light-band {
          background:
            #f8fafc;
          border-top:
            1px solid #e2e8f0;
          border-bottom:
            1px solid #e2e8f0;
        }

        .calvoro-paper-band {
          background:
            #f5f7fa;
          border-top:
            1px solid #e2e8f0;
          border-bottom:
            1px solid #e2e8f0;
        }

        .calvoro-component-band {
          background:
            #ffffff;
          border-top:
            1px solid #eef2f7;
          border-bottom:
            1px solid #eef2f7;
        }

        .calvoro-home-hero {
          background: #f8fafc;
          color: var(--calvoro-text);
          border-bottom: 1px solid var(--calvoro-border);
        }

        .calvoro-hero-layout {
          min-height: 430px;
          display: grid;
          grid-template-columns:
            minmax(0,1.2fr)
            minmax(300px,0.8fr);
          align-items: center;
          gap: 56px;
        }

        .calvoro-hero-copy {
          padding: 54px 0;
        }

        .calvoro-hero-label {
          display: inline-flex;
          padding: 6px 10px;
          border: 1px solid #bfdbfe;
          background: var(--calvoro-blue-light);
          border-radius: 6px;
          color: var(--calvoro-blue-dark);
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.2px;
        }

        .calvoro-hero-copy h1 {
          max-width: 680px;
          margin: 19px 0 15px;
          color: var(--calvoro-navy);
          font-size: clamp(40px, 5.2vw, 62px);
          line-height: 1.02;
          letter-spacing: -0.05em;
          font-weight: 900;
        }

        .calvoro-hero-copy h1 span {
          color: var(--calvoro-blue);
        }

        .calvoro-hero-copy p {
          max-width: 590px;
          margin: 0;
          color: var(--calvoro-muted);
          font-size: 16px;
          line-height: 1.75;
        }

        .calvoro-hero-search {
          max-width: 600px;
          margin-top: 22px;
        }

        .calvoro-hero-search label {
          display: block;
          margin-bottom: 8px;
          color: var(--calvoro-navy);
          font-size: 13px;
          font-weight: 750;
        }

        .calvoro-hero-search-controls {
          display: flex;
          gap: 9px;
        }

        .calvoro-hero-search .calvoro-search-input {
          min-width: 0;
          min-height: 50px;
          border: 1px solid var(--calvoro-border-dark) !important;
          border-radius: 10px !important;
          background: #ffffff !important;
          color: var(--calvoro-text) !important;
          box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04) !important;
        }

        .calvoro-route-content .calvoro-hero-search-button {
          display: inline-flex;
          flex: 0 0 auto;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 50px;
          padding: 0 17px;
          border: 1px solid var(--calvoro-blue);
          border-radius: 10px !important;
          background: var(--calvoro-blue);
          color: #ffffff;
          font-size: 14px;
          font-weight: 800;
          cursor: pointer;
        }

        .calvoro-route-content .calvoro-hero-search-button:hover {
          border-color: var(--calvoro-blue-dark);
          background: var(--calvoro-blue-dark);
        }

        .calvoro-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 11px;
          margin-top: 18px;
        }

        .calvoro-primary-button,
        .calvoro-secondary-button,
        .calvoro-outline-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 44px;
          padding:
            11px 17px;
          border-radius: 6px;
          text-decoration: none;
          font-size: 13px;
          font-weight: 850;
        }

        .calvoro-primary-button {
          background: #2563eb;
          color: #ffffff;
          box-shadow:
            0 8px 22px rgba(0,0,0,.18);
        }

        .calvoro-primary-button:hover {
          background: #3b82f6;
          color: #ffffff;
        }

        .calvoro-secondary-button {
          background: #ffffff;
          color: var(--calvoro-navy);
          border: 1px solid var(--calvoro-border-dark);
        }

        .calvoro-secondary-button:hover {
          background: #f8fafc;
          color: var(--calvoro-navy);
        }

        .calvoro-hero-feature {
          align-self: center;
          margin: 28px 0;
          padding: 25px;
          background: #ffffff;
          border: 1px solid var(--calvoro-border);
          border-radius: 16px;
          box-shadow: var(--calvoro-shadow);
        }

        .calvoro-feature-kicker {
          margin-bottom: 10px;
          color: var(--calvoro-blue-dark);
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.25px;
          text-transform: uppercase;
        }

        .calvoro-hero-feature h2 {
          max-width: 300px;
          margin: 0 0 17px;
          color: var(--calvoro-navy);
          font-size: 21px;
          line-height: 1.3;
          font-weight: 850;
        }

        .calvoro-hero-category-list {
          display: grid;
          gap: 7px;
        }

        .calvoro-route-content .calvoro-hero-category {
          display: flex;
          align-items: center;
          gap: 11px;
          width: 100%;
          min-height: 60px;
          padding: 8px 10px;
          border: 1px solid #edf0f5;
          border-radius: 10px !important;
          background: #ffffff;
          text-align: left;
          cursor: pointer;
        }

        .calvoro-route-content .calvoro-hero-category:hover {
          border-color: #bfdbfe;
          background: #f8fbff;
        }

        .calvoro-hero-category-icon {
          display: grid;
          flex: 0 0 38px;
          width: 38px;
          height: 38px;
          place-items: center;
          border-radius: 9px;
          background: var(--calvoro-blue-light);
          color: var(--calvoro-blue);
        }

        .calvoro-hero-category-copy {
          display: grid;
          flex: 1;
          gap: 2px;
        }

        .calvoro-hero-category-copy strong {
          color: var(--calvoro-navy);
          font-size: 13px;
        }

        .calvoro-hero-category-copy small {
          color: var(--calvoro-muted);
          font-size: 11px;
        }

        .calvoro-hero-category-arrow {
          padding: 0 4px;
          color: #94a3b8;
          font-size: 17px;
        }

        .calvoro-hero-category-note {
          margin: 13px 0 0;
          color: var(--calvoro-muted);
          font-size: 11px;
        }

        .calvoro-feature-link {
          display: inline-block;
          margin-top: 22px;
          color: var(--calvoro-blue-dark);
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
        }

        .calvoro-feature-link:hover {
          color: var(--calvoro-blue);
        }

        .calvoro-eyebrow {
          display: inline-flex;
          align-items: center;
          padding:
            6px 10px;
          border-radius: 4px;
          background:
            #eff6ff;
          color:
            #1d4ed8;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.1px;
          text-transform: uppercase;
        }

        .calvoro-section-heading {
          max-width:
            760px;
          margin:
            0 auto 38px;
          text-align:
            center;
        }

        .calvoro-section-heading h2,
        .calvoro-editorial-heading h2,
        .calvoro-about-layout h2 {
          margin:
            13px 0 10px;
          color:
            #0f172a;
          font-size:
            clamp(29px,4vw,39px);
          line-height:
            1.15;
          letter-spacing:
            -.035em;
          font-weight:
            900;
        }

        .calvoro-section-heading p,
        .calvoro-editorial-heading p {
          margin: 0;
          color:
            #64748b;
          font-size: 15px;
          line-height: 1.8;
        }

        .calvoro-ai-grid {
          display: grid;
          grid-template-columns:
            repeat(3,minmax(0,1fr));
          gap: 20px;
        }

        .calvoro-ai-card {
          display: flex;
          flex-direction: column;
          padding: 24px;
          min-height: 245px;
          background: #ffffff;
          border:
            1px solid #e2e8f0;
          border-radius: 14px;
          color: inherit;
          text-decoration: none;
          box-shadow:
            var(--calvoro-shadow);
          transition:
            transform .18s ease,
            box-shadow .18s ease,
            border-color .18s ease;
        }

        .calvoro-ai-card:hover {
          color: inherit;
          transform:
            translateY(-3px);
          box-shadow:
            var(--calvoro-shadow-hover);
          border-color:
            #bfdbfe;
        }

        .calvoro-ai-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .calvoro-ai-icon {
          width: 47px;
          height: 47px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 7px;
          background: #eff6ff;
          color: #1d4ed8;
          font-size: 22px;
        }

        .calvoro-ai-badge {
          padding: 5px 8px;
          border-radius: 4px;
          background: #ecfdf5;
          color: #047857;
          font-size: 9px;
          font-weight: 900;
          letter-spacing: .8px;
        }

        .calvoro-ai-card h3 {
          margin:
            19px 0 9px;
          color:
            #0f172a;
          font-size:
            19px;
          font-weight:
            900;
        }

        .calvoro-ai-card p {
          margin: 0;
          color:
            #64748b;
          font-size:
            13px;
          line-height:
            1.75;
          flex: 1;
        }

        .calvoro-card-link,
        .calvoro-popular-card span,
        .calvoro-blog-preview-card > span,
        .calvoro-calculator-link,
        .calvoro-text-link {
          color:
            #2563eb;
          font-size:
            12px;
          font-weight:
            850;
          text-decoration:
            none;
        }

        .calvoro-card-link {
          margin-top: 20px;
        }

        .calvoro-editorial-heading {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 25px;
          margin-bottom: 35px;
        }

        .calvoro-outline-button {
          flex: 0 0 auto;
          color: #1d4ed8;
          background: #ffffff;
          border:
            1px solid #cbd5e1;
        }

        .calvoro-outline-button:hover {
          color: #1d4ed8;
          border-color: #93c5fd;
          background: #eff6ff;
        }

        .calvoro-popular-grid {
          display: grid;
          grid-template-columns:
            repeat(3,minmax(0,1fr));
          gap: 18px;
        }

        .calvoro-popular-card {
          padding: 23px;
          background: #ffffff;
          border:
            1px solid #e2e8f0;
          border-radius: 14px;
          text-decoration: none;
          color: inherit;
          transition:
            transform .18s ease,
            box-shadow .18s ease;
        }

        .calvoro-popular-card:hover {
          transform:
            translateY(-2px);
          box-shadow:
            var(--calvoro-shadow-hover);
        }

        .calvoro-popular-icon {
          width: 44px;
          height: 44px;
          display:
            inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 7px;
          background:
            #eff6ff;
          color:
            #2563eb;
          font-size:
            21px;
        }

        .calvoro-popular-card h3 {
          margin:
            17px 0 8px;
          color:
            #0f172a;
          font-size:
            18px;
          font-weight:
            900;
        }

        .calvoro-popular-card p {
          margin:
            0 0 18px;
          color:
            #64748b;
          font-size:
            13px;
          line-height:
            1.7;
        }

        .calvoro-blog-preview-grid {
          display:
            grid;
          grid-template-columns:
            repeat(3,minmax(0,1fr));
          gap: 20px;
        }

        .calvoro-blog-preview-card {
          padding:
            25px;
          background:
            #ffffff;
          border:
            1px solid #e2e8f0;
          border-radius: 14px;
          box-shadow:
            var(--calvoro-shadow);
          text-decoration:
            none;
          color:
            inherit;
        }

        .calvoro-blog-preview-card:hover {
          color:
            inherit;
          box-shadow:
            var(--calvoro-shadow-hover);
        }

        .calvoro-blog-preview-meta {
          color:
            #2563eb;
          font-size:
            10px;
          font-weight:
            900;
          text-transform:
            uppercase;
          letter-spacing:
            1px;
        }

        .calvoro-blog-preview-card h3 {
          margin:
            13px 0 9px;
          color:
            #0f172a;
          font-size:
            20px;
          font-weight:
            900;
          line-height:
            1.25;
        }

        .calvoro-blog-preview-card p {
          margin:
            0 0 18px;
          color:
            #64748b;
          font-size:
            13px;
          line-height:
            1.75;
        }

        .calvoro-tool-count {
          padding:
            8px 11px;
          border-radius:
            5px;
          background:
            #ffffff;
          border:
            1px solid #dbe3ec;
          color:
            #475569;
          font-size:
            12px;
          font-weight:
            800;
        }

        .calvoro-search-row {
          margin-bottom:
            17px;
        }

        .calvoro-search-input {
          width:
            100%;
          min-height:
            48px;
          border:
            1px solid #cbd5e1 !important;
          border-radius:
            6px !important;
          padding:
            12px 14px !important;
          background:
            #ffffff !important;
          color:
            #0f172a !important;
          font-size:
            14px !important;
          box-shadow:
            none !important;
        }

        .calvoro-category-row {
          display:
            flex;
          flex-wrap:
            wrap;
          gap:
            7px;
          margin-bottom:
            26px;
          scroll-margin-top: 88px;
        }

        .calvoro-category {
          padding:
            8px 11px;
          border:
            1px solid #dbe3ec;
          border-radius:
            5px;
          background:
            #ffffff;
          color:
            #475569;
          font-size:
            11px;
          font-weight:
            800;
          cursor:
            pointer;
        }

        .calvoro-category:hover {
          border-color:
            #93c5fd;
          color:
            #1d4ed8;
        }

        .calvoro-category.active {
          background:
            #1d4ed8;
          border-color:
            #1d4ed8;
          color:
            #ffffff;
        }

        .calvoro-calculator-grid {
          display:
            grid;
          grid-template-columns:
            repeat(4,minmax(0,1fr));
          gap:
            15px;
        }

        .calvoro-calculator-card {
          min-height:
            174px;
          padding:
            19px;
          display:
            flex;
          flex-direction:
            column;
          background:
            #ffffff;
          border:
            1px solid #e2e8f0;
          border-radius:
            12px;
          color:
            inherit;
          text-decoration:
            none;
          transition:
            transform .16s ease,
            box-shadow .16s ease,
            border-color .16s ease;
        }

        .calvoro-calculator-card:hover {
          color:
            inherit;
          transform:
            translateY(-2px);
          border-color:
            #bfdbfe;
          box-shadow:
            var(--calvoro-shadow);
        }

        .calvoro-calculator-top {
          display:
            flex;
          align-items:
            center;
          justify-content:
            space-between;
          gap:
            10px;
        }

        .calvoro-calculator-category {
          color:
            #2563eb;
          font-size:
            9px;
          font-weight:
            900;
          letter-spacing:
            1px;
          text-transform:
            uppercase;
        }

        .calvoro-calculator-arrow {
          color:
            #94a3b8;
          font-size:
            14px;
          font-weight:
            900;
        }

        .calvoro-calculator-card h2,
        .calvoro-calculator-card h3 {
          margin:
            15px 0 8px;
          color:
            #0f172a;
          font-size:
            16px;
          line-height:
            1.3;
          font-weight:
            900;
        }

        .calvoro-calculator-card p {
          margin:
            0;
          color:
            #64748b;
          font-size:
            12px;
          line-height:
            1.65;
          flex:
            1;
        }

        .calvoro-calculator-link {
          margin-top:
            15px;
        }

        .calvoro-empty-state {
          padding:
            60px 20px;
          text-align:
            center;
          background:
            #ffffff;
          border:
            1px solid #e2e8f0;
          border-radius:
            8px;
        }

        .calvoro-empty-state strong {
          color:
            #0f172a;
          font-size:
            18px;
        }

        .calvoro-empty-state p {
          margin:
            8px 0 0;
          color:
            #64748b;
        }

        .calvoro-about-layout {
          display:
            grid;
          grid-template-columns:
            minmax(0,.8fr)
            minmax(0,1.2fr);
          gap:
            70px;
          align-items:
            start;
        }

        .calvoro-about-text {
          margin:
            0 0 19px;
          color:
            #64748b;
          font-size:
            15px;
          line-height:
            1.85;
        }

        .calvoro-text-link:hover {
          color:
            #1d4ed8;
        }

        .calvoro-global-footer {
          background:
            #0f172a;
          color:
            #cbd5e1;
        }

        .calvoro-footer-inner {
          width:
            100%;
          max-width:
            1200px;
          margin:
            0 auto;
          padding:
            60px 24px 25px;
        }

        .calvoro-footer-grid {
          display:
            grid;
          grid-template-columns:
            1.35fr .7fr 1fr .8fr .8fr;
          gap:
            36px;
          padding-bottom:
            40px;
          border-bottom:
            1px solid rgba(255,255,255,.08);
        }

        .calvoro-footer-brand {
          color:
            #ffffff;
          font-size:
            21px;
          font-weight:
            900;
          letter-spacing:
            1.5px;
        }

        .calvoro-footer-description {
          max-width:
            350px;
          margin:
            13px 0 0;
          color:
            #94a3b8;
          font-size:
            13px;
          line-height:
            1.75;
        }

        .calvoro-global-footer h3 {
          margin:
            0 0 14px;
          color:
            #ffffff;
          font-size:
            12px;
          text-transform:
            uppercase;
          letter-spacing:
            1px;
        }

        .calvoro-global-footer a {
          display:
            block;
          margin-bottom:
            9px;
          color:
            #94a3b8;
          text-decoration:
            none;
          font-size:
            12px;
        }

        .calvoro-global-footer a:hover {
          color:
            #ffffff;
        }

        .calvoro-footer-bottom {
          padding-top:
            20px;
          display:
            flex;
          justify-content:
            space-between;
          gap:
            15px;
          flex-wrap:
            wrap;
          color:
            #64748b;
          font-size:
            11px;
        }

        .calvoro-loading {
          min-height:
            55vh;
          display:
            flex;
          align-items:
            center;
          justify-content:
            center;
          background:
            #f8fafc;
        }

        .calvoro-loading-box {
          display:
            flex;
          align-items:
            center;
          gap:
            12px;
          padding:
            16px 18px;
          background:
            #ffffff;
          border:
            1px solid #e2e8f0;
          border-radius:
            7px;
          box-shadow:
            var(--calvoro-shadow);
        }

        .calvoro-loading-mark {
          width:
            38px;
          height:
            38px;
          display:
            flex;
          align-items:
            center;
          justify-content:
            center;
          border-radius:
            6px;
          background:
            #2563eb;
          color:
            #ffffff;
          font-weight:
            900;
        }

        .calvoro-loading-box strong {
          display:
            block;
          color:
            #0f172a;
          font-size:
            13px;
        }

        .calvoro-loading-box span {
          display:
            block;
          margin-top:
            3px;
          color:
            #64748b;
          font-size:
            11px;
        }

        .calvoro-not-found {
          min-height:
            65vh;
          display:
            flex;
          align-items:
            center;
          justify-content:
            center;
          padding:
            60px 24px;
          text-align:
            center;
          background:
            #f8fafc;
        }

        .calvoro-404-number {
          margin:
            20px 0 5px;
          color:
            #1d4ed8;
          font-size:
            86px;
          line-height:
            .9;
          font-weight:
            950;
          letter-spacing:
            -.06em;
        }

        .calvoro-not-found h1 {
          margin:
            10px 0;
          color:
            #0f172a;
          font-size:
            32px;
        }

        .calvoro-not-found p {
          margin:
            0 0 23px;
          color:
            #64748b;
          line-height:
            1.7;
        }

        .calvoro-route-content {
          background:
            #f5f7fa;
        }

        .calvoro-route-content footer {
          display:
            none !important;
        }

        .calvoro-route-content header:not(.calvoro-article-hero):not(.calvoro-tool-hero) {
          display:
            none !important;
        }

        .calvoro-route-content h1,
        .calvoro-route-content h2,
        .calvoro-route-content h3,
        .calvoro-route-content h4 {
          letter-spacing:
            -.025em;
        }

        .calvoro-route-content input,
        .calvoro-route-content textarea,
        .calvoro-route-content select {
          border-radius: 10px !important;
        }

        .calvoro-route-content button {
          border-radius: 10px !important;
        }

        .calvoro-route-content img {
          max-width:
            100%;
        }

        @media (max-width: 1050px) {

          .calvoro-ai-grid {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

          .calvoro-calculator-grid {
            grid-template-columns:
              repeat(3,minmax(0,1fr));
          }

          .calvoro-footer-grid {
            grid-template-columns:
              repeat(3,minmax(0,1fr));
          }

          .calvoro-footer-grid > div:first-child {
            grid-column: 1 / -1;
          }

        }

        @media (max-width: 850px) {

          .calvoro-header-inner {
            min-height: 66px;
            padding: 10px 18px;
            gap: 12px;
            flex-wrap: wrap;
          }

          .calvoro-main-nav {
            display: none;
            order: 3;
            width: 100%;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 5px;
            margin: 0;
            padding: 0 0 5px;
          }

          .calvoro-main-nav.is-open {
            display: grid;
          }

          .calvoro-nav-link {
            min-height: 44px;
            padding: 0 12px;
            background: #f8fafc;
          }

          .calvoro-header-button {
            display: none;
          }

          .calvoro-menu-toggle {
            display: inline-flex;
          }

          .calvoro-hero-layout {
            grid-template-columns: 1fr;
            min-height: auto;
            gap: 10px;
          }

          .calvoro-hero-copy {
            padding: 50px 0 22px;
          }

          .calvoro-hero-feature {
            margin: 0 0 42px;
          }

          .calvoro-popular-grid,
          .calvoro-blog-preview-grid {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

          .calvoro-calculator-grid {
            grid-template-columns:
              repeat(2,minmax(0,1fr));
          }

          .calvoro-about-layout {
            grid-template-columns:
              1fr;
            gap:
              25px;
          }

        }

        @media (max-width: 620px) {

          .calvoro-container {
            padding-left:
              17px;
            padding-right:
              17px;
          }

          .calvoro-home-section {
            padding:
              52px 0;
          }

          .calvoro-header-inner {
            min-height: 62px;
            padding: 9px 17px;
          }

          .calvoro-brand strong {
            font-size:
              17px;
          }

          .calvoro-brand small {
            font-size:
              7px;
          }

          .calvoro-hero-copy h1 {
            font-size: clamp(39px, 11vw, 44px);
          }

          .calvoro-hero-copy p {
            font-size:
              15px;
          }

          .calvoro-hero-search-controls {
            gap: 7px;
          }

          .calvoro-route-content .calvoro-hero-search-button {
            padding: 0 12px;
            font-size: 12px;
          }

          .calvoro-hero-feature {
            padding: 20px;
          }

          .calvoro-section-heading,
          .calvoro-editorial-heading {
            margin-bottom:
              26px;
          }

          .calvoro-editorial-heading {
            align-items:
              flex-start;
            flex-direction:
              column;
          }

          .calvoro-ai-grid,
          .calvoro-popular-grid,
          .calvoro-blog-preview-grid,
          .calvoro-calculator-grid {
            grid-template-columns:
              1fr;
          }

          .calvoro-category-row {
            overflow-x:
              auto;
            flex-wrap:
              nowrap;
            padding-bottom:
              3px;
          }

          .calvoro-category {
            flex:
              0 0 auto;
          }

          .calvoro-footer-grid {
            grid-template-columns:
              1fr 1fr;
            gap:
              28px;
          }

          .calvoro-footer-bottom {
            flex-direction:
              column;
          }

        }

        .calvoro-home-hero {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at 84% 16%, rgba(219, 234, 254, 0.78), transparent 28%),
            linear-gradient(135deg, #f8fbff 0%, #ffffff 54%, #f1f6ff 100%);
        }

        .calvoro-hero-layout {
          min-height: 550px;
          grid-template-columns: minmax(0, 1.15fr) minmax(350px, 0.85fr);
          gap: clamp(32px, 5vw, 72px);
        }

        .calvoro-hero-copy {
          padding: 72px 0;
        }

        .calvoro-hero-copy h1 {
          max-width: 700px;
          margin-top: 23px;
          font-size: clamp(42px, 5.6vw, 68px);
          line-height: 1.04;
          letter-spacing: -0.055em;
        }

        .calvoro-hero-copy p {
          max-width: 540px;
          font-size: 17px;
          line-height: 1.7;
        }

        .calvoro-hero-search {
          max-width: 650px;
          margin-top: 28px;
          padding: 14px;
          border: 1px solid #e2e8f0;
          border-radius: 15px;
          background: rgba(255, 255, 255, 0.94);
          box-shadow: 0 12px 34px rgba(15, 23, 42, 0.075);
        }

        .calvoro-hero-search label {
          margin: 0 0 9px 2px;
          color: #334155;
          font-size: 12px;
          font-weight: 800;
        }

        .calvoro-hero-search-controls {
          gap: 8px;
        }

        .calvoro-hero-search .calvoro-search-input {
          border-color: #d7e0ec !important;
          border-radius: 9px !important;
          box-shadow: none !important;
        }

        .calvoro-route-content .calvoro-hero-search-button {
          min-width: 118px;
          border-radius: 9px !important;
        }

        .calvoro-hero-actions {
          margin-top: 18px;
        }

        .calvoro-primary-button,
        .calvoro-secondary-button,
        .calvoro-outline-button {
          min-height: 46px;
          border-radius: 9px;
        }

        .calvoro-primary-button {
          box-shadow: 0 7px 16px rgba(37, 99, 235, 0.18);
        }

        .calvoro-hero-feature {
          width: 100%;
          max-width: 480px;
          justify-self: end;
          margin: 24px 0;
          padding: clamp(22px, 3vw, 32px);
          border-color: #e1e8f2;
          border-radius: 20px;
          box-shadow: 0 22px 55px rgba(15, 23, 42, 0.09);
        }

        .calvoro-featured-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .calvoro-feature-kicker {
          margin-bottom: 7px;
          letter-spacing: 1px;
        }

        .calvoro-hero-feature h2 {
          max-width: none;
          margin: 0;
          font-size: clamp(20px, 2.2vw, 25px);
          letter-spacing: -0.035em;
        }

        .calvoro-featured-count {
          flex: 0 0 auto;
          padding: 6px 9px;
          border: 1px solid #e2e8f0;
          border-radius: 999px;
          color: #64748b;
          font-size: 10px;
          font-weight: 800;
        }

        .calvoro-featured-intro {
          margin: 9px 0 17px;
          color: #64748b;
          font-size: 13px;
          line-height: 1.6;
        }

        .calvoro-featured-tool-list {
          display: grid;
          gap: 8px;
        }

        .calvoro-featured-tool {
          display: flex;
          min-width: 0;
          align-items: center;
          gap: 12px;
          padding: 10px 11px;
          border: 1px solid #e8edf4;
          border-radius: 11px;
          background: #ffffff;
          color: inherit;
          text-decoration: none;
          transition: border-color 0.18s ease, background-color 0.18s ease, transform 0.18s ease;
        }

        .calvoro-featured-tool:hover {
          transform: translateY(-1px);
          border-color: #bfdbfe;
          background: #f8fbff;
          color: inherit;
        }

        .calvoro-featured-tool-icon {
          display: grid;
          flex: 0 0 38px;
          width: 38px;
          height: 38px;
          place-items: center;
          border-radius: 10px;
          background: #eff6ff;
          color: #2563eb;
        }

        .calvoro-featured-tool-copy {
          display: grid;
          min-width: 0;
          flex: 1;
          gap: 3px;
        }

        .calvoro-featured-tool-copy strong {
          overflow: hidden;
          color: #172033;
          font-size: 13px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .calvoro-featured-tool-copy small {
          color: #64748b;
          font-size: 11px;
        }

        .calvoro-featured-tool-arrow {
          flex: 0 0 auto;
          color: #94a3b8;
          font-size: 18px;
        }

        .calvoro-featured-all-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 17px;
          color: #1d4ed8;
          font-size: 12px;
          font-weight: 850;
          text-decoration: none;
        }

        .calvoro-home-section {
          padding: 76px 0;
        }

        .calvoro-category-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 10px;
          margin-bottom: 28px;
          overflow: visible;
        }

        .calvoro-category {
          display: flex;
          min-width: 0;
          min-height: 64px;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 4px;
          padding: 10px 13px;
          border-radius: 12px;
          text-align: left;
          font-size: 12px;
        }

        .calvoro-category small {
          color: #64748b;
          font-size: 10px;
          font-weight: 650;
        }

        .calvoro-category.active small {
          color: rgba(255, 255, 255, 0.82);
        }

        .calvoro-calculator-grid {
          grid-auto-rows: 1fr;
          gap: 16px;
        }

        .calvoro-calculator-card {
          min-height: 190px;
          padding: 21px;
          border-radius: 15px;
          box-shadow: 0 3px 12px rgba(15, 23, 42, 0.025);
        }

        .calvoro-calculator-card h2,
        .calvoro-calculator-card h3 {
          font-size: 16px;
          letter-spacing: -0.02em;
        }

        .calvoro-calculator-card p {
          font-size: 13px;
        }

        .calvoro-ai-card,
        .calvoro-blog-preview-card {
          min-height: 250px;
          border-radius: 16px;
          box-shadow: 0 4px 16px rgba(15, 23, 42, 0.035);
        }

        .calvoro-ai-card {
          padding: 25px;
        }

        .calvoro-ai-card h3,
        .calvoro-blog-preview-card h3 {
          letter-spacing: -0.025em;
        }

        .calvoro-ai-icon {
          border-radius: 11px;
        }

        .calvoro-blog-preview-card {
          display: flex;
          flex-direction: column;
          min-height: 270px;
          padding: 26px;
        }

        .calvoro-blog-preview-card p {
          flex: 1;
        }

        .calvoro-about-layout {
          gap: clamp(30px, 7vw, 90px);
        }

        .calvoro-about-layout h2 {
          max-width: 410px;
        }

        .calvoro-about-text {
          max-width: 620px;
          margin-bottom: 16px;
          font-size: 15px;
        }

        .calvoro-seo-disclosure {
          border-top: 1px solid #e2e8f0;
          border-bottom: 1px solid #e2e8f0;
          background: #f8fafc;
        }

        .calvoro-seo-disclosure > summary {
          display: flex;
          max-width: 1200px;
          min-height: 100px;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          margin: 0 auto;
          padding: 20px 24px;
          color: #172033;
          cursor: pointer;
          list-style: none;
        }

        .calvoro-seo-disclosure > summary::-webkit-details-marker {
          display: none;
        }

        .calvoro-seo-disclosure > summary > span:first-child {
          display: grid;
          gap: 5px;
        }

        .calvoro-seo-disclosure > summary strong {
          color: #10213b;
          font-size: 15px;
        }

        .calvoro-seo-disclosure > summary small {
          font-size: 12px;
        }

        .calvoro-seo-disclosure-icon {
          display: grid;
          flex: 0 0 34px;
          width: 34px;
          height: 34px;
          place-items: center;
          border: 1px solid #dbe3ec;
          border-radius: 50%;
          background: #ffffff;
          color: #2563eb;
          font-size: 21px;
          transition: transform 0.18s ease;
        }

        .calvoro-seo-disclosure[open] .calvoro-seo-disclosure-icon {
          transform: rotate(45deg);
        }

        .calvoro-seo-disclosure > section {
          border-top: 1px solid #e2e8f0 !important;
        }

        @media (min-width: 721px) and (max-width: 850px) {
          .calvoro-hero-layout {
            min-height: 500px;
            grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
            gap: 24px;
          }

          .calvoro-hero-copy {
            padding: 52px 0;
          }

          .calvoro-hero-copy h1 {
            font-size: clamp(38px, 5.3vw, 48px);
          }

          .calvoro-hero-feature {
            padding: 21px;
          }

          .calvoro-featured-tool {
            gap: 9px;
            padding: 8px;
          }
        }

        @media (max-width: 720px) {
          .calvoro-hero-layout {
            min-height: auto;
            grid-template-columns: minmax(0, 1fr);
            gap: 8px;
          }

          .calvoro-hero-copy {
            padding: 48px 0 20px;
          }

          .calvoro-hero-feature {
            max-width: none;
            justify-self: stretch;
            margin: 0 0 38px;
          }

          .calvoro-home-section {
            padding: 58px 0;
          }

          .calvoro-calculator-grid {
            grid-auto-rows: auto;
          }
        }

        @media (max-width: 380px) {
          .calvoro-hero-search-controls {
            flex-direction: column;
          }

          .calvoro-route-content .calvoro-hero-search-button {
            width: 100%;
          }

          .calvoro-hero-actions > * {
            flex: 1 1 auto;
          }

          .calvoro-seo-disclosure > summary {
            padding-right: 17px;
            padding-left: 17px;
          }
        }

        @media (min-width: 851px) and (max-width: 980px) {
          .calvoro-header-inner {
            gap: 18px;
            padding-left: 22px;
            padding-right: 22px;
          }

          .calvoro-header-button {
            display: none;
          }
        }

        @media (max-width: 620px) {
          .calvoro-category-row {
            display: flex;
            flex-wrap: nowrap;
            overflow-x: auto;
            overflow-y: hidden;
            gap: 8px;
            padding: 6px 2px 8px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: thin;
          }

          .calvoro-category {
            flex: 0 0 auto;
          }
        }
      `}
    </style>

  );
}

// ======================================================
// APP
// ======================================================

export default function App() {
  return (
    <BrowserRouter>

      <RouteHashScroll />

      <GlobalCalvoroStyle />

      <GlobalHeader />

      <div className="calvoro-route-content">

        <Suspense fallback={<Loading />}>

          <Routes>

            {/* HOME */}

            <Route
              path="/"
              element={
                <PageFrame>
                  <Home />
                </PageFrame>
              }
            />

            {/* CALCULATORS */}

            {calculators.map(
              (calculator) => (
                <Route
                  key={calculator.path}
                  path={calculator.path}
                  element={
                    <PageFrame>
                      <CalculatorPage
                        calculator={calculator}
                      />
                    </PageFrame>
                  }
                />
              )
            )}

            {/* MAIN PAGES */}

            <Route
              path="/about"
              element={
                <PageFrame>
                  <About />
                </PageFrame>
              }
            />

            <Route
              path="/contact"
              element={
                <PageFrame>
                  <Contact />
                </PageFrame>
              }
            />

            <Route
              path="/privacy-policy"
              element={
                <PageFrame>
                  <PrivacyPolicy />
                </PageFrame>
              }
            />

            <Route
              path="/terms"
              element={
                <PageFrame>
                  <Terms />
                </PageFrame>
              }
            />

            <Route
              path="/tools"
              element={
                <PageFrame>
                  <Tools />
                </PageFrame>
              }
            />

            {/* BLOG */}

            <Route
              path="/blog"
              element={
                <PageFrame>
                  <Blog />
                </PageFrame>
              }
            />

            <Route
              path="/blog/:slug"
              element={
                <PageFrame>
                  <BlogArticle />
                </PageFrame>
              }
            />

            {/* MATH TOOLS */}

            <Route
              path="/math-solver"
              element={
                <PageFrame>
                  <MathSolver />
                </PageFrame>
              }
            />

            <Route
              path="/image-math-solver"
              element={
                <PageFrame>
                  <ImageMathSolver />
                </PageFrame>
              }
            />

            {/* AI TOOLS */}

            <Route
              path="/ai-summarizer"
              element={
                <PageFrame>
                  <AISummarizer />
                </PageFrame>
              }
            />

            <Route
              path="/ai-rewriter"
              element={
                <PageFrame>
                  <AITextRewriter />
                </PageFrame>
              }
            />

            <Route
              path="/ai-grammar-checker"
              element={
                <PageFrame>
                  <AIGrammarChecker />
                </PageFrame>
              }
            />

            <Route
              path="/ai-translator"
              element={
                <PageFrame>
                  <AITranslator />
                </PageFrame>
              }
            />

            <Route
              path="/ai-text-generator"
              element={
                <PageFrame>
                  <AITextGenerator />
                </PageFrame>
              }
            />

            <Route
              path="/ai-email-writer"
              element={
                <PageFrame>
                  <AIEmailWriter />
                </PageFrame>
              }
            />

            {/* BROWSER UTILITIES */}

            {Object.entries(toolComponents).map(
              ([path, ToolComponent]) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <PageFrame>
                      <ToolComponent />
                    </PageFrame>
                  }
                />
              )
            )}

            {/* 404 */}

            <Route
              path="*"
              element={
                <PageFrame>
                  <NotFound />
                </PageFrame>
              }
            />

          </Routes>

        </Suspense>

      </div>

      <GlobalFooter />

    </BrowserRouter>
  );
}
