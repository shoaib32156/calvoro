
import React, { useState } from "react";

const faqItems = [
  {
    question: "What is CALVORO?",
    answer:
      "CALVORO is a free online tools website offering calculators, converters, and AI-powered tools for everyday tasks.",
  },
  {
    question: "Are CALVORO calculators free?",
    answer:
      "Yes. CALVORO calculators are designed to be available for free and can be used directly in your web browser.",
  },
  {
    question: "How accurate are the calculators?",
    answer:
      "CALVORO calculators use standard mathematical formulas and are designed to provide useful estimates and calculations. Results should be checked when accuracy is important.",
  },
  {
    question: "Can I use CALVORO on mobile?",
    answer:
      "Yes. CALVORO is designed to work on phones, tablets, laptops, and desktop computers.",
  },
  {
    question: "Does CALVORO store my calculations?",
    answer:
      "Most calculations are performed directly in your browser. CALVORO does not need to save ordinary calculator inputs for the tools to work.",
  },
  {
    question: "What AI tools are available?",
    answer:
      "CALVORO currently includes AI tools for summarizing, rewriting, grammar checking, translation, text generation, and email writing.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      style={{
        maxWidth: "900px",
        margin: "60px auto",
        padding: "0 24px",
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
            fontWeight: "700",
            marginBottom: "12px",
          }}
        >
          ❓ CALVORO FAQ
        </div>

        <h2
          style={{
            fontSize: "34px",
            margin: "0 0 12px",
            color: "#0f172a",
          }}
        >
          Frequently Asked Questions
        </h2>

        <p
          style={{
            margin: 0,
            color: "#64748b",
            fontSize: "17px",
            lineHeight: "1.7",
          }}
        >
          Find answers to common questions about CALVORO and its online tools.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gap: "14px",
        }}
      >
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={item.question}
              style={{
                background: "white",
                border: "1px solid #e2e8f0",
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                style={{
                  width: "100%",
                  border: "none",
                  background: "white",
                  padding: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textAlign: "left",
                  cursor: "pointer",
                  color: "#0f172a",
                  fontSize: "17px",
                  fontWeight: "700",
                }}
              >
                <span>{item.question}</span>

                <span
                  style={{
                    fontSize: "24px",
                    color: "#2563eb",
                    marginLeft: "15px",
                  }}
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {isOpen && (
                <div
                  style={{
                    padding: "0 20px 20px",
                    color: "#64748b",
                    lineHeight: "1.7",
                    fontSize: "16px",
                  }}
                >
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

