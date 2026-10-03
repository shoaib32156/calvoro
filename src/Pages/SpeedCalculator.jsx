import { useState } from "react";
import "./SpeedCalculator.css";

function SpeedCalculator() {
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState(null);

  const calculateSpeed = () => {
    const distanceValue = Number(distance);
    const timeValue = Number(time);

    if (
      !distance ||
      !time ||
      distanceValue <= 0 ||
      timeValue <= 0
    ) {
      setResult(null);
      return;
    }

    const speedKmh = distanceValue / timeValue;
    const speedMph = speedKmh * 0.621371;

    setResult({
      speedKmh,
      speedMph,
      distance: distanceValue,
      time: timeValue,
    });
  };

  const clearCalculator = () => {
    setDistance("");
    setTime("");
    setResult(null);
  };

  return (
    <div className="speed-page">
      <div className="speed-container">

        <div className="speed-breadcrumb">
          <a href="/">Home</a>
          <span>→</span>
          <span>Speed Calculator</span>
        </div>

        <div className="speed-header">
          <div className="speed-icon">🚗</div>

          <div className="speed-badge">
            FREE ONLINE TOOL
          </div>

          <h1>Speed Calculator</h1>

          <p>
            Calculate speed from distance and travel time
            quickly and easily.
          </p>
        </div>

        <div className="speed-card">

          <div className="speed-input-grid">

            <div className="speed-input-group">
              <label>Distance (km)</label>

              <input
                type="number"
                placeholder="Example: 120"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </div>

            <div className="speed-input-group">
              <label>Time (hours)</label>

              <input
                type="number"
                placeholder="Example: 2"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>

          </div>

          <div className="speed-buttons">

            <button
              className="speed-calculate-btn"
              onClick={calculateSpeed}
            >
              Calculate Speed
            </button>

            <button
              className="speed-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {result && (
            <div className="speed-result">

              <div className="speed-result-main">
                <span>Average Speed</span>

                <strong>
                  {result.speedKmh.toFixed(2)} km/h
                </strong>
              </div>

              <div className="speed-summary">

                <div>
                  <span>Speed (km/h)</span>
                  <strong>
                    {result.speedKmh.toFixed(2)}
                  </strong>
                </div>

                <div>
                  <span>Speed (mph)</span>
                  <strong>
                    {result.speedMph.toFixed(2)}
                  </strong>
                </div>

                <div>
                  <span>Distance</span>
                  <strong>
                    {result.distance} km
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

        <div className="speed-info">

          <h2>How to Use the Speed Calculator</h2>

          <ol>
            <li>Enter the distance traveled in kilometers.</li>
            <li>Enter the travel time in hours.</li>
            <li>Click "Calculate Speed".</li>
            <li>View the speed in km/h and mph.</li>
          </ol>

          <div className="speed-note">
            <strong>Formula:</strong>
            <br />
            Speed = Distance ÷ Time
          </div>

        </div>

        <div className="speed-back">
          <a href="/">← Back to CALVORO</a>
        </div>

      </div>
    </div>
  );
}

export default SpeedCalculator;