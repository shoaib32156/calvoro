import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
return (
<div
style={{
minHeight: "100vh",
background: "#f8fafc",
fontFamily: "Arial, sans-serif",
color: "#0f172a",
}}
>
<header
style={{
background: "#2563eb",
padding: "18px 20px",
}}
>
<div
style={{
maxWidth: "1100px",
margin: "0 auto",
display: "flex",
justifyContent: "space-between",
alignItems: "center",
gap: "20px",
}}
>
<Link
to="/"
style={{
color: "white",
textDecoration: "none",
fontSize: "24px",
fontWeight: "800",
}}
>
CALVORO </Link>

```
      <Link
        to="/"
        style={{
          color: "white",
          textDecoration: "none",
          fontWeight: "600",
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
      padding: "50px 20px",
    }}
  >
    <article
      style={{
        background: "white",
        padding: "40px",
        borderRadius: "16px",
        boxShadow: "0 8px 30px rgba(15, 23, 42, 0.06)",
      }}
    >
      <h1
        style={{
          fontSize: "38px",
          marginTop: 0,
          marginBottom: "12px",
        }}
      >
        Privacy Policy
      </h1>

      <p style={{ color: "#64748b" }}>
        Last updated: September 27, 2026
      </p>

      <p>
        Welcome to CALVORO. Your privacy is important to us. This Privacy
        Policy explains how information may be collected, used, and
        protected when you use the CALVORO website and its online
        calculators and tools.
      </p>

      <h2>1. Information We Collect</h2>

      <p>
        CALVORO is designed to provide online calculators and useful
        tools. Many calculations can be performed directly in your
        browser without requiring you to create an account or provide
        personal information.
      </p>

      <p>
        Depending on the features available on the website, we may receive
        information that you voluntarily provide, such as information
        submitted through a contact form.
      </p>

      <h2>2. Automatically Collected Information</h2>

      <p>
        Like many websites, CALVORO may receive basic technical
        information when visitors access the website. This can include
        information such as browser type, device type, approximate
        location, pages visited, and general usage information.
      </p>

      <p>
        This information may be used to help maintain, secure, improve,
        and understand how the website is used.
      </p>

      <h2>3. Cookies</h2>

      <p>
        CALVORO may use cookies or similar technologies to support website
        functionality, understand website usage, and potentially provide
        advertising services.
      </p>

      <p>
        If advertising services are added to CALVORO, third-party
        advertising providers may use cookies or similar technologies in
        accordance with their own privacy policies and applicable
        requirements.
      </p>

      <h2>4. Google AdSense and Advertising</h2>

      <p>
        CALVORO may use third-party advertising services such as Google
        AdSense in the future.
      </p>

      <p>
        If advertising is displayed, advertising providers may use
        cookies, web beacons, or similar technologies to provide and
        measure advertisements.
      </p>

      <p>
        Visitors may be able to control personalized advertising through
        the settings and controls provided by the relevant advertising
        provider.
      </p>

      <h2>5. Third-Party Services</h2>

      <p>
        CALVORO may use third-party services for website hosting,
        analytics, security, forms, advertising, or other website
        functionality.
      </p>

      <p>
        These third-party services may process information according to
        their own privacy policies and terms.
      </p>

      <h2>6. Calculator Data</h2>

      <p>
        Information entered into a calculator is generally used to perform
        the requested calculation. Unless a specific feature states
        otherwise, calculator inputs are not intended to be used to
        identify individual visitors.
      </p>

      <p>
        Users should avoid entering sensitive personal information into
        calculator fields unless the website specifically requests it.
      </p>

      <h2>7. Contact Information</h2>

      <p>
        If you contact CALVORO through a contact form or another available
        communication method, the information you provide may be used to
        respond to your request, provide support, or improve the website.
      </p>

      <h2>8. Data Security</h2>

      <p>
        We take reasonable measures to help protect information handled by
        the website. However, no internet transmission or electronic
        storage system can be guaranteed to be completely secure.
      </p>

      <h2>9. Children's Privacy</h2>

      <p>
        CALVORO is a general-purpose website and is not specifically
        directed toward children. We do not knowingly request personal
        information from children through the website.
      </p>

      <h2>10. External Links</h2>

      <p>
        CALVORO may contain links to external websites or services. We are
        not responsible for the privacy practices, content, or security of
        third-party websites.
      </p>

      <h2>11. Changes to This Privacy Policy</h2>

      <p>
        This Privacy Policy may be updated from time to time as CALVORO
        develops new features, services, or advertising partnerships.
        Updates will be posted on this page with a revised "Last updated"
        date.
      </p>

      <h2>12. Contact Us</h2>

      <p>
        If you have questions about this Privacy Policy or CALVORO's
        privacy practices, please visit our{" "}
        <Link
          to="/contact"
          style={{
            color: "#2563eb",
            fontWeight: "600",
          }}
        >
          Contact page
        </Link>
        .
      </p>

      <div
        style={{
          marginTop: "40px",
          paddingTop: "25px",
          borderTop: "1px solid #e2e8f0",
        }}
      >
        <Link
          to="/"
          style={{
            color: "#2563eb",
            textDecoration: "none",
            fontWeight: "600",
          }}
        >
          ← Back to CALVORO
        </Link>
      </div>
    </article>
  </main>
</div>


);
}
