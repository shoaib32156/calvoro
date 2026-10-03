import { useState } from "react";
import "./BMICalculator.css";

function BMICalculator() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (!h || !w || h <= 0 || w <= 0) {
      alert("Please enter a valid height and weight.");
      return;
    }

    const heightMeters = h / 100;
    const bmi = w / (heightMeters * heightMeters);

    let category = "";

    if (bmi < 18.5) {
      category = "Underweight";
    } else if (bmi < 25) {
      category = "Normal weight";
    } else if (bmi < 30) {
      category = "Overweight";
    } else {
      category = "Obesity";
    }

    setResult({
      bmi: bmi.toFixed(1),
      category,
    });
  };

  const clearCalculator = () => {
    setHeight("");
    setWeight("");
    setResult(null);
  };

  return (
    <div className="bmi-page">

      <div className="bmi-container">

        <div className="bmi-breadcrumb">
          <a href="/">CALVORO</a>
          <span> / BMI Calculator</span>
        </div>

        <div className="bmi-header">

          <div className="bmi-icon">
            ⚖️
          </div>

          <div className="bmi-badge">
            FREE ONLINE TOOL
          </div>

          <h1>BMI Calculator</h1>

          <p>
            Calculate your Body Mass Index using your height and weight.
          </p>

        </div>

        <div className="bmi-card">

          <div className="bmi-input-grid">

            <div className="bmi-input-group">
              <label htmlFor="height">
                Height (cm)
              </label>

              <input
                id="height"
                type="number"
                placeholder="Example: 175"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>

            <div className="bmi-input-group">
              <label htmlFor="weight">
                Weight (kg)
              </label>

              <input
                id="weight"
                type="number"
                placeholder="Example: 70"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>

          </div>

          <div className="bmi-buttons">

            <button
              className="bmi-calculate-btn"
              onClick={calculateBMI}
            >
              Calculate BMI
            </button>

            <button
              className="bmi-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {result && (
            <div className="bmi-result">

              <div className="bmi-result-title">
                <span>📊</span>
                <h2>Your BMI Result</h2>
              </div>

              <div className="bmi-score">
                <strong>{result.bmi}</strong>
                <span>BMI</span>
              </div>

              <div className="bmi-category">
                {result.category}
              </div>

              <div className="bmi-scale">

                <div className="scale-row">
                  <span>Underweight</span>
                  <span>&lt; 18.5</span>
                </div>

                <div className="scale-row">
                  <span>Normal weight</span>
                  <span>18.5 – 24.9</span>
                </div>

                <div className="scale-row">
                  <span>Overweight</span>
                  <span>25 – 29.9</span>
                </div>

                <div className="scale-row">
                  <span>Obesity</span>
                  <span>30+</span>
                </div>

              </div>

            </div>
          )}

        </div>

        <div className="bmi-info">

          <h2>How to use the BMI Calculator</h2>

          <div className="bmi-steps">

            <div className="bmi-step">
              <div className="step-number">1</div>

              <div>
                <h3>Enter your height</h3>
                <p>
                  Enter your height in centimeters.
                </p>
              </div>
            </div>

            <div className="bmi-step">
              <div className="step-number">2</div>

              <div>
                <h3>Enter your weight</h3>
                <p>
                  Enter your weight in kilograms.
                </p>
              </div>
            </div>

            <div className="bmi-step">
              <div className="step-number">3</div>

              <div>
                <h3>Calculate</h3>
                <p>
                  Click Calculate BMI to see your result.
                </p>
              </div>
            </div>

          </div>

          <div className="bmi-note">
            <strong>Note:</strong> BMI is a general screening measurement
            and does not directly measure body fat or overall health.
          </div>

        </div>

        <div className="bmi-back">
          <a href="/">
            ← Back to CALVORO
          </a>
        </div>

      </div>

    </div>
  );
}

export default BMICalculator;