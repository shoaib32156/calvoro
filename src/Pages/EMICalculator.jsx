import { useState } from "react";
import "./EMICalculator.css";

function EMICalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);

  const calculateEMI = () => {
    const principal = parseFloat(amount);
    const annualRate = parseFloat(rate);
    const loanYears = parseFloat(years);

    if (
      !principal ||
      !loanYears ||
      principal <= 0 ||
      annualRate < 0 ||
      loanYears <= 0
    ) {
      alert("Please enter valid loan details.");
      return;
    }

    const monthlyRate = annualRate / 100 / 12;
    const months = loanYears * 12;

    let emi;

    if (monthlyRate === 0) {
      emi = principal / months;
    } else {
      emi =
        (principal *
          monthlyRate *
          Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
    }

    const totalPayment = emi * months;
    const totalInterest = totalPayment - principal;

    setResult({
      emi,
      totalPayment,
      totalInterest,
      months,
    });
  };

  const clearCalculator = () => {
    setAmount("");
    setRate("");
    setYears("");
    setResult(null);
  };

  const money = (value) =>
    value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="emi-page">
      <div className="emi-container">

        <div className="emi-breadcrumb">
          <a href="/">CALVORO</a>
          <span> / EMI Calculator</span>
        </div>

        <div className="emi-header">
          <div className="emi-icon">💳</div>

          <div className="emi-badge">
            FREE ONLINE TOOL
          </div>

          <h1>EMI Calculator</h1>

          <p>
            Calculate your estimated monthly EMI,
            total interest, and total repayment.
          </p>
        </div>

        <div className="emi-card">

          <div className="emi-input-grid">

            <div className="emi-input-group">
              <label>Loan Amount</label>

              <input
                type="number"
                min="0"
                placeholder="Example: 100000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="emi-input-group">
              <label>Annual Interest Rate (%)</label>

              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Example: 8.5"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </div>

            <div className="emi-input-group full-width">
              <label>Loan Tenure (Years)</label>

              <input
                type="number"
                min="1"
                placeholder="Example: 5"
                value={years}
                onChange={(e) => setYears(e.target.value)}
              />
            </div>

          </div>

          <div className="emi-buttons">

            <button
              className="emi-calculate-btn"
              onClick={calculateEMI}
            >
              Calculate EMI
            </button>

            <button
              className="emi-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {result && (
            <div className="emi-result">

              <div className="emi-result-title">
                📊
                <h2>Your EMI Result</h2>
              </div>

              <div className="emi-main-result">
                <span>Monthly EMI</span>

                <strong>
                  {money(result.emi)}
                </strong>
              </div>

              <div className="emi-summary">

                <div>
                  <span>Loan Amount</span>
                  <strong>{money(parseFloat(amount))}</strong>
                </div>

                <div>
                  <span>Total Interest</span>
                  <strong>{money(result.totalInterest)}</strong>
                </div>

                <div>
                  <span>Total Payment</span>
                  <strong>{money(result.totalPayment)}</strong>
                </div>

              </div>

              <div className="emi-details">

                <div>
                  <span>Interest Rate</span>
                  <strong>{rate}%</strong>
                </div>

                <div>
                  <span>Loan Tenure</span>
                  <strong>{years} years</strong>
                </div>

                <div>
                  <span>Total Payments</span>
                  <strong>{result.months}</strong>
                </div>

              </div>

            </div>
          )}

        </div>

        <div className="emi-info">

          <h2>How to use the EMI Calculator</h2>

          <div className="emi-steps">

            <div className="emi-step">
              <b>1</b>
              <div>
                <h3>Enter loan amount</h3>
                <p>Enter the amount you want to borrow.</p>
              </div>
            </div>

            <div className="emi-step">
              <b>2</b>
              <div>
                <h3>Enter interest rate</h3>
                <p>Enter the annual interest rate.</p>
              </div>
            </div>

            <div className="emi-step">
              <b>3</b>
              <div>
                <h3>Enter loan tenure</h3>
                <p>Enter the number of years for repayment.</p>
              </div>
            </div>

            <div className="emi-step">
              <b>4</b>
              <div>
                <h3>Calculate EMI</h3>
                <p>Your estimated monthly EMI will appear instantly.</p>
              </div>
            </div>

          </div>

          <div className="emi-note">
            <strong>Note:</strong> This is an estimated calculation.
            Actual EMI may vary depending on lender terms,
            fees, taxes, and other charges.
          </div>

        </div>

        <div className="emi-back">
          <a href="/">← Back to CALVORO</a>
        </div>

      </div>
    </div>
  );
}

export default EMICalculator;