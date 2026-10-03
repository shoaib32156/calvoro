import { useState } from "react";
import "./FutureValueCalculator.css";

function FutureValueCalculator() {
  const [presentValue, setPresentValue] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);

  const calculateFutureValue = () => {
    const pv = Number(presentValue);
    const rate = Number(interestRate);
    const period = Number(years);

    if (!pv || pv <= 0 || rate < 0 || period <= 0) {
      alert("Please enter valid values.");
      return;
    }

    const futureValue = pv * Math.pow(1 + rate / 100, period);
    const growth = futureValue - pv;
    const growthPercentage = (growth / pv) * 100;

    setResult({
      futureValue,
      presentValue: pv,
      interestRate: rate,
      years: period,
      growth,
      growthPercentage,
    });
  };

  const clearCalculator = () => {
    setPresentValue("");
    setInterestRate("");
    setYears("");
    setResult(null);
  };

  return (
    <div className="future-value-page">
      <div className="future-value-container">

        <div className="future-value-breadcrumb">
          <a href="/">Home</a>
          <span>›</span>
          <span>Future Value Calculator</span>
        </div>

        <div className="future-value-header">
          <div className="future-value-icon">📈</div>

          <div className="future-value-badge">
            FREE ONLINE TOOL
          </div>

          <h1>Future Value Calculator</h1>

          <p>
            Calculate how much a current amount could grow to in the
            future using an annual interest rate.
          </p>
        </div>

        <div className="future-value-card">

          <div className="future-value-input-grid">

            <div className="future-value-input-group">
              <label>Present Value</label>
              <input
                type="number"
                placeholder="e.g. 10000"
                value={presentValue}
                onChange={(e) => setPresentValue(e.target.value)}
              />
            </div>

            <div className="future-value-input-group">
              <label>Annual Interest Rate (%)</label>
              <input
                type="number"
                placeholder="e.g. 8"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>

            <div className="future-value-input-group">
              <label>Number of Years</label>
              <input
                type="number"
                placeholder="e.g. 5"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </div>

          </div>

          <div className="future-value-buttons">
            <button
              className="future-value-calculate-btn"
              onClick={calculateFutureValue}
            >
              Calculate Future Value
            </button>

            <button
              className="future-value-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>
          </div>

          {result && (
            <div className="future-value-result">

              <div className="future-value-result-main">
                <span>Future Value</span>
                <strong>
                  {result.futureValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </strong>
              </div>

              <div className="future-value-summary">

                <div>
                  <span>Present Value</span>
                  <strong>
                    {result.presentValue.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </strong>
                </div>

                <div>
                  <span>Total Growth</span>
                  <strong>
                    {result.growth.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </strong>
                </div>

                <div>
                  <span>Growth</span>
                  <strong>
                    {result.growthPercentage.toFixed(2)}%
                  </strong>
                </div>

                <div>
                  <span>Interest Rate</span>
                  <strong>
                    {result.interestRate.toFixed(2)}%
                  </strong>
                </div>

                <div>
                  <span>Period</span>
                  <strong>
                    {result.years} years
                  </strong>
                </div>

              </div>
            </div>
          )}

        </div>

        <div className="future-value-info">

          <h2>How to use the Future Value Calculator</h2>

          <ol>
            <li>Enter the amount you have today.</li>
            <li>Enter the annual interest rate.</li>
            <li>Enter the number of years.</li>
            <li>Click "Calculate Future Value".</li>
          </ol>

          <h2>Future Value Formula</h2>

          <p>
            Future Value = Present Value × (1 + Interest Rate)ⁿ
          </p>

          <p className="future-value-note">
            Note: This calculator assumes annual compounding and a
            constant interest rate throughout the entire period.
          </p>

        </div>

        <div className="future-value-back">
          <a href="/">← Back to CALVORO</a>
        </div>

      </div>
    </div>
  );
}

export default FutureValueCalculator;