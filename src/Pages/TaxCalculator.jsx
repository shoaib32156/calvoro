import { useState } from "react";
import "./TaxCalculator.css";

function TaxCalculator() {
  const [income, setIncome] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [result, setResult] = useState(null);

  const calculateTax = () => {
    const incomeValue = parseFloat(income);
    const taxRateValue = parseFloat(taxRate);

    if (
      Number.isNaN(incomeValue) ||
      Number.isNaN(taxRateValue) ||
      incomeValue < 0 ||
      taxRateValue < 0 ||
      taxRateValue > 100
    ) {
      alert("Please enter valid income and tax rate.");
      return;
    }

    const taxAmount =
      incomeValue * (taxRateValue / 100);

    const afterTaxIncome =
      incomeValue - taxAmount;

    setResult({
      income: incomeValue,
      taxAmount,
      afterTaxIncome,
    });
  };

  const clearCalculator = () => {
    setIncome("");
    setTaxRate("");
    setResult(null);
  };

  const formatMoney = (value) => {
    return value.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="tax-page">

      <div className="tax-container">

        <div className="tax-breadcrumb">
          <a href="/">CALVORO</a>
          <span> / Tax Calculator</span>
        </div>

        <div className="tax-header">

          <div className="tax-icon">
            🧾
          </div>

          <div className="tax-badge">
            FREE ONLINE TOOL
          </div>

          <h1>
            Tax Calculator
          </h1>

          <p>
            Calculate estimated tax amounts and
            your income after tax.
          </p>

        </div>

        <div className="tax-card">

          <div className="tax-input-grid">

            <div className="tax-input-group">

              <label>
                Income Amount
              </label>

              <input
                type="number"
                min="0"
                step="any"
                placeholder="Example: 50000"
                value={income}
                onChange={(e) => {
                  setIncome(e.target.value);
                  setResult(null);
                }}
              />

            </div>

            <div className="tax-input-group">

              <label>
                Tax Rate (%)
              </label>

              <input
                type="number"
                min="0"
                max="100"
                step="any"
                placeholder="Example: 20"
                value={taxRate}
                onChange={(e) => {
                  setTaxRate(e.target.value);
                  setResult(null);
                }}
              />

            </div>

          </div>

          <div className="tax-buttons">

            <button
              className="tax-calculate-btn"
              onClick={calculateTax}
            >
              Calculate Tax
            </button>

            <button
              className="tax-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {result && (
            <div className="tax-result">

              <div className="tax-result-title">
                <span>🧾</span>

                <h2>
                  Tax Result
                </h2>
              </div>

              <div className="tax-main-result">

                <span>
                  Estimated Tax
                </span>

                <strong>
                  {formatMoney(result.taxAmount)}
                </strong>

              </div>

              <div className="tax-summary">

                <div>
                  <span>
                    Income
                  </span>

                  <strong>
                    {formatMoney(result.income)}
                  </strong>
                </div>

                <div>
                  <span>
                    Tax Amount
                  </span>

                  <strong>
                    {formatMoney(result.taxAmount)}
                  </strong>
                </div>

                <div>
                  <span>
                    After-Tax Income
                  </span>

                  <strong>
                    {formatMoney(result.afterTaxIncome)}
                  </strong>
                </div>

              </div>

            </div>
          )}

        </div>

        <div className="tax-info">

          <h2>
            How to use the Tax Calculator
          </h2>

          <div className="tax-steps">

            <div className="tax-step">

              <b>1</b>

              <div>
                <h3>
                  Enter your income
                </h3>

                <p>
                  Enter the income amount you want
                  to calculate tax on.
                </p>
              </div>

            </div>

            <div className="tax-step">

              <b>2</b>

              <div>
                <h3>
                  Enter the tax rate
                </h3>

                <p>
                  Enter the applicable tax rate
                  as a percentage.
                </p>
              </div>

            </div>

            <div className="tax-step">

              <b>3</b>

              <div>
                <h3>
                  Calculate
                </h3>

                <p>
                  Click the calculate button to
                  see the estimated tax.
                </p>
              </div>

            </div>

          </div>

          <div className="tax-note">
            <strong>Note:</strong> This is a basic
            tax estimation tool. Actual taxes may
            depend on deductions, brackets, credits,
            local laws and other factors.
          </div>

        </div>

        <div className="tax-back">
          <a href="/">
            ← Back to CALVORO
          </a>
        </div>

      </div>

    </div>
  );
}

export default TaxCalculator;