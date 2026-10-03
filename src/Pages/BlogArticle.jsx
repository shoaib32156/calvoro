
import React from "react";
import { Link, useParams } from "react-router-dom";
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
    tool: "/percentage",
    toolName: "Percentage Calculator",
    sections: [
      {
        heading: "What Is a Percentage?",
        paragraphs: [
          "A percentage is a way of expressing a number as a part of 100. Percentages are commonly used in discounts, exam scores, business reports, statistics, and everyday comparisons.",
          "Understanding percentages can make it easier to compare values and understand how much one amount represents relative to another.",
        ],
      },
      {
        heading: "Basic Percentage Formula",
        paragraphs: [
          "A common percentage calculation divides the part by the whole and multiplies the result by 100.",
          "For example, if 25 items out of a total of 100 meet a condition, the result is 25%.",
        ],
      },
      {
        heading: "Percentage Increase and Decrease",
        paragraphs: [
          "Percentage change is useful when comparing an original value with a new value.",
          "The same general idea can be used to understand price increases, discounts, business growth, or changes in measurements.",
        ],
      },
      {
        heading: "Where Percentages Are Useful",
        paragraphs: [
          "Percentages appear in many areas of daily life. You may use them when calculating shopping discounts, comparing exam results, reviewing business performance, or understanding financial figures.",
        ],
      },
    ],
  },
  {
    slug: "how-compound-interest-works",
    title: "How Compound Interest Works",
    category: "Finance",
    date: "September 30, 2026",
    readTime: "5 min read",
    excerpt:
      "Understand compound interest, growth over time, and how regular investing can affect future value.",
    tool: "/compound-interest",
    toolName: "Compound Interest Calculator",
    sections: [
      {
        heading: "What Is Compound Interest?",
        paragraphs: [
          "Compound interest is interest calculated on an initial amount as well as interest that has accumulated during earlier periods.",
          "This means the balance used for a later calculation can include previously earned interest.",
        ],
      },
      {
        heading: "Why Time Matters",
        paragraphs: [
          "Because interest can become part of the balance, repeated compounding can produce growth that differs from simple interest.",
          "The effect becomes easier to see over longer periods when the accumulated balance has more time to change.",
        ],
      },
      {
        heading: "Factors That Affect Compound Growth",
        paragraphs: [
          "The starting balance, interest rate, compounding frequency, additional contributions, and time period can all influence the final value.",
          "Changing any of these inputs can change the estimated result.",
        ],
      },
      {
        heading: "Using a Compound Interest Calculator",
        paragraphs: [
          "A calculator can make it easier to compare different rates, starting amounts, contribution schedules, and time periods.",
        ],
      },
    ],
  },
  {
    slug: "how-to-calculate-bmi",
    title: "How to Calculate BMI",
    category: "Health",
    date: "September 30, 2026",
    readTime: "4 min read",
    excerpt:
      "Learn the basic BMI formula, what the calculation measures, and how to use a BMI calculator.",
    tool: "/bmi",
    toolName: "BMI Calculator",
    sections: [
      {
        heading: "What Is BMI?",
        paragraphs: [
          "Body Mass Index, usually called BMI, is a calculation based on height and weight.",
          "It is commonly used as a general screening measure rather than a complete description of an individual's health or body composition.",
        ],
      },
      {
        heading: "The Basic BMI Formula",
        paragraphs: [
          "For measurements in kilograms and metres, BMI is calculated by dividing body weight in kilograms by height in metres squared.",
        ],
      },
      {
        heading: "Understanding the Result",
        paragraphs: [
          "A BMI result can provide a general numerical measure, but it does not describe every aspect of a person's health.",
          "Factors such as body composition and other individual characteristics are not represented by the basic calculation.",
        ],
      },
      {
        heading: "Use the CALVORO BMI Calculator",
        paragraphs: [
          "You can enter your height and weight into the CALVORO BMI Calculator to quickly calculate the numerical result.",
        ],
      },
    ],
  },
  {
    slug: "how-loan-payments-are-calculated",
    title: "How Loan Payments Are Calculated",
    category: "Finance",
    date: "September 30, 2026",
    readTime: "6 min read",
    excerpt:
      "Understand loan payments, interest, principal, and why the loan term affects total cost.",
    tool: "/loan",
    toolName: "Loan Calculator",
    sections: [
      {
        heading: "What Affects a Loan Payment?",
        paragraphs: [
          "Loan payments generally depend on the amount borrowed, interest rate, and repayment period.",
          "Different loan products can use different repayment structures, so the exact calculation can vary.",
        ],
      },
      {
        heading: "Principal and Interest",
        paragraphs: [
          "The principal is the amount borrowed. Interest is the cost charged for borrowing the money.",
          "A regular repayment can therefore include both a principal portion and an interest portion.",
        ],
      },
      {
        heading: "Why the Loan Term Matters",
        paragraphs: [
          "Changing the repayment period can affect the size of regular payments and the total amount of interest paid over the life of a loan.",
        ],
      },
      {
        heading: "Using a Loan Calculator",
        paragraphs: [
          "A calculator can help you estimate payments and compare different loan amounts, rates, and terms before making financial plans.",
        ],
      },
    ],
  },
  {
    slug: "how-to-calculate-gpa",
    title: "How to Calculate GPA",
    category: "Education",
    date: "September 30, 2026",
    readTime: "4 min read",
    excerpt:
      "Learn how grades and credit values can be combined to calculate a grade point average.",
    tool: "/gpa",
    toolName: "GPA Calculator",
    sections: [
      {
        heading: "What Is GPA?",
        paragraphs: [
          "Grade Point Average, or GPA, is a numerical summary of academic performance based on grade points.",
          "The grading scale and calculation method can vary between schools and institutions.",
        ],
      },
      {
        heading: "How GPA Is Calculated",
        paragraphs: [
          "A common approach is to multiply each course's grade points by its credit value, add those results, and divide by the total number of credits.",
        ],
      },
      {
        heading: "Why Credit Hours Matter",
        paragraphs: [
          "Courses with more credits can have a greater effect on the overall GPA than courses with fewer credits.",
        ],
      },
      {
        heading: "Using the CALVORO GPA Calculator",
        paragraphs: [
          "The CALVORO GPA Calculator can help you calculate an estimated GPA from your grades and credit values.",
        ],
      },
    ],
  },
  {
    slug: "how-to-calculate-fuel-cost",
    title: "How to Calculate Fuel Cost for a Trip",
    category: "Everyday",
    date: "September 30, 2026",
    readTime: "4 min read",
    excerpt:
      "Calculate estimated fuel usage and travel cost using distance, efficiency, and fuel price.",
    tool: "/fuel-cost",
    toolName: "Fuel Cost Calculator",
    sections: [
      {
        heading: "What Determines Fuel Cost?",
        paragraphs: [
          "A basic fuel-cost estimate depends on the distance travelled, vehicle fuel efficiency, and fuel price.",
        ],
      },
      {
        heading: "Basic Calculation",
        paragraphs: [
          "You can estimate fuel needed by using the trip distance and the vehicle's fuel economy.",
          "The estimated fuel amount can then be multiplied by the price per unit of fuel.",
        ],
      },
      {
        heading: "Planning a Trip",
        paragraphs: [
          "Fuel-cost estimates can help you create a rough travel budget and compare expected costs for different journeys.",
        ],
      },
      {
        heading: "Using the CALVORO Fuel Cost Calculator",
        paragraphs: [
          "Enter your trip details into the CALVORO Fuel Cost Calculator to estimate fuel usage and travel expenses.",
        ],
      },
    ],
  },
];

export default function BlogArticle() {
  const { slug } = useParams();

  const postIndex = posts.findIndex(
    (item) => item.slug === slug
  );

  const post =
    postIndex >= 0 ? posts[postIndex] : null;

  const previousPost =
    postIndex > 0 ? posts[postIndex - 1] : null;

  const nextPost =
    postIndex >= 0 && postIndex < posts.length - 1
      ? posts[postIndex + 1]
      : null;

  if (!post) {
    return (
      <div
        style={{
          minHeight: "70vh",
          background: "#f5f7fb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "550px",
          }}
        >
          <div
            style={{
              fontSize: "72px",
              fontWeight: "900",
              color: "#2563eb",
              lineHeight: 1,
            }}
          >
            404
          </div>

          <h1
            style={{
              margin: "15px 0 10px",
              color: "#0f172a",
              fontSize: "32px",
            }}
          >
            Article not found
          </h1>

          <p
            style={{
              color: "#64748b",
              lineHeight: 1.7,
              marginBottom: "22px",
            }}
          >
            The blog article you're looking for could not be found.
          </p>

          <Link
            to="/blog"
            style={{
              display: "inline-block",
              padding: "12px 18px",
              borderRadius: "10px",
              background: "#2563eb",
              color: "#ffffff",
              textDecoration: "none",
              fontWeight: "800",
            }}
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
      }}
    >
      <SEO
        title={`${post.title} | CALVORO`}
        description={post.excerpt}
      />

      {/* ARTICLE HERO */}

      <section
        style={{
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e3a8a 52%, #2563eb 100%)",
          color: "#ffffff",
          padding: "65px 20px 70px",
        }}
      >
        <div
          style={{
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          <Link
            to="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "7px",
              color: "rgba(255,255,255,0.82)",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: "800",
              marginBottom: "26px",
            }}
          >
            ← Back to Blog
          </Link>

          <div
            style={{
              display: "inline-flex",
              padding: "6px 10px",
              borderRadius: "999px",
              background: "rgba(255,255,255,0.12)",
              border:
                "1px solid rgba(255,255,255,0.18)",
              fontSize: "10px",
              fontWeight: "900",
              letterSpacing: "0.8px",
              marginBottom: "15px",
            }}
          >
            {post.category}
          </div>

          <h1
            style={{
              margin: "0 0 16px",
              maxWidth: "850px",
              fontSize: "clamp(38px, 6vw, 62px)",
              lineHeight: 1.06,
              letterSpacing: "-2px",
              fontWeight: "900",
            }}
          >
            {post.title}
          </h1>

          <p
            style={{
              maxWidth: "780px",
              margin: "0 0 18px",
              color: "rgba(255,255,255,0.88)",
              fontSize: "17px",
              lineHeight: 1.8,
            }}
          >
            {post.excerpt}
          </p>

          <div
            style={{
              color: "rgba(255,255,255,0.68)",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            {post.date} · {post.readTime}
          </div>
        </div>
      </section>

      {/* MAIN ARTICLE AREA */}

      <main
        style={{
          maxWidth: "1180px",
          margin: "0 auto",
          padding: "42px 20px 80px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0, 1fr) 300px",
            gap: "28px",
            alignItems: "start",
          }}
        >
          {/* ARTICLE */}

          <article
            style={{
              background: "#ffffff",
              border:
                "1px solid #dfe7f1",
              borderRadius: "22px",
              padding:
                "clamp(25px, 5vw, 48px)",
              boxShadow:
                "0 10px 30px rgba(15,23,42,0.05)",
            }}
          >
            {/* INTRO */}

            <div
              style={{
                borderLeft: "4px solid #2563eb",
                paddingLeft: "18px",
                marginBottom: "35px",
              }}
            >
              <p
                style={{
                  margin: 0,
                  color: "#475569",
                  fontSize: "17px",
                  lineHeight: 1.85,
                }}
              >
                {post.excerpt}
              </p>
            </div>

            {/* TABLE OF CONTENTS */}

            <div
              style={{
                background:
                  "linear-gradient(135deg, #f8fbff, #f1f5ff)",
                border:
                  "1px solid #dbeafe",
                borderRadius: "16px",
                padding: "22px",
                marginBottom: "38px",
              }}
            >
              <h2
                style={{
                  margin: "0 0 12px",
                  color: "#0f172a",
                  fontSize: "19px",
                  fontWeight: "900",
                }}
              >
                In this article
              </h2>

              <ol
                style={{
                  margin: 0,
                  paddingLeft: "21px",
                  color: "#475569",
                  lineHeight: 1.9,
                  fontSize: "14px",
                }}
              >
                {post.sections.map(
                  (section, index) => (
                    <li key={section.heading}>
                      <a
                        href={`#section-${index}`}
                        style={{
                          color: "#2563eb",
                          textDecoration: "none",
                          fontWeight: "700",
                        }}
                      >
                        {section.heading}
                      </a>
                    </li>
                  )
                )}
              </ol>
            </div>

            {/* ARTICLE SECTIONS */}

            {post.sections.map(
              (section, index) => (
                <section
                  key={section.heading}
                  id={`section-${index}`}
                  style={{
                    marginBottom: "40px",
                    scrollMarginTop: "90px",
                  }}
                >
                  <h2
                    style={{
                      margin: "0 0 15px",
                      color: "#0f172a",
                      fontSize:
                        "clamp(24px, 4vw, 31px)",
                      lineHeight: 1.25,
                      fontWeight: "900",
                    }}
                  >
                    {section.heading}
                  </h2>

                  {section.paragraphs.map(
                    (paragraph) => (
                      <p
                        key={paragraph}
                        style={{
                          margin:
                            "0 0 16px",
                          color: "#475569",
                          fontSize: "16px",
                          lineHeight: 1.9,
                        }}
                      >
                        {paragraph}
                      </p>
                    )
                  )}
                </section>
              )
            )}

            {/* TOOL BOX */}

            <div
              style={{
                marginTop: "15px",
                padding: "28px",
                borderRadius: "20px",
                background:
                  "linear-gradient(135deg, #eff6ff, #eef2ff)",
                border:
                  "1px solid #dbeafe",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: "10px",
                  fontWeight: "900",
                  letterSpacing: "1px",
                  color: "#4f46e5",
                  marginBottom: "8px",
                }}
              >
                TRY THE RELATED TOOL
              </div>

              <h2
                style={{
                  margin: "0 0 9px",
                  color: "#0f172a",
                  fontSize: "25px",
                  fontWeight: "900",
                }}
              >
                {post.toolName}
              </h2>

              <p
                style={{
                  maxWidth: "620px",
                  margin: "0 auto 19px",
                  color: "#64748b",
                  fontSize: "14px",
                  lineHeight: 1.7,
                }}
              >
                Use the CALVORO tool to work with
                your own numbers and get a quick result.
              </p>

              <Link
                to={post.tool}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "7px",
                  padding: "12px 18px",
                  borderRadius: "10px",
                  background: "#2563eb",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: "900",
                }}
              >
                Open {post.toolName} →
              </Link>
            </div>
          </article>

          {/* SIDEBAR */}

          <aside
            style={{
              display: "grid",
              gap: "18px",
            }}
          >
            {/* ARTICLE INFO */}

            <div
              style={{
                background: "#ffffff",
                border:
                  "1px solid #dfe7f1",
                borderRadius: "18px",
                padding: "23px",
              }}
            >
              <div
                style={{
                  color: "#2563eb",
                  fontSize: "10px",
                  fontWeight: "900",
                  letterSpacing: "1px",
                  marginBottom: "10px",
                }}
              >
                ARTICLE DETAILS
              </div>

              <div
                style={{
                  display: "grid",
                  gap: "12px",
                }}
              >
                <div>
                  <div
                    style={{
                      color: "#94a3b8",
                      fontSize: "11px",
                      marginBottom: "3px",
                    }}
                  >
                    Category
                  </div>

                  <div
                    style={{
                      color: "#0f172a",
                      fontSize: "14px",
                      fontWeight: "800",
                    }}
                  >
                    {post.category}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      color: "#94a3b8",
                      fontSize: "11px",
                      marginBottom: "3px",
                    }}
                  >
                    Published
                  </div>

                  <div
                    style={{
                      color: "#0f172a",
                      fontSize: "14px",
                      fontWeight: "800",
                    }}
                  >
                    {post.date}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      color: "#94a3b8",
                      fontSize: "11px",
                      marginBottom: "3px",
                    }}
                  >
                    Reading time
                  </div>

                  <div
                    style={{
                      color: "#0f172a",
                      fontSize: "14px",
                      fontWeight: "800",
                    }}
                  >
                    {post.readTime}
                  </div>
                </div>
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
                padding: "23px",
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
                  margin: "0 0 8px",
                  color: "#0f172a",
                  fontSize: "20px",
                  fontWeight: "900",
                }}
              >
                More CALVORO Tools
              </h3>

              <p
                style={{
                  margin: "0 0 16px",
                  color: "#64748b",
                  fontSize: "13px",
                  lineHeight: 1.7,
                }}
              >
                Explore calculators and AI tools for
                different everyday tasks.
              </p>

              <Link
                to="/tools"
                style={{
                  display: "inline-block",
                  padding: "10px 14px",
                  borderRadius: "9px",
                  background: "#2563eb",
                  color: "#ffffff",
                  textDecoration: "none",
                  fontSize: "12px",
                  fontWeight: "900",
                }}
              >
                Browse All Tools →
              </Link>
            </div>

            {/* BLOG */}

            <div
              style={{
                background: "#ffffff",
                border:
                  "1px solid #dfe7f1",
                borderRadius: "18px",
                padding: "23px",
              }}
            >
              <div
                style={{
                  color: "#2563eb",
                  fontSize: "10px",
                  fontWeight: "900",
                  letterSpacing: "1px",
                  marginBottom: "8px",
                }}
              >
                CALVORO BLOG
              </div>

              <h3
                style={{
                  margin: "0 0 8px",
                  color: "#0f172a",
                  fontSize: "20px",
                  fontWeight: "900",
                }}
              >
                More useful guides
              </h3>

              <p
                style={{
                  margin: "0 0 15px",
                  color: "#64748b",
                  fontSize: "13px",
                  lineHeight: 1.7,
                }}
              >
                Discover more practical explanations
                and how-to articles.
              </p>

              <Link
                to="/blog"
                style={{
                  color: "#2563eb",
                  textDecoration: "none",
                  fontSize: "13px",
                  fontWeight: "900",
                }}
              >
                View Blog →
              </Link>
            </div>
          </aside>
        </div>

        {/* PREVIOUS / NEXT */}

        <nav
          style={{
            marginTop: "30px",
            display: "grid",
            gridTemplateColumns:
              "repeat(2, minmax(0, 1fr))",
            gap: "18px",
          }}
        >
          {previousPost ? (
            <Link
              to={`/blog/${previousPost.slug}`}
              style={{
                background: "#ffffff",
                border:
                  "1px solid #dfe7f1",
                borderRadius: "16px",
                padding: "20px",
                textDecoration: "none",
              }}
            >
              <div
                style={{
                  color: "#94a3b8",
                  fontSize: "10px",
                  fontWeight: "900",
                  letterSpacing: "1px",
                  marginBottom: "6px",
                }}
              >
                ← PREVIOUS ARTICLE
              </div>

              <div
                style={{
                  color: "#0f172a",
                  fontSize: "15px",
                  fontWeight: "800",
                  lineHeight: 1.4,
                }}
              >
                {previousPost.title}
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextPost ? (
            <Link
              to={`/blog/${nextPost.slug}`}
              style={{
                background: "#ffffff",
                border:
                  "1px solid #dfe7f1",
                borderRadius: "16px",
                padding: "20px",
                textDecoration: "none",
                textAlign: "right",
              }}
            >
              <div
                style={{
                  color: "#94a3b8",
                  fontSize: "10px",
                  fontWeight: "900",
                  letterSpacing: "1px",
                  marginBottom: "6px",
                }}
              >
                NEXT ARTICLE →
              </div>

              <div
                style={{
                  color: "#0f172a",
                  fontSize: "15px",
                  fontWeight: "800",
                  lineHeight: 1.4,
                }}
              >
                {nextPost.title}
              </div>
            </Link>
          ) : (
            <div />
          )}
        </nav>

        {/* BACK TO BLOG */}

        <div
          style={{
            marginTop: "30px",
            textAlign: "center",
          }}
        >
          <Link
            to="/blog"
            style={{
              color: "#2563eb",
              textDecoration: "none",
              fontSize: "13px",
              fontWeight: "900",
            }}
          >
            ← Back to CALVORO Blog
          </Link>
        </div>
      </main>
    </div>
  );
}

