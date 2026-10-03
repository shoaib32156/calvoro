import { useState } from "react";
import "./ROICalculator.css";

function ROICalculator() {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [result, setResult] = useState(null);

  const calculateROI = () => {
    const investment = parseFloat(initialInvestment);
    const finalAmount = parseFloat(finalValue);

    if (
      Number.isNaN(investment) ||
      Number.isNaN(finalAmount) ||
      investment <= 0 ||
      finalAmount < 0
    ) {
      alert("Please enter valid values.");
      return;
    }

    const profit = finalAmount - investment;

    const roi = (profit / investment) * 100;

    setResult({
      investment,
      finalAmount,
      profit,
      roi,
    });
  };

  const clearCalculator = () => {
    setInitialInvestment("");
    setFinalValue("");
    setResult(null);
  };

  const formatNumber = (value) => {
    return value.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="roi-page">

      <div className="roi-container">

        {/* BREADCRUMB */}
        <div className="roi-breadcrumb">
          <a href="/">CALVORO</a>
          <span> / ROI Calculator</span>
        </div>

        {/* HEADER */}
        <div className="roi-header">

          <div className="roi-icon">
            📈
          </div>

          <div className="roi-badge">
            FREE ONLINE TOOL
          </div>

          <h1>
            ROI Calculator
          </h1>

          <p>
            Calculate your return on investment,
            profit or loss, and ROI percentage.
          </p>

        </div>

        {/* CALCULATOR CARD */}
        <div className="roi-card">

          <div className="roi-input-grid">

            <div className="roi-input-group">

              <label>
                Initial Investment
              </label>

              <input
                type="number"
                min="0"
                step="any"
                placeholder="Example: 10000"
                value={initialInvestment}
                onChange={(e) => {
                  setInitialInvestment(e.target.value);
                  setResult(null);
                }}
              />

            </div>

            <div className="roi-input-group">

              <label>
                Final Value
              </label>

              <input
                type="number"
                min="0"
                step="any"
                placeholder="Example: 12500"
                value={finalValue}
                onChange={(e) => {
                  setFinalValue(e.target.value);
                  setResult(null);
                }}
              />

            </div>

          </div>

          {/* BUTTONS */}
          <div className="roi-buttons">

            <button
              className="roi-calculate-btn"
              onClick={calculateROI}
            >
              Calculate ROI
            </button>

            <button
              className="roi-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {/* RESULT */}
          {result && (
            <div className="roi-result">

              <div className="roi-result-title">
                <span>📈</span>

                <h2>
                  ROI Result
                </h2>
              </div>

              {/* MAIN RESULT */}
              <div className="roi-main-result">

                <span>
                  Return on Investment
                </span>

                <strong>
                  {result.roi.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}
                  %
                </strong>

              </div>

              {/* SUMMARY */}
              <div className="roi-summary">

                <div>
                  <span>
                    Initial Investment
                  </span>

                  <strong>
                    {formatNumber(result.investment)}
                  </strong>
                </div>

                <div>
                  <span>
                    Final Value
                  </span>

                  <strong>
                    {formatNumber(result.finalAmount)}
                  </strong>
                </div>

                <div>
                  <span>
                    Profit / Loss
                  </span>

                  <strong>
                    {formatNumber(result.profit)}
                  </strong>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* INFORMATION */}
        <div className="roi-info">

          <h2>
            How to use the ROI Calculator
          </h2>

          <div className="roi-steps">

            <div className="roi-step">

              <b>1</b>

              <div>
                <h3>
                  Enter your investment
                </h3>

                <p>
                  Enter the amount you originally
                  invested.
                </p>
              </div>

            </div>

            <div className="roi-step">

              <b>2</b>

              <div>
                <h3>
                  Enter the final value
                </h3>

                <p>
                  Enter the current or final value
                  of your investment.
                </p>
              </div>

            </div>

            <div className="roi-step">

              <b>3</b>

              <div>
                <h3>
                  Calculate ROI
                </h3>

                <p>
                  CALVORO calculates your return,
                  profit or loss, and ROI percentage.
                </p>
              </div>

            </div>

          </div>

          {/* FORMULA */}
          <div className="roi-note">
            <strong>Formula:</strong>{" "}
            ROI = (Final Value − Initial Investment)
            ÷ Initial Investment × 100.
          </div>

        </div>

        {/* BACK */}
        <div className="roi-back">
          <a href="/">
            ← Back to CALVORO
          </a>
        </div>

      </div>

    </div>
  );
}

export default ROICalculator;