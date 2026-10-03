import { useState } from "react";
import "./TimeToRunCalculator.css";

function TimeToRunCalculator() {
  const [distance, setDistance] = useState("");
  const [speed, setSpeed] = useState("");
  const [result, setResult] = useState(null);

  const calculateTime = () => {
    const distanceValue = Number(distance);
    const speedValue = Number(speed);

    if (
      !distance ||
      !speed ||
      distanceValue <= 0 ||
      speedValue <= 0
    ) {
      setResult(null);
      return;
    }

    const totalHours = distanceValue / speedValue;

    const totalSeconds = Math.round(totalHours * 3600);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor(
      (totalSeconds % 3600) / 60
    );
    const seconds = totalSeconds % 60;

    setResult({
      distance: distanceValue,
      speed: speedValue,
      hours,
      minutes,
      seconds,
      totalHours,
    });
  };

  const clearCalculator = () => {
    setDistance("");
    setSpeed("");
    setResult(null);
  };

  return (
    <div className="time-run-page">
      <div className="time-run-container">

        <div className="time-run-breadcrumb">
          <a href="/">Home</a>
          <span>→</span>
          <span>Time to Run Calculator</span>
        </div>

        <div className="time-run-header">

          <div className="time-run-icon">
            ⏱️
          </div>

          <div className="time-run-badge">
            FREE ONLINE TOOL
          </div>

          <h1>Time to Run Calculator</h1>

          <p>
            Calculate how long it will take to travel a
            distance at a given speed.
          </p>

        </div>

        <div className="time-run-card">

          <div className="time-run-input-grid">

            <div className="time-run-input-group">
              <label>Distance (km)</label>

              <input
                type="number"
                placeholder="Example: 10"
                value={distance}
                onChange={(e) =>
                  setDistance(e.target.value)
                }
              />
            </div>

            <div className="time-run-input-group">
              <label>Speed (km/h)</label>

              <input
                type="number"
                placeholder="Example: 10"
                value={speed}
                onChange={(e) =>
                  setSpeed(e.target.value)
                }
              />
            </div>

          </div>

          <div className="time-run-buttons">

            <button
              className="time-run-calculate-btn"
              onClick={calculateTime}
            >
              Calculate Time
            </button>

            <button
              className="time-run-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {result && (
            <div className="time-run-result">

              <div className="time-run-result-main">

                <span>Estimated Travel Time</span>

                <strong>
                  {result.hours}h {result.minutes}m{" "}
                  {result.seconds}s
                </strong>

              </div>

              <div className="time-run-summary">

                <div>
                  <span>Distance</span>

                  <strong>
                    {result.distance} km
                  </strong>
                </div>

                <div>
                  <span>Speed</span>

                  <strong>
                    {result.speed} km/h
                  </strong>
                </div>

                <div>
                  <span>Total Hours</span>

                  <strong>
                    {result.totalHours.toFixed(2)}
                  </strong>
                </div>

                <div>
                  <span>Total Minutes</span>

                  <strong>
                    {(result.totalHours * 60).toFixed(2)}
                  </strong>
                </div>

              </div>

            </div>
          )}

        </div>

        <div className="time-run-info">

          <h2>How to Use the Time to Run Calculator</h2>

          <ol>
            <li>Enter the distance in kilometers.</li>
            <li>Enter the speed in kilometers per hour.</li>
            <li>Click "Calculate Time".</li>
            <li>View the estimated travel time.</li>
          </ol>

          <div className="time-run-note">
            <strong>Formula:</strong>
            <br />
            Time = Distance ÷ Speed
          </div>

        </div>

        <div className="time-run-back">
          <a href="/">← Back to CALVORO</a>
        </div>

      </div>
    </div>
  );
}

export default TimeToRunCalculator;