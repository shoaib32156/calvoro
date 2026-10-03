
import React from "react";

const steps = [
  {
    number: "01",
    icon: "🔎",
    title: "Choose a Tool",
    description:
      "Browse CALVORO calculators and AI tools to find the one that matches your task.",
  },
  {
    number: "02",
    icon: "✏️",
    title: "Enter Your Information",
    description:
      "Enter the numbers, dates, text, or other information required by the selected tool.",
  },
  {
    number: "03",
    icon: "⚡",
    title: "Get Your Result",
    description:
      "Use the result or AI-generated response to help complete your task quickly.",
  },
];

export default function HowItWorks() {
  return (
    <section
      style={{
        padding: "65px 20px",
        background:
          "linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)",
        borderTop: "1px solid #eef2f7",
        borderBottom: "1px solid #eef2f7",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
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
              display: "inline-flex",
              alignItems: "center",
              padding: "7px 13px",
              borderRadius: "999px",
              background: "#eff6ff",
              color: "#2563eb",
              fontSize: "12px",
              fontWeight: "800",
              marginBottom: "14px",
            }}
          >
            ⚡ HOW IT WORKS
          </div>

          <h2
            style={{
              margin: 0,
              fontSize: "34px",
              fontWeight: "900",
              color: "#0f172a",
            }}
          >
            How CALVORO Works
          </h2>

          <p
            style={{
              maxWidth: "700px",
              margin: "10px auto 0",
              color: "#64748b",
              fontSize: "16px",
              lineHeight: 1.7,
            }}
          >
            Simple tools designed to help you complete everyday
            calculations and writing tasks in just a few steps.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {steps.map((step) => (
            <div
              key={step.number}
              style={{
                background: "#ffffff",
                border: "1px solid #e2e8f0",
                borderRadius: "20px",
                padding: "28px",
                boxShadow:
                  "0 8px 25px rgba(15, 23, 42, 0.05)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    borderRadius: "15px",
                    background:
                      "linear-gradient(135deg, #2563eb, #4f46e5)",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                  }}
                >
                  {step.icon}
                </div>

                <div
                  style={{
                    color: "#cbd5e1",
                    fontSize: "14px",
                    fontWeight: "900",
                    letterSpacing: "1px",
                  }}
                >
                  {step.number}
                </div>
              </div>

              <h3
                style={{
                  margin: "0 0 10px",
                  fontSize: "20px",
                  fontWeight: "850",
                  color: "#0f172a",
                }}
              >
                {step.title}
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#64748b",
                  lineHeight: 1.7,
                  fontSize: "14px",
                }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

