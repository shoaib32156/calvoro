import { useState } from "react";

const faqItems = [
  {
    question: "What is CALVORO?",
    answer:
      "CALVORO is a free website of online calculators for math, finance, health, school, dates, and everyday planning. Writing helpers and math solvers are available on separate pages.",
  },
  {
    question: "Do I need to pay or create an account?",
    answer:
      "No. The calculators are meant to be used in the browser without signing in. You can open a tool, enter values, and see a result immediately.",
  },
  {
    question: "How should I treat the results?",
    answer:
      "Treat them as calculations from the formula on that page and the numbers you typed. For loans, tax, mortgages, or health screening numbers, compare the result with statements or advice from the relevant provider when the decision matters.",
  },
  {
    question: "Does a calculator save what I type?",
    answer:
      "Ordinary calculator pages run in the browser. You do not need to save inputs for the tool to work. Privacy details are in the privacy policy.",
  },
  {
    question: "Where is the full list of tools?",
    answer:
      "The homepage directory lists the calculators. The All tools page adds math solvers and optional AI writing helpers in the same search and category layout.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      className="calvoro-home-section calvoro-faq"
      aria-labelledby="faq-heading"
    >
      <div className="calvoro-container">
        <div className="calvoro-section-heading">
          <span className="calvoro-eyebrow">Questions</span>
          <h2 id="faq-heading">About using CALVORO</h2>
          <p>
            Short answers about accounts, accuracy, and where to find every
            tool.
          </p>
        </div>

        <div className="calvoro-faq-list">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div key={item.question} className="calvoro-faq-item">
                <button
                  id={buttonId}
                  type="button"
                  className="calvoro-faq-button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() =>
                    setOpenIndex((current) => (current === index ? null : index))
                  }
                >
                  <span>{item.question}</span>
                  <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="calvoro-faq-panel"
                  >
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
