import { useState } from "react";
import "./DateDifferenceCalculator.css";

function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [result, setResult] = useState(null);

  const calculateDifference = () => {
    if (!startDate || !endDate) {
      setResult(null);
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const differenceMs = Math.abs(end - start);

    const totalDays = Math.floor(
      differenceMs / (1000 * 60 * 60 * 24)
    );

    const years = Math.floor(totalDays / 365);
    const remainingAfterYears = totalDays % 365;

    const months = Math.floor(remainingAfterYears / 30);
    const days = remainingAfterYears % 30;

    setResult({
      totalDays,
      years,
      months,
      days,
    });
  };

  const clearCalculator = () => {
    setStartDate("");
    setEndDate("");
    setResult(null);
  };

  return (
    <div className="date-difference-page">
      <div className="date-difference-container">

        <div className="date-difference-breadcrumb">
          <a href="/">Home</a>
          <span>→</span>
          <span>Date Difference Calculator</span>
        </div>

        <div className="date-difference-header">
          <div className="date-difference-icon">📅</div>

          <div className="date-difference-badge">
            FREE ONLINE TOOL
          </div>

          <h1>Date Difference Calculator</h1>

          <p>
            Calculate the exact number of days between two dates
            quickly and easily.
          </p>
        </div>

        <div className="date-difference-card">

          <div className="date-difference-input-grid">

            <div className="date-difference-input-group">
              <label>Start Date</label>

              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="date-difference-arrow">
              →
            </div>

            <div className="date-difference-input-group">
              <label>End Date</label>

              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

          </div>

          <div className="date-difference-buttons">

            <button
              className="date-difference-calculate-btn"
              onClick={calculateDifference}
            >
              Calculate Difference
            </button>

            <button
              className="date-difference-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {result && (
            <div className="date-difference-result">

              <div className="date-difference-result-main">
                <span>Total Difference</span>

                <strong>
                  {result.totalDays} Days
                </strong>
              </div>

              <div className="date-difference-summary">

                <div>
                  <span>Years</span>
                  <strong>{result.years}</strong>
                </div>

                <div>
                  <span>Months</span>
                  <strong>{result.months}</strong>
                </div>

                <div>
                  <span>Days</span>
                  <strong>{result.days}</strong>
                </div>

                <div>
                  <span>Total Days</span>
                  <strong>{result.totalDays}</strong>
                </div>

              </div>

            </div>
          )}

        </div>

        <div className="date-difference-info">

          <h2>How to Use the Date Difference Calculator</h2>

          <ol>
            <li>Enter the start date.</li>
            <li>Enter the end date.</li>
            <li>Click "Calculate Difference".</li>
            <li>View the total number of days between the dates.</li>
          </ol>

          <div className="date-difference-note">
            <strong>Note:</strong>
            <br />
            The calculator uses the absolute difference between
            the two selected dates, so the order of the dates
            does not affect the result.
          </div>

        </div>

        <div className="date-difference-back">
          <a href="/">← Back to CALVORO</a>
        </div>

      </div>
    </div>
  );
}

export default DateDifferenceCalculator;