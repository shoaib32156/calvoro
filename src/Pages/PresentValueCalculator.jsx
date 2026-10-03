import { useState } from "react";
import "./PresentValueCalculator.css";

function PresentValueCalculator() {
  const [futureValue, setFutureValue] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);

  const calculatePresentValue = () => {
    const fv = Number(futureValue);
    const rate = Number(interestRate);
    const period = Number(years);

    if (!fv || fv <= 0 || rate < 0 || period <= 0) {
      alert("Please enter valid values.");
      return;
    }

    const presentValue = fv / Math.pow(1 + rate / 100, period);
    const discount = fv - presentValue;
    const discountPercentage = (discount / fv) * 100;

    setResult({
      presentValue,
      futureValue: fv,
      interestRate: rate,
      years: period,
      discount,
      discountPercentage,
    });
  };

  const clearCalculator = () => {
    setFutureValue("");
    setInterestRate("");
    setYears("");
    setResult(null);
  };

  return (
    <div className="present-value-page">
      <div className="present-value-container">

        <div className="present-value-breadcrumb">
          <a href="/">Home</a>
          <span>›</span>
          <span>Present Value Calculator</span>
        </div>

        <div className="present-value-header">
          <div className="present-value-icon">💵</div>

          <div className="present-value-badge">
            FREE ONLINE TOOL
          </div>

          <h1>Present Value Calculator</h1>

          <p>
            Calculate the current value of a future amount using an
            interest or discount rate.
          </p>
        </div>

        <div className="present-value-card">

          <div className="present-value-input-grid">

            <div className="present-value-input-group">
              <label>Future Value</label>
              <input
                type="number"
                placeholder="e.g. 10000"
                value={futureValue}
                onChange={(e) => setFutureValue(e.target.value)}
              />
            </div>

            <div className="present-value-input-group">
              <label>Annual Interest Rate (%)</label>
              <input
                type="number"
                placeholder="e.g. 8"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />
            </div>

            <div className="present-value-input-group">
              <label>Number of Years</label>
              <input
                type="number"
                placeholder="e.g. 5"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </div>

          </div>

          <div className="present-value-buttons">
            <button
              className="present-value-calculate-btn"
              onClick={calculatePresentValue}
            >
              Calculate Present Value
            </button>

            <button
              className="present-value-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>
          </div>

          {result && (
            <div className="present-value-result">

              <div className="present-value-result-main">
                <span>Present Value</span>
                <strong>
                  {result.presentValue.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </strong>
              </div>

              <div className="present-value-summary">

                <div>
                  <span>Future Value</span>
                  <strong>
                    {result.futureValue.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </strong>
                </div>

                <div>
                  <span>Discount Amount</span>
                  <strong>
                    {result.discount.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </strong>
                </div>

                <div>
                  <span>Discount Rate</span>
                  <strong>
                    {result.discountPercentage.toFixed(2)}%
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

        <div className="present-value-info">

          <h2>How to use the Present Value Calculator</h2>

          <ol>
            <li>Enter the future amount you expect to receive.</li>
            <li>Enter the annual interest or discount rate.</li>
            <li>Enter the number of years.</li>
            <li>Click "Calculate Present Value".</li>
          </ol>

          <h2>Present Value Formula</h2>

          <p>
            Present Value = Future Value ÷ (1 + Interest Rate)ⁿ
          </p>

          <p className="present-value-note">
            Note: This calculator assumes annual compounding and a
            constant interest rate throughout the entire period.
          </p>

        </div>

        <div className="present-value-back">
          <a href="/">← Back to CALVORO</a>
        </div>

      </div>
    </div>
  );
}

export default PresentValueCalculator;