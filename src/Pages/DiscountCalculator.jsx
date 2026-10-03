import { useState } from "react";
import "./DiscountCalculator.css";

function DiscountCalculator() {
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [result, setResult] = useState(null);

  const calculateDiscount = () => {
    const originalPrice = parseFloat(price);
    const discountPercent = parseFloat(discount);

    if (
      !originalPrice ||
      !discount ||
      originalPrice <= 0 ||
      discountPercent < 0 ||
      discountPercent > 100
    ) {
      alert("Please enter a valid price and discount percentage.");
      return;
    }

    const discountAmount =
      originalPrice * (discountPercent / 100);

    const finalPrice =
      originalPrice - discountAmount;

    setResult({
      discountAmount,
      finalPrice,
      savingsPercent: discountPercent,
    });
  };

  const clearCalculator = () => {
    setPrice("");
    setDiscount("");
    setResult(null);
  };

  const money = (value) =>
    value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="discount-page">

      <div className="discount-container">

        <div className="discount-breadcrumb">
          <a href="/">CALVORO</a>
          <span> / Discount Calculator</span>
        </div>

        <div className="discount-header">

          <div className="discount-icon">
            🏷️
          </div>

          <div className="discount-badge">
            FREE ONLINE TOOL
          </div>

          <h1>Discount Calculator</h1>

          <p>
            Calculate your discount amount, final price,
            and total savings instantly.
          </p>

        </div>

        <div className="discount-card">

          <div className="discount-input-grid">

            <div className="discount-input-group">

              <label>Original Price</label>

              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Example: 1000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />

            </div>

            <div className="discount-input-group">

              <label>Discount Percentage (%)</label>

              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                placeholder="Example: 20"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />

            </div>

          </div>

          <div className="discount-buttons">

            <button
              className="discount-calculate-btn"
              onClick={calculateDiscount}
            >
              Calculate Discount
            </button>

            <button
              className="discount-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {result && (
            <div className="discount-result">

              <div className="discount-result-title">
                <span>💰</span>
                <h2>Your Discount Result</h2>
              </div>

              <div className="discount-final-price">

                <span>Final Price</span>

                <strong>
                  {money(result.finalPrice)}
                </strong>

              </div>

              <div className="discount-summary">

                <div>
                  <span>Original Price</span>
                  <strong>
                    {money(parseFloat(price))}
                  </strong>
                </div>

                <div>
                  <span>Discount</span>
                  <strong>
                    {result.savingsPercent}%
                  </strong>
                </div>

                <div>
                  <span>You Save</span>
                  <strong>
                    {money(result.discountAmount)}
                  </strong>
                </div>

              </div>

              <div className="discount-breakdown">

                <div>
                  <span>Original Price</span>
                  <strong>
                    {money(parseFloat(price))}
                  </strong>
                </div>

                <div>
                  <span>Discount Amount</span>
                  <strong>
                    - {money(result.discountAmount)}
                  </strong>
                </div>

                <div>
                  <span>Final Price</span>
                  <strong>
                    {money(result.finalPrice)}
                  </strong>
                </div>

              </div>

            </div>
          )}

        </div>

        <div className="discount-info">

          <h2>How to use the Discount Calculator</h2>

          <div className="discount-steps">

            <div className="discount-step">
              <b>1</b>

              <div>
                <h3>Enter original price</h3>

                <p>
                  Enter the original price of the product.
                </p>
              </div>
            </div>

            <div className="discount-step">
              <b>2</b>

              <div>
                <h3>Enter discount percentage</h3>

                <p>
                  Enter the discount percentage offered by the seller.
                </p>
              </div>
            </div>

            <div className="discount-step">
              <b>3</b>

              <div>
                <h3>Calculate discount</h3>

                <p>
                  CALVORO instantly calculates your savings and final price.
                </p>
              </div>
            </div>

          </div>

          <div className="discount-note">
            <strong>Example:</strong> If a product costs 1,000
            and has a 20% discount, you save 200 and pay 800.
          </div>

        </div>

        <div className="discount-back">
          <a href="/">← Back to CALVORO</a>
        </div>

      </div>

    </div>
  );
}

export default DiscountCalculator;