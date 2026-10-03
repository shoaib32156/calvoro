import { useState } from "react";
import "./TimeZoneConverter.css";

function TimeZoneConverter() {
  const timeZones = [
    {
      value: "Asia/Karachi",
      name: "Pakistan",
      city: "Karachi",
    },
    {
      value: "Asia/Dubai",
      name: "UAE",
      city: "Dubai",
    },
    {
      value: "Asia/Riyadh",
      name: "Saudi Arabia",
      city: "Riyadh",
    },
    {
      value: "Asia/Kolkata",
      name: "India",
      city: "New Delhi",
    },
    {
      value: "Asia/Shanghai",
      name: "China",
      city: "Shanghai",
    },
    {
      value: "Asia/Tokyo",
      name: "Japan",
      city: "Tokyo",
    },
    {
      value: "Europe/London",
      name: "United Kingdom",
      city: "London",
    },
    {
      value: "Europe/Paris",
      name: "France",
      city: "Paris",
    },
    {
      value: "America/New_York",
      name: "United States",
      city: "New York",
    },
    {
      value: "America/Los_Angeles",
      name: "United States",
      city: "Los Angeles",
    },
    {
      value: "America/Chicago",
      name: "United States",
      city: "Chicago",
    },
    {
      value: "Australia/Sydney",
      name: "Australia",
      city: "Sydney",
    },
    {
      value: "Asia/Singapore",
      name: "Singapore",
      city: "Singapore",
    },
    {
      value: "Asia/Seoul",
      name: "South Korea",
      city: "Seoul",
    },
    {
      value: "Asia/Bangkok",
      name: "Thailand",
      city: "Bangkok",
    },
    {
      value: "Asia/Jakarta",
      name: "Indonesia",
      city: "Jakarta",
    },
    {
      value: "Europe/Berlin",
      name: "Germany",
      city: "Berlin",
    },
    {
      value: "Africa/Cairo",
      name: "Egypt",
      city: "Cairo",
    },
  ];

  const getCurrentDateTime = () => {
    const now = new Date();

    const year = now.toLocaleString("en-US", {
      timeZone: "Asia/Karachi",
      year: "numeric",
    });

    const month = now.toLocaleString("en-US", {
      timeZone: "Asia/Karachi",
      month: "2-digit",
    });

    const day = now.toLocaleString("en-US", {
      timeZone: "Asia/Karachi",
      day: "2-digit",
    });

    const hour = now.toLocaleString("en-US", {
      timeZone: "Asia/Karachi",
      hour: "2-digit",
      hour12: false,
    });

    const minute = now.toLocaleString("en-US", {
      timeZone: "Asia/Karachi",
      minute: "2-digit",
    });

    return `${year}-${month}-${day}T${hour}:${minute}`;
  };

  const [dateTime, setDateTime] = useState(
    getCurrentDateTime()
  );

  const [fromZone, setFromZone] = useState(
    "Asia/Karachi"
  );

  const [toZone, setToZone] = useState(
    "America/New_York"
  );

  const [result, setResult] = useState(null);

  const formatDateTime = (date, timeZone) => {
    return new Intl.DateTimeFormat("en-US", {
      timeZone,
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short",
    }).format(date);
  };

  const getTimeZoneName = (zone) => {
    const found = timeZones.find(
      (item) => item.value === zone
    );

    return found ? found.city : zone;
  };

  const convertTime = () => {
    if (!dateTime) {
      alert("Please select a date and time.");
      return;
    }

    const selectedDate = new Date(dateTime);

    if (Number.isNaN(selectedDate.getTime())) {
      alert("Please enter a valid date and time.");
      return;
    }

    const fromFormatted = formatDateTime(
      selectedDate,
      fromZone
    );

    const toFormatted = formatDateTime(
      selectedDate,
      toZone
    );

    setResult({
      fromFormatted,
      toFormatted,
    });
  };

  const swapZones = () => {
    setFromZone(toZone);
    setToZone(fromZone);
    setResult(null);
  };

  const clearConverter = () => {
    setDateTime(getCurrentDateTime());
    setFromZone("Asia/Karachi");
    setToZone("America/New_York");
    setResult(null);
  };

  return (
    <div className="timezone-page">

      <div className="timezone-container">

        <div className="timezone-breadcrumb">
          <a href="/">CALVORO</a>
          <span> / Time Zone Converter</span>
        </div>

        <div className="timezone-header">

          <div className="timezone-icon">
            🌍
          </div>

          <div className="timezone-badge">
            FREE ONLINE TOOL
          </div>

          <h1>Time Zone Converter</h1>

          <p>
            Convert date and time between cities
            around the world quickly and easily.
          </p>

        </div>

        <div className="timezone-card">

          <div className="timezone-input-group">

            <label>
              Date & Time
            </label>

            <input
              type="datetime-local"
              value={dateTime}
              onChange={(e) => {
                setDateTime(e.target.value);
                setResult(null);
              }}
            />

          </div>

          <div className="timezone-select-grid">

            <div className="timezone-group">

              <label>
                From Time Zone
              </label>

              <select
                value={fromZone}
                onChange={(e) => {
                  setFromZone(e.target.value);
                  setResult(null);
                }}
              >

                {timeZones.map((zone) => (
                  <option
                    key={zone.value}
                    value={zone.value}
                  >
                    {zone.city} - {zone.name}
                  </option>
                ))}

              </select>

            </div>

            <button
              className="timezone-swap"
              onClick={swapZones}
              title="Swap time zones"
            >
              ⇄
            </button>

            <div className="timezone-group">

              <label>
                To Time Zone
              </label>

              <select
                value={toZone}
                onChange={(e) => {
                  setToZone(e.target.value);
                  setResult(null);
                }}
              >

                {timeZones.map((zone) => (
                  <option
                    key={zone.value}
                    value={zone.value}
                  >
                    {zone.city} - {zone.name}
                  </option>
                ))}

              </select>

            </div>

          </div>

          <div className="timezone-buttons">

            <button
              className="timezone-convert-btn"
              onClick={convertTime}
            >
              Convert Time
            </button>

            <button
              className="timezone-clear-btn"
              onClick={clearConverter}
            >
              Clear
            </button>

          </div>

          {result && (
            <div className="timezone-result">

              <div className="timezone-result-title">
                <span>🕐</span>
                <h2>Conversion Result</h2>
              </div>

              <div className="timezone-result-grid">

                <div className="timezone-result-box">

                  <span>
                    {getTimeZoneName(fromZone)}
                  </span>

                  <strong>
                    {result.fromFormatted}
                  </strong>

                </div>

                <div className="timezone-arrow">
                  →
                </div>

                <div className="timezone-result-box">

                  <span>
                    {getTimeZoneName(toZone)}
                  </span>

                  <strong>
                    {result.toFormatted}
                  </strong>

                </div>

              </div>

            </div>
          )}

        </div>

        <div className="timezone-info">

          <h2>
            How to use the Time Zone Converter
          </h2>

          <div className="timezone-steps">

            <div className="timezone-step">

              <b>1</b>

              <div>
                <h3>Select date and time</h3>

                <p>
                  Choose the date and time you want
                  to convert.
                </p>
              </div>

            </div>

            <div className="timezone-step">

              <b>2</b>

              <div>
                <h3>Select the starting time zone</h3>

                <p>
                  Choose the city or country where
                  the original time applies.
                </p>
              </div>

            </div>

            <div className="timezone-step">

              <b>3</b>

              <div>
                <h3>Select the destination</h3>

                <p>
                  Choose the city or country where
                  you want to know the local time.
                </p>
              </div>

            </div>

            <div className="timezone-step">

              <b>4</b>

              <div>
                <h3>Convert</h3>

                <p>
                  CALVORO displays the converted
                  date and time instantly.
                </p>
              </div>

            </div>

          </div>

          <div className="timezone-note">
            <strong>Note:</strong> Time zones can change
            because of daylight saving time and local
            government rules. CALVORO uses your browser's
            built-in international time-zone data.
          </div>

        </div>

        <div className="timezone-back">
          <a href="/">
            ← Back to CALVORO
          </a>
        </div>

      </div>

    </div>
  );
}

export default TimeZoneConverter;