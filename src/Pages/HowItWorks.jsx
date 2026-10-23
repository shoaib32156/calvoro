const steps = [
  {
    number: "01",
    title: "Search or filter",
    description:
      "Use the search box for a task such as EMI or BMI, or pick a category so only matching calculators stay visible.",
  },
  {
    number: "02",
    title: "Enter the values the form asks for",
    description:
      "Use the units shown on the page (for example centimeters, years, or an annual rate). The result is only as accurate as those inputs.",
  },
  {
    number: "03",
    title: "Read the result on the same page",
    description:
      "The tool shows the calculated value immediately. Check any notes on the page for fees, rounding, or cases the formula does not cover.",
  },
];

export default function HowItWorks() {
  return (
    <section
      className="calvoro-home-section calvoro-how"
      aria-labelledby="how-calvoro-heading"
    >
      <div className="calvoro-container">
        <div className="calvoro-section-heading">
          <span className="calvoro-eyebrow">Using a calculator</span>
          <h2 id="how-calvoro-heading">Three steps from search to result</h2>
          <p>
            You do not create an account. Open a tool, fill the form, and
            review the output before you rely on it for a decision.
          </p>
        </div>

        <div className="calvoro-how-grid">
          {steps.map((step) => (
            <article key={step.number} className="calvoro-how-card">
              <span className="calvoro-how-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
