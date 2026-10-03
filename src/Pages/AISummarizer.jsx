
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
          padding: "45px 24px",
        }}
      >
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

        {summary && (
          <section
            style={{
              background: "white",
              border: "1px solid #bbf7d0",
              borderRadius: "20px",
              padding: "30px",
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
        © 2026 CALVORO. All rights reserved.
      </footer>
    </div>
  );
}

