import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  MessageSquare,
  Send,
  CheckCircle,
} from "lucide-react";

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
      <div
        style={{
          minHeight: "100vh",
          background: "#f8fafc",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <header
          style={{
            background: "#2563eb",
            padding: "18px 24px",
          }}
        >
          <div
            style={{
              maxWidth: "1100px",
              margin: "0 auto",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Link
              to="/"
              style={{
                color: "white",
                fontSize: "24px",
                fontWeight: "800",
                textDecoration: "none",
              }}
            >
              CALVORO
            </Link>

            <Link
              to="/"
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              ← Home
            </Link>
          </div>
        </header>

        <main
          style={{
            maxWidth: "700px",
            margin: "70px auto",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "50px 30px",
              textAlign: "center",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.08)",
            }}
          >
            <CheckCircle
              size={70}
              style={{
                color: "#16a34a",
                marginBottom: "20px",
              }}
            />

            <h1
              style={{
                fontSize: "32px",
                color: "#111827",
                marginBottom: "15px",
              }}
            >
              Message Sent Successfully!
            </h1>

            <p
              style={{
                color: "#6b7280",
                fontSize: "17px",
                lineHeight: "1.7",
              }}
            >
              Thank you for contacting CALVORO.
              Your message has been submitted successfully.
            </p>

            <Link
              to="/"
              style={{
                display: "inline-block",
                marginTop: "25px",
                background: "#2563eb",
                color: "white",
                padding: "13px 25px",
                borderRadius: "10px",
                textDecoration: "none",
                fontWeight: "700",
              }}
            >
              Back to Home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f8fafc",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <header
        style={{
          background: "#2563eb",
          padding: "18px 24px",
        }}
      >
        <div
          style={{
            maxWidth: "1100px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Link
            to="/"
            style={{
              color: "white",
              fontSize: "24px",
              fontWeight: "800",
              textDecoration: "none",
            }}
          >
            CALVORO
          </Link>

          <Link
            to="/"
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            ← Home
          </Link>
        </div>
      </header>

      <main
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "60px 20px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "45px",
          }}
        >
          <h1
            style={{
              fontSize: "42px",
              color: "#111827",
              marginBottom: "12px",
            }}
          >
            Contact CALVORO
          </h1>

          <p
            style={{
              color: "#6b7280",
              fontSize: "18px",
            }}
          >
            Have a question, suggestion, or need help?
            Send us a message.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "30px",
          }}
        >
          <div
            style={{
              background: "white",
              padding: "35px",
              borderRadius: "18px",
              boxShadow:
                "0 8px 25px rgba(0,0,0,0.07)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <Mail
                size={28}
                style={{ color: "#2563eb" }}
              />

              <h2
                style={{
                  margin: 0,
                  color: "#111827",
                }}
              >
                Get in Touch
              </h2>
            </div>

            <p
              style={{
                color: "#6b7280",
                lineHeight: "1.7",
              }}
            >
              We are here to help with questions about
              CALVORO calculators, features, suggestions,
              and technical issues.
            </p>

            <div
              style={{
                marginTop: "30px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <MessageSquare
                size={24}
                style={{ color: "#2563eb" }}
              />

              <span style={{ color: "#374151" }}>
                Support & Feedback
              </span>
            </div>
          </div>

          <div
            style={{
              background: "white",
              padding: "35px",
              borderRadius: "18px",
              boxShadow:
                "0 8px 25px rgba(0,0,0,0.07)",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                marginBottom: "25px",
                color: "#111827",
              }}
            >
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "14px",
                  marginBottom: "20px",
                  border: "1px solid #d1d5db",
                  borderRadius: "9px",
                  fontSize: "16px",
                }}
              />

              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "14px",
                  marginBottom: "20px",
                  border: "1px solid #d1d5db",
                  borderRadius: "9px",
                  fontSize: "16px",
                }}
              />

              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#374151",
                }}
              >
                Message
              </label>

              <textarea
                name="message"
                placeholder="Write your message..."
                required
                rows="6"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "14px",
                  marginBottom: "20px",
                  border: "1px solid #d1d5db",
                  borderRadius: "9px",
                  fontSize: "16px",
                  resize: "vertical",
                }}
              />

              <button
                type="submit"
                style={{
                  width: "100%",
                  padding: "15px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "16px",
                  fontWeight: "700",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <Send size={19} />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}