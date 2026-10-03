
import { Link } from "react-router-dom";
import SEO from "./SEO";

export default function CalculatorLayout({
  title,
  description,
  icon = "🧮",
  category = "Calculator",
  children,
  result,
  formula,
  explanation,
  relatedCalculators = [],
}) {
  return (
    <>
      <SEO
        title={`${title} | CALVORO`}
        description={
          description ||
          `Use the free ${title} from CALVORO to calculate your result quickly and easily.`
        }
      />

      <div className="calvoro-calculator-page">

        {/* =================================================
            EDITORIAL HERO
            ================================================= */}

        <section className="calvoro-calculator-hero">
          <div className="calvoro-calculator-container">

            <div className="calvoro-calculator-hero-inner">

              <Link
                to="/#calculators"
                className="calvoro-calculator-back"
              >
                ← All calculators
              </Link>

              <div className="calvoro-calculator-hero-grid">

                <div>
                  <div className="calvoro-calculator-label">
                    {category}
                  </div>

                  <h1>
                    {title}
                  </h1>

                  <p>
                    {description}
                  </p>
                </div>

                <div className="calvoro-calculator-hero-icon">
                  {icon}
                </div>

              </div>

            </div>
          </div>
        </section>

        {/* =================================================
            MAIN CONTENT
            ================================================= */}

        <main className="calvoro-calculator-main">
          <div className="calvoro-calculator-container">

            <div className="calvoro-calculator-layout">

              {/* =========================================
                  MAIN COLUMN
                  ========================================= */}

              <div>

                {/* CALCULATOR */}

                <section className="calvoro-calculator-box">

                  <div className="calvoro-calculator-box-heading">
                    <div>
                      <span>
                        CALVORO TOOL
                      </span>

                      <h2>
                        {title}
                      </h2>
                    </div>
                  </div>

                  <div className="calvoro-calculator-form">
                    {children}
                  </div>

                  {/* RESULT */}

                  {result !== null &&
                    result !== undefined && (
                      <div className="calvoro-calculator-result">

                        <div className="calvoro-result-label">
                          Your result
                        </div>

                        <div className="calvoro-result-value">
                          {result}
                        </div>

                        <div className="calvoro-result-note">
                          Calculated from the values you entered.
                        </div>

                      </div>
                    )}

                </section>

                {/* =================================================
                    HOW TO USE
                    ================================================= */}

                <section className="calvoro-information-box">

                  <div className="calvoro-information-kicker">
                    QUICK GUIDE
                  </div>

                  <h2>
                    How to use this calculator
                  </h2>

                  <p>
                    Use the calculator above by entering
                    the information requested in each field.
                    Make sure the values and units you enter
                    match what the calculator asks for.
                  </p>

                  <div className="calvoro-steps">

                    <div className="calvoro-step">
                      <span>1</span>

                      <div>
                        <strong>
                          Enter your values
                        </strong>

                        <p>
                          Fill in the required fields with
                          the numbers or information needed
                          for your calculation.
                        </p>
                      </div>
                    </div>

                    <div className="calvoro-step">
                      <span>2</span>

                      <div>
                        <strong>
                          Check your inputs
                        </strong>

                        <p>
                          Review the values before calculating
                          to make sure they are correct.
                        </p>
                      </div>
                    </div>

                    <div className="calvoro-step">
                      <span>3</span>

                      <div>
                        <strong>
                          View your result
                        </strong>

                        <p>
                          Select the calculation button to
                          see the result based on your inputs.
                        </p>
                      </div>
                    </div>

                  </div>
                </section>

                {/* =================================================
                    FORMULA
                    ================================================= */}

                {formula && (
                  <section className="calvoro-information-box">

                    <div className="calvoro-information-kicker">
                      CALCULATION
                    </div>

                    <h2>
                      Formula
                    </h2>

                    <div className="calvoro-formula-box">
                      {formula}
                    </div>

                    <p>
                      This formula shows the mathematical
                      relationship used by the calculator
                      to produce the displayed result.
                    </p>

                  </section>
                )}

                {/* =================================================
                    EXPLANATION
                    ================================================= */}

                {explanation && (
                  <section className="calvoro-information-box">

                    <div className="calvoro-information-kicker">
                      EXPLANATION
                    </div>

                    <h2>
                      How it works
                    </h2>

                    <div className="calvoro-explanation">
                      {explanation}
                    </div>

                  </section>
                )}

                {/* =================================================
                    ABOUT THIS CALCULATOR
                    ================================================= */}

                <section className="calvoro-information-box">

                  <div className="calvoro-information-kicker">
                    CALVORO GUIDE
                  </div>

                  <h2>
                    About the {title}
                  </h2>

                  <p>
                    The {title} is designed to make this
                    type of calculation easier to understand
                    and quicker to complete. Instead of
                    working through the calculation manually,
                    you can enter your values and review the
                    result in one place.
                  </p>

                  <p>
                    For the most useful result, use accurate
                    input values and check the units or
                    assumptions required by the calculator.
                    The result is based on the information
                    entered into the tool.
                  </p>

                </section>

                {/* =================================================
                    FAQ
                    ================================================= */}

                <section className="calvoro-information-box">

                  <div className="calvoro-information-kicker">
                    FAQ
                  </div>

                  <h2>
                    Frequently asked questions
                  </h2>

                  <div className="calvoro-faq-list">

                    <details>
                      <summary>
                        How does the {title} work?
                      </summary>

                      <p>
                        Enter the requested values and
                        select the calculation button.
                        CALVORO then applies the calculation
                        used by this tool and displays the
                        resulting value.
                      </p>
                    </details>

                    <details>
                      <summary>
                        Do I need to enter all the fields?
                      </summary>

                      <p>
                        Required fields should be completed
                        before calculating. Leaving a required
                        value empty may prevent the calculator
                        from producing a result.
                      </p>
                    </details>

                    <details>
                      <summary>
                        Can I change the values and calculate again?
                      </summary>

                      <p>
                        Yes. Update the input values and
                        calculate again to receive a new
                        result based on the changed information.
                      </p>
                    </details>

                  </div>

                </section>

              </div>

              {/* =========================================
                  SIDEBAR
                  ========================================= */}

              <aside className="calvoro-calculator-sidebar">

                <div className="calvoro-sidebar-box">

                  <div className="calvoro-sidebar-kicker">
                    ABOUT THIS TOOL
                  </div>

                  <div className="calvoro-sidebar-icon">
                    {icon}
                  </div>

                  <h3>
                    {title}
                  </h3>

                  <p>
                    {description}
                  </p>

                  <div className="calvoro-sidebar-category">
                    {category}
                  </div>

                </div>

                {relatedCalculators.length > 0 && (
                  <div className="calvoro-sidebar-box">

                    <div className="calvoro-sidebar-kicker">
                      RELATED TOOLS
                    </div>

                    <h3>
                      More CALVORO calculators
                    </h3>

                    <div className="calvoro-related-list">

                      {relatedCalculators.map(
                        (calculator) => (
                          <Link
                            key={calculator.path}
                            to={calculator.path}
                            className="calvoro-related-item"
                          >
                            <span className="calvoro-related-icon">
                              {calculator.icon || "🧮"}
                            </span>

                            <span>
                              {calculator.name}

                              <small>
                                Open calculator →
                              </small>
                            </span>
                          </Link>
                        )
                      )}

                    </div>

                  </div>
                )}

                <div className="calvoro-sidebar-box calvoro-sidebar-blue">

                  <div className="calvoro-sidebar-kicker">
                    CALVORO JOURNAL
                  </div>

                  <h3>
                    Learn more from our guides
                  </h3>

                  <p>
                    Explore CALVORO articles for practical
                    explanations, examples, formulas, and
                    everyday tips.
                  </p>

                  <Link
                    to="/blog"
                    className="calvoro-sidebar-button"
                  >
                    Read the Blog →
                  </Link>

                </div>

              </aside>

            </div>
          </div>
        </main>

      </div>

      {/* =================================================
          SHARED CALCULATOR STYLES
          ================================================= */}

      <style>
        {`
          .calvoro-calculator-page {
            min-height: 100vh;
            background: #f5f7fa;
            color: #172033;
          }

          .calvoro-calculator-container {
            width: 100%;
            max-width: 1200px;
            margin: 0 auto;
            padding-left: 24px;
            padding-right: 24px;
          }

          /* HERO */

          .calvoro-calculator-hero {
            background:
              linear-gradient(
                135deg,
                #0f172a 0%,
                #172554 55%,
                #1d4ed8 100%
              );
            color: #ffffff;
          }

          .calvoro-calculator-hero-inner {
            padding:
              48px 0 55px;
          }

          .calvoro-calculator-back {
            display: inline-flex;
            align-items: center;
            color:
              rgba(255,255,255,0.72);
            text-decoration: none;
            font-size: 12px;
            font-weight: 800;
            margin-bottom: 35px;
          }

          .calvoro-calculator-back:hover {
            color: #ffffff;
          }

          .calvoro-calculator-hero-grid {
            display: grid;
            grid-template-columns:
              minmax(0, 1fr)
              110px;
            gap: 35px;
            align-items: center;
          }

          .calvoro-calculator-label {
            display: inline-flex;
            padding:
              6px 10px;
            border:
              1px solid
              rgba(255,255,255,0.15);
            background:
              rgba(255,255,255,0.06);
            border-radius: 4px;
            color:
              rgba(255,255,255,0.82);
            font-size: 10px;
            font-weight: 900;
            letter-spacing:
              1px;
            text-transform: uppercase;
          }

          .calvoro-calculator-hero h1 {
            margin:
              17px 0 12px;
            color: #ffffff;
            font-size:
              clamp(36px, 5vw, 54px);
            line-height:
              1.05;
            letter-spacing:
              -0.045em;
            font-weight:
              950;
          }

          .calvoro-calculator-hero p {
            max-width: 700px;
            margin: 0;
            color:
              rgba(255,255,255,0.70);
            font-size: 16px;
            line-height: 1.8;
          }

          .calvoro-calculator-hero-icon {
            width: 92px;
            height: 92px;
            display:
              flex;
            align-items:
              center;
            justify-content:
              center;
            justify-self:
              end;
            border:
              1px solid
              rgba(255,255,255,0.14);
            border-radius:
              8px;
            background:
              rgba(255,255,255,0.07);
            color:
              #ffffff;
            font-size: 41px;
          }

          /* MAIN */

          .calvoro-calculator-main {
            padding:
              50px 0 80px;
          }

          .calvoro-calculator-layout {
            display: grid;
            grid-template-columns:
              minmax(0, 1fr)
              315px;
            gap: 28px;
            align-items: start;
          }

          /* CALCULATOR BOX */

          .calvoro-calculator-box {
            background:
              #ffffff;
            border:
              1px solid #e2e8f0;
            border-radius:
              8px;
            box-shadow:
              0 9px 30px
              rgba(15,23,42,0.06);
            overflow:
              hidden;
          }

          .calvoro-calculator-box-heading {
            padding:
              22px 25px;
            border-bottom:
              1px solid #e2e8f0;
            background:
              #ffffff;
          }

          .calvoro-calculator-box-heading span {
            display:
              block;
            color:
              #2563eb;
            font-size:
              9px;
            font-weight:
              900;
            letter-spacing:
              1.2px;
          }

          .calvoro-calculator-box-heading h2 {
            margin:
              7px 0 0;
            color:
              #0f172a;
            font-size:
              21px;
            font-weight:
              900;
          }

          .calvoro-calculator-form {
            padding:
              28px 25px;
          }

          /* RESULT */

          .calvoro-calculator-result {
            margin:
              0 25px 25px;
            padding:
              24px;
            border:
              1px solid #bfdbfe;
            border-left:
              4px solid #2563eb;
            border-radius:
              7px;
            background:
              #eff6ff;
            text-align:
              center;
          }

          .calvoro-result-label {
            color:
              #64748b;
            font-size:
              10px;
            font-weight:
              900;
            text-transform:
              uppercase;
            letter-spacing:
              1px;
          }

          .calvoro-result-value {
            margin-top:
              7px;
            color:
              #1d4ed8;
            font-size:
              40px;
            line-height:
              1.2;
            font-weight:
              950;
            word-break:
              break-word;
          }

          .calvoro-result-note {
            margin-top:
              8px;
            color:
              #64748b;
            font-size:
              11px;
          }

          /* INFORMATION */

          .calvoro-information-box {
            margin-top:
              25px;
            padding:
              28px;
            background:
              #ffffff;
            border:
              1px solid #e2e8f0;
            border-radius:
              8px;
          }

          .calvoro-information-kicker {
            margin-bottom:
              9px;
            color:
              #2563eb;
            font-size:
              9px;
            font-weight:
              900;
            letter-spacing:
              1.1px;
          }

          .calvoro-information-box h2 {
            margin:
              0 0 13px;
            color:
              #0f172a;
            font-size:
              25px;
            line-height:
              1.25;
            font-weight:
              900;
            letter-spacing:
              -0.025em;
          }

          .calvoro-information-box > p,
          .calvoro-explanation p {
            margin:
              0 0 15px;
            color:
              #64748b;
            font-size:
              14px;
            line-height:
              1.85;
          }

          .calvoro-information-box > p:last-child,
          .calvoro-explanation p:last-child {
            margin-bottom: 0;
          }

          /* STEPS */

          .calvoro-steps {
            margin-top:
              23px;
            display:
              grid;
            gap:
              14px;
          }

          .calvoro-step {
            display:
              flex;
            align-items:
              flex-start;
            gap:
              13px;
            padding:
              15px;
            border:
              1px solid #e2e8f0;
            border-radius:
              6px;
            background:
              #f8fafc;
          }

          .calvoro-step > span {
            width:
              28px;
            height:
              28px;
            flex:
              0 0 28px;
            display:
              flex;
            align-items:
              center;
            justify-content:
              center;
            border-radius:
              50%;
            background:
              #1d4ed8;
            color:
              #ffffff;
            font-size:
              12px;
            font-weight:
              900;
          }

          .calvoro-step strong {
            display:
              block;
            color:
              #0f172a;
            font-size:
              13px;
            margin-bottom:
              4px;
          }

          .calvoro-step p {
            margin: 0;
            color:
              #64748b;
            font-size:
              12px;
            line-height:
              1.7;
          }

          /* FORMULA */

          .calvoro-formula-box {
            padding:
              19px;
            border:
              1px solid #dbe3ec;
            border-left:
              4px solid #2563eb;
            border-radius:
              6px;
            background:
              #f8fafc;
            color:
              #172554;
            font-size:
              17px;
            line-height:
              1.7;
            font-weight:
              850;
            text-align:
              center;
            overflow-x:
              auto;
          }

          /* FAQ */

          .calvoro-faq-list {
            display:
              grid;
            gap:
              10px;
          }

          .calvoro-faq-list details {
            padding:
              15px 16px;
            border:
              1px solid #e2e8f0;
            border-radius:
              6px;
            background:
              #ffffff;
          }

          .calvoro-faq-list summary {
            cursor:
              pointer;
            color:
              #0f172a;
            font-size:
              13px;
            font-weight:
              850;
          }

          .calvoro-faq-list p {
            margin:
              11px 0 0;
            color:
              #64748b;
            font-size:
              13px;
            line-height:
              1.75;
          }

          /* SIDEBAR */

          .calvoro-calculator-sidebar {
            display:
              grid;
            gap:
              18px;
          }

          .calvoro-sidebar-box {
            padding:
              22px;
            background:
              #ffffff;
            border:
              1px solid #e2e8f0;
            border-radius:
              8px;
          }

          .calvoro-sidebar-kicker {
            margin-bottom:
              12px;
            color:
              #2563eb;
            font-size:
              9px;
            font-weight:
              900;
            letter-spacing:
              1px;
          }

          .calvoro-sidebar-icon {
            width:
              48px;
            height:
              48px;
            display:
              flex;
            align-items:
              center;
            justify-content:
              center;
            margin-bottom:
              13px;
            border-radius:
              6px;
            background:
              #eff6ff;
            font-size:
              23px;
          }

          .calvoro-sidebar-box h3 {
            margin:
              0 0 8px;
            color:
              #0f172a;
            font-size:
              18px;
            line-height:
              1.3;
            font-weight:
              900;
          }

          .calvoro-sidebar-box p {
            margin:
              0;
            color:
              #64748b;
            font-size:
              12px;
            line-height:
              1.75;
          }

          .calvoro-sidebar-category {
            display:
              inline-flex;
            margin-top:
              17px;
            padding:
              5px 8px;
            border-radius:
              4px;
            background:
              #f1f5f9;
            color:
              #475569;
            font-size:
              9px;
            font-weight:
              900;
            text-transform:
              uppercase;
            letter-spacing:
              .8px;
          }

          .calvoro-related-list {
            display:
              grid;
            gap:
              9px;
          }

          .calvoro-related-item {
            display:
              flex;
            align-items:
              flex-start;
            gap:
              10px;
            padding:
              11px;
            border:
              1px solid #e2e8f0;
            border-radius:
              6px;
            background:
              #f8fafc;
            color:
              #0f172a;
            text-decoration:
              none;
            font-size:
              12px;
            font-weight:
              800;
          }

          .calvoro-related-item:hover {
            color:
              #1d4ed8;
            border-color:
              #bfdbfe;
          }

          .calvoro-related-icon {
            flex:
              0 0 28px;
            width:
              28px;
            height:
              28px;
            display:
              flex;
            align-items:
              center;
            justify-content:
              center;
            border-radius:
              5px;
            background:
              #ffffff;
          }

          .calvoro-related-item small {
            display:
              block;
            margin-top:
              3px;
            color:
              #64748b;
            font-size:
              9px;
            font-weight:
              700;
          }

          .calvoro-sidebar-blue {
            background:
              linear-gradient(
                135deg,
                #172554,
                #1d4ed8
              );
            border:
              none;
          }

          .calvoro-sidebar-blue .calvoro-sidebar-kicker {
            color:
              #bfdbfe;
          }

          .calvoro-sidebar-blue h3 {
            color:
              #ffffff;
          }

          .calvoro-sidebar-blue p {
            color:
              rgba(255,255,255,0.72);
          }

          .calvoro-sidebar-button {
            display:
              inline-flex;
            align-items:
              center;
            justify-content:
              center;
            margin-top:
              17px;
            padding:
              9px 12px;
            border-radius:
              5px;
            background:
              #ffffff;
            color:
              #17358f;
            text-decoration:
              none;
            font-size:
              11px;
            font-weight:
              900;
          }

          .calvoro-sidebar-button:hover {
            background:
              #eff6ff;
            color:
              #17358f;
          }

          /* MOBILE */

          @media (max-width: 900px) {
            .calvoro-calculator-layout {
              grid-template-columns:
                1fr;
            }

            .calvoro-calculator-sidebar {
              grid-template-columns:
                repeat(2, minmax(0, 1fr));
            }

            .calvoro-sidebar-blue {
              grid-column:
                1 / -1;
            }
          }

          @media (max-width: 650px) {
            .calvoro-calculator-container {
              padding-left:
                17px;
              padding-right:
                17px;
            }

            .calvoro-calculator-hero-inner {
              padding:
                35px 0 40px;
            }

            .calvoro-calculator-hero-grid {
              grid-template-columns:
                1fr;
              gap:
                20px;
            }

            .calvoro-calculator-hero-icon {
              justify-self:
                start;
            }

            .calvoro-calculator-main {
              padding:
                35px 0 55px;
            }

            .calvoro-calculator-form,
            .calvoro-information-box {
              padding:
                22px 18px;
            }

            .calvoro-calculator-box-heading {
              padding:
                18px;
            }

            .calvoro-calculator-result {
              margin:
                0 18px 18px;
              padding:
                21px 15px;
            }

            .calvoro-result-value {
              font-size:
                34px;
            }

            .calvoro-calculator-sidebar {
              grid-template-columns:
                1fr;
            }

            .calvoro-sidebar-blue {
              grid-column:
                auto;
            }
          }
        `}
      </style>
    </>
  );
}

