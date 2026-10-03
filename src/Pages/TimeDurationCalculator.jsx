import { useState } from "react";
import "./TimeDurationCalculator.css";

function TimeDurationCalculator() {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [result, setResult] = useState(null);

  const calculateDuration = () => {
    if (!startTime || !endTime) {
      setResult(null);
      return;
    }

    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    let startTotalMinutes = startHours * 60 + startMinutes;
    let endTotalMinutes = endHours * 60 + endMinutes;

    if (endTotalMinutes < startTotalMinutes) {
      endTotalMinutes += 24 * 60;
    }

    const difference = endTotalMinutes - startTotalMinutes;

    const hours = Math.floor(difference / 60);
    const minutes = difference % 60;

    const totalHours = difference / 60;
    const totalMinutes = difference;

    setResult({
      hours,
      minutes,
      totalHours,
      totalMinutes,
    });
  };

  const clearCalculator = () => {
    setStartTime("");
    setEndTime("");
    setResult(null);
  };

  return (
    <div className="duration-page">
      <div className="duration-container">

        <div className="duration-breadcrumb">
          <a href="/">Home</a>
          <span>→</span>
          <span>Time Duration Calculator</span>
        </div>

        <div className="duration-header">
          <div className="duration-icon">⏱️</div>

          <div className="duration-badge">
            FREE ONLINE TOOL
          </div>

          <h1>Time Duration Calculator</h1>

          <p>
            Calculate the exact time difference between two times
            quickly and easily.
          </p>
        </div>

        <div className="duration-card">

          <div className="duration-input-grid">

            <div className="duration-input-group">
              <label>Start Time</label>

              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>

            <div className="duration-arrow">
              →
            </div>

            <div className="duration-input-group">
              <label>End Time</label>

              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>

          </div>

          <div className="duration-buttons">

            <button
              className="duration-calculate-btn"
              onClick={calculateDuration}
            >
              Calculate Duration
            </button>

            <button
              className="duration-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {result && (
            <div className="duration-result">

              <div className="duration-result-main">
                <span>Time Duration</span>

                <strong>
                  {result.hours}h {result.minutes}m
                </strong>
              </div>

              <div className="duration-summary">

                <div>
                  <span>Hours</span>
                  <strong>{result.hours}</strong>
                </div>

                <div>
                  <span>Minutes</span>
                  <strong>{result.minutes}</strong>
                </div>

                <div>
                  <span>Total Minutes</span>
                  <strong>{result.totalMinutes}</strong>
                </div>

                <div>
                  <span>Total Hours</span>
                  <strong>{result.totalHours.toFixed(2)}</strong>
                </div>

              </div>

            </div>
          )}

        </div>

        <div className="duration-info">

          <h2>How to Use the Time Duration Calculator</h2>

          <ol>
            <li>Enter the start time.</li>
            <li>Enter the end time.</li>
            <li>Click "Calculate Duration".</li>
            <li>View the hours and minutes between the two times.</li>
          </ol>

          <div className="duration-note">
            <strong>Note:</strong>
            <br />
            If the end time is earlier than the start time,
            the calculator assumes the end time is on the next day.
          </div>

        </div>

        <div className="duration-back">
          <a href="/">← Back to CALVORO</a>
        </div>

      </div>
    </div>
  );
}

export default TimeDurationCalculator;