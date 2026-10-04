import { useState } from "react";
import { Link } from "react-router-dom";

export default function AIGrammarChecker() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const checkGrammar = async () => {
    if (!text.trim()) {
      setMessage("Please enter some text first.");
      return;
    }

    setLoading(true);
    setResult("");
    setMessage("");

    try {
      const response = await fetch("/api/grammar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
        }),
      });

      const rawText = await response.text();

      console.log("Grammar HTTP status:", response.status);
      console.log("Grammar raw response:", rawText);

      if (!rawText.trim()) {
        throw new Error(
          `The AI server returned an empty response (HTTP ${response.status}).`
        );
      }

      let data;

      try {
        data = JSON.parse(rawText);
      } catch {
        throw new Error(
          `The AI server returned a non-JSON response: ${rawText.slice(
            0,
            200
          )}`
        );
      }

      if (!response.ok) {
        throw new Error(
          data.error || `AI server error (HTTP ${response.status}).`
        );
      }

      if (!data.result) {
        throw new Error("The AI server returned no grammar result.");
      }

      setResult(data.result);
    } catch (error) {
      console.error("Grammar error:", error);

      setMessage(
        error.message ||
          "Something went wrong while checking grammar."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyResult = async () => {
    if (!result) {
      return;
    }

    try {
      await navigator.clipboard.writeText(result);
      setMessage("✓ Corrected text copied.");
    } catch {
      setMessage("Unable to copy the text.");
    }
  };

  const clearAll = () => {
    setText("");
    setResult("");
    setMessage("");
  };

  const sampleText =
    "I am writing this message for my customers and I want it to be more clear and professional.";

  const useSample = () => {
    setText(sampleText);
    setResult("");
    setMessage("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%)",
        fontFamily: "Arial, sans-serif",
        color: "#0f172a",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          background:
            "linear-gradient(135deg, #2563eb, #1d4ed8)",
          color: "white",
          padding: "18px 24px",
          boxShadow:
            "0 4px 20px rgba(37, 99, 235, 0.18)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "24px",
              fontWeight: "900",
              letterSpacing: "1px",
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
          padding: "40px 20px 70px",
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
            boxShadow:
              "0 12px 30px rgba(37, 99, 235, 0.16)",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "rgba(255,255,255,0.14)",
              padding: "8px 14px",
              borderRadius: "999px",
              fontWeight: "700",
              marginBottom: "15px",
            }}
          >
            ✨ CALVORO AI Tool
          </div>

          <h1
            style={{
              margin: "0 0 14px",
              fontSize: "clamp(32px, 5vw, 52px)",
              lineHeight: "1.1",
            }}
          >
            AI Grammar Checker
          </h1>

          <p
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              fontSize: "18px",
              lineHeight: "1.7",
              opacity: 0.95,
            }}
          >
            Check grammar, spelling, punctuation and sentence
            clarity with the free CALVORO AI Grammar Checker.
          </p>
        </section>

        {/* TOOL */}
        <section
          style={{
            background: "white",
            border: "1px solid #dbe5f1",
            borderRadius: "22px",
            padding: "30px",
            boxShadow:
              "0 8px 24px rgba(15, 23, 42, 0.06)",
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
              marginBottom: "14px",
            }}
          >
            <div>
              <h2
                style={{
                  margin: "0 0 6px",
                  fontSize: "28px",
                }}
              >
                Check your text
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                }}
              >
                Paste your writing below and let AI review it.
              </p>
            </div>

            <button
              type="button"
              onClick={useSample}
              style={{
                border: "1px solid #bfdbfe",
                background: "#eff6ff",
                color: "#1d4ed8",
                padding: "10px 15px",
                borderRadius: "10px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Use Sample
            </button>
          </div>

          <textarea
            value={text}
            onChange={(event) => {
              setText(event.target.value);
              setMessage("");
            }}
            placeholder="Enter or paste your text here..."
            rows={11}
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "16px",
              borderRadius: "14px",
              border: "1px solid #cbd5e1",
              resize: "vertical",
              fontSize: "16px",
              lineHeight: "1.7",
              outline: "none",
              color: "#0f172a",
              background: "#ffffff",
            }}
          />

          <div
            style={{
              marginTop: "8px",
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            {text.length} characters
          </div>

          {message && (
            <div
              style={{
                marginTop: "16px",
                background: "#eff6ff",
                color: "#1e40af",
                border: "1px solid #bfdbfe",
                padding: "13px 15px",
                borderRadius: "12px",
                fontWeight: "700",
              }}
            >
              {message}
            </div>
          )}

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
              onClick={checkGrammar}
              disabled={loading}
              style={{
                border: "none",
                background: loading
                  ? "#93c5fd"
                  : "#2563eb",
                color: "white",
                padding: "14px 22px",
                borderRadius: "11px",
                fontWeight: "800",
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
                fontSize: "16px",
              }}
            >
              {loading
                ? "Checking Grammar..."
                : "Check Grammar with AI"}
            </button>

            <button
              type="button"
              onClick={clearAll}
              style={{
                border: "1px solid #cbd5e1",
                background: "white",
                color: "#334155",
                padding: "14px 22px",
                borderRadius: "11px",
                fontWeight: "700",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Clear
            </button>
          </div>
        </section>

        {/* RESULT */}
        {result && (
          <section
            style={{
              background: "white",
              border: "1px solid #bbf7d0",
              borderRadius: "22px",
              padding: "30px",
              marginBottom: "30px",
              boxShadow:
                "0 8px 24px rgba(15, 23, 42, 0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "15px",
                flexWrap: "wrap",
                marginBottom: "18px",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: "0 0 6px",
                    fontSize: "28px",
                  }}
                >
                  Grammar Result
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                  }}
                >
                  Review the improved version below.
                </p>
              </div>

              <button
                type="button"
                onClick={copyResult}
                style={{
                  border: "none",
                  background: "#16a34a",
                  color: "white",
                  padding: "11px 16px",
                  borderRadius: "10px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Copy Result
              </button>
            </div>

            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "16px",
                padding: "22px",
                whiteSpace: "pre-wrap",
                lineHeight: "1.8",
                fontSize: "16px",
              }}
            >
              {result}
            </div>
          </section>
        )}

        {/* GUIDE */}
        <section
          style={{
            background: "white",
            border: "1px solid #dbe5f1",
            borderRadius: "22px",
            padding: "35px",
            boxShadow:
              "0 8px 24px rgba(15, 23, 42, 0.04)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "35px" }}>
            <div
              style={{
                display: "inline-block",
                background: "#eff6ff",
                color: "#2563eb",
                padding: "8px 14px",
                borderRadius: "999px",
                fontWeight: "800",
                marginBottom: "12px",
              }}
            >
              CALVORO Guide
            </div>

            <h2
              style={{
                margin: 0,
                fontSize: "34px",
              }}
            >
              How the AI Grammar Checker Works
            </h2>

            <p
              style={{
                maxWidth: "750px",
                margin: "12px auto 0",
                color: "#64748b",
                fontSize: "17px",
                lineHeight: "1.7",
              }}
            >
              Learn how to use an AI grammar checker and improve
              everyday writing with clearer, more accurate text.
            </p>
          </div>

          {/* WHAT IS IT */}
          <article style={{ marginBottom: "35px" }}>
            <h3 style={{ fontSize: "25px", marginBottom: "10px" }}>
              What is an AI Grammar Checker?
            </h3>

            <p
              style={{
                color: "#475569",
                lineHeight: "1.8",
                margin: 0,
              }}
            >
              An AI Grammar Checker is a writing tool that reviews
              text and identifies common language problems. These
              can include grammar mistakes, spelling issues,
              punctuation problems, awkward sentences and unclear
              wording. CALVORO uses AI to analyze the text you
              provide and return a corrected or improved version.
            </p>
          </article>

          {/* HOW TO USE */}
          <article style={{ marginBottom: "35px" }}>
            <h3 style={{ fontSize: "25px", marginBottom: "10px" }}>
              How to use the CALVORO AI Grammar Checker
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "16px",
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
                <strong>1. Enter your text</strong>
                <p
                  style={{
                    color: "#64748b",
                    lineHeight: "1.7",
                    marginBottom: 0,
                  }}
                >
                  Type or paste your sentence, paragraph,
                  email or other writing into the text box.
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
                <strong>2. Check grammar</strong>
                <p
                  style={{
                    color: "#64748b",
                    lineHeight: "1.7",
                    marginBottom: 0,
                  }}
                >
                  Select Check Grammar with AI to send the text
                  for analysis.
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
                <strong>3. Review the result</strong>
                <p
                  style={{
                    color: "#64748b",
                    lineHeight: "1.7",
                    marginBottom: 0,
                  }}
                >
                  Read the returned text and compare it with
                  your original writing.
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
                <strong>4. Copy your text</strong>
                <p
                  style={{
                    color: "#64748b",
                    lineHeight: "1.7",
                    marginBottom: 0,
                  }}
                >
                  Use Copy Result to quickly move the corrected
                  text into another application.
                </p>
              </div>
            </div>
          </article>

          {/* WHAT IT CAN HELP WITH */}
          <article style={{ marginBottom: "35px" }}>
            <h3 style={{ fontSize: "25px", marginBottom: "10px" }}>
              What can a grammar checker help with?
            </h3>

            <p
              style={{
                color: "#475569",
                lineHeight: "1.8",
              }}
            >
              A grammar checker can be useful when you want to
              improve the basic quality of your writing before
              sending, publishing or submitting it.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
                gap: "14px",
                marginTop: "18px",
              }}
            >
              {[
                "Grammar mistakes",
                "Spelling mistakes",
                "Punctuation",
                "Sentence clarity",
                "Professional writing",
                "Email wording",
                "School assignments",
                "Business communication",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    padding: "15px",
                    borderRadius: "12px",
                    background: "#eff6ff",
                    color: "#1e40af",
                    fontWeight: "700",
                  }}
                >
                  ✓ {item}
                </div>
              ))}
            </div>
          </article>

          {/* USE CASES */}
          <article style={{ marginBottom: "35px" }}>
            <h3 style={{ fontSize: "25px", marginBottom: "10px" }}>
              Common uses
            </h3>

            <p
              style={{
                color: "#475569",
                lineHeight: "1.8",
              }}
            >
              AI grammar tools can support many everyday writing
              tasks. People may use them when preparing customer
              messages, emails, notes, documents, applications,
              educational writing or website content.
            </p>
          </article>

          {/* TIPS */}
          <article style={{ marginBottom: "35px" }}>
            <h3 style={{ fontSize: "25px", marginBottom: "10px" }}>
              Tips for better grammar results
            </h3>

            <div
              style={{
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "16px",
                padding: "22px",
              }}
            >
              <p
                style={{
                  marginTop: 0,
                  color: "#475569",
                  lineHeight: "1.8",
                }}
              >
                Give the tool enough context to understand what
                you are trying to say. Check names, numbers,
                technical terms and important facts yourself after
                receiving an AI-generated result.
              </p>

              <p
                style={{
                  marginBottom: 0,
                  color: "#475569",
                  lineHeight: "1.8",
                }}
              >
                For important professional, legal, academic or
                business writing, treat AI suggestions as an
                editing aid and make the final decision yourself.
              </p>
            </div>
          </article>

          {/* FAQ */}
          <article style={{ marginBottom: "35px" }}>
            <h3 style={{ fontSize: "25px", marginBottom: "15px" }}>
              Frequently Asked Questions
            </h3>

            <div
              style={{
                display: "grid",
                gap: "14px",
              }}
            >
              <div
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "14px",
                  padding: "18px",
                }}
              >
                <h4 style={{ margin: "0 0 8px" }}>
                  Is the CALVORO AI Grammar Checker free?
                </h4>

                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                    lineHeight: "1.7",
                  }}
                >
                  The CALVORO page provides a free interface for
                  checking and improving your text with the
                  available AI service.
                </p>
              </div>

              <div
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "14px",
                  padding: "18px",
                }}
              >
                <h4 style={{ margin: "0 0 8px" }}>
                  Can it fix spelling mistakes?
                </h4>

                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                    lineHeight: "1.7",
                  }}
                >
                  It can identify and improve many spelling and
                  grammar issues, although you should still review
                  the final result.
                </p>
              </div>

              <div
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "14px",
                  padding: "18px",
                }}
              >
                <h4 style={{ margin: "0 0 8px" }}>
                  Can I use it for emails?
                </h4>

                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                    lineHeight: "1.7",
                  }}
                >
                  Yes. It can be useful for improving emails,
                  customer messages and other everyday
                  communication.
                </p>
              </div>

              <div
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "14px",
                  padding: "18px",
                }}
              >
                <h4 style={{ margin: "0 0 8px" }}>
                  Should I review AI corrections?
                </h4>

                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                    lineHeight: "1.7",
                  }}
                >
                  Yes. AI can improve wording, but you should
                  confirm that the final text still expresses your
                  intended meaning.
                </p>
              </div>
            </div>
          </article>

          {/* RELATED TOOLS */}
          <article>
            <h3 style={{ fontSize: "25px", marginBottom: "12px" }}>
              Related CALVORO AI Tools
            </h3>

            <p
              style={{
                color: "#64748b",
                lineHeight: "1.7",
              }}
            >
              Explore other CALVORO tools for writing, translation
              and text improvement.
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(190px, 1fr))",
                gap: "12px",
                marginTop: "18px",
              }}
            >
              <Link
                to="/ai-summarizer"
                style={{
                  textDecoration: "none",
                  background: "#eff6ff",
                  color: "#1d4ed8",
                  padding: "15px",
                  borderRadius: "12px",
                  fontWeight: "700",
                }}
              >
                AI Summarizer →
              </Link>

              <Link
                to="/ai-rewriter"
                style={{
                  textDecoration: "none",
                  background: "#eff6ff",
                  color: "#1d4ed8",
                  padding: "15px",
                  borderRadius: "12px",
                  fontWeight: "700",
                }}
              >
                AI Rewriter →
              </Link>

              <Link
                to="/ai-translator"
                style={{
                  textDecoration: "none",
                  background: "#eff6ff",
                  color: "#1d4ed8",
                  padding: "15px",
                  borderRadius: "12px",
                  fontWeight: "700",
                }}
              >
                AI Translator →
              </Link>

              <Link
                to="/ai-text-generator"
                style={{
                  textDecoration: "none",
                  background: "#eff6ff",
                  color: "#1d4ed8",
                  padding: "15px",
                  borderRadius: "12px",
                  fontWeight: "700",
                }}
              >
                AI Text Generator →
              </Link>

              <Link
                to="/ai-email-writer"
                style={{
                  textDecoration: "none",
                  background: "#eff6ff",
                  color: "#1d4ed8",
                  padding: "15px",
                  borderRadius: "12px",
                  fontWeight: "700",
                }}
              >
                AI Email Writer →
              </Link>

              <Link
                to="/tools"
                style={{
                  textDecoration: "none",
                  background: "#f8fafc",
                  color: "#334155",
                  padding: "15px",
                  borderRadius: "12px",
                  fontWeight: "700",
                  border: "1px solid #e2e8f0",
                }}
              >
                All CALVORO Tools →
              </Link>
            </div>
          </article>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          background: "#0f172a",
          color: "#cbd5e1",
          padding: "28px 20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          <strong
            style={{
              color: "white",
              fontSize: "20px",
            }}
          >
            CALVORO
          </strong>

          <p
            style={{
              margin: "8px 0 0",
              lineHeight: "1.6",
            }}
          >
            Free online calculators and useful AI tools.
          </p>
        </div>
      </footer>
    </div>
  );
}