import { useState } from "react";
import "./InflationCalculator.css";

function InflationCalculator() {
  const [currentAmount, setCurrentAmount] = useState("");
  const [inflationRate, setInflationRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);

  const calculateInflation = () => {
    const amount = parseFloat(currentAmount);
    const rate = parseFloat(inflationRate);
    const period = parseFloat(years);

    if (
      Number.isNaN(amount) ||
      Number.isNaN(rate) ||
      Number.isNaN(period) ||
      amount < 0 ||
      rate < 0 ||
      period <= 0
    ) {
      alert("Please enter valid values.");
      return;
    }

    const futureCost =
      amount * Math.pow(1 + rate / 100, period);

    const totalIncrease =
      futureCost - amount;

    const increasePercentage =
      ((futureCost - amount) / amount) * 100;

    const purchasingPower =
      amount / Math.pow(1 + rate / 100, period);

    setResult({
      amount,
      rate,
      period,
      futureCost,
      totalIncrease,
      increasePercentage,
      purchasingPower,
    });
  };

  const clearCalculator = () => {
    setCurrentAmount("");
    setInflationRate("");
    setYears("");
    setResult(null);
  };

  const formatNumber = (value) => {
    return value.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="inflation-page">

      <div className="inflation-container">

        {/* BREADCRUMB */}
        <div className="inflation-breadcrumb">
          <a href="/">CALVORO</a>
          <span> / Inflation Calculator</span>
        </div>

        {/* HEADER */}
        <div className="inflation-header">

          <div className="inflation-icon">
            📉
          </div>

          <div className="inflation-badge">
            FREE ONLINE TOOL
          </div>

          <h1>
            Inflation Calculator
          </h1>

          <p>
            Estimate how inflation can affect the future
            value and purchasing power of your money.
          </p>

        </div>

        {/* CALCULATOR CARD */}
        <div className="inflation-card">

          <div className="inflation-input-grid">

            <div className="inflation-input-group">

              <label>
                Current Amount
              </label>

              <input
                type="number"
                min="0"
                step="any"
                placeholder="Example: 10000"
                value={currentAmount}
                onChange={(e) => {
                  setCurrentAmount(e.target.value);
                  setResult(null);
                }}
              />

            </div>

            <div className="inflation-input-group">

              <label>
                Annual Inflation Rate (%)
              </label>

              <input
                type="number"
                min="0"
                step="any"
                placeholder="Example: 5"
                value={inflationRate}
                onChange={(e) => {
                  setInflationRate(e.target.value);
                  setResult(null);
                }}
              />

            </div>

            <div className="inflation-input-group">

              <label>
                Number of Years
              </label>

              <input
                type="number"
                min="1"
                step="any"
                placeholder="Example: 10"
                value={years}
                onChange={(e) => {
                  setYears(e.target.value);
                  setResult(null);
                }}
              />

            </div>

          </div>

          {/* BUTTONS */}
          <div className="inflation-buttons">

            <button
              className="inflation-calculate-btn"
              onClick={calculateInflation}
            >
              Calculate Inflation
            </button>

            <button
              className="inflation-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {/* RESULT */}
          {result && (
            <div className="inflation-result">

              <div className="inflation-result-title">
                <span>📉</span>

                <h2>
                  Inflation Result
                </h2>
              </div>

              {/* MAIN RESULT */}
              <div className="inflation-main-result">

                <span>
                  Future Equivalent Cost
                </span>

                <strong>
                  {formatNumber(result.futureCost)}
                </strong>

              </div>

              {/* SUMMARY */}
              <div className="inflation-summary">

                <div>
                  <span>
                    Current Amount
                  </span>

                  <strong>
                    {formatNumber(result.amount)}
                  </strong>
                </div>

                <div>
                  <span>
                    Total Increase
                  </span>

                  <strong>
                    {formatNumber(result.totalIncrease)}
                  </strong>
                </div>

                <div>
                  <span>
                    Cost Increase
                  </span>

                  <strong>
                    {formatNumber(result.increasePercentage)}%
                  </strong>
                </div>

              </div>

              {/* DETAILS */}
              <div className="inflation-details">

                <div>
                  <span>
                    Inflation Rate
                  </span>

                  <strong>
                    {result.rate}%
                  </strong>
                </div>

                <div>
                  <span>
                    Period
                  </span>

                  <strong>
                    {result.period} years
                  </strong>
                </div>

                <div>
                  <span>
                    Purchasing Power
                  </span>

                  <strong>
                    {formatNumber(result.purchasingPower)}
                  </strong>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* INFORMATION */}
        <div className="inflation-info">

          <h2>
            How to use the Inflation Calculator
          </h2>

          <div className="inflation-steps">

            <div className="inflation-step">

              <b>1</b>

              <div>
                <h3>
                  Enter the current amount
                </h3>

                <p>
                  Enter the amount of money or current
                  cost you want to compare.
                </p>
              </div>

            </div>

            <div className="inflation-step">

              <b>2</b>

              <div>
                <h3>
                  Enter the inflation rate
                </h3>

                <p>
                  Enter an estimated average annual
                  inflation rate.
                </p>
              </div>

            </div>

            <div className="inflation-step">

              <b>3</b>

              <div>
                <h3>
                  Enter the number of years
                </h3>

                <p>
                  Enter how many years into the future
                  you want to calculate.
                </p>
              </div>

            </div>

            <div className="inflation-step">

              <b>4</b>

              <div>
                <h3>
                  View the result
                </h3>

                <p>
                  See the estimated future cost and
                  purchasing power of your money.
                </p>
              </div>

            </div>

          </div>

          {/* NOTE */}
          <div className="inflation-note">
            <strong>Note:</strong>{" "}
            This calculator uses a constant annual
            inflation rate for estimation. Actual
            inflation can change from year to year.
          </div>

        </div>

        {/* BACK */}
        <div className="inflation-back">
          <a href="/">
            ← Back to CALVORO
          </a>
        </div>

      </div>

    </div>
  );
}

export default InflationCalculator;