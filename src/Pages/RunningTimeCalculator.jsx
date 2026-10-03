import { useState } from "react";
import "./RunningTimeCalculator.css";

function RunningTimeCalculator() {
  const [distance, setDistance] = useState("");
  const [paceMinutes, setPaceMinutes] = useState("");
  const [paceSeconds, setPaceSeconds] = useState("");
  const [result, setResult] = useState(null);

  const calculateTime = () => {
    const distanceValue = Number(distance);
    const paceMinutesValue = Number(paceMinutes);
    const paceSecondsValue = Number(paceSeconds);

    if (
      !distance ||
      !paceMinutes ||
      distanceValue <= 0 ||
      paceMinutesValue < 0 ||
      paceSecondsValue < 0 ||
      paceSecondsValue >= 60
    ) {
      setResult(null);
      return;
    }

    const paceTotalSeconds =
      paceMinutesValue * 60 + paceSecondsValue;

    if (paceTotalSeconds <= 0) {
      setResult(null);
      return;
    }

    const totalSeconds = Math.round(
      distanceValue * paceTotalSeconds
    );

    const hours = Math.floor(totalSeconds / 3600);

    const minutes = Math.floor(
      (totalSeconds % 3600) / 60
    );

    const seconds = totalSeconds % 60;

    const totalMinutes = totalSeconds / 60;

    setResult({
      distance: distanceValue,
      paceMinutes: paceMinutesValue,
      paceSeconds: paceSecondsValue,
      hours,
      minutes,
      seconds,
      totalMinutes,
      totalSeconds,
    });
  };

  const clearCalculator = () => {
    setDistance("");
    setPaceMinutes("");
    setPaceSeconds("");
    setResult(null);
  };

  return (
    <div className="running-time-page">
      <div className="running-time-container">

        <div className="running-time-breadcrumb">
          <a href="/">Home</a>
          <span>→</span>
          <span>Running Time Calculator</span>
        </div>

        <div className="running-time-header">

          <div className="running-time-icon">
            🏃
          </div>

          <div className="running-time-badge">
            FREE ONLINE TOOL
          </div>

          <h1>Running Time Calculator</h1>

          <p>
            Calculate your total running time using
            distance and running pace.
          </p>

        </div>

        <div className="running-time-card">

          <div className="running-time-input-grid">

            <div className="running-time-input-group">
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

            <div className="running-time-input-group">
              <label>Pace Minutes</label>

              <input
                type="number"
                placeholder="Example: 6"
                value={paceMinutes}
                onChange={(e) =>
                  setPaceMinutes(e.target.value)
                }
              />
            </div>

            <div className="running-time-input-group">
              <label>Pace Seconds</label>

              <input
                type="number"
                placeholder="Example: 30"
                value={paceSeconds}
                onChange={(e) =>
                  setPaceSeconds(e.target.value)
                }
              />
            </div>

          </div>

          <div className="running-time-buttons">

            <button
              className="running-time-calculate-btn"
              onClick={calculateTime}
            >
              Calculate Running Time
            </button>

            <button
              className="running-time-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {result && (
            <div className="running-time-result">

              <div className="running-time-result-main">

                <span>Estimated Running Time</span>

                <strong>
                  {String(result.hours).padStart(2, "0")}:
                  {String(result.minutes).padStart(2, "0")}:
                  {String(result.seconds).padStart(2, "0")}
                </strong>

              </div>

              <div className="running-time-summary">

                <div>
                  <span>Distance</span>

                  <strong>
                    {result.distance} km
                  </strong>
                </div>

                <div>
                  <span>Pace</span>

                  <strong>
                    {result.paceMinutes}:
                    {String(result.paceSeconds).padStart(2, "0")} /km
                  </strong>
                </div>

                <div>
                  <span>Total Minutes</span>

                  <strong>
                    {result.totalMinutes.toFixed(2)}
                  </strong>
                </div>

                <div>
                  <span>Total Seconds</span>

                  <strong>
                    {result.totalSeconds}
                  </strong>
                </div>

              </div>

            </div>
          )}

        </div>

        <div className="running-time-info">

          <h2>How to Use the Running Time Calculator</h2>

          <ol>
            <li>Enter the running distance in kilometers.</li>
            <li>Enter your pace minutes per kilometer.</li>
            <li>Enter your pace seconds per kilometer.</li>
            <li>Click "Calculate Running Time".</li>
            <li>View your estimated total running time.</li>
          </ol>

          <div className="running-time-note">
            <strong>Formula:</strong>
            <br />
            Running Time = Distance × Pace
          </div>

        </div>

        <div className="running-time-back">
          <a href="/">← Back to CALVORO</a>
        </div>

      </div>
    </div>
  );
}

export default RunningTimeCalculator;