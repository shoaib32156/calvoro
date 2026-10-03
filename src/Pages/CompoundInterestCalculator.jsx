import { useState } from "react";
import "./CompoundInterestCalculator.css";

function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [frequency, setFrequency] = useState("12");
  const [result, setResult] = useState(null);

  const calculateCompoundInterest = () => {
    const principalValue = parseFloat(principal);
    const rateValue = parseFloat(rate);
    const yearsValue = parseFloat(years);
    const frequencyValue = parseFloat(frequency);

    if (
      Number.isNaN(principalValue) ||
      Number.isNaN(rateValue) ||
      Number.isNaN(yearsValue) ||
      Number.isNaN(frequencyValue) ||
      principalValue <= 0 ||
      rateValue < 0 ||
      yearsValue <= 0
    ) {
      alert("Please enter valid values.");
      return;
    }

    const amount =
      principalValue *
      Math.pow(
        1 + rateValue / 100 / frequencyValue,
        frequencyValue * yearsValue
      );

    const interest = amount - principalValue;

    setResult({
      principal: principalValue,
      amount,
      interest,
    });
  };

  const clearCalculator = () => {
    setPrincipal("");
    setRate("");
    setYears("");
    setFrequency("12");
    setResult(null);
  };

  const formatMoney = (value) => {
    return value.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="compound-page">

      <div className="compound-container">

        <div className="compound-breadcrumb">
          <a href="/">CALVORO</a>
          <span> / Compound Interest Calculator</span>
        </div>

        <div className="compound-header">

          <div className="compound-icon">
            📈
          </div>

          <div className="compound-badge">
            FREE ONLINE TOOL
          </div>

          <h1>
            Compound Interest Calculator
          </h1>

          <p>
            Calculate compound interest, total
            investment growth and final amount.
          </p>

        </div>

        <div className="compound-card">

          <div className="compound-input-grid">

            <div className="compound-input-group">

              <label>
                Initial Investment
              </label>

              <input
                type="number"
                min="0"
                step="any"
                placeholder="Example: 10000"
                value={principal}
                onChange={(e) => {
                  setPrincipal(e.target.value);
                  setResult(null);
                }}
              />

            </div>

            <div className="compound-input-group">

              <label>
                Annual Interest Rate (%)
              </label>

              <input
                type="number"
                min="0"
                step="any"
                placeholder="Example: 8"
                value={rate}
                onChange={(e) => {
                  setRate(e.target.value);
                  setResult(null);
                }}
              />

            </div>

            <div className="compound-input-group">

              <label>
                Investment Period (Years)
              </label>

              <input
                type="number"
                min="0"
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

          <div className="compound-frequency-section">

            <label>
              Compounding Frequency
            </label>

            <div className="compound-frequency-options">

              <button
                className={
                  frequency === "1"
                    ? "compound-frequency-option active"
                    : "compound-frequency-option"
                }
                onClick={() => {
                  setFrequency("1");
                  setResult(null);
                }}
              >
                Yearly
              </button>

              <button
                className={
                  frequency === "2"
                    ? "compound-frequency-option active"
                    : "compound-frequency-option"
                }
                onClick={() => {
                  setFrequency("2");
                  setResult(null);
                }}
              >
                Half-Yearly
              </button>

              <button
                className={
                  frequency === "4"
                    ? "compound-frequency-option active"
                    : "compound-frequency-option"
                }
                onClick={() => {
                  setFrequency("4");
                  setResult(null);
                }}
              >
                Quarterly
              </button>

              <button
                className={
                  frequency === "12"
                    ? "compound-frequency-option active"
                    : "compound-frequency-option"
                }
                onClick={() => {
                  setFrequency("12");
                  setResult(null);
                }}
              >
                Monthly
              </button>

              <button
                className={
                  frequency === "365"
                    ? "compound-frequency-option active"
                    : "compound-frequency-option"
                }
                onClick={() => {
                  setFrequency("365");
                  setResult(null);
                }}
              >
                Daily
              </button>

            </div>

          </div>

          <div className="compound-buttons">

            <button
              className="compound-calculate-btn"
              onClick={calculateCompoundInterest}
            >
              Calculate Interest
            </button>

            <button
              className="compound-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {result && (
            <div className="compound-result">

              <div className="compound-result-title">
                <span>📈</span>

                <h2>
                  Investment Result
                </h2>
              </div>

              <div className="compound-main-result">

                <span>
                  Final Amount
                </span>

                <strong>
                  {formatMoney(result.amount)}
                </strong>

              </div>

              <div className="compound-summary">

                <div>
                  <span>
                    Initial Investment
                  </span>

                  <strong>
                    {formatMoney(result.principal)}
                  </strong>
                </div>

                <div>
                  <span>
                    Interest Earned
                  </span>

                  <strong>
                    {formatMoney(result.interest)}
                  </strong>
                </div>

                <div>
                  <span>
                    Final Amount
                  </span>

                  <strong>
                    {formatMoney(result.amount)}
                  </strong>
                </div>

              </div>

            </div>
          )}

        </div>

        <div className="compound-info">

          <h2>
            How to use the Compound Interest Calculator
          </h2>

          <div className="compound-steps">

            <div className="compound-step">

              <b>1</b>

              <div>
                <h3>
                  Enter your initial investment
                </h3>

                <p>
                  Enter the amount you want to invest
                  or save initially.
                </p>
              </div>

            </div>

            <div className="compound-step">

              <b>2</b>

              <div>
                <h3>
                  Enter the interest rate
                </h3>

                <p>
                  Enter the annual interest rate
                  as a percentage.
                </p>
              </div>

            </div>

            <div className="compound-step">

              <b>3</b>

              <div>
                <h3>
                  Enter the investment period
                </h3>

                <p>
                  Enter how many years you plan
                  to keep the investment.
                </p>
              </div>

            </div>

            <div className="compound-step">

              <b>4</b>

              <div>
                <h3>
                  Choose compounding frequency
                </h3>

                <p>
                  Select yearly, half-yearly,
                  quarterly, monthly or daily.
                </p>
              </div>

            </div>

          </div>

          <div className="compound-note">
            <strong>Formula:</strong> A = P(1 + r/n)^(nt),
            where P is the principal, r is the annual
            interest rate, n is the number of
            compounding periods per year, and t is
            the number of years.
          </div>

        </div>

        <div className="compound-back">
          <a href="/">
            ← Back to CALVORO
          </a>
        </div>

      </div>

    </div>
  );
}

export default CompoundInterestCalculator;