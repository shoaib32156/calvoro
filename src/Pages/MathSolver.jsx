
import { useState } from "react";

function tokenize(expression) {
  const tokens = [];
  let i = 0;

  while (i < expression.length) {
    const char = expression[i];

    if (char === " ") {
      i++;
      continue;
    }

    if ("+-*/%()".includes(char)) {
      tokens.push(char);
      i++;
      continue;
    }

    if (/[0-9.]/.test(char)) {
      let number = "";

      while (i < expression.length && /[0-9.]/.test(expression[i])) {
        number += expression[i];
        i++;
      }

      if ((number.match(/\./g) || []).length > 1) {
        throw new Error("Invalid number");
      }

      tokens.push(Number(number));
      continue;
    }

    throw new Error("Invalid character");
  }

  return tokens;
}

function calculate(tokens) {
  let position = 0;

  function parseExpression() {
    let value = parseTerm();

    while (
      tokens[position] === "+" ||
      tokens[position] === "-"
    ) {
      const operator = tokens[position];
      position++;

      const nextValue = parseTerm();

      if (operator === "+") {
        value += nextValue;
      } else {
        value -= nextValue;
      }
    }

    return value;
  }

  function parseTerm() {
    let value = parseFactor();

    while (
      tokens[position] === "*" ||
      tokens[position] === "/" ||
      tokens[position] === "%"
    ) {
      const operator = tokens[position];
      position++;

      const nextValue = parseFactor();

      if (operator === "*") {
        value *= nextValue;
      } else if (operator === "/") {
        if (nextValue === 0) {
          throw new Error("Cannot divide by zero");
        }

        value /= nextValue;
      } else {
        value %= nextValue;
      }
    }

    return value;
  }

  function parseFactor() {
    if (tokens[position] === "-") {
      position++;
      return -parseFactor();
    }

    if (tokens[position] === "+") {
      position++;
      return parseFactor();
    }

    if (tokens[position] === "(") {
      position++;

      const value = parseExpression();

      if (tokens[position] !== ")") {
        throw new Error("Missing closing parenthesis");
      }

      position++;

      return value;
    }

    const value = tokens[position];

    if (typeof value !== "number") {
      throw new Error("Invalid expression");
    }

    position++;

    return value;
  }

  const result = parseExpression();

  if (position !== tokens.length) {
    throw new Error("Invalid expression");
  }

  return result;
}

/* -----------------------------
   Basic Math Calculator
----------------------------- */

function solveBasicMath(input) {
  let expression = input
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/[−–—]/g, "-")
    .trim();

  if (!expression) {
    throw new Error("Empty expression");
  }

  const tokens = tokenize(expression);

  return calculate(tokens);
}

/* -----------------------------
   Percentage Calculator
----------------------------- */

function solvePercentage(input) {
  const text = input
    .toLowerCase()
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .trim();

  let match;

  // Example:
  // 15% of 200
  match = text.match(
    /^(-?\d+(?:\.\d+)?)\s*%\s*(?:of)\s*(-?\d+(?:\.\d+)?)$/
  );

  if (match) {
    const percent = Number(match[1]);
    const number = Number(match[2]);

    return (percent / 100) * number;
  }

  // Example:
  // 20% increase of 500
  match = text.match(
    /^(-?\d+(?:\.\d+)?)\s*%\s*(?:increase)\s*(?:of)?\s*(-?\d+(?:\.\d+)?)$/
  );

  if (match) {
    const percent = Number(match[1]);
    const number = Number(match[2]);

    return number + (percent / 100) * number;
  }

  // Example:
  // 10% decrease of 800
  match = text.match(
    /^(-?\d+(?:\.\d+)?)\s*%\s*(?:decrease)\s*(?:of)?\s*(-?\d+(?:\.\d+)?)$/
  );

  if (match) {
    const percent = Number(match[1]);
    const number = Number(match[2]);

    return number - (percent / 100) * number;
  }

  // Example:
  // 50 is what percent of 200
  match = text.match(
    /^(-?\d+(?:\.\d+)?)\s+is\s+what\s+percent\s+of\s+(-?\d+(?:\.\d+)?)$/
  );

  if (match) {
    const value = Number(match[1]);
    const total = Number(match[2]);

    if (total === 0) {
      throw new Error("Cannot divide by zero");
    }

    return (value / total) * 100;
  }

  return null;
}

function solveExpression(input) {
  const percentageResult = solvePercentage(input);

  if (percentageResult !== null) {
    return percentageResult;
  }

  return solveBasicMath(input);
}

export default function MathSolver() {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSolve = () => {
    try {
      setError("");

      const answer = solveExpression(expression);

      if (!Number.isFinite(answer)) {
        throw new Error("Invalid result");
      }

      setResult(answer);
    } catch {
      setResult(null);

      setError(
        "Please enter a valid math expression or percentage calculation."
      );
    }
  };

  const useExample = (example) => {
    setExpression(example);
    setResult(null);
    setError("");
  };

  const formattedResult =
    result !== null
      ? Number.isInteger(result)
        ? result
        : Number(result.toFixed(10))
      : null;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "50px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "850px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "40px",
            boxShadow: "0 10px 35px rgba(0,0,0,0.08)",
          }}
        >
          <h1
            style={{
              marginTop: 0,
              marginBottom: "10px",
              fontSize: "36px",
              color: "#111827",
            }}
          >
            Math Solver
          </h1>

          <p
            style={{
              color: "#64748b",
              fontSize: "17px",
              marginBottom: "30px",
            }}
          >
            Solve math expressions and percentage calculations instantly.
          </p>

          <label
            style={{
              display: "block",
              fontWeight: "600",
              marginBottom: "10px",
              color: "#334155",
            }}
          >
            Enter your calculation
          </label>

          <input
            type="text"
            value={expression}
            onChange={(e) => {
              setExpression(e.target.value);
              setResult(null);
              setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSolve();
              }
            }}
            placeholder="Example: 15% of 200"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "16px",
              borderRadius: "12px",
              border: "1px solid #cbd5e1",
              fontSize: "18px",
              outline: "none",
            }}
          />

          <button
            onClick={handleSolve}
            style={{
              marginTop: "18px",
              width: "100%",
              padding: "16px",
              border: "none",
              borderRadius: "12px",
              background: "#2563eb",
              color: "white",
              fontSize: "17px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Solve
          </button>

          {result !== null && (
            <div
              style={{
                marginTop: "25px",
                padding: "25px",
                borderRadius: "16px",
                background: "#eff6ff",
                border: "1px solid #bfdbfe",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  color: "#64748b",
                  fontSize: "15px",
                  marginBottom: "8px",
                }}
              >
                Result
              </div>

              <div
                style={{
                  fontSize: "38px",
                  fontWeight: "800",
                  color: "#1d4ed8",
                }}
              >
                {formattedResult}
              </div>
            </div>
          )}

          {error && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                borderRadius: "12px",
                background: "#fef2f2",
                color: "#b91c1c",
                border: "1px solid #fecaca",
              }}
            >
              {error}
            </div>
          )}

          <div style={{ marginTop: "35px" }}>
            <h2
              style={{
                fontSize: "21px",
                color: "#111827",
              }}
            >
              Try an example
            </h2>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              {[
                "25 × 18 + 50",
                "100 - 25 × 2",
                "(50 + 30) ÷ 4",
                "15% of 200",
                "20% increase of 500",
                "10% decrease of 800",
                "50 is what percent of 200",
              ].map((example) => (
                <button
                  key={example}
                  onClick={() => useExample(example)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: "10px",
                    border: "1px solid #cbd5e1",
                    background: "white",
                    color: "#334155",
                    cursor: "pointer",
                  }}
                >
                  {example}
                </button>
              ))}
            </div>
          </div>

          <div
            style={{
              marginTop: "35px",
              padding: "20px",
              borderRadius: "14px",
              background: "#f8fafc",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                fontSize: "20px",
                color: "#111827",
              }}
            >
              Supported Calculations
            </h2>

            <p
              style={{
                color: "#64748b",
                lineHeight: 1.7,
              }}
            >
              Basic arithmetic, parentheses, decimals, negative numbers,
              multiplication, division, remainder, percentage-of calculations,
              percentage increases, percentage decreases, and percentage
              comparisons are supported.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

