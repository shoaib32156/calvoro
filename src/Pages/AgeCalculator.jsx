import { useState } from "react";
import "./AgeCalculator.css";
import AgeCalculatorGuide from "./AgeCalculatorGuide.jsx";

function AgeCalculator() {
  const [birthDate, setBirthDate] = useState("");
  const [result, setResult] = useState(null);

  const calculateAge = () => {
    if (!birthDate) {
      alert("Please select your date of birth.");
      return;
    }

    const birth = new Date(birthDate + "T00:00:00");
    const today = new Date();

    if (birth > today) {
      alert("Birth date cannot be in the future.");
      return;
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months--;

      const previousMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      );

      days += previousMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor(
      (today - birth) / (1000 * 60 * 60 * 24)
    );

    setResult({
      years,
      months,
      days,
      totalDays,
    });
  };

  const clearCalculator = () => {
    setBirthDate("");
    setResult(null);
  };

  return (
    <div className="age-page">

      <div className="age-container">

        <div className="age-breadcrumb">
          <a href="/">CALVORO</a>
          <span> / </span>
          <span>Age Calculator</span>
        </div>

        <div className="age-header">

          <div className="age-icon">
            🎂
          </div>

          <div className="age-badge">
            FREE ONLINE TOOL
          </div>

          <h1>Age Calculator</h1>

          <p>
            Calculate your exact age in years, months, and days.
          </p>

        </div>

        <div className="age-card">

          <div className="input-section">

            <label htmlFor="birthDate">
              Date of Birth
            </label>

            <input
              id="birthDate"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />

          </div>

          <div className="age-buttons">

            <button
              className="calculate-btn"
              onClick={calculateAge}
            >
              Calculate My Age
            </button>

            <button
              className="clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {result && (
            <div className="age-result">

              <div className="result-title">
                <span>✨</span>
                <h2>Your Exact Age</h2>
              </div>

              <div className="age-boxes">

                <div className="age-box">
                  <strong>{result.years}</strong>
                  <span>Years</span>
                </div>

                <div className="age-box">
                  <strong>{result.months}</strong>
                  <span>Months</span>
                </div>

                <div className="age-box">
                  <strong>{result.days}</strong>
                  <span>Days</span>
                </div>

              </div>

              <div className="total-days">
                <strong>{result.totalDays.toLocaleString()}</strong>
                <span>Total Days Lived</span>
              </div>

            </div>
          )}

        </div>

        <div className="age-info">

          <h2>How to use the Age Calculator</h2>

          <div className="info-grid">

            <div className="info-item">
              <div className="info-number">1</div>

              <div>
                <h3>Enter your birthday</h3>
                <p>
                  Select your date of birth using the date picker.
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-number">2</div>

              <div>
                <h3>Calculate</h3>
                <p>
                  Click the Calculate My Age button.
                </p>
              </div>
            </div>

            <div className="info-item">
              <div className="info-number">3</div>

              <div>
                <h3>Get your result</h3>
                <p>
                  Your age will be displayed in years, months, and days.
                </p>
              </div>
            </div>

          </div>

                </div>

        <AgeCalculatorGuide />

        <div className="back-home">

        
          <a href="/">
            ← Back to CALVORO
          </a>
        </div>

      </div>

    </div>
  );
}

export default AgeCalculator;