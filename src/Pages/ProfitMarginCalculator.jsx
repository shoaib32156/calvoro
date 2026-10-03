import { useState } from "react";
import "./ProfitMarginCalculator.css";

function ProfitMarginCalculator() {
  const [revenue, setRevenue] = useState("");
  const [cost, setCost] = useState("");
  const [result, setResult] = useState(null);

  const calculateProfit = () => {
    const revenueValue = parseFloat(revenue);
    const costValue = parseFloat(cost);

    if (
      Number.isNaN(revenueValue) ||
      Number.isNaN(costValue) ||
      revenueValue <= 0 ||
      costValue < 0
    ) {
      alert("Please enter valid revenue and cost values.");
      return;
    }

    if (costValue > revenueValue) {
      alert("Cost cannot be greater than revenue.");
      return;
    }

    const profit = revenueValue - costValue;

    const profitMargin =
      (profit / revenueValue) * 100;

    const markup =
      costValue === 0
        ? 0
        : (profit / costValue) * 100;

    setResult({
      revenue: revenueValue,
      cost: costValue,
      profit,
      profitMargin,
      markup,
    });
  };

  const clearCalculator = () => {
    setRevenue("");
    setCost("");
    setResult(null);
  };

  const formatMoney = (value) => {
    return value.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="profit-page">

      <div className="profit-container">

        <div className="profit-breadcrumb">
          <a href="/">CALVORO</a>
          <span> / Profit Margin Calculator</span>
        </div>

        <div className="profit-header">

          <div className="profit-icon">
            📊
          </div>

          <div className="profit-badge">
            FREE ONLINE TOOL
          </div>

          <h1>
            Profit Margin Calculator
          </h1>

          <p>
            Calculate your profit, profit margin
            and markup percentage from revenue
            and cost.
          </p>

        </div>

        <div className="profit-card">

          <div className="profit-input-grid">

            <div className="profit-input-group">

              <label>
                Revenue / Selling Price
              </label>

              <input
                type="number"
                min="0"
                step="any"
                placeholder="Example: 10000"
                value={revenue}
                onChange={(e) => {
                  setRevenue(e.target.value);
                  setResult(null);
                }}
              />

            </div>

            <div className="profit-input-group">

              <label>
                Cost
              </label>

              <input
                type="number"
                min="0"
                step="any"
                placeholder="Example: 7000"
                value={cost}
                onChange={(e) => {
                  setCost(e.target.value);
                  setResult(null);
                }}
              />

            </div>

          </div>

          <div className="profit-buttons">

            <button
              className="profit-calculate-btn"
              onClick={calculateProfit}
            >
              Calculate Profit
            </button>

            <button
              className="profit-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {result && (
            <div className="profit-result">

              <div className="profit-result-title">
                <span>📊</span>

                <h2>
                  Profit Result
                </h2>
              </div>

              <div className="profit-main-result">

                <span>
                  Net Profit
                </span>

                <strong>
                  {formatMoney(result.profit)}
                </strong>

              </div>

              <div className="profit-summary">

                <div>
                  <span>
                    Revenue
                  </span>

                  <strong>
                    {formatMoney(result.revenue)}
                  </strong>
                </div>

                <div>
                  <span>
                    Cost
                  </span>

                  <strong>
                    {formatMoney(result.cost)}
                  </strong>
                </div>

                <div>
                  <span>
                    Profit
                  </span>

                  <strong>
                    {formatMoney(result.profit)}
                  </strong>
                </div>

                <div>
                  <span>
                    Profit Margin
                  </span>

                  <strong>
                    {result.profitMargin.toLocaleString(
                      "en-US",
                      {
                        maximumFractionDigits: 2,
                      }
                    )}%
                  </strong>
                </div>

                <div>
                  <span>
                    Markup
                  </span>

                  <strong>
                    {result.markup.toLocaleString(
                      "en-US",
                      {
                        maximumFractionDigits: 2,
                      }
                    )}%
                  </strong>
                </div>

              </div>

            </div>
          )}

        </div>

        <div className="profit-info">

          <h2>
            How to use the Profit Margin Calculator
          </h2>

          <div className="profit-steps">

            <div className="profit-step">

              <b>1</b>

              <div>
                <h3>
                  Enter your revenue
                </h3>

                <p>
                  Enter the total selling price
                  or revenue.
                </p>
              </div>

            </div>

            <div className="profit-step">

              <b>2</b>

              <div>
                <h3>
                  Enter your cost
                </h3>

                <p>
                  Enter the total cost required
                  to produce or purchase the product.
                </p>
              </div>

            </div>

            <div className="profit-step">

              <b>3</b>

              <div>
                <h3>
                  Calculate
                </h3>

                <p>
                  CALVORO calculates your profit,
                  margin and markup.
                </p>
              </div>

            </div>

          </div>

          <div className="profit-note">
            <strong>Formula:</strong> Profit =
            Revenue − Cost. Profit Margin =
            Profit ÷ Revenue × 100.
          </div>

        </div>

        <div className="profit-back">
          <a href="/">
            ← Back to CALVORO
          </a>
        </div>

      </div>

    </div>
  );
}

export default ProfitMarginCalculator;