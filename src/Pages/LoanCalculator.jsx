import { useState } from "react";
import "./LoanCalculator.css";

function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [result, setResult] = useState(null);

  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const annualRate = parseFloat(interestRate);
    const years = parseFloat(loanTerm);

    if (
      !principal ||
      !annualRate ||
      !years ||
      principal <= 0 ||
      annualRate < 0 ||
      years <= 0
    ) {
      alert("Please enter valid loan details.");
      return;
    }

    const monthlyRate = annualRate / 100 / 12;
    const numberOfPayments = years * 12;

    let monthlyPayment;

    if (monthlyRate === 0) {
      monthlyPayment = principal / numberOfPayments;
    } else {
      monthlyPayment =
        (principal *
          monthlyRate *
          Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    }

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
    });
  };

  const clearCalculator = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanTerm("");
    setResult(null);
  };

  const formatMoney = (amount) => {
    return amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="loan-page">

      <div className="loan-container">

        {/* BREADCRUMB */}

        <div className="loan-breadcrumb">
          <a href="/">CALVORO</a>
          <span> / Loan Calculator</span>
        </div>


        {/* HEADER */}

        <div className="loan-header">

          <div className="loan-icon">
            💰
          </div>

          <div className="loan-badge">
            FREE ONLINE TOOL
          </div>

          <h1>Loan Calculator</h1>

          <p>
            Calculate your estimated monthly loan payment,
            total interest, and total repayment.
          </p>

        </div>


        {/* CALCULATOR CARD */}

        <div className="loan-card">

          <div className="loan-input-grid">

            {/* LOAN AMOUNT */}

            <div className="loan-input-group">

              <label htmlFor="loanAmount">
                Loan Amount
              </label>

              <input
                id="loanAmount"
                type="number"
                min="0"
                placeholder="Example: 10000"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
              />

              <span className="input-help">
                Enter the amount you want to borrow.
              </span>

            </div>


            {/* INTEREST RATE */}

            <div className="loan-input-group">

              <label htmlFor="interestRate">
                Annual Interest Rate (%)
              </label>

              <input
                id="interestRate"
                type="number"
                min="0"
                step="0.01"
                placeholder="Example: 7.5"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
              />

              <span className="input-help">
                Enter the yearly interest rate.
              </span>

            </div>


            {/* LOAN TERM */}

            <div className="loan-input-group">

              <label htmlFor="loanTerm">
                Loan Term (Years)
              </label>

              <input
                id="loanTerm"
                type="number"
                min="1"
                step="1"
                placeholder="Example: 5"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
              />

              <span className="input-help">
                Enter the number of years.
              </span>

            </div>

          </div>


          {/* BUTTONS */}

          <div className="loan-buttons">

            <button
              className="loan-calculate-btn"
              onClick={calculateLoan}
            >
              Calculate Loan
            </button>

            <button
              className="loan-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>


          {/* RESULT */}

          {result && (

            <div className="loan-result">

              <div className="loan-result-title">

                <span>📊</span>

                <h2>
                  Your Loan Estimate
                </h2>

              </div>


              {/* MONTHLY PAYMENT */}

              <div className="monthly-payment">

                <span>
                  Estimated Monthly Payment
                </span>

                <strong>
                  {formatMoney(result.monthlyPayment)}
                </strong>

              </div>


              {/* SUMMARY */}

              <div className="loan-summary">

                <div className="summary-box">

                  <span>
                    Total Loan
                  </span>

                  <strong>
                    {formatMoney(parseFloat(loanAmount))}
                  </strong>

                </div>


                <div className="summary-box">

                  <span>
                    Total Interest
                  </span>

                  <strong>
                    {formatMoney(result.totalInterest)}
                  </strong>

                </div>


                <div className="summary-box">

                  <span>
                    Total Payment
                  </span>

                  <strong>
                    {formatMoney(result.totalPayment)}
                  </strong>

                </div>

              </div>


              {/* LOAN DETAILS */}

              <div className="loan-details">

                <div className="detail-row">

                  <span>
                    Interest Rate
                  </span>

                  <strong>
                    {interestRate}%
                  </strong>

                </div>


                <div className="detail-row">

                  <span>
                    Loan Term
                  </span>

                  <strong>
                    {loanTerm} years
                  </strong>

                </div>


                <div className="detail-row">

                  <span>
                    Number of Payments
                  </span>

                  <strong>
                    {parseFloat(loanTerm) * 12}
                  </strong>

                </div>

              </div>

            </div>

          )}

        </div>


        {/* INFORMATION */}

        <div className="loan-info">

          <h2>
            How to use the Loan Calculator
          </h2>


          <div className="loan-steps">

            <div className="loan-step">

              <div className="step-number">
                1
              </div>

              <div>

                <h3>
                  Enter the loan amount
                </h3>

                <p>
                  Enter the amount of money you want to borrow.
                </p>

              </div>

            </div>


            <div className="loan-step">

              <div className="step-number">
                2
              </div>

              <div>

                <h3>
                  Enter the interest rate
                </h3>

                <p>
                  Enter the annual interest rate for the loan.
                </p>

              </div>

            </div>


            <div className="loan-step">

              <div className="step-number">
                3
              </div>

              <div>

                <h3>
                  Enter the loan term
                </h3>

                <p>
                  Enter how many years you plan to repay the loan.
                </p>

              </div>

            </div>


            <div className="loan-step">

              <div className="step-number">
                4
              </div>

              <div>

                <h3>
                  Calculate your payment
                </h3>

                <p>
                  Click Calculate Loan to see your estimated
                  monthly payment and total cost.
                </p>

              </div>

            </div>

          </div>


          <div className="loan-note">

            <strong>Note:</strong> This calculator provides an
            estimate. Actual loan payments can vary depending
            on lender fees, taxes, insurance, compounding,
            and other loan conditions.

          </div>

        </div>


        {/* BACK */}

        <div className="loan-back">

          <a href="/">
            ← Back to CALVORO
          </a>

        </div>

      </div>

    </div>
  );
}

export default LoanCalculator;