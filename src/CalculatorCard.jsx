import { Link } from "react-router-dom";

function CalculatorCard({ calculator }) {
  return (
    <Link
      to={calculator.path}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "16px",
        padding: "24px",
        minHeight: "190px",
        boxSizing: "border-box",
        textDecoration: "none",
        color: "#0f172a",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.transform = "translateY(-5px)";
        event.currentTarget.style.boxShadow =
          "0 12px 30px rgba(15, 23, 42, 0.10)";
        event.currentTarget.style.borderColor = "#bfdbfe";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.transform = "translateY(0)";
        event.currentTarget.style.boxShadow = "none";
        event.currentTarget.style.borderColor = "#e2e8f0";
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "18px",
        }}
      >
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "12px",
            background: "#eff6ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "22px",
          }}
        >
          🧮
        </div>

        <span
          style={{
            background: "#f1f5f9",
            color: "#475569",
            padding: "6px 10px",
            borderRadius: "20px",
            fontSize: "11px",
            fontWeight: "800",
            textTransform: "uppercase",
          }}
        >
          {calculator.category}
        </span>
      </div>

      <h3
        style={{
          margin: "0",
          fontSize: "19px",
          lineHeight: "1.4",
          fontWeight: "700",
        }}
      >
        {calculator.name}
      </h3>

      <div
        style={{
          marginTop: "auto",
          paddingTop: "20px",
          color: "#2563eb",
          fontWeight: "700",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        Open Calculator
        <span style={{ fontSize: "18px" }}>→</span>
      </div>
    </Link>
  );
}

export default CalculatorCard;