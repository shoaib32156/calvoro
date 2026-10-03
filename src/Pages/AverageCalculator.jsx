import { useState } from "react";
import "./AverageCalculator.css";

function AverageCalculator() {
  const [values, setValues] = useState("");
  const [result, setResult] = useState(null);

  const calculateAverage = () => {
    const numbers = values
      .split(",")
      .map((value) => Number(value.trim()))
      .filter((value) => !Number.isNaN(value));

    if (numbers.length === 0) {
      setResult(null);
      return;
    }

    const total = numbers.reduce((sum, value) => sum + value, 0);
    const average = total / numbers.length;
    const minimum = Math.min(...numbers);
    const maximum = Math.max(...numbers);

    setResult({
      average,
      total,
      count: numbers.length,
      minimum,
      maximum,
    });
  };

  const clearCalculator = () => {
    setValues("");
    setResult(null);
  };

  return (
    <div className="average-page">
      <div className="average-container">

        <div className="average-breadcrumb">
          <a href="/">Home</a>
          <span>→</span>
          <span>Average Calculator</span>
        </div>

        <div className="average-header">
          <div className="average-icon">📊</div>

          <div className="average-badge">
            FREE ONLINE TOOL
          </div>

          <h1>Average Calculator</h1>

          <p>
            Calculate the average, total, minimum, and maximum
            of a list of numbers quickly and easily.
          </p>
        </div>

        <div className="average-card">

          <div className="average-input-group">
            <label>Enter Numbers</label>

            <textarea
              placeholder="Example: 10, 20, 30, 40, 50"
              value={values}
              onChange={(e) => setValues(e.target.value)}
              rows="5"
            />

            <small>
              Enter numbers separated by commas.
            </small>
          </div>

          <div className="average-buttons">
            <button
              className="average-calculate-btn"
              onClick={calculateAverage}
            >
              Calculate Average
            </button>

            <button
              className="average-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>
          </div>

          {result && (
            <div className="average-result">

              <div className="average-result-main">
                <span>Average</span>

                <strong>
                  {result.average.toFixed(2)}
                </strong>

                <small>
                  Mean of all entered values
                </small>
              </div>

              <div className="average-summary">

                <div>
                  <span>Total</span>
                  <strong>
                    {result.total.toLocaleString()}
                  </strong>
                </div>

                <div>
                  <span>Number of Values</span>
                  <strong>
                    {result.count}
                  </strong>
                </div>

                <div>
                  <span>Minimum</span>
                  <strong>
                    {result.minimum.toLocaleString()}
                  </strong>
                </div>

                <div>
                  <span>Maximum</span>
                  <strong>
                    {result.maximum.toLocaleString()}
                  </strong>
                </div>

              </div>

            </div>
          )}
        </div>

        <div className="average-info">

          <h2>How to Use the Average Calculator</h2>

          <ol>
            <li>Enter your numbers separated by commas.</li>
            <li>Click "Calculate Average".</li>
            <li>View the average and other statistics.</li>
          </ol>

          <div className="average-note">
            <strong>Formula:</strong>
            <br />
            Average = Total of all values ÷ Number of values
          </div>

        </div>

        <div className="average-back">
          <a href="/">← Back to CALVORO</a>
        </div>

      </div>
    </div>
  );
}

export default AverageCalculator;