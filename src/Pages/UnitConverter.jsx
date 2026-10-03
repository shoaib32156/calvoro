import { useState } from "react";
import "./UnitConverter.css";

const unitData = {
  Length: {
    units: {
      Meter: 1,
      Kilometer: 1000,
      Centimeter: 0.01,
      Millimeter: 0.001,
      Mile: 1609.344,
      Yard: 0.9144,
      Foot: 0.3048,
      Inch: 0.0254,
      "Nautical Mile": 1852,
    },
    icon: "📏",
  },

  Weight: {
    units: {
      Kilogram: 1,
      Gram: 0.001,
      Milligram: 0.000001,
      Pound: 0.45359237,
      Ounce: 0.028349523125,
      "Metric Ton": 1000,
    },
    icon: "⚖️",
  },

  Temperature: {
    units: {
      Celsius: "C",
      Fahrenheit: "F",
      Kelvin: "K",
    },
    icon: "🌡️",
  },

  Volume: {
    units: {
      Liter: 1,
      Milliliter: 0.001,
      "Cubic Meter": 1000,
      "US Gallon": 3.785411784,
      "US Quart": 0.946352946,
      "US Pint": 0.473176473,
      "US Cup": 0.2365882365,
      "Fluid Ounce": 0.0295735295625,
    },
    icon: "🧪",
  },

  Time: {
    units: {
      Second: 1,
      Millisecond: 0.001,
      Minute: 60,
      Hour: 3600,
      Day: 86400,
      Week: 604800,
      Year: 31536000,
    },
    icon: "⏱️",
  },

  Speed: {
    units: {
      "Meter/Second": 1,
      "Kilometer/Hour": 0.2777777778,
      "Mile/Hour": 0.44704,
      "Foot/Second": 0.3048,
      Knot: 0.5144444444,
    },
    icon: "🚗",
  },

  "Data Storage": {
    units: {
      Byte: 1,
      Kilobyte: 1024,
      Megabyte: 1024 ** 2,
      Gigabyte: 1024 ** 3,
      Terabyte: 1024 ** 4,
      Petabyte: 1024 ** 5,
    },
    icon: "💾",
  },
};

function UnitConverter() {
  const categories = Object.keys(unitData);

  const [category, setCategory] = useState("Length");
  const [amount, setAmount] = useState("1");
  const [fromUnit, setFromUnit] = useState("Meter");
  const [toUnit, setToUnit] = useState("Kilometer");
  const [result, setResult] = useState(null);

  const units = Object.keys(unitData[category].units);

  const changeCategory = (newCategory) => {
    const newUnits = Object.keys(
      unitData[newCategory].units
    );

    setCategory(newCategory);
    setFromUnit(newUnits[0]);
    setToUnit(newUnits[1] || newUnits[0]);
    setResult(null);
  };

  const convertTemperature = (
    value,
    from,
    to
  ) => {
    let celsius;

    if (from === "Celsius") {
      celsius = value;
    } else if (from === "Fahrenheit") {
      celsius = (value - 32) * (5 / 9);
    } else {
      celsius = value - 273.15;
    }

    if (to === "Celsius") {
      return celsius;
    }

    if (to === "Fahrenheit") {
      return (celsius * 9) / 5 + 32;
    }

    return celsius + 273.15;
  };

  const calculateConversion = () => {
    const numericAmount = parseFloat(amount);

    if (Number.isNaN(numericAmount)) {
      alert("Please enter a valid number.");
      return;
    }

    let convertedValue;

    if (category === "Temperature") {
      convertedValue = convertTemperature(
        numericAmount,
        fromUnit,
        toUnit
      );
    } else {
      const fromValue =
        unitData[category].units[fromUnit];

      const toValue =
        unitData[category].units[toUnit];

      const baseValue =
        numericAmount * fromValue;

      convertedValue =
        baseValue / toValue;
    }

    setResult(convertedValue);
  };

  const swapUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setResult(null);
  };

  const clearConverter = () => {
    const defaultUnits =
      Object.keys(unitData[category].units);

    setAmount("1");
    setFromUnit(defaultUnits[0]);
    setToUnit(defaultUnits[1] || defaultUnits[0]);
    setResult(null);
  };

  const formatResult = (value) => {
    if (Math.abs(value) >= 1000000000) {
      return value.toExponential(6);
    }

    return value.toLocaleString("en-US", {
      maximumFractionDigits: 10,
    });
  };

  return (
    <div className="unit-page">

      <div className="unit-container">

        <div className="unit-breadcrumb">
          <a href="/">CALVORO</a>
          <span> / Unit Converter</span>
        </div>

        <div className="unit-header">

          <div className="unit-icon">
            {unitData[category].icon}
          </div>

          <div className="unit-badge">
            FREE ONLINE TOOL
          </div>

          <h1>Unit Converter</h1>

          <p>
            Convert length, weight, temperature,
            volume, time, speed and data instantly.
          </p>

        </div>

        <div className="unit-card">

          <div className="unit-category-title">
            <span>
              {unitData[category].icon}
            </span>

            <h2>{category}</h2>
          </div>

          <div className="unit-categories">

            {categories.map((item) => (
              <button
                key={item}
                className={
                  category === item
                    ? "unit-category active"
                    : "unit-category"
                }
                onClick={() =>
                  changeCategory(item)
                }
              >
                <span>
                  {unitData[item].icon}
                </span>

                {item}
              </button>
            ))}

          </div>

          <div className="unit-input-group">

            <label>
              Amount
            </label>

            <input
              type="number"
              step="any"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setResult(null);
              }}
            />

          </div>

          <div className="unit-conversion-grid">

            <div className="unit-select-group">

              <label>
                From
              </label>

              <select
                value={fromUnit}
                onChange={(e) => {
                  setFromUnit(e.target.value);
                  setResult(null);
                }}
              >

                {units.map((unit) => (
                  <option
                    key={unit}
                    value={unit}
                  >
                    {unit}
                  </option>
                ))}

              </select>

            </div>

            <button
              className="unit-swap"
              onClick={swapUnits}
              title="Swap units"
            >
              ⇄
            </button>

            <div className="unit-select-group">

              <label>
                To
              </label>

              <select
                value={toUnit}
                onChange={(e) => {
                  setToUnit(e.target.value);
                  setResult(null);
                }}
              >

                {units.map((unit) => (
                  <option
                    key={unit}
                    value={unit}
                  >
                    {unit}
                  </option>
                ))}

              </select>

            </div>

          </div>

          <div className="unit-buttons">

            <button
              className="unit-convert-btn"
              onClick={calculateConversion}
            >
              Convert
            </button>

            <button
              className="unit-clear-btn"
              onClick={clearConverter}
            >
              Clear
            </button>

          </div>

          {result !== null && (
            <div className="unit-result">

              <div className="unit-result-title">
                <span>🔄</span>
                <h2>Conversion Result</h2>
              </div>

              <div className="unit-main-result">

                <span>
                  {amount} {fromUnit}
                </span>

                <div className="unit-result-arrow">
                  →
                </div>

                <strong>
                  {formatResult(result)}
                </strong>

                <span>
                  {toUnit}
                </span>

              </div>

            </div>
          )}

        </div>

        <div className="unit-info">

          <h2>
            How to use the Unit Converter
          </h2>

          <div className="unit-steps">

            <div className="unit-step">

              <b>1</b>

              <div>
                <h3>Choose a category</h3>

                <p>
                  Select length, weight, temperature,
                  volume, time, speed or data storage.
                </p>
              </div>

            </div>

            <div className="unit-step">

              <b>2</b>

              <div>
                <h3>Enter your amount</h3>

                <p>
                  Enter the number you want to convert.
                </p>
              </div>

            </div>

            <div className="unit-step">

              <b>3</b>

              <div>
                <h3>Select units</h3>

                <p>
                  Choose the original unit and the
                  unit you want to convert to.
                </p>
              </div>

            </div>

            <div className="unit-step">

              <b>4</b>

              <div>
                <h3>Convert</h3>

                <p>
                  Click Convert to instantly see your
                  result.
                </p>
              </div>

            </div>

          </div>

          <div className="unit-note">
            <strong>Example:</strong> Select Length,
            enter 1 Kilometer, choose Meter, and
            CALVORO will show 1,000 Meters.
          </div>

        </div>

        <div className="unit-back">
          <a href="/">
            ← Back to CALVORO
          </a>
        </div>

      </div>

    </div>
  );
}

export default UnitConverter;