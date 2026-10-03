import { useState } from "react";
import "./MortgageCalculator.css";

function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState("");
  const [downPayment, setDownPayment] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("30");
  const [result, setResult] = useState(null);

  const calculateMortgage = () => {
    const price = parseFloat(homePrice);
    const down = parseFloat(downPayment);
    const rate = parseFloat(interestRate);
    const years = parseFloat(loanTerm);

    if (
      Number.isNaN(price) ||
      Number.isNaN(down) ||
      Number.isNaN(rate) ||
      Number.isNaN(years) ||
      price <= 0 ||
      down < 0 ||
      down >= price ||
      rate < 0 ||
      years <= 0
    ) {
      alert("Please enter valid mortgage information.");
      return;
    }

    const loanAmount = price - down;
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = years * 12;

    let monthlyPayment;

    if (monthlyRate === 0) {
      monthlyPayment = loanAmount / numberOfPayments;
    } else {
      monthlyPayment =
        (loanAmount *
          monthlyRate *
          Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    const totalPayment =
      monthlyPayment * numberOfPayments;

    const totalInterest =
      totalPayment - loanAmount;

    setResult({
      loanAmount,
      monthlyPayment,
      totalPayment,
      totalInterest,
      downPayment: down,
    });
  };

  const clearCalculator = () => {
    setHomePrice("");
    setDownPayment("");
    setInterestRate("");
    setLoanTerm("30");
    setResult(null);
  };

  const formatMoney = (value) => {
    return value.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="mortgage-page">

      <div className="mortgage-container">

        <div className="mortgage-breadcrumb">
          <a href="/">CALVORO</a>
          <span> / Mortgage Calculator</span>
        </div>

        <div className="mortgage-header">

          <div className="mortgage-icon">
            🏠
          </div>

          <div className="mortgage-badge">
            FREE ONLINE TOOL
          </div>

          <h1>
            Mortgage Calculator
          </h1>

          <p>
            Calculate your estimated monthly mortgage
            payment, total interest and total loan cost.
          </p>

        </div>

        <div className="mortgage-card">

          <div className="mortgage-input-grid">

            <div className="mortgage-input-group">

              <label>
                Home Price
              </label>

              <input
                type="number"
                min="0"
                step="any"
                placeholder="Example: 300000"
                value={homePrice}
                onChange={(e) => {
                  setHomePrice(e.target.value);
                  setResult(null);
                }}
              />

            </div>

            <div className="mortgage-input-group">

              <label>
                Down Payment
              </label>

              <input
                type="number"
                min="0"
                step="any"
                placeholder="Example: 60000"
                value={downPayment}
                onChange={(e) => {
                  setDownPayment(e.target.value);
                  setResult(null);
                }}
              />

            </div>

            <div className="mortgage-input-group">

              <label>
                Interest Rate (%)
              </label>

              <input
                type="number"
                min="0"
                step="any"
                placeholder="Example: 6.5"
                value={interestRate}
                onChange={(e) => {
                  setInterestRate(e.target.value);
                  setResult(null);
                }}
              />

            </div>

          </div>

          <div className="mortgage-term-section">

            <label>
              Loan Term
            </label>

            <div className="mortgage-term-options">

              <button
                className={
                  loanTerm === "10"
                    ? "mortgage-term-option active"
                    : "mortgage-term-option"
                }
                onClick={() => {
                  setLoanTerm("10");
                  setResult(null);
                }}
              >
                10 Years
              </button>

              <button
                className={
                  loanTerm === "15"
                    ? "mortgage-term-option active"
                    : "mortgage-term-option"
                }
                onClick={() => {
                  setLoanTerm("15");
                  setResult(null);
                }}
              >
                15 Years
              </button>

              <button
                className={
                  loanTerm === "20"
                    ? "mortgage-term-option active"
                    : "mortgage-term-option"
                }
                onClick={() => {
                  setLoanTerm("20");
                  setResult(null);
                }}
              >
                20 Years
              </button>

              <button
                className={
                  loanTerm === "30"
                    ? "mortgage-term-option active"
                    : "mortgage-term-option"
                }
                onClick={() => {
                  setLoanTerm("30");
                  setResult(null);
                }}
              >
                30 Years
              </button>

            </div>

          </div>

          <div className="mortgage-buttons">

            <button
              className="mortgage-calculate-btn"
              onClick={calculateMortgage}
            >
              Calculate Mortgage
            </button>

            <button
              className="mortgage-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {result && (
            <div className="mortgage-result">

              <div className="mortgage-result-title">
                <span>🏠</span>

                <h2>
                  Mortgage Result
                </h2>
              </div>

              <div className="mortgage-main-result">

                <span>
                  Estimated Monthly Payment
                </span>

                <strong>
                  {formatMoney(result.monthlyPayment)}
                </strong>

              </div>

              <div className="mortgage-summary">

                <div>
                  <span>
                    Home Price
                  </span>

                  <strong>
                    {formatMoney(parseFloat(homePrice))}
                  </strong>
                </div>

                <div>
                  <span>
                    Down Payment
                  </span>

                  <strong>
                    {formatMoney(result.downPayment)}
                  </strong>
                </div>

                <div>
                  <span>
                    Loan Amount
                  </span>

                  <strong>
                    {formatMoney(result.loanAmount)}
                  </strong>
                </div>

                <div>
                  <span>
                    Total Loan Payment
                  </span>

                  <strong>
                    {formatMoney(result.totalPayment)}
                  </strong>
                </div>

                <div>
                  <span>
                    Total Interest
                  </span>

                  <strong>
                    {formatMoney(result.totalInterest)}
                  </strong>
                </div>

                <div>
                  <span>
                    Loan Term
                  </span>

                  <strong>
                    {loanTerm} Years
                  </strong>
                </div>

              </div>

            </div>
          )}

        </div>

        <div className="mortgage-info">

          <h2>
            How to use the Mortgage Calculator
          </h2>

          <div className="mortgage-steps">

            <div className="mortgage-step">

              <b>1</b>

              <div>
                <h3>
                  Enter the home price
                </h3>

                <p>
                  Enter the total purchase price
                  of the property.
                </p>
              </div>

            </div>

            <div className="mortgage-step">

              <b>2</b>

              <div>
                <h3>
                  Enter your down payment
                </h3>

                <p>
                  Enter the amount you plan to
                  pay upfront.
                </p>
              </div>

            </div>

            <div className="mortgage-step">

              <b>3</b>

              <div>
                <h3>
                  Enter the interest rate
                </h3>

                <p>
                  Enter the annual mortgage
                  interest rate.
                </p>
              </div>

            </div>

            <div className="mortgage-step">

              <b>4</b>

              <div>
                <h3>
                  Choose the loan term
                </h3>

                <p>
                  Select 10, 15, 20 or 30 years.
                </p>
              </div>

            </div>

          </div>

          <div className="mortgage-note">
            <strong>Formula:</strong> The calculator
            uses the standard fixed-rate mortgage
            payment formula to estimate monthly
            payments, total payments and interest.
          </div>

        </div>

        <div className="mortgage-back">
          <a href="/">
            ← Back to CALVORO
          </a>
        </div>

      </div>

    </div>
  );
}

export default MortgageCalculator;