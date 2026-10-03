import { useState } from "react";
import "./PaceCalculator.css";

function PaceCalculator() {
  const [distance, setDistance] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [result, setResult] = useState(null);

  const calculatePace = () => {
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
      (hoursValue === 0 && minutesValue === 0 && secondsValue === 0)
    ) {
      setResult(null);
      return;
    }

    const totalSeconds =
      hoursValue * 3600 +
      minutesValue * 60 +
      secondsValue;

    const paceSecondsPerKm = totalSeconds / distanceValue;
    const paceSecondsPerMile = paceSecondsPerKm * 1.609344;

    const formatPace = (totalPaceSeconds) => {
      const paceMinutes = Math.floor(totalPaceSeconds / 60);
      const paceSeconds = Math.round(totalPaceSeconds % 60);

      if (paceSeconds === 60) {
        return `${paceMinutes + 1}:00`;
      }

      return `${paceMinutes}:${String(paceSeconds).padStart(2, "0")}`;
    };

    const averageSpeedKmh =
      distanceValue / (totalSeconds / 3600);

    setResult({
      pacePerKm: formatPace(paceSecondsPerKm),
      pacePerMile: formatPace(paceSecondsPerMile),
      totalTime: `${String(hoursValue).padStart(2, "0")}:${String(
        minutesValue
      ).padStart(2, "0")}:${String(secondsValue).padStart(2, "0")}`,
      distance: distanceValue,
      speed: averageSpeedKmh,
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
    <div className="pace-page">
      <div className="pace-container">

        <div className="pace-breadcrumb">
          <a href="/">Home</a>
          <span>→</span>
          <span>Pace Calculator</span>
        </div>

        <div className="pace-header">
          <div className="pace-icon">🏃</div>

          <div className="pace-badge">
            FREE ONLINE TOOL
          </div>

          <h1>Pace Calculator</h1>

          <p>
            Calculate your running or walking pace from
            distance and time quickly and easily.
          </p>
        </div>

        <div className="pace-card">

          <div className="pace-input-grid">

            <div className="pace-input-group">
              <label>Distance (km)</label>

              <input
                type="number"
                placeholder="Example: 10"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </div>

            <div className="pace-input-group">
              <label>Hours</label>

              <input
                type="number"
                min="0"
                placeholder="Example: 1"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
              />
            </div>

            <div className="pace-input-group">
              <label>Minutes</label>

              <input
                type="number"
                min="0"
                placeholder="Example: 30"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
              />
            </div>

            <div className="pace-input-group">
              <label>Seconds</label>

              <input
                type="number"
                min="0"
                placeholder="Example: 0"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
              />
            </div>

          </div>

          <div className="pace-buttons">

            <button
              className="pace-calculate-btn"
              onClick={calculatePace}
            >
              Calculate Pace
            </button>

            <button
              className="pace-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {result && (
            <div className="pace-result">

              <div className="pace-result-main">
                <span>Pace per Kilometer</span>

                <strong>
                  {result.pacePerKm} /km
                </strong>
              </div>

              <div className="pace-summary">

                <div>
                  <span>Pace per km</span>
                  <strong>
                    {result.pacePerKm} /km
                  </strong>
                </div>

                <div>
                  <span>Pace per mile</span>
                  <strong>
                    {result.pacePerMile} /mile
                  </strong>
                </div>

                <div>
                  <span>Total Time</span>
                  <strong>
                    {result.totalTime}
                  </strong>
                </div>

                <div>
                  <span>Distance</span>
                  <strong>
                    {result.distance} km
                  </strong>
                </div>

                <div>
                  <span>Average Speed</span>
                  <strong>
                    {result.speed.toFixed(2)} km/h
                  </strong>
                </div>

              </div>

            </div>
          )}

        </div>

        <div className="pace-info">

          <h2>How to Use the Pace Calculator</h2>

          <ol>
            <li>Enter the distance in kilometers.</li>
            <li>Enter your total time.</li>
            <li>Click "Calculate Pace".</li>
            <li>View your pace per kilometer and mile.</li>
          </ol>

          <div className="pace-note">
            <strong>Formula:</strong>
            <br />
            Pace = Total Time ÷ Distance
          </div>

        </div>

        <div className="pace-back">
          <a href="/">← Back to CALVORO</a>
        </div>

      </div>
    </div>
  );
}

export default PaceCalculator;