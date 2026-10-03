import { useState } from "react";
import "./TipCalculator.css";

function TipCalculator() {
  const [bill, setBill] = useState("");
  const [tipPercent, setTipPercent] = useState("");
  const [people, setPeople] = useState("1");
  const [result, setResult] = useState(null);

  const calculateTip = () => {
    const billAmount = parseFloat(bill);
    const tip = parseFloat(tipPercent);
    const numberOfPeople = parseInt(people);

    if (
      !billAmount ||
      billAmount <= 0 ||
      tip < 0 ||
      !numberOfPeople ||
      numberOfPeople <= 0
    ) {
      alert("Please enter valid bill details.");
      return;
    }

    const tipAmount = billAmount * (tip / 100);
    const totalAmount = billAmount + tipAmount;
    const perPerson = totalAmount / numberOfPeople;

    setResult({
      tipAmount,
      totalAmount,
      perPerson,
      people: numberOfPeople,
    });
  };

  const clearCalculator = () => {
    setBill("");
    setTipPercent("");
    setPeople("1");
    setResult(null);
  };

  const money = (value) =>
    value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  return (
    <div className="tip-page">

      <div className="tip-container">

        <div className="tip-breadcrumb">
          <a href="/">CALVORO</a>
          <span> / Tip Calculator</span>
        </div>

        <div className="tip-header">

          <div className="tip-icon">
            💵
          </div>

          <div className="tip-badge">
            FREE ONLINE TOOL
          </div>

          <h1>Tip Calculator</h1>

          <p>
            Calculate your tip, total bill, and
            amount per person quickly and easily.
          </p>

        </div>

        <div className="tip-card">

          <div className="tip-input-grid">

            <div className="tip-input-group">

              <label>Bill Amount</label>

              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Example: 5000"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
              />

            </div>

            <div className="tip-input-group">

              <label>Tip Percentage (%)</label>

              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="Example: 10"
                value={tipPercent}
                onChange={(e) => setTipPercent(e.target.value)}
              />

            </div>

            <div className="tip-input-group full-width">

              <label>Number of People</label>

              <input
                type="number"
                min="1"
                step="1"
                placeholder="Example: 2"
                value={people}
                onChange={(e) => setPeople(e.target.value)}
              />

            </div>

          </div>

          <div className="tip-buttons">

            <button
              className="tip-calculate-btn"
              onClick={calculateTip}
            >
              Calculate Tip
            </button>

            <button
              className="tip-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {result && (
            <div className="tip-result">

              <div className="tip-result-title">
                <span>💰</span>
                <h2>Your Tip Result</h2>
              </div>

              <div className="tip-main-result">

                <span>Amount Per Person</span>

                <strong>
                  {money(result.perPerson)}
                </strong>

              </div>

              <div className="tip-summary">

                <div>
                  <span>Bill Amount</span>

                  <strong>
                    {money(parseFloat(bill))}
                  </strong>
                </div>

                <div>
                  <span>Tip Amount</span>

                  <strong>
                    {money(result.tipAmount)}
                  </strong>
                </div>

                <div>
                  <span>Total Bill</span>

                  <strong>
                    {money(result.totalAmount)}
                  </strong>
                </div>

              </div>

              <div className="tip-details">

                <div>
                  <span>Tip Percentage</span>

                  <strong>
                    {tipPercent}%
                  </strong>
                </div>

                <div>
                  <span>Number of People</span>

                  <strong>
                    {result.people}
                  </strong>
                </div>

                <div>
                  <span>Each Person Pays</span>

                  <strong>
                    {money(result.perPerson)}
                  </strong>
                </div>

              </div>

            </div>
          )}

        </div>

        <div className="tip-info">

          <h2>How to use the Tip Calculator</h2>

          <div className="tip-steps">

            <div className="tip-step">

              <b>1</b>

              <div>
                <h3>Enter your bill</h3>

                <p>
                  Enter the total amount of your restaurant
                  or service bill.
                </p>
              </div>

            </div>

            <div className="tip-step">

              <b>2</b>

              <div>
                <h3>Enter tip percentage</h3>

                <p>
                  Enter the percentage you want to give as a tip.
                </p>
              </div>

            </div>

            <div className="tip-step">

              <b>3</b>

              <div>
                <h3>Enter number of people</h3>

                <p>
                  Enter how many people will share the bill.
                </p>
              </div>

            </div>

            <div className="tip-step">

              <b>4</b>

              <div>
                <h3>Calculate</h3>

                <p>
                  CALVORO calculates the tip and amount
                  each person should pay.
                </p>
              </div>

            </div>

          </div>

          <div className="tip-note">
            <strong>Example:</strong> A 5,000 bill with a
            10% tip for 2 people results in a 500 tip,
            5,500 total bill, and 2,750 per person.
          </div>

        </div>

        <div className="tip-back">
          <a href="/">← Back to CALVORO</a>
        </div>

      </div>

    </div>
  );
}

export default TipCalculator;