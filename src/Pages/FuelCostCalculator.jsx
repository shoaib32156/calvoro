import { useState } from "react";
import "./FuelCostCalculator.css";

function FuelCostCalculator() {
  const [distance, setDistance] = useState("");
  const [efficiency, setEfficiency] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [tripType, setTripType] = useState("one-way");
  const [result, setResult] = useState(null);

  const calculateFuelCost = () => {
    const distanceValue = parseFloat(distance);
    const efficiencyValue = parseFloat(efficiency);
    const fuelPriceValue = parseFloat(fuelPrice);

    if (
      Number.isNaN(distanceValue) ||
      Number.isNaN(efficiencyValue) ||
      Number.isNaN(fuelPriceValue) ||
      distanceValue <= 0 ||
      efficiencyValue <= 0 ||
      fuelPriceValue <= 0
    ) {
      alert("Please enter valid positive numbers in all fields.");
      return;
    }

    const totalDistance =
      tripType === "round-trip"
        ? distanceValue * 2
        : distanceValue;

    const fuelUsed =
      totalDistance / efficiencyValue;

    const totalCost =
      fuelUsed * fuelPriceValue;

    const costPerKm =
      totalCost / totalDistance;

    setResult({
      totalDistance,
      fuelUsed,
      totalCost,
      costPerKm,
    });
  };

  const clearCalculator = () => {
    setDistance("");
    setEfficiency("");
    setFuelPrice("");
    setTripType("one-way");
    setResult(null);
  };

  return (
    <div className="fuel-page">

      <div className="fuel-container">

        <div className="fuel-breadcrumb">
          <a href="/">CALVORO</a>
          <span> / Fuel Cost Calculator</span>
        </div>

        <div className="fuel-header">

          <div className="fuel-icon">
            ⛽
          </div>

          <div className="fuel-badge">
            FREE ONLINE TOOL
          </div>

          <h1>
            Fuel Cost Calculator
          </h1>

          <p>
            Calculate fuel consumption, travel cost
            and cost per kilometer for your trip.
          </p>

        </div>

        <div className="fuel-card">

          <div className="fuel-input-grid">

            <div className="fuel-input-group">

              <label>
                Distance (km)
              </label>

              <input
                type="number"
                min="0"
                step="any"
                placeholder="Example: 250"
                value={distance}
                onChange={(e) => {
                  setDistance(e.target.value);
                  setResult(null);
                }}
              />

            </div>

            <div className="fuel-input-group">

              <label>
                Vehicle Efficiency (km/L)
              </label>

              <input
                type="number"
                min="0"
                step="any"
                placeholder="Example: 15"
                value={efficiency}
                onChange={(e) => {
                  setEfficiency(e.target.value);
                  setResult(null);
                }}
              />

            </div>

            <div className="fuel-input-group">

              <label>
                Fuel Price (per liter)
              </label>

              <input
                type="number"
                min="0"
                step="any"
                placeholder="Example: 300"
                value={fuelPrice}
                onChange={(e) => {
                  setFuelPrice(e.target.value);
                  setResult(null);
                }}
              />

            </div>

          </div>

          <div className="fuel-trip-section">

            <label>
              Trip Type
            </label>

            <div className="fuel-trip-options">

              <button
                className={
                  tripType === "one-way"
                    ? "fuel-trip-option active"
                    : "fuel-trip-option"
                }
                onClick={() => {
                  setTripType("one-way");
                  setResult(null);
                }}
              >
                🚗 One Way
              </button>

              <button
                className={
                  tripType === "round-trip"
                    ? "fuel-trip-option active"
                    : "fuel-trip-option"
                }
                onClick={() => {
                  setTripType("round-trip");
                  setResult(null);
                }}
              >
                🔄 Round Trip
              </button>

            </div>

          </div>

          <div className="fuel-buttons">

            <button
              className="fuel-calculate-btn"
              onClick={calculateFuelCost}
            >
              Calculate Fuel Cost
            </button>

            <button
              className="fuel-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {result && (
            <div className="fuel-result">

              <div className="fuel-result-title">
                <span>⛽</span>
                <h2>
                  Trip Cost Result
                </h2>
              </div>

              <div className="fuel-main-result">

                <span>
                  Total Fuel Cost
                </span>

                <strong>
                  {result.totalCost.toLocaleString(
                    "en-US",
                    {
                      maximumFractionDigits: 2,
                    }
                  )}
                </strong>

              </div>

              <div className="fuel-summary">

                <div>
                  <span>
                    Total Distance
                  </span>

                  <strong>
                    {result.totalDistance.toLocaleString(
                      "en-US",
                      {
                        maximumFractionDigits: 2,
                      }
                    )}{" "}
                    km
                  </strong>
                </div>

                <div>
                  <span>
                    Fuel Used
                  </span>

                  <strong>
                    {result.fuelUsed.toLocaleString(
                      "en-US",
                      {
                        maximumFractionDigits: 2,
                      }
                    )}{" "}
                    L
                  </strong>
                </div>

                <div>
                  <span>
                    Cost Per Kilometer
                  </span>

                  <strong>
                    {result.costPerKm.toLocaleString(
                      "en-US",
                      {
                        maximumFractionDigits: 2,
                      }
                    )}
                  </strong>
                </div>

              </div>

            </div>
          )}

        </div>

        <div className="fuel-info">

          <h2>
            How to use the Fuel Cost Calculator
          </h2>

          <div className="fuel-steps">

            <div className="fuel-step">

              <b>1</b>

              <div>
                <h3>
                  Enter your distance
                </h3>

                <p>
                  Enter the total distance of your
                  planned trip in kilometers.
                </p>
              </div>

            </div>

            <div className="fuel-step">

              <b>2</b>

              <div>
                <h3>
                  Enter vehicle efficiency
                </h3>

                <p>
                  Enter how many kilometers your
                  vehicle travels using one liter of fuel.
                </p>
              </div>

            </div>

            <div className="fuel-step">

              <b>3</b>

              <div>
                <h3>
                  Enter fuel price
                </h3>

                <p>
                  Enter the current price of one liter
                  of fuel in your currency.
                </p>
              </div>

            </div>

            <div className="fuel-step">

              <b>4</b>

              <div>
                <h3>
                  Calculate
                </h3>

                <p>
                  CALVORO calculates your estimated
                  fuel usage and trip cost.
                </p>
              </div>

            </div>

          </div>

          <div className="fuel-note">
            <strong>Formula:</strong> Fuel Used =
            Distance ÷ Vehicle Efficiency.
            Total Cost = Fuel Used × Fuel Price.
          </div>

        </div>

        <div className="fuel-back">
          <a href="/">
            ← Back to CALVORO
          </a>
        </div>

      </div>

    </div>
  );
}

export default FuelCostCalculator;