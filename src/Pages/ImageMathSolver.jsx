import { useState } from "react";
import Tesseract from "tesseract.js";

function formatResult(value) {
  if (!Number.isFinite(value)) return "Unable to calculate";

  if (Number.isInteger(value)) return String(value);

  return Number(value.toFixed(10)).toString();
}

/* =========================
   NORMALIZE OCR MATH
========================= */

function normalizeMathText(text) {
  return text
    .replace(/[−–—]/g, "-")
    .replace(/[×X]/g, "x")
    .replace(/÷/g, "/")
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .replace(/⁴/g, "^4")
    .replace(/\s+/g, " ")
    .trim();
}

/*
  OCR often reads:

  x2  -> x^2
  x 2 -> x^2
  2x2 -> 2x^2
*/

function normalizeQuadraticNotation(text) {
  return text
    .replace(/\bx\s*2\b/gi, "x^2")
    .replace(/\bx2\b/gi, "x^2")
    .replace(/(\d)\s*x\s*2\b/gi, "$1x^2")
    .replace(/(\))\s*2\b/g, "$1^2");
}

/* =========================
   LINEAR EQUATION SOLVER
========================= */

function solveLinearEquation(equation) {
  let clean = normalizeMathText(equation)
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/(\d)x/g, "$1*x");

  if (!clean.includes("=")) return null;

  const parts = clean.split("=");

  if (parts.length !== 2) return null;

  const left = parts[0];
  const right = parts[1];

  if (!left.includes("x") && !right.includes("x")) {
    return null;
  }

  function parseSide(side) {
    let expression = side.replace(/-/g, "+-");

    if (expression.startsWith("+")) {
      expression = expression.slice(1);
    }

    const terms = expression.split("+");

    let xCoefficient = 0;
    let constant = 0;

    for (let term of terms) {
      if (!term) continue;

      if (term.includes("x")) {
        term = term.replace(/\*/g, "");

        const coefficientText = term.replace("x", "");

        let coefficient;

        if (
          coefficientText === "" ||
          coefficientText === "+"
        ) {
          coefficient = 1;
        } else if (coefficientText === "-") {
          coefficient = -1;
        } else {
          coefficient = Number(coefficientText);
        }

        if (!Number.isFinite(coefficient)) {
          throw new Error("Unsupported equation");
        }

        xCoefficient += coefficient;
      } else {
        const number = Number(term);

        if (!Number.isFinite(number)) {
          throw new Error("Unsupported equation");
        }

        constant += number;
      }
    }

    return {
      xCoefficient,
      constant,
    };
  }

  try {
    const leftSide = parseSide(left);
    const rightSide = parseSide(right);

    const coefficient =
      leftSide.xCoefficient -
      rightSide.xCoefficient;

    const constant =
      rightSide.constant -
      leftSide.constant;

    if (coefficient === 0) {
      if (constant === 0) {
        return {
          type: "infinite",
          answer: "Infinitely many solutions",
          steps: [
            "Both sides are equivalent.",
            "Therefore, there are infinitely many solutions.",
          ],
        };
      }

      return {
        type: "none",
        answer: "No solution",
        steps: [
          "The variable terms cancel.",
          "The remaining equation is impossible.",
          "Therefore, there is no solution.",
        ],
      };
    }

    const x = constant / coefficient;

    return {
      type: "solution",
      answer: `x = ${formatResult(x)}`,
      steps: [
        `Start with: ${equation}`,
        "Move the variable terms to one side and constants to the other side.",
        `${formatResult(coefficient)}x = ${formatResult(constant)}`,
        `Divide both sides by ${formatResult(coefficient)}.`,
        `x = ${formatResult(x)}`,
      ],
    };
  } catch {
    return null;
  }
}

/* =========================
   QUADRATIC SOLVER
========================= */

function solveQuadraticEquation(equation) {
  let clean = normalizeQuadraticNotation(
    normalizeMathText(equation)
  )
    .toLowerCase()
    .replace(/\s+/g, "");

  if (!clean.includes("=")) return null;

  const parts = clean.split("=");

  if (parts.length !== 2) return null;

  let expression = `${parts[0]}-(${parts[1]})`;

  expression = expression
    .replace(/\(/g, "")
    .replace(/\)/g, "")
    .replace(/-/g, "+-");

  if (expression.startsWith("+")) {
    expression = expression.slice(1);
  }

  const terms = expression.split("+");

  let a = 0;
  let b = 0;
  let c = 0;

  try {
    for (let term of terms) {
      if (!term) continue;

      term = term.replace(/\*/g, "");

      if (term.includes("x^2")) {
        const coefficient =
          term.replace("x^2", "");

        if (
          coefficient === "" ||
          coefficient === "+"
        ) {
          a += 1;
        } else if (coefficient === "-") {
          a -= 1;
        } else {
          a += Number(coefficient);
        }
      } else if (term.includes("x")) {
        const coefficient =
          term.replace("x", "");

        if (
          coefficient === "" ||
          coefficient === "+"
        ) {
          b += 1;
        } else if (coefficient === "-") {
          b -= 1;
        } else {
          b += Number(coefficient);
        }
      } else {
        c += Number(term);
      }
    }

    if (
      !Number.isFinite(a) ||
      !Number.isFinite(b) ||
      !Number.isFinite(c)
    ) {
      return null;
    }

    if (a === 0) return null;

    const discriminant =
      b * b - 4 * a * c;

    const steps = [
      `Start with: ${equation}`,
      `Identify coefficients: a = ${formatResult(
        a
      )}, b = ${formatResult(
        b
      )}, c = ${formatResult(c)}`,
      `Calculate discriminant: b² - 4ac = ${formatResult(
        discriminant
      )}`,
    ];

    if (discriminant < 0) {
      steps.push(
        "The discriminant is negative, so there are no real solutions."
      );

      return {
        type: "complex",
        answer: "No real solutions",
        steps,
      };
    }

    if (discriminant === 0) {
      const x = -b / (2 * a);

      steps.push(
        `x = -b / 2a = ${formatResult(x)}`
      );

      return {
        type: "quadratic",
        answer: `x = ${formatResult(x)}`,
        steps,
      };
    }

    const sqrtD = Math.sqrt(discriminant);

    const x1 =
      (-b + sqrtD) / (2 * a);

    const x2 =
      (-b - sqrtD) / (2 * a);

    steps.push(
      `√D = ${formatResult(sqrtD)}`
    );

    steps.push(
      `x₁ = (-b + √D) / 2a = ${formatResult(
        x1
      )}`
    );

    steps.push(
      `x₂ = (-b - √D) / 2a = ${formatResult(
        x2
      )}`
    );

    return {
      type: "quadratic",
      answer: `x₁ = ${formatResult(
        x1
      )}, x₂ = ${formatResult(x2)}`,
      steps,
    };
  } catch {
    return null;
  }
}

/* =========================
   BASIC MATH
========================= */

function calculateBasicExpression(expression) {
  let clean = normalizeMathText(
    expression
  ).replace(/\s+/g, "");

  const percentMatch = clean.match(
    /^(-?\d+(?:\.\d+)?)%of(-?\d+(?:\.\d+)?)$/i
  );

  if (percentMatch) {
    return (
      (Number(percentMatch[1]) / 100) *
      Number(percentMatch[2])
    );
  }

  const sqrtMatch = clean.match(
    /^√(-?\d+(?:\.\d+)?)$/
  );

  if (sqrtMatch) {
    const number = Number(sqrtMatch[1]);

    if (number < 0) {
      throw new Error(
        "Cannot calculate square root of a negative number"
      );
    }

    return Math.sqrt(number);
  }

  clean = clean
    .replace(/²/g, "^2")
    .replace(/³/g, "^3");

  let index = 0;

  function parseExpression() {
    let value = parseTerm();

    while (index < clean.length) {
      const operator = clean[index];

      if (operator === "+") {
        index++;
        value += parseTerm();
      } else if (operator === "-") {
        index++;
        value -= parseTerm();
      } else {
        break;
      }
    }

    return value;
  }

  function parseTerm() {
    let value = parsePower();

    while (index < clean.length) {
      const operator = clean[index];

      if (operator === "*") {
        index++;
        value *= parsePower();
      } else if (operator === "/") {
        index++;

        const divisor = parsePower();

        if (divisor === 0) {
          throw new Error(
            "Division by zero"
          );
        }

        value /= divisor;
      } else {
        break;
      }
    }

    return value;
  }

  function parsePower() {
    let value = parsePrimary();

    if (clean[index] === "^") {
      index++;

      const exponent = parsePower();

      value = Math.pow(
        value,
        exponent
      );
    }

    return value;
  }

  function parsePrimary() {
    if (clean[index] === "+") {
      index++;
      return parsePrimary();
    }

    if (clean[index] === "-") {
      index++;
      return -parsePrimary();
    }

    if (clean[index] === "(") {
      index++;

      const value =
        parseExpression();

      if (clean[index] !== ")") {
        throw new Error(
          "Missing closing parenthesis"
        );
      }

      index++;

      return value;
    }

    const start = index;

    while (
      index < clean.length &&
      /[0-9.]/.test(clean[index])
    ) {
      index++;
    }

    if (start === index) {
      throw new Error(
        "Invalid expression"
      );
    }

    return Number(
      clean.slice(start, index)
    );
  }

  const result =
    parseExpression();

  if (index !== clean.length) {
    throw new Error(
      "Unsupported expression"
    );
  }

  return result;
}

/* =========================
   STEPS
========================= */

function getArithmeticSteps(
  expression,
  result
) {
  const clean = expression
    .replace(/×/g, "*")
    .replace(/÷/g, "/")
    .replace(/[−–—]/g, "-")
    .trim();

  const steps = [
    `Start with: ${expression}`,
  ];

  if (clean.includes("+")) {
    steps.push(
      "Add the numbers together."
    );
  } else if (clean.includes("-")) {
    steps.push(
      "Subtract the numbers."
    );
  } else if (clean.includes("*")) {
    steps.push(
      "Multiply the numbers."
    );
  } else if (clean.includes("/")) {
    steps.push(
      "Divide the numbers."
    );
  } else if (clean.includes("²")) {
    steps.push(
      "Square the number."
    );
  } else if (clean.includes("√")) {
    steps.push(
      "Calculate the square root."
    );
  } else if (clean.includes("%")) {
    steps.push(
      "Convert the percentage to a decimal and multiply."
    );
  }

  steps.push(
    `Answer: ${formatResult(result)}`
  );

  return steps;
}

/* =========================
   OCR PROBLEM DETECTION
========================= */

function cleanLine(line) {
  return line
    .replace(/[|]/g, "1")
    .replace(/[lI]/g, "1")
    .replace(/[oO]/g, "0")
    .replace(/[÷]/g, "/")
    .replace(/[−–—]/g, "-")
    .trim();
}

function findProblems(text) {
  const lines = text
    .split("\n")
    .map(cleanLine)
    .map((line) =>
      normalizeQuadraticNotation(
        normalizeMathText(line)
      )
    )
    .map((line) => line.trim())
    .filter(Boolean);

  const problems = [];

  for (const line of lines) {
    const candidate =
      line.replace(
        /^\s*\d+\s*[\.\)\-:]\s*/,
        ""
      );

    /* QUADRATIC */

    if (
      candidate.includes("=") &&
      /x\^2/i.test(candidate)
    ) {
      const solution =
        solveQuadraticEquation(
          candidate
        );

      if (solution) {
        problems.push({
          type: "quadratic",
          original: candidate,
          solution,
        });

        continue;
      }
    }

    /* LINEAR */

    if (
      candidate.includes("=") &&
      candidate
        .toLowerCase()
        .includes("x")
    ) {
      const solution =
        solveLinearEquation(
          candidate
        );

      if (solution) {
        problems.push({
          type: "algebra",
          original: candidate,
          solution,
        });

        continue;
      }
    }

    /* PERCENTAGE */

    const percentMatch =
      candidate.match(
        /^(-?\d+(?:\.\d+)?)\s*%\s*of\s*(-?\d+(?:\.\d+)?)$/i
      );

    if (percentMatch) {
      problems.push({
        type: "math",
        original: `${percentMatch[1]}% of ${percentMatch[2]}`,
        expression: `${percentMatch[1]}%of${percentMatch[2]}`,
      });

      continue;
    }

    /* SQUARE ROOT */

    if (
      /^√\s*\d+(?:\.\d+)?$/i.test(
        candidate
      )
    ) {
      problems.push({
        type: "math",
        original: candidate,
        expression: candidate,
      });

      continue;
    }

    /* POWERS */

    if (
      /\^2|\^3|²|³/.test(
        candidate
      )
    ) {
      problems.push({
        type: "math",
        original: candidate,
        expression: candidate,
      });

      continue;
    }

    /* NORMAL ARITHMETIC */

    const arithmeticMatch =
      candidate.match(
        /^[0-9().+\-*/×÷\s²³⁴⁵⁶⁷⁸⁹⁰^]+$/
      );

    if (
      arithmeticMatch &&
      /[+\-*/×÷^]/.test(
        candidate
      )
    ) {
      problems.push({
        type: "math",
        original: candidate,
        expression: candidate,
      });
    }
  }

  const unique = [];
  const seen = new Set();

  for (const problem of problems) {
    const key = problem.original
      .replace(/\s+/g, "")
      .toLowerCase();

    if (!seen.has(key)) {
      seen.add(key);
      unique.push(problem);
    }
  }

  return unique;
}

/* =========================
   COMPONENT
========================= */

export default function ImageMathSolver() {
  const [image, setImage] =
    useState(null);

  const [preview, setPreview] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [progress, setProgress] =
    useState(0);

  const [ocrText, setOcrText] =
    useState("");

  const [problems, setProblems] =
    useState([]);

  const [error, setError] =
    useState("");

  const [showText, setShowText] =
    useState(false);

  function handleImageChange(event) {
    const file =
      event.target.files?.[0];

    if (!file) return;

    setImage(file);
    setPreview(
      URL.createObjectURL(file)
    );
    setProblems([]);
    setOcrText("");
    setError("");
    setProgress(0);
  }

  function removeImage() {
    setImage(null);
    setPreview("");
    setProblems([]);
    setOcrText("");
    setError("");
    setProgress(0);
  }

  async function solveImage() {
    if (!image) {
      setError(
        "Please upload an image first."
      );
      return;
    }

    setLoading(true);
    setProgress(0);
    setError("");
    setProblems([]);
    setOcrText("");

    try {
      const result =
        await Tesseract.recognize(
          image,
          "eng",
          {
            logger: (info) => {
              if (
                info.status ===
                  "recognizing text" &&
                typeof info.progress ===
                  "number"
              ) {
                setProgress(
                  Math.round(
                    info.progress * 100
                  )
                );
              }
            },
          }
        );

      const text =
        result?.data?.text || "";

      setOcrText(text);

      const detectedProblems =
        findProblems(text);

      if (
        detectedProblems.length ===
        0
      ) {
        setError(
          "No supported math problems were detected. Try a clearer image."
        );
        return;
      }

      const solved =
        detectedProblems.map(
          (problem, index) => {
            if (
              problem.type ===
              "quadratic"
            ) {
              return {
                id: index + 1,
                original:
                  problem.original,
                result:
                  problem.solution
                    .answer,
                success:
                  problem.solution
                    .type ===
                  "quadratic",
                steps:
                  problem.solution
                    .steps,
                type: "quadratic",
              };
            }

            if (
              problem.type ===
              "algebra"
            ) {
              return {
                id: index + 1,
                original:
                  problem.original,
                result:
                  problem.solution
                    .answer,
                success:
                  problem.solution
                    .type ===
                  "solution",
                steps:
                  problem.solution
                    .steps,
                type: "algebra",
              };
            }

            try {
              const value =
                calculateBasicExpression(
                  problem.expression
                );

              return {
                id: index + 1,
                original:
                  problem.original,
                result:
                  formatResult(value),
                success: true,
                steps:
                  getArithmeticSteps(
                    problem.original,
                    value
                  ),
                type: "math",
              };
            } catch (err) {
              return {
                id: index + 1,
                original:
                  problem.original,
                result:
                  "Could not solve this problem",
                success: false,
                error:
                  err.message,
                steps: [],
                type: "math",
              };
            }
          }
        );

      setProblems(solved);
    } catch (err) {
      console.error(err);

      setError(
        "Something went wrong while reading the image. Please try another clear image."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        padding: "40px 20px",
        fontFamily:
          "Inter, Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "1000px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "32px",
            boxShadow:
              "0 10px 35px rgba(15, 23, 42, 0.08)",
            border:
              "1px solid #e2e8f0",
          }}
        >
          <div
            style={{
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            <div
              style={{
                fontSize: "48px",
                marginBottom: "10px",
              }}
            >
              🧮
            </div>

            <h1
              style={{
                margin:
                  "0 0 10px",
                fontSize: "32px",
                color: "#0f172a",
              }}
            >
              Image Math Solver
            </h1>

            <p
              style={{
                margin: 0,
                color: "#64748b",
                fontSize: "16px",
              }}
            >
              Upload an image containing
              math problems and solve
              each problem separately.
            </p>
          </div>

          <div
            style={{
              border:
                "2px dashed #cbd5e1",
              borderRadius: "18px",
              padding: "30px",
              textAlign: "center",
              background:
                "#f8fafc",
            }}
          >
            {!preview ? (
              <>
                <div
                  style={{
                    fontSize: "42px",
                    marginBottom: "12px",
                  }}
                >
                  📷
                </div>

                <h3
                  style={{
                    margin:
                      "0 0 8px",
                    color:
                      "#0f172a",
                  }}
                >
                  Upload a math image
                </h3>

                <p
                  style={{
                    color:
                      "#64748b",
                    marginBottom:
                      "20px",
                  }}
                >
                  Clear printed math
                  works best.
                </p>

                <label
                  style={{
                    display:
                      "inline-block",
                    background:
                      "#2563eb",
                    color: "white",
                    padding:
                      "12px 22px",
                    borderRadius:
                      "10px",
                    cursor:
                      "pointer",
                    fontWeight:
                      "700",
                  }}
                >
                  Choose Image

                  <input
                    type="file"
                    accept="image/*"
                    onChange={
                      handleImageChange
                    }
                    style={{
                      display:
                        "none",
                    }}
                  />
                </label>
              </>
            ) : (
              <>
                <img
                  src={preview}
                  alt="Uploaded math"
                  style={{
                    maxWidth:
                      "100%",
                    maxHeight:
                      "400px",
                    borderRadius:
                      "14px",
                    objectFit:
                      "contain",
                    background:
                      "white",
                    border:
                      "1px solid #e2e8f0",
                  }}
                />

                <div
                  style={{
                    marginTop:
                      "20px",
                    display:
                      "flex",
                    justifyContent:
                      "center",
                    gap: "10px",
                    flexWrap:
                      "wrap",
                  }}
                >
                  <button
                    onClick={
                      solveImage
                    }
                    disabled={
                      loading
                    }
                    style={{
                      border:
                        "none",
                      background:
                        loading
                          ? "#94a3b8"
                          : "#16a34a",
                      color:
                        "white",
                      padding:
                        "13px 24px",
                      borderRadius:
                        "10px",
                      cursor:
                        loading
                          ? "not-allowed"
                          : "pointer",
                      fontWeight:
                        "700",
                      fontSize:
                        "15px",
                    }}
                  >
                    {loading
                      ? `Reading Image... ${progress}%`
                      : "🧮 Solve All Problems"}
                  </button>

                  <button
                    onClick={
                      removeImage
                    }
                    style={{
                      border:
                        "1px solid #cbd5e1",
                      background:
                        "white",
                      color:
                        "#334155",
                      padding:
                        "13px 20px",
                      borderRadius:
                        "10px",
                      cursor:
                        "pointer",
                      fontWeight:
                        "700",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </>
            )}
          </div>

          {loading && (
            <div
              style={{
                marginTop:
                  "24px",
                padding:
                  "18px",
                borderRadius:
                  "12px",
                background:
                  "#eff6ff",
                color:
                  "#1d4ed8",
                textAlign:
                  "center",
                fontWeight:
                  "600",
              }}
            >
              Reading your
              image...{" "}
              {progress}%
            </div>
          )}

          {error && (
            <div
              style={{
                marginTop:
                  "24px",
                padding:
                  "16px",
                borderRadius:
                  "12px",
                background:
                  "#fef2f2",
                border:
                  "1px solid #fecaca",
                color:
                  "#b91c1c",
                fontWeight:
                  "600",
              }}
            >
              {error}
            </div>
          )}

          {problems.length > 0 && (
            <div
              style={{
                marginTop:
                  "35px",
              }}
            >
              <h2
                style={{
                  marginBottom:
                    "18px",
                  color:
                    "#0f172a",
                }}
              >
                Solved Problems (
                {problems.length})
              </h2>

              <div
                style={{
                  display:
                    "grid",
                  gridTemplateColumns:
                    "repeat(auto-fit, minmax(300px, 1fr))",
                  gap:
                    "18px",
                }}
              >
                {problems.map(
                  (problem) => (
                    <div
                      key={
                        problem.id
                      }
                      style={{
                        background:
                          "#ffffff",
                        border:
                          "1px solid #e2e8f0",
                        borderRadius:
                          "16px",
                        padding:
                          "20px",
                        boxShadow:
                          "0 5px 18px rgba(15, 23, 42, 0.05)",
                      }}
                    >
                      <div
                        style={{
                          fontSize:
                            "13px",
                          color:
                            "#64748b",
                          marginBottom:
                            "8px",
                          fontWeight:
                            "700",
                        }}
                      >
                        Problem{" "}
                        {
                          problem.id
                        }
                      </div>

                      <div
                        style={{
                          fontSize:
                            "20px",
                          fontWeight:
                            "700",
                          color:
                            "#0f172a",
                          marginBottom:
                            "14px",
                          wordBreak:
                            "break-word",
                        }}
                      >
                        {
                          problem.original
                        }
                      </div>

                      <div
                        style={{
                          borderRadius:
                            "12px",
                          padding:
                            "14px",
                          background:
                            problem.success
                              ? "#f0fdf4"
                              : "#fef2f2",
                          color:
                            problem.success
                              ? "#15803d"
                              : "#b91c1c",
                        }}
                      >
                        <div
                          style={{
                            fontSize:
                              "12px",
                            fontWeight:
                              "700",
                            marginBottom:
                              "4px",
                          }}
                        >
                          ANSWER
                        </div>

                        <div
                          style={{
                            fontSize:
                              "24px",
                            fontWeight:
                              "800",
                          }}
                        >
                          {
                            problem.result
                          }
                        </div>
                      </div>

                      {problem.steps
                        ?.length > 0 && (
                        <div
                          style={{
                            marginTop:
                              "18px",
                            padding:
                              "16px",
                            background:
                              "#f8fafc",
                            borderRadius:
                              "12px",
                            border:
                              "1px solid #e2e8f0",
                          }}
                        >
                          <div
                            style={{
                              fontWeight:
                                "800",
                              color:
                                "#334155",
                              marginBottom:
                                "10px",
                            }}
                          >
                            📚 Step-by-Step
                          </div>

                          <ol
                            style={{
                              margin: 0,
                              paddingLeft:
                                "20px",
                              color:
                                "#475569",
                              lineHeight:
                                "1.7",
                            }}
                          >
                            {problem.steps.map(
                              (
                                step,
                                index
                              ) => (
                                <li
                                  key={
                                    index
                                  }
                                  style={{
                                    marginBottom:
                                      "7px",
                                  }}
                                >
                                  {
                                    step
                                  }
                                </li>
                              )
                            )}
                          </ol>
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {ocrText && (
            <div
              style={{
                marginTop:
                  "30px",
              }}
            >
              <button
                onClick={() =>
                  setShowText(
                    !showText
                  )
                }
                style={{
                  border:
                    "none",
                  background:
                    "transparent",
                  color:
                    "#2563eb",
                  cursor:
                    "pointer",
                  fontWeight:
                    "700",
                  padding: 0,
                }}
              >
                {showText
                  ? "▲ Hide detected text"
                  : "▼ Show detected text"}
              </button>

              {showText && (
                <pre
                  style={{
                    marginTop:
                      "12px",
                    padding:
                      "16px",
                    background:
                      "#0f172a",
                    color:
                      "#e2e8f0",
                    borderRadius:
                      "12px",
                    overflowX:
                      "auto",
                    whiteSpace:
                      "pre-wrap",
                  }}
                >
                  {ocrText}
                </pre>
              )}
            </div>
          )}

          <div
            style={{
              marginTop:
                "30px",
              padding:
                "18px",
              borderRadius:
                "14px",
              background:
                "#f8fafc",
              border:
                "1px solid #e2e8f0",
              color:
                "#64748b",
              fontSize:
                "14px",
              lineHeight:
                "1.7",
            }}
          >
            <strong
              style={{
                color:
                  "#334155",
              }}
            >
              Try these examples:
            </strong>

            <br />
            25 + 15

            <br />
            √144

            <br />
            25% of 200

            <br />
            2x + 5 = 15

            <br />
            x / 4 = 6

            <br />
            x² + 5x + 6 = 0

            <br />
            x2 + 5x + 6 = 0

            <br />
            x^2 - 5x + 6 = 0

            <br />
            2x2 + 7x + 3 = 0
          </div>
        </div>
      </div>
    </div>
  );
}