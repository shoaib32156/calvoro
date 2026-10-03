
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const tools = [
  {
    name: "Percentage Calculator",
    category: "Math",
    description: "Calculate percentages quickly and easily.",
    path: "/percentage",
  },
  {
    name: "Age Calculator",
    category: "Date & Time",
    description: "Calculate your exact age from your date of birth.",
    path: "/age",
  },
  {
    name: "BMI Calculator",
    category: "Health",
    description: "Calculate your Body Mass Index.",
    path: "/bmi",
  },
  {
    name: "Loan Calculator",
    category: "Finance",
    description: "Estimate loan payments and total interest.",
    path: "/loan",
  },
  {
    name: "EMI Calculator",
    category: "Finance",
    description: "Calculate monthly EMI payments.",
    path: "/emi",
  },
  {
    name: "Currency Converter",
    category: "Finance",
    description: "Convert between different currencies.",
    path: "/currency",
  },
  {
    name: "Discount Calculator",
    category: "Finance",
    description: "Calculate discounts and final prices.",
    path: "/discount",
  },
  {
    name: "Tip Calculator",
    category: "Finance",
    description: "Calculate tips and split bills easily.",
    path: "/tip",
  },
  {
    name: "Time Zone Converter",
    category: "Date & Time",
    description: "Convert times between different time zones.",
    path: "/timezone",
  },
  {
    name: "GPA Calculator",
    category: "Education",
    description: "Calculate your GPA quickly.",
    path: "/gpa",
  },
  {
    name: "Unit Converter",
    category: "Math",
    description: "Convert common measurement units.",
    path: "/unit",
  },
  {
    name: "Fuel Cost Calculator",
    category: "Everyday",
    description: "Estimate fuel usage and travel cost.",
    path: "/fuel-cost",
  },
  {
    name: "Mortgage Calculator",
    category: "Finance",
    description: "Estimate mortgage payments and interest.",
    path: "/mortgage",
  },
  {
    name: "Salary Calculator",
    category: "Finance",
    description: "Estimate salary and take-home amounts.",
    path: "/salary",
  },
  {
    name: "Compound Interest Calculator",
    category: "Finance",
    description: "Calculate compound interest growth.",
    path: "/compound-interest",
  },
  {
    name: "Tax Calculator",
    category: "Finance",
    description: "Estimate tax amounts and after-tax income.",
    path: "/tax",
  },
  {
    name: "Profit Margin Calculator",
    category: "Business",
    description: "Calculate profit margins and markup.",
    path: "/profit-margin",
  },
  {
    name: "Break-Even Calculator",
    category: "Business",
    description: "Find your break-even point.",
    path: "/break-even",
  },
  {
    name: "ROI Calculator",
    category: "Business",
    description: "Calculate return on investment.",
    path: "/roi",
  },
  {
    name: "Payback Period Calculator",
    category: "Business",
    description: "Calculate how long an investment takes to pay back.",
    path: "/payback-period",
  },
  {
    name: "Investment Calculator",
    category: "Finance",
    description: "Estimate investment growth over time.",
    path: "/investment",
  },
  {
    name: "Savings Calculator",
    category: "Finance",
    description: "Plan your savings and future balance.",
    path: "/savings",
  },
  {
    name: "Inflation Calculator",
    category: "Finance",
    description: "Compare the value of money over time.",
    path: "/inflation",
  },
  {
    name: "Present Value Calculator",
    category: "Finance",
    description: "Calculate the present value of future money.",
    path: "/present-value",
  },
  {
    name: "Future Value Calculator",
    category: "Finance",
    description: "Calculate the future value of an investment.",
    path: "/future-value",
  },
  {
    name: "Net Worth Calculator",
    category: "Finance",
    description: "Calculate your total net worth.",
    path: "/net-worth",
  },
  {
    name: "Percentage Change Calculator",
    category: "Math",
    description: "Calculate percentage increases and decreases.",
    path: "/percentage-change",
  },
  {
    name: "Average Calculator",
    category: "Math",
    description: "Calculate the average of numbers.",
    path: "/average",
  },
  {
    name: "Fraction Calculator",
    category: "Math",
    description: "Add, subtract, multiply and divide fractions.",
    path: "/fraction",
  },
  {
    name: "Ratio Calculator",
    category: "Math",
    description: "Calculate and simplify ratios.",
    path: "/ratio",
  },
  {
    name: "Time Duration Calculator",
    category: "Date & Time",
    description: "Calculate the duration between two times.",
    path: "/time-duration",
  },
  {
    name: "Date Difference Calculator",
    category: "Date & Time",
    description: "Find the difference between two dates.",
    path: "/date-difference",
  },
  {
    name: "Speed Calculator",
    category: "Everyday",
    description: "Calculate speed, distance and time.",
    path: "/speed",
  },
  {
    name: "Distance Calculator",
    category: "Everyday",
    description: "Calculate distance using speed and time.",
    path: "/distance",
  },
  {
    name: "Pace Calculator",
    category: "Fitness",
    description: "Calculate running pace and speed.",
    path: "/pace",
  },
  {
    name: "Running Speed Calculator",
    category: "Fitness",
    description: "Calculate your running speed.",
    path: "/running-speed",
  },
  {
    name: "Time to Run Calculator",
    category: "Fitness",
    description: "Estimate the time needed to run a distance.",
    path: "/time-to-run",
  },
  {
    name: "Running Time Calculator",
    category: "Fitness",
    description: "Calculate running time from distance and pace.",
    path: "/running-time",
  },
  {
    name: "Running Pace Calculator",
    category: "Fitness",
    description: "Calculate your running pace.",
    path: "/running-pace",
  },
  {
    name: "AI Text Summarizer",
    category: "AI Tools",
    description: "Turn long text into clear, easy-to-read summaries.",
    path: "/ai-summarizer",
  },
  {
    name: "AI Text Rewriter",
    category: "AI Tools",
    description: "Rewrite text while keeping the original meaning.",
    path: "/ai-rewriter",
  },
  {
    name: "AI Grammar Checker",
    category: "AI Tools",
    description: "Check grammar, spelling, punctuation, and clarity.",
    path: "/ai-grammar-checker",
  },
  {
    name: "AI Text Translator",
    category: "AI Tools",
    description: "Translate text into another language.",
    path: "/ai-translator",
  },
  {
    name: "AI Text Generator",
    category: "AI Tools",
    description: "Generate useful content from a topic and writing style.",
    path: "/ai-text-generator",
  },
  {
    name: "AI Email Writer",
    category: "AI Tools",
    description: "Create clear and professional emails.",
    path: "/ai-email-writer",
  },
];

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
  "AI Tools",
];

export default function Tools() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTools = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return tools.filter((tool) => {
      const matchesCategory =
        activeCategory === "All" ||
        tool.category === activeCategory;

      const matchesSearch =
        !searchText ||
        tool.name.toLowerCase().includes(searchText) ||
        tool.description.toLowerCase().includes(searchText) ||
        tool.category.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
      }}
    >
      {/* HEADER */}

      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          background: "rgba(255,255,255,0.94)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: "1px solid #e2e8f0",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "14px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "18px",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#0f172a",
              fontSize: "22px",
              fontWeight: "900",
              letterSpacing: "1.5px",
            }}
          >
            CALVORO
          </Link>

          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "#2563eb",
              fontSize: "14px",
              fontWeight: "800",
            }}
          >
            ← Home
          </Link>
        </div>
      </header>

      {/* HERO */}

      <section
        style={{
          background:
            "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
          color: "#ffffff",
          padding: "65px 20px",
        }}
      >
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              padding: "7px 13px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.15)",
              fontSize: "12px",
              fontWeight: "800",
              marginBottom: "15px",
            }}
          >
            🧰 CALVORO TOOL DIRECTORY
          </div>

          <h1
            style={{
              margin: "0 0 15px",
              fontSize: "clamp(34px, 6vw, 54px)",
              lineHeight: 1.1,
              fontWeight: "900",
            }}
          >
            All CALVORO Tools
          </h1>

          <p
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              fontSize: "17px",
              lineHeight: 1.7,
              opacity: 0.95,
            }}
          >
            Browse calculators and AI tools in one convenient
            directory.
          </p>
        </div>
      </section>

      {/* DIRECTORY */}

      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "50px 20px 80px",
        }}
      >
        {/* SEARCH */}

        <div
          style={{
            maxWidth: "700px",
            margin: "0 auto 25px",
          }}
        >
          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search tools..."
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "16px 18px",
              borderRadius: "14px",
              border: "1px solid #cbd5e1",
              background: "#ffffff",
              color: "#0f172a",
              fontSize: "16px",
              outline: "none",
              boxShadow:
                "0 8px 25px rgba(15,23,42,0.05)",
            }}
          />
        </div>

        {/* CATEGORIES */}

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "8px",
            marginBottom: "35px",
          }}
        >
          {categories.map((category) => {
            const active =
              activeCategory === category;

            return (
              <button
                key={category}
                type="button"
                onClick={() =>
                  setActiveCategory(category)
                }
                style={{
                  border: active
                    ? "1px solid #2563eb"
                    : "1px solid #e2e8f0",
                  background: active
                    ? "#2563eb"
                    : "#ffffff",
                  color: active
                    ? "#ffffff"
                    : "#475569",
                  padding: "9px 14px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* RESULT COUNT */}

        <div
          style={{
            marginBottom: "20px",
            textAlign: "center",
            color: "#64748b",
            fontSize: "14px",
            fontWeight: "700",
          }}
        >
          Showing {filteredTools.length} tools
        </div>

        {/* TOOL GRID */}

        {filteredTools.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "18px",
            }}
          >
            {filteredTools.map((tool) => (
              <Link
                key={tool.path}
                to={tool.path}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    boxSizing: "border-box",
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "18px",
                    padding: "24px",
                    boxShadow:
                      "0 6px 22px rgba(15,23,42,0.04)",
                  }}
                >
                  <div
                    style={{
                      width: "46px",
                      height: "46px",
                      borderRadius: "13px",
                      background: "#eff6ff",
                      color: "#2563eb",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      fontWeight: "900",
                      marginBottom: "16px",
                    }}
                  >
                    ✓
                  </div>

                  <div
                    style={{
                      display: "inline-block",
                      marginBottom: "10px",
                      padding: "5px 8px",
                      borderRadius: "999px",
                      background:
                        tool.category === "AI Tools"
                          ? "#ede9fe"
                          : "#f1f5f9",
                      color:
                        tool.category === "AI Tools"
                          ? "#6d28d9"
                          : "#475569",
                      fontSize: "11px",
                      fontWeight: "800",
                    }}
                  >
                    {tool.category}
                  </div>

                  <h2
                    style={{
                      margin: "0 0 9px",
                      fontSize: "18px",
                      fontWeight: "850",
                      color: "#0f172a",
                    }}
                  >
                    {tool.name}
                  </h2>

                  <p
                    style={{
                      margin: 0,
                      color: "#64748b",
                      fontSize: "14px",
                      lineHeight: 1.7,
                    }}
                  >
                    {tool.description}
                  </p>

                  <div
                    style={{
                      marginTop: "18px",
                      color: "#2563eb",
                      fontSize: "13px",
                      fontWeight: "800",
                    }}
                  >
                    Open tool →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: "18px",
              padding: "60px 20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "45px",
                marginBottom: "15px",
              }}
            >
              🔎
            </div>

            <h2
              style={{
                margin: "0 0 8px",
                color: "#0f172a",
              }}
            >
              No tools found
            </h2>

            <p
              style={{
                margin: 0,
                color: "#64748b",
              }}
            >
              Try a different search term or category.
            </p>
          </div>
        )}
      </main>

      {/* FOOTER */}

      <footer
        style={{
          background: "#0f172a",
          color: "#cbd5e1",
          padding: "30px 20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "18px",
            fontWeight: "900",
            letterSpacing: "1px",
            color: "#ffffff",
          }}
        >
          CALVORO
        </div>

        <div
          style={{
            marginTop: "8px",
            fontSize: "12px",
          }}
        >
          Smart tools for everyday needs.
        </div>

        <div
          style={{
            marginTop: "18px",
            fontSize: "12px",
            color: "#94a3b8",
          }}
        >
          &copy; {new Date().getFullYear()} CALVORO.
          All rights reserved.
        </div>
      </footer>
    </div>
  );
}

