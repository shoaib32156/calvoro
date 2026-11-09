import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import SEO from "./SEO";
import { calculatorCatalog } from "./calculatorCatalog.js";
import { categoryColor } from "./design/categoryIcons.js";
import BrandMark from "./components/shell/BrandMark.jsx";
import SiteHeader from "./components/shell/SiteHeader.jsx";
import SiteFooter from "./components/shell/SiteFooter.jsx";
import Breadcrumbs from "./components/editorial/Breadcrumbs.jsx";
import ToolGlyph from "./components/tools/ToolGlyph.jsx";

import MathSolver from "./Pages/MathSolver.jsx";
import ImageMathSolver from "./Pages/ImageMathSolver.jsx";
import Contact from "./Pages/Contact.jsx";
import PrivacyPolicy from "./Pages/PrivacyPolicy.jsx";
import Terms from "./Pages/Terms.jsx";
import About from "./Pages/About.jsx";
import HomePage from "./Pages/HomePage.jsx";

import AISummarizer from "./Pages/AISummarizer.jsx";
import AITextRewriter from "./AITexterRewriter.jsx";
import AIGrammarChecker from "./AIGrammarChecker.jsx";
import AITranslator from "./AITranslator.jsx";
import AITextGenerator from "./Pages/AITextGenerator.jsx";
import AIEmailWriter from "./Pages/AIEmailWriter.jsx";

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

const AgeCalculator = lazy(() => import("./Pages/AgeCalculator.jsx"));

const BMICalculator = lazy(() => import("./Pages/BMICalculator.jsx"));

const LoanCalculator = lazy(() => import("./Pages/LoanCalculator.jsx"));

const EMICalculator = lazy(() => import("./Pages/EMICalculator.jsx"));

const CurrencyConverter = lazy(() => import("./Pages/CurrencyConverter.jsx"));

const DiscountCalculator = lazy(() =>
  import("./Pages/DiscountCalculator.jsx")
);

const TipCalculator = lazy(() => import("./Pages/TipCalculator.jsx"));

const TimeZoneConverter = lazy(() =>
  import("./Pages/TimeZoneConverter.jsx")
);

const GPACalculator = lazy(() => import("./Pages/GPACalculator.jsx"));

const UnitConverter = lazy(() => import("./Pages/UnitConverter.jsx"));

const FuelCostCalculator = lazy(() =>
  import("./Pages/FuelCostCalculator.jsx")
);

const MortgageCalculator = lazy(() =>
  import("./Pages/MortgageCalculator.jsx")
);

const SalaryCalculator = lazy(() => import("./Pages/SalaryCalculator.jsx"));

const CompoundInterestCalculator = lazy(() =>
  import("./Pages/CompoundInterestCalculator.jsx")
);

const TaxCalculator = lazy(() => import("./Pages/TaxCalculator.jsx"));

const ProfitMarginCalculator = lazy(() =>
  import("./Pages/ProfitMarginCalculator.jsx")
);

const BreakEvenCalculator = lazy(() =>
  import("./Pages/BreakEvenCalculator.jsx")
);

const ROICalculator = lazy(() => import("./Pages/ROICalculator.jsx"));

const PaybackPeriodCalculator = lazy(() =>
  import("./Pages/PaybackPeriodCalculator.jsx")
);

const InvestmentCalculator = lazy(() =>
  import("./Pages/InvestmentCalculator.jsx")
);

const SavingsCalculator = lazy(() => import("./Pages/SavingsCalculator.jsx"));

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

const RatioCalculator = lazy(() => import("./Pages/RatioCalculator.jsx"));

const TimeDurationCalculator = lazy(() =>
  import("./Pages/TimeDurationCalculator.jsx")
);

const DateDifferenceCalculator = lazy(() =>
  import("./Pages/DateDifferenceCalculator.jsx")
);

const SpeedCalculator = lazy(() => import("./Pages/SpeedCalculator.jsx"));

const DistanceCalculator = lazy(() =>
  import("./Pages/DistanceCalculator.jsx")
);

const PaceCalculator = lazy(() => import("./Pages/PaceCalculator.jsx"));

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
  "/meme-generator": lazy(() => import("./tools/MemeGenerator.jsx")),
  "/passport-photo-maker": lazy(() =>
    import("./tools/PassportPhotoMaker.jsx")
  ),
  "/puzzle-games": lazy(() => import("./tools/PuzzleGames.jsx")),
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

// ======================================================
// PAGE FRAME
// ======================================================

function PageFrame({ children }) {
  return <div className="calvoro-page-frame">{children}</div>;
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
      <div className="calvoro-loading-box" role="status" aria-live="polite">
        <BrandMark className="calvoro-loading-mark" />
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

function CalculatorPage({ calculator }) {
  return (
    <>
      <SEO
        title={`${calculator.name} - Free Online Calculator | CALVORO`}
        description={`${calculator.description} Use the free ${calculator.name} on CALVORO for quick, clear and easy calculations.`}
      />

      <UniversalCalculatorFrame calculator={calculator} />
    </>
  );
}

// ======================================================
// UNIVERSAL CALCULATOR FRAME
// ======================================================

function UniversalCalculatorFrame({ calculator }) {
  const CalculatorComponent = calculator.component;
  const catColor = categoryColor(calculator.category);

  const relatedCalculators = calculators
    .filter(
      (item) =>
        item.path !== calculator.path && item.category === calculator.category
    )
    .slice(0, 4);

  return (
    <div
      className="calvoro-universal-calculator-page"
      style={{ "--cat": catColor }}
    >
      <section className="calvoro-calc-hero">
        <div className="calvoro-universal-container">
          <div className="calvoro-calc-hero-inner">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "All tools", to: "/tools" },
                { label: calculator.name },
              ]}
            />

            <div className="calvoro-calc-hero-grid">
              <div>
                <span className="calvoro-calc-category">
                  {calculator.category}
                </span>

                <h1>{calculator.name}</h1>
                <p>{calculator.description}</p>
              </div>

              <div className="calvoro-calc-hero-icon" aria-hidden="true">
                <ToolGlyph tool={calculator} size={32} strokeWidth={1.7} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <main className="calvoro-calc-main">
        <div className="calvoro-universal-container">
          <div className="calvoro-calc-layout">
            <section className="calvoro-calc-panel">
              <div className="calvoro-calc-panel-head">
                <span className="calvoro-calc-panel-kicker">
                  CALVORO Calculator
                </span>
                <h2>{calculator.name}</h2>
              </div>

              <div className="calvoro-calc-panel-body calvoro-universal-tool">
                <CalculatorComponent />
              </div>
            </section>

            <aside className="calvoro-calc-sidebar">
              <div className="calvoro-calc-side-card">
                <span className="calvoro-calc-side-kicker">About this tool</span>

                <span
                  className="calvoro-calc-side-icon"
                  style={{ background: catColor, color: "#fff" }}
                  aria-hidden="true"
                >
                  <ToolGlyph tool={calculator} size={20} strokeWidth={1.8} />
                </span>

                <h3>{calculator.name}</h3>
                <p>{calculator.description}</p>
                <span className="calvoro-calc-side-tag">
                  {calculator.category}
                </span>
              </div>

              {relatedCalculators.length > 0 && (
                <div className="calvoro-calc-side-card">
                  <span className="calvoro-calc-side-kicker">
                    Related tools
                  </span>
                  <h3>More in {calculator.category}</h3>

                  <div className="calvoro-calc-related">
                    {relatedCalculators.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className="calvoro-calc-related-link"
                      >
                        {item.name}
                        <small>Open →</small>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="calvoro-calc-side-card calvoro-calc-journal">
                <span className="calvoro-calc-side-kicker">
                  CALVORO Journal
                </span>
                <h3>Learn more</h3>
                <p>
                  Explore practical guides, explanations, formulas and everyday
                  tips in the CALVORO Journal.
                </p>
                <Link to="/blog" className="calvoro-calc-related-link">
                  Read the Journal <span aria-hidden="true">→</span>
                </Link>
              </div>
            </aside>
          </div>

          <div className="calvoro-calc-guide-wrap">
            <CalculatorGuide calculator={calculator} />
          </div>
        </div>
      </main>
    </div>
  );
}

// ======================================================
// 404
// ======================================================

function NotFound() {
  return (
    <div className="calvoro-not-found">
      <SEO
        title="Page not found - CALVORO"
        description="The page you requested could not be found. Return to CALVORO to use free online calculators and tools."
        noindex
      />

      <div>
        <span className="ui-eyebrow">CALVORO</span>

        <div className="calvoro-404-number">
          4<span>0</span>4
        </div>

        <h1>Page not found</h1>

        <p>
          The page you're looking for doesn't exist or may have moved. Try the
          tool directory to find the calculator you need.
        </p>

        <div className="calvoro-not-found-actions">
          <Link to="/" className="calvoro-primary-button">
            Back to CALVORO <span aria-hidden="true">→</span>
          </Link>
          <Link to="/tools" className="calvoro-secondary-button">
            Browse all tools
          </Link>
        </div>
      </div>
    </div>
  );
}

// ======================================================
// APP
// ======================================================

export default function App() {
  return (
    <BrowserRouter>
      <a className="calvoro-skip-link" href="#main-content">
        Skip to content
      </a>

      <RouteHashScroll />
      <SiteHeader />

      <div id="main-content" className="calvoro-route-content" tabIndex={-1}>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route
              path="/"
              element={
                <PageFrame>
                  <HomePage />
                </PageFrame>
              }
            />

            {calculators.map((calculator) => (
              <Route
                key={calculator.path}
                path={calculator.path}
                element={
                  <PageFrame>
                    <CalculatorPage calculator={calculator} />
                  </PageFrame>
                }
              />
            ))}

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

            <Route
              path="/math-solver"
              element={
                <PageFrame>
                  <SEO />
                  <MathSolver />
                </PageFrame>
              }
            />

            <Route
              path="/image-math-solver"
              element={
                <PageFrame>
                  <SEO />
                  <ImageMathSolver />
                </PageFrame>
              }
            />

            <Route
              path="/ai-summarizer"
              element={
                <PageFrame>
                  <SEO />
                  <AISummarizer />
                </PageFrame>
              }
            />

            <Route
              path="/ai-rewriter"
              element={
                <PageFrame>
                  <SEO />
                  <AITextRewriter />
                </PageFrame>
              }
            />

            <Route
              path="/ai-grammar-checker"
              element={
                <PageFrame>
                  <SEO />
                  <AIGrammarChecker />
                </PageFrame>
              }
            />

            <Route
              path="/ai-translator"
              element={
                <PageFrame>
                  <SEO />
                  <AITranslator />
                </PageFrame>
              }
            />

            <Route
              path="/ai-text-generator"
              element={
                <PageFrame>
                  <SEO />
                  <AITextGenerator />
                </PageFrame>
              }
            />

            <Route
              path="/ai-email-writer"
              element={
                <PageFrame>
                  <SEO />
                  <AIEmailWriter />
                </PageFrame>
              }
            />

            {Object.entries(toolComponents).map(([path, ToolComponent]) => (
              <Route
                key={path}
                path={path}
                element={
                  <PageFrame>
                    <ToolComponent />
                  </PageFrame>
                }
              />
            ))}

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

      <SiteFooter />
    </BrowserRouter>
  );
}
