import { useState } from "react";
import { Link } from "react-router-dom";

const languages = [
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Dutch",
  "Arabic",
  "Urdu",
  "Hindi",
  "Chinese",
  "Japanese",
  "Korean",
  "Russian",
  "Turkish",
  "Bengali",
];

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
      setMessage("Translation copied.");
    } catch {
      setMessage("Unable to copy the translation.");
    }
  };

  const clearAll = () => {
    setText("");
    setResult("");
    setMessage("");
  };

  const useSample = () => {
    setText(
      "Hello, I hope you are doing well. Thank you for your message."
    );
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
            CALVORO AI Tool
          </div>

          <h1
            style={{
              margin: "0 0 14px",
              fontSize: "clamp(32px, 5vw, 52px)",
              lineHeight: "1.1",
            }}
          >
            AI Translator
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
            Translate text into another language with the
            free CALVORO AI Translator.
          </p>
        </section>

        {/* TRANSLATOR TOOL */}
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
                Translate your text
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                }}
              >
                Enter your text, choose a target language,
                and translate it with AI.
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
            placeholder="Enter or paste text here..."
            rows={10}
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

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "15px",
              marginTop: "20px",
            }}
          >
            <div>
              <label
                htmlFor="target-language"
                style={{
                  display: "block",
                  fontWeight: "800",
                  marginBottom: "8px",
                }}
              >
                Translate to
              </label>

              <select
                id="target-language"
                value={language}
                onChange={(event) => {
                  setLanguage(event.target.value);
                  setMessage("");
                }}
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "14px",
                  borderRadius: "11px",
                  border: "1px solid #cbd5e1",
                  fontSize: "16px",
                  background: "white",
                  color: "#0f172a",
                }}
              >
                {languages.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {message && (
            <div
              style={{
                marginTop: "18px",
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
              onClick={translateText}
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
                ? "Translating..."
                : "Translate with AI"}
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
                  Translation Result
                </h2>

                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                  }}
                >
                  Translation into {language}
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
                Copy Translation
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
          <div
            style={{
              textAlign: "center",
              marginBottom: "35px",
            }}
          >
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
              How the AI Translator Works
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
              Learn how AI translation works and how to use
              CALVORO to translate everyday text into another
              language.
            </p>
          </div>

          {/* WHAT IS AI TRANSLATION */}
          <article style={{ marginBottom: "35px" }}>
            <h3
              style={{
                fontSize: "25px",
                marginBottom: "10px",
              }}
            >
              What is an AI Translator?
            </h3>

            <p
              style={{
                color: "#475569",
                lineHeight: "1.8",
                margin: 0,
              }}
            >
              An AI Translator is a tool that uses artificial
              intelligence to convert text from one language
              into another. Modern AI systems can consider
              words, sentence structure and surrounding context
              when creating a translation. CALVORO provides a
              simple interface where you enter text, select a
              target language and receive the translated result.
            </p>
          </article>

          {/* HOW TO USE */}
          <article style={{ marginBottom: "35px" }}>
            <h3
              style={{
                fontSize: "25px",
                marginBottom: "10px",
              }}
            >
              How to use the CALVORO AI Translator
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
                  Type or paste the text you want to translate.
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
                <strong>2. Choose a language</strong>

                <p
                  style={{
                    color: "#64748b",
                    lineHeight: "1.7",
                    marginBottom: 0,
                  }}
                >
                  Select the language you want your text
                  translated into.
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
                <strong>3. Start translation</strong>

                <p
                  style={{
                    color: "#64748b",
                    lineHeight: "1.7",
                    marginBottom: 0,
                  }}
                >
                  Click Translate with AI to process your text.
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
                <strong>4. Review the result</strong>

                <p
                  style={{
                    color: "#64748b",
                    lineHeight: "1.7",
                    marginBottom: 0,
                  }}
                >
                  Read the translated result and copy it for
                  your next task.
                </p>
              </div>
            </div>
          </article>

          {/* USE CASES */}
          <article style={{ marginBottom: "35px" }}>
            <h3
              style={{
                fontSize: "25px",
                marginBottom: "10px",
              }}
            >
              Common uses for AI translation
            </h3>

            <p
              style={{
                color: "#475569",
                lineHeight: "1.8",
              }}
            >
              Translation can be useful for everyday
              communication, travel, learning, international
              conversations, customer messages and multilingual
              content.
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
                "Travel messages",
                "Customer communication",
                "International emails",
                "Language learning",
                "Website content",
                "Social media text",
                "Personal messages",
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

          {/* LANGUAGE TIPS */}
          <article style={{ marginBottom: "35px" }}>
            <h3
              style={{
                fontSize: "25px",
                marginBottom: "10px",
              }}
            >
              Tips for better translations
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
                Write clear sentences and provide enough context
                for the AI to understand what you mean. Avoid
                unnecessary abbreviations or unclear fragments when
                accuracy matters.
              </p>

              <p
                style={{
                  color: "#475569",
                  lineHeight: "1.8",
                  marginBottom: 0,
                }}
              >
                Always review important translations yourself.
                Names, addresses, technical terminology, cultural
                expressions and specialized language may require
                human verification.
              </p>
            </div>
          </article>

          {/* IMPORTANT NOTE */}
          <article style={{ marginBottom: "35px" }}>
            <div
              style={{
                background: "#fff7ed",
                border: "1px solid #fed7aa",
                borderRadius: "16px",
                padding: "22px",
              }}
            >
              <h3
                style={{
                  fontSize: "23px",
                  marginTop: 0,
                }}
              >
                Important note about AI translations
              </h3>

              <p
                style={{
                  color: "#7c2d12",
                  lineHeight: "1.8",
                  marginBottom: 0,
                }}
              >
                AI translation is useful for many everyday tasks,
                but it should not automatically be treated as a
                perfect replacement for a professional translator.
                For legal, medical, financial, official or highly
                sensitive documents, review the translation
                carefully and consider professional assistance.
              </p>
            </div>
          </article>

          {/* FAQ */}
          <article style={{ marginBottom: "35px" }}>
            <h3
              style={{
                fontSize: "25px",
                marginBottom: "15px",
              }}
            >
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
                  Is the CALVORO AI Translator free?
                </h4>

                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                    lineHeight: "1.7",
                  }}
                >
                  The CALVORO AI Translator provides a free
                  interface for translating text using the
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
                  Which languages can I translate into?
                </h4>

                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                    lineHeight: "1.7",
                  }}
                >
                  CALVORO currently offers a selection of common
                  target languages including Spanish, French,
                  German, Arabic, Urdu, Hindi, Chinese and others.
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
                  Can I translate a long paragraph?
                </h4>

                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                    lineHeight: "1.7",
                  }}
                >
                  You can enter a paragraph or other text into
                  the tool. For very long documents, splitting the
                  content into smaller sections can make reviewing
                  the translation easier.
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
                  Should I review an AI translation?
                </h4>

                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                    lineHeight: "1.7",
                  }}
                >
                  Yes. Important translations should always be
                  reviewed for meaning, names, terminology,
                  context and cultural accuracy.
                </p>
              </div>
            </div>
          </article>

          {/* RELATED TOOLS */}
          <article>
            <h3
              style={{
                fontSize: "25px",
                marginBottom: "12px",
              }}
            >
              Related CALVORO AI Tools
            </h3>

            <p
              style={{
                color: "#64748b",
                lineHeight: "1.7",
              }}
            >
              Use other CALVORO tools to summarize, rewrite,
              generate and improve your writing.
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
                to="/ai-grammar-checker"
                style={{
                  textDecoration: "none",
                  background: "#eff6ff",
                  color: "#1d4ed8",
                  padding: "15px",
                  borderRadius: "12px",
                  fontWeight: "700",
                }}
              >
                AI Grammar Checker →
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