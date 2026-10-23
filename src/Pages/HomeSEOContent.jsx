import { Link } from "react-router-dom";

export default function HomeSEOContent() {
  return (
    <section
      className="calvoro-home-section calvoro-paper-band calvoro-home-guide"
      id="how-to-choose"
    >
      <div className="calvoro-container">
        <div className="calvoro-home-guide-inner">
          <span className="calvoro-eyebrow">How to use this directory</span>
          <h2>Choose a calculator that matches the values you already have</h2>
          <p>
            CALVORO is organized by the kind of number you want, not by
            marketing categories. If you know two of distance, speed, and
            time, open the matching everyday or fitness tool. If you know a
            price and a percent, use percentage or discount. If you know a
            loan amount, rate, and term, use loan, EMI, or mortgage.
          </p>

          <h3>What the category filters do</h3>
          <ul className="calvoro-home-guide-list">
            <li>
              <strong>Math</strong> covers percentages, averages, fractions,
              ratios, and unit conversion.
            </li>
            <li>
              <strong>Finance</strong> covers loans, EMI, mortgage, salary,
              tax, savings, interest, and related money estimates.
            </li>
            <li>
              <strong>Business</strong> covers margin, break-even, ROI, and
              payback period.
            </li>
            <li>
              <strong>Date &amp; Time</strong> covers age, time zones, time
              duration, and the span between two dates.
            </li>
            <li>
              <strong>Health, Education, Everyday, and Fitness</strong> cover
              BMI, GPA, fuel cost, speed/distance, and running pace tools.
            </li>
          </ul>

          <h3>What a result is — and is not</h3>
          <p>
            Each calculator applies its formula to the numbers on the form.
            It does not load your bank, school, or medical records. Loan,
            tax, and mortgage results are estimates: fees, compounding
            rules, and local tax tables can change a real statement. BMI
            is a height-and-weight screening number, not a diagnosis.
            Currency conversion uses the rate shown in that tool, which may
            differ from a bank or card network.
          </p>

          <p>
            Ordinary calculator inputs stay in the browser session for that
            page. You do not need an account to run a calculation.
          </p>

          <div className="calvoro-home-guide-links">
            <Link to="/percentage" className="calvoro-primary-button">
              Open percentage calculator
            </Link>
            <Link to="/loan" className="calvoro-secondary-button">
              Open loan calculator
            </Link>
            <Link to="/tools" className="calvoro-secondary-button">
              Browse the full tool list
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
