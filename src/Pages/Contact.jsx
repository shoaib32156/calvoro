import { useState } from "react";
import { Link } from "react-router-dom";
import SEO from "../SEO";
import { Mail, MessageSquare, Send, CheckCircle } from "lucide-react";
import Breadcrumbs from "../components/editorial/Breadcrumbs.jsx";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.currentTarget;

    fetch("https://formspree.io/f/xwlprgeq", {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setSent(true);
          form.reset();
        } else {
          alert("Formspree could not receive the message.");
        }
      })
      .catch(() => {
        alert("There was a connection problem. Please try again.");
      });
  };

  if (sent) {
    return (
      <div className="calvoro-content-page">
        <SEO />
        <main className="calvoro-content-main">
          <div className="calvoro-container">
            <div className="calvoro-contact-card calvoro-contact-success">
              <CheckCircle size={56} aria-hidden="true" />

              <h2>Message Sent Successfully!</h2>

              <p>
                Thank you for contacting CALVORO. Your message has been
                submitted successfully.
              </p>

              <Link to="/" className="calvoro-primary-button">
                Back to Home
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="calvoro-content-page">
      <SEO />

      <section className="calvoro-content-hero">
        <div className="calvoro-container">
          <div className="calvoro-content-hero-inner">
            <Breadcrumbs
              items={[{ label: "Home", to: "/" }, { label: "Contact" }]}
            />
            <span className="ui-eyebrow">Contact</span>
            <h1>Contact CALVORO</h1>
            <p>
              Have a question, suggestion, or need help? Send us a message.
            </p>
          </div>
        </div>
      </section>

      <main className="calvoro-content-main">
        <div className="calvoro-container">
          <div className="calvoro-contact-grid">
            <div className="calvoro-contact-card">
              <h2>Send Us a Message</h2>

              <form className="calvoro-contact-form" onSubmit={handleSubmit}>
                <div className="calvoro-contact-field">
                  <label htmlFor="contact-name">Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="calvoro-contact-field">
                  <label htmlFor="contact-email">Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div className="calvoro-contact-field">
                  <label htmlFor="contact-message">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    placeholder="Write your message..."
                    required
                    rows="6"
                  />
                </div>

                <button type="submit" className="calvoro-primary-button">
                  <Send size={19} aria-hidden="true" />
                  Send Message
                </button>
              </form>
            </div>

            <aside className="calvoro-contact-info">
              <div className="calvoro-contact-card">
                <div className="calvoro-contact-heading">
                  <Mail size={24} aria-hidden="true" />
                  <h2>Get in Touch</h2>
                </div>

                <p>
                  We are here to help with questions about CALVORO calculators,
                  features, suggestions, and technical issues.
                </p>

                <div className="calvoro-contact-item">
                  <MessageSquare size={24} aria-hidden="true" />
                  <div>
                    <strong>Support & Feedback</strong>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
}
