
import { useState } from "react";

export default function PercentageCalculator() {
  const [number, setNumber] = useState("");
  const [percentage, setPercentage] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const calculate = (event) => {
    event.preventDefault();

    setError("");
    setResult(null);

    if (number.trim() === "" || percentage.trim() === "") {
      setError("Please enter both values.");
      return;
    }

    const numberValue = Number(number);
    const percentageValue = Number(percentage);

    if (
      !Number.isFinite(numberValue) ||
      !Number.isFinite(percentageValue)
    ) {
      setError("Please enter valid numbers.");
      return;
    }

    const answer =
      (numberValue * percentageValue) / 100;

    setResult(answer);
  };

  const reset = () => {
    setNumber("");
    setPercentage("");
    setResult(null);
    setError("");
  };

  return (
    <div className="calvoro-percentage-page">

      <style>
        {`
          .calvoro-percentage-page {
            min-height: 100vh;
            background: #f5f7fa;
            color: #172033;
          }

          .calvoro-percentage-hero {
            background:
              linear-gradient(
                135deg,
                #0f172a 0%,
                #172554 55%,
                #1d4ed8 100%
              );
            color: #ffffff;
          }

          .calvoro-percentage-container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 24px;
          }

          .calvoro-percentage-hero-inner {
            padding: 55px 0;
          }

          .calvoro-percentage-label {
            display: inline-flex;
            padding: 7px 11px;
            border: 1px solid rgba(255,255,255,0.16);
            border-radius: 5px;
            background: rgba(255,255,255,0.06);
            color: rgba(255,255,255,0.82);
            font-size: 10px;
            font-weight: 900;
            letter-spacing: 1.5px;
            text-transform: uppercase;
          }

          .calvoro-percentage-hero h1 {
            margin: 18px 0 12px;
            color: #ffffff;
            font-size: clamp(38px, 5vw, 58px);
            line-height: 1.05;
            letter-spacing: -0.045em;
            font-weight: 950;
          }

          .calvoro-percentage-hero p {
            max-width: 720px;
            margin: 0;
            color: rgba(255,255,255,0.72);
            font-size: 16px;
            line-height: 1.8;
          }

          .calvoro-percentage-main {
            padding: 48px 0 80px;
          }

          .calvoro-percentage-layout {
            display: grid;
            grid-template-columns:
              minmax(0, 1fr) 310px;
            gap: 28px;
            align-items: start;
          }

          .calvoro-percentage-card {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            overflow: hidden;
            box-shadow:
              0 8px 28px rgba(15,23,42,0.06);
          }

          .calvoro-percentage-card-header {
            padding: 23px 25px;
            border-bottom: 1px solid #e2e8f0;
          }

          .calvoro-percentage-card-header span {
            display: block;
            margin-bottom: 7px;
            color: #2563eb;
            font-size: 9px;
            font-weight: 900;
            letter-spacing: 1.1px;
            text-transform: uppercase;
          }

          .calvoro-percentage-card-header h2 {
            margin: 0;
            color: #0f172a;
            font-size: 23px;
            font-weight: 900;
          }

          .calvoro-percentage-form-area {
            padding: 28px 25px;
          }

          .calvoro-percentage-form {
            display: grid;
            gap: 18px;
          }

          .calvoro-percentage-field {
            display: grid;
            gap: 8px;
          }

          .calvoro-percentage-field label {
            color: #334155;
            font-size: 13px;
            font-weight: 800;
          }

          .calvoro-percentage-field input {
            width: 100%;
            min-height: 48px;
            padding: 12px 14px;
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            outline: none;
            background: #ffffff;
            color: #0f172a;
            font-size: 16px;
          }

          .calvoro-percentage-field input:focus {
            border-color: #2563eb;
            box-shadow:
              0 0 0 3px rgba(37,99,235,0.10);
          }

          .calvoro-percentage-actions {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-top: 4px;
          }

          .calvoro-percentage-button {
            min-height: 45px;
            padding: 11px 17px;
            border: none;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 900;
            cursor: pointer;
          }

          .calvoro-percentage-button-primary {
            background: #2563eb;
            color: #ffffff;
          }

          .calvoro-percentage-button-primary:hover {
            background: #1d4ed8;
          }

          .calvoro-percentage-button-reset {
            background: #f1f5f9;
            color: #334155;
          }

          .calvoro-percentage-button-reset:hover {
            background: #e2e8f0;
          }

          .calvoro-percentage-error {
            margin-top: 18px;
            padding: 13px 15px;
            border: 1px solid #fecaca;
            border-radius: 6px;
            background: #fef2f2;
            color: #b91c1c;
            font-size: 13px;
            font-weight: 700;
          }

          .calvoro-percentage-result {
            margin-top: 22px;
            padding: 21px;
            border: 1px solid #bfdbfe;
            border-radius: 8px;
            background:
              linear-gradient(
                135deg,
                #eff6ff,
                #dbeafe
              );
          }

          .calvoro-percentage-result-label {
            color: #1d4ed8;
            font-size: 10px;
            font-weight: 900;
            letter-spacing: 1px;
            text-transform: uppercase;
          }

          .calvoro-percentage-result-value {
            margin-top: 8px;
            color: #0f172a;
            font-size: 40px;
            line-height: 1.1;
            font-weight: 950;
          }

          .calvoro-percentage-result-equation {
            margin-top: 9px;
            color: #475569;
            font-size: 13px;
            line-height: 1.7;
          }

          .calvoro-percentage-sidebar {
            display: grid;
            gap: 16px;
          }

          .calvoro-percentage-sidebar-card {
            padding: 21px;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
          }

          .calvoro-percentage-sidebar-card span {
            display: block;
            margin-bottom: 10px;
            color: #2563eb;
            font-size: 9px;
            font-weight: 900;
            letter-spacing: 1px;
            text-transform: uppercase;
          }

          .calvoro-percentage-sidebar-card h3 {
            margin: 0 0 9px;
            color: #0f172a;
            font-size: 18px;
            font-weight: 900;
          }

          .calvoro-percentage-sidebar-card p {
            margin: 0;
            color: #64748b;
            font-size: 12px;
            line-height: 1.8;
          }

          .calvoro-percentage-formula-box {
            margin-top: 13px;
            padding: 14px;
            background: #eff6ff;
            border: 1px solid #bfdbfe;
            border-radius: 6px;
            color: #17358f;
            font-size: 13px;
            line-height: 1.7;
            font-weight: 800;
          }

          .calvoro-percentage-info {
            margin-top: 24px;
            padding: 29px 27px;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
          }

          .calvoro-percentage-info-label {
            display: block;
            margin-bottom: 9px;
            color: #2563eb;
            font-size: 9px;
            font-weight: 900;
            letter-spacing: 1.1px;
            text-transform: uppercase;
          }

          .calvoro-percentage-info h2 {
            margin: 0 0 13px;
            color: #0f172a;
            font-size: 27px;
            line-height: 1.2;
            font-weight: 900;
          }

          .calvoro-percentage-info p {
            margin: 0 0 13px;
            color: #64748b;
            font-size: 14px;
            line-height: 1.85;
          }

          .calvoro-percentage-info p:last-child {
            margin-bottom: 0;
          }

          .calvoro-percentage-steps {
            display: grid;
            gap: 10px;
            margin-top: 20px;
          }

          .calvoro-percentage-step {
            display: grid;
            grid-template-columns: 34px minmax(0,1fr);
            gap: 12px;
            align-items: start;
            padding: 15px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
          }

          .calvoro-percentage-step-number {
            width: 29px;
            height: 29px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: #2563eb;
            color: #ffffff;
            font-size: 11px;
            font-weight: 900;
          }

          .calvoro-percentage-step-text {
            padding-top: 4px;
            color: #475569;
            font-size: 13px;
            line-height: 1.7;
          }

          .calvoro-percentage-example {
            margin-top: 18px;
            padding: 18px;
            border-left: 4px solid #2563eb;
            background: #f8fafc;
            color: #475569;
            font-size: 14px;
            line-height: 1.8;
          }

          .calvoro-percentage-faq {
            display: grid;
            gap: 9px;
            margin-top: 18px;
          }

          .calvoro-percentage-faq details {
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            background: #ffffff;
          }

          .calvoro-percentage-faq summary {
            padding: 15px;
            cursor: pointer;
            color: #0f172a;
            font-size: 13px;
            font-weight: 850;
          }

          .calvoro-percentage-faq p {
            margin: 0;
            padding: 0 15px 15px;
            color: #64748b;
            font-size: 13px;
            line-height: 1.75;
          }

          .calvoro-percentage-uses {
            display: grid;
            grid-template-columns:
              repeat(3,minmax(0,1fr));
            gap: 12px;
            margin-top: 18px;
          }

          .calvoro-percentage-use {
            padding: 16px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
          }

          .calvoro-percentage-use strong {
            display: block;
            margin-bottom: 5px;
            color: #0f172a;
            font-size: 13px;
          }

          .calvoro-percentage-use span {
            color: #64748b;
            font-size: 12px;
            line-height: 1.65;
          }

          @media (max-width: 900px) {
            .calvoro-percentage-layout {
              grid-template-columns: 1fr;
            }

            .calvoro-percentage-uses {
              grid-template-columns:
                repeat(2,minmax(0,1fr));
            }
          }

          @media (max-width: 650px) {
            .calvoro-percentage-container {
              padding-left: 17px;
              padding-right: 17px;
            }

            .calvoro-percentage-hero-inner {
              padding: 42px 0;
            }

            .calvoro-percentage-main {
              padding: 34px 0 55px;
            }

            .calvoro-percentage-card-header,
            .calvoro-percentage-form-area {
              padding-left: 19px;
              padding-right: 19px;
            }

            .calvoro-percentage-info {
              padding: 22px 18px;
            }

            .calvoro-percentage-uses {
              grid-template-columns: 1fr;
            }

            .calvoro-percentage-actions {
              flex-direction: column;
            }

            .calvoro-percentage-button {
              width: 100%;
            }
          }
        `}
      </style>

      {/* HERO */}

      <section className="calvoro-percentage-hero">

        <div className="calvoro-percentage-container">

          <div className="calvoro-percentage-hero-inner">

            <span className="calvoro-percentage-label">
              CALVORO • MATH TOOL
            </span>

            <h1>
              Percentage Calculator
            </h1>

            <p>
              Calculate a percentage of any number quickly
              and clearly. Enter your values below to get
              an instant result.
            </p>

          </div>

        </div>

      </section>

      {/* MAIN */}

      <main className="calvoro-percentage-main">

        <div className="calvoro-percentage-container">

          <div className="calvoro-percentage-layout">

            {/* CALCULATOR */}

            <section className="calvoro-percentage-card">

              <div className="calvoro-percentage-card-header">

                <span>
                  CALVORO CALCULATOR
                </span>

                <h2>
                  Calculate a percentage
                </h2>

              </div>

              <div className="calvoro-percentage-form-area">

                <form
                  className="calvoro-percentage-form"
                  onSubmit={calculate}
                >

                  <div className="calvoro-percentage-field">

                    <label htmlFor="percentage-number">
                      Number
                    </label>

                    <input
                      id="percentage-number"
                      type="number"
                      step="any"
                      value={number}
                      onChange={(event) =>
                        setNumber(event.target.value)
                      }
                      placeholder="Enter a number"
                    />

                  </div>

                  <div className="calvoro-percentage-field">

                    <label htmlFor="percentage-value">
                      Percentage
                    </label>

                    <input
                      id="percentage-value"
                      type="number"
                      step="any"
                      value={percentage}
                      onChange={(event) =>
                        setPercentage(event.target.value)
                      }
                      placeholder="Enter percentage"
                    />

                  </div>

                  <div className="calvoro-percentage-actions">

                    <button
                      type="submit"
                      className="calvoro-percentage-button calvoro-percentage-button-primary"
                    >
                      Calculate
                    </button>

                    <button
                      type="button"
                      onClick={reset}
                      className="calvoro-percentage-button calvoro-percentage-button-reset"
                    >
                      Reset
                    </button>

                  </div>

                </form>

                {error && (
                  <div className="calvoro-percentage-error">
                    {error}
                  </div>
                )}

                {result !== null && (
                  <div className="calvoro-percentage-result">

                    <div className="calvoro-percentage-result-label">
                      Result
                    </div>

                    <div className="calvoro-percentage-result-value">
                      {Number.isInteger(result)
                        ? result
                        : Number(result.toFixed(4))}
                    </div>

                    <div className="calvoro-percentage-result-equation">
                      {percentage}% of {number} ={" "}
                      {Number.isInteger(result)
                        ? result
                        : Number(result.toFixed(4))}
                    </div>

                  </div>
                )}

              </div>

            </section>

            {/* SIDEBAR */}

            <aside className="calvoro-percentage-sidebar">

              <div className="calvoro-percentage-sidebar-card">

                <span>
                  ABOUT THIS TOOL
                </span>

                <h3>
                  Percentage Calculator
                </h3>

                <p>
                  Use this calculator to find a percentage
                  of a given number without doing the
                  calculation manually.
                </p>

              </div>

              <div className="calvoro-percentage-sidebar-card">

                <span>
                  FORMULA
                </span>

                <div className="calvoro-percentage-formula-box">
                  Percentage amount =
                  (Number × Percentage) ÷ 100
                </div>

              </div>

              <div className="calvoro-percentage-sidebar-card">

                <span>
                  QUICK EXAMPLE
                </span>

                <p>
                  25% of 200 equals 50.
                </p>

              </div>

            </aside>

          </div>

          {/* ABOUT */}

          <section className="calvoro-percentage-info">

            <span className="calvoro-percentage-info-label">
              CALVORO GUIDE
            </span>

            <h2>
              How percentage calculations work
            </h2>

            <p>
              A percentage expresses a value as a
              portion of 100. Percentage calculations
              are commonly used in shopping, finance,
              education, statistics, business and
              everyday comparisons.
            </p>

            <p>
              This calculator finds the specified
              percentage of a number by multiplying
              the two values and dividing by 100.
            </p>

          </section>

          {/* HOW TO USE */}

          <section className="calvoro-percentage-info">

            <span className="calvoro-percentage-info-label">
              QUICK GUIDE
            </span>

            <h2>
              How to use the Percentage Calculator
            </h2>

            <div className="calvoro-percentage-steps">

              <div className="calvoro-percentage-step">

                <span className="calvoro-percentage-step-number">
                  1
                </span>

                <div className="calvoro-percentage-step-text">
                  Enter the number you want to calculate
                  a percentage from.
                </div>

              </div>

              <div className="calvoro-percentage-step">

                <span className="calvoro-percentage-step-number">
                  2
                </span>

                <div className="calvoro-percentage-step-text">
                  Enter the percentage you want to
                  calculate.
                </div>

              </div>

              <div className="calvoro-percentage-step">

                <span className="calvoro-percentage-step-number">
                  3
                </span>

                <div className="calvoro-percentage-step-text">
                  Click Calculate and the result will
                  appear immediately below the form.
                </div>

              </div>

            </div>

          </section>

          {/* EXAMPLE */}

          <section className="calvoro-percentage-info">

            <span className="calvoro-percentage-info-label">
              EXAMPLE
            </span>

            <h2>
              Example calculation
            </h2>

            <div className="calvoro-percentage-example">
              Suppose you want to calculate 25% of
              200.

              <br />
              <br />

              200 × 25 = 5,000

              <br />

              5,000 ÷ 100 = 50

              <br />
              <br />

              Therefore, 25% of 200 is 50.
            </div>

          </section>

          {/* COMMON USES */}

          <section className="calvoro-percentage-info">

            <span className="calvoro-percentage-info-label">
              EVERYDAY USES
            </span>

            <h2>
              Where percentages are commonly used
            </h2>

            <div className="calvoro-percentage-uses">

              <div className="calvoro-percentage-use">

                <strong>
                  Shopping
                </strong>

                <span>
                  Calculate discounts and sale prices.
                </span>

              </div>

              <div className="calvoro-percentage-use">

                <strong>
                  Finance
                </strong>

                <span>
                  Understand rates, interest and changes.
                </span>

              </div>

              <div className="calvoro-percentage-use">

                <strong>
                  Education
                </strong>

                <span>
                  Calculate grades and percentage scores.
                </span>

              </div>

              <div className="calvoro-percentage-use">

                <strong>
                  Business
                </strong>

                <span>
                  Compare revenue, costs and growth.
                </span>

              </div>

              <div className="calvoro-percentage-use">

                <strong>
                  Statistics
                </strong>

                <span>
                  Express proportions and comparisons.
                </span>

              </div>

              <div className="calvoro-percentage-use">

                <strong>
                  Everyday Math
                </strong>

                <span>
                  Solve common percentage questions quickly.
                </span>

              </div>

            </div>

          </section>

          {/* FAQ */}

          <section className="calvoro-percentage-info">

            <span className="calvoro-percentage-info-label">
              FAQ
            </span>

            <h2>
              Frequently asked questions
            </h2>

            <div className="calvoro-percentage-faq">

              <details>

                <summary>
                  What is a percentage?
                </summary>

                <p>
                  A percentage represents a value as a
                  portion out of 100. For example, 25%
                  means 25 parts out of 100.
                </p>

              </details>

              <details>

                <summary>
                  How do I calculate a percentage manually?
                </summary>

                <p>
                  Multiply the number by the percentage
                  and divide the result by 100.
                </p>

              </details>

              <details>

                <summary>
                  What is 25% of 200?
                </summary>

                <p>
                  25% of 200 is 50.
                </p>

              </details>

              <details>

                <summary>
                  Can I use decimal percentages?
                </summary>

                <p>
                  Yes. This calculator supports decimal
                  percentage values such as 12.5%.
                </p>

              </details>

            </div>

          </section>

        </div>

      </main>

    </div>
  );
}

