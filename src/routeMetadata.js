import { utilityTools } from "./calculatorCatalog.js";
import { articles } from "./content/articles/index.js";

export const SITE_URL = "https://calvorotool.com";

export const DEFAULT_ROUTE_METADATA = Object.freeze({
  title: "CALVORO - Free Online Calculators",
  description:
    "CALVORO provides free online calculators and smart tools for everyday calculations.",
  type: "WebPage",
});

const coreRouteMetadata = {
  "/": {
    title: "CALVORO - Free Online Calculators & Smart Tools",
    description:
      "CALVORO provides free online calculators for finance, math, business, health, education, time, running, and everyday calculations.",
    type: "WebSite",
  },

  "/percentage": {
    title: "Percentage Calculator - Free Online Tool | CALVORO",
    description:
      "Calculate percentages quickly and accurately with CALVORO's free online percentage calculator.",
    type: "WebApplication",
  },

  "/age": {
    title: "Age Calculator - Calculate Your Exact Age | CALVORO",
    description:
      "Calculate your exact age in years, months, and days with CALVORO's free online age calculator.",
    type: "WebApplication",
  },

  "/bmi": {
    title: "BMI Calculator - Calculate Body Mass Index | CALVORO",
    description:
      "Calculate your Body Mass Index (BMI) quickly with CALVORO's free online BMI calculator.",
    type: "WebApplication",
  },

  "/loan": {
    title: "Loan Calculator - Calculate Monthly Loan Payments | CALVORO",
    description:
      "Calculate loan payments, interest, and repayment costs with CALVORO's free online loan calculator.",
    type: "WebApplication",
  },

  "/emi": {
    title: "EMI Calculator - Calculate Monthly EMI Payments | CALVORO",
    description:
      "Calculate your monthly EMI, total interest, and loan repayment with CALVORO's free EMI calculator.",
    type: "WebApplication",
  },

  "/currency": {
    title: "Currency Converter - Convert Currencies Online | CALVORO",
    description:
      "Convert currencies quickly with CALVORO's free online currency converter.",
    type: "WebApplication",
  },

  "/discount": {
    title: "Discount Calculator - Calculate Sale Prices & Savings | CALVORO",
    description:
      "Calculate discounts, sale prices, and savings easily with CALVORO's free discount calculator.",
    type: "WebApplication",
  },

  "/tip": {
    title: "Tip Calculator - Calculate Tips & Split Bills | CALVORO",
    description:
      "Calculate tips and split restaurant bills quickly with CALVORO's free online tip calculator.",
    type: "WebApplication",
  },

  "/timezone": {
    title: "Time Zone Converter - Convert Time Zones | CALVORO",
    description:
      "Convert time between different time zones with CALVORO's free online time zone converter.",
    type: "WebApplication",
  },

  "/gpa": {
    title: "GPA Calculator - Calculate Your Grade Point Average | CALVORO",
    description:
      "Calculate your GPA quickly and easily with CALVORO's free online GPA calculator.",
    type: "WebApplication",
  },

  "/unit": {
    title: "Unit Converter - Convert Units Online | CALVORO",
    description:
      "Convert common units quickly with CALVORO's free online unit converter.",
    type: "WebApplication",
  },

  "/fuel-cost": {
    title: "Fuel Cost Calculator - Calculate Fuel Expenses | CALVORO",
    description:
      "Calculate fuel costs, fuel expenses, and travel costs with CALVORO's free fuel cost calculator.",
    type: "WebApplication",
  },

  "/mortgage": {
    title:
      "Mortgage Calculator - Calculate Monthly Mortgage Payments | CALVORO",
    description:
      "Calculate monthly mortgage payments, interest, and total costs with CALVORO's free mortgage calculator.",
    type: "WebApplication",
  },

  "/salary": {
    title: "Salary Calculator - Calculate Hourly & Monthly Salary | CALVORO",
    description:
      "Convert salary between annual, monthly, weekly, daily, and hourly amounts with CALVORO's salary calculator.",
    type: "WebApplication",
  },

  "/compound-interest": {
    title:
      "Compound Interest Calculator - Calculate Investment Growth | CALVORO",
    description:
      "Calculate compound interest and investment growth with CALVORO's free compound interest calculator.",
    type: "WebApplication",
  },

  "/tax": {
    title: "Tax Calculator - Calculate Tax & After-Tax Income | CALVORO",
    description:
      "Calculate tax amounts and after-tax income with CALVORO's free online tax calculator.",
    type: "WebApplication",
  },

  "/profit-margin": {
    title: "Profit Margin Calculator - Calculate Profit & Margin | CALVORO",
    description:
      "Calculate profit, profit margin, and markup with CALVORO's free profit margin calculator.",
    type: "WebApplication",
  },

  "/break-even": {
    title: "Break-Even Calculator - Calculate Break-Even Point | CALVORO",
    description:
      "Calculate your break-even point and required sales volume with CALVORO's free calculator.",
    type: "WebApplication",
  },

  "/roi": {
    title: "ROI Calculator - Calculate Return on Investment | CALVORO",
    description:
      "Calculate return on investment, profit, and investment performance with CALVORO's free ROI calculator.",
    type: "WebApplication",
  },

  "/payback-period": {
    title:
      "Payback Period Calculator - Calculate Investment Payback | CALVORO",
    description:
      "Calculate how long it takes to recover an investment with CALVORO's free payback period calculator.",
    type: "WebApplication",
  },

  "/investment": {
    title: "Investment Calculator - Calculate Investment Growth | CALVORO",
    description:
      "Estimate investment growth and future value with CALVORO's free online investment calculator.",
    type: "WebApplication",
  },

  "/savings": {
    title: "Savings Calculator - Calculate Future Savings | CALVORO",
    description:
      "Calculate how your savings can grow over time with CALVORO's free savings calculator.",
    type: "WebApplication",
  },

  "/inflation": {
    title:
      "Inflation Calculator - Calculate Inflation & Purchasing Power | CALVORO",
    description:
      "Calculate the effect of inflation on money and purchasing power with CALVORO's inflation calculator.",
    type: "WebApplication",
  },

  "/present-value": {
    title: "Present Value Calculator - Calculate Present Value | CALVORO",
    description:
      "Calculate the present value of future money with CALVORO's free present value calculator.",
    type: "WebApplication",
  },

  "/future-value": {
    title: "Future Value Calculator - Calculate Future Value | CALVORO",
    description:
      "Calculate the future value of money and investments with CALVORO's free future value calculator.",
    type: "WebApplication",
  },

  "/net-worth": {
    title: "Net Worth Calculator - Calculate Your Net Worth | CALVORO",
    description:
      "Calculate your net worth by comparing total assets and liabilities with CALVORO's free calculator.",
    type: "WebApplication",
  },

  "/percentage-change": {
    title:
      "Percentage Change Calculator - Calculate Percentage Change | CALVORO",
    description:
      "Calculate percentage increase or decrease between two numbers with CALVORO's free calculator.",
    type: "WebApplication",
  },

  "/average": {
    title: "Average Calculator - Calculate Mean & Average | CALVORO",
    description:
      "Calculate the average, total, count, minimum, and maximum of numbers with CALVORO's free average calculator.",
    type: "WebApplication",
  },

  "/fraction": {
    title:
      "Fraction Calculator - Add, Subtract & Calculate Fractions | CALVORO",
    description:
      "Calculate fractions and perform fraction operations with CALVORO's free fraction calculator.",
    type: "WebApplication",
  },

  "/ratio": {
    title: "Ratio Calculator - Simplify Ratios & Calculate Shares | CALVORO",
    description:
      "Simplify ratios and calculate proportional shares with CALVORO's free ratio calculator.",
    type: "WebApplication",
  },

  "/time-duration": {
    title: "Time Duration Calculator - Calculate Time Difference | CALVORO",
    description:
      "Calculate the duration between two times in hours and minutes with CALVORO's free time duration calculator.",
    type: "WebApplication",
  },

  "/date-difference": {
    title: "Date Difference Calculator - Calculate Days Between Dates | CALVORO",
    description:
      "Calculate the exact difference between two dates with CALVORO's free date difference calculator.",
    type: "WebApplication",
  },

  "/speed": {
    title: "Speed Calculator - Calculate Speed, Distance & Time | CALVORO",
    description:
      "Calculate speed, distance, and travel time with CALVORO's free online speed calculator.",
    type: "WebApplication",
  },

  "/distance": {
    title: "Distance Calculator - Calculate Distance, Speed & Time | CALVORO",
    description:
      "Calculate distance using speed and time with CALVORO's free distance calculator.",
    type: "WebApplication",
  },

  "/pace": {
    title: "Pace Calculator - Calculate Running Pace | CALVORO",
    description:
      "Calculate running pace, speed, and time per kilometer or mile with CALVORO's free pace calculator.",
    type: "WebApplication",
  },

  "/running-speed": {
    title: "Running Speed Calculator - Calculate Running Speed | CALVORO",
    description:
      "Calculate running speed from distance and time with CALVORO's free running speed calculator.",
    type: "WebApplication",
  },

  "/time-to-run": {
    title: "Time to Run Calculator - Calculate Running Time | CALVORO",
    description:
      "Calculate how long it will take to run a distance at a specific speed with CALVORO's free calculator.",
    type: "WebApplication",
  },

  "/running-time": {
    title: "Running Time Calculator - Calculate Running Duration | CALVORO",
    description:
      "Calculate running time from distance and pace with CALVORO's free running time calculator.",
    type: "WebApplication",
  },

  "/running-pace": {
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

  "/tools": {
    title:
      "All CALVORO Tools - Calculators, PDF, Image, Text and Developer Tools",
    description:
      "Browse CALVORO calculators plus browser-based PDF, image, text, developer and productivity tools. Search by task and filter by category.",
    type: "WebPage",
  },

  "/blog": {
    title: "CALVORO Journal - Practical Guides for Everyday Numbers",
    description:
      "Browse original CALVORO guides about percentages, loans, health, education, time, business, productivity and everyday browser tools.",
    type: "WebPage",
  },
};

const aiMathRouteMetadata = {
  "/ai-summarizer": {
    title: "AI Text Summarizer - Free Online Tool | CALVORO",
    description:
      "Turn long text into a clear summary using CALVORO AI. Paste an article, notes, or report to create a shorter version focused on the main ideas.",
    type: "WebApplication",
  },

  "/ai-rewriter": {
    title: "AI Text Rewriter - Free Online Tool | CALVORO",
    description:
      "Rewrite your text with CALVORO AI and make it clearer, smoother and easier to read while keeping the original idea and meaning.",
    type: "WebApplication",
  },

  "/ai-grammar-checker": {
    title: "AI Grammar Checker - Free Online Tool | CALVORO",
    description:
      "Check grammar, spelling, punctuation and sentence clarity with the free CALVORO AI Grammar Checker.",
    type: "WebApplication",
  },

  "/ai-translator": {
    title: "AI Translator - Free Online Translation Tool | CALVORO",
    description:
      "Translate text into another language with the free CALVORO AI Translator.",
    type: "WebApplication",
  },

  "/ai-text-generator": {
    title: "AI Text Generator - Free Online Tool | CALVORO",
    description:
      "Generate useful text from a topic with the free CALVORO AI Text Generator.",
    type: "WebApplication",
  },

  "/ai-email-writer": {
    title: "AI Email Writer - Free Online Tool | CALVORO",
    description:
      "Create clear and professional emails from a simple description of what you want to say with CALVORO AI.",
    type: "WebApplication",
  },

  "/math-solver": {
    title: "Math Solver - Solve Math Expressions Online | CALVORO",
    description:
      "Solve math expressions and percentage calculations instantly with the free CALVORO Math Solver.",
    type: "WebApplication",
  },

  "/image-math-solver": {
    title: "Image Math Solver - Solve Math Problems from Images | CALVORO",
    description:
      "Upload an image containing math problems and solve each problem separately with the free CALVORO Image Math Solver.",
    type: "WebApplication",
  },
};

const utilityRouteMetadata = utilityTools.map((tool) => ({
  path: tool.path,
  title: `${tool.name} - Free Online Tool | CALVORO`,
  description: tool.description,
  type: "WebApplication",
}));

const articleRouteMetadata = articles.map((article) => ({
  path: `/blog/${article.slug}`,
  title: `${article.title} | CALVORO Journal`,
  description: article.excerpt,
  type: "article",
}));

const allRouteMetadata = [
  ...Object.entries(coreRouteMetadata).map(([path, metadata]) => ({
    path,
    ...metadata,
  })),
  ...Object.entries(aiMathRouteMetadata).map(([path, metadata]) => ({
    path,
    ...metadata,
  })),
  ...utilityRouteMetadata,
  ...articleRouteMetadata,
];

const routeMetadataByPath = new Map();

for (const metadata of allRouteMetadata) {
  if (routeMetadataByPath.has(metadata.path)) {
    throw new Error(
      `Duplicate route metadata path: ${metadata.path}`
    );
  }

  routeMetadataByPath.set(metadata.path, Object.freeze(metadata));
}

export const routeInventory = Object.freeze(
  [...routeMetadataByPath.values()].sort((a, b) =>
    a.path.localeCompare(b.path)
  )
);

function normalizePath(pathname) {
  const rawPath = String(pathname || "/").split(/[?#]/)[0];

  if (!rawPath || rawPath === "/") {
    return "/";
  }

  const withLeadingSlash = rawPath.startsWith("/")
    ? rawPath
    : `/${rawPath}`;

  return withLeadingSlash.replace(/\/+$/, "") || "/";
}

export function getRouteMetadata(pathname) {
  return (
    routeMetadataByPath.get(normalizePath(pathname)) ||
    DEFAULT_ROUTE_METADATA
  );
}

export function canonicalUrlForPath(pathname) {
  const path = normalizePath(pathname);

  return path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path}`;
}
