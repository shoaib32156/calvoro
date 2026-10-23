export const businessArticles = [
  {
    slug: "break-even-point-explained",
    title: "Break-Even Point Explained",
    category: "Business",
    date: "2026-10-04",
    excerpt:
      "Find the sales volume or revenue where costs and income meet, using contribution margin, with worked examples and a look at practical limits.",
    tool: { name: "Break-Even Calculator", path: "/break-even" },
    takeaways: [
      "Break-even is the sales level at which total revenue equals total costs.",
      "The unit formula is fixed costs divided by the contribution margin per unit.",
      "Target profit can be added to fixed costs to find the volume needed to reach it.",
    ],
    sections: [
      {
        heading: "The Point Where Profit Is Zero",
        paragraphs: [
          "Break-even is the sales level at which total revenue equals total costs. At that point the business makes neither a profit nor a loss. Selling more moves it into profit; selling less leaves a shortfall.",
          "Break-even is a planning measure, not a promise. It assumes a known selling price, known costs, and a constant mix of products. When those assumptions change, the break-even point changes too.",
        ],
        formula:
          "Break-even units = Fixed costs ÷ (Price per unit − Variable cost per unit)",
      },
      {
        heading: "Separate Fixed and Variable Costs",
        paragraphs: [
          "Fixed costs do not change with the number of units sold in the short run. Rent, salaried staff, insurance, and software subscriptions are common examples. Variable costs rise with each unit: materials, packaging, payment fees, and hourly production labour.",
          "Some costs are mixed. A utility bill may have a standing charge plus a charge per unit used. Split the mixed cost into its fixed and variable portions, or treat it conservatively and explain the assumption.",
        ],
        list: [
          "Fixed: rent, insurance, salaried staff.",
          "Variable: materials, packaging, transaction fees.",
          "Mixed: utilities with a standing charge.",
          "Time period matters: more costs become variable in the long run.",
        ],
      },
      {
        heading: "Contribution Margin",
        paragraphs: [
          "The difference between the selling price and the variable cost per unit is the contribution margin per unit. It is the amount each sale contributes toward covering fixed costs and, after that, toward profit.",
          "If an item sells for 30 and has variable costs of 18, the contribution is 12 per unit. Fixed costs of 12,000 divided by 12 give a break-even volume of 1,000 units. Revenue at that point is 1,000 × 30 = 30,000.",
        ],
        example: {
          title: "Example: a product with fixed costs of 12,000",
          lines: [
            "Price: 30 per unit.",
            "Variable cost: 18 per unit.",
            "Contribution: 30 − 18 = 12 per unit.",
            "Break-even: 12,000 ÷ 12 = 1,000 units.",
          ],
        },
      },
      {
        heading: "Break-Even in Revenue",
        paragraphs: [
          "The contribution margin ratio expresses contribution as a percentage of price. Here it is 12 ÷ 30 = 0.40, or 40%. Break-even revenue is fixed costs divided by that ratio: 12,000 ÷ 0.40 = 30,000, matching the unit calculation.",
          "The revenue form is useful when a business sells a mix of products and an average contribution ratio is more practical than a single unit price. The average must reflect the actual sales mix, not an ideal one.",
        ],
        formula: "Break-even revenue = Fixed costs ÷ Contribution margin ratio",
        note:
          "Use the same period for costs and revenue. Mixing a monthly fixed cost with annual revenue produces a break-even figure that has no useful meaning.",
      },
      {
        heading: "Break-Even with a Target Profit",
        paragraphs: [
          "To find the volume needed for a target profit, add the target to fixed costs before dividing by contribution. For a target profit of 3,000, the calculation is (12,000 + 3,000) ÷ 12 = 1,250 units.",
          "This is a planning calculation, not a forecast. It shows what must be sold if the price, cost, and mix hold, and it makes the size of the required sales effort visible.",
        ],
        example: {
          title: "Example: targeting 3,000 of profit",
          lines: [
            "Fixed costs plus target: 12,000 + 3,000 = 15,000.",
            "Required units: 15,000 ÷ 12 = 1,250.",
            "Required revenue: 1,250 × 30 = 37,500.",
          ],
        },
      },
      {
        heading: "Limits and Checks",
        paragraphs: [
          "Break-even assumes that variable cost per unit and price stay constant. In reality, discounts, bulk material prices, overtime, and capacity limits can change both. A break-even figure is a snapshot under stated assumptions.",
          "Check that fixed costs do not step up before the break-even volume. If reaching 1,000 units requires a second shift or extra space, fixed costs rise and the calculation must be repeated.",
        ],
        list: [
          "State the period and the assumptions.",
          "Keep fixed and variable costs separate.",
          "Check for capacity limits and step costs.",
          "Recalculate when price or cost changes.",
          "Remember that break-even is not the same as cash flow.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the break-even formula?",
        answer:
          "Divide fixed costs by the difference between price and variable cost per unit. The result is the number of units that must be sold for profit to be zero.",
      },
      {
        question: "Can I include a target profit in the calculation?",
        answer:
          "Yes. Add the target profit to fixed costs, then divide by the contribution margin per unit. This gives the volume needed to reach that profit, not just to break even.",
      },
      {
        question: "What if contribution margin is negative?",
        answer:
          "If variable cost is higher than price, each sale adds to the loss and there is no break-even volume at that price. The price or cost structure needs to change first.",
      },
    ],
  },
  {
    slug: "markup-vs-margin",
    title: "Markup vs Margin: What Is the Difference?",
    category: "Business",
    date: "2026-10-08",
    excerpt:
      "Compare markup and margin, convert one measure into the other, and avoid the common pricing mistake that quietly shrinks your profit percentage.",
    tool: { name: "Profit Margin Calculator", path: "/profit-margin" },
    takeaways: [
      "Margin compares profit with price; markup compares profit with cost.",
      "For the same sale, markup is always the larger percentage when profit is positive.",
      "To hit a target margin, divide cost by one minus the margin instead of adding the margin to cost.",
    ],
    sections: [
      {
        heading: "Same Sale, Different Denominator",
        paragraphs: [
          "Markup and margin describe the same profit but compare it with different numbers. Margin compares profit with the selling price. Markup compares profit with the cost.",
          "A sale of 100 with a cost of 60 produces 40 of profit. As a margin, 40 ÷ 100 = 40%. As a markup, 40 ÷ 60 = 66.7%. Both are correct, and they answer different questions.",
        ],
        formula: "Profit = Price − Cost",
      },
      {
        heading: "Calculating Margin",
        paragraphs: [
          "Margin shows how much of each sales dollar remains after the cost of the item. It is the figure used in profitability analysis, because revenue is the base against which the profit is measured.",
          "A 25% margin means 25% of the price is gross profit and 75% covers cost. If an item sells for 80, the profit is 20 and the cost is 60.",
        ],
        formula: "Margin (%) = ((Price − Cost) ÷ Price) × 100",
        example: {
          title: "Example: price 80, cost 60",
          lines: [
            "Profit: 80 − 60 = 20.",
            "Margin: 20 ÷ 80 = 0.25.",
            "As a percentage: 0.25 × 100 = 25%.",
          ],
        },
      },
      {
        heading: "Calculating Markup",
        paragraphs: [
          "Markup shows how much is added to cost to arrive at the price. It is the natural measure when you start with a cost and need to set a price.",
          "A 25% markup on a cost of 60 adds 15, producing a price of 75 and a profit of 15. The margin on that sale is 15 ÷ 75 = 20%, not 25%.",
        ],
        formula: "Markup (%) = ((Price − Cost) ÷ Cost) × 100",
        example: {
          title: "Example: cost 60 with a 25% markup",
          lines: [
            "Markup amount: 0.25 × 60 = 15.",
            "Price: 60 + 15 = 75.",
            "Margin: 15 ÷ 75 = 20%.",
          ],
        },
      },
      {
        heading: "Converting One to the Other",
        paragraphs: [
          "Because both measures use the same profit, you can convert between them. Markup = margin ÷ (1 − margin). Margin = markup ÷ (1 + markup).",
          "A 40% margin corresponds to a 66.7% markup. A 50% markup corresponds to a 33.3% margin. The conversion is not a matter of adding or subtracting a fixed number.",
        ],
        formula:
          "Markup = Margin ÷ (1 − Margin); Margin = Markup ÷ (1 + Markup)",
        example: {
          title: "Example: converting both ways",
          lines: [
            "Margin 40%: markup = 0.40 ÷ 0.60 = 66.7%.",
            "Markup 50%: margin = 0.50 ÷ 1.50 = 33.3%.",
            "Both pairs can describe the same price and cost.",
          ],
        },
      },
      {
        heading: "The Pricing Mistake",
        paragraphs: [
          "A common mistake is to add the desired margin as a markup. If a 40% margin is needed and 40% is added to a cost of 60, the price becomes 84. The profit is 24, and the margin is 24 ÷ 84 = 28.6%, well below the target.",
          "To achieve a 40% margin from a cost of 60, divide the cost by (1 − 0.40): 60 ÷ 0.60 = 100. The profit is 40, which is 40% of the price.",
        ],
        example: {
          title: "Example: pricing for a 40% margin",
          lines: [
            "Cost: 60; target margin: 40%.",
            "Price: 60 ÷ (1 − 0.40) = 100.",
            "Profit: 100 − 60 = 40.",
            "Margin check: 40 ÷ 100 = 40%.",
          ],
        },
      },
      {
        heading: "Which Number Should You Use?",
        paragraphs: [
          "Use margin when comparing profitability across products, because it is based on revenue and scales with sales. Use markup when setting a price from a known cost or when a supplier quotes cost-based pricing.",
          "Whichever you use, label it clearly. A claim of 40% profit is ambiguous until you say whether it is margin or markup. In a quote or a price list, the difference can change the price by a large amount.",
        ],
        list: [
          "State the basis: margin or markup.",
          "Use margin for profitability comparisons.",
          "Use markup for cost-based price setting.",
          "Check the result against the target margin.",
        ],
      },
    ],
    faq: [
      {
        question: "Is markup always higher than margin?",
        answer:
          "Yes, when profit is positive and the cost is below the price. Markup divides by the smaller cost figure, while margin divides by the larger price figure.",
      },
      {
        question: "How do I convert a 30% margin to markup?",
        answer:
          "Divide 0.30 by (1 − 0.30), which is 0.70. The result is 0.4286, or about 42.9% markup.",
      },
      {
        question: "Can margin be 100%?",
        answer:
          "Only if the cost is zero, which is unusual for a product or service with real expenses. For any positive cost, margin is below 100%.",
      },
    ],
  },
  {
    slug: "payback-period-explained",
    title: "Payback Period Explained",
    category: "Business",
    date: "2026-10-12",
    excerpt:
      "Calculate how long an investment or project takes to repay its initial cost, including uneven cash flows and the practical limits of the measure.",
    tool: { name: "Payback Period Calculator", path: "/payback-period" },
    takeaways: [
      "Payback is the time needed for cumulative cash inflows to equal the initial outflow.",
      "For uneven cash flows, find the year the cumulative total crosses the investment and interpolate.",
      "Payback ignores cash flows after the recovery date and does not measure total profitability.",
    ],
    sections: [
      {
        heading: "Recovering the Initial Outlay",
        paragraphs: [
          "The payback period is the time needed for cumulative cash inflows to equal the initial cash outflow. It answers a simple question: how long before the money put in has come back?",
          "Payback is expressed in years or months. It is a measure of recovery speed, not of total profitability. A project can pay back quickly and still earn little over its full life.",
        ],
        formula:
          "Payback period = Initial investment ÷ Annual cash inflow, for even cash flows",
      },
      {
        heading: "Even Cash Flows",
        paragraphs: [
          "When the annual cash inflow is the same every year, divide the initial investment by that inflow. A 24,000 investment that returns 6,000 each year has a payback period of four years.",
          "The calculation assumes the inflows arrive evenly through the year. If they arrive at the end of each year, the payback occurs at the end of year four rather than gradually during it.",
        ],
        example: {
          title: "Example: even annual inflows",
          lines: [
            "Initial investment: 24,000.",
            "Annual cash inflow: 6,000.",
            "Payback: 24,000 ÷ 6,000 = 4 years.",
            "Cumulative inflow reaches 24,000 at the end of year four.",
          ],
        },
      },
      {
        heading: "Uneven Cash Flows",
        paragraphs: [
          "Most projects do not produce a constant annual amount. Add the inflows year by year until the cumulative total reaches the initial investment. The payback period falls in the year when the cumulative total crosses the investment.",
          "For a 24,000 investment with inflows of 5,000, 7,000, 8,000, and 9,000, cumulative inflows are 5,000, 12,000, 20,000, and 29,000. Payback occurs during year four, when the remaining 4,000 is recovered from the 9,000 inflow.",
        ],
        formula:
          "Payback = Last full year + (Unrecovered amount ÷ Next year cash inflow)",
        example: {
          title: "Example: uneven annual inflows",
          lines: [
            "Years 1 to 3 cumulative: 5,000 + 7,000 + 8,000 = 20,000.",
            "Remaining after year 3: 24,000 − 20,000 = 4,000.",
            "Year 4 inflow: 9,000.",
            "Payback: 3 + 4,000 ÷ 9,000 = 3.44 years.",
          ],
        },
      },
      {
        heading: "Cash Flow Is Not Profit",
        paragraphs: [
          "Payback uses cash, not accounting profit. Depreciation reduces reported profit but does not use cash, so it is usually added back when estimating cash flow. A large initial purchase may be paid up front but depreciated over several years.",
          "Taxes, working capital, and maintenance spending also affect cash. Use the net cash the project actually produces, not the revenue line or the gross benefit.",
        ],
        list: [
          "Start with the cash outflow at the beginning.",
          "Add net cash inflows, not accounting revenue.",
          "Exclude non-cash depreciation from the inflow.",
          "Include working capital and maintenance costs.",
        ],
      },
      {
        heading: "The Time Value of Money",
        paragraphs: [
          "A basic payback calculation treats money received in year four the same as money spent today. Discounted payback applies a discount rate to each inflow before cumulating, so later cash flows count for less.",
          "Discounted payback is always longer than simple payback when the discount rate is positive. It is still a recovery measure, not a complete investment appraisal.",
        ],
        note:
          "Two projects with the same payback can have very different total returns. Use payback alongside measures that consider the whole life of the project.",
      },
      {
        heading: "Using Payback as a Screen",
        paragraphs: [
          "Payback is popular because it is easy to explain and focuses attention on risk and liquidity. A shorter payback means the money is exposed for less time, which can matter when the future is uncertain.",
          "Its weakness is that it ignores everything after the payback date. A project with a quick payback but no inflows afterward may be worse than one that takes longer but keeps returning cash. Set a cutoff only after considering the full picture.",
        ],
        list: [
          "State whether cash flows are annual or monthly.",
          "Use cumulative cash flow, not average profit.",
          "Compare projects over the same horizon.",
          "Treat the result as one input, not a decision rule.",
        ],
      },
    ],
    faq: [
      {
        question: "How do I calculate payback with uneven cash flows?",
        answer:
          "Add the inflows year by year until the cumulative total reaches the initial investment. Divide the unrecovered amount by the next year's inflow and add that fraction to the last full year.",
      },
      {
        question: "Does payback include salvage value?",
        answer:
          "It can, if the asset is sold and the proceeds are received in cash. If salvage value is excluded, state that assumption so the result can be compared fairly with other projects.",
      },
      {
        question: "Is a shorter payback always better?",
        answer:
          "No. A shorter payback reduces exposure, but it says nothing about the size or duration of returns after the recovery date. Compare total cash flows and risk as well.",
      },
    ],
  },
  {
    slug: "how-to-calculate-roi",
    title: "How to Calculate Return on Investment",
    category: "Business",
    date: "2026-10-16",
    excerpt:
      "Measure investment and project returns with the ROI formula, annualize results for fair comparison, and see what the headline number leaves out.",
    tool: { name: "ROI Calculator", path: "/roi" },
    takeaways: [
      "ROI compares net gain with cost and is usually expressed as a percentage.",
      "Include income, final value, and all relevant costs in the calculation.",
      "Annualize ROI when comparing investments held for different lengths of time.",
    ],
    sections: [
      {
        heading: "The ROI Formula",
        paragraphs: [
          "Return on investment compares the net gain from an investment with its cost. The result is usually a percentage. A positive ROI means the investment returned more than it cost; a negative ROI means it returned less.",
          "Net gain is the final value plus any income received, minus the total cost of the investment, including purchase costs and fees. Be consistent about what you count on both sides of the comparison.",
        ],
        formula: "ROI (%) = (Net gain ÷ Total cost) × 100",
      },
      {
        heading: "A Simple Investment",
        paragraphs: [
          "Suppose you buy an asset for 2,000, pay 150 in fees, and later sell it for 2,600. The total cost is 2,150. The net gain is 2,600 − 2,150 = 450, so ROI is 450 ÷ 2,150 × 100 = 20.9%.",
          "If the asset also paid 80 in income while you held it, the net gain becomes 530 and ROI becomes 24.7%. Income belongs in the gain, while the fees are already part of the cost base.",
        ],
        example: {
          title: "Example: buying and selling an asset",
          lines: [
            "Sale proceeds: 2,600.",
            "Purchase cost 2,000 plus fees 150 = 2,150.",
            "Net gain: 2,600 − 2,150 = 450.",
            "ROI: 450 ÷ 2,150 × 100 = 20.9%.",
          ],
        },
      },
      {
        heading: "ROI for Projects and Campaigns",
        paragraphs: [
          "For a business project, the same structure applies. If a campaign costs 5,000 and produces 6,500 in incremental revenue, the net gain is 1,500 and ROI is 30%.",
          "Only count revenue that would not have occurred without the project, and include all direct costs. A campaign that lifts sales but also requires extra staff time has a lower ROI than the revenue alone suggests.",
        ],
        example: {
          title: "Example: a marketing campaign",
          lines: [
            "Campaign cost: 5,000.",
            "Incremental revenue: 6,500.",
            "Net gain: 1,500.",
            "ROI: 1,500 ÷ 5,000 × 100 = 30%.",
          ],
        },
      },
      {
        heading: "Annualizing ROI",
        paragraphs: [
          "A 20.9% return over two years is not the same as 20.9% in one year. To compare investments with different holding periods, convert the total return to an annual rate.",
          "Use (1 + total return)^(1 ÷ years) − 1. For 20.9% over two years, 1.209^(1 ÷ 2) − 1 = 0.0995, or about 10.0% per year. This assumes compounding at a steady rate, which may not match the actual path.",
        ],
        formula: "Annualized ROI = (1 + ROI)^(1 ÷ Years) − 1",
        example: {
          title: "Example: 20.9% over two years",
          lines: [
            "Total ROI: 20.9%, or 0.209.",
            "Years: 2.",
            "1.209^(1 ÷ 2) = 1.0995.",
            "Annualized ROI: about 10.0%.",
          ],
        },
      },
      {
        heading: "What ROI Does Not Show",
        paragraphs: [
          "ROI is a ratio, so it does not show the size of the investment. A 50% return on 100 is 50, while a 10% return on 100,000 is 10,000. Both percentages are correct, but the amounts are very different.",
          "ROI also ignores risk, the timing of cash flows within the period, and the cost of tying up money. Two investments with the same ROI can carry very different levels of uncertainty.",
        ],
        list: [
          "Size of the investment.",
          "Timing of gains and losses.",
          "Risk and variability of returns.",
          "Opportunity cost of the capital.",
          "Taxes and inflation, unless included.",
        ],
      },
      {
        heading: "Comparing Investments Fairly",
        paragraphs: [
          "Use the same time period, include all costs, and decide whether income is part of the return. If one calculation includes fees and another does not, the comparison is not like for like.",
          "For projects with cash flows spread over time, ROI is a summary rather than a full model. Pair it with a payback or a discounted cash flow measure when timing matters.",
        ],
        list: [
          "Define the cost base clearly.",
          "Include income and final value.",
          "Use the same horizon for each option.",
          "State whether the result is annualized.",
        ],
        note:
          "The [ROI Calculator](/roi) can check the arithmetic and show the annualized figure alongside the total return.",
      },
    ],
    faq: [
      {
        question: "Can ROI be negative?",
        answer:
          "Yes. If the net gain is negative, the investment returned less than it cost and the ROI percentage is below zero.",
      },
      {
        question: "What is the difference between ROI and profit?",
        answer:
          "Profit is an amount of money. ROI is a ratio that compares that amount with the cost, which makes it easier to compare investments of different sizes.",
      },
      {
        question: "How do I annualize ROI?",
        answer:
          "Add 1 to the total return, raise it to the power of 1 divided by the number of years, then subtract 1. Convert the result to a percentage.",
      },
    ],
  },
];
