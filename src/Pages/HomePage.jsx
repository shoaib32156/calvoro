import { Link } from "react-router-dom";
import {
  BookOpen,
  Check,
  Compass,
  FileText,
  Languages,
  Mail,
  PenLine,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import SEO from "../SEO";
import HomeSearch from "../components/home/HomeSearch.jsx";
import ToolCard from "../components/tools/ToolCard.jsx";
import CategoryCard from "../components/tools/CategoryCard.jsx";
import ArticleCard from "../components/editorial/ArticleCard.jsx";
import HowItWorks from "./HowItWorks.jsx";
import FAQ from "./FAQ.jsx";
import HomeSEOContent from "./HomeSEOContent.jsx";
import {
  calculatorCatalog,
  calculatorCategories,
  featuredCalculatorPaths,
  featuredUtilityTools,
  utilityTools,
} from "../calculatorCatalog.js";
import {
  articles,
  featuredArticles,
} from "../content/articles/index.js";

const popularCalculators = featuredCalculatorPaths
  .map((path) => calculatorCatalog.find((tool) => tool.path === path))
  .filter(Boolean);

const browseCategories = calculatorCategories.filter(
  (category) => category !== "All"
);

const categoryDescriptions = {
  Math: "Percentages, averages, fractions, ratios and unit conversions.",
  Finance: "Loans, EMI, mortgages, savings, tax and compound growth.",
  Business: "Margins, break-even points, ROI and payback periods.",
  "Date & Time": "Ages, durations, date gaps and time-zone meetings.",
  Health: "Body mass index and everyday health measurements.",
  Education: "Grade point averages for semesters and courses.",
  Everyday: "Tips, fuel costs, speed and distance.",
  Fitness: "Pace, running speed, finish times and splits.",
};

const categoryCount = (category) =>
  calculatorCatalog.filter((tool) => tool.category === category).length;

const aiTools = [
  {
    icon: FileText,
    title: "AI Text Summarizer",
    description:
      "Turn long articles, notes and other text into clear, easy-to-read summaries.",
    path: "/ai-summarizer",
  },
  {
    icon: PenLine,
    title: "AI Text Rewriter",
    description:
      "Rewrite your text in different tones while keeping the original meaning clear.",
    path: "/ai-rewriter",
  },
  {
    icon: Check,
    title: "AI Grammar Checker",
    description:
      "Check grammar, spelling, punctuation and sentence clarity with CALVORO AI.",
    path: "/ai-grammar-checker",
  },
  {
    icon: Languages,
    title: "AI Text Translator",
    description:
      "Translate your text into another language quickly and easily.",
    path: "/ai-translator",
  },
  {
    icon: Sparkles,
    title: "AI Text Generator",
    description:
      "Generate useful content from a topic, content type and writing tone.",
    path: "/ai-text-generator",
  },
  {
    icon: Mail,
    title: "AI Email Writer",
    description:
      "Create clear and professional emails from a simple description.",
    path: "/ai-email-writer",
  },
];

const trustPoints = [
  {
    icon: ShieldCheck,
    title: "Private by default",
    description:
      "Files in the PDF and image tools are processed in your browser tab. CALVORO does not upload them.",
  },
  {
    icon: Zap,
    title: "Instant results",
    description:
      "Every calculator applies its formula immediately, so there is no waiting and no account step.",
  },
  {
    icon: BookOpen,
    title: "Formulas explained",
    description:
      "Calculator pages include a guide with the method, a worked example and common questions.",
  },
  {
    icon: Compass,
    title: "One clear directory",
    description:
      "Search or filter by task to move from a question to the right tool without hunting through menus.",
  },
];

export default function HomePage() {
  return (
    <>
      <SEO
        title="CALVORO – Free Online Calculators & Smart Tools"
        description="Free online calculators and smart tools for math, finance, health, education and everyday tasks. Calculate percentages, age, BMI, loans, EMI and GPA with ease."
      />

      <section className="calvoro-hero-section">
        <div className="calvoro-container">
          <div className="calvoro-hero-inner calvoro-reveal">
            <span className="calvoro-hero-badge">
              <Sparkles size={14} aria-hidden="true" />
              Free to use · No account · Runs in your browser
            </span>

            <h1>
              Free Online Calculators for <em>Everyday Problems</em>
            </h1>

            <p className="calvoro-hero-lead">
              CALVORO is a free library of online calculators and browser tools.
              Find the right tool, enter your values, and read a clear result
              without signing in.
            </p>

            <div className="calvoro-hero-search-wrap">
              <HomeSearch />
            </div>

            <div className="calvoro-hero-quicklinks">
              <span>Popular:</span>
              <Link to="/percentage">Percentage</Link>
              <Link to="/loan">Loan</Link>
              <Link to="/bmi">BMI</Link>
              <Link to="/gpa">GPA</Link>
              <Link to="/pdf-studio">PDF Studio</Link>
            </div>

            <div className="calvoro-hero-stats">
              <div className="calvoro-hero-stat">
                <strong>{calculatorCatalog.length}</strong>
                <span>Calculators</span>
              </div>
              <div className="calvoro-hero-stat">
                <strong>{utilityTools.length}</strong>
                <span>Browser tools</span>
              </div>
              <div className="calvoro-hero-stat">
                <strong>{articles.length}</strong>
                <span>Guides</span>
              </div>
              <div className="calvoro-hero-stat">
                <strong>100%</strong>
                <span>In-browser</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="calculators" className="calvoro-home-band is-cream">
        <div className="calvoro-container">
          <div className="calvoro-band-head">
            <div className="calvoro-band-head-text">
              <span className="ui-eyebrow">Calculator directory</span>
              <h2>
                Popular calculators for <em>everyday numbers.</em>
              </h2>
              <p>
                Open a frequently used calculator, or browse the full directory
                by category. Search also matches common names such as EMI, body
                mass, or split bill.
              </p>
            </div>

            <Link to="/tools" className="calvoro-outline-button">
              All {calculatorCatalog.length} calculators
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="calvoro-card-grid">
            {popularCalculators.map((tool) => (
              <ToolCard key={tool.path} tool={tool} action="Open calculator" />
            ))}
          </div>
        </div>
      </section>

      <section className="calvoro-home-band is-white">
        <div className="calvoro-container">
          <div className="calvoro-band-head">
            <div className="calvoro-band-head-text">
              <span className="ui-eyebrow">Browse by category</span>
              <h2>Start with the kind of number you have.</h2>
              <p>
                Category filters narrow the directory to math, money, dates,
                health, school, everyday planning and fitness.
              </p>
            </div>
          </div>

          <div className="calvoro-card-grid is-four">
            {browseCategories.map((category) => (
              <CategoryCard
                key={category}
                category={category}
                description={categoryDescriptions[category]}
                count={categoryCount(category)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="calvoro-home-band is-cream">
        <div className="calvoro-container">
          <div className="calvoro-band-head">
            <div className="calvoro-band-head-text">
              <span className="ui-eyebrow">Browser utilities</span>
              <h2>Files, text and code — without an upload.</h2>
              <p>
                PDF, image, writing and developer utilities that run in your
                browser. Your files stay on your device.
              </p>
            </div>

            <Link to="/tools" className="calvoro-outline-button">
              Browse all {utilityTools.length} tools
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="calvoro-card-grid is-four">
            {featuredUtilityTools.slice(0, 8).map((tool) => (
              <ToolCard key={tool.path} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <section className="calvoro-home-band is-white">
        <div className="calvoro-container">
          <div className="calvoro-band-head">
            <div className="calvoro-band-head-text">
              <span className="ui-eyebrow">Optional writing helpers</span>
              <h2>AI writing tools, kept separate from the calculators.</h2>
              <p>
                Use them when you need a summary, rewrite, translation, grammar
                check, draft or email.
              </p>
            </div>
          </div>

          <div className="calvoro-ai-grid">
            {aiTools.map((tool) => {
              const Icon = tool.icon;

              return (
                <Link key={tool.path} to={tool.path} className="calvoro-ai-card">
                  <div className="calvoro-ai-card-top">
                    <span className="calvoro-ai-icon" aria-hidden="true">
                      <Icon size={20} strokeWidth={1.8} />
                    </span>
                    <span className="calvoro-ai-badge">Available</span>
                  </div>

                  <h3>{tool.title}</h3>
                  <p>{tool.description}</p>
                  <span className="calvoro-card-link">
                    Open tool <span aria-hidden="true">→</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="calvoro-home-band is-dark">
        <div className="calvoro-container">
          <div className="calvoro-band-head">
            <div className="calvoro-band-head-text">
              <span className="ui-eyebrow">Why CALVORO</span>
              <h2>Built to be quick, private and easy to check.</h2>
              <p>
                No sign-up, no paywall, and no mystery about where a result
                comes from.
              </p>
            </div>
          </div>

          <div className="calvoro-trust-grid">
            {trustPoints.map((point) => {
              const Icon = point.icon;

              return (
                <article key={point.title} className="calvoro-trust-card">
                  <span className="calvoro-trust-icon" aria-hidden="true">
                    <Icon size={20} strokeWidth={1.8} />
                  </span>
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <HowItWorks />

      <section className="calvoro-home-band is-white">
        <div className="calvoro-container">
          <div className="calvoro-band-head">
            <div className="calvoro-band-head-text">
              <span className="ui-eyebrow">CALVORO Journal</span>
              <h2>Guides for the numbers behind everyday decisions.</h2>
              <p>
                {articles.length} original guides explain the formulas,
                assumptions and tradeoffs behind the calculators.
              </p>
            </div>

            <Link to="/blog" className="calvoro-outline-button">
              Browse all {articles.length} guides
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className="calvoro-editorial-grid calvoro-editorial-grid-3">
            {featuredArticles.slice(0, 3).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      </section>

      <HomeSEOContent />

      <FAQ />

      <section className="calvoro-cta-section">
        <div className="calvoro-container">
          <div className="calvoro-cta-inner">
            <span className="ui-eyebrow">Ready when you are</span>
            <h2>
              Start with the number <em>you already know.</em>
            </h2>
            <p>
              Every calculator and browser tool is free to open, and every
              result comes with the method behind it.
            </p>

            <div className="calvoro-cta-actions">
              <Link to="/tools" className="calvoro-primary-button">
                Browse all tools <span aria-hidden="true">→</span>
              </Link>
              <Link to="/blog" className="calvoro-secondary-button">
                Read the journal
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
