import { useState } from "react";
import "./RunningSpeedCalculator.css";

function RunningSpeedCalculator() {
  const [distance, setDistance] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [result, setResult] = useState(null);

  const calculateSpeed = () => {
    const distanceValue = Number(distance);
    const hoursValue = Number(hours) || 0;
    const minutesValue = Number(minutes) || 0;
    const secondsValue = Number(seconds) || 0;

    if (
      !distance ||
      distanceValue <= 0 ||
      hoursValue < 0 ||
      minutesValue < 0 ||
      secondsValue < 0 ||
      (hoursValue === 0 &&
        minutesValue === 0 &&
        secondsValue === 0)
    ) {
      setResult(null);
      return;
    }

    const totalSeconds =
      hoursValue * 3600 +
      minutesValue * 60 +
      secondsValue;

    const totalHours = totalSeconds / 3600;

    const speedKmh = distanceValue / totalHours;
    const speedMph = speedKmh * 0.621371;

    setResult({
      speedKmh,
      speedMph,
      distance: distanceValue,
      time: `${String(hoursValue).padStart(2, "0")}:${String(
        minutesValue
      ).padStart(2, "0")}:${String(secondsValue).padStart(2, "0")}`,
    });
  };

  const clearCalculator = () => {
    setDistance("");
    setHours("");
    setMinutes("");
    setSeconds("");
    setResult(null);
  };

  return (
    <div className="running-speed-page">
      <div className="running-speed-container">

        <div className="running-speed-breadcrumb">
          <a href="/">Home</a>
          <span>→</span>
          <span>Running Speed Calculator</span>
        </div>

        <div className="running-speed-header">

          <div className="running-speed-icon">
            🏃‍♂️
          </div>

          <div className="running-speed-badge">
            FREE ONLINE TOOL
          </div>

          <h1>Running Speed Calculator</h1>

          <p>
            Calculate your average running speed from
            distance and total time.
          </p>

        </div>

        <div className="running-speed-card">

          <div className="running-speed-input-grid">

            <div className="running-speed-input-group">
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

            <div className="running-speed-input-group">
              <label>Hours</label>

              <input
                type="number"
                min="0"
                placeholder="Example: 1"
                value={hours}
                onChange={(e) =>
                  setHours(e.target.value)
                }
              />
            </div>

            <div className="running-speed-input-group">
              <label>Minutes</label>

              <input
                type="number"
                min="0"
                placeholder="Example: 30"
                value={minutes}
                onChange={(e) =>
                  setMinutes(e.target.value)
                }
              />
            </div>

            <div className="running-speed-input-group">
              <label>Seconds</label>

              <input
                type="number"
                min="0"
                placeholder="Example: 0"
                value={seconds}
                onChange={(e) =>
                  setSeconds(e.target.value)
                }
              />
            </div>

          </div>

          <div className="running-speed-buttons">

            <button
              className="running-speed-calculate-btn"
              onClick={calculateSpeed}
            >
              Calculate Speed
            </button>

            <button
              className="running-speed-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {result && (
            <div className="running-speed-result">

              <div className="running-speed-result-main">

                <span>Average Running Speed</span>

                <strong>
                  {result.speedKmh.toFixed(2)} km/h
                </strong>

              </div>

              <div className="running-speed-summary">

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
                  <span>Total Time</span>

                  <strong>
                    {result.time}
                  </strong>
                </div>

              </div>

            </div>
          )}

        </div>

        <div className="running-speed-info">

          <h2>How to Use the Running Speed Calculator</h2>

          <ol>
            <li>Enter your running distance in kilometers.</li>
            <li>Enter your total running time.</li>
            <li>Click "Calculate Speed".</li>
            <li>View your average speed in km/h and mph.</li>
          </ol>

          <div className="running-speed-note">
            <strong>Formula:</strong>
            <br />
            Speed = Distance ÷ Time
          </div>

        </div>

        <div className="running-speed-back">
          <a href="/">← Back to CALVORO</a>
        </div>

      </div>
    </div>
  );
}

export default RunningSpeedCalculator;