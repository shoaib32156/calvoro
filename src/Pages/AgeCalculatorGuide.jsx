export default function AgeCalculatorGuide() {
  return (
    <section
      style={{
        marginTop: "30px",
        padding: "30px",
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "18px",
      }}
    >
      <div
        style={{
          display: "inline-block",
          padding: "6px 10px",
          borderRadius: "999px",
          background: "#eff6ff",
          color: "#1d4ed8",
          fontSize: "12px",
          fontWeight: "800",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          marginBottom: "12px",
        }}
      >
        CALVORO Guide
      </div>

      <h2
        style={{
          margin: "0 0 14px",
          color: "#0f172a",
          fontSize: "28px",
          lineHeight: "1.3",
        }}
      >
        How an age calculator works
      </h2>

      <p
        style={{
          color: "#475569",
          fontSize: "16px",
          lineHeight: "1.8",
          margin: "0 0 18px",
        }}
      >
        An age calculator compares a date of birth with a selected
        reference date and determines the elapsed time between them.
        CALVORO presents the result in years, months, and days so the
        result is easier to understand.
      </p>

      <p
        style={{
          color: "#475569",
          fontSize: "16px",
          lineHeight: "1.8",
          margin: "0 0 18px",
        }}
      >
        To use the calculator, enter the date of birth and select
        Calculate My Age. The calculator then works through the calendar
        dates to determine the completed years, remaining months, and
        remaining days.
      </p>

      <h3
        style={{
          margin: "30px 0 12px",
          color: "#0f172a",
          fontSize: "22px",
        }}
      >
        What does the result mean?
      </h3>

      <p
        style={{
          color: "#475569",
          fontSize: "16px",
          lineHeight: "1.8",
          margin: "0 0 18px",
        }}
      >
        If a result shows a number of years, months, and days, the years
        represent completed birthdays. The remaining months and days show
        the additional time since the last completed year.
      </p>

      <p
        style={{
          color: "#475569",
          fontSize: "16px",
          lineHeight: "1.8",
          margin: "0",
        }}
      >
        CALVORO also shows an estimated total number of days elapsed since
        the entered birth date. This can be useful when you want to compare
        an age using days rather than calendar years.
      </p>

      <h3
        style={{
          margin: "30px 0 12px",
          color: "#0f172a",
          fontSize: "22px",
        }}
      >
        Common reasons to calculate age
      </h3>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "14px",
          marginTop: "16px",
        }}
      >
        <div
          style={{
            padding: "18px",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
          }}
        >
          <strong style={{ color: "#0f172a" }}>
            Birthday planning
          </strong>
          <p
            style={{
              color: "#64748b",
              lineHeight: "1.7",
              margin: "8px 0 0",
            }}
          >
            Find the exact calendar age before a birthday or event.
          </p>
        </div>

        <div
          style={{
            padding: "18px",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
          }}
        >
          <strong style={{ color: "#0f172a" }}>
            Personal records
          </strong>
          <p
            style={{
              color: "#64748b",
              lineHeight: "1.7",
              margin: "8px 0 0",
            }}
          >
            Check an age precisely when a simple year count is not enough.
          </p>
        </div>

        <div
          style={{
            padding: "18px",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "14px",
          }}
        >
          <strong style={{ color: "#0f172a" }}>
            Date comparisons
          </strong>
          <p
            style={{
              color: "#64748b",
              lineHeight: "1.7",
              margin: "8px 0 0",
            }}
          >
            Understand how much time has passed between dates.
          </p>
        </div>
      </div>

      <h3
        style={{
          margin: "30px 0 12px",
          color: "#0f172a",
          fontSize: "22px",
        }}
      >
        Frequently asked questions
      </h3>

      <div
        style={{
          display: "grid",
          gap: "12px",
        }}
      >
        <details
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "15px 16px",
          }}
        >
          <summary
            style={{
              cursor: "pointer",
              fontWeight: "800",
              color: "#0f172a",
            }}
          >
            Does the calculator use my date of birth?
          </summary>

          <p
            style={{
              color: "#64748b",
              lineHeight: "1.7",
              margin: "10px 0 0",
            }}
          >
            Yes. Enter your date of birth and the calculator uses it to
            calculate the elapsed calendar time.
          </p>
        </details>

        <details
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "15px 16px",
          }}
        >
          <summary
            style={{
              cursor: "pointer",
              fontWeight: "800",
              color: "#0f172a",
            }}
          >
            Can I calculate my age in days?
          </summary>

          <p
            style={{
              color: "#64748b",
              lineHeight: "1.7",
              margin: "10px 0 0",
            }}
          >
            CALVORO displays a total-days figure in addition to years,
            months, and days.
          </p>
        </details>

        <details
          style={{
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "15px 16px",
          }}
        >
          <summary
            style={{
              cursor: "pointer",
              fontWeight: "800",
              color: "#0f172a",
            }}
          >
            Can I enter a future birth date?
          </summary>

          <p
            style={{
              color: "#64748b",
              lineHeight: "1.7",
              margin: "10px 0 0",
            }}
          >
            No. A birth date cannot be later than the current date.
          </p>
        </details>
      </div>
    </section>
  );
}