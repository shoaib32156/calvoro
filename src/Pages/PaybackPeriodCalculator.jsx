import { useState } from "react";
import "./PaybackPeriodCalculator.css";

function PaybackPeriodCalculator() {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [annualCashFlow, setAnnualCashFlow] = useState("");
  const [result, setResult] = useState(null);

  const calculatePayback = () => {
    const investment = parseFloat(initialInvestment);
    const cashFlow = parseFloat(annualCashFlow);

    if (
      Number.isNaN(investment) ||
      Number.isNaN(cashFlow) ||
      investment <= 0 ||
      cashFlow <= 0
    ) {
      alert("Please enter valid values.");
      return;
    }

    const paybackYears = investment / cashFlow;
    const fullYears = Math.floor(paybackYears);
    const remainingMonths = Math.round(
      (paybackYears - fullYears) * 12
    );

    setResult({
      investment,
      cashFlow,
      paybackYears,
      fullYears,
      remainingMonths,
    });
  };

  const clearCalculator = () => {
    setInitialInvestment("");
    setAnnualCashFlow("");
    setResult(null);
  };

  const formatNumber = (value) => {
    return value.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="payback-page">

      <div className="payback-container">

        {/* BREADCRUMB */}
        <div className="payback-breadcrumb">
          <a href="/">CALVORO</a>
          <span> / Payback Period Calculator</span>
        </div>

        {/* HEADER */}
        <div className="payback-header">

          <div className="payback-icon">
            ⏱️
          </div>

          <div className="payback-badge">
            FREE ONLINE TOOL
          </div>

          <h1>
            Payback Period Calculator
          </h1>

          <p>
            Calculate how long it will take to
            recover your initial investment.
          </p>

        </div>

        {/* CALCULATOR CARD */}
        <div className="payback-card">

          <div className="payback-input-grid">

            <div className="payback-input-group">

              <label>
                Initial Investment
              </label>

              <input
                type="number"
                min="0"
                step="any"
                placeholder="Example: 50000"
                value={initialInvestment}
                onChange={(e) => {
                  setInitialInvestment(e.target.value);
                  setResult(null);
                }}
              />

            </div>

            <div className="payback-input-group">

              <label>
                Annual Cash Flow
              </label>

              <input
                type="number"
                min="0"
                step="any"
                placeholder="Example: 10000"
                value={annualCashFlow}
                onChange={(e) => {
                  setAnnualCashFlow(e.target.value);
                  setResult(null);
                }}
              />

            </div>

          </div>

          {/* BUTTONS */}
          <div className="payback-buttons">

            <button
              className="payback-calculate-btn"
              onClick={calculatePayback}
            >
              Calculate Payback
            </button>

            <button
              className="payback-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {/* RESULT */}
          {result && (
            <div className="payback-result">

              <div className="payback-result-title">
                <span>⏱️</span>

                <h2>
                  Payback Result
                </h2>
              </div>

              {/* MAIN RESULT */}
              <div className="payback-main-result">

                <span>
                  Payback Period
                </span>

                <strong>
                  {result.paybackYears.toFixed(2)} years
                </strong>

              </div>

              {/* SUMMARY */}
              <div className="payback-summary">

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
                    Annual Cash Flow
                  </span>

                  <strong>
                    {formatNumber(result.cashFlow)}
                  </strong>
                </div>

                <div>
                  <span>
                    Approx. Recovery
                  </span>

                  <strong>
                    {result.fullYears} years{" "}
                    {result.remainingMonths} months
                  </strong>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* INFORMATION */}
        <div className="payback-info">

          <h2>
            How to use the Payback Period Calculator
          </h2>

          <div className="payback-steps">

            <div className="payback-step">

              <b>1</b>

              <div>
                <h3>
                  Enter your investment
                </h3>

                <p>
                  Enter the amount initially
                  invested in the project or business.
                </p>
              </div>

            </div>

            <div className="payback-step">

              <b>2</b>

              <div>
                <h3>
                  Enter annual cash flow
                </h3>

                <p>
                  Enter the amount of cash generated
                  by the investment each year.
                </p>
              </div>

            </div>

            <div className="payback-step">

              <b>3</b>

              <div>
                <h3>
                  Calculate payback period
                </h3>

                <p>
                  CALVORO calculates the approximate
                  time required to recover your investment.
                </p>
              </div>

            </div>

          </div>

          {/* FORMULA */}
          <div className="payback-note">
            <strong>Formula:</strong>{" "}
            Payback Period = Initial Investment
            ÷ Annual Cash Flow.
          </div>

        </div>

        {/* BACK */}
        <div className="payback-back">
          <a href="/">
            ← Back to CALVORO
          </a>
        </div>

      </div>

    </div>
  );
}

export default PaybackPeriodCalculator;