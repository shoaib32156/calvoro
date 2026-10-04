
import { lazy, Suspense, useMemo, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import SEO from "./SEO";

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
// CALCULATOR DATA
// ======================================================

const calculators = [
  {
    component: PercentageCalculator,
    name: "Percentage Calculator",
    path: "/percentage",
    category: "Math",
    description:
      "Calculate percentages quickly and easily.",
  },
  {
    component: AgeCalculator,
    name: "Age Calculator",
    path: "/age",
    category: "Date & Time",
    description:
      "Calculate your exact age from your date of birth.",
  },
  {
    component: BMICalculator,
    name: "BMI Calculator",
    path: "/bmi",
    category: "Health",
    description:
      "Calculate your Body Mass Index.",
  },
  {
    component: LoanCalculator,
    name: "Loan Calculator",
    path: "/loan",
    category: "Finance",
    description:
      "Estimate loan payments and total interest.",
  },
  {
    component: EMICalculator,
    name: "EMI Calculator",
    path: "/emi",
    category: "Finance",
    description:
      "Calculate monthly EMI payments.",
  },
  {
    component: CurrencyConverter,
    name: "Currency Converter",
    path: "/currency",
    category: "Finance",
    description:
      "Convert between different currencies.",
  },
  {
    component: DiscountCalculator,
    name: "Discount Calculator",
    path: "/discount",
    category: "Finance",
    description:
      "Calculate discounts and final prices.",
  },
  {
    component: TipCalculator,
    name: "Tip Calculator",
    path: "/tip",
    category: "Finance",
    description:
      "Calculate tips and split bills easily.",
  },
  {
    component: TimeZoneConverter,
    name: "Time Zone Converter",
    path: "/timezone",
    category: "Date & Time",
    description:
      "Convert times between different time zones.",
  },
  {
    component: GPACalculator,
    name: "GPA Calculator",
    path: "/gpa",
    category: "Education",
    description:
      "Calculate your GPA quickly.",
  },
  {
    component: UnitConverter,
    name: "Unit Converter",
    path: "/unit",
    category: "Math",
    description:
      "Convert common measurement units.",
  },
  {
    component: FuelCostCalculator,
    name: "Fuel Cost Calculator",
    path: "/fuel-cost",
    category: "Everyday",
    description:
      "Estimate fuel usage and travel cost.",
  },
  {
    component: MortgageCalculator,
    name: "Mortgage Calculator",
    path: "/mortgage",
    category: "Finance",
    description:
      "Estimate mortgage payments and interest.",
  },
  {
    component: SalaryCalculator,
    name: "Salary Calculator",
    path: "/salary",
    category: "Finance",
    description:
      "Estimate salary and take-home amounts.",
  },
  {
    component: CompoundInterestCalculator,
    name: "Compound Interest Calculator",
    path: "/compound-interest",
    category: "Finance",
    description:
      "Calculate compound interest growth.",
  },
  {
    component: TaxCalculator,
    name: "Tax Calculator",
    path: "/tax",
    category: "Finance",
    description:
      "Estimate tax amounts and after-tax income.",
  },
  {
    component: ProfitMarginCalculator,
    name: "Profit Margin Calculator",
    path: "/profit-margin",
    category: "Business",
    description:
      "Calculate profit margins and markup.",
  },
  {
    component: BreakEvenCalculator,
    name: "Break-Even Calculator",
    path: "/break-even",
    category: "Business",
    description:
      "Find your break-even point.",
  },
  {
    component: ROICalculator,
    name: "ROI Calculator",
    path: "/roi",
    category: "Business",
    description:
      "Calculate return on investment.",
  },
  {
    component: PaybackPeriodCalculator,
    name: "Payback Period Calculator",
    path: "/payback-period",
    category: "Business",
    description:
      "Calculate how long an investment takes to pay back.",
  },
  {
    component: InvestmentCalculator,
    name: "Investment Calculator",
    path: "/investment",
    category: "Finance",
    description:
      "Estimate investment growth over time.",
  },
  {
    component: SavingsCalculator,
    name: "Savings Calculator",
    path: "/savings",
    category: "Finance",
    description:
      "Plan your savings and future balance.",
  },
  {
    component: InflationCalculator,
    name: "Inflation Calculator",
    path: "/inflation",
    category: "Finance",
    description:
      "Compare the value of money over time.",
  },
  {
    component: PresentValueCalculator,
    name: "Present Value Calculator",
    path: "/present-value",
    category: "Finance",
    description:
      "Calculate the present value of future money.",
  },
  {
    component: FutureValueCalculator,
    name: "Future Value Calculator",
    path: "/future-value",
    category: "Finance",
    description:
      "Calculate the future value of an investment.",
  },
  {
    component: NetWorthCalculator,
    name: "Net Worth Calculator",
    path: "/net-worth",
    category: "Finance",
    description:
      "Calculate your total net worth.",
  },
  {
    component: PercentageChangeCalculator,
    name: "Percentage Change Calculator",
    path: "/percentage-change",
    category: "Math",
    description:
      "Calculate percentage increases and decreases.",
  },
  {
    component: AverageCalculator,
    name: "Average Calculator",
    path: "/average",
    category: "Math",
    description:
      "Calculate the average of numbers.",
  },
  {
    component: FractionCalculator,
    name: "Fraction Calculator",
    path: "/fraction",
    category: "Math",
    description:
      "Add, subtract, multiply and divide fractions.",
  },
  {
    component: RatioCalculator,
    name: "Ratio Calculator",
    path: "/ratio",
    category: "Math",
    description:
      "Calculate and simplify ratios.",
  },
  {
    component: TimeDurationCalculator,
    name: "Time Duration Calculator",
    path: "/time-duration",
    category: "Date & Time",
    description:
      "Calculate the duration between two times.",
  },
  {
    component: DateDifferenceCalculator,
    name: "Date Difference Calculator",
    path: "/date-difference",
    category: "Date & Time",
    description:
      "Find the difference between two dates.",
  },
  {
    component: SpeedCalculator,
    name: "Speed Calculator",
    path: "/speed",
    category: "Everyday",
    description:
      "Calculate speed, distance and time.",
  },
  {
    component: DistanceCalculator,
    name: "Distance Calculator",
    path: "/distance",
    category: "Everyday",
    description:
      "Calculate distance using speed and time.",
  },
  {
    component: PaceCalculator,
    name: "Pace Calculator",
    path: "/pace",
    category: "Fitness",
    description:
      "Calculate running pace and speed.",
  },
  {
    component: RunningSpeedCalculator,
    name: "Running Speed Calculator",
    path: "/running-speed",
    category: "Fitness",
    description:
      "Calculate your running speed.",
  },
  {
    component: TimeToRunCalculator,
    name: "Time to Run Calculator",
    path: "/time-to-run",
    category: "Fitness",
    description:
      "Estimate the time needed to run a distance.",
  },
  {
    component: RunningTimeCalculator,
    name: "Running Time Calculator",
    path: "/running-time",
    category: "Fitness",
    description:
      "Calculate running time from distance and pace.",
  },
  {
    component: RunningPaceCalculator,
    name: "Running Pace Calculator",
    path: "/running-pace",
    category: "Fitness",
    description:
      "Calculate your running pace.",
  },
];

// ======================================================
// CATEGORIES
// ======================================================

const categories = [
  "All",
  "Math",
  "Finance",
  "Business",
  "Date & Time",
  "Health",
  "Education",
  "Everyday",
  "Fitness",
];

// ======================================================
// POPULAR CALCULATORS
// ======================================================

const popularCalculators = [
  {
    icon: "％",
    name: "Percentage Calculator",
    description:
      "Calculate percentages, increases, decreases, and more.",
    path: "/percentage",
  },
  {
    icon: "🎂",
    name: "Age Calculator",
    description:
      "Calculate your exact age from your date of birth.",
    path: "/age",
  },
  {
    icon: "⚖️",
    name: "BMI Calculator",
    description:
      "Calculate your Body Mass Index quickly.",
    path: "/bmi",
  },
  {
    icon: "💰",
    name: "Loan Calculator",
    description:
      "Estimate monthly loan payments and total interest.",
    path: "/loan",
  },
  {
    icon: "📊",
    name: "GPA Calculator",
    description:
      "Calculate your GPA from grades and credits.",
    path: "/gpa",
  },
  {
    icon: "⛽",
    name: "Fuel Cost Calculator",
    description:
      "Estimate fuel usage and travel expenses.",
    path: "/fuel-cost",
  },
];

// ======================================================
// BLOG PREVIEW
// ======================================================

const blogPreview = [
  {
    slug: "how-to-calculate-percentage",
    category: "Math",
    title: "How to Calculate Percentage Easily",
    excerpt:
      "Learn how percentages work and how to calculate them in everyday situations.",
  },
  {
    slug: "how-compound-interest-works",
    category: "Finance",
    title: "How Compound Interest Works",
    excerpt:
      "Understand compound interest and how growth builds over time.",
  },
  {
    slug: "how-to-calculate-bmi",
    category: "Health",
    title: "How to Calculate BMI",
    excerpt:
      "Learn what BMI is and how the basic calculation works.",
  },
];

// ======================================================
// GLOBAL HEADER
// ======================================================

function GlobalHeader() {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname.startsWith(path);
  };

  const navStyle = (active = false) => ({
    textDecoration: "none",
    color: active
      ? "#ffffff"
      : "rgba(255,255,255,0.74)",
    fontSize: "13px",
    fontWeight: active ? 800 : 700,
    padding: "9px 11px",
    borderRadius: "7px",
    background: active
      ? "rgba(255,255,255,0.10)"
      : "transparent",
    transition: "all 0.18s ease",
    whiteSpace: "nowrap",
  });

  return (
    <header className="calvoro-global-header">

      <div className="calvoro-header-top">

        <div className="calvoro-header-inner">

          <Link
            to="/"
            className="calvoro-brand"
          >
            <span className="calvoro-brand-mark">
              C
            </span>

            <span>
              <strong>CALVORO</strong>
              <small>SMART ONLINE TOOLS</small>
            </span>
          </Link>

          <div className="calvoro-header-note">
            Free calculators, AI tools & practical guides
          </div>

        </div>

      </div>

      <div className="calvoro-header-main">

        <div className="calvoro-header-inner">

          <nav className="calvoro-main-nav">

            <Link
              to="/"
              style={navStyle(isActive("/"))}
            >
              Home
            </Link>

            <a
              href="/#calculators"
              style={navStyle(false)}
            >
              Calculators
            </a>

            <a
              href="/#ai-tools"
              style={navStyle(false)}
            >
              AI Tools
            </a>

            <Link
              to="/tools"
              style={navStyle(isActive("/tools"))}
            >
              Tools
            </Link>

            <Link
              to="/blog"
              style={navStyle(isActive("/blog"))}
            >
              Blog
            </Link>

            <Link
              to="/about"
              style={navStyle(isActive("/about"))}
            >
              About
            </Link>

            <Link
              to="/contact"
              style={navStyle(isActive("/contact"))}
            >
              Contact
            </Link>

          </nav>

          <Link
            to="/blog"
            className="calvoro-header-button"
          >
            CALVORO Journal
            <span>→</span>
          </Link>

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
              Practical online calculators, helpful AI
              tools, and clear guides for everyday tasks.
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
            Smart tools for everyday needs.
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

          <Link
            to="/#calculators"
            className="calvoro-universal-back"
          >
            ← All calculators
          </Link>

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
              🧮
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
                  🧮
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
            background: #f5f7fa;
            color: #172033;
          }

          .calvoro-universal-container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding-left: 24px;
            padding-right: 24px;
          }

          .calvoro-universal-hero {
            background:
              linear-gradient(
                135deg,
                #0f172a 0%,
                #172554 55%,
                #1d4ed8 100%
              );
            color: #ffffff;
          }

          .calvoro-universal-back {
            display: inline-flex;
            padding-top: 34px;
            margin-bottom: 28px;
            color:
              rgba(255,255,255,0.72);
            text-decoration: none;
            font-size: 12px;
            font-weight: 800;
          }

          .calvoro-universal-back:hover {
            color: #ffffff;
          }

          .calvoro-universal-hero-grid {
            display: grid;
            grid-template-columns:
              minmax(0, 1fr) 95px;
            gap: 30px;
            align-items: center;
            padding-bottom: 50px;
          }

          .calvoro-universal-category {
            display: inline-flex;
            padding: 6px 10px;
            border:
              1px solid
              rgba(255,255,255,0.16);
            border-radius: 4px;
            background:
              rgba(255,255,255,0.07);
            color:
              rgba(255,255,255,0.82);
            font-size: 10px;
            font-weight: 900;
            letter-spacing: 1px;
            text-transform: uppercase;
          }

          .calvoro-universal-hero h1 {
            margin: 16px 0 11px;
            color: #ffffff;
            font-size:
              clamp(36px,5vw,54px);
            line-height: 1.05;
            letter-spacing: -0.045em;
            font-weight: 950;
          }

          .calvoro-universal-hero p {
            max-width: 700px;
            margin: 0;
            color:
              rgba(255,255,255,0.70);
            font-size: 16px;
            line-height: 1.8;
          }

          .calvoro-universal-icon {
            width: 88px;
            height: 88px;
            display: flex;
            align-items: center;
            justify-content: center;
            border:
              1px solid
              rgba(255,255,255,0.14);
            border-radius: 8px;
            background:
              rgba(255,255,255,0.07);
            font-size: 38px;
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
            border:
              1px solid #e2e8f0;
            border-radius: 8px;
            box-shadow:
              0 8px 28px rgba(15,23,42,0.06);
            overflow: hidden;
          }

          .calvoro-universal-tool-heading {
            padding: 22px 24px;
            border-bottom:
              1px solid #e2e8f0;
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
            border-radius: 6px !important;
          }

          .calvoro-universal-tool button {
            border-radius: 6px !important;
          }

          .calvoro-universal-sidebar {
            display: grid;
            gap: 16px;
          }

          .calvoro-universal-sidebar-card {
            padding: 21px;
            background: #ffffff;
            border:
              1px solid #e2e8f0;
            border-radius: 8px;
          }

          .calvoro-universal-sidebar-icon {
            width: 46px;
            height: 46px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 12px;
            border-radius: 6px;
            background: #eff6ff;
            font-size: 22px;
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
            border:
              1px solid #e2e8f0;
            border-radius: 6px;
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
            background:
              linear-gradient(
                135deg,
                #172554,
                #1d4ed8
              );
            border: none;
          }

          .calvoro-universal-blue > span {
            color: #bfdbfe;
          }

          .calvoro-universal-blue h3 {
            color: #ffffff;
          }

          .calvoro-universal-blue p {
            color:
              rgba(255,255,255,0.72);
          }

          .calvoro-universal-blue a {
            display: inline-flex;
            margin-top: 15px;
            padding: 9px 11px;
            border-radius: 5px;
            background: #ffffff;
            color: #17358f;
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
              grid-template-columns: 1fr;
              gap: 20px;
            }

            .calvoro-universal-icon {
              justify-self: start;
            }

            .calvoro-universal-main {
              padding: 34px 0 55px;
            }

            .calvoro-universal-tool {
              padding: 18px;
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
// POPULAR SECTION
// ======================================================

function PopularCalculators() {
  return (
    <section className="calvoro-home-section calvoro-white-band">

      <div className="calvoro-container">

        <div className="calvoro-section-heading">

          <span className="calvoro-eyebrow">
            Popular tools
          </span>

          <h2>
            Calculators people use every day
          </h2>

          <p>
            Quick access to some of the most useful
            calculators available on CALVORO.
          </p>

        </div>

        <div className="calvoro-popular-grid">

          {popularCalculators.map(
            (calculator) => (
              <Link
                key={calculator.path}
                to={calculator.path}
                className="calvoro-popular-card"
              >

                <div className="calvoro-popular-icon">
                  {calculator.icon}
                </div>

                <h3>
                  {calculator.name}
                </h3>

                <p>
                  {calculator.description}
                </p>

                <span>
                  Use calculator →
                </span>

              </Link>
            )
          )}

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
    <section className="calvoro-home-section calvoro-light-band">

      <div className="calvoro-container">

        <div className="calvoro-editorial-heading">

          <div>

            <span className="calvoro-eyebrow">
              CALVORO Journal
            </span>

            <h2>
              Guides for smarter everyday decisions
            </h2>

          </div>

          <Link
            to="/blog"
            className="calvoro-outline-button"
          >
            View all articles →
          </Link>

        </div>

        <div className="calvoro-blog-preview-grid">

          {blogPreview.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="calvoro-blog-preview-card"
            >

              <div className="calvoro-blog-preview-meta">
                {post.category}
              </div>

              <h3>
                {post.title}
              </h3>

              <p>
                {post.excerpt}
              </p>

              <span>
                Read article →
              </span>

            </Link>
          ))}

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

  const filteredCalculators = useMemo(() => {
    const searchText =
      search.toLowerCase().trim();

    return calculators.filter(
      (calculator) => {

        const matchesCategory =
          activeCategory === "All" ||
          calculator.category ===
            activeCategory;

        const matchesSearch =
          !searchText ||
          calculator.name
            .toLowerCase()
            .includes(searchText) ||
          calculator.description
            .toLowerCase()
            .includes(searchText) ||
          calculator.category
            .toLowerCase()
            .includes(searchText);

        return (
          matchesCategory &&
          matchesSearch
        );
      }
    );
  }, [search, activeCategory]);

  return (
    <>

      <SEO
        title="CALVORO - Free Online Calculators & AI Tools"
        description="CALVORO provides free online calculators and useful AI tools for math, finance, health, fitness, education, writing and everyday tasks."
      />

      {/* HERO */}

      <section className="calvoro-home-hero">

        <div className="calvoro-container">

          <div className="calvoro-hero-layout">

            <div className="calvoro-hero-copy">

              <span className="calvoro-hero-label">
                CALVORO • SMART ONLINE TOOLS
              </span>

              <h1>
                Useful tools.
                <br />
                Clear answers.
                <br />
                <span>Everyday.</span>
              </h1>

              <p>
                CALVORO brings together practical
                calculators, AI tools, and helpful
                guides designed for everyday tasks.
              </p>

              <div className="calvoro-hero-actions">

                <a
                  href="#calculators"
                  className="calvoro-primary-button"
                >
                  Explore calculators
                  <span>→</span>
                </a>

                <Link
                  to="/blog"
                  className="calvoro-secondary-button"
                >
                  Read the Journal
                </Link>

              </div>

            </div>

            <div className="calvoro-hero-feature">

              <div className="calvoro-feature-kicker">
                FEATURED
              </div>

              <div className="calvoro-feature-number">
                40+
              </div>

              <h2>
                Practical calculators
              </h2>

              <p>
                Finance, math, health, education,
                fitness, business, time and everyday
                calculations.
              </p>

              <a
                href="#calculators"
                className="calvoro-feature-link"
              >
                Browse all calculators →
              </a>

            </div>

          </div>

        </div>

      </section>

      {/* AI TOOLS */}

      <section
        id="ai-tools"
        className="calvoro-home-section calvoro-white-band"
      >

        <div className="calvoro-container">

          <div className="calvoro-section-heading">

            <span className="calvoro-eyebrow">
              Artificial intelligence
            </span>

            <h2>
              CALVORO AI Tools
            </h2>

            <p>
              Write, rewrite, translate, summarize,
              check grammar, generate content and
              create professional emails.
            </p>

          </div>

          <div className="calvoro-ai-grid">

            <AIToolCard
              icon="📝"
              badge="AVAILABLE"
              title="AI Text Summarizer"
              description="Turn long articles, notes and other text into clear, easy-to-read summaries."
              path="/ai-summarizer"
            />

            <AIToolCard
              icon="✍️"
              badge="AVAILABLE"
              title="AI Text Rewriter"
              description="Rewrite your text in different tones while keeping the original meaning clear."
              path="/ai-rewriter"
            />

            <AIToolCard
              icon="✓"
              badge="AVAILABLE"
              title="AI Grammar Checker"
              description="Check grammar, spelling, punctuation and sentence clarity with CALVORO AI."
              path="/ai-grammar-checker"
            />

            <AIToolCard
              icon="🌍"
              badge="AVAILABLE"
              title="AI Text Translator"
              description="Translate your text into another language quickly and easily."
              path="/ai-translator"
            />

            <AIToolCard
              icon="✦"
              badge="AVAILABLE"
              title="AI Text Generator"
              description="Generate useful content from a topic, content type and writing tone."
              path="/ai-text-generator"
            />

            <AIToolCard
              icon="✉"
              badge="AVAILABLE"
              title="AI Email Writer"
              description="Create clear and professional emails from a simple description."
              path="/ai-email-writer"
            />

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
                Find the right tool by category or
                search for exactly what you need.
              </p>

            </div>

            <div className="calvoro-tool-count">
              {calculators.length} tools
            </div>

          </div>

          <div className="calvoro-search-row">

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search calculators..."
              className="calvoro-search-input"
              aria-label="Search calculators"
            />

          </div>

          <div className="calvoro-category-row">

            {categories.map((category) => {

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
                >
                  {category}
                </button>
              );
            })}

          </div>

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

            <div className="calvoro-empty-state">

              <strong>
                No calculators found
              </strong>

              <p>
                Try a different search or
                category.
              </p>

            </div>

          )}

        </div>

      </section>

      {/* ABOUT */}

      <section className="calvoro-home-section calvoro-white-band">

        <div className="calvoro-container">

          <div className="calvoro-about-layout">

            <div>

              <span className="calvoro-eyebrow">
                About CALVORO
              </span>

              <h2>
                Built to make everyday tasks simpler.
              </h2>

            </div>

            <div>

              <p className="calvoro-about-text">
                CALVORO is a collection of practical
                online calculators and useful AI tools
                designed to make common tasks easier.
              </p>

              <p className="calvoro-about-text">
                We focus on clear interfaces,
                understandable results and useful
                information without unnecessary
                complexity.
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

      <HomeSEOContent />

<PopularCalculators />

      <section className="calvoro-component-band">
        <HowItWorks />
      </section>

      <BlogPreview />

      <section className="calvoro-component-band">
        <FAQ />
      </section>

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
        :root {
          --calvoro-navy: #0f172a;
          --calvoro-navy-light: #172554;
          --calvoro-blue: #2563eb;
          --calvoro-blue-dark: #1d4ed8;
          --calvoro-text: #172033;
          --calvoro-muted: #64748b;
          --calvoro-border: #e2e8f0;
          --calvoro-bg: #f5f7fa;
          --calvoro-white: #ffffff;
          --calvoro-paper: #f8fafc;
          --calvoro-shadow:
            0 8px 28px rgba(15,23,42,0.06);
          --calvoro-shadow-hover:
            0 14px 36px rgba(15,23,42,0.11);
        }

        * {
          box-sizing: border-box;
        }

        .calvoro-global-header {
          position: sticky;
          top: 0;
          z-index: 9999;
          width: 100%;
          background: #0f172a;
          color: #ffffff;
          box-shadow:
            0 6px 20px rgba(15,23,42,0.16);
        }

        .calvoro-header-top {
          border-bottom:
            1px solid rgba(255,255,255,0.08);
        }

        .calvoro-header-main {
          background:
            linear-gradient(
              90deg,
              #0f172a,
              #172554
            );
        }

        .calvoro-header-inner {
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          padding:
            0 24px;
        }

        .calvoro-header-top .calvoro-header-inner {
          min-height: 58px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .calvoro-brand {
          display: inline-flex;
          align-items: center;
          gap: 11px;
          color: #ffffff;
          text-decoration: none;
        }

        .calvoro-brand-mark {
          width: 36px;
          height: 36px;
          border-radius: 7px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #2563eb;
          color: #ffffff;
          font-size: 18px;
          font-weight: 900;
          box-shadow:
            0 4px 14px rgba(37,99,235,0.30);
        }

        .calvoro-brand strong {
          display: block;
          font-size: 19px;
          font-weight: 900;
          letter-spacing: 1.4px;
          line-height: 1;
        }

        .calvoro-brand small {
          display: block;
          margin-top: 4px;
          color:
            rgba(255,255,255,0.55);
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 1.9px;
        }

        .calvoro-header-note {
          color:
            rgba(255,255,255,0.53);
          font-size: 11px;
          font-weight: 600;
        }

        .calvoro-header-main .calvoro-header-inner {
          min-height: 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .calvoro-main-nav {
          display: flex;
          align-items: center;
          gap: 3px;
          overflow-x: auto;
        }

        .calvoro-main-nav a:hover {
          color: #ffffff !important;
          background:
            rgba(255,255,255,0.09) !important;
        }

        .calvoro-header-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding:
            8px 13px;
          border-radius: 6px;
          background: #ffffff;
          color: #17358f;
          text-decoration: none;
          font-size: 12px;
          font-weight: 900;
          white-space: nowrap;
        }

        .calvoro-header-button:hover {
          color: #17358f;
          background: #eff6ff;
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
          background:
            linear-gradient(
              135deg,
              #0f172a 0%,
              #172554 55%,
              #1d4ed8 100%
            );
          color: #ffffff;
          border-bottom:
            1px solid rgba(255,255,255,0.10);
        }

        .calvoro-hero-layout {
          min-height: 535px;
          display: grid;
          grid-template-columns:
            minmax(0,1.4fr)
            minmax(300px,0.8fr);
          align-items: center;
          gap: 65px;
        }

        .calvoro-hero-copy {
          padding:
            75px 0;
        }

        .calvoro-hero-label {
          display: inline-flex;
          padding:
            7px 11px;
          border:
            1px solid rgba(255,255,255,0.16);
          background:
            rgba(255,255,255,0.06);
          border-radius: 5px;
          color:
            rgba(255,255,255,0.82);
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.6px;
        }

        .calvoro-hero-copy h1 {
          margin:
            20px 0;
          color: #ffffff;
          font-size:
            clamp(42px,6vw,68px);
          line-height: .98;
          letter-spacing: -.045em;
          font-weight: 950;
        }

        .calvoro-hero-copy h1 span {
          color:
            #93c5fd;
        }

        .calvoro-hero-copy p {
          max-width: 650px;
          margin: 0;
          color:
            rgba(255,255,255,0.72);
          font-size: 17px;
          line-height: 1.8;
        }

        .calvoro-hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 11px;
          margin-top: 29px;
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
          background:
            rgba(255,255,255,.07);
          color: #ffffff;
          border:
            1px solid
            rgba(255,255,255,.18);
        }

        .calvoro-secondary-button:hover {
          background:
            rgba(255,255,255,.12);
          color: #ffffff;
        }

        .calvoro-hero-feature {
          align-self: center;
          margin:
            40px 0;
          padding:
            34px;
          background:
            rgba(255,255,255,.065);
          border:
            1px solid
            rgba(255,255,255,.13);
          border-radius: 8px;
          box-shadow:
            0 18px 45px rgba(0,0,0,.15);
          backdrop-filter:
            blur(7px);
        }

        .calvoro-feature-kicker {
          color:
            #93c5fd;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 1.7px;
        }

        .calvoro-feature-number {
          margin-top: 15px;
          color: #ffffff;
          font-size: 58px;
          line-height: 1;
          font-weight: 950;
        }

        .calvoro-hero-feature h2 {
          margin:
            9px 0 10px;
          color: #ffffff;
          font-size: 24px;
          font-weight: 900;
        }

        .calvoro-hero-feature p {
          margin: 0;
          color:
            rgba(255,255,255,.66);
          font-size: 14px;
          line-height: 1.75;
        }

        .calvoro-feature-link {
          display: inline-block;
          margin-top: 22px;
          color: #ffffff;
          text-decoration: none;
          font-size: 13px;
          font-weight: 800;
        }

        .calvoro-feature-link:hover {
          color: #bfdbfe;
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
          border-radius: 8px;
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
          border-radius: 8px;
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
          border-radius:
            8px;
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
            7px;
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
            1.4fr .7fr .9fr .8fr;
          gap:
            45px;
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

        .calvoro-route-content header {
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
          border-radius:
            6px !important;
          box-shadow:
            none !important;
        }

        .calvoro-route-content button {
          border-radius:
            6px !important;
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
              repeat(2,minmax(0,1fr));
          }

        }

        @media (max-width: 850px) {

          .calvoro-header-note {
            display:
              none;
          }

          .calvoro-header-main
            .calvoro-header-inner {
            padding:
              7px 18px;
          }

          .calvoro-main-nav {
            width:
              100%;
          }

          .calvoro-header-button {
            display:
              none;
          }

          .calvoro-hero-layout {
            grid-template-columns:
              1fr;
            min-height:
              auto;
            gap:
              10px;
          }

          .calvoro-hero-copy {
            padding:
              62px 0 25px;
          }

          .calvoro-hero-feature {
            margin:
              0 0 55px;
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

          .calvoro-header-top
            .calvoro-header-inner {
            min-height:
              52px;
            padding:
              0 17px;
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
            font-size:
              44px;
          }

          .calvoro-hero-copy p {
            font-size:
              15px;
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

