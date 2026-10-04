import { useState } from "react";
import { Link } from "react-router-dom";

export default function AISummarizer() {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const summarizeText = async () => {
    setError("");
    setSummary("");

    if (text.trim().length < 20) {
      setError("Please enter at least 20 characters.");
      return;
    }

    setLoading(true);

    try {
      console.log("🚀 Sending request to CALVORO AI...");

      const response = await fetch("/api/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text.trim(),
          length: "medium",
        }),
      });

      console.log(
        "📡 CALVORO AI server status:",
        response.status
      );

      const data = await response.json();

      console.log(
        "🤖 CALVORO AI response:",
        data
      );

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "CALVORO AI server returned an error."
        );
      }

      if (!data.summary) {
        throw new Error(
          "The AI returned an empty summary."
        );
      }

      setSummary(data.summary);
    } catch (error) {
      console.error(
        "❌ CALVORO AI error:",
        error
      );

      setError(
        error?.message ||
          "Could not connect to CALVORO AI."
      );
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setText("");
    setSummary("");
    setError("");
  };

  const copySummary = async () => {
    if (!summary) return;

    try {
      await navigator.clipboard.writeText(summary);
      alert("Summary copied!");
    } catch {
      alert("Could not copy the summary.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          background: "#2563eb",
          color: "white",
          padding: "18px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "24px",
              fontWeight: "800",
            }}
          >
            CALVORO
          </Link>

          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "700",
            }}
          >
            ← Home
          </Link>
        </div>
      </header>

      <main
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "45px 24px 60px",
        }}
      >
        {/* HERO */}

        <section
          style={{
            background:
              "linear-gradient(135deg, #2563eb, #1d4ed8)",
            color: "white",
            borderRadius: "24px",
            padding: "45px 25px",
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              fontSize: "45px",
              marginBottom: "10px",
            }}
          >
            ✨
          </div>

          <h1
            style={{
              margin: "0 0 15px",
              fontSize: "clamp(32px, 5vw, 50px)",
            }}
          >
            AI Text Summarizer
          </h1>

          <p
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              fontSize: "18px",
              lineHeight: "1.7",
            }}
          >
            Turn long text into a clear summary using
            CALVORO AI.
          </p>
        </section>

        {/* TOOL */}

        <section
          style={{
            background: "white",
            border: "1px solid #e2e8f0",
            borderRadius: "20px",
            padding: "30px",
            marginBottom: "25px",
          }}
        >
          <h2>Enter your text</h2>

          <p
            style={{
              color: "#64748b",
              lineHeight: "1.7",
              marginTop: "8px",
            }}
          >
            Paste an article, notes, paragraph, report,
            or other text you want to summarize.
          </p>

          <textarea
            value={text}
            onChange={(event) =>
              setText(event.target.value)
            }
            placeholder="Paste your text here..."
            rows={12}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #cbd5e1",
              fontSize: "16px",
              lineHeight: "1.6",
              resize: "vertical",
              marginTop: "10px",
            }}
          />

          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginTop: "20px",
            }}
          >
            <button
              type="button"
              onClick={summarizeText}
              disabled={loading}
              style={{
                border: "none",
                background: loading
                  ? "#94a3b8"
                  : "#2563eb",
                color: "white",
                padding: "14px 24px",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: loading
                  ? "default"
                  : "pointer",
              }}
            >
              {loading
                ? "⏳ AI is working..."
                : "✨ Summarize with AI"}
            </button>

            <button
              type="button"
              onClick={clearAll}
              style={{
                border: "1px solid #cbd5e1",
                background: "white",
                color: "#334155",
                padding: "14px 24px",
                borderRadius: "10px",
                fontSize: "16px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Clear
            </button>
          </div>

          {error && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                borderRadius: "10px",
                background: "#fef2f2",
                border: "1px solid #fecaca",
                color: "#b91c1c",
                fontWeight: "700",
              }}
            >
              ❌ {error}
            </div>
          )}
        </section>

        {/* RESULT */}

        {summary && (
          <section
            style={{
              background: "white",
              border: "1px solid #bbf7d0",
              borderRadius: "20px",
              padding: "30px",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "15px",
                flexWrap: "wrap",
              }}
            >
              <h2 style={{ margin: 0 }}>
                ✨ AI Summary
              </h2>

              <button
                type="button"
                onClick={copySummary}
                style={{
                  border: "none",
                  background: "#16a34a",
                  color: "white",
                  padding: "10px 18px",
                  borderRadius: "9px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                📋 Copy Summary
              </button>
            </div>

            <div
              style={{
                marginTop: "20px",
                padding: "22px",
                background: "#f0fdf4",
                borderRadius: "14px",
                color: "#166534",
                fontSize: "17px",
                lineHeight: "1.8",
                whiteSpace: "pre-wrap",
              }}
            >
              {summary}
            </div>
          </section>
        )}

        {/* SEO CONTENT */}

        <section
          style={{
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: "20px",
            padding: "35px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              padding: "6px 10px",
              borderRadius: "999px",
              background: "#eff6ff",
              color: "#1d4ed8",
              fontSize: "12px",
              fontWeight: "800",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}
          >
            CALVORO Guide
          </div>

          <h2
            style={{
              margin: "0 0 16px",
              color: "#0f172a",
              fontSize: "30px",
              lineHeight: "1.25",
            }}
          >
            What is an AI text summarizer?
          </h2>

          <p
            style={{
              margin: "0 0 18px",
              color: "#475569",
              fontSize: "16px",
              lineHeight: "1.85",
            }}
          >
            An AI text summarizer helps turn longer written
            material into a shorter version that focuses on
            the main ideas. Instead of reading every sentence,
            you can use a summary to quickly understand the
            central points of an article, set of notes, report,
            or other text.
          </p>

          <p
            style={{
              margin: "0 0 22px",
              color: "#475569",
              fontSize: "16px",
              lineHeight: "1.85",
            }}
          >
            CALVORO's AI Text Summarizer is designed for quick
            everyday use. Paste your text into the tool,
            submit it, and review the generated summary.
            You can then copy the result for your own notes,
            planning, or review.
          </p>

          <h3
            style={{
              margin: "34px 0 12px",
              color: "#0f172a",
              fontSize: "23px",
            }}
          >
            How to use the CALVORO AI Summarizer
          </h3>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(210px, 1fr))",
              gap: "15px",
              marginTop: "18px",
            }}
          >
            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "14px",
                padding: "20px",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: "900",
                  color: "#2563eb",
                  marginBottom: "8px",
                }}
              >
                STEP 1
              </div>

              <h4
                style={{
                  margin: "0 0 8px",
                  color: "#0f172a",
                  fontSize: "18px",
                }}
              >
                Add your text
              </h4>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  lineHeight: "1.7",
                }}
              >
                Paste the article, notes, paragraph, or other
                text you want to summarize.
              </p>
            </div>

            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "14px",
                padding: "20px",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: "900",
                  color: "#2563eb",
                  marginBottom: "8px",
                }}
              >
                STEP 2
              </div>

              <h4
                style={{
                  margin: "0 0 8px",
                  color: "#0f172a",
                  fontSize: "18px",
                }}
              >
                Generate a summary
              </h4>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  lineHeight: "1.7",
                }}
              >
                Click the summarize button and wait while
                CALVORO AI processes your text.
              </p>
            </div>

            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "14px",
                padding: "20px",
              }}
            >
              <div
                style={{
                  fontSize: "13px",
                  fontWeight: "900",
                  color: "#2563eb",
                  marginBottom: "8px",
                }}
              >
                STEP 3
              </div>

              <h4
                style={{
                  margin: "0 0 8px",
                  color: "#0f172a",
                  fontSize: "18px",
                }}
              >
                Review and copy
              </h4>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  lineHeight: "1.7",
                }}
              >
                Read the summary and copy it when you are
                satisfied with the result.
              </p>
            </div>
          </div>

          <h3
            style={{
              margin: "34px 0 12px",
              color: "#0f172a",
              fontSize: "23px",
            }}
          >
            When is text summarization useful?
          </h3>

          <p
            style={{
              margin: "0 0 18px",
              color: "#475569",
              fontSize: "16px",
              lineHeight: "1.85",
            }}
          >
            Summarization can be useful when you need to
            understand long material quickly. Students may use
            summaries while reviewing notes, professionals may
            use them to scan reports, and everyday users may use
            them to identify the main ideas in articles or other
            documents.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "15px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "14px",
                padding: "20px",
                background: "#ffffff",
              }}
            >
              <strong
                style={{
                  display: "block",
                  color: "#0f172a",
                  fontSize: "17px",
                  marginBottom: "8px",
                }}
              >
                Study and revision
              </strong>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  lineHeight: "1.7",
                }}
              >
                Turn long notes or reading material into a
                shorter review version.
              </p>
            </div>

            <div
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "14px",
                padding: "20px",
                background: "#ffffff",
              }}
            >
              <strong
                style={{
                  display: "block",
                  color: "#0f172a",
                  fontSize: "17px",
                  marginBottom: "8px",
                }}
              >
                Work and reports
              </strong>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  lineHeight: "1.7",
                }}
              >
                Quickly identify the main points in longer
                workplace documents.
              </p>
            </div>

            <div
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "14px",
                padding: "20px",
                background: "#ffffff",
              }}
            >
              <strong
                style={{
                  display: "block",
                  color: "#0f172a",
                  fontSize: "17px",
                  marginBottom: "8px",
                }}
              >
                Reading and research
              </strong>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  lineHeight: "1.7",
                }}
              >
                Get a concise overview before deciding whether
                to read the full source.
              </p>
            </div>
          </div>

          <h3
            style={{
              margin: "34px 0 12px",
              color: "#0f172a",
              fontSize: "23px",
            }}
          >
            Tips for better summaries
          </h3>

          <p
            style={{
              margin: "0 0 10px",
              color: "#475569",
              fontSize: "16px",
              lineHeight: "1.85",
            }}
          >
            Use complete and relevant source text when possible.
            Remove unrelated material if it is not part of what
            you want summarized.
          </p>

          <p
            style={{
              margin: "0 0 10px",
              color: "#475569",
              fontSize: "16px",
              lineHeight: "1.85",
            }}
          >
            For important information, compare the generated
            summary with the original text. AI-generated summaries
            can miss context, details, or nuances.
          </p>

          <p
            style={{
              margin: "0",
              color: "#475569",
              fontSize: "16px",
              lineHeight: "1.85",
            }}
          >
            Avoid entering confidential, private, or sensitive
            information unless you are comfortable sharing that
            information with the service being used.
          </p>

          <h3
            style={{
              margin: "34px 0 12px",
              color: "#0f172a",
              fontSize: "23px",
            }}
          >
            Frequently asked questions
          </h3>

          <div
            style={{
              display: "grid",
              gap: "12px",
            }}
          >
            <details
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "15px 16px",
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  fontWeight: "800",
                  color: "#0f172a",
                }}
              >
                What does the AI Summarizer do?
              </summary>

              <p
                style={{
                  color: "#64748b",
                  lineHeight: "1.7",
                  margin: "10px 0 0",
                }}
              >
                It processes the text you provide and creates
                a shorter version focused on the main information.
              </p>
            </details>

            <details
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "15px 16px",
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  fontWeight: "800",
                  color: "#0f172a",
                }}
              >
                Can I summarize an article or report?
              </summary>

              <p
                style={{
                  color: "#64748b",
                  lineHeight: "1.7",
                  margin: "10px 0 0",
                }}
              >
                Yes. You can paste article text, reports,
                notes, paragraphs, and other written material.
              </p>
            </details>

            <details
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "15px 16px",
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  fontWeight: "800",
                  color: "#0f172a",
                }}
              >
                Is an AI summary always accurate?
              </summary>

              <p
                style={{
                  color: "#64748b",
                  lineHeight: "1.7",
                  margin: "10px 0 0",
                }}
              >
                No. AI-generated summaries can occasionally omit
                context or details, so important information should
                be checked against the original text.
              </p>
            </details>

            <details
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "12px",
                padding: "15px 16px",
              }}
            >
              <summary
                style={{
                  cursor: "pointer",
                  fontWeight: "800",
                  color: "#0f172a",
                }}
              >
                Can I copy the generated summary?
              </summary>

              <p
                style={{
                  color: "#64748b",
                  lineHeight: "1.7",
                  margin: "10px 0 0",
                }}
              >
                Yes. When a summary is generated, use the
                Copy Summary button to copy it to your clipboard.
              </p>
            </details>
          </div>

          <div
            style={{
              marginTop: "34px",
              paddingTop: "25px",
              borderTop: "1px solid #e2e8f0",
            }}
          >
            <h3
              style={{
                margin: "0 0 12px",
                color: "#0f172a",
                fontSize: "23px",
              }}
            >
              Explore more CALVORO AI tools
            </h3>

            <p
              style={{
                margin: "0 0 18px",
                color: "#64748b",
                lineHeight: "1.8",
              }}
            >
              CALVORO also provides tools for rewriting text,
              checking grammar, translating text, generating content,
              and writing emails.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <Link
                to="/ai-rewriter"
                style={{
                  padding: "10px 14px",
                  borderRadius: "9px",
                  background: "#eff6ff",
                  color: "#1d4ed8",
                  textDecoration: "none",
                  fontWeight: "800",
                  fontSize: "14px",
                }}
              >
                AI Rewriter
              </Link>

              <Link
                to="/ai-grammar-checker"
                style={{
                  padding: "10px 14px",
                  borderRadius: "9px",
                  background: "#eff6ff",
                  color: "#1d4ed8",
                  textDecoration: "none",
                  fontWeight: "800",
                  fontSize: "14px",
                }}
              >
                Grammar Checker
              </Link>

              <Link
                to="/ai-translator"
                style={{
                  padding: "10px 14px",
                  borderRadius: "9px",
                  background: "#eff6ff",
                  color: "#1d4ed8",
                  textDecoration: "none",
                  fontWeight: "800",
                  fontSize: "14px",
                }}
              >
                AI Translator
              </Link>

              <Link
                to="/ai-text-generator"
                style={{
                  padding: "10px 14px",
                  borderRadius: "9px",
                  background: "#eff6ff",
                  color: "#1d4ed8",
                  textDecoration: "none",
                  fontWeight: "800",
                  fontSize: "14px",
                }}
              >
                Text Generator
              </Link>

              <Link
                to="/ai-email-writer"
                style={{
                  padding: "10px 14px",
                  borderRadius: "9px",
                  background: "#eff6ff",
                  color: "#1d4ed8",
                  textDecoration: "none",
                  fontWeight: "800",
                  fontSize: "14px",
                }}
              >
                Email Writer
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer
        style={{
          marginTop: "40px",
          background: "#0f172a",
          color: "#cbd5e1",
          padding: "25px",
          textAlign: "center",
        }}
      >
        © {new Date().getFullYear()} CALVORO. All rights reserved.
      </footer>
    </div>
  );
}