
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AITextGenerator() {
  const [topic, setTopic] = useState("");
  const [type, setType] = useState("Short Article");
  const [tone, setTone] = useState("Professional");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const generateText = async () => {
    if (!topic.trim()) {
      setMessage("Please enter a topic first.");
      return;
    }

    setLoading(true);
    setResult("");
    setMessage("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          type,
          tone,
        }),
      });

      const rawText = await response.text();

      console.log("Generator HTTP status:", response.status);
      console.log("Generator raw response:", rawText);

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
        throw new Error("The AI server returned no generated text.");
      }

      setResult(data.result);
    } catch (error) {
      console.error("Generator error:", error);

      setMessage(
        error.message ||
          "Something went wrong while generating text."
      );
    } finally {
      setLoading(false);
    }
  };

  const copyResult = async () => {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);
      setMessage("✓ Generated text copied.");
    } catch {
      setMessage("Unable to copy the generated text.");
    }
  };

  const clearAll = () => {
    setTopic("");
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
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
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
              fontWeight: "900",
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
            AI Text Generator
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
            Generate useful content from a topic with CALVORO AI.
          </p>
        </section>

        <section
          style={{
            background: "white",
            border: "1px solid #dbe4f0",
            borderRadius: "24px",
            padding: "30px",
          }}
        >
          <label
            style={{
              display: "block",
              fontWeight: "800",
              marginBottom: "10px",
            }}
          >
            Topic or Idea
          </label>

          <textarea
            value={topic}
            onChange={(event) => setTopic(event.target.value)}
            placeholder="Example: Benefits of saving money every month"
            rows="7"
            style={{
              width: "100%",
              boxSizing: "border-box",
              resize: "vertical",
              padding: "16px",
              borderRadius: "14px",
              border: "1px solid #cbd5e1",
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
                Content Type
              </label>

              <select
                value={type}
                onChange={(event) => setType(event.target.value)}
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "12px",
                  border: "1px solid #cbd5e1",
                  background: "white",
                  fontSize: "16px",
                }}
              >
                <option>Short Article</option>
                <option>Paragraph</option>
                <option>Email</option>
                <option>Product Description</option>
                <option>Social Media Post</option>
                <option>Introduction</option>
                <option>List</option>
              </select>
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: "800",
                  marginBottom: "8px",
                }}
              >
                Tone
              </label>

              <select
                value={tone}
                onChange={(event) => setTone(event.target.value)}
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
                <option>Creative</option>
              </select>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "22px",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={generateText}
              disabled={loading}
              style={{
                flex: "1",
                minWidth: "220px",
                border: "none",
                background: loading ? "#94a3b8" : "#2563eb",
                color: "white",
                padding: "14px 20px",
                borderRadius: "12px",
                fontWeight: "800",
                fontSize: "16px",
                cursor: loading ? "default" : "pointer",
              }}
            >
              {loading ? "✨ Generating..." : "✨ Generate with AI"}
            </button>

            <button
              type="button"
              onClick={clearAll}
              style={{
                border: "1px solid #cbd5e1",
                background: "white",
                color: "#334155",
                padding: "14px 22px",
                borderRadius: "12px",
                fontWeight: "700",
                cursor: "pointer",
              }}
            >
              Clear
            </button>
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
                <h2 style={{ margin: 0 }}>
                  ✨ Generated Text
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
                  lineHeight: "1.8",
                  whiteSpace: "pre-wrap",
                }}
              >
                {result}
              </div>
            </div>
          )}
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

