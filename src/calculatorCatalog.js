export const calculatorCategories = [
  "All",
  "Math",
  "Finance",
  "Business",
  "Date & Time",
  "Health",
  "Education",
  "Everyday",
  "Fitness",
];

export const featuredCalculatorPaths = [
  "/percentage",
  "/age",
  "/bmi",
  "/loan",
  "/emi",
  "/discount",
];

export const calculatorCatalog = [
  {
    name: "Percentage Calculator",
    path: "/percentage",
    category: "Math",
    description:
      "Find a percentage of a number, such as 18% of a bill or 25% of a score.",
    aliases: ["percent", "%", "discount percent", "exam score"],
  },
  {
    name: "Age Calculator",
    path: "/age",
    category: "Date & Time",
    description:
      "Count years, months, and days between a birth date and a chosen date.",
    aliases: ["birthday", "how old", "date of birth", "dob"],
  },
  {
    name: "BMI Calculator",
    path: "/bmi",
    category: "Health",
    description:
      "Calculate body mass index from height and weight, then see the standard category range.",
    aliases: ["body mass", "body mass index", "height weight"],
  },
  {
    name: "Loan Calculator",
    path: "/loan",
    category: "Finance",
    description:
      "Estimate a fixed monthly payment, total interest, and total repayment from amount, rate, and term.",
    aliases: ["monthly payment", "amortization", "borrow", "installment"],
  },
  {
    name: "EMI Calculator",
    path: "/emi",
    category: "Finance",
    description:
      "Estimate equated monthly installments for a loan using principal, annual rate, and tenure.",
    aliases: ["equated monthly installment", "monthly installment", "loan emi"],
  },
  {
    name: "Currency Converter",
    path: "/currency",
    category: "Finance",
    description:
      "Convert an amount from one currency to another using the rate shown in the tool.",
    aliases: ["exchange rate", "forex", "usd", "eur"],
  },
  {
    name: "Discount Calculator",
    path: "/discount",
    category: "Finance",
    description:
      "Work out sale price and money saved from an original price and discount percent.",
    aliases: ["sale", "markdown", "off", "coupon"],
  },
  {
    name: "Tip Calculator",
    path: "/tip",
    category: "Finance",
    description:
      "Calculate a tip amount and split the bill across a chosen number of people.",
    aliases: ["gratuity", "split bill", "restaurant", "service"],
  },
  {
    name: "Time Zone Converter",
    path: "/timezone",
    category: "Date & Time",
    description:
      "Convert a clock time from one time zone to another for meetings or travel.",
    aliases: ["tz", "utc", "gmt", "meeting time"],
  },
  {
    name: "GPA Calculator",
    path: "/gpa",
    category: "Education",
    description:
      "Combine course grades and credits into a grade point average on the scale the tool uses.",
    aliases: ["grade point", "grades", "credits", "semester gpa"],
  },
  {
    name: "Unit Converter",
    path: "/unit",
    category: "Math",
    description:
      "Convert common length, weight, volume, and other measurement units.",
    aliases: ["metric", "imperial", "kg", "cm", "miles"],
  },
  {
    name: "Fuel Cost Calculator",
    path: "/fuel-cost",
    category: "Everyday",
    description:
      "Estimate trip fuel use and cost from distance, efficiency, and fuel price.",
    aliases: ["gas", "petrol", "mileage", "trip cost"],
  },
  {
    name: "Mortgage Calculator",
    path: "/mortgage",
    category: "Finance",
    description:
      "Estimate a fixed-rate mortgage payment and total interest over the loan term.",
    aliases: ["home loan", "house payment", "principal", "amortization"],
  },
  {
    name: "Salary Calculator",
    path: "/salary",
    category: "Finance",
    description:
      "Convert a salary between annual, monthly, weekly, daily, and hourly amounts.",
    aliases: ["wage", "hourly", "paycheck", "annual pay"],
  },
  {
    name: "Compound Interest Calculator",
    path: "/compound-interest",
    category: "Finance",
    description:
      "Project how a balance can grow when interest is added on previously earned interest.",
    aliases: ["compounding", "investment growth", "apy", "interest"],
  },
  {
    name: "Tax Calculator",
    path: "/tax",
    category: "Finance",
    description:
      "Estimate a tax amount and after-tax figure from the rate and values you enter.",
    aliases: ["income tax", "after tax", "vat", "sales tax"],
  },
  {
    name: "Profit Margin Calculator",
    path: "/profit-margin",
    category: "Business",
    description:
      "Find profit, margin percentage, and markup from cost and selling price.",
    aliases: ["markup", "gross margin", "cost price"],
  },
  {
    name: "Break-Even Calculator",
    path: "/break-even",
    category: "Business",
    description:
      "Estimate how many units you need to sell to cover fixed and variable costs.",
    aliases: ["break even point", "units to sell", "fixed cost"],
  },
  {
    name: "ROI Calculator",
    path: "/roi",
    category: "Business",
    description:
      "Calculate return on investment from the amount invested and the gain or loss.",
    aliases: ["return on investment", "gain", "profit percent"],
  },
  {
    name: "Payback Period Calculator",
    path: "/payback-period",
    category: "Business",
    description:
      "Estimate how long it takes for an investment to recover its initial cost.",
    aliases: ["recovery time", "payback", "capital recovery"],
  },
  {
    name: "Investment Calculator",
    path: "/investment",
    category: "Finance",
    description:
      "Estimate how an invested amount may change over a chosen period and rate.",
    aliases: ["invest", "portfolio", "growth"],
  },
  {
    name: "Savings Calculator",
    path: "/savings",
    category: "Finance",
    description:
      "Project a future savings balance from starting amount, deposits, rate, and time.",
    aliases: ["saving", "deposit", "future balance"],
  },
  {
    name: "Inflation Calculator",
    path: "/inflation",
    category: "Finance",
    description:
      "Compare purchasing power between two years using an inflation rate you enter.",
    aliases: ["purchasing power", "cpi", "real value"],
  },
  {
    name: "Present Value Calculator",
    path: "/present-value",
    category: "Finance",
    description:
      "Discount a future amount back to what it is worth today at a chosen rate.",
    aliases: ["pv", "discounting", "time value of money"],
  },
  {
    name: "Future Value Calculator",
    path: "/future-value",
    category: "Finance",
    description:
      "Grow a present amount forward to an estimated future value at a chosen rate.",
    aliases: ["fv", "compound growth", "time value of money"],
  },
  {
    name: "Net Worth Calculator",
    path: "/net-worth",
    category: "Finance",
    description:
      "Subtract total liabilities from total assets to estimate net worth.",
    aliases: ["assets", "liabilities", "wealth", "balance sheet"],
  },
  {
    name: "Percentage Change Calculator",
    path: "/percentage-change",
    category: "Math",
    description:
      "Measure the percent increase or decrease between an original value and a new value.",
    aliases: ["percent increase", "percent decrease", "growth rate"],
  },
  {
    name: "Average Calculator",
    path: "/average",
    category: "Math",
    description:
      "Find the mean of a list of numbers, along with count, total, minimum, and maximum.",
    aliases: ["mean", "average", "list of numbers"],
  },
  {
    name: "Fraction Calculator",
    path: "/fraction",
    category: "Math",
    description:
      "Add, subtract, multiply, or divide two fractions and review the result.",
    aliases: ["numerator", "denominator", "mixed number"],
  },
  {
    name: "Ratio Calculator",
    path: "/ratio",
    category: "Math",
    description:
      "Simplify a ratio and split a total into proportional shares.",
    aliases: ["proportion", "parts", "share"],
  },
  {
    name: "Time Duration Calculator",
    path: "/time-duration",
    category: "Date & Time",
    description:
      "Measure hours and minutes between a start time and an end time.",
    aliases: ["elapsed time", "hours minutes", "shift length"],
  },
  {
    name: "Date Difference Calculator",
    path: "/date-difference",
    category: "Date & Time",
    description:
      "Count the days, weeks, or calendar span between two dates.",
    aliases: ["days between", "how many days", "date range"],
  },
  {
    name: "Speed Calculator",
    path: "/speed",
    category: "Everyday",
    description:
      "Find average speed from distance and time, or rearrange the same relationship.",
    aliases: ["km/h", "mph", "velocity"],
  },
  {
    name: "Distance Calculator",
    path: "/distance",
    category: "Everyday",
    description:
      "Estimate distance traveled from speed and elapsed time.",
    aliases: ["how far", "kilometers", "miles"],
  },
  {
    name: "Pace Calculator",
    path: "/pace",
    category: "Fitness",
    description:
      "Convert a distance and finish time into pace, such as minutes per kilometer or mile.",
    aliases: ["min/km", "min/mile", "split"],
  },
  {
    name: "Running Speed Calculator",
    path: "/running-speed",
    category: "Fitness",
    description:
      "Turn a run distance and time into average running speed.",
    aliases: ["run speed", "kph", "mph"],
  },
  {
    name: "Time to Run Calculator",
    path: "/time-to-run",
    category: "Fitness",
    description:
      "Estimate how long a distance takes if you hold a chosen running speed.",
    aliases: ["finish time", "race time", "duration at speed"],
  },
  {
    name: "Running Time Calculator",
    path: "/running-time",
    category: "Fitness",
    description:
      "Estimate running duration from distance and a chosen pace.",
    aliases: ["time from pace", "race duration"],
  },
  {
    name: "Running Pace Calculator",
    path: "/running-pace",
    category: "Fitness",
    description:
      "Find running pace per kilometer or mile from distance and time.",
    aliases: ["pace per km", "pace per mile"],
  },
];

export const extraDirectoryTools = [
  {
    name: "Math Solver",
    path: "/math-solver",
    category: "Math",
    description:
      "Work through typed math problems in the browser-based solver.",
    aliases: ["equation", "algebra", "solve"],
  },
  {
    name: "Image Math Solver",
    path: "/image-math-solver",
    category: "Math",
    description:
      "Read a math problem from an image and attempt a solution on your device.",
    aliases: ["ocr", "photo", "handwritten", "picture"],
  },
  {
    name: "AI Text Summarizer",
    path: "/ai-summarizer",
    category: "AI Tools",
    description:
      "Shorten long notes or articles into a shorter summary you can review.",
    aliases: ["summary", "tl;dr", "condense"],
  },
  {
    name: "AI Text Rewriter",
    path: "/ai-rewriter",
    category: "AI Tools",
    description:
      "Rewrite existing text in a different tone while keeping the meaning.",
    aliases: ["paraphrase", "rephrase"],
  },
  {
    name: "AI Grammar Checker",
    path: "/ai-grammar-checker",
    category: "AI Tools",
    description:
      "Check grammar, spelling, and punctuation in a passage of text.",
    aliases: ["spelling", "proofread", "punctuation"],
  },
  {
    name: "AI Text Translator",
    path: "/ai-translator",
    category: "AI Tools",
    description:
      "Translate a block of text into another language.",
    aliases: ["translate", "language"],
  },
  {
    name: "AI Text Generator",
    path: "/ai-text-generator",
    category: "AI Tools",
    description:
      "Draft text from a topic, content type, and writing tone.",
    aliases: ["write", "generate", "draft"],
  },
  {
    name: "AI Email Writer",
    path: "/ai-email-writer",
    category: "AI Tools",
    description:
      "Draft an email from a short description of what you need to say.",
    aliases: ["mail", "message", "professional email"],
  },
];

export const utilityCategories = [
  "PDF",
  "Image",
  "Text",
  "Developer",
  "Productivity",
  "Design",
];

export const utilityTools = [
  {
    name: "PDF Studio",
    path: "/pdf-studio",
    category: "PDF",
    description:
      "Merge, extract, rotate, reorder, number, and inspect PDF pages without uploading the file.",
    aliases: ["pdf", "merge pdf", "split pdf", "rotate", "page numbers", "metadata"],
    featured: true,
  },
  {
    name: "Image Studio",
    path: "/image-studio",
    category: "Image",
    description:
      "Resize, crop, optimize, inspect, and turn a PNG, JPEG, or WebP image into a PDF locally.",
    aliases: ["image", "resize", "crop", "compress", "webp", "image to pdf"],
    featured: true,
  },
  {
    name: "Word and Character Counter",
    path: "/word-counter",
    category: "Text",
    description:
      "Count words, characters, sentences, paragraphs, reading time, and repeated words as you type.",
    aliases: ["word count", "character count", "reading time", "letter count"],
    featured: true,
  },
  {
    name: "Text Comparison",
    path: "/text-compare",
    category: "Text",
    description:
      "Compare two versions line by line and see what was added, removed, or left unchanged.",
    aliases: ["diff", "compare text", "changes", "revision"],
  },
  {
    name: "Duplicate Line Remover",
    path: "/remove-duplicate-lines",
    category: "Text",
    description:
      "Remove repeated lines from a list while keeping the original order and optional blank lines.",
    aliases: ["deduplicate", "unique lines", "duplicates", "list cleaner"],
  },
  {
    name: "Text Cleanup",
    path: "/text-cleanup",
    category: "Text",
    description:
      "Trim line endings, collapse extra spaces, remove blank lines, and normalize pasted text.",
    aliases: ["clean text", "whitespace", "format text", "pasted text"],
  },
  {
    name: "Find and Replace",
    path: "/find-replace",
    category: "Text",
    description:
      "Replace words or patterns with case, whole-word, and regular-expression options.",
    aliases: ["search replace", "regex replace", "substitute"],
  },
  {
    name: "Line Sorter",
    path: "/line-sorter",
    category: "Text",
    description:
      "Sort lines alphabetically or numerically, remove duplicates, reverse the order, or shuffle.",
    aliases: ["sort list", "alphabetize", "numeric sort", "shuffle lines"],
  },
  {
    name: "QR Code Generator",
    path: "/qr-code-generator",
    category: "Developer",
    description:
      "Create a QR code from text or a URL and download it as a PNG or SVG.",
    aliases: ["qr", "qr code", "url code", "scan code"],
    featured: true,
  },
  {
    name: "Password Generator",
    path: "/password-generator",
    category: "Developer",
    description:
      "Generate random passwords with your chosen length, character sets, and entropy estimate.",
    aliases: ["password", "random password", "secure password", "passphrase"],
    featured: true,
  },
  {
    name: "UUID Generator",
    path: "/uuid-generator",
    category: "Developer",
    description:
      "Generate one or many random version 4 UUIDs and copy or download the list.",
    aliases: ["uuid", "guid", "identifier", "uuid v4"],
  },
  {
    name: "Pomodoro Timer",
    path: "/pomodoro-timer",
    category: "Productivity",
    description:
      "Run a focused work timer with short and long breaks, round tracking, and a local log.",
    aliases: ["pomodoro", "focus timer", "study timer", "break timer"],
    featured: true,
  },
  {
    name: "JSON Formatter and Validator",
    path: "/json-formatter",
    category: "Developer",
    description:
      "Format, minify, validate, and inspect JSON entirely in your browser.",
    aliases: ["json", "json formatter", "json validator", "pretty print"],
    featured: true,
  },
  {
    name: "CSV Viewer",
    path: "/csv-viewer",
    category: "Developer",
    description:
      "Open a CSV file, choose the delimiter, and preview rows in a readable table.",
    aliases: ["csv", "spreadsheet", "delimiter", "table viewer"],
  },
  {
    name: "Markdown Previewer",
    path: "/markdown-previewer",
    category: "Developer",
    description:
      "Write Markdown and see a safe rendered preview with headings, lists, links, and code.",
    aliases: ["markdown", "md preview", "readme", "markdown editor"],
  },
  {
    name: "Color Palette Generator",
    path: "/color-palette-generator",
    category: "Design",
    description:
      "Build harmonious color palettes, check any text and background pair against WCAG contrast levels, and copy hex values.",
    aliases: ["color", "palette", "hex", "contrast", "wcag", "accessibility", "design colors"],
  },
  {
    name: "Website Metadata Checker",
    path: "/website-metadata-checker",
    category: "Developer",
    description:
      "Inspect a public page's title, meta description, canonical URL, social preview tags, headings, and indexing hints.",
    aliases: [
      "metadata",
      "meta tags",
      "seo",
      "open graph",
      "twitter card",
      "canonical",
    ],
  },
  {
    name: "Multiplication Practice",
    path: "/multiplication-practice",
    category: "Education",
    description:
      "Practice times tables at your own pace with untimed questions, instant feedback, and clear strategies for facts that feel hard.",
    aliases: [
      "times tables",
      "multiplication facts",
      "times table practice",
      "math facts",
      "multiplication drill",
      "times tables quiz",
    ],
  },
  {
    name: "Vocabulary Flashcards",
    path: "/vocabulary-flashcards",
    category: "Education",
    description:
      "Study curated everyday, academic, and in-context word decks with reveal-and-review flashcards.",
    aliases: [
      "flashcards",
      "vocabulary practice",
      "word study",
      "academic vocabulary",
      "learn new words",
      "word cards",
    ],
  },
];

export const featuredUtilityTools = utilityTools.filter(
  (tool) => tool.featured
);

export const directoryCategories = [
  ...calculatorCategories,
  ...utilityCategories,
  "AI Tools",
];

export function matchesCatalogSearch(item, query) {
  const searchText = String(query || "").toLowerCase().trim();

  if (!searchText) {
    return true;
  }

  const haystack = [
    item.name,
    item.description,
    item.category,
    ...(item.aliases || []),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(searchText);
}
