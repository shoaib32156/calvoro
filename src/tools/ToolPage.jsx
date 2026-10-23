import { Link } from "react-router-dom";
import SEO from "../SEO";
import Breadcrumbs from "../components/editorial/Breadcrumbs.jsx";
import RichText from "../components/editorial/RichText.jsx";
import "./tools.css";

export default function ToolPage({
  title,
  kicker = "Browser tool",
  description,
  seoTitle,
  seoDescription,
  steps = [],
  notes = [],
  related = [],
  children,
}) {
  return (
    <div className="calvoro-tool-page">
      <SEO
        title={seoTitle || `${title} - Free Online Tool | CALVORO`}
        description={seoDescription || description}
        type="WebApplication"
      />

      <header className="calvoro-tool-hero">
        <div className="calvoro-tool-container">
          <Breadcrumbs
            tone="dark"
            items={[
              { label: "Home", to: "/" },
              { label: "Tools", to: "/tools" },
              { label: title },
            ]}
          />

          <span className="calvoro-tool-kicker">{kicker}</span>
          <h1>{title}</h1>
          <p>{description}</p>

          <div className="calvoro-tool-privacy">
            <span aria-hidden="true" />
            Runs in your browser. CALVORO does not upload your files.
          </div>
        </div>
      </header>

      <main className="calvoro-tool-main">
        <div className="calvoro-tool-container">
          <div className="calvoro-tool-layout">
            <div className="calvoro-tool-workspace">{children}</div>

            <aside className="calvoro-tool-aside">
              {steps.length > 0 && (
                <section>
                  <h2>How to use it</h2>
                  <ol>
                    {steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </section>
              )}

              <section>
                <h2>Privacy</h2>
                <p>
                  Processing happens locally in this browser tab. Files are not
                  sent to CALVORO or a third-party conversion service.
                </p>
              </section>

              {related.length > 0 && (
                <section>
                  <h2>Related tools</h2>
                  <div className="calvoro-tool-aside-links">
                    {related.map((tool) => (
                      <Link key={tool.path} to={tool.path}>
                        {tool.name} <span aria-hidden="true">→</span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </aside>
          </div>

          {notes.length > 0 && (
            <section className="calvoro-tool-notes" aria-labelledby="tool-notes-heading">
              <span className="calvoro-tool-kicker">Limitations and details</span>
              <h2 id="tool-notes-heading">Good to know</h2>
              <ul>
                {notes.map((note) => (
                  <li key={note}>
                    <RichText text={note} />
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
