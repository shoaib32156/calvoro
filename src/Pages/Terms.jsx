import { Link } from "react-router-dom";

function Terms() {
return (
<div
style={{
minHeight: "100vh",
background: "#f8fafc",
color: "#0f172a",
}}
>
<header
style={{
background: "#2563eb",
color: "white",
padding: "18px 24px",
}}
>
<div
style={{
maxWidth: "1100px",
margin: "0 auto",
display: "flex",
alignItems: "center",
justifyContent: "space-between",
gap: "20px",
flexWrap: "wrap",
}}
>
<Link
to="/"
style={{
color: "white",
textDecoration: "none",
fontSize: "26px",
fontWeight: "900",
letterSpacing: "1px",
}}
>
CALVORO </Link>

      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
          fontWeight: "700",
        }}
      >
        Home
      </Link>
    </div>
  </header>

  <main
    style={{
      maxWidth: "900px",
      margin: "0 auto",
      padding: "70px 24px",
    }}
  >
    <article
      style={{
        background: "white",
        borderRadius: "18px",
        padding: "45px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
      }}
    >
      <div
        style={{
          display: "inline-block",
          background: "#dbeafe",
          color: "#1d4ed8",
          padding: "7px 13px",
          borderRadius: "999px",
          fontSize: "13px",
          fontWeight: "800",
          marginBottom: "18px",
        }}
      >
        CALVORO
      </div>

      <h1
        style={{
          fontSize: "clamp(34px, 6vw, 52px)",
          lineHeight: "1.1",
          margin: "0 0 12px",
          fontWeight: "900",
        }}
      >
        Terms & Conditions
      </h1>

      <p
        style={{
          color: "#64748b",
          marginBottom: "35px",
        }}
      >
        Last updated: September 27, 2026
      </p>

      <p>
        Welcome to CALVORO. By accessing or using this website, you agree
        to these Terms & Conditions. If you do not agree with these terms,
        please do not use the website.
      </p>

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

      <div
        style={{
          marginTop: "40px",
          paddingTop: "25px",
          borderTop: "1px solid #e2e8f0",
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <Link
          to="/contact"
          style={{
            color: "#2563eb",
            textDecoration: "none",
            fontWeight: "800",
          }}
        >
          Contact Us →
        </Link>

        <Link
          to="/privacy-policy"
          style={{
            color: "#2563eb",
            textDecoration: "none",
            fontWeight: "800",
          }}
        >
          Privacy Policy →
        </Link>

        <Link
          to="/"
          style={{
            color: "#2563eb",
            textDecoration: "none",
            fontWeight: "800",
          }}
        >
          Back to CALVORO →
        </Link>
      </div>
    </article>
  </main>

  <footer
    style={{
      background: "#0f172a",
      color: "#94a3b8",
      textAlign: "center",
      padding: "30px 24px",
    }}
  >
    © {new Date().getFullYear()} CALVORO. All rights reserved.
  </footer>
</div>

);
}

export default Terms;
