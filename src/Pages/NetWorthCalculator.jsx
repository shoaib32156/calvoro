import { useState } from "react";
import "./NetWorthCalculator.css";

function NetWorthCalculator() {
  const [cash, setCash] = useState("");
  const [property, setProperty] = useState("");
  const [vehicles, setVehicles] = useState("");
  const [investments, setInvestments] = useState("");
  const [creditCardDebt, setCreditCardDebt] = useState("");
  const [loans, setLoans] = useState("");
  const [result, setResult] = useState(null);

  const calculateNetWorth = () => {
    const cashValue = Number(cash) || 0;
    const propertyValue = Number(property) || 0;
    const vehicleValue = Number(vehicles) || 0;
    const investmentValue = Number(investments) || 0;
    const creditDebt = Number(creditCardDebt) || 0;
    const loanValue = Number(loans) || 0;

    const totalAssets =
      cashValue +
      propertyValue +
      vehicleValue +
      investmentValue;

    const totalLiabilities =
      creditDebt +
      loanValue;

    const netWorth = totalAssets - totalLiabilities;

    setResult({
      totalAssets,
      totalLiabilities,
      netWorth,
      cashValue,
      propertyValue,
      vehicleValue,
      investmentValue,
      creditDebt,
      loanValue,
    });
  };

  const clearCalculator = () => {
    setCash("");
    setProperty("");
    setVehicles("");
    setInvestments("");
    setCreditCardDebt("");
    setLoans("");
    setResult(null);
  };

  const formatMoney = (value) =>
    value.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="net-worth-page">
      <div className="net-worth-container">

        <div className="net-worth-breadcrumb">
          <a href="/">Home</a>
          <span>›</span>
          <span>Net Worth Calculator</span>
        </div>

        <div className="net-worth-header">
          <div className="net-worth-icon">💰</div>

          <div className="net-worth-badge">
            FREE ONLINE TOOL
          </div>

          <h1>Net Worth Calculator</h1>

          <p>
            Calculate your total assets, liabilities, and estimated
            net worth in seconds.
          </p>
        </div>

        <div className="net-worth-card">

          <h2 className="net-worth-section-title">
            Your Assets
          </h2>

          <div className="net-worth-input-grid">

            <div className="net-worth-input-group">
              <label>Cash & Savings</label>
              <input
                type="number"
                placeholder="e.g. 10000"
                value={cash}
                onChange={(e) => setCash(e.target.value)}
              />
            </div>

            <div className="net-worth-input-group">
              <label>Property Value</label>
              <input
                type="number"
                placeholder="e.g. 150000"
                value={property}
                onChange={(e) => setProperty(e.target.value)}
              />
            </div>

            <div className="net-worth-input-group">
              <label>Vehicle Value</label>
              <input
                type="number"
                placeholder="e.g. 20000"
                value={vehicles}
                onChange={(e) => setVehicles(e.target.value)}
              />
            </div>

            <div className="net-worth-input-group">
              <label>Investments</label>
              <input
                type="number"
                placeholder="e.g. 50000"
                value={investments}
                onChange={(e) => setInvestments(e.target.value)}
              />
            </div>

          </div>

          <h2 className="net-worth-section-title liabilities-title">
            Your Liabilities
          </h2>

          <div className="net-worth-input-grid">

            <div className="net-worth-input-group">
              <label>Credit Card Debt</label>
              <input
                type="number"
                placeholder="e.g. 5000"
                value={creditCardDebt}
                onChange={(e) => setCreditCardDebt(e.target.value)}
              />
            </div>

            <div className="net-worth-input-group">
              <label>Loans</label>
              <input
                type="number"
                placeholder="e.g. 30000"
                value={loans}
                onChange={(e) => setLoans(e.target.value)}
              />
            </div>

          </div>

          <div className="net-worth-buttons">
            <button
              className="net-worth-calculate-btn"
              onClick={calculateNetWorth}
            >
              Calculate Net Worth
            </button>

            <button
              className="net-worth-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>
          </div>

          {result && (
            <div className="net-worth-result">

              <div className="net-worth-result-main">
                <span>Estimated Net Worth</span>

                <strong>
                  {formatMoney(result.netWorth)}
                </strong>
              </div>

              <div className="net-worth-summary">

                <div>
                  <span>Total Assets</span>
                  <strong>
                    {formatMoney(result.totalAssets)}
                  </strong>
                </div>

                <div>
                  <span>Total Liabilities</span>
                  <strong>
                    {formatMoney(result.totalLiabilities)}
                  </strong>
                </div>

                <div>
                  <span>Cash & Savings</span>
                  <strong>
                    {formatMoney(result.cashValue)}
                  </strong>
                </div>

                <div>
                  <span>Property</span>
                  <strong>
                    {formatMoney(result.propertyValue)}
                  </strong>
                </div>

                <div>
                  <span>Vehicles</span>
                  <strong>
                    {formatMoney(result.vehicleValue)}
                  </strong>
                </div>

                <div>
                  <span>Investments</span>
                  <strong>
                    {formatMoney(result.investmentValue)}
                  </strong>
                </div>

              </div>

            </div>
          )}

        </div>

        <div className="net-worth-info">

          <h2>How to use the Net Worth Calculator</h2>

          <ol>
            <li>Enter the value of your cash and savings.</li>
            <li>Enter the current value of your property.</li>
            <li>Enter the current value of your vehicles.</li>
            <li>Enter your investments.</li>
            <li>Enter your credit card debt and loans.</li>
            <li>Click "Calculate Net Worth".</li>
          </ol>

          <h2>Net Worth Formula</h2>

          <p>
            Net Worth = Total Assets − Total Liabilities
          </p>

          <p className="net-worth-note">
            Note: Enter the current estimated value of your assets
            and the outstanding balances of your debts.
          </p>

        </div>

        <div className="net-worth-back">
          <a href="/">← Back to CALVORO</a>
        </div>

      </div>
    </div>
  );
}

export default NetWorthCalculator;