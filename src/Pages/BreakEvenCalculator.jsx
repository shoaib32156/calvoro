import { useState } from "react";
import "./BreakEvenCalculator.css";

function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState("");
  const [variableCost, setVariableCost] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [result, setResult] = useState(null);

  const calculateBreakEven = () => {
    const fixed = parseFloat(fixedCosts);
    const variable = parseFloat(variableCost);
    const price = parseFloat(sellingPrice);

    if (
      Number.isNaN(fixed) ||
      Number.isNaN(variable) ||
      Number.isNaN(price) ||
      fixed < 0 ||
      variable < 0 ||
      price <= 0
    ) {
      alert("Please enter valid values.");
      return;
    }

    if (price <= variable) {
      alert(
        "Selling price must be greater than variable cost."
      );
      return;
    }

    const contribution = price - variable;

    const breakEvenUnits = fixed / contribution;

    const breakEvenRevenue =
      breakEvenUnits * price;

    setResult({
      fixed,
      variable,
      price,
      contribution,
      breakEvenUnits,
      breakEvenRevenue,
    });
  };

  const clearCalculator = () => {
    setFixedCosts("");
    setVariableCost("");
    setSellingPrice("");
    setResult(null);
  };

  const formatNumber = (value) => {
    return value.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="breakeven-page">

      <div className="breakeven-container">

        {/* BREADCRUMB */}
        <div className="breakeven-breadcrumb">
          <a href="/">CALVORO</a>
          <span> / Break-Even Calculator</span>
        </div>

        {/* HEADER */}
        <div className="breakeven-header">

          <div className="breakeven-icon">
            ⚖️
          </div>

          <div className="breakeven-badge">
            FREE ONLINE TOOL
          </div>

          <h1>
            Break-Even Calculator
          </h1>

          <p>
            Calculate the number of units and revenue
            needed to cover your total costs.
          </p>

        </div>

        {/* CALCULATOR CARD */}
        <div className="breakeven-card">

          <div className="breakeven-input-grid">

            {/* FIXED COST */}
            <div className="breakeven-input-group">

              <label>
                Fixed Costs
              </label>

              <input
                type="number"
                min="0"
                step="any"
                placeholder="Example: 50000"
                value={fixedCosts}
                onChange={(e) => {
                  setFixedCosts(e.target.value);
                  setResult(null);
                }}
              />

            </div>

            {/* VARIABLE COST */}
            <div className="breakeven-input-group">

              <label>
                Variable Cost per Unit
              </label>

              <input
                type="number"
                min="0"
                step="any"
                placeholder="Example: 50"
                value={variableCost}
                onChange={(e) => {
                  setVariableCost(e.target.value);
                  setResult(null);
                }}
              />

            </div>

            {/* SELLING PRICE */}
            <div className="breakeven-input-group">

              <label>
                Selling Price per Unit
              </label>

              <input
                type="number"
                min="0"
                step="any"
                placeholder="Example: 100"
                value={sellingPrice}
                onChange={(e) => {
                  setSellingPrice(e.target.value);
                  setResult(null);
                }}
              />

            </div>

          </div>

          {/* BUTTONS */}
          <div className="breakeven-buttons">

            <button
              className="breakeven-calculate-btn"
              onClick={calculateBreakEven}
            >
              Calculate Break-Even
            </button>

            <button
              className="breakeven-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {/* RESULT */}
          {result && (
            <div className="breakeven-result">

              <div className="breakeven-result-title">
                <span>⚖️</span>

                <h2>
                  Break-Even Result
                </h2>
              </div>

              {/* MAIN RESULT */}
              <div className="breakeven-main-result">

                <span>
                  Break-Even Units
                </span>

                <strong>
                  {formatNumber(result.breakEvenUnits)}
                </strong>

              </div>

              {/* SUMMARY */}
              <div className="breakeven-summary">

                <div>
                  <span>
                    Fixed Costs
                  </span>

                  <strong>
                    {formatNumber(result.fixed)}
                  </strong>
                </div>

                <div>
                  <span>
                    Variable Cost
                  </span>

                  <strong>
                    {formatNumber(result.variable)}
                  </strong>
                </div>

                <div>
                  <span>
                    Selling Price
                  </span>

                  <strong>
                    {formatNumber(result.price)}
                  </strong>
                </div>

                <div>
                  <span>
                    Contribution
                  </span>

                  <strong>
                    {formatNumber(result.contribution)}
                  </strong>
                </div>

                <div>
                  <span>
                    Break-Even Revenue
                  </span>

                  <strong>
                    {formatNumber(result.breakEvenRevenue)}
                  </strong>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* INFORMATION */}
        <div className="breakeven-info">

          <h2>
            How to use the Break-Even Calculator
          </h2>

          <div className="breakeven-steps">

            <div className="breakeven-step">

              <b>1</b>

              <div>
                <h3>
                  Enter fixed costs
                </h3>

                <p>
                  Enter costs that stay the same
                  regardless of how many units you sell.
                </p>
              </div>

            </div>

            <div className="breakeven-step">

              <b>2</b>

              <div>
                <h3>
                  Enter variable cost
                </h3>

                <p>
                  Enter the cost required to produce
                  one unit.
                </p>
              </div>

            </div>

            <div className="breakeven-step">

              <b>3</b>

              <div>
                <h3>
                  Enter selling price
                </h3>

                <p>
                  Enter the selling price for one unit.
                </p>
              </div>

            </div>

            <div className="breakeven-step">

              <b>4</b>

              <div>
                <h3>
                  Calculate
                </h3>

                <p>
                  CALVORO calculates your break-even
                  units and revenue.
                </p>
              </div>

            </div>

          </div>

          {/* FORMULA */}
          <div className="breakeven-note">
            <strong>Formula:</strong>{" "}
            Break-Even Units =
            Fixed Costs ÷ (Selling Price − Variable Cost).
          </div>

        </div>

        {/* BACK LINK */}
        <div className="breakeven-back">
          <a href="/">
            ← Back to CALVORO
          </a>
        </div>

      </div>

    </div>
  );
}

export default BreakEvenCalculator;