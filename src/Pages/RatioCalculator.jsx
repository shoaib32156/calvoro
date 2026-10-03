import { useState } from "react";
import "./RatioCalculator.css";

function RatioCalculator() {
  const [valueA, setValueA] = useState("");
  const [valueB, setValueB] = useState("");
  const [valueC, setValueC] = useState("");
  const [result, setResult] = useState(null);

  const calculateRatio = () => {
    const a = Number(valueA);
    const b = Number(valueB);
    const c = Number(valueC);

    if (
      valueA === "" ||
      valueB === "" ||
      valueC === "" ||
      a === 0 ||
      b === 0 ||
      c === 0
    ) {
      setResult(null);
      return;
    }

    const gcd = (x, y) => {
      x = Math.abs(x);
      y = Math.abs(y);

      while (y !== 0) {
        const temp = y;
        y = x % y;
        x = temp;
      }

      return x;
    };

    const ratioGcd = gcd(gcd(a, b), c);

    const simplifiedA = a / ratioGcd;
    const simplifiedB = b / ratioGcd;
    const simplifiedC = c / ratioGcd;

    const total = a + b + c;

    const percentageA = (a / total) * 100;
    const percentageB = (b / total) * 100;
    const percentageC = (c / total) * 100;

    setResult({
      a: simplifiedA,
      b: simplifiedB,
      c: simplifiedC,
      percentageA,
      percentageB,
      percentageC,
      total,
    });
  };

  const clearCalculator = () => {
    setValueA("");
    setValueB("");
    setValueC("");
    setResult(null);
  };

  return (
    <div className="ratio-page">
      <div className="ratio-container">

        <div className="ratio-breadcrumb">
          <a href="/">Home</a>
          <span>→</span>
          <span>Ratio Calculator</span>
        </div>

        <div className="ratio-header">
          <div className="ratio-icon">⚖️</div>

          <div className="ratio-badge">
            FREE ONLINE TOOL
          </div>

          <h1>Ratio Calculator</h1>

          <p>
            Simplify ratios and calculate the percentage share of
            each value quickly and accurately.
          </p>
        </div>

        <div className="ratio-card">

          <div className="ratio-input-grid">

            <div className="ratio-input-group">
              <label>Value A</label>

              <input
                type="number"
                placeholder="Enter first value"
                value={valueA}
                onChange={(e) => setValueA(e.target.value)}
              />
            </div>

            <div className="ratio-separator">:</div>

            <div className="ratio-input-group">
              <label>Value B</label>

              <input
                type="number"
                placeholder="Enter second value"
                value={valueB}
                onChange={(e) => setValueB(e.target.value)}
              />
            </div>

            <div className="ratio-separator">:</div>

            <div className="ratio-input-group">
              <label>Value C</label>

              <input
                type="number"
                placeholder="Enter third value"
                value={valueC}
                onChange={(e) => setValueC(e.target.value)}
              />
            </div>

          </div>

          <div className="ratio-buttons">

            <button
              className="ratio-calculate-btn"
              onClick={calculateRatio}
            >
              Calculate Ratio
            </button>

            <button
              className="ratio-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {result && (
            <div className="ratio-result">

              <div className="ratio-result-main">
                <span>Simplified Ratio</span>

                <strong>
                  {result.a} : {result.b} : {result.c}
                </strong>
              </div>

              <div className="ratio-summary">

                <div>
                  <span>Value A Share</span>
                  <strong>
                    {result.percentageA.toFixed(2)}%
                  </strong>
                </div>

                <div>
                  <span>Value B Share</span>
                  <strong>
                    {result.percentageB.toFixed(2)}%
                  </strong>
                </div>

                <div>
                  <span>Value C Share</span>
                  <strong>
                    {result.percentageC.toFixed(2)}%
                  </strong>
                </div>

                <div>
                  <span>Total</span>
                  <strong>
                    {result.total}
                  </strong>
                </div>

              </div>

            </div>
          )}

        </div>

        <div className="ratio-info">

          <h2>How to Use the Ratio Calculator</h2>

          <ol>
            <li>Enter the first value.</li>
            <li>Enter the second value.</li>
            <li>Enter the third value.</li>
            <li>Click "Calculate Ratio".</li>
            <li>View the simplified ratio and percentage shares.</li>
          </ol>

          <div className="ratio-note">
            <strong>Formula:</strong>
            <br />
            Simplified Ratio = Values divided by their greatest
            common divisor (GCD).
            <br />
            <br />
            Percentage Share = Individual Value ÷ Total × 100
          </div>

        </div>

        <div className="ratio-back">
          <a href="/">← Back to CALVORO</a>
        </div>

      </div>
    </div>
  );
}

export default RatioCalculator;