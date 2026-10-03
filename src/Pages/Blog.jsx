
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../SEO";

const posts = [
  {
    slug: "how-to-calculate-percentage",
    title: "How to Calculate Percentage Easily",
    category: "Math",
    date: "September 30, 2026",
    readTime: "4 min read",
    excerpt:
      "Learn how percentages work, how to calculate them, and when a percentage calculator can save time.",
    content:
      "Percentages are used in discounts, exams, business, finance, statistics, and many everyday situations.",
    tool: "/percentage",
    featured: true,
  },
  {
    slug: "how-compound-interest-works",
    title: "How Compound Interest Works",
    category: "Finance",
    date: "September 30, 2026",
    readTime: "5 min read",
    excerpt:
      "Understand compound interest, growth over time, and how regular investing can affect future value.",
    content:
      "Compound interest can help explain how money can grow over repeated compounding periods.",
    tool: "/compound-interest",
  },
  {
    slug: "how-to-calculate-bmi",
    title: "How to Calculate BMI",
    category: "Health",
    date: "September 30, 2026",
    readTime: "4 min read",
    excerpt:
      "Learn the basic BMI formula, what the calculation measures, and how to use a BMI calculator.",
    content:
      "BMI is a calculation based on height and weight that is commonly used as a general screening measure.",
    tool: "/bmi",
  },
  {
    slug: "how-loan-payments-are-calculated",
    title: "How Loan Payments Are Calculated",
    category: "Finance",
    date: "September 30, 2026",
    readTime: "6 min read",
    excerpt:
      "Understand loan payments, interest, principal, and why the loan term affects total cost.",
    content:
      "Loan payments generally depend on the amount borrowed, interest rate, and repayment period.",
    tool: "/loan",
  },
  {
    slug: "how-to-calculate-gpa",
    title: "How to Calculate GPA",
    category: "Education",
    date: "September 30, 2026",
    readTime: "4 min read",
    excerpt:
      "Learn how grades and credit values can be combined to calculate a grade point average.",
    content:
      "A GPA is a numerical summary of academic performance based on grade points and, often, course credits.",
    tool: "/gpa",
  },
  {
    slug: "how-to-calculate-fuel-cost",
    title: "How to Calculate Fuel Cost for a Trip",
    category: "Everyday",
    date: "September 30, 2026",
    readTime: "4 min read",
    excerpt:
      "Calculate estimated fuel usage and travel cost using distance, efficiency, and fuel price.",
    content:
      "Fuel-cost estimates can help with trip planning and comparing travel expenses.",
    tool: "/fuel-cost",
  },
];

const categories = [
  "All",
  "Math",
  "Finance",
  "Health",
  "Education",
  "Everyday",
];

const featuredPost = posts.find((post) => post.featured) || posts[0];

export default function Blog() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    const searchText = search.toLowerCase().trim();

    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === "All" ||
        post.category === activeCategory;

      const matchesSearch =
        !searchText ||
        post.title.toLowerCase().includes(searchText) ||
        post.excerpt.toLowerCase().includes(searchText) ||
        post.category.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const regularPosts = filteredPosts.filter(
    (post) => post.slug !== featuredPost.slug
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >
      <SEO
        title="CALVORO Blog - Guides, Tips & How-To Articles"
        description="Read practical CALVORO guides about calculators, finance, math, health, education and everyday tasks."
      />

      {/* BLOG PAGE HEADER */}

      <section
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e3a8a 52%, #2563eb 100%)",
          color: "#ffffff",
          padding: "72px 20px 60px",
        }}
      >
        <div
          style={{
            maxWidth: "1180px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              maxWidth: "760px",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "7px 12px",
                borderRadius: "999px",
                background: "rgba(255,255,255,0.12)",
                border:
                  "1px solid rgba(255,255,255,0.18)",
                fontSize: "11px",
                fontWeight: "900",
                letterSpacing: "0.8px",
                marginBottom: "16px",
              }}
            >
              📰 CALVORO JOURNAL
            </div>

            <h1
              style={{
                margin: "0 0 14px",
                fontSize: "clamp(38px, 6vw, 62px)",
                lineHeight: 1.03,
                fontWeight: "900",
                letterSpacing: "-2px",
              }}
            >
              Practical ideas.
              <br />
              Useful guides.
            </h1>

            <p
              style={{
                margin: 0,
                maxWidth: "700px",
                fontSize: "17px",
                lineHeight: 1.8,
                color: "rgba(255,255,255,0.88)",
              }}
            >
              Helpful articles about calculations, finance,
              education, health, and everyday tasks — connected
              to useful CALVORO tools.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN BLOG AREA */}

      <main
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "40px 20px 80px",
        }}
      >
        {/* CATEGORY BAR */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
            flexWrap: "wrap",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "8px",
              flexWrap: "wrap",
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
                      : "1px solid #dbe3ef",
                    background: active
                      ? "#2563eb"
                      : "#ffffff",
                    color: active
                      ? "#ffffff"
                      : "#475569",
                    padding: "9px 14px",
                    borderRadius: "999px",
                    fontSize: "12px",
                    fontWeight: "800",
                    cursor: "pointer",
                  }}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <div
            style={{
              color: "#64748b",
              fontSize: "13px",
              fontWeight: "700",
            }}
          >
            {filteredPosts.length} articles
          </div>
        </div>

        {/* SEARCH */}

        <div
          style={{
            marginBottom: "34px",
          }}
        >
          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search articles..."
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "17px 18px",
              borderRadius: "14px",
              border: "1px solid #d9e1ec",
              background: "#ffffff",
              color: "#0f172a",
              fontSize: "15px",
              outline: "none",
              boxShadow:
                "0 5px 20px rgba(15,23,42,0.04)",
            }}
          />
        </div>

        {/* FEATURED POST */}

        {filteredPosts.some(
          (post) => post.slug === featuredPost.slug
        ) && (
          <section
            style={{
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "minmax(0, 1.25fr) minmax(280px, 0.75fr)",
                background: "#ffffff",
                border:
                  "1px solid #dfe7f1",
                borderRadius: "22px",
                overflow: "hidden",
                boxShadow:
                  "0 10px 30px rgba(15,23,42,0.06)",
              }}
            >
              {/* FEATURED VISUAL */}

              <div
                style={{
                  minHeight: "320px",
                  background:
                    "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #4f46e5 100%)",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "35px",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: "22px",
                    left: "22px",
                    padding: "6px 10px",
                    borderRadius: "999px",
                    background:
                      "rgba(255,255,255,0.15)",
                    color: "#ffffff",
                    fontSize: "10px",
                    fontWeight: "900",
                    letterSpacing: "1px",
                  }}
                >
                  FEATURED ARTICLE
                </div>

                <div
                  style={{
                    textAlign: "center",
                    color: "#ffffff",
                  }}
                >
                  <div
                    style={{
                      fontSize: "72px",
                      marginBottom: "10px",
                    }}
                  >
                    %
                  </div>

                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "800",
                      opacity: 0.85,
                    }}
                  >
                    SIMPLE • CLEAR • PRACTICAL
                  </div>
                </div>
              </div>

              {/* FEATURED CONTENT */}

              <div
                style={{
                  padding: "34px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    alignSelf: "flex-start",
                    padding: "5px 9px",
                    borderRadius: "999px",
                    background: "#eff6ff",
                    color: "#2563eb",
                    fontSize: "10px",
                    fontWeight: "900",
                    marginBottom: "14px",
                  }}
                >
                  {featuredPost.category}
                </div>

                <h2
                  style={{
                    margin: "0 0 12px",
                    color: "#0f172a",
                    fontSize: "clamp(26px, 3vw, 38px)",
                    lineHeight: 1.15,
                    fontWeight: "900",
                  }}
                >
                  {featuredPost.title}
                </h2>

                <div
                  style={{
                    color: "#94a3b8",
                    fontSize: "12px",
                    fontWeight: "600",
                    marginBottom: "16px",
                  }}
                >
                  {featuredPost.date} ·{" "}
                  {featuredPost.readTime}
                </div>

                <p
                  style={{
                    margin: "0 0 24px",
                    color: "#64748b",
                    fontSize: "15px",
                    lineHeight: 1.8,
                  }}
                >
                  {featuredPost.excerpt}
                </p>

                <Link
                  to={`/blog/${featuredPost.slug}`}
                  style={{
                    alignSelf: "flex-start",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "12px 17px",
                    borderRadius: "10px",
                    background: "#2563eb",
                    color: "#ffffff",
                    textDecoration: "none",
                    fontSize: "13px",
                    fontWeight: "900",
                  }}
                >
                  Read featured article →
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* CONTENT + SIDEBAR */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0, 1fr) 300px",
            gap: "28px",
            alignItems: "start",
          }}
        >
          {/* ARTICLES */}

          <section>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "18px",
              }}
            >
              <div>
                <div
                  style={{
                    color: "#2563eb",
                    fontSize: "11px",
                    fontWeight: "900",
                    letterSpacing: "1px",
                    marginBottom: "5px",
                  }}
                >
                  LATEST ARTICLES
                </div>

                <h2
                  style={{
                    margin: 0,
                    color: "#0f172a",
                    fontSize: "28px",
                    fontWeight: "900",
                  }}
                >
                  From the CALVORO Blog
                </h2>
              </div>
            </div>

            {regularPosts.length > 0 ? (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "20px",
                }}
              >
                {regularPosts.map((post) => (
                  <article
                    key={post.slug}
                    style={{
                      background: "#ffffff",
                      border:
                        "1px solid #dfe7f1",
                      borderRadius: "20px",
                      overflow: "hidden",
                      boxShadow:
                        "0 8px 24px rgba(15,23,42,0.04)",
                    }}
                  >
                    {/* CARD IMAGE AREA */}

                    <div
                      style={{
                        height: "150px",
                        background:
                          "linear-gradient(135deg, #eff6ff, #eef2ff)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#2563eb",
                        fontSize: "52px",
                        fontWeight: "900",
                      }}
                    >
                      {post.category === "Finance"
                        ? "₹"
                        : post.category === "Health"
                        ? "♥"
                        : post.category === "Education"
                        ? "A+"
                        : post.category === "Everyday"
                        ? "⚡"
                        : "∑"}
                    </div>

                    <div
                      style={{
                        padding: "23px",
                      }}
                    >
                      <div
                        style={{
                          display: "inline-block",
                          padding: "5px 8px",
                          borderRadius: "999px",
                          background: "#eff6ff",
                          color: "#2563eb",
                          fontSize: "10px",
                          fontWeight: "900",
                          marginBottom: "12px",
                        }}
                      >
                        {post.category}
                      </div>

                      <h3
                        style={{
                          margin: "0 0 9px",
                          color: "#0f172a",
                          fontSize: "20px",
                          lineHeight: 1.3,
                          fontWeight: "900",
                        }}
                      >
                        {post.title}
                      </h3>

                      <div
                        style={{
                          color: "#94a3b8",
                          fontSize: "11px",
                          marginBottom: "13px",
                        }}
                      >
                        {post.date} ·{" "}
                        {post.readTime}
                      </div>

                      <p
                        style={{
                          margin: "0 0 18px",
                          color: "#64748b",
                          fontSize: "14px",
                          lineHeight: 1.75,
                        }}
                      >
                        {post.excerpt}
                      </p>

                      <Link
                        to={`/blog/${post.slug}`}
                        style={{
                          color: "#2563eb",
                          textDecoration: "none",
                          fontSize: "13px",
                          fontWeight: "900",
                        }}
                      >
                        Continue reading →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div
                style={{
                  background: "#ffffff",
                  border:
                    "1px solid #dfe7f1",
                  borderRadius: "18px",
                  padding: "55px 20px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "42px",
                    marginBottom: "12px",
                  }}
                >
                  🔎
                </div>

                <h3
                  style={{
                    margin: "0 0 7px",
                    color: "#0f172a",
                  }}
                >
                  No articles found
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                  }}
                >
                  Try another search term or category.
                </p>
              </div>
            )}
          </section>

          {/* SIDEBAR */}

          <aside
            style={{
              display: "grid",
              gap: "18px",
            }}
          >
            {/* ABOUT BLOG */}

            <div
              style={{
                background: "#ffffff",
                border:
                  "1px solid #dfe7f1",
                borderRadius: "18px",
                padding: "24px",
              }}
            >
              <div
                style={{
                  color: "#2563eb",
                  fontSize: "11px",
                  fontWeight: "900",
                  letterSpacing: "1px",
                  marginBottom: "8px",
                }}
              >
                ABOUT THE BLOG
              </div>

              <h3
                style={{
                  margin: "0 0 10px",
                  color: "#0f172a",
                  fontSize: "21px",
                  fontWeight: "900",
                }}
              >
                Helpful content from CALVORO
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  fontSize: "14px",
                  lineHeight: 1.75,
                }}
              >
                Explore practical guides designed to
                explain common calculations, useful concepts,
                and everyday tasks in simple language.
              </p>
            </div>

            {/* POPULAR CATEGORIES */}

            <div
              style={{
                background: "#ffffff",
                border:
                  "1px solid #dfe7f1",
                borderRadius: "18px",
                padding: "24px",
              }}
            >
              <div
                style={{
                  color: "#2563eb",
                  fontSize: "11px",
                  fontWeight: "900",
                  letterSpacing: "1px",
                  marginBottom: "10px",
                }}
              >
                CATEGORIES
              </div>

              <div
                style={{
                  display: "grid",
                  gap: "8px",
                }}
              >
                {categories
                  .filter(
                    (category) => category !== "All"
                  )
                  .map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => {
                        setActiveCategory(category);
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }}
                      style={{
                        border: "none",
                        borderBottom:
                          "1px solid #eef2f7",
                        background: "transparent",
                        color: "#475569",
                        textAlign: "left",
                        padding: "9px 0",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: "700",
                      }}
                    >
                      {category}
                    </button>
                  ))}
              </div>
            </div>

            {/* CALVORO TOOL */}

            <div
              style={{
                background:
                  "linear-gradient(135deg, #eff6ff, #eef2ff)",
                border:
                  "1px solid #dbeafe",
                borderRadius: "18px",
                padding: "24px",
              }}
            >
              <div
                style={{
                  fontSize: "30px",
                  marginBottom: "8px",
                }}
              >
                🧮
              </div>

              <h3
                style={{
                  margin: "0 0 9px",
                  color: "#0f172a",
                  fontSize: "20px",
                  fontWeight: "900",
                }}
              >
                Need a calculator?
              </h3>

              <p
                style={{
                  margin: "0 0 17px",
                  color: "#64748b",
                  fontSize: "14px",
                  lineHeight: 1.7,
                }}
              >
                Try the full CALVORO tool directory and
                find a calculator for your task.
              </p>

              <Link
                to="/tools"
                style={{
                  display: "inline-block",
                  padding: "11px 15px",
                  borderRadius: "10px",
                  background: "#2563eb",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: "900",
                }}
              >
                Browse Tools →
              </Link>
            </div>
          </aside>
        </div>

        {/* BLOG FOOTER CTA */}

        <section
          style={{
            marginTop: "45px",
            padding: "32px",
            borderRadius: "20px",
            background: "#0f172a",
            color: "#ffffff",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              margin: "0 0 8px",
              fontSize: "28px",
              fontWeight: "900",
            }}
          >
            Explore CALVORO Tools
          </h2>

          <p
            style={{
              margin: "0 auto 18px",
              maxWidth: "650px",
              color: "#cbd5e1",
              lineHeight: 1.7,
              fontSize: "14px",
            }}
          >
            Read a guide, then use the related CALVORO
            calculator or AI tool to work on your own task.
          </p>

          <Link
            to="/tools"
            style={{
              display: "inline-block",
              padding: "12px 18px",
              borderRadius: "10px",
              background: "#2563eb",
              color: "#ffffff",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: "900",
            }}
          >
            View All Tools →
          </Link>
        </section>

        {/* BACK HOME */}

        <div
          style={{
            marginTop: "28px",
            textAlign: "center",
          }}
        >
          <Link
            to="/"
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: "800",
            }}
          >
            ← Back to CALVORO
          </Link>
        </div>
      </main>
    </div>
  );
}

