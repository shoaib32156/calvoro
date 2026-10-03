import { Link } from "react-router-dom";

function About() {
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

```
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
    <div
      style={{
        background: "white",
        borderRadius: "18px",
        padding: "45px",
        boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
        border: "1px solid #e2e8f0",
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
        About CALVORO
      </div>

      <h1
        style={{
          fontSize: "clamp(34px, 6vw, 52px)",
          lineHeight: "1.1",
          margin: "0 0 22px",
          fontWeight: "900",
        }}
      >
        Simple Tools for Everyday Calculations
      </h1>

      <p
        style={{
          color: "#475569",
          fontSize: "18px",
          lineHeight: "1.8",
          marginBottom: "30px",
        }}
      >
        CALVORO is a free online calculator platform created to make
        everyday calculations simple, fast, and accessible. Our goal is
        to provide useful tools that anyone can use without complicated
        formulas or unnecessary steps.
      </p>

      <h2
        style={{
          fontSize: "28px",
          marginTop: "35px",
          marginBottom: "14px",
        }}
      >
        What We Provide
      </h2>

      <p
        style={{
          color: "#475569",
          lineHeight: "1.8",
          fontSize: "16px",
        }}
      >
        CALVORO provides calculators covering finance, mathematics,
        business, health, education, conversions, time, and running.
        Each tool is designed to provide clear results from the
        information entered by the user.
      </p>

      <h2
        style={{
          fontSize: "28px",
          marginTop: "35px",
          marginBottom: "14px",
        }}
      >
        Our Goal
      </h2>

      <p
        style={{
          color: "#475569",
          lineHeight: "1.8",
          fontSize: "16px",
        }}
      >
        Our goal is to build a reliable collection of free online tools
        that saves people time and helps them understand everyday
        calculations more easily.
      </p>

      <h2
        style={{
          fontSize: "28px",
          marginTop: "35px",
          marginBottom: "14px",
        }}
      >
        Free and Easy to Use
      </h2>

      <p
        style={{
          color: "#475569",
          lineHeight: "1.8",
          fontSize: "16px",
        }}
      >
        CALVORO calculators are designed to be easy to use on computers,
        tablets, and mobile devices. You can enter your values, calculate
        your result, and use the information for your personal or
        educational needs.
      </p>

      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          background: "#eff6ff",
          borderRadius: "12px",
          border: "1px solid #bfdbfe",
        }}
      >
        <strong>Have a question?</strong>

        <p
          style={{
            margin: "8px 0 15px",
            color: "#475569",
            lineHeight: "1.6",
          }}
        >
          We'd be happy to hear from you.
        </p>

        <Link
          to="/contact"
          style={{
            display: "inline-block",
            background: "#2563eb",
            color: "white",
            padding: "11px 18px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "800",
          }}
        >
          Contact Us
        </Link>
      </div>

      <div
        style={{
          marginTop: "40px",
          paddingTop: "20px",
          borderTop: "1px solid #e2e8f0",
        }}
      >
        <Link
          to="/privacy-policy"
          style={{
            color: "#2563eb",
            textDecoration: "none",
            fontWeight: "700",
          }}
        >
          Read our Privacy Policy →
        </Link>
      </div>
    </div>
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

export default About;
