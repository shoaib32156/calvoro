import { useState } from "react";
import "./CurrencyConverter.css";

function CurrencyConverter() {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");
  const [result, setResult] = useState(null);

  const rates = {
    USD: 1,
    PKR: 280,
    EUR: 1.17,
    GBP: 1.35,
    AED: 3.67,
    SAR: 3.75,
    CAD: 1.38,
    AUD: 1.51,
    INR: 88,
    CNY: 7.12,
    JPY: 148,
  };

  const calculateConversion = () => {
    const value = parseFloat(amount);

    if (!value || value < 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const amountInUSD = value / rates[fromCurrency];
    const convertedAmount = amountInUSD * rates[toCurrency];

    setResult(convertedAmount);
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
  };

  const clearCalculator = () => {
    setAmount("");
    setFromCurrency("USD");
    setToCurrency("PKR");
    setResult(null);
  };

  const formatNumber = (value) => {
    return value.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="currency-page">
      <div className="currency-container">

        <div className="currency-breadcrumb">
          <a href="/">CALVORO</a>
          <span> / Currency Converter</span>
        </div>

        <div className="currency-header">

          <div className="currency-icon">
            💱
          </div>

          <div className="currency-badge">
            FREE ONLINE TOOL
          </div>

          <h1>Currency Converter</h1>

          <p>
            Convert currencies quickly and easily using
            CALVORO's currency converter.
          </p>

        </div>

        <div className="currency-card">

          <div className="currency-input">

            <label>Amount</label>

            <input
              type="number"
              min="0"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

          </div>

          <div className="currency-select-grid">

            <div className="currency-group">

              <label>From</label>

              <select
                value={fromCurrency}
                onChange={(e) => {
                  setFromCurrency(e.target.value);
                  setResult(null);
                }}
              >
                <option value="USD">USD - US Dollar</option>
                <option value="PKR">PKR - Pakistani Rupee</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="AED">AED - UAE Dirham</option>
                <option value="SAR">SAR - Saudi Riyal</option>
                <option value="CAD">CAD - Canadian Dollar</option>
                <option value="AUD">AUD - Australian Dollar</option>
                <option value="INR">INR - Indian Rupee</option>
                <option value="CNY">CNY - Chinese Yuan</option>
                <option value="JPY">JPY - Japanese Yen</option>
              </select>

            </div>

            <button
              className="swap-button"
              onClick={swapCurrencies}
              title="Swap currencies"
            >
              ⇄
            </button>

            <div className="currency-group">

              <label>To</label>

              <select
                value={toCurrency}
                onChange={(e) => {
                  setToCurrency(e.target.value);
                  setResult(null);
                }}
              >
                <option value="USD">USD - US Dollar</option>
                <option value="PKR">PKR - Pakistani Rupee</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="AED">AED - UAE Dirham</option>
                <option value="SAR">SAR - Saudi Riyal</option>
                <option value="CAD">CAD - Canadian Dollar</option>
                <option value="AUD">AUD - Australian Dollar</option>
                <option value="INR">INR - Indian Rupee</option>
                <option value="CNY">CNY - Chinese Yuan</option>
                <option value="JPY">JPY - Japanese Yen</option>
              </select>

            </div>

          </div>

          <div className="currency-buttons">

            <button
              className="convert-button"
              onClick={calculateConversion}
            >
              Convert Currency
            </button>

            <button
              className="currency-clear"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {result !== null && (
            <div className="currency-result">

              <div className="result-heading">
                <span>💰</span>
                <h2>Conversion Result</h2>
              </div>

              <div className="result-main">

                <span>
                  {formatNumber(parseFloat(amount))} {fromCurrency}
                </span>

                <div className="result-arrow">
                  ↓
                </div>

                <strong>
                  {formatNumber(result)} {toCurrency}
                </strong>

              </div>

              <div className="rate-box">

                <span>Exchange Rate</span>

                <strong>
                  1 {fromCurrency} ={" "}
                  {formatNumber(
                    rates[toCurrency] / rates[fromCurrency]
                  )} {toCurrency}
                </strong>

              </div>

            </div>
          )}

        </div>

        <div className="currency-info">

          <h2>Popular Currency Conversions</h2>

          <div className="popular-grid">

            <div>
              <span>USD → PKR</span>
              <strong>US Dollar to Pakistani Rupee</strong>
            </div>

            <div>
              <span>GBP → PKR</span>
              <strong>British Pound to Pakistani Rupee</strong>
            </div>

            <div>
              <span>EUR → PKR</span>
              <strong>Euro to Pakistani Rupee</strong>
            </div>

            <div>
              <span>AED → PKR</span>
              <strong>UAE Dirham to Pakistani Rupee</strong>
            </div>

          </div>

          <div className="currency-note">
            <strong>Important:</strong> Exchange rates shown by this
            demo calculator are sample rates and may not represent
            current market rates. Actual rates can change throughout
            the day.
          </div>

        </div>

        <div className="currency-back">
          <a href="/">← Back to CALVORO</a>
        </div>

      </div>
    </div>
  );
}

export default CurrencyConverter;