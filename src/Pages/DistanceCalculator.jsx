import { useState } from "react";
import "./DistanceCalculator.css";

function DistanceCalculator() {
  const [speed, setSpeed] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState(null);

  const calculateDistance = () => {
    const speedValue = Number(speed);
    const timeValue = Number(time);

    if (
      !speed ||
      !time ||
      speedValue <= 0 ||
      timeValue <= 0
    ) {
      setResult(null);
      return;
    }

    const distanceKm = speedValue * timeValue;
    const distanceMiles = distanceKm * 0.621371;

    setResult({
      distanceKm,
      distanceMiles,
      speed: speedValue,
      time: timeValue,
    });
  };

  const clearCalculator = () => {
    setSpeed("");
    setTime("");
    setResult(null);
  };

  return (
    <div className="distance-page">
      <div className="distance-container">

        <div className="distance-breadcrumb">
          <a href="/">Home</a>
          <span>→</span>
          <span>Distance Calculator</span>
        </div>

        <div className="distance-header">
          <div className="distance-icon">📍</div>

          <div className="distance-badge">
            FREE ONLINE TOOL
          </div>

          <h1>Distance Calculator</h1>

          <p>
            Calculate distance using speed and travel time
            quickly and easily.
          </p>
        </div>

        <div className="distance-card">

          <div className="distance-input-grid">

            <div className="distance-input-group">
              <label>Speed (km/h)</label>

              <input
                type="number"
                placeholder="Example: 60"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
              />
            </div>

            <div className="distance-input-group">
              <label>Time (hours)</label>

              <input
                type="number"
                placeholder="Example: 2"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

          </div>

          <div className="distance-buttons">

            <button
              className="distance-calculate-btn"
              onClick={calculateDistance}
            >
              Calculate Distance
            </button>

            <button
              className="distance-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {result && (
            <div className="distance-result">

              <div className="distance-result-main">
                <span>Total Distance</span>

                <strong>
                  {result.distanceKm.toFixed(2)} km
                </strong>
              </div>

              <div className="distance-summary">

                <div>
                  <span>Distance (km)</span>
                  <strong>
                    {result.distanceKm.toFixed(2)}
                  </strong>
                </div>

                <div>
                  <span>Distance (miles)</span>
                  <strong>
                    {result.distanceMiles.toFixed(2)}
                  </strong>
                </div>

                <div>
                  <span>Speed</span>
                  <strong>
                    {result.speed} km/h
                  </strong>
                </div>

                <div>
                  <span>Time</span>
                  <strong>
                    {result.time} hours
                  </strong>
                </div>

              </div>

            </div>
          )}

        </div>

        <div className="distance-info">

          <h2>How to Use the Distance Calculator</h2>

          <ol>
            <li>Enter the speed in kilometers per hour.</li>
            <li>Enter the travel time in hours.</li>
            <li>Click "Calculate Distance".</li>
            <li>View the distance in kilometers and miles.</li>
          </ol>

          <div className="distance-note">
            <strong>Formula:</strong>
            <br />
            Distance = Speed × Time
          </div>

        </div>

        <div className="distance-back">
          <a href="/">← Back to CALVORO</a>
        </div>

      </div>
    </div>
  );
}

export default DistanceCalculator;