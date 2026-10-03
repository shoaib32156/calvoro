
import React from "react";
import { Link } from "react-router-dom";

const popularCalculators = [
  {
    icon: "％",
    name: "Percentage Calculator",
    description: "Calculate percentages, increases, decreases, and more.",
    path: "/percentage",
  },
  {
    icon: "🎂",
    name: "Age Calculator",
    description: "Calculate your exact age from your date of birth.",
    path: "/age",
  },
  {
    icon: "⚖️",
    name: "BMI Calculator",
    description: "Calculate your Body Mass Index quickly.",
    path: "/bmi",
  },
  {
    icon: "💰",
    name: "Loan Calculator",
    description: "Estimate monthly loan payments and total interest.",
    path: "/loan",
  },
  {
    icon: "📊",
    name: "GPA Calculator",
    description: "Calculate your GPA from grades and credits.",
    path: "/gpa",
  },
  {
    icon: "⛽",
    name: "Fuel Cost Calculator",
    description: "Estimate fuel usage and travel expenses.",
    path: "/fuel-cost",
  },
];

export default function PopularCalculators() {
  return (
    <section
      style={{
        padding: "65px 20px",
        background: "#ffffff",
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
            marginBottom: "32px",
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
            ⭐ POPULAR TOOLS
          </div>

          <h2
            style={{
              margin: 0,
              fontSize: "34px",
              fontWeight: "900",
              color: "#0f172a",
            }}
          >
            Popular Calculators
          </h2>

          <p
            style={{
              maxWidth: "700px",
              margin: "10px auto 0",
              color: "#64748b",
              lineHeight: 1.7,
              fontSize: "16px",
            }}
          >
            Quickly access some of the most useful calculators
            available on CALVORO.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "18px",
          }}
        >
          {popularCalculators.map((calculator) => (
            <Link
              key={calculator.path}
              to={calculator.path}
              style={{
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  height: "100%",
                  boxSizing: "border-box",
                  background: "#f8fafc",
                  border: "1px solid #e2e8f0",
                  borderRadius: "18px",
                  padding: "24px",
                  transition:
                    "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <div
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "14px",
                    background: "#eff6ff",
                    color: "#2563eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "24px",
                    marginBottom: "16px",
                  }}
                >
                  {calculator.icon}
                </div>

                <h3
                  style={{
                    margin: "0 0 9px",
                    color: "#0f172a",
                    fontSize: "19px",
                    fontWeight: "850",
                  }}
                >
                  {calculator.name}
                </h3>

                <p
                  style={{
                    margin: 0,
                    color: "#64748b",
                    fontSize: "14px",
                    lineHeight: 1.7,
                  }}
                >
                  {calculator.description}
                </p>

                <div
                  style={{
                    marginTop: "18px",
                    color: "#2563eb",
                    fontSize: "13px",
                    fontWeight: "800",
                  }}
                >
                  Open calculator →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

