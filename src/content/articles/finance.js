export const financeArticles = [
  {
    slug: "how-compound-interest-works",
    title: "How Compound Interest Works",
    category: "Finance",
    date: "2026-09-30",
    excerpt:
      "Compound interest adds earned interest back to the balance, so later interest is calculated on a larger amount. See the formula and a ten-year worked example.",
    tool: { name: "Compound Interest Calculator", path: "/compound-interest" },
    takeaways: [
      "Compound interest is interest calculated on principal plus previously earned interest.",
      "The formula is A = P × (1 + r ÷ n)^(n × t), with the rate and periods in the same time unit.",
      "More frequent compounding and longer horizons raise the balance, but the calculation assumes a constant rate.",
    ],
    sections: [
      {
        heading: "What Compound Interest Does",
        paragraphs: [
          "Simple interest is paid only on the original amount. Compound interest is added to the balance, so the next calculation uses principal plus interest already earned. The gap is modest at first and grows with the balance.",
          "The same mechanism applies to debt. An unpaid balance can accumulate interest on interest, which is why compounding frequency and the rate matter for borrowers as well as savers.",
        ],
      },
      {
        heading: "The Compound Interest Formula",
        paragraphs: [
          "For a single deposit, future value is A = P × (1 + r ÷ n)^(n × t). P is the starting principal, r is the nominal annual rate as a decimal, n is the number of compounding periods per year, and t is the number of years.",
          "The units must agree. For monthly compounding, divide the annual rate by 12 and multiply the years by 12. Mixing annual and monthly periods overstates the result.",
        ],
        formula: "A = P × (1 + r ÷ n)^(n × t)",
        example: {
          title: "Example: 1,000 for ten years at 6%",
          lines: [
            "Annual compounding: 1,000 × 1.06^10 = 1,790.85.",
            "Monthly compounding: 1,000 × (1 + 0.06 ÷ 12)^120 = 1,819.40.",
            "Simple interest: 1,000 + (1,000 × 0.06 × 10) = 1,600.",
            "Monthly compounding adds 219.40 compared with simple interest.",
          ],
        },
      },
      {
        heading: "Compounding Frequency and the Effective Rate",
        paragraphs: [
          "A nominal rate does not fully describe growth when interest is added more than once a year. The **effective annual rate** is (1 + r ÷ n)^n − 1, which converts any schedule into a comparable yearly figure.",
          "At 6% compounded monthly, the effective annual rate is 1.005^12 − 1 = 6.1678%. The gap widens with higher rates and more frequent compounding.",
          "A rate advertised as annual may compound daily, monthly, or quarterly, so the label alone is not enough. The effective rate puts those offers on the same footing.",
        ],
      },
      {
        heading: "Why Time and Rate Matter",
        paragraphs: [
          "Time enters the formula as an exponent, so extending the horizon changes the balance by a growing factor rather than a fixed amount. Each addition has more time to earn its own interest.",
          "The rate affects both the base and the size of each addition. Two rates that differ by one percentage point can produce noticeably different balances over several decades from an identical starting amount.",
          "The two forces interact. At 4% compounded annually, 5,000 becomes 10,955.62 after 20 years. At 6% over 10 years, the same 5,000 becomes 8,954.24, so the longer horizon at the lower rate produces the larger balance.",
        ],
      },
      {
        heading: "Regular Contributions",
        paragraphs: [
          "Deposits made during the term add another layer. For end-of-period contributions, future value is P × (1 + i)^N plus PMT × (((1 + i)^N − 1) ÷ i), where i is the rate per period and N is the total number of periods.",
          "Timing matters. A deposit at the start of a period earns interest for that period; one at the end does not. A calculator should state which convention it uses, since the difference compounds.",
        ],
        formula: "FV = P × (1 + i)^N + PMT × (((1 + i)^N − 1) ÷ i)",
        note:
          "With 1,000 invested at 6% compounded monthly and 100 added at the end of each month, the balance after ten years is about 18,207, assuming the rate never changes.",
      },
      {
        heading: "What the Calculation Does Not Capture",
        paragraphs: [
          "The formula assumes a constant rate, no withdrawals, and no fees or taxes. Real accounts can change rates, charge fees, or apply tax to interest, all of which lower the effective result.",
          "Inflation is also absent. A future balance may buy less than the same amount today, so a nominal result is not an increase in purchasing power.",
        ],
        list: [
          "Confirm whether the quoted rate is nominal or effective.",
          "Check whether deposits arrive at the start or end of each period.",
          "Ask which fees or taxes are deducted from the result.",
          "Test a lower rate and a shorter horizon for comparison.",
        ],
        note:
          "Treat projections as illustrations of the mechanics rather than forecasts. Change one assumption at a time to see which inputs drive the result.",
      },
    ],
    faq: [
      {
        question: "What is the difference between simple and compound interest?",
        answer:
          "Simple interest is calculated only on the original principal. Compound interest is calculated on principal plus interest already added, so the interest amount can grow in each period even when the rate stays the same.",
      },
      {
        question: "How do I compare monthly and annual compounding?",
        answer:
          "Convert both offers to an effective annual rate using (1 + r ÷ n)^n − 1. The nominal rates may look equal, but the effective rates reveal which schedule produces more growth over a year.",
      },
      {
        question: "Does compound interest work against borrowers?",
        answer:
          "Yes. The mathematics is the same in either direction. A balance that is not paid down can accrue interest on interest, which increases the total cost of borrowing over time.",
      },
    ],
  },
  {
    slug: "how-loan-payments-are-calculated",
    title: "How Loan Payments Are Calculated",
    category: "Finance",
    date: "2026-09-30",
    excerpt:
      "Loan payments depend on the amount borrowed, the interest rate, and the term. Learn the amortization formula, see a worked example, and compare terms.",
    tool: { name: "Loan Calculator", path: "/loan" },
    takeaways: [
      "A fixed-rate loan payment is set so the balance reaches zero after the final scheduled payment.",
      "The monthly rate is the annual rate divided by 12, and the payment count is the term in years multiplied by 12.",
      "A longer term lowers the required payment but usually increases the total interest paid.",
    ],
    sections: [
      {
        heading: "The Three Inputs",
        paragraphs: [
          "A fixed-rate installment loan has three inputs: the principal, the annual interest rate, and the repayment term. The payment is the amount that clears the balance, with interest, by the end of the term.",
          "The lender converts the annual rate into a rate per payment period. For monthly payments, that is the annual rate divided by 12. The number of payments is the term in years multiplied by 12.",
          "Payments do not have to be monthly. The same formula works for any regular schedule: divide the annual rate by the number of payments per year and multiply the years by that number. A biweekly schedule has 26 periods a year.",
        ],
      },
      {
        heading: "The Payment Formula",
        paragraphs: [
          "The standard formula is M = P × i × (1 + i)^n ÷ ((1 + i)^n − 1). M is the payment, P is the principal, i is the periodic interest rate, and n is the number of payments.",
          "The formula comes from the present value of an annuity. The balance equals the sum of all future payments discounted at the periodic rate; setting that equal to the amount borrowed and solving gives the payment.",
        ],
        formula: "M = P × i × (1 + i)^n ÷ ((1 + i)^n − 1)",
        note:
          "A zero-interest loan is a special case. The payment is simply the principal divided by the number of payments, and the formula is not needed.",
      },
      {
        heading: "A Five-Year Loan Example",
        paragraphs: [
          "Take a 20,000 loan at 7% annual interest over five years. The monthly rate is 0.07 ÷ 12 = 0.0058333, and there are 5 × 12 = 60 payments.",
          "The factor (1 + i)^n is about 1.41763. The payment is 20,000 × 0.0058333 × 1.41763 ÷ 0.41763 = 396.02. Total repayments are 23,761.20, so interest is about 3,761.20.",
        ],
        example: {
          title: "Example: 20,000 at 7% for five years",
          lines: [
            "Monthly rate: 0.07 ÷ 12 = 0.0058333.",
            "Number of payments: 5 × 12 = 60.",
            "Payment: 396.02 per month.",
            "Total paid: 396.02 × 60 = 23,761.20; interest is 3,761.20.",
          ],
        },
      },
      {
        heading: "Inside Each Payment",
        paragraphs: [
          "Interest for a period is the opening balance multiplied by the periodic rate. The rest of the payment reduces principal. In month one, interest is 20,000 × 0.0058333 = 116.67, so principal is 396.02 − 116.67 = 279.35.",
          "As the balance falls, interest falls and principal rises. The payment stays the same on a fixed-rate loan, but its composition changes until the final payment clears the balance.",
          "Rounding the payment to the nearest cent means the final installment usually differs by a few cents. The lender adjusts the last payment so the balance closes at zero.",
        ],
      },
      {
        heading: "Why the Term Changes the Total",
        paragraphs: [
          "Stretching the same 20,000 loan over seven years lowers the payment to 301.85 but raises total interest to about 5,356. The rate is unchanged; the borrower pays it for longer on a balance that declines more slowly.",
          "A shorter term does the opposite: higher required payment, less total interest. The trade-off is cash flow against total cost, and the right balance depends on the borrower's circumstances.",
        ],
        list: [
          "3 years: 617.54 per month, about 2,232 total interest.",
          "5 years: 396.02 per month, about 3,761 total interest.",
          "7 years: 301.85 per month, about 5,356 total interest.",
        ],
        note:
          "Compare the total of all payments, not just the monthly figure. A payment that fits the budget can still cost more over the full term.",
      },
      {
        heading: "What the Payment Excludes",
        paragraphs: [
          "The formula covers principal and interest only. Origination fees, late charges, insurance, and taxes are separate, and a quoted annual percentage rate may include some of those costs.",
          "Variable-rate loans can change the payment when the rate resets. The calculation assumes payments are made on time and in full; missed payments can add fees and alter the payoff path.",
          "A lender may also require insurance or a guarantee, which adds cost without changing the principal-and-interest formula. Those charges belong in the overall budget even when they are not part of the quoted rate. A [Loan Calculator](/loan) can test different inputs, but the result is only as good as the assumptions behind it.",
        ],
        note:
          "Lenders can apply different day-count conventions and rounding rules, so compare quotes on a consistent basis.",
      },
    ],
    faq: [
      {
        question: "How is a monthly loan payment calculated?",
        answer:
          "Multiply the principal by the monthly rate and by (1 + rate)^number of payments, then divide by ((1 + rate)^number of payments − 1). The result is the fixed payment that amortizes the loan over the term.",
      },
      {
        question: "Does a longer loan term always mean more interest?",
        answer:
          "For the same principal and rate, yes, because interest is charged for more periods on a balance that declines more slowly. A lower rate or a smaller financed amount can change the comparison, so check the totals rather than the term alone.",
      },
      {
        question: "What is the difference between the interest rate and the APR?",
        answer:
          "The interest rate is the cost of borrowing the principal, expressed as an annual rate. The annual percentage rate is a broader measure that may include certain fees and charges. The exact rules vary by jurisdiction.",
      },
    ],
  },
  {
    slug: "how-to-calculate-emi",
    title: "How to Calculate EMI on a Loan",
    category: "Finance",
    date: "2026-10-02",
    excerpt:
      "EMI spreads principal and interest into equal monthly installments. Learn the formula, work through a five-year loan example, and see what drives the total cost.",
    tool: { name: "EMI Calculator", path: "/emi" },
    takeaways: [
      "EMI means equated monthly installment, a fixed payment covering interest and principal.",
      "The formula uses the monthly rate and the total number of months, not years.",
      "Early installments are mostly interest; the principal share rises as the balance falls.",
    ],
    sections: [
      {
        heading: "What EMI Means",
        paragraphs: [
          "An equated monthly installment is a fixed payment made every month until a loan is repaid. Each installment covers the interest due for that month and reduces the outstanding principal by the remainder.",
          "Because the payment is constant while the balance falls, the split changes. Interest dominates early payments and principal dominates later ones. The sum of all installments equals the amount borrowed plus the total interest.",
        ],
      },
      {
        heading: "The EMI Formula",
        paragraphs: [
          "EMI = P × r × (1 + r)^N ÷ ((1 + r)^N − 1). P is the principal, r is the monthly interest rate as a decimal, and N is the number of monthly installments.",
          "The annual rate must be divided by 12, and the term must be converted to months. A 9% annual rate becomes 0.0075 per month; a five-year term becomes 60 months.",
          "The formula assumes installments are paid at the end of each month. A payment made at the start reduces the balance sooner and slightly changes the result, so the timing convention should be stated.",
        ],
        formula: "EMI = P × r × (1 + r)^N ÷ ((1 + r)^N − 1)",
        note:
          "If the rate is zero, the denominator is zero as well. In that case the EMI is simply the principal divided by the number of months.",
      },
      {
        heading: "A Five-Year Worked Example",
        paragraphs: [
          "A 500,000 loan at 9% annual interest for five years has r = 0.0075 and N = 60. The factor (1.0075)^60 is about 1.565681.",
          "EMI = 500,000 × 0.0075 × 1.565681 ÷ 0.565681 = 10,379.18. The total repaid is 622,750.80, of which 122,750.80 is interest.",
        ],
        example: {
          title: "Example: 500,000 at 9% for five years",
          lines: [
            "Monthly rate: 0.09 ÷ 12 = 0.0075.",
            "Number of installments: 5 × 12 = 60.",
            "EMI: 500,000 × 0.0075 × 1.565681 ÷ 0.565681 = 10,379.18.",
            "Total interest: (10,379.18 × 60) − 500,000 = 122,750.80.",
          ],
        },
      },
      {
        heading: "How the Split Changes",
        paragraphs: [
          "In the first month, interest is 500,000 × 0.0075 = 3,750. The principal portion is 10,379.18 − 3,750 = 6,629.18, leaving a balance of 493,370.82.",
          "By the final months, interest is calculated on a much smaller balance, so almost the entire EMI reduces principal. This is why an early prepayment saves more interest than the same prepayment made later.",
          "A useful check is that the sum of the principal portions equals the amount borrowed. If it does not, the schedule contains a fee, a skipped payment, or a rounding difference.",
        ],
        note:
          "The interest saved by a prepayment depends on its timing and on whether the lender shortens the term or reduces the monthly installment. Check the loan terms before assuming a result.",
      },
      {
        heading: "What Changes the EMI",
        paragraphs: [
          "The EMI rises with the principal and the rate and falls with a longer term. A longer term can make a loan look affordable while increasing the total interest substantially.",
          "Fees, insurance, and processing charges may be added upfront or financed into the principal. If they are financed, the EMI is calculated on the larger amount, so the quoted rate does not tell the whole story.",
          "A lower EMI is not automatically cheaper. Comparing two offers means comparing total payments and the annual percentage rate, not just the monthly figure, because fees and tenure can hide in the smaller installment.",
        ],
        list: [
          "Principal: a larger loan raises the EMI proportionally.",
          "Rate: a higher rate raises both the EMI and the total interest.",
          "Term: a longer term lowers the EMI but usually raises the total interest.",
          "Financed fees: added to principal, they increase every later calculation.",
        ],
      },
      {
        heading: "Fixed, Floating, and Assumptions",
        paragraphs: [
          "The formula assumes a fixed rate for the entire term. A floating-rate loan can reset, changing the EMI or the remaining term depending on the lender's rules.",
          "The calculation also assumes payments are made on schedule and no extra payments are made. It is a planning estimate, not a quote, and it does not account for taxes or borrower-specific charges.",
          "If the rate changes, the lender may recalculate the EMI using the remaining principal and remaining term, or keep the EMI and extend the term. The two approaches produce different totals.",
        ],
      },
    ],
    faq: [
      {
        question: "What does EMI stand for?",
        answer:
          "EMI stands for equated monthly installment. It is the fixed amount paid each month on an installment loan, covering both the interest due and a portion of the principal.",
      },
      {
        question: "Why is the interest portion higher at the start?",
        answer:
          "Interest is charged on the outstanding balance, which is largest at the beginning. As the balance falls, the interest due each month falls too, leaving a larger share of the same EMI for principal.",
      },
      {
        question: "Does a longer tenure reduce the total cost?",
        answer:
          "It reduces the monthly EMI but usually increases the total interest, because the loan remains outstanding for more months. Compare the total of all installments when choosing between tenures.",
      },
    ],
  },
  {
    slug: "how-mortgage-payments-work",
    title: "How Mortgage Payments Work",
    category: "Finance",
    date: "2026-10-04",
    excerpt:
      "A mortgage payment combines principal, interest, taxes, and insurance. See how the loan portion is calculated and why the term changes both cost and cash flow.",
    tool: { name: "Mortgage Calculator", path: "/mortgage" },
    takeaways: [
      "The principal-and-interest portion uses the same amortization formula as any fixed-rate loan.",
      "Property taxes, homeowners insurance, and mortgage insurance are often paid alongside the loan payment.",
      "A shorter term raises the monthly payment but can cut total interest substantially.",
    ],
    sections: [
      {
        heading: "The Parts of a Mortgage Payment",
        paragraphs: [
          "A mortgage payment often includes more than the loan itself. Principal and interest repay the borrowed amount. Property taxes and homeowners insurance are usually collected monthly into an escrow account and paid when due.",
          "Mortgage insurance may also be required when the down payment is small. The total monthly outlay is therefore larger than the principal-and-interest figure, and the extra amounts are estimates that can change.",
          "The four main components are often called PITI: principal, interest, taxes, and insurance. Association dues and mortgage insurance may be added separately, so a full housing budget should include them.",
        ],
      },
      {
        heading: "Calculating Principal and Interest",
        paragraphs: [
          "The loan portion uses M = P × i × (1 + i)^n ÷ ((1 + i)^n − 1), where i is the annual rate divided by 12 and n is the term in months.",
          "The formula assumes a fixed rate and equal monthly payments. It does not include taxes, insurance, association dues, or closing costs.",
          "Accelerated biweekly payments divide the monthly payment in two and pay every two weeks, producing 26 half-payments a year. The effect depends on whether the lender applies the extra amount to principal.",
        ],
        formula: "M = P × i × (1 + i)^n ÷ ((1 + i)^n − 1)",
      },
      {
        heading: "A Thirty-Year Example",
        paragraphs: [
          "A 300,000 mortgage at 6.5% for 30 years has i = 0.0054167 and n = 360. The principal-and-interest payment is 1,896.20.",
          "Total payments over the term are 682,632, so interest is about 382,632. In the first month, interest is 1,625 and principal is 271.20; the principal share rises slowly at first.",
          "The interest figure is sensitive to the rate. A half-point difference changes the payment, and its effect on total interest grows over 360 months, which is why comparing quotes at the same rate and term matters.",
        ],
        example: {
          title: "Example: 300,000 at 6.5% for 30 years",
          lines: [
            "Monthly rate: 0.065 ÷ 12 = 0.0054167.",
            "Payment: 1,896.20 per month for 360 months.",
            "First month: 1,625.00 interest and 271.20 principal.",
            "Total interest over the term: about 382,632.",
          ],
        },
      },
      {
        heading: "Taxes, Insurance, and Escrow",
        paragraphs: [
          "Property tax is based on an assessed value and a local rate, not on the loan balance. Insurance depends on the property and the coverage. Both can rise, so the escrow portion of a payment can change even when the loan rate is fixed.",
          "Lenders estimate these costs and divide them by 12, adjusting for any shortfall or surplus. A payment quote that includes escrow is more realistic than principal and interest alone, but it is still an estimate.",
          "Escrow is not a fee. It is a holding account for bills that will be paid on the borrower's behalf. A surplus is usually returned or credited, while a shortfall is collected over time.",
        ],
      },
      {
        heading: "Comparing Fifteen and Thirty Years",
        paragraphs: [
          "The same 300,000 at 6.5% over 15 years costs 2,613.32 per month, compared with 1,896.20 over 30 years. The shorter loan saves about 212,234 in interest but requires 717.12 more each month.",
          "The comparison is not purely arithmetic. A larger required payment reduces flexibility, while a longer term preserves cash flow at a higher total cost. Rates can also differ between terms.",
        ],
        note:
          "A shorter term is not automatically better for every household. The decision depends on income stability, other goals, and the size of the emergency reserve.",
      },
      {
        heading: "Down Payments and Loan-to-Value",
        paragraphs: [
          "The loan amount is the purchase price minus the down payment. A 375,000 home with a 20% down payment of 75,000 leaves a 300,000 mortgage and a loan-to-value ratio of 80%.",
          "A higher loan-to-value ratio can mean mortgage insurance or a higher rate. The payment formula describes repayment of the amount actually borrowed, so the down payment changes the result before the formula is applied.",
          "Closing costs are separate from the down payment and can include lender fees, title work, and prepaid escrow. They reduce the cash available at purchase but are not part of the monthly payment formula.",
        ],
        note:
          "Closing costs, prepaid interest, and escrow deposits are separate from the monthly payment and vary by location and lender.",
      },
    ],
    faq: [
      {
        question: "Does a mortgage payment include property taxes?",
        answer:
          "Often, yes. Many lenders collect property taxes and homeowners insurance monthly in escrow and pay the bills when they come due. The loan payment itself covers only principal and interest, so compare quotes on the same basis.",
      },
      {
        question: "Why is so much of the early payment interest?",
        answer:
          "Interest is charged on the remaining balance, which is highest at the start. With a 300,000 loan at 6.5%, the first month carries 1,625 in interest, leaving only 271.20 of the 1,896.20 payment for principal.",
      },
      {
        question: "Is a 15-year mortgage always cheaper?",
        answer:
          "It usually has a lower total interest cost, but it also requires a larger monthly payment and may have a different rate. The better choice depends on cash flow, other savings, and how long the home will be owned.",
      },
    ],
  },
  {
    slug: "how-to-calculate-a-discount",
    title: "How to Calculate a Discount and Sale Price",
    category: "Finance",
    date: "2026-10-06",
    excerpt:
      "Learn how to take a percentage off a price, work backward from a sale price, and handle stacked discounts without adding the percentages incorrectly.",
    tool: { name: "Discount Calculator", path: "/discount" },
    takeaways: [
      "The discount amount is the original price multiplied by the discount rate.",
      "The sale price is the original price multiplied by 1 minus the rate.",
      "Stacked discounts multiply their multipliers and do not add up to a simple total.",
    ],
    sections: [
      {
        heading: "Discount and Sale Price Are Different",
        paragraphs: [
          "A discount is the amount removed from the original price. The sale price is what remains. A 30% discount on 120 removes 36 and leaves 84; the discount is 36, while 30% describes the rate.",
          "The distinction matters when a problem asks for the amount saved rather than the price paid. Mixing the two produces answers that look plausible but are off by the discount itself.",
          "Percent off, markdown, and clearance can all describe the same arithmetic. What changes is the base and whether additional conditions apply, so the offer terms matter more than the headline number.",
        ],
      },
      {
        heading: "The Basic Calculation",
        paragraphs: [
          "Discount = original × rate. Sale price = original − discount, or equivalently original × (1 − rate). Both routes give the same result when the rate is converted to a decimal.",
          "A 25% discount means the customer pays 75% of the original price, so the multiplier is 0.75. The rate and the multiplier are complements: rate + multiplier = 1.",
          "For a quick estimate, build the discount from familiar pieces. Ten percent of 120 is 12, so 30% is 36, and the sale price is 84. Splitting a rate into tens and ones makes the result easy to check.",
        ],
        formula: "Sale price = Original × (1 − Discount rate)",
        example: {
          title: "Example: 30% off 120",
          lines: [
            "Discount: 120 × 0.30 = 36.",
            "Sale price: 120 − 36 = 84.",
            "As a multiplier: 120 × 0.70 = 84.",
          ],
        },
      },
      {
        heading: "Stacked Discounts",
        paragraphs: [
          "Retailers sometimes apply a second discount to an already reduced price. These discounts compound rather than add. An extra 20% off an 84 sale price removes 16.80 and leaves 67.20.",
          "The combined multiplier is 0.70 × 0.80 = 0.56, so the total discount is 44%, not 50%. The second discount applies to the reduced price, not the original.",
          "The order of stacked discounts does not change the final price, because 0.70 × 0.80 equals 0.80 × 0.70. What matters is that each rate applies to the price remaining after the previous discount.",
        ],
        example: {
          title: "Example: 30% off, then an extra 20%",
          lines: [
            "After the first discount: 120 × 0.70 = 84.",
            "After the second discount: 84 × 0.80 = 67.20.",
            "Total discount: 120 − 67.20 = 52.80.",
            "52.80 ÷ 120 = 44%, not 50%.",
          ],
        },
      },
      {
        heading: "Recovering the Original Price",
        paragraphs: [
          "If the sale price and the discount rate are known, divide by the multiplier to recover the original. A price of 84 after 30% off means 84 ÷ 0.70 = 120.",
          "Do not add the discount to the sale price. That treats the sale price as the original and overstates the discount. Division by the multiplier is the correct inverse operation.",
          "The same division works with a tax-inclusive total only if the order of the discount and the tax is known. Remove the tax first, then divide by the discount multiplier to recover the original price.",
        ],
        note:
          "For stacked discounts, divide by each multiplier in turn. Recovering the original from 67.20 means dividing by 0.80 and then by 0.70.",
      },
      {
        heading: "Tax, Rounding, and Exclusions",
        paragraphs: [
          "Sales tax usually applies to the discounted price, not the original. At 8% tax, an 84 sale price attracts 6.72 in tax, for a total of 90.72.",
          "Rounding can shift the result by a cent or two when a percentage produces a fraction of the smallest currency unit. Apply the store's rounding rule at the point of sale and keep the receipt.",
          "A large advertised discount can also be smaller than a competitor's lower rate on a lower original price. Compare final prices, not percentages, when the goal is the amount actually paid.",
        ],
        list: [
          "Check whether the discount applies before or after tax.",
          "Confirm exclusions and minimum purchase rules.",
          "Multiply stacked discounts rather than adding them.",
          "Keep the original price for comparison and returns.",
        ],
      },
    ],
    faq: [
      {
        question: "How do I calculate a 20% discount quickly?",
        answer:
          "Ten percent of the price is one tenth, so 20% is twice that amount. Subtract the result from the original price. For 75, 10% is 7.50, 20% is 15, and the sale price is 60.",
      },
      {
        question: "Do two 20% discounts equal 40% off?",
        answer:
          "No. The first discount leaves 80% of the price, and the second applies to that reduced amount. The combined multiplier is 0.80 × 0.80 = 0.64, which is a 36% total discount.",
      },
      {
        question: "How do I find the original price from a sale price?",
        answer:
          "Divide the sale price by 1 minus the discount rate. A 60 sale price after 25% off means 60 ÷ 0.75 = 80. Adding 25% of 60 would give 75, which is incorrect.",
      },
    ],
  },
  {
    slug: "how-to-calculate-a-tip-and-split-a-bill",
    title: "How to Calculate a Tip and Split a Bill",
    category: "Finance",
    date: "2026-10-08",
    excerpt:
      "Calculate a tip on the pre-tax bill, split the total fairly, and round without leaving the group short. Includes a worked example for four diners.",
    tool: { name: "Tip Calculator", path: "/tip" },
    takeaways: [
      "Tip = bill × tip rate; total = bill + tip.",
      "Splitting a bill means dividing the total, including the tip, by the number of people.",
      "Rounding each share up ensures the group covers the full amount.",
    ],
    sections: [
      {
        heading: "The Two-Step Calculation",
        paragraphs: [
          "A tip is a percentage of the bill. Multiply the bill by the tip rate to get the tip, then add it to the bill for the total. An 18% tip on 86.40 is 15.55, and the total is 101.95.",
          "You can also multiply the bill by 1 plus the rate. The multiplier for 18% is 1.18, and 86.40 × 1.18 gives the same total. The two-step method is easier to check by hand.",
          "The same arithmetic works for a fixed tip amount. Add the amount directly, then divide the total; a percentage is only a convenient way to scale the tip to the bill.",
        ],
        formula: "Total = Bill × (1 + Tip rate)",
      },
      {
        heading: "Which Amount Is the Base?",
        paragraphs: [
          "A tip is often calculated on the pre-tax subtotal, because tax is not part of the service. Some people tip on the post-tax total; the difference is usually small but can matter on a large bill.",
          "Delivery fees, service charges, and already-included gratuities change the base. Read the bill before adding a tip, since a service charge may already cover part or all of it.",
          "Tipping on the post-tax total produces a slightly larger tip. With 8% tax and an 18% tip, the tip equals 19.44% of the pre-tax bill, because 0.18 × 1.08 = 0.1944.",
        ],
        example: {
          title: "Example: an 18% tip on 86.40",
          lines: [
            "Tip: 86.40 × 0.18 = 15.55.",
            "Total: 86.40 + 15.55 = 101.95.",
            "Split four ways: 101.95 ÷ 4 = 25.49 per person.",
          ],
        },
      },
      {
        heading: "Splitting the Bill",
        paragraphs: [
          "Divide the total, not just the food and drink, by the number of people. If the group shares everything equally, equal shares are straightforward: 101.95 ÷ 4 = 25.49 per person.",
          "When people order different amounts, split the subtotal by what each person consumed, then add a proportional share of the tip. Splitting the tip equally is simpler but can be unfair if orders vary widely.",
          "Shared items such as an appetizer or a bottle of wine can be divided separately before the tip is applied. That keeps the calculation transparent for everyone at the table.",
        ],
      },
      {
        heading: "Rounding Fairly",
        paragraphs: [
          "Exact division often produces fractions of a cent. Rounding each share down can leave the group short of the total, so round up or let one person cover the remainder.",
          "Four payments of 25.49 total 101.96, one cent more than the bill. That is harmless, but a large group rounding down by a few cents each can leave a noticeable gap.",
          "Cash payments can be rounded to a convenient note, but the group should still agree on the total before dividing the difference.",
        ],
        note:
          "If paying by card, the total charged should match the amount written on the receipt, including any tip line.",
      },
      {
        heading: "Finding the Tip from a Total",
        paragraphs: [
          "If the total and the bill are known, the tip is the difference. A total of 101.95 on an 86.40 bill means a tip of 15.55, which is 15.55 ÷ 86.40 = 18%.",
          "To find the bill from a total that includes a known tip rate, divide by 1 plus the rate. A 101.95 total at 18% implies a bill of 101.95 ÷ 1.18 = 86.40.",
          "If the receipt suggests several tip rates, compare them with the service and the local custom rather than defaulting to the largest figure.",
        ],
      },
      {
        heading: "Customs and Limits",
        paragraphs: [
          "Tipping expectations vary by country, city, and type of service. A calculation can show what a given percentage produces, but it cannot determine what is appropriate in a particular situation.",
          "The arithmetic also does not account for poor service, automatic charges, or employer policies. Treat the result as a starting point and adjust it to the circumstances.",
          "Automatic gratuity is common for large parties in some places. The posted policy should be checked before the bill arrives so the group does not tip twice. The [Tip Calculator](/tip) can apply a rate to a bill and divide the total, but checking the bill for a service charge is still part of the process.",
        ],
      },
    ],
    faq: [
      {
        question: "Should a tip be calculated before or after tax?",
        answer:
          "Either is common. Pre-tax tipping bases the gratuity on the service rather than the tax, while post-tax tipping produces a slightly larger amount. The difference is usually small unless the bill is large.",
      },
      {
        question: "How do I split a bill unevenly?",
        answer:
          "Allocate the shared items and each person's own items first, then apply the tip rate to each share. Alternatively, split the tip in proportion to what each person ordered.",
      },
      {
        question: "What if the restaurant already adds a service charge?",
        answer:
          "Check whether the charge is a gratuity or a service fee that goes to the business. If it already covers the tip, adding a full tip on top may duplicate the charge.",
      },
    ],
  },
  {
    slug: "salary-conversion-hourly-monthly-annual",
    title: "Converting Salary Between Hourly, Monthly, and Annual Pay",
    category: "Finance",
    date: "2026-10-10",
    excerpt:
      "Convert pay between hourly, weekly, monthly, and annual figures using consistent hours and weeks. Includes the 2,080-hour convention and its limits.",
    tool: { name: "Salary Calculator", path: "/salary" },
    takeaways: [
      "Hourly pay converts to annual pay by multiplying by hours per week and weeks per year.",
      "Monthly pay is annual pay divided by 12, not by four weekly payments.",
      "The 2,080-hour year assumes 40 hours per week for 52 weeks and excludes overtime and unpaid leave.",
    ],
    sections: [
      {
        heading: "The Core Relationships",
        paragraphs: [
          "Annual pay = hourly rate × hours per week × weeks per year. Weekly pay = hourly rate × hours per week. Monthly pay = annual pay ÷ 12, and biweekly pay = annual pay ÷ 26.",
          "The arithmetic is simple, but the inputs must describe the same schedule. Decide how many weeks are actually paid, then apply the rate. Using 52 weeks for a job with two weeks of unpaid leave overstates annual pay.",
          "The same relationships work for part-time schedules. At 20 hours per week, the annual figure is half of the 40-hour equivalent, assuming the same number of paid weeks.",
        ],
        formula: "Annual = Hourly × Hours per week × Weeks per year",
        example: {
          title: "Example: 25 per hour, full time",
          lines: [
            "Annual: 25 × 40 × 52 = 52,000.",
            "Monthly: 52,000 ÷ 12 = 4,333.33.",
            "Biweekly: 52,000 ÷ 26 = 2,000.",
            "Hourly equivalent: 52,000 ÷ 2,080 = 25.",
          ],
        },
      },
      {
        heading: "The 2,080-Hour Convention",
        paragraphs: [
          "A full-time year is often treated as 2,080 hours: 40 hours per week for 52 weeks. Dividing annual pay by 2,080 gives an hourly equivalent that makes salaries comparable.",
          "The convention assumes paid leave and no overtime. A job with 50 paid weeks has 2,000 hours, and a job with regular overtime has more. The hourly equivalent changes with the actual schedule.",
          "The 2,080 figure is also used to convert a salary to an hourly rate in job postings, even when the role offers fewer or more paid hours. The comparison is only as fair as the assumption behind it.",
        ],
        note:
          "The convention does not imply that someone works all 2,080 hours. It is a standardized denominator for comparing annual and hourly pay.",
      },
      {
        heading: "Pay Frequencies",
        paragraphs: [
          "Weekly pay is annual ÷ 52, biweekly is annual ÷ 26, and semi-monthly is annual ÷ 24. Semi-monthly and biweekly are not the same: one produces 24 checks a year, the other 26.",
          "Monthly pay is not four times weekly pay. A month averages about 4.33 weeks, which is why 52,000 a year is 4,333.33 a month but only 4,000 for four weekly payments.",
          "Payroll calendars can also produce two or three paydays in a month. A biweekly schedule has 26 paydays in a normal year, so two months usually contain three.",
        ],
      },
      {
        heading: "Converting in the Other Direction",
        paragraphs: [
          "To go from annual to hourly, divide by the number of paid hours in the year. At 2,080 hours, 60,000 a year is 28.85 per hour. At 2,000 hours, the same salary is 30.00 per hour.",
          "To compare offers, convert both to the same basis. A higher hourly rate with fewer guaranteed hours may produce less annual pay than a lower rate with a full schedule.",
          "Include the value of paid leave and employer contributions when comparing offers. A higher salary with no paid leave can be worth less than a lower salary with generous leave.",
        ],
      },
      {
        heading: "Gross, Net, and Deductions",
        paragraphs: [
          "All of these figures are gross pay, before income tax, social insurance, retirement contributions, and other deductions. Net pay is what arrives in the bank account and is always lower.",
          "Deductions can be percentage-based or fixed, and tax rules vary by location. A salary calculator that converts time periods cannot determine net pay without those details.",
          "Tax withholding is an estimate, and the final liability is settled when a return is filed. A net-pay estimate should be treated as a planning figure, not an exact deposit amount.",
        ],
      },
      {
        heading: "Variable Hours and Leave",
        paragraphs: [
          "Part-time and shift work often have variable hours. Multiplying a single week by 52 can mislead; use an average of several representative weeks and state the assumption.",
          "Unpaid leave, seasonal shutdowns, and overtime change the annual total. Overtime is usually paid at a premium, so it should be calculated separately rather than folded into the base rate.",
          "Shift differentials and bonuses can make annual pay variable. A range is often more honest than a single number when the schedule or the extra pay is not guaranteed. The [Salary Calculator](/salary) can convert a schedule into annual, monthly, and hourly figures.",
        ],
        note:
          "When comparing jobs, include the value of paid leave, insurance, and retirement contributions, not just the cash salary.",
      },
    ],
    faq: [
      {
        question: "How do I convert an hourly wage to a yearly salary?",
        answer:
          "Multiply the hourly rate by the number of paid hours per week and by the number of paid weeks per year. For 20 per hour, 40 hours a week, and 52 weeks, the annual figure is 41,600.",
      },
      {
        question: "Why is monthly pay not four times weekly pay?",
        answer:
          "Most months contain more than 28 days. A year has 52 weeks, which is 13 four-week periods, not 12. Dividing annual pay by 12 accounts for the longer average month.",
      },
      {
        question: "Is the 2,080-hour year always accurate?",
        answer:
          "No. It is a convention based on 40 hours for 52 weeks. Part-time schedules, unpaid leave, overtime, and holiday shutdowns change the actual number of paid hours.",
      },
    ],
  },
  {
    slug: "how-to-calculate-sales-tax",
    title: "How to Calculate Sales Tax and a Pre-Tax Price",
    category: "Finance",
    date: "2026-10-12",
    excerpt:
      "Add sales tax to a price, recover a pre-tax amount from a receipt total, and avoid rounding errors when several rates or exemptions apply to one purchase.",
    tool: { name: "Tax Calculator", path: "/tax" },
    takeaways: [
      "Sales tax is the pre-tax price multiplied by the tax rate.",
      "The total is the pre-tax price multiplied by 1 plus the rate.",
      "To recover the pre-tax price, divide the total by 1 plus the rate.",
    ],
    sections: [
      {
        heading: "The Basic Relationship",
        paragraphs: [
          "Sales tax is calculated on the taxable price. Tax = price × rate, and total = price + tax, which is the same as price × (1 + rate). The rate is usually a percentage, so convert it to a decimal first.",
          "An 8.25% rate becomes 0.0825. On a 249.99 purchase, tax is 20.62 and the total is 270.61. Rounding to the smallest currency unit happens at the point of sale.",
          "The same equation applies whether the charge is called sales tax, VAT, or a goods and services tax, although the rules for what is taxable differ.",
        ],
        formula: "Total = Price × (1 + Tax rate)",
        example: {
          title: "Example: 249.99 at 8.25% tax",
          lines: [
            "Tax: 249.99 × 0.0825 = 20.62.",
            "Total: 249.99 + 20.62 = 270.61.",
            "As a multiplier: 249.99 × 1.0825 = 270.61.",
          ],
        },
      },
      {
        heading: "Recovering the Pre-Tax Price",
        paragraphs: [
          "Receipts usually show only the total. To find the price before tax, divide by 1 plus the rate: 270.61 ÷ 1.0825 = 249.99.",
          "Subtracting 8.25% of the total is not correct, because the tax was calculated on the smaller pre-tax amount. The error is small at low rates but grows as the rate rises.",
          "If the receipt lists several tax lines, add them before dividing, provided they all apply to the same base. Otherwise, reverse each rate separately and sum the results.",
        ],
        formula: "Pre-tax price = Total ÷ (1 + Tax rate)",
      },
      {
        heading: "Combined and Layered Rates",
        paragraphs: [
          "When a state rate and a local rate apply to the same base, add them and use the combined rate once. A 6% state rate plus a 2.25% local rate gives 8.25%.",
          "If the rates apply to different bases, or if one is a fee rather than a tax, calculate each separately. Adding rates that are not applied to the same amount produces an incorrect total.",
          "A tax can also apply to a fee, such as a delivery charge, or to the price plus shipping. The order changes the total, so the invoice should show which base was used.",
        ],
      },
      {
        heading: "Discounts, Coupons, and Exemptions",
        paragraphs: [
          "Tax normally applies to the price actually paid, so a discount reduces the taxable amount. A 20% discount on 100 leaves 80, and an 8% tax adds 6.40 for a total of 86.40.",
          "Some items are exempt or taxed at a lower rate. A single purchase can therefore contain taxable and nontaxable lines, each calculated separately before the total is assembled.",
          "A manufacturer rebate is often applied after the sale and may not reduce the taxable price, unlike a discount taken at the register. The timing and form of the reduction matter.",
        ],
        list: [
          "Apply the discount before calculating tax.",
          "Check whether a coupon is a store discount or a manufacturer rebate.",
          "Separate exempt items from taxable ones.",
          "Confirm whether shipping or handling is taxable.",
        ],
      },
      {
        heading: "Rounding",
        paragraphs: [
          "Multiplying a price by a rate rarely produces a whole number of cents. Stores may round each line or the invoice total, and the two methods can differ by a cent or more.",
          "For a single purchase the difference is minor. For accounting or bulk orders, keep the line-level detail and apply a consistent rounding rule rather than recalculating from the rounded total.",
          "When a price is quoted with tax included, the listed amount is already the total. Dividing by 1 plus the rate recovers the base for bookkeeping, but no tax needs to be added.",
        ],
      },
      {
        heading: "Rates Change and Vary",
        paragraphs: [
          "Sales tax rates, rules, and exemptions vary by country, state, and city, and they change over time. A rate that was correct last year may not be correct now.",
          "The arithmetic is simple, but the applicable rate is a legal and local question. Verify the current rate before using a calculated total for a quote or a tax return.",
          "For online purchases, the tax may depend on the seller's location, the buyer's location, and the type of goods. A single national rate rarely applies to every transaction. The [Tax Calculator](/tax) applies a single rate to a price. For mixed baskets or multiple jurisdictions, calculate each taxable line separately.",
        ],
      },
    ],
    faq: [
      {
        question: "How do I add sales tax to a price?",
        answer:
          "Multiply the price by the tax rate to get the tax, then add it to the price. Alternatively, multiply the price by 1 plus the rate. At 7.5%, a 40 purchase has 3.00 tax and a 43.00 total.",
      },
      {
        question: "How do I remove sales tax from a total?",
        answer:
          "Divide the total by 1 plus the tax rate. If the total is 108 and the rate is 8%, the pre-tax price is 108 ÷ 1.08 = 100. Subtracting 8% of 108 would give 99.36, which is incorrect.",
      },
      {
        question: "Are discounts taxed?",
        answer:
          "A store discount reduces the price before tax in most jurisdictions, so tax applies to the reduced amount. The treatment of coupons, rebates, and free items can differ, so check the local rules.",
      },
    ],
  },
  {
    slug: "inflation-and-purchasing-power",
    title: "Inflation and Purchasing Power Explained",
    category: "Finance",
    date: "2026-10-14",
    excerpt:
      "Inflation reduces what a fixed amount can buy. Learn the purchasing-power formula, convert between nominal and real values, and interpret index figures carefully.",
    tool: { name: "Inflation Calculator", path: "/inflation" },
    takeaways: [
      "Purchasing power falls as prices rise, even when the nominal amount stays the same.",
      "Real value = nominal amount ÷ (1 + inflation rate)^t.",
      "Real return is not simply the nominal return minus inflation, though the difference is a useful approximation.",
    ],
    sections: [
      {
        heading: "What Inflation Means for a Fixed Amount",
        paragraphs: [
          "Inflation is a sustained rise in the general price level. When prices rise, a fixed sum buys fewer goods and services, even though the number of currency units has not changed.",
          "A salary, pension, or savings balance can look stable in nominal terms while losing purchasing power. The real value adjusts the nominal amount for the change in prices.",
          "Inflation is not the same as a price increase for one product. A single item can rise or fall while the general price level moves elsewhere; the index summarizes the average change across a basket.",
        ],
      },
      {
        heading: "The Purchasing-Power Formula",
        paragraphs: [
          "Real value = nominal amount ÷ (1 + inflation rate)^t, where t is the number of years and the rate is a decimal. This converts a future amount into today's purchasing power.",
          "Going the other way, the future cost of a basket is current cost × (1 + inflation rate)^t. The two formulas are inverses, so one can check the other.",
          "The formula assumes a constant inflation rate. Actual rates vary from year to year, so a long projection is a scenario rather than a prediction.",
        ],
        formula: "Real value = Nominal amount ÷ (1 + Inflation rate)^t",
        example: {
          title: "Example: 100 at 3% inflation for ten years",
          lines: [
            "Real value: 100 ÷ 1.03^10 = 74.41.",
            "Future cost of the same basket: 100 × 1.03^10 = 134.39.",
            "Check: 74.41 × 1.03^10 = 100.",
            "A fixed 100 buys about 74% as much after ten years.",
          ],
        },
      },
      {
        heading: "Nominal Versus Real",
        paragraphs: [
          "Nominal values are stated in the currency of the day. Real values are adjusted for inflation and are comparable across time. A 5% nominal raise during 5% inflation leaves real pay unchanged before taxes.",
          "A wage of 52,000 today would need to reach 52,000 × 1.04^3 = 58,493 after three years of 4% inflation to preserve purchasing power. A nominal wage of 52,000 at that point would be worth 52,000 ÷ 1.04^3 = 46,228 in today's money.",
          "Indexation adjusts payments for inflation, such as some pensions or contracts. The same real-value logic determines whether the adjustment preserves purchasing power.",
        ],
      },
      {
        heading: "Real Returns",
        paragraphs: [
          "The exact real return is (1 + nominal return) ÷ (1 + inflation) − 1. If an investment earns 7% and inflation is 3%, the real return is 1.07 ÷ 1.03 − 1 = 3.88%.",
          "Subtracting 3% from 7% gives 4%, which is close but slightly high. The approximation is useful for quick estimates; the division version is more accurate.",
          "Taxes matter too. A nominal return is often quoted before tax, while inflation affects after-tax spending power. A real return is most useful when the tax treatment is stated.",
        ],
        formula: "Real return = (1 + Nominal) ÷ (1 + Inflation) − 1",
      },
      {
        heading: "Indexes and Their Limits",
        paragraphs: [
          "Inflation is usually measured with a price index that tracks a basket of goods and services. The basket is an average, and an individual's spending may differ because of housing, transport, health costs, or family size.",
          "Index numbers also depend on the base period and on how quality changes are treated. A price index is a useful summary, not a personal cost-of-living measure.",
          "Substitution also matters. When one good becomes expensive, households may buy less of it and more of another, which a fixed basket cannot capture.",
        ],
      },
      {
        heading: "Using Inflation in Planning",
        paragraphs: [
          "Inflation assumptions matter over long horizons. A 2% and a 4% assumption produce very different real values after 20 or 30 years, even though the annual gap seems small.",
          "Deflation is also possible, and the formula still works with a negative rate. The result then shows an increase in purchasing power, though falling prices can bring other economic effects.",
          "For long-term planning, a range such as 2% to 4% can show how sensitive a result is without pretending to know the future.",
        ],
        note:
          "Inflation is uncertain. Present a range of assumptions rather than a single forecast, and state that the result is an estimate.",
      },
    ],
    faq: [
      {
        question: "How do I calculate purchasing power after inflation?",
        answer:
          "Divide the future amount by (1 + inflation rate)^number of years. At 3% for ten years, 100 has the purchasing power of about 74.41 in today's terms.",
      },
      {
        question: "What is the difference between nominal and real values?",
        answer:
          "Nominal values are not adjusted for price changes. Real values are restated in the prices of a chosen base year, which makes amounts from different years comparable.",
      },
      {
        question: "Is subtracting inflation from a return accurate?",
        answer:
          "It is an approximation. The exact real return divides (1 + nominal return) by (1 + inflation) and subtracts 1. The shortcut is close when both rates are low but drifts as they rise.",
      },
    ],
  },
  {
    slug: "present-value-vs-future-value",
    title: "Present Value vs Future Value: What the Difference Means",
    category: "Finance",
    date: "2026-10-15",
    excerpt:
      "Present value discounts a future amount; future value compounds one today. Learn both formulas and how the discount rate changes the comparison.",
    tool: { name: "Present Value Calculator", path: "/present-value" },
    takeaways: [
      "Future value compounds a present amount forward at a given rate.",
      "Present value discounts a future amount back to today.",
      "The same formula links them; the difference is which quantity you solve for.",
    ],
    sections: [
      {
        heading: "Two Directions, One Relationship",
        paragraphs: [
          "**Present value** answers how much a future amount is worth today. Future value answers how much an amount today will be worth after earning a return. Both use compound interest, but they move in opposite directions.",
          "If the rate and the number of periods are known, either value can be calculated from the other. The choice depends on what is being compared: a current sum or a future cash flow.",
          "The terms also appear in accounting and project appraisal. A future cash flow is discounted to decide whether it is worth more than a cost paid today.",
        ],
      },
      {
        heading: "The Formulas",
        paragraphs: [
          "Future value: FV = PV × (1 + r)^n. Present value: PV = FV ÷ (1 + r)^n. Here r is the rate per period and n is the number of periods.",
          "The rate must match the period. An annual rate with annual periods works directly; monthly periods require the annual rate divided by 12 and the years multiplied by 12.",
          "The present value of a series of equal payments uses an annuity factor, but each amount can also be discounted individually. The lump-sum formula is the building block for both methods.",
        ],
        formula: "FV = PV × (1 + r)^n and PV = FV ÷ (1 + r)^n",
      },
      {
        heading: "A Worked Comparison",
        paragraphs: [
          "10,000 invested for five years at 5% grows to 10,000 × 1.05^5 = 12,762.82. Reversing the calculation, the present value of 12,762.82 in five years at 5% is 10,000.",
          "Suppose the choice is 10,000 today or 12,000 in three years. At a 5% discount rate, the present value of 12,000 is 12,000 ÷ 1.05^3 = 10,366.05, which is more than 10,000 in today's terms.",
          "The comparison also depends on when the future amount arrives. Moving a payment further away lowers its present value at the same rate.",
        ],
        example: {
          title: "Example: comparing 10,000 now with 12,000 later",
          lines: [
            "Future value: 10,000 × 1.05^5 = 12,762.82.",
            "Present value: 12,000 ÷ 1.05^3 = 10,366.05.",
            "Difference: 10,366.05 − 10,000 = 366.05.",
            "At a 5% rate, the later payment has the higher present value.",
          ],
        },
      },
      {
        heading: "Choosing the Discount Rate",
        paragraphs: [
          "The discount rate represents the return available on an alternative use of the money, adjusted for risk and timing. A higher rate reduces present value; a lower rate increases it.",
          "The choice is an assumption, not a fact. Two analysts can reach different present values from the same cash flow by using different rates, and both calculations can be internally consistent.",
          "Riskier cash flows are often discounted at a higher rate, but the size of the risk premium is a judgment. The formula does not supply it.",
        ],
      },
      {
        heading: "Compounding Frequency",
        paragraphs: [
          "When compounding is more frequent than annual, use the rate per period and the total number of periods. At 5% compounded monthly for five years, 10,000 grows to 10,000 × (1 + 0.05 ÷ 12)^60 = 12,833.59.",
          "Alternatively, convert the nominal rate to an effective annual rate and use annual periods. Mixing a nominal annual rate with monthly periods without adjusting it is a common error.",
          "The same adjustment applies in reverse for present value: divide the annual rate by 12 and multiply the years by 12, or use the effective annual rate consistently for both.",
        ],
      },
      {
        heading: "Limits of the Comparison",
        paragraphs: [
          "Present value assumes a known future amount, a constant rate, and no taxes or fees. Uncertain cash flows, changing rates, and liquidity needs can all alter the practical comparison.",
          "The calculation ranks alternatives in today's terms; it does not guarantee that a future payment will arrive or that the assumed return is achievable. Treat the result as a model, not a promise.",
          "A present value is not the market price of an investment. It is the value implied by the cash flow, timing, and rate assumptions used.",
        ],
        note:
          "Inflation can be incorporated by using a real discount rate, but the cash flow and the rate must be stated on the same basis.",
      },
    ],
    faq: [
      {
        question: "What is the difference between present value and future value?",
        answer:
          "Future value compounds a current amount forward to a later date. Present value discounts a later amount back to today. They are inverse operations using the same rate and time period.",
      },
      {
        question: "Why does a higher discount rate lower present value?",
        answer:
          "A higher rate means the money could grow faster elsewhere, so a future payment is worth less today. The denominator (1 + r)^n becomes larger, reducing the present value.",
      },
      {
        question: "Can present value be used for uneven cash flows?",
        answer:
          "Yes. Discount each cash flow separately to today and add the results. The single-formula version applies to a lump sum or a level annuity, not to amounts that vary by period.",
      },
    ],
  },
  {
    slug: "how-to-calculate-net-worth",
    title: "How to Calculate Net Worth",
    category: "Finance",
    date: "2026-10-16",
    excerpt:
      "Net worth is total assets minus total liabilities. Learn what to include, how to value assets, and how to avoid double-counting a mortgage or car loan.",
    tool: { name: "Net Worth Calculator", path: "/net-worth" },
    takeaways: [
      "Net worth = total assets − total liabilities.",
      "Assets should be valued at what they are worth today, not what was paid for them.",
      "Do not count both an asset and the loan secured by it in a way that double-counts equity.",
    ],
    sections: [
      {
        heading: "The Definition",
        paragraphs: [
          "**Net worth** is a snapshot of what is owned minus what is owed. It is calculated on a specific date, using current values for assets and current balances for debts.",
          "A positive result means assets exceed liabilities; a negative result means liabilities exceed assets. Neither is a grade, and the figure changes as balances and values change.",
          "Because it is a snapshot, net worth can fall after a large purchase even when the purchase is sensible. Cash falls, and the new asset may be worth less than its purchase price once fees or depreciation are counted.",
        ],
      },
      {
        heading: "What Counts as an Asset",
        paragraphs: [
          "Assets include cash, bank balances, investments, retirement accounts, and the current value of property such as a home or vehicle. Business interests and money owed to the household can also count if they can be valued reliably.",
          "Use a realistic value. A home is worth its market value less selling costs if a conservative figure is needed; a vehicle is worth its resale value, not its replacement price.",
          "Some households exclude personal possessions such as furniture and clothing because their resale value is uncertain and the effort of valuing them is high.",
        ],
        list: [
          "Cash and savings accounts.",
          "Investments and retirement accounts.",
          "Home and other property at current value.",
          "Vehicles at resale value.",
          "Money owed that is likely to be collected.",
        ],
      },
      {
        heading: "What Counts as a Liability",
        paragraphs: [
          "Liabilities include mortgage balances, personal and student loans, credit card balances, car loans, and any other amounts owed. Use the outstanding balance, not the original loan amount.",
          "A mortgage is a liability and the home is an asset. Listing both is correct. Listing home equity and the full home value would double-count the property.",
          "Contingent liabilities, such as a guarantee for someone else's loan, are usually excluded unless they are likely to become due. The choice should be stated if it matters.",
        ],
      },
      {
        heading: "A Household Balance Sheet Example",
        paragraphs: [
          "Suppose assets are a home worth 350,000, cash of 20,000, and investments of 50,000, for a total of 420,000. Liabilities are a mortgage of 220,000, a car loan of 12,000, and credit cards of 8,000, for a total of 240,000.",
          "Net worth is 420,000 − 240,000 = 180,000. The home contributes 350,000 to assets and the mortgage 220,000 to liabilities, leaving 130,000 of equity embedded in the result.",
          "A negative result can occur with student debt or a new mortgage and few other assets. The figure describes a position at a point in time, not a permanent outcome.",
        ],
        example: {
          title: "Example: a household balance sheet",
          lines: [
            "Assets: 350,000 + 20,000 + 50,000 = 420,000.",
            "Liabilities: 220,000 + 12,000 + 8,000 = 240,000.",
            "Net worth: 420,000 − 240,000 = 180,000.",
            "Home equity included: 350,000 − 220,000 = 130,000.",
          ],
        },
      },
      {
        heading: "Valuation and Double Counting",
        paragraphs: [
          "Estimates are unavoidable for property and vehicles. Use the same valuation method each time so that changes reflect real movements rather than a change in approach.",
          "Avoid counting the same item twice. A car and its loan are separate entries; home equity is not a separate asset if the home and mortgage are already listed. Retirement balances may also carry taxes or penalties on withdrawal.",
          "Joint accounts and shared debts need a consistent rule. Counting the full asset and the full liability may be appropriate for a household, but not for one person's share.",
        ],
        note:
          "Consistency matters more than precision. A rough estimate applied the same way each period is more useful than an exact figure calculated differently every time.",
      },
      {
        heading: "Tracking and Limitations",
        paragraphs: [
          "A single net worth figure says little on its own. Tracking it over time, alongside cash flow and debt balances, shows whether the position is improving and why.",
          "Net worth does not measure liquidity, income, or financial security. A household can have a high net worth and little accessible cash, or a low net worth and a comfortable income.",
          "The [Net Worth Calculator](/net-worth) can total assets and liabilities for a single date.",
        ],
        note:
          "Use consistent categories and a fixed schedule, such as quarterly, so comparisons are meaningful.",
      },
    ],
    faq: [
      {
        question: "Should a home be included in net worth?",
        answer:
          "Yes, at its current market value, with the mortgage counted as a liability. Some households use a conservative value net of selling costs because a sale would involve fees and taxes.",
      },
      {
        question: "Are retirement accounts counted at full value?",
        answer:
          "They can be, but the figure may overstate what is accessible after taxes and penalties. Some people apply an estimated tax rate or list the account at its current balance with a note about withdrawal costs.",
      },
      {
        question: "How often should net worth be calculated?",
        answer:
          "Quarterly or annually is common. More frequent updates add noise from market movements; less frequent updates make it harder to see whether debts and savings are moving in the intended direction.",
      },
    ],
  },
  {
    slug: "how-to-read-a-loan-amortization-schedule",
    title: "How to Read a Loan Amortization Schedule",
    category: "Finance",
    date: "2026-10-17",
    excerpt:
      "An amortization schedule shows how each payment splits between interest and principal. Learn to read the columns and see the effect of extra payments.",
    tool: { name: "Loan Calculator", path: "/loan" },
    takeaways: [
      "Each payment covers the interest due and reduces the remaining principal.",
      "Interest is calculated on the opening balance, so it falls as the loan is repaid.",
      "Extra principal payments shorten the loan and reduce total interest, subject to lender rules.",
    ],
    sections: [
      {
        heading: "What the Schedule Shows",
        paragraphs: [
          "An **amortization schedule** lists every payment over the life of a loan. For each period it shows the opening balance, the interest portion, the principal portion, and the closing balance.",
          "The payment stays constant on a fixed-rate loan, but the split changes. Early rows are interest-heavy and later rows are principal-heavy. The final row clears any remaining balance after rounding.",
          "The schedule is a table of cash flows, not a forecast of property value or investment returns. Its totals depend only on the loan amount, rate, term, and payment timing.",
        ],
      },
      {
        heading: "The Arithmetic Behind a Row",
        paragraphs: [
          "Interest for the period is the opening balance multiplied by the periodic rate. Principal is the payment minus interest. The closing balance is the opening balance minus principal.",
          "The periodic rate is the annual rate divided by the number of payments per year. For monthly payments, divide by 12. The schedule is built by repeating these three steps for every period.",
          "If payments are made more often than monthly, the rate and count must match the schedule. A biweekly schedule uses 26 periods per year, not 24.",
        ],
        formula: "Interest = Opening balance × Periodic rate; Principal = Payment − Interest",
      },
      {
        heading: "A Two-Year Example",
        paragraphs: [
          "A 10,000 loan at 6% over 24 months has a monthly rate of 0.005 and a payment of 443.21. In month one, interest is 50.00 and principal is 393.21, leaving 9,606.79.",
          "In month two, interest is 9,606.79 × 0.005 = 48.03, principal is 395.18, and the balance falls to 9,211.61. Total interest over the full term is about 636.95.",
          "The final payment is often slightly different because the regular payment is rounded to the cent. The lender adjusts the last row so the balance ends at zero.",
        ],
        example: {
          title: "Example: 10,000 at 6% for 24 months",
          lines: [
            "Payment: 443.21 per month.",
            "Month 1: interest 50.00, principal 393.21, balance 9,606.79.",
            "Month 2: interest 48.03, principal 395.18, balance 9,211.61.",
            "Total interest: about 636.95.",
          ],
        },
      },
      {
        heading: "Reading the Columns",
        paragraphs: [
          "The opening balance should equal the previous closing balance. If it does not, the schedule may include a skipped payment, a fee, or a rate change.",
          "The interest column should decline slowly at first and faster later. A row where interest rises usually signals a variable rate, a missed payment, or a negative amortization feature.",
          "Escrow columns, if present, should be separated from principal and interest. Including them in the payment can make the interest share look smaller than it is.",
        ],
        list: [
          "Opening balance: what is owed at the start of the period.",
          "Payment: the amount paid, including escrow if the schedule shows it.",
          "Interest: the cost of borrowing for that period.",
          "Principal: the part that reduces the debt.",
          "Closing balance: what remains after the payment.",
        ],
      },
      {
        heading: "Extra Payments",
        paragraphs: [
          "An extra payment applied to principal reduces the balance immediately, which lowers the interest due in every later period. The loan can be repaid sooner, and the total interest falls.",
          "The exact saving depends on when the extra payment is made and how the lender applies it. Some lenders apply extra amounts to future scheduled payments unless the borrower specifies principal.",
          "A single extra payment early in the loan has more effect than the same amount later, because it removes interest from more future periods.",
        ],
        note:
          "Ask whether prepayment penalties apply and whether the extra amount will shorten the term or reduce the monthly payment.",
      },
      {
        heading: "What the Schedule Excludes",
        paragraphs: [
          "A basic schedule covers principal and interest only. Property taxes, insurance, association dues, and fees may be collected with the payment but are not part of the amortization calculation.",
          "Variable-rate loans need a new schedule after each rate reset. The rows shown at the start are projections based on the current rate, not a fixed plan for the full term.",
          "A schedule built for a fixed rate is also invalidated by a lump-sum payment or a rate change. A change in escrow affects the total payment but not the principal-and-interest rows.",
        ],
      },
    ],
    faq: [
      {
        question: "Why does the principal portion increase over time?",
        answer:
          "Interest is charged on the remaining balance, which falls with every payment. A smaller balance means less interest is due, so more of the fixed payment can go toward principal.",
      },
      {
        question: "What does the closing balance mean?",
        answer:
          "It is the amount still owed after that period's payment. It becomes the opening balance for the next row, and the final closing balance should be zero, aside from rounding.",
      },
      {
        question: "How do extra payments appear on a schedule?",
        answer:
          "They are usually shown as additional principal, which lowers the closing balance and shortens the remaining term. The exact placement depends on the lender's rules and the payment date.",
      },
    ],
  },
];
