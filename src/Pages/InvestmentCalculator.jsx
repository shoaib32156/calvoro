import { useState } from "react";
import "./InvestmentCalculator.css";

function InvestmentCalculator() {
  const [initialInvestment, setInitialInvestment] = useState("");
  const [monthlyContribution, setMonthlyContribution] = useState("");
  const [annualReturn, setAnnualReturn] = useState("");
  const [investmentYears, setInvestmentYears] = useState("");
  const [result, setResult] = useState(null);

  const calculateInvestment = () => {
    const initial = parseFloat(initialInvestment);
    const monthly = parseFloat(monthlyContribution) || 0;
    const returnRate = parseFloat(annualReturn);
    const years = parseFloat(investmentYears);

    if (
      Number.isNaN(initial) ||
      Number.isNaN(returnRate) ||
      Number.isNaN(years) ||
      initial < 0 ||
      monthly < 0 ||
      years <= 0
    ) {
      alert("Please enter valid values.");
      return;
    }

    const months = Math.round(years * 12);
    const monthlyRate = returnRate / 100 / 12;

    let futureValue;

    if (monthlyRate === 0) {
      futureValue = initial + monthly * months;
    } else {
      const initialGrowth =
        initial * Math.pow(1 + monthlyRate, months);

      const contributionGrowth =
        monthly *
        ((Math.pow(1 + monthlyRate, months) - 1) /
          monthlyRate);

      futureValue = initialGrowth + contributionGrowth;
    }

    const totalContributions =
      initial + monthly * months;

    const estimatedGrowth =
      futureValue - totalContributions;

    setResult({
      futureValue,
      totalContributions,
      estimatedGrowth,
      initial,
      monthly,
      returnRate,
      years,
    });
  };

  const clearCalculator = () => {
    setInitialInvestment("");
    setMonthlyContribution("");
    setAnnualReturn("");
    setInvestmentYears("");
    setResult(null);
  };

  const formatNumber = (value) => {
    return value.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="investment-page">

      <div className="investment-container">

        {/* BREADCRUMB */}
        <div className="investment-breadcrumb">
          <a href="/">CALVORO</a>
          <span> / Investment Calculator</span>
        </div>

        {/* HEADER */}
        <div className="investment-header">

          <div className="investment-icon">
            📈
          </div>

          <div className="investment-badge">
            FREE ONLINE TOOL
          </div>

          <h1>
            Investment Calculator
          </h1>

          <p>
            Estimate how your investment could grow
            over time with regular contributions.
          </p>

        </div>

        {/* CALCULATOR CARD */}
        <div className="investment-card">

          <div className="investment-input-grid">

            <div className="investment-input-group">

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

            <div className="investment-input-group">

              <label>
                Monthly Contribution
              </label>

              <input
                type="number"
                min="0"
                step="any"
                placeholder="Example: 500"
                value={monthlyContribution}
                onChange={(e) => {
                  setMonthlyContribution(e.target.value);
                  setResult(null);
                }}
              />

            </div>

            <div className="investment-input-group">

              <label>
                Expected Annual Return (%)
              </label>

              <input
                type="number"
                min="0"
                step="any"
                placeholder="Example: 8"
                value={annualReturn}
                onChange={(e) => {
                  setAnnualReturn(e.target.value);
                  setResult(null);
                }}
              />

            </div>

            <div className="investment-input-group">

              <label>
                Investment Period (Years)
              </label>

              <input
                type="number"
                min="1"
                step="any"
                placeholder="Example: 10"
                value={investmentYears}
                onChange={(e) => {
                  setInvestmentYears(e.target.value);
                  setResult(null);
                }}
              />

            </div>

          </div>

          {/* BUTTONS */}
          <div className="investment-buttons">

            <button
              className="investment-calculate-btn"
              onClick={calculateInvestment}
            >
              Calculate Investment
            </button>

            <button
              className="investment-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {/* RESULT */}
          {result && (
            <div className="investment-result">

              <div className="investment-result-title">
                <span>📈</span>

                <h2>
                  Investment Result
                </h2>
              </div>

              {/* MAIN RESULT */}
              <div className="investment-main-result">

                <span>
                  Estimated Future Value
                </span>

                <strong>
                  {formatNumber(result.futureValue)}
                </strong>

              </div>

              {/* SUMMARY */}
              <div className="investment-summary">

                <div>
                  <span>
                    Initial Investment
                  </span>

                  <strong>
                    {formatNumber(result.initial)}
                  </strong>
                </div>

                <div>
                  <span>
                    Total Contributions
                  </span>

                  <strong>
                    {formatNumber(result.totalContributions)}
                  </strong>
                </div>

                <div>
                  <span>
                    Estimated Growth
                  </span>

                  <strong>
                    {formatNumber(result.estimatedGrowth)}
                  </strong>
                </div>

              </div>

              {/* DETAILS */}
              <div className="investment-details">

                <div>
                  <span>
                    Monthly Contribution
                  </span>

                  <strong>
                    {formatNumber(result.monthly)}
                  </strong>
                </div>

                <div>
                  <span>
                    Annual Return
                  </span>

                  <strong>
                    {result.returnRate}%
                  </strong>
                </div>

                <div>
                  <span>
                    Investment Period
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
        <div className="investment-info">

          <h2>
            How to use the Investment Calculator
          </h2>

          <div className="investment-steps">

            <div className="investment-step">

              <b>1</b>

              <div>
                <h3>
                  Enter your initial investment
                </h3>

                <p>
                  Enter the amount you plan to invest
                  at the beginning.
                </p>
              </div>

            </div>

            <div className="investment-step">

              <b>2</b>

              <div>
                <h3>
                  Add monthly contributions
                </h3>

                <p>
                  Enter the amount you plan to add
                  every month.
                </p>
              </div>

            </div>

            <div className="investment-step">

              <b>3</b>

              <div>
                <h3>
                  Enter expected return
                </h3>

                <p>
                  Enter an estimated annual investment
                  return percentage.
                </p>
              </div>

            </div>

            <div className="investment-step">

              <b>4</b>

              <div>
                <h3>
                  Enter investment period
                </h3>

                <p>
                  Enter how many years you plan to
                  keep the investment.
                </p>
              </div>

            </div>

          </div>

          {/* NOTE */}
          <div className="investment-note">
            <strong>Note:</strong>{" "}
            This calculator provides an estimate based
            on a constant annual return and regular
            monthly contributions. Actual investment
            results can vary.
          </div>

        </div>

        {/* BACK */}
        <div className="investment-back">
          <a href="/">
            ← Back to CALVORO
          </a>
        </div>

      </div>

    </div>
  );
}

export default InvestmentCalculator;