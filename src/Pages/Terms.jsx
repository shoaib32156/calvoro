import { Link } from "react-router-dom";
import SEO from "../SEO";
import Breadcrumbs from "../components/editorial/Breadcrumbs.jsx";

function Terms() {
  return (
    <div className="calvoro-content-page">
      <SEO />

      <section className="calvoro-content-hero">
        <div className="calvoro-container">
          <div className="calvoro-content-hero-inner">
            <Breadcrumbs
              items={[{ label: "Home", to: "/" }, { label: "Terms" }]}
            />
            <span className="ui-eyebrow">Legal</span>
            <h1>Terms & Conditions</h1>
            <span className="calvoro-content-updated">
              Last updated: September 27, 2026
            </span>
            <p>
              Welcome to CALVORO. By accessing or using this website, you agree
              to these Terms & Conditions. If you do not agree with these terms,
              please do not use the website.
            </p>
          </div>
        </div>
      </section>

      <main className="calvoro-content-main">
        <div className="calvoro-container">
          <div className="calvoro-content-layout">
            <article className="calvoro-content-card">

      <h2>1. Use of the Website</h2>

      <p>
        CALVORO provides free online calculators and informational tools
        for general use. You may use the website for lawful personal,
        educational, informational, or business purposes.
      </p>

      <h2>2. Calculator Results</h2>

      <p>
        CALVORO calculators are provided as general calculation tools.
        While we aim to provide accurate formulas and results, we do not
        guarantee that every result will be completely accurate,
        complete, or suitable for a particular purpose.
      </p>

      <p>
        You should independently verify important financial, business,
        health, educational, or other decisions before relying on a
        calculator result.
      </p>

      <h2>3. No Professional Advice</h2>

      <p>
        Information and calculator results provided by CALVORO are not
        professional financial, legal, medical, tax, investment, or other
        professional advice.
      </p>

      <p>
        For decisions that require professional guidance, consult a
        qualified professional.
      </p>

      <h2>4. Intellectual Property</h2>

      <p>
        Unless otherwise stated, the CALVORO website, branding, original
        text, design, graphics, and website content are owned by or
        licensed to CALVORO.
      </p>

      <p>
        You may use the website for normal personal or informational
        purposes, but you may not copy, reproduce, modify, distribute, or
        republish substantial portions of the website without appropriate
        permission.
      </p>

      <h2>5. Prohibited Use</h2>

      <p>You agree not to:</p>

      <ul>
        <li>Use the website for unlawful purposes.</li>
        <li>Attempt to damage or disrupt the website.</li>
        <li>Attempt to gain unauthorized access to website systems.</li>
        <li>Use automated methods to abuse or overload the website.</li>
        <li>Interfere with other users' access to the website.</li>
      </ul>

      <h2>6. Third-Party Services and Advertising</h2>

      <p>
        CALVORO may use third-party services, analytics tools,
        advertising providers, or external links. These third parties
        may have their own terms and privacy policies.
      </p>

      <p>
        CALVORO is not responsible for the content, policies, or practices
        of third-party websites and services.
      </p>

      <h2>7. Availability of the Website</h2>

      <p>
        We aim to keep CALVORO available and functioning properly, but we
        do not guarantee that the website will always be available,
        uninterrupted, secure, or free from errors.
      </p>

      <h2>8. Limitation of Liability</h2>

      <p>
        To the extent permitted by applicable law, CALVORO and its
        operators shall not be responsible for losses or damages resulting
        from reliance on calculator results, website content, service
        interruptions, technical problems, or third-party services.
      </p>

      <h2>9. Changes to These Terms</h2>

      <p>
        We may update these Terms & Conditions from time to time. Changes
        will become effective when the updated terms are published on this
        page.
      </p>

      <h2>10. Contact Us</h2>

      <p>
        If you have questions about these Terms & Conditions, please
        contact us through the CALVORO Contact page.
      </p>

              <div className="calvoro-content-footer">
                <Link to="/contact" className="calvoro-text-link">
                  Contact Us →
                </Link>

                <Link to="/privacy-policy" className="calvoro-text-link">
                  Privacy Policy →
                </Link>

                <Link to="/" className="calvoro-text-link">
                  Back to CALVORO →
                </Link>
              </div>
            </article>

            <aside className="calvoro-content-aside">
              <div className="calvoro-content-aside-card">
                <h2>Legal and help</h2>
                <p>
                  Read how CALVORO handles information, or send a question about
                  these terms.
                </p>
                <div className="calvoro-content-aside-links">
                  <Link to="/privacy-policy">
                    Privacy Policy
                    <span aria-hidden="true">→</span>
                  </Link>
                  <Link to="/contact">
                    Contact CALVORO
                    <span aria-hidden="true">→</span>
                  </Link>
                  <Link to="/about">
                    About CALVORO
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Terms;
