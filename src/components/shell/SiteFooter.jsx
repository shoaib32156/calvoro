import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import BrandMark from "./BrandMark.jsx";

export default function SiteFooter() {
  return (
    <footer className="calvoro-global-footer">
      <div className="calvoro-footer-inner">
        <div className="calvoro-footer-grid">
          <div>
            <div className="calvoro-footer-brand">
              <BrandMark />
              CALVORO<span className="calvoro-brand-dot">.</span>
              <span className="calvoro-brand-tools">Tools</span>
            </div>

            <p className="calvoro-footer-description">
              Free browser-based calculators and utilities for math, finance,
              health, school, files, text, and everyday planning.
            </p>

            <Link to="/contact" className="calvoro-footer-email">
              Contact CALVORO <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div>
            <h3>Explore</h3>
            <Link to="/tools">All Tools</Link>
            <Link to="/blog">Journal</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div>
            <h3>Calculators</h3>
            <Link to="/percentage">Percentage Calculator</Link>
            <Link to="/bmi">BMI Calculator</Link>
            <Link to="/loan">Loan Calculator</Link>
            <Link to="/gpa">GPA Calculator</Link>
            <Link to="/mortgage">Mortgage Calculator</Link>
          </div>

          <div>
            <h3>Browser tools</h3>
            <Link to="/pdf-studio">PDF Studio</Link>
            <Link to="/image-studio">Image Studio</Link>
            <Link to="/word-counter">Word Counter</Link>
            <Link to="/json-formatter">JSON Formatter</Link>
            <Link to="/puzzle-games">Puzzle Games</Link>
          </div>

          <div>
            <h3>Information</h3>
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms">Terms of Use</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div className="calvoro-footer-bottom">
          <span>
            © {new Date().getFullYear()} CALVORO. All rights reserved.
          </span>
          <span>
            <ShieldCheck size={14} aria-hidden="true" />
            Results are estimates based on the values you enter.
          </span>
        </div>
      </div>
    </footer>
  );
}
