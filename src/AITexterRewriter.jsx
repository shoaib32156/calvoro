import { useState } from "react";
import { Link } from "react-router-dom";

export default function AITextRewriter() {
  const [text, setText] = useState("");
  const [tone, setTone] = useState("Professional");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const rewriteText = async () => {
    if (!text.trim()) {
      setMessage("Please enter some text first.");
      return;
    }

    setLoading(true);
    setResult("");
    setMessage("");

    try {
      const response = await fetch("/api/rewrite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          tone,
        }),
      });

      const rawText = await response.text();

      console.log("Rewrite HTTP status:", response.status);
      console.log("Rewrite raw response:", rawText);

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
        throw new Error("The AI server returned no rewritten text.");
      }

      setResult(data.result);
    } catch (error) {
      console.error("Rewrite error:", error);
      setMessage(
        error.message || "Something went wrong while rewriting the text."
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
      setMessage("✓ Rewritten text copied.");
    } catch {
      setMessage("Unable to copy the text.");
    }
  };

  const clearAll = () => {
    setText("");
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
          padding: "50px 20px 70px",
        }}
      >
        {/* HERO */}

        <section
          style={{
            textAlign: "center",
            marginBottom: "35px",
          }}
        >
          <div
            style={{
              display: "inline-block",
              background: "#dbeafe",
              color: "#1d4ed8",
              padding: "8px 15px",
              borderRadius: "999px",
              fontWeight: "800",
              fontSize: "14px",
              marginBottom: "15px",
            }}
          >
            ✨ CALVORO AI
          </div>

          <h1
            style={{
              fontSize: "clamp(32px, 5vw, 52px)",
              margin: "0 0 15px",
              fontWeight: "900",
            }}
          >
            AI Text Rewriter
          </h1>

          <p
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              color: "#64748b",
              fontSize: "18px",
              lineHeight: "1.7",
            }}
          >
            Rewrite your text with AI and make it clearer,
            smoother and easier to read.
          </p>
        </section>

        {/* TOOL */}

        <section
          style={{
            background: "white",
            border: "1px solid #dbe4f0",
            borderRadius: "24px",
            padding: "30px",
            boxShadow:
              "0 15px 40px rgba(15, 23, 42, 0.07)",
          }}
        >
          <label
            style={{
              display: "block",
              fontWeight: "800",
              marginBottom: "10px",
              fontSize: "16px",
            }}
          >
            Your Text
          </label>

          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Enter the text you want CALVORO AI to rewrite..."
            rows="10"
            style={{
              width: "100%",
              boxSizing: "border-box",
              resize: "vertical",
              padding: "16px",
              borderRadius: "14px",
              border: "1px solid #cbd5e1",
              outline: "none",
              fontSize: "16px",
              lineHeight: "1.6",
              fontFamily: "Arial, sans-serif",
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "18px",
              marginTop: "22px",
            }}
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: "800",
                  marginBottom: "8px",
                }}
              >
                Writing Tone
              </label>

              <select
                value={tone}
                onChange={(event) =>
                  setTone(event.target.value)
                }
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "12px",
                  border: "1px solid #cbd5e1",
                  background: "white",
                  fontSize: "16px",
                }}
              >
                <option>Professional</option>
                <option>Friendly</option>
                <option>Simple</option>
                <option>Formal</option>
                <option>Casual</option>
                <option>Concise</option>
              </select>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "end",
                gap: "10px",
              }}
            >
              <button
                type="button"
                onClick={rewriteText}
                disabled={loading}
                style={{
                  flex: "1",
                  border: "none",
                  background:
                    loading
                      ? "#94a3b8"
                      : "#2563eb",
                  color: "white",
                  padding: "14px 20px",
                  borderRadius: "12px",
                  fontWeight: "800",
                  fontSize: "16px",
                  cursor:
                    loading
                      ? "default"
                      : "pointer",
                }}
              >
                {loading
                  ? "✨ Rewriting..."
                  : "✨ Rewrite with AI"}
              </button>

              <button
                type="button"
                onClick={clearAll}
                style={{
                  border:
                    "1px solid #cbd5e1",
                  background: "white",
                  color: "#334155",
                  padding: "14px 18px",
                  borderRadius: "12px",
                  fontWeight: "700",
                  cursor: "pointer",
                }}
              >
                Clear
              </button>
            </div>
          </div>

          {message && (
            <div
              style={{
                marginTop: "20px",
                padding: "13px 15px",
                borderRadius: "12px",
                background: "#eff6ff",
                color: "#1e40af",
                fontWeight: "700",
                lineHeight: "1.6",
              }}
            >
              {message}
            </div>
          )}

          {result && (
            <div
              style={{
                marginTop: "30px",
                padding: "24px",
                borderRadius: "18px",
                background: "#f8fafc",
                border: "1px solid #dbe4f0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "15px",
                  marginBottom: "15px",
                  flexWrap: "wrap",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    fontSize: "22px",
                  }}
                >
                  ✨ Rewritten Text
                </h2>

                <button
                  type="button"
                  onClick={copyResult}
                  style={{
                    border: "none",
                    background: "#0f172a",
                    color: "white",
                    padding: "10px 16px",
                    borderRadius: "10px",
                    fontWeight: "700",
                    cursor: "pointer",
                  }}
                >
                  📋 Copy
                </button>
              </div>

              <div
                style={{
                  background: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "14px",
                  padding: "20px",
                  fontSize: "16px",
                  lineHeight: "1.8",
                  whiteSpace: "pre-wrap",
                }}
              >
                {result}
              </div>
            </div>
          )}
        </section>

        {/* QUICK FEATURES */}

        <section
          style={{
            marginTop: "30px",
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "18px",
          }}
        >
          <div
            style={{
              background: "white",
              border: "1px solid #dbe4f0",
              borderRadius: "18px",
              padding: "22px",
            }}
          >
            <div style={{ fontSize: "30px" }}>✍️</div>

            <h3>
              Improve Writing
            </h3>

            <p
              style={{
                color: "#64748b",
                lineHeight: "1.6",
                marginBottom: 0,
              }}
            >
              Make sentences clearer,
              smoother, and easier to read.
            </p>
          </div>

          <div
            style={{
              background: "white",
              border: "1px solid #dbe4f0",
              borderRadius: "18px",
              padding: "22px",
            }}
          >
            <div style={{ fontSize: "30px" }}>🎯</div>

            <h3>
              Choose Your Tone
            </h3>

            <p
              style={{
                color: "#64748b",
                lineHeight: "1.6",
                marginBottom: 0,
              }}
            >
              Select a writing style
              that matches your purpose.
            </p>
          </div>

          <div
            style={{
              background: "white",
              border: "1px solid #dbe4f0",
              borderRadius: "18px",
              padding: "22px",
            }}
          >
            <div style={{ fontSize: "30px" }}>⚡</div>

            <h3>
              Fast AI Results
            </h3>

            <p
              style={{
                color: "#64748b",
                lineHeight: "1.6",
                marginBottom: 0,
              }}
            >
              Rewrite your content
              quickly from one simple tool.
            </p>
          </div>
        </section>

        {/* SEO GUIDE */}

        <section
          style={{
            marginTop: "30px",
            background: "#ffffff",
            border: "1px solid #dbe4f0",
            borderRadius: "22px",
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
            What is an AI text rewriter?
          </h2>

          <p
            style={{
              margin: "0 0 18px",
              color: "#475569",
              fontSize: "16px",
              lineHeight: "1.85",
            }}
          >
            An AI text rewriter takes text that you provide
            and creates a new version while keeping the
            original idea and meaning. It can help improve
            sentence structure, readability, flow, and tone.
          </p>

          <p
            style={{
              margin: "0 0 18px",
              color: "#475569",
              fontSize: "16px",
              lineHeight: "1.85",
            }}
          >
            CALVORO's AI Text Rewriter lets you choose a
            writing tone before generating the rewritten
            version. This can be useful when the same idea
            needs to be presented differently for work,
            school, casual communication, or other situations.
          </p>

          <h3
            style={{
              margin: "34px 0 12px",
              color: "#0f172a",
              fontSize: "23px",
            }}
          >
            How to use the CALVORO AI Text Rewriter
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
                  color: "#2563eb",
                  fontSize: "13px",
                  fontWeight: "900",
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
                Enter your text
              </h4>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  lineHeight: "1.7",
                }}
              >
                Paste the sentence, paragraph,
                message, or other text you want
                to improve.
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
                  color: "#2563eb",
                  fontSize: "13px",
                  fontWeight: "900",
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
                Choose a tone
              </h4>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  lineHeight: "1.7",
                }}
              >
                Select Professional, Friendly,
                Simple, Formal, Casual, or Concise.
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
                  color: "#2563eb",
                  fontSize: "13px",
                  fontWeight: "900",
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
                Generate and review
              </h4>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  lineHeight: "1.7",
                }}
              >
                Generate the rewritten version
                and review the result before using it.
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
            Why rewrite text?
          </h3>

          <p
            style={{
              margin: "0 0 18px",
              color: "#475569",
              fontSize: "16px",
              lineHeight: "1.85",
            }}
          >
            Rewriting can be useful when your original wording
            is correct but does not communicate your idea in the
            clearest way. A revised version can make a message
            easier to understand, adjust the tone for a different
            audience, or improve the flow of a paragraph.
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
                Professional communication
              </strong>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  lineHeight: "1.7",
                }}
              >
                Turn informal wording into a more
                polished workplace message.
              </p>
            </div>

            <div
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "14px",
                padding: "20px",
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
                Clearer explanations
              </strong>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  lineHeight: "1.7",
                }}
              >
                Make complicated or awkward sentences
                easier for readers to follow.
              </p>
            </div>

            <div
              style={{
                border: "1px solid #e2e8f0",
                borderRadius: "14px",
                padding: "20px",
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
                Different audiences
              </strong>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  lineHeight: "1.7",
                }}
              >
                Adjust wording so the same idea fits
                a formal, friendly, or casual audience.
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
            Choosing the right writing tone
          </h3>

          <p
            style={{
              margin: "0 0 10px",
              color: "#475569",
              fontSize: "16px",
              lineHeight: "1.85",
            }}
          >
            <strong>Professional:</strong> Useful for workplace
            communication, business messages, and general formal writing.
          </p>

          <p
            style={{
              margin: "0 0 10px",
              color: "#475569",
              fontSize: "16px",
              lineHeight: "1.85",
            }}
          >
            <strong>Friendly:</strong> Helpful when you want wording
            that feels warm and approachable.
          </p>

          <p
            style={{
              margin: "0 0 10px",
              color: "#475569",
              fontSize: "16px",
              lineHeight: "1.85",
            }}
          >
            <strong>Simple:</strong> Useful when the goal is clear,
            straightforward language.
          </p>

          <p
            style={{
              margin: "0 0 10px",
              color: "#475569",
              fontSize: "16px",
              lineHeight: "1.85",
            }}
          >
            <strong>Formal:</strong> Appropriate when you want
            a more traditional or official writing style.
          </p>

          <p
            style={{
              margin: "0 0 10px",
              color: "#475569",
              fontSize: "16px",
              lineHeight: "1.85",
            }}
          >
            <strong>Casual:</strong> Useful for relaxed messages
            and everyday communication.
          </p>

          <p
            style={{
              margin: 0,
              color: "#475569",
              fontSize: "16px",
              lineHeight: "1.85",
            }}
          >
            <strong>Concise:</strong> Designed to remove unnecessary
            wording and keep the message direct.
          </p>

          <h3
            style={{
              margin: "34px 0 12px",
              color: "#0f172a",
              fontSize: "23px",
            }}
          >
            Tips for getting better rewritten text
          </h3>

          <p
            style={{
              margin: "0 0 10px",
              color: "#475569",
              fontSize: "16px",
              lineHeight: "1.85",
            }}
          >
            Start with text that clearly communicates your
            original idea. The more understandable the source
            text is, the easier it is to review the rewritten result.
          </p>

          <p
            style={{
              margin: "0 0 10px",
              color: "#475569",
              fontSize: "16px",
              lineHeight: "1.85",
            }}
          >
            Choose the tone based on who will read the final
            version and what you want the message to accomplish.
          </p>

          <p
            style={{
              margin: 0,
              color: "#475569",
              fontSize: "16px",
              lineHeight: "1.85",
            }}
          >
            Always review AI-generated writing yourself. A rewrite
            can change emphasis or wording, so make sure the final
            version still communicates your intended meaning.
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
                What does an AI text rewriter do?
              </summary>

              <p
                style={{
                  color: "#64748b",
                  lineHeight: "1.7",
                  margin: "10px 0 0",
                }}
              >
                It creates a new version of the text you provide
                while aiming to preserve the original meaning.
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
                Can I change the tone of my text?
              </summary>

              <p
                style={{
                  color: "#64748b",
                  lineHeight: "1.7",
                  margin: "10px 0 0",
                }}
              >
                Yes. CALVORO provides Professional, Friendly,
                Simple, Formal, Casual, and Concise tone options.
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
                Does rewriting change the original meaning?
              </summary>

              <p
                style={{
                  color: "#64748b",
                  lineHeight: "1.7",
                  margin: "10px 0 0",
                }}
              >
                The tool is designed to preserve the original
                meaning, but AI-generated wording should always
                be reviewed before important use.
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
                Can I copy the rewritten text?
              </summary>

              <p
                style={{
                  color: "#64748b",
                  lineHeight: "1.7",
                  margin: "10px 0 0",
                }}
              >
                Yes. Use the Copy button shown with the generated
                result to copy the rewritten text.
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
                Should I review AI-rewritten content?
              </summary>

              <p
                style={{
                  color: "#64748b",
                  lineHeight: "1.7",
                  margin: "10px 0 0",
                }}
              >
                Yes. Review the output for accuracy, context,
                tone, and whether it still expresses your intended idea.
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
              CALVORO also provides tools for summarizing text,
              checking grammar, translating content, generating
              text, and writing emails.
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <Link
                to="/ai-summarizer"
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
                AI Summarizer
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