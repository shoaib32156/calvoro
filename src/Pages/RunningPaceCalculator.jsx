import { useState } from "react";
import "./RunningPaceCalculator.css";

function RunningPaceCalculator() {
  const [distance, setDistance] = useState("");
  const [hours, setHours] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [result, setResult] = useState(null);

  const formatPace = (totalSeconds) => {
    const paceMinutes = Math.floor(totalSeconds / 60);
    const paceSeconds = Math.round(totalSeconds % 60);

    if (paceSeconds === 60) {
      return `${paceMinutes + 1}:00`;
    }

    return `${paceMinutes}:${String(paceSeconds).padStart(2, "0")}`;
  };

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
      minutesValue >= 60 ||
      secondsValue < 0 ||
      secondsValue >= 60
    ) {
      setResult(null);
      return;
    }

    const totalSeconds =
      hoursValue * 3600 +
      minutesValue * 60 +
      secondsValue;

    if (totalSeconds <= 0) {
      setResult(null);
      return;
    }

    const pacePerKm =
      totalSeconds / distanceValue;

    const pacePerMile =
      pacePerKm * 1.609344;

    const speedKmh =
      distanceValue / (totalSeconds / 3600);

    setResult({
      distance: distanceValue,
      hours: hoursValue,
      minutes: minutesValue,
      seconds: secondsValue,
      totalSeconds,
      pacePerKm,
      pacePerMile,
      speedKmh,
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
    <div className="running-pace-page">
      <div className="running-pace-container">

        <div className="running-pace-breadcrumb">
          <a href="/">Home</a>
          <span>→</span>
          <span>Running Pace Calculator</span>
        </div>

        <div className="running-pace-header">

          <div className="running-pace-icon">
            🏃‍♀️
          </div>

          <div className="running-pace-badge">
            FREE ONLINE TOOL
          </div>

          <h1>Running Pace Calculator</h1>

          <p>
            Calculate your running pace from distance
            and total running time.
          </p>

        </div>

        <div className="running-pace-card">

          <div className="running-pace-input-grid">

            <div className="running-pace-input-group">
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

            <div className="running-pace-input-group">
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

            <div className="running-pace-input-group">
              <label>Minutes</label>

              <input
                type="number"
                min="0"
                max="59"
                placeholder="Example: 0"
                value={minutes}
                onChange={(e) =>
                  setMinutes(e.target.value)
                }
              />
            </div>

            <div className="running-pace-input-group">
              <label>Seconds</label>

              <input
                type="number"
                min="0"
                max="59"
                placeholder="Example: 0"
                value={seconds}
                onChange={(e) =>
                  setSeconds(e.target.value)
                }
              />
            </div>

          </div>

          <div className="running-pace-buttons">

            <button
              className="running-pace-calculate-btn"
              onClick={calculatePace}
            >
              Calculate Pace
            </button>

            <button
              className="running-pace-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {result && (
            <div className="running-pace-result">

              <div className="running-pace-result-main">

                <span>Average Running Pace</span>

                <strong>
                  {formatPace(result.pacePerKm)} /km
                </strong>

              </div>

              <div className="running-pace-summary">

                <div>
                  <span>Pace per Kilometer</span>

                  <strong>
                    {formatPace(result.pacePerKm)} /km
                  </strong>
                </div>

                <div>
                  <span>Pace per Mile</span>

                  <strong>
                    {formatPace(result.pacePerMile)} /mile
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
                    {result.speedKmh.toFixed(2)} km/h
                  </strong>
                </div>

              </div>

            </div>
          )}

        </div>

        <div className="running-pace-info">

          <h2>How to Use the Running Pace Calculator</h2>

          <ol>
            <li>Enter your running distance in kilometers.</li>
            <li>Enter your total running time.</li>
            <li>Click "Calculate Pace".</li>
            <li>View your pace per kilometer and mile.</li>
            <li>Check your average running speed.</li>
          </ol>

          <div className="running-pace-note">
            <strong>Formula:</strong>
            <br />
            Pace = Total Time ÷ Distance
          </div>

        </div>

        <div className="running-pace-back">
          <a href="/">← Back to CALVORO</a>
        </div>

      </div>
    </div>
  );
}

export default RunningPaceCalculator;