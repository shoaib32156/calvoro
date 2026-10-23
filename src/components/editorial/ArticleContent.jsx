import RichText from "./RichText.jsx";

export function ArticleToc({ sections }) {
  return (
    <nav className="calvoro-article-toc" aria-labelledby="article-toc-heading">
      <h2 id="article-toc-heading">In this guide</h2>
      <ol>
        {sections.map((section, index) => (
          <li key={section.heading}>
            <a href={`#section-${index}`}>{section.heading}</a>
          </li>
        ))}
        <li>
          <a href="#article-faq">Frequently asked questions</a>
        </li>
      </ol>
    </nav>
  );
}

export function ArticleSections({ article }) {
  return (
    <div className="calvoro-article-sections">
      {article.sections.map((section, index) => (
        <section
          key={section.heading}
          id={`section-${index}`}
          className="calvoro-article-section"
        >
          <span className="calvoro-article-section-number" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h2>{section.heading}</h2>

          {(section.paragraphs || []).map((paragraph) => (
            <p key={paragraph}>
              <RichText text={paragraph} />
            </p>
          ))}

          {section.formula && (
            <div className="calvoro-article-formula">
              <span>Formula</span>
              <code>{section.formula}</code>
            </div>
          )}

          {section.list && section.list.length > 0 && (
            <ul className="calvoro-article-list">
              {section.list.map((item) => (
                <li key={item}>
                  <RichText text={item} />
                </li>
              ))}
            </ul>
          )}

          {section.example && (
            <div className="calvoro-article-example">
              <strong>{section.example.title}</strong>
              <ul>
                {section.example.lines.map((line) => (
                  <li key={line}>
                    <RichText text={line} />
                  </li>
                ))}
              </ul>
            </div>
          )}

          {section.note && (
            <div className="calvoro-article-note">
              <strong>Keep in mind</strong>
              <p>
                <RichText text={section.note} />
              </p>
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

export function ArticleFaq({ faq }) {
  if (!faq || faq.length === 0) {
    return null;
  }

  return (
    <section
      id="article-faq"
      className="calvoro-article-faq"
      aria-labelledby="article-faq-heading"
    >
      <span className="calvoro-article-section-kicker">Common questions</span>
      <h2 id="article-faq-heading">Frequently asked questions</h2>

      <div className="calvoro-article-faq-list">
        {faq.map((item) => (
          <details key={item.question} className="calvoro-article-faq-item">
            <summary>{item.question}</summary>
            <p>
              <RichText text={item.answer} />
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
