import { Link } from "react-router-dom";
import SEO from "../SEO";

function About() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        color: "#0f172a",
      }}
    >
      <SEO />
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
            CALVORO
          </Link>

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
            Free Tools for Everyday Calculations and Practical Tasks
          </h1>

          <p
            style={{
              color: "#475569",
              fontSize: "18px",
              lineHeight: "1.8",
              marginBottom: "30px",
            }}
          >
            CALVORO is a free website that brings calculators, browser-based
            tools, and explanatory articles together in one place. The
            calculators require no account, and each calculator page includes
            a guide so you can check the method behind the result.
          </p>

          <h2
            style={{
              fontSize: "28px",
              marginTop: "35px",
              marginBottom: "14px",
            }}
          >
            What CALVORO Includes
          </h2>

          <p
            style={{
              color: "#475569",
              lineHeight: "1.8",
              fontSize: "16px",
            }}
          >
            The calculator collection covers finance, math, business, health,
            education, conversions, date and time, and fitness topics such as
            pace and running time. CALVORO also includes AI writing tools, PDF
            and image utilities, text and developer tools, a QR code generator,
            a Pomodoro timer, learning practice tools, and browser-based puzzle
            games.
          </p>

          <h2
            style={{
              fontSize: "28px",
              marginTop: "35px",
              marginBottom: "14px",
            }}
          >
            How the Tools Work
          </h2>

          <p
            style={{
              color: "#475569",
              lineHeight: "1.8",
              fontSize: "16px",
            }}
          >
            Calculator inputs are processed in your browser. Many image, PDF,
            and text tools are also designed to run locally in the browser.
            The AI writing tools and the Website Metadata Checker send the
            information you enter to CALVORO's Cloudflare Worker so the request
            can be completed. The{" "}
            <Link
              to="/privacy-policy"
              style={{
                color: "#2563eb",
                fontWeight: "700",
              }}
            >
              Privacy Policy
            </Link>{" "}
            describes these data flows, including the use of an external AI
            provider.
          </p>

          <h2
            style={{
              fontSize: "28px",
              marginTop: "35px",
              marginBottom: "14px",
            }}
          >
            Guides and Explanations
          </h2>

          <p
            style={{
              color: "#475569",
              lineHeight: "1.8",
              fontSize: "16px",
            }}
          >
            Calculator guides show the formula the tool uses, a worked example,
            practical notes, and answers to common questions. The blog contains
            longer articles that explain selected concepts related to the
            site's calculators and tools in more detail.
          </p>

          <h2
            style={{
              fontSize: "28px",
              marginTop: "35px",
              marginBottom: "14px",
            }}
          >
            Free to Use
          </h2>

          <p
            style={{
              color: "#475569",
              lineHeight: "1.8",
              fontSize: "16px",
            }}
          >
            CALVORO does not require an account to use its calculators and
            tools. The site includes Google AdSense code, and ads may appear
            depending on ad availability and site settings. The Privacy Policy
            explains how advertising and cookies may be handled.
          </p>

          <h2
            style={{
              fontSize: "28px",
              marginTop: "35px",
              marginBottom: "14px",
            }}
          >
            Questions and Corrections
          </h2>

          <p
            style={{
              color: "#475569",
              lineHeight: "1.8",
              fontSize: "16px",
            }}
          >
            If you have a question about a tool, notice a calculation problem,
            or want to suggest an improvement, use the contact form to send a
            message.
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
              Send a message and include the tool name and the values you
              entered if you are reporting a problem.
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
