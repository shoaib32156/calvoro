import { useState } from "react";
import "./FractionCalculator.css";

function FractionCalculator() {
  const [numerator1, setNumerator1] = useState("");
  const [denominator1, setDenominator1] = useState("");
  const [numerator2, setNumerator2] = useState("");
  const [denominator2, setDenominator2] = useState("");
  const [operation, setOperation] = useState("+");
  const [result, setResult] = useState(null);

  const gcd = (a, b) => {
    a = Math.abs(a);
    b = Math.abs(b);

    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }

    return a;
  };

  const simplifyFraction = (numerator, denominator) => {
    if (denominator === 0) {
      return null;
    }

    const divisor = gcd(numerator, denominator);

    let simplifiedNumerator = numerator / divisor;
    let simplifiedDenominator = denominator / divisor;

    if (simplifiedDenominator < 0) {
      simplifiedNumerator *= -1;
      simplifiedDenominator *= -1;
    }

    return {
      numerator: simplifiedNumerator,
      denominator: simplifiedDenominator,
    };
  };

  const calculateFraction = () => {
    const n1 = Number(numerator1);
    const d1 = Number(denominator1);
    const n2 = Number(numerator2);
    const d2 = Number(denominator2);

    if (
      numerator1 === "" ||
      denominator1 === "" ||
      numerator2 === "" ||
      denominator2 === "" ||
      d1 === 0 ||
      d2 === 0
    ) {
      setResult(null);
      return;
    }

    let resultNumerator;
    let resultDenominator;

    if (operation === "+") {
      resultNumerator = n1 * d2 + n2 * d1;
      resultDenominator = d1 * d2;
    } else if (operation === "-") {
      resultNumerator = n1 * d2 - n2 * d1;
      resultDenominator = d1 * d2;
    } else if (operation === "×") {
      resultNumerator = n1 * n2;
      resultDenominator = d1 * d2;
    } else {
      if (n2 === 0) {
        setResult(null);
        return;
      }

      resultNumerator = n1 * d2;
      resultDenominator = d1 * n2;
    }

    const simplified = simplifyFraction(
      resultNumerator,
      resultDenominator
    );

    if (!simplified) {
      setResult(null);
      return;
    }

    const decimal = simplified.numerator / simplified.denominator;

    setResult({
      numerator: simplified.numerator,
      denominator: simplified.denominator,
      decimal,
    });
  };

  const clearCalculator = () => {
    setNumerator1("");
    setDenominator1("");
    setNumerator2("");
    setDenominator2("");
    setOperation("+");
    setResult(null);
  };

  return (
    <div className="fraction-page">
      <div className="fraction-container">

        <div className="fraction-breadcrumb">
          <a href="/">Home</a>
          <span>→</span>
          <span>Fraction Calculator</span>
        </div>

        <div className="fraction-header">
          <div className="fraction-icon">➗</div>

          <div className="fraction-badge">
            FREE ONLINE TOOL
          </div>

          <h1>Fraction Calculator</h1>

          <p>
            Add, subtract, multiply, and divide fractions with
            simplified results instantly.
          </p>
        </div>

        <div className="fraction-card">

          <div className="fraction-calculation">

            <div className="fraction-input">
              <input
                type="number"
                placeholder="Numerator"
                value={numerator1}
                onChange={(e) => setNumerator1(e.target.value)}
              />

              <div className="fraction-line"></div>

              <input
                type="number"
                placeholder="Denominator"
                value={denominator1}
                onChange={(e) => setDenominator1(e.target.value)}
              />
            </div>

            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
            >
              <option value="+">+</option>
              <option value="-">−</option>
              <option value="×">×</option>
              <option value="÷">÷</option>
            </select>

            <div className="fraction-input">
              <input
                type="number"
                placeholder="Numerator"
                value={numerator2}
                onChange={(e) => setNumerator2(e.target.value)}
              />

              <div className="fraction-line"></div>

              <input
                type="number"
                placeholder="Denominator"
                value={denominator2}
                onChange={(e) => setDenominator2(e.target.value)}
              />
            </div>

          </div>

          <div className="fraction-buttons">

            <button
              className="fraction-calculate-btn"
              onClick={calculateFraction}
            >
              Calculate Fraction
            </button>

            <button
              className="fraction-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {result && (
            <div className="fraction-result">

              <div className="fraction-result-main">
                <span>Simplified Result</span>

                <strong>
                  {result.numerator} / {result.denominator}
                </strong>

                <small>
                  Decimal: {result.decimal.toFixed(4)}
                </small>
              </div>

              <div className="fraction-summary">

                <div>
                  <span>Numerator</span>
                  <strong>{result.numerator}</strong>
                </div>

                <div>
                  <span>Denominator</span>
                  <strong>{result.denominator}</strong>
                </div>

                <div>
                  <span>Decimal</span>
                  <strong>{result.decimal.toFixed(4)}</strong>
                </div>

              </div>

            </div>
          )}

        </div>

        <div className="fraction-info">

          <h2>How to Use the Fraction Calculator</h2>

          <ol>
            <li>Enter the numerator and denominator of the first fraction.</li>
            <li>Choose an operation.</li>
            <li>Enter the second fraction.</li>
            <li>Click "Calculate Fraction".</li>
            <li>View the simplified fraction and decimal result.</li>
          </ol>

          <div className="fraction-note">
            <strong>Operations:</strong>
            <br />
            Addition: a/b + c/d = (ad + bc) / bd
            <br />
            Subtraction: a/b − c/d = (ad − bc) / bd
            <br />
            Multiplication: a/b × c/d = ac / bd
            <br />
            Division: a/b ÷ c/d = ad / bc
          </div>

        </div>

        <div className="fraction-back">
          <a href="/">← Back to CALVORO</a>
        </div>

      </div>
    </div>
  );
}

export default FractionCalculator;