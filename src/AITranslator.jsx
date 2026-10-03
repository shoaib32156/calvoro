
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AITranslator() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("Spanish");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const translateText = async () => {
    if (!text.trim()) {
      setMessage("Please enter some text first.");
      return;
    }

    setLoading(true);
    setResult("");
    setMessage("");

    try {
      const response = await fetch("/api/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          language,
        }),
      });

      const rawText = await response.text();

      console.log("Translation HTTP status:", response.status);
      console.log("Translation raw response:", rawText);

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
        throw new Error("The AI server returned no translation.");
      }

      setResult(data.result);
    } catch (error) {
      console.error("Translation error:", error);

      setMessage(
        error.message ||
          "Something went wrong while translating the text."
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
      setMessage("✓ Translation copied.");
    } catch {
      setMessage("Unable to copy the translation.");
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
            AI Text Translator
          </h1>

          <p
            style={{
              maxWidth: "720px",
              margin: "0 auto",
              color: "#64748b",
              fontSize: "18px",
              lineHeight: "1.7",
            }}
          >
            Translate text into another language quickly
            with CALVORO AI.
          </p>
        </section>

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
            placeholder="Enter text you want to translate..."
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
                Translate To
              </label>

              <select
                value={language}
                onChange={(event) =>
                  setLanguage(event.target.value)
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
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
                <option>Italian</option>
                <option>Portuguese</option>
                <option>Arabic</option>
                <option>Urdu</option>
                <option>Hindi</option>
                <option>Chinese</option>
                <option>Japanese</option>
                <option>Korean</option>
                <option>Russian</option>
                <option>Turkish</option>
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
                onClick={translateText}
                disabled={loading}
                style={{
                  flex: "1",
                  border: "none",
                  background: loading
                    ? "#94a3b8"
                    : "#2563eb",
                  color: "white",
                  padding: "14px 20px",
                  borderRadius: "12px",
                  fontWeight: "800",
                  fontSize: "16px",
                  cursor: loading
                    ? "default"
                    : "pointer",
                }}
              >
                {loading
                  ? "✨ Translating..."
                  : "✨ Translate with AI"}
              </button>

              <button
                type="button"
                onClick={clearAll}
                style={{
                  border: "1px solid #cbd5e1",
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
                  ✨ Translation
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
            <div style={{ fontSize: "30px" }}>🌍</div>

            <h3>Multiple Languages</h3>

            <p
              style={{
                color: "#64748b",
                lineHeight: "1.6",
              }}
            >
              Translate text into a range of commonly used
              languages.
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

            <h3>Fast Results</h3>

            <p
              style={{
                color: "#64748b",
                lineHeight: "1.6",
              }}
            >
              Get AI-powered translations in seconds.
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
            <div style={{ fontSize: "30px" }}>📋</div>

            <h3>Easy Copy</h3>

            <p
              style={{
                color: "#64748b",
                lineHeight: "1.6",
              }}
            >
              Copy your translated text with one click.
            </p>
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
        © 2026 CALVORO. All rights reserved.
      </footer>
    </div>
  );
}

