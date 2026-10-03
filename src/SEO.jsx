import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SITE_URL = "https://calvorotool.com";

const seoData = {
  "/": {
    title: "CALVORO - Free Online Calculators & Smart Tools",
    description:
      "CALVORO provides free online calculators for finance, math, business, health, education, time, running, and everyday calculations.",
    type: "WebSite",
  },

  "/percentage-calculator": {
    title: "Percentage Calculator - Free Online Tool | CALVORO",
    description:
      "Calculate percentages quickly and accurately with CALVORO's free online percentage calculator.",
    type: "WebApplication",
  },

  "/age-calculator": {
    title: "Age Calculator - Calculate Your Exact Age | CALVORO",
    description:
      "Calculate your exact age in years, months, and days with CALVORO's free online age calculator.",
    type: "WebApplication",
  },

  "/bmi-calculator": {
    title: "BMI Calculator - Calculate Body Mass Index | CALVORO",
    description:
      "Calculate your Body Mass Index (BMI) quickly with CALVORO's free online BMI calculator.",
    type: "WebApplication",
  },

  "/loan-calculator": {
    title: "Loan Calculator - Calculate Monthly Loan Payments | CALVORO",
    description:
      "Calculate loan payments, interest, and repayment costs with CALVORO's free online loan calculator.",
    type: "WebApplication",
  },

  "/emi-calculator": {
    title: "EMI Calculator - Calculate Monthly EMI Payments | CALVORO",
    description:
      "Calculate your monthly EMI, total interest, and loan repayment with CALVORO's free EMI calculator.",
    type: "WebApplication",
  },

  "/currency-converter": {
    title: "Currency Converter - Convert Currencies Online | CALVORO",
    description:
      "Convert currencies quickly with CALVORO's free online currency converter.",
    type: "WebApplication",
  },

  "/discount-calculator": {
    title: "Discount Calculator - Calculate Sale Prices & Savings | CALVORO",
    description:
      "Calculate discounts, sale prices, and savings easily with CALVORO's free discount calculator.",
    type: "WebApplication",
  },

  "/tip-calculator": {
    title: "Tip Calculator - Calculate Tips & Split Bills | CALVORO",
    description:
      "Calculate tips and split restaurant bills quickly with CALVORO's free online tip calculator.",
    type: "WebApplication",
  },

  "/timezone-converter": {
    title: "Time Zone Converter - Convert Time Zones | CALVORO",
    description:
      "Convert time between different time zones with CALVORO's free online time zone converter.",
    type: "WebApplication",
  },

  "/gpa-calculator": {
    title: "GPA Calculator - Calculate Your Grade Point Average | CALVORO",
    description:
      "Calculate your GPA quickly and easily with CALVORO's free online GPA calculator.",
    type: "WebApplication",
  },

  "/unit-converter": {
    title: "Unit Converter - Convert Units Online | CALVORO",
    description:
      "Convert common units quickly with CALVORO's free online unit converter.",
    type: "WebApplication",
  },

  "/fuel-cost-calculator": {
    title: "Fuel Cost Calculator - Calculate Fuel Expenses | CALVORO",
    description:
      "Calculate fuel costs, fuel expenses, and travel costs with CALVORO's free fuel cost calculator.",
    type: "WebApplication",
  },

  "/mortgage-calculator": {
    title: "Mortgage Calculator - Calculate Monthly Mortgage Payments | CALVORO",
    description:
      "Calculate monthly mortgage payments, interest, and total costs with CALVORO's free mortgage calculator.",
    type: "WebApplication",
  },

  "/salary-calculator": {
    title: "Salary Calculator - Calculate Hourly & Monthly Salary | CALVORO",
    description:
      "Convert salary between annual, monthly, weekly, daily, and hourly amounts with CALVORO's salary calculator.",
    type: "WebApplication",
  },

  "/compound-interest-calculator": {
    title: "Compound Interest Calculator - Calculate Investment Growth | CALVORO",
    description:
      "Calculate compound interest and investment growth with CALVORO's free compound interest calculator.",
    type: "WebApplication",
  },

  "/tax-calculator": {
    title: "Tax Calculator - Calculate Tax & After-Tax Income | CALVORO",
    description:
      "Calculate tax amounts and after-tax income with CALVORO's free online tax calculator.",
    type: "WebApplication",
  },

  "/profit-margin-calculator": {
    title: "Profit Margin Calculator - Calculate Profit & Margin | CALVORO",
    description:
      "Calculate profit, profit margin, and markup with CALVORO's free profit margin calculator.",
    type: "WebApplication",
  },

  "/break-even-calculator": {
    title: "Break-Even Calculator - Calculate Break-Even Point | CALVORO",
    description:
      "Calculate your break-even point and required sales volume with CALVORO's free calculator.",
    type: "WebApplication",
  },

  "/roi-calculator": {
    title: "ROI Calculator - Calculate Return on Investment | CALVORO",
    description:
      "Calculate return on investment, profit, and investment performance with CALVORO's free ROI calculator.",
    type: "WebApplication",
  },

  "/payback-period-calculator": {
    title: "Payback Period Calculator - Calculate Investment Payback | CALVORO",
    description:
      "Calculate how long it takes to recover an investment with CALVORO's free payback period calculator.",
    type: "WebApplication",
  },

  "/investment-calculator": {
    title: "Investment Calculator - Calculate Investment Growth | CALVORO",
    description:
      "Estimate investment growth and future value with CALVORO's free online investment calculator.",
    type: "WebApplication",
  },

  "/savings-calculator": {
    title: "Savings Calculator - Calculate Future Savings | CALVORO",
    description:
      "Calculate how your savings can grow over time with CALVORO's free savings calculator.",
    type: "WebApplication",
  },

  "/inflation-calculator": {
    title:
      "Inflation Calculator - Calculate Inflation & Purchasing Power | CALVORO",
    description:
      "Calculate the effect of inflation on money and purchasing power with CALVORO's inflation calculator.",
    type: "WebApplication",
  },

  "/present-value-calculator": {
    title: "Present Value Calculator - Calculate Present Value | CALVORO",
    description:
      "Calculate the present value of future money with CALVORO's free present value calculator.",
    type: "WebApplication",
  },

  "/future-value-calculator": {
    title: "Future Value Calculator - Calculate Future Value | CALVORO",
    description:
      "Calculate the future value of money and investments with CALVORO's free future value calculator.",
    type: "WebApplication",
  },

  "/net-worth-calculator": {
    title: "Net Worth Calculator - Calculate Your Net Worth | CALVORO",
    description:
      "Calculate your net worth by comparing total assets and liabilities with CALVORO's free calculator.",
    type: "WebApplication",
  },

  "/percentage-change-calculator": {
    title:
      "Percentage Change Calculator - Calculate Percentage Change | CALVORO",
    description:
      "Calculate percentage increase or decrease between two numbers with CALVORO's free calculator.",
    type: "WebApplication",
  },

  "/average-calculator": {
    title: "Average Calculator - Calculate Mean & Average | CALVORO",
    description:
      "Calculate the average, total, count, minimum, and maximum of numbers with CALVORO's free average calculator.",
    type: "WebApplication",
  },

  "/fraction-calculator": {
    title: "Fraction Calculator - Add, Subtract & Calculate Fractions | CALVORO",
    description:
      "Calculate fractions and perform fraction operations with CALVORO's free fraction calculator.",
    type: "WebApplication",
  },

  "/ratio-calculator": {
    title: "Ratio Calculator - Simplify Ratios & Calculate Shares | CALVORO",
    description:
      "Simplify ratios and calculate proportional shares with CALVORO's free ratio calculator.",
    type: "WebApplication",
  },

  "/time-duration-calculator": {
    title: "Time Duration Calculator - Calculate Time Difference | CALVORO",
    description:
      "Calculate the duration between two times in hours and minutes with CALVORO's free time duration calculator.",
    type: "WebApplication",
  },

  "/date-difference-calculator": {
    title: "Date Difference Calculator - Calculate Days Between Dates | CALVORO",
    description:
      "Calculate the exact difference between two dates with CALVORO's free date difference calculator.",
    type: "WebApplication",
  },

  "/speed-calculator": {
    title: "Speed Calculator - Calculate Speed, Distance & Time | CALVORO",
    description:
      "Calculate speed, distance, and travel time with CALVORO's free online speed calculator.",
    type: "WebApplication",
  },

  "/distance-calculator": {
    title: "Distance Calculator - Calculate Distance, Speed & Time | CALVORO",
    description:
      "Calculate distance using speed and time with CALVORO's free distance calculator.",
    type: "WebApplication",
  },

  "/pace-calculator": {
    title: "Pace Calculator - Calculate Running Pace | CALVORO",
    description:
      "Calculate running pace, speed, and time per kilometer or mile with CALVORO's free pace calculator.",
    type: "WebApplication",
  },

  "/running-speed-calculator": {
    title: "Running Speed Calculator - Calculate Running Speed | CALVORO",
    description:
      "Calculate running speed from distance and time with CALVORO's free running speed calculator.",
    type: "WebApplication",
  },

  "/time-to-run-calculator": {
    title: "Time to Run Calculator - Calculate Running Time | CALVORO",
    description:
      "Calculate how long it will take to run a distance at a specific speed with CALVORO's free calculator.",
    type: "WebApplication",
  },

  "/running-time-calculator": {
    title: "Running Time Calculator - Calculate Running Duration | CALVORO",
    description:
      "Calculate running time from distance and pace with CALVORO's free running time calculator.",
    type: "WebApplication",
  },

  "/running-pace-calculator": {
    title: "Running Pace Calculator - Calculate Pace per Kilometer | CALVORO",
    description:
      "Calculate running pace, running speed, and pace per kilometer or mile with CALVORO's free calculator.",
    type: "WebApplication",
  },

  "/about": {
    title: "About CALVORO - Free Online Calculators",
    description:
      "Learn about CALVORO and our mission to provide simple, accurate, and free online calculators and smart tools.",
    type: "WebPage",
  },

  "/contact": {
    title: "Contact CALVORO - Get in Touch",
    description:
      "Contact the CALVORO team for questions, feedback, suggestions, or calculator-related support.",
    type: "WebPage",
  },

  "/privacy-policy": {
    title: "Privacy Policy - CALVORO",
    description:
      "Read the CALVORO privacy policy to learn how information, cookies, advertising, and calculator data are handled.",
    type: "WebPage",
  },

  "/terms": {
    title: "Terms & Conditions - CALVORO",
    description:
      "Read the CALVORO Terms and Conditions for information about website use, calculators, advertising, and limitations.",
    type: "WebPage",
  },
};

const defaultSEO = {
  title: "CALVORO - Free Online Calculators",
  description:
    "CALVORO provides free online calculators and smart tools for everyday calculations.",
  type: "WebPage",
};

function setMeta(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function setProperty(property, content) {
  let tag = document.querySelector(
    `meta[property="${property}"]`
  );

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function setCanonical(url) {
  let canonical = document.querySelector(
    'link[rel="canonical"]'
  );

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }

  canonical.setAttribute("href", url);
}

function setStructuredData(data) {
  let script = document.getElementById(
    "calvoro-structured-data"
  );

  if (!script) {
    script = document.createElement("script");
    script.id = "calvoro-structured-data";
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}

export default function SEO() {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname || "/";

    const seo = seoData[path] || defaultSEO;

    const cleanPath =
      path === "/"
        ? ""
        : path.replace(/\/+$/, "");

    const canonicalURL =
      `${SITE_URL}${cleanPath}`;

    document.title = seo.title;

    setMeta(
      "description",
      seo.description
    );

    setCanonical(canonicalURL);

    setProperty(
      "og:title",
      seo.title
    );

    setProperty(
      "og:description",
      seo.description
    );

    setProperty(
      "og:url",
      canonicalURL
    );

    setProperty(
      "og:type",
      "website"
    );

    setProperty(
      "og:site_name",
      "CALVORO"
    );

    setMeta(
      "twitter:card",
      "summary"
    );

    setMeta(
      "twitter:title",
      seo.title
    );

    setMeta(
      "twitter:description",
      seo.description
    );

    const structuredData =
      seo.type === "WebApplication"
        ? {
            "@context":
              "https://schema.org",
            "@type":
              "WebApplication",
            name:
              seo.title,
            description:
              seo.description,
            url:
              canonicalURL,
            applicationCategory:
              "UtilitiesApplication",
            operatingSystem:
              "All",
            isAccessibleForFree:
              true,
            publisher: {
              "@type":
                "Organization",
              name:
                "CALVORO",
            },
          }
        : {
            "@context":
              "https://schema.org",
            "@type":
              seo.type,
            name:
              seo.title,
            description:
              seo.description,
            url:
              canonicalURL,
            publisher: {
              "@type":
                "Organization",
              name:
                "CALVORO",
            },
          };

    setStructuredData(
      structuredData
    );
  }, [location.pathname]);

  return null;
}