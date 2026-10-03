import { useState } from "react";
import "./PercentageChangeCalculator.css";

function PercentageChangeCalculator() {
  const [originalValue, setOriginalValue] = useState("");
  const [newValue, setNewValue] = useState("");
  const [result, setResult] = useState(null);

  const calculatePercentageChange = () => {
    const original = Number(originalValue);
    const newAmount = Number(newValue);

    if (!originalValue || !newValue || original === 0) {
      setResult(null);
      return;
    }

    const difference = newAmount - original;
    const percentageChange = (difference / original) * 100;

    setResult({
      percentageChange,
      difference,
      original,
      newAmount,
    });
  };

  const clearCalculator = () => {
    setOriginalValue("");
    setNewValue("");
    setResult(null);
  };

  return (
    <div className="percentage-change-page">
      <div className="percentage-change-container">

        <div className="percentage-change-breadcrumb">
          <a href="/">Home</a>
          <span>→</span>
          <span>Percentage Change Calculator</span>
        </div>

        <div className="percentage-change-header">
          <div className="percentage-change-icon">📊</div>

          <div className="percentage-change-badge">
            FREE ONLINE TOOL
          </div>

          <h1>Percentage Change Calculator</h1>

          <p>
            Calculate the percentage increase or decrease between
            two values quickly and accurately.
          </p>
        </div>

        <div className="percentage-change-card">

          <div className="percentage-change-input-grid">

            <div className="percentage-change-input-group">
              <label>Original Value</label>
              <input
                type="number"
                placeholder="e.g. 100"
                value={originalValue}
                onChange={(e) => setOriginalValue(e.target.value)}
              />
            </div>

            <div className="percentage-change-input-group">
              <label>New Value</label>
              <input
                type="number"
                placeholder="e.g. 125"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
            </div>

          </div>

          <div className="percentage-change-buttons">
            <button
              className="percentage-change-calculate-btn"
              onClick={calculatePercentageChange}
            >
              Calculate Percentage Change
            </button>

            <button
              className="percentage-change-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>
          </div>

          {result && (
            <div className="percentage-change-result">

              <div className="percentage-change-result-main">
                <span>Percentage Change</span>

                <strong>
                  {result.percentageChange >= 0 ? "+" : ""}
                  {result.percentageChange.toFixed(2)}%
                </strong>

                <small>
                  {result.percentageChange > 0
                    ? "Percentage Increase"
                    : result.percentageChange < 0
                    ? "Percentage Decrease"
                    : "No Change"}
                </small>
              </div>

              <div className="percentage-change-summary">

                <div>
                  <span>Original Value</span>
                  <strong>
                    {result.original.toLocaleString()}
                  </strong>
                </div>

                <div>
                  <span>New Value</span>
                  <strong>
                    {result.newAmount.toLocaleString()}
                  </strong>
                </div>

                <div>
                  <span>Difference</span>
                  <strong>
                    {result.difference >= 0 ? "+" : ""}
                    {result.difference.toLocaleString()}
                  </strong>
                </div>

              </div>

            </div>
          )}
        </div>

        <div className="percentage-change-info">

          <h2>How to Use the Percentage Change Calculator</h2>

          <ol>
            <li>Enter the original value.</li>
            <li>Enter the new value.</li>
            <li>Click "Calculate Percentage Change".</li>
            <li>View the percentage increase or decrease.</li>
          </ol>

          <div className="percentage-change-note">
            <strong>Formula:</strong>
            <br />
            Percentage Change = ((New Value − Original Value) ÷
            Original Value) × 100
          </div>

        </div>

        <div className="percentage-change-back">
          <a href="/">← Back to CALVORO</a>
        </div>

      </div>
    </div>
  );
}

export default PercentageChangeCalculator;