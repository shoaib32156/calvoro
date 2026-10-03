import { useState } from "react";
import "./SavingsCalculator.css";

function SavingsCalculator() {
  const [initialSavings, setInitialSavings] = useState("");
  const [monthlyDeposit, setMonthlyDeposit] = useState("");
  const [annualInterest, setAnnualInterest] = useState("");
  const [savingsYears, setSavingsYears] = useState("");
  const [result, setResult] = useState(null);

  const calculateSavings = () => {
    const initial = parseFloat(initialSavings);
    const monthly = parseFloat(monthlyDeposit) || 0;
    const interest = parseFloat(annualInterest);
    const years = parseFloat(savingsYears);

    if (
      Number.isNaN(initial) ||
      Number.isNaN(interest) ||
      Number.isNaN(years) ||
      initial < 0 ||
      monthly < 0 ||
      interest < 0 ||
      years <= 0
    ) {
      alert("Please enter valid values.");
      return;
    }

    const months = Math.round(years * 12);
    const monthlyRate = interest / 100 / 12;

    let futureValue;

    if (monthlyRate === 0) {
      futureValue = initial + monthly * months;
    } else {
      const initialGrowth =
        initial * Math.pow(1 + monthlyRate, months);

      const depositGrowth =
        monthly *
        ((Math.pow(1 + monthlyRate, months) - 1) /
          monthlyRate);

      futureValue = initialGrowth + depositGrowth;
    }

    const totalDeposits =
      initial + monthly * months;

    const interestEarned =
      futureValue - totalDeposits;

    setResult({
      futureValue,
      totalDeposits,
      interestEarned,
      initial,
      monthly,
      interest,
      years,
    });
  };

  const clearCalculator = () => {
    setInitialSavings("");
    setMonthlyDeposit("");
    setAnnualInterest("");
    setSavingsYears("");
    setResult(null);
  };

  const formatNumber = (value) => {
    return value.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="savings-page">

      <div className="savings-container">

        {/* BREADCRUMB */}
        <div className="savings-breadcrumb">
          <a href="/">CALVORO</a>
          <span> / Savings Calculator</span>
        </div>

        {/* HEADER */}
        <div className="savings-header">

          <div className="savings-icon">
            💰
          </div>

          <div className="savings-badge">
            FREE ONLINE TOOL
          </div>

          <h1>
            Savings Calculator
          </h1>

          <p>
            Estimate how your savings could grow with
            regular deposits and interest over time.
          </p>

        </div>

        {/* CALCULATOR CARD */}
        <div className="savings-card">

          <div className="savings-input-grid">

            <div className="savings-input-group">

              <label>
                Initial Savings
              </label>

              <input
                type="number"
                min="0"
                step="any"
                placeholder="Example: 10000"
                value={initialSavings}
                onChange={(e) => {
                  setInitialSavings(e.target.value);
                  setResult(null);
                }}
              />

            </div>

            <div className="savings-input-group">

              <label>
                Monthly Deposit
              </label>

              <input
                type="number"
                min="0"
                step="any"
                placeholder="Example: 500"
                value={monthlyDeposit}
                onChange={(e) => {
                  setMonthlyDeposit(e.target.value);
                  setResult(null);
                }}
              />

            </div>

            <div className="savings-input-group">

              <label>
                Annual Interest Rate (%)
              </label>

              <input
                type="number"
                min="0"
                step="any"
                placeholder="Example: 5"
                value={annualInterest}
                onChange={(e) => {
                  setAnnualInterest(e.target.value);
                  setResult(null);
                }}
              />

            </div>

            <div className="savings-input-group">

              <label>
                Savings Period (Years)
              </label>

              <input
                type="number"
                min="1"
                step="any"
                placeholder="Example: 10"
                value={savingsYears}
                onChange={(e) => {
                  setSavingsYears(e.target.value);
                  setResult(null);
                }}
              />

            </div>

          </div>

          {/* BUTTONS */}
          <div className="savings-buttons">

            <button
              className="savings-calculate-btn"
              onClick={calculateSavings}
            >
              Calculate Savings
            </button>

            <button
              className="savings-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {/* RESULT */}
          {result && (
            <div className="savings-result">

              <div className="savings-result-title">
                <span>💰</span>

                <h2>
                  Savings Result
                </h2>
              </div>

              {/* MAIN RESULT */}
              <div className="savings-main-result">

                <span>
                  Estimated Final Savings
                </span>

                <strong>
                  {formatNumber(result.futureValue)}
                </strong>

              </div>

              {/* SUMMARY */}
              <div className="savings-summary">

                <div>
                  <span>
                    Initial Savings
                  </span>

                  <strong>
                    {formatNumber(result.initial)}
                  </strong>
                </div>

                <div>
                  <span>
                    Total Deposits
                  </span>

                  <strong>
                    {formatNumber(result.totalDeposits)}
                  </strong>
                </div>

                <div>
                  <span>
                    Interest Earned
                  </span>

                  <strong>
                    {formatNumber(result.interestEarned)}
                  </strong>
                </div>

              </div>

              {/* DETAILS */}
              <div className="savings-details">

                <div>
                  <span>
                    Monthly Deposit
                  </span>

                  <strong>
                    {formatNumber(result.monthly)}
                  </strong>
                </div>

                <div>
                  <span>
                    Interest Rate
                  </span>

                  <strong>
                    {result.interest}%
                  </strong>
                </div>

                <div>
                  <span>
                    Savings Period
                  </span>

                  <strong>
                    {result.years} years
                  </strong>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* INFORMATION */}
        <div className="savings-info">

          <h2>
            How to use the Savings Calculator
          </h2>

          <div className="savings-steps">

            <div className="savings-step">

              <b>1</b>

              <div>
                <h3>
                  Enter your initial savings
                </h3>

                <p>
                  Enter the amount you already have
                  saved.
                </p>
              </div>

            </div>

            <div className="savings-step">

              <b>2</b>

              <div>
                <h3>
                  Add monthly deposits
                </h3>

                <p>
                  Enter the amount you plan to save
                  every month.
                </p>
              </div>

            </div>

            <div className="savings-step">

              <b>3</b>

              <div>
                <h3>
                  Enter interest rate
                </h3>

                <p>
                  Enter the estimated annual interest
                  rate for your savings.
                </p>
              </div>

            </div>

            <div className="savings-step">

              <b>4</b>

              <div>
                <h3>
                  Enter savings period
                </h3>

                <p>
                  Enter how many years you plan to
                  keep saving.
                </p>
              </div>

            </div>

          </div>

          {/* NOTE */}
          <div className="savings-note">
            <strong>Note:</strong>{" "}
            This calculator provides an estimate using
            a constant annual interest rate and regular
            monthly deposits. Actual savings results
            may vary.
          </div>

        </div>

        {/* BACK */}
        <div className="savings-back">
          <a href="/">
            ← Back to CALVORO
          </a>
        </div>

      </div>

    </div>
  );
}

export default SavingsCalculator;