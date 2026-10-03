import { useState } from "react";
import "./SalaryCalculator.css";

function SalaryCalculator() {
  const [salary, setSalary] = useState("");
  const [period, setPeriod] = useState("annual");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");
  const [result, setResult] = useState(null);

  const calculateSalary = () => {
    const salaryValue = parseFloat(salary);
    const hours = parseFloat(hoursPerWeek);
    const weeks = parseFloat(weeksPerYear);

    if (
      Number.isNaN(salaryValue) ||
      Number.isNaN(hours) ||
      Number.isNaN(weeks) ||
      salaryValue <= 0 ||
      hours <= 0 ||
      weeks <= 0
    ) {
      alert("Please enter valid positive numbers.");
      return;
    }

    let annualSalary;

    if (period === "annual") {
      annualSalary = salaryValue;
    } else if (period === "monthly") {
      annualSalary = salaryValue * 12;
    } else if (period === "weekly") {
      annualSalary = salaryValue * weeks;
    } else {
      annualSalary = salaryValue * weeks * hours;
    }

    const monthlySalary = annualSalary / 12;
    const weeklySalary = annualSalary / weeks;
    const dailySalary = weeklySalary / 5;
    const hourlySalary = weeklySalary / hours;

    setResult({
      annualSalary,
      monthlySalary,
      weeklySalary,
      dailySalary,
      hourlySalary,
    });
  };

  const clearCalculator = () => {
    setSalary("");
    setPeriod("annual");
    setHoursPerWeek("40");
    setWeeksPerYear("52");
    setResult(null);
  };

  const formatMoney = (value) => {
    return value.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className="salary-page">

      <div className="salary-container">

        <div className="salary-breadcrumb">
          <a href="/">CALVORO</a>
          <span> / Salary Calculator</span>
        </div>

        <div className="salary-header">

          <div className="salary-icon">
            💰
          </div>

          <div className="salary-badge">
            FREE ONLINE TOOL
          </div>

          <h1>
            Salary Calculator
          </h1>

          <p>
            Convert your salary between annual,
            monthly, weekly, daily and hourly pay.
          </p>

        </div>

        <div className="salary-card">

          <div className="salary-input-group">

            <label>
              Salary Amount
            </label>

            <input
              type="number"
              min="0"
              step="any"
              placeholder="Example: 60000"
              value={salary}
              onChange={(e) => {
                setSalary(e.target.value);
                setResult(null);
              }}
            />

          </div>

          <div className="salary-period-section">

            <label>
              Salary Period
            </label>

            <div className="salary-period-options">

              <button
                className={
                  period === "annual"
                    ? "salary-period-option active"
                    : "salary-period-option"
                }
                onClick={() => {
                  setPeriod("annual");
                  setResult(null);
                }}
              >
                📅 Annual
              </button>

              <button
                className={
                  period === "monthly"
                    ? "salary-period-option active"
                    : "salary-period-option"
                }
                onClick={() => {
                  setPeriod("monthly");
                  setResult(null);
                }}
              >
                🗓️ Monthly
              </button>

              <button
                className={
                  period === "weekly"
                    ? "salary-period-option active"
                    : "salary-period-option"
                }
                onClick={() => {
                  setPeriod("weekly");
                  setResult(null);
                }}
              >
                📆 Weekly
              </button>

              <button
                className={
                  period === "hourly"
                    ? "salary-period-option active"
                    : "salary-period-option"
                }
                onClick={() => {
                  setPeriod("hourly");
                  setResult(null);
                }}
              >
                ⏱️ Hourly
              </button>

            </div>

          </div>

          <div className="salary-work-grid">

            <div className="salary-input-group">

              <label>
                Hours Per Week
              </label>

              <input
                type="number"
                min="1"
                step="any"
                value={hoursPerWeek}
                onChange={(e) => {
                  setHoursPerWeek(e.target.value);
                  setResult(null);
                }}
              />

            </div>

            <div className="salary-input-group">

              <label>
                Working Weeks Per Year
              </label>

              <input
                type="number"
                min="1"
                step="any"
                value={weeksPerYear}
                onChange={(e) => {
                  setWeeksPerYear(e.target.value);
                  setResult(null);
                }}
              />

            </div>

          </div>

          <div className="salary-buttons">

            <button
              className="salary-calculate-btn"
              onClick={calculateSalary}
            >
              Calculate Salary
            </button>

            <button
              className="salary-clear-btn"
              onClick={clearCalculator}
            >
              Clear
            </button>

          </div>

          {result && (
            <div className="salary-result">

              <div className="salary-result-title">
                <span>💰</span>

                <h2>
                  Salary Breakdown
                </h2>
              </div>

              <div className="salary-main-result">

                <span>
                  Annual Salary
                </span>

                <strong>
                  {formatMoney(result.annualSalary)}
                </strong>

              </div>

              <div className="salary-summary">

                <div>
                  <span>Annual</span>

                  <strong>
                    {formatMoney(result.annualSalary)}
                  </strong>
                </div>

                <div>
                  <span>Monthly</span>

                  <strong>
                    {formatMoney(result.monthlySalary)}
                  </strong>
                </div>

                <div>
                  <span>Weekly</span>

                  <strong>
                    {formatMoney(result.weeklySalary)}
                  </strong>
                </div>

                <div>
                  <span>Daily</span>

                  <strong>
                    {formatMoney(result.dailySalary)}
                  </strong>
                </div>

                <div>
                  <span>Hourly</span>

                  <strong>
                    {formatMoney(result.hourlySalary)}
                  </strong>
                </div>

              </div>

            </div>
          )}

        </div>

        <div className="salary-info">

          <h2>
            How to use the Salary Calculator
          </h2>

          <div className="salary-steps">

            <div className="salary-step">
              <b>1</b>

              <div>
                <h3>
                  Enter your salary
                </h3>

                <p>
                  Enter the amount you earn.
                </p>
              </div>
            </div>

            <div className="salary-step">
              <b>2</b>

              <div>
                <h3>
                  Choose the salary period
                </h3>

                <p>
                  Select annual, monthly, weekly
                  or hourly salary.
                </p>
              </div>
            </div>

            <div className="salary-step">
              <b>3</b>

              <div>
                <h3>
                  Enter working hours
                </h3>

                <p>
                  Enter your typical hours per week
                  and working weeks per year.
                </p>
              </div>
            </div>

            <div className="salary-step">
              <b>4</b>

              <div>
                <h3>
                  Calculate
                </h3>

                <p>
                  CALVORO converts your salary into
                  multiple pay periods.
                </p>
              </div>
            </div>

          </div>

          <div className="salary-note">
            <strong>Note:</strong> This calculator
            provides a basic salary conversion and
            does not include taxes, benefits or
            other deductions.
          </div>

        </div>

        <div className="salary-back">
          <a href="/">
            ← Back to CALVORO
          </a>
        </div>

      </div>

    </div>
  );
}

export default SalaryCalculator;