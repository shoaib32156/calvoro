import { useState } from "react";
import { Link } from "react-router-dom";

const contentTypes = [
  "Short Article",
  "Paragraph",
  "Email",
  "Product Description",
  "Social Media Post",
  "Introduction",
  "List",
];

const tones = [
  "Professional",
  "Friendly",
  "Simple",
  "Formal",
  "Casual",
  "Creative",
];

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
    if (!result) {
      return;
    }

    try {
      await navigator.clipboard.writeText(result);
      setMessage("Generated text copied.");
    } catch {
      setMessage("Unable to copy the generated text.");
    }
  };

  const clearAll = () => {
    setTopic("");
    setResult("");
    setMessage("");
  };

  const useSample = () => {
    setTopic(
      "Benefits of saving money every month and building better financial habits"
    );
    setType("Short Article");
    setTone("Professional");
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
            AI Text Generator
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
            Generate useful text from a topic with the free
            CALVORO AI Text Generator.
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
                Create text with AI
              </h2>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                }}
              >
                Enter a topic, choose the content type and tone,
                then generate your draft.
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

          <label
            htmlFor="generator-topic"
            style={{
              display: "block",
              fontWeight: "800",
              marginBottom: "10px",
            }}
          >
            Topic or Idea
          </label>

          <textarea
            id="generator-topic"
            value={topic}
            onChange={(event) => {
              setTopic(event.target.value);
              setMessage("");
            }}
            placeholder="Example: Benefits of saving money every month"
            rows={8}
            style={{
              width: "100%",
              boxSizing: "border-box",
              resize: "vertical",
              padding: "16px",
              borderRadius: "14px",
              border: "1px solid #cbd5e1",
              fontSize: "16px",
              lineHeight: "1.7",
              fontFamily: "Arial, sans-serif",
              color: "#0f172a",
              background: "white",
            }}
          />

          <div
            style={{
              marginTop: "8px",
              color: "#64748b",
              fontSize: "14px",
            }}
          >
            {topic.length} characters
          </div>

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
                htmlFor="content-type"
                style={{
                  display: "block",
                  fontWeight: "800",
                  marginBottom: "8px",
                }}
              >
                Content Type
              </label>

              <select
                id="content-type"
                value={type}
                onChange={(event) => {
                  setType(event.target.value);
                  setMessage("");
                }}
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "12px",
                  border: "1px solid #cbd5e1",
                  background: "white",
                  fontSize: "16px",
                  color: "#0f172a",
                }}
              >
                {contentTypes.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="content-tone"
                style={{
                  display: "block",
                  fontWeight: "800",
                  marginBottom: "8px",
                }}
              >
                Tone
              </label>

              <select
                id="content-tone"
                value={tone}
                onChange={(event) => {
                  setTone(event.target.value);
                  setMessage("");
                }}
                style={{
                  width: "100%",
                  padding: "13px",
                  borderRadius: "12px",
                  border: "1px solid #cbd5e1",
                  background: "white",
                  fontSize: "16px",
                  color: "#0f172a",
                }}
              >
                {tones.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
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
                background: loading
                  ? "#93c5fd"
                  : "#2563eb",
                color: "white",
                padding: "14px 20px",
                borderRadius: "12px",
                fontWeight: "800",
                fontSize: "16px",
                cursor: loading
                  ? "not-allowed"
                  : "pointer",
              }}
            >
              {loading
                ? "Generating..."
                : "Generate with AI"}
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
                <div>
                  <h2
                    style={{
                      margin: "0 0 5px",
                    }}
                  >
                    Generated Text
                  </h2>

                  <p
                    style={{
                      margin: 0,
                      color: "#64748b",
                    }}
                  >
                    {type} in a {tone.toLowerCase()} tone
                  </p>
                </div>

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
                  Copy
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
              How the AI Text Generator Works
            </h2>

            <p
              style={{
                maxWidth: "760px",
                margin: "12px auto 0",
                color: "#64748b",
                fontSize: "17px",
                lineHeight: "1.7",
              }}
            >
              Learn how to turn ideas into useful drafts,
              choose the right content format, and review
              AI-generated writing effectively.
            </p>
          </div>

          {/* WHAT IS IT */}
          <article style={{ marginBottom: "35px" }}>
            <h3
              style={{
                fontSize: "25px",
                marginBottom: "10px",
              }}
            >
              What is an AI Text Generator?
            </h3>

            <p
              style={{
                color: "#475569",
                lineHeight: "1.8",
                margin: 0,
              }}
            >
              An AI Text Generator is a writing tool that creates
              new text from instructions or a topic. Depending on
              the prompt, it can produce a paragraph, article,
              email, introduction, product description, social
              media draft or list. CALVORO provides a simple
              interface for choosing a content type and writing
              tone before generating a draft.
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
              How to use the CALVORO AI Text Generator
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
                <strong>1. Enter a topic</strong>

                <p
                  style={{
                    color: "#64748b",
                    lineHeight: "1.7",
                    marginBottom: 0,
                  }}
                >
                  Describe the subject or idea you want the AI
                  to write about.
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
                <strong>2. Choose a content type</strong>

                <p
                  style={{
                    color: "#64748b",
                    lineHeight: "1.7",
                    marginBottom: 0,
                  }}
                >
                  Select the format that best matches your task,
                  such as an email or short article.
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
                <strong>3. Select the tone</strong>

                <p
                  style={{
                    color: "#64748b",
                    lineHeight: "1.7",
                    marginBottom: 0,
                  }}
                >
                  Choose a professional, friendly, simple,
                  formal, casual or creative style.
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
                <strong>4. Review the draft</strong>

                <p
                  style={{
                    color: "#64748b",
                    lineHeight: "1.7",
                    marginBottom: 0,
                  }}
                >
                  Read the generated text and edit any details
                  before using it.
                </p>
              </div>
            </div>
          </article>

          {/* CONTENT TYPES */}
          <article style={{ marginBottom: "35px" }}>
            <h3
              style={{
                fontSize: "25px",
                marginBottom: "10px",
              }}
            >
              What can you create?
            </h3>

            <p
              style={{
                color: "#475569",
                lineHeight: "1.8",
              }}
            >
              The best content type depends on the task. A
              well-selected format gives the AI a clearer
              structure for the requested writing.
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
                "Short articles",
                "Paragraphs",
                "Emails",
                "Product descriptions",
                "Social media posts",
                "Introductions",
                "Lists",
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

          {/* TONE */}
          <article style={{ marginBottom: "35px" }}>
            <h3
              style={{
                fontSize: "25px",
                marginBottom: "12px",
              }}
            >
              Choosing the right tone
            </h3>

            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fit, minmax(220px, 1fr))",
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
                <strong>Professional</strong>
                <p
                  style={{
                    color: "#64748b",
                    lineHeight: "1.7",
                    marginBottom: 0,
                  }}
                >
                  Useful for workplace, business and customer
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
                <strong>Friendly</strong>
                <p
                  style={{
                    color: "#64748b",
                    lineHeight: "1.7",
                    marginBottom: 0,
                  }}
                >
                  Helpful for approachable and conversational
                  writing.
                </p>
              </div>

              <div
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "14px",
                  padding: "18px",
                }}
              >
                <strong>Simple</strong>
                <p
                  style={{
                    color: "#64748b",
                    lineHeight: "1.7",
                    marginBottom: 0,
                  }}
                >
                  Useful when you want clearer and easier-to-read
                  wording.
                </p>
              </div>

              <div
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "14px",
                  padding: "18px",
                }}
              >
                <strong>Formal</strong>
                <p
                  style={{
                    color: "#64748b",
                    lineHeight: "1.7",
                    marginBottom: 0,
                  }}
                >
                  Suitable for more formal documents and
                  professional situations.
                </p>
              </div>

              <div
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "14px",
                  padding: "18px",
                }}
              >
                <strong>Casual</strong>
                <p
                  style={{
                    color: "#64748b",
                    lineHeight: "1.7",
                    marginBottom: 0,
                  }}
                >
                  Useful for relaxed everyday communication.
                </p>
              </div>

              <div
                style={{
                  border: "1px solid #e2e8f0",
                  borderRadius: "14px",
                  padding: "18px",
                }}
              >
                <strong>Creative</strong>
                <p
                  style={{
                    color: "#64748b",
                    lineHeight: "1.7",
                    marginBottom: 0,
                  }}
                >
                  Useful for brainstorming and more expressive
                  writing.
                </p>
              </div>
            </div>
          </article>

          {/* COMMON USES */}
          <article style={{ marginBottom: "35px" }}>
            <h3
              style={{
                fontSize: "25px",
                marginBottom: "10px",
              }}
            >
              Common uses for AI-generated text
            </h3>

            <p
              style={{
                color: "#475569",
                lineHeight: "1.8",
              }}
            >
              An AI text generator can be a useful starting point
              for everyday writing tasks. It can help organize an
              idea, produce a first draft or suggest wording that
              you can then review and personalize.
            </p>

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
                Examples include drafting customer messages,
                creating article outlines, preparing product
                descriptions, brainstorming social media copy,
                writing introductions and turning rough ideas into
                a more organized first draft.
              </p>

              <p
                style={{
                  marginBottom: 0,
                  color: "#475569",
                  lineHeight: "1.8",
                }}
              >
                The generated text should be treated as a draft.
                Review names, numbers, claims, facts and other
                important details before publishing or sending it.
              </p>
            </div>
          </article>

          {/* BETTER PROMPTS */}
          <article style={{ marginBottom: "35px" }}>
            <h3
              style={{
                fontSize: "25px",
                marginBottom: "10px",
              }}
            >
              Tips for better AI writing results
            </h3>

            <div
              style={{
                display: "grid",
                gap: "12px",
              }}
            >
              <div
                style={{
                  background: "#eff6ff",
                  borderRadius: "12px",
                  padding: "15px",
                  color: "#1e40af",
                  lineHeight: "1.7",
                }}
              >
                <strong>Be specific:</strong> Include the main
                subject and purpose of the writing.
              </div>

              <div
                style={{
                  background: "#eff6ff",
                  borderRadius: "12px",
                  padding: "15px",
                  color: "#1e40af",
                  lineHeight: "1.7",
                }}
              >
                <strong>Choose the right format:</strong> Use
                Email for an email, List for a list, and so on.
              </div>

              <div
                style={{
                  background: "#eff6ff",
                  borderRadius: "12px",
                  padding: "15px",
                  color: "#1e40af",
                  lineHeight: "1.7",
                }}
              >
                <strong>Review the output:</strong> Make sure the
                final text matches your intended meaning.
              </div>

              <div
                style={{
                  background: "#eff6ff",
                  borderRadius: "12px",
                  padding: "15px",
                  color: "#1e40af",
                  lineHeight: "1.7",
                }}
              >
                <strong>Add your own knowledge:</strong> Personal
                experience and verified facts can make the final
                writing more useful.
              </div>
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
                  Is the CALVORO AI Text Generator free?
                </h4>

                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                    lineHeight: "1.7",
                  }}
                >
                  CALVORO provides a free interface for generating
                  text through the available AI service.
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
                  What type of content can it generate?
                </h4>

                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                    lineHeight: "1.7",
                  }}
                >
                  The tool supports short articles, paragraphs,
                  emails, product descriptions, social media posts,
                  introductions and lists.
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
                  Can I change the writing tone?
                </h4>

                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                    lineHeight: "1.7",
                  }}
                >
                  Yes. You can choose Professional, Friendly,
                  Simple, Formal, Casual or Creative.
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
                  Should I publish AI-generated text without editing?
                </h4>

                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                    lineHeight: "1.7",
                  }}
                >
                  It is better to review and personalize AI output.
                  Check important facts, claims, names, numbers and
                  wording before publishing or sending it.
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
              Explore more CALVORO tools for writing,
              translation and text improvement.
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