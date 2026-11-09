import { Link } from "react-router-dom";
import { ArrowRight, MessageSquare } from "lucide-react";
import SEO from "../SEO";
import Breadcrumbs from "../components/editorial/Breadcrumbs.jsx";

function About() {
  return (
    <div className="calvoro-content-page">
      <SEO />

      <section className="calvoro-content-hero">
        <div className="calvoro-container">
          <div className="calvoro-content-hero-inner">
            <Breadcrumbs
              items={[{ label: "Home", to: "/" }, { label: "About" }]}
            />
            <span className="ui-eyebrow">About CALVORO</span>
            <h1>Free Tools for Everyday Calculations and Practical Tasks</h1>
            <p>
              CALVORO is a free website that brings calculators, browser-based
              tools, and explanatory articles together in one place. The
              calculators require no account, and each calculator page includes
              a guide so you can check the method behind the result.
            </p>
          </div>
        </div>
      </section>

      <main className="calvoro-content-main">
        <div className="calvoro-container">
          <article className="calvoro-content-card">
            <h2>What CALVORO Includes</h2>

            <p>
              The calculator collection covers finance, math, business, health,
              education, conversions, date and time, and fitness topics such as
              pace and running time. CALVORO also includes AI writing tools, PDF
              and image utilities, text and developer tools, a QR code generator,
              a Pomodoro timer, learning practice tools, and browser-based puzzle
              games.
            </p>

            <h2>How the Tools Work</h2>

            <p>
              Calculator inputs are processed in your browser. Many image, PDF,
              and text tools are also designed to run locally in the browser.
              The AI writing tools and the Website Metadata Checker send the
              information you enter to CALVORO's Cloudflare Worker so the request
              can be completed. The{" "}
              <Link to="/privacy-policy">Privacy Policy</Link> describes these
              data flows, including the use of an external AI provider.
            </p>

            <h2>Guides and Explanations</h2>

            <p>
              Calculator guides show the formula the tool uses, a worked example,
              practical notes, and answers to common questions. The blog contains
              longer articles that explain selected concepts related to the
              site's calculators and tools in more detail.
            </p>

            <h2>Free to Use</h2>

            <p>
              CALVORO does not require an account to use its calculators and
              tools. The site includes Google AdSense code, and ads may appear
              depending on ad availability and site settings. The Privacy Policy
              explains how advertising and cookies may be handled.
            </p>

            <h2>Questions and Corrections</h2>

            <p>
              If you have a question about a tool, notice a calculation problem,
              or want to suggest an improvement, use the contact form to send a
              message.
            </p>

            <div className="calvoro-contact-note">
              <strong>Have a question?</strong>

              <p>
                Send a message and include the tool name and the values you
                entered if you are reporting a problem.
              </p>

              <Link to="/contact" className="calvoro-primary-button">
                <MessageSquare size={18} aria-hidden="true" />
                Contact Us
              </Link>
            </div>

            <div className="calvoro-content-footer">
              <Link to="/privacy-policy" className="calvoro-text-link">
                Read our Privacy Policy
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </article>
        </div>
      </main>
    </div>
  );
}

export default About;
