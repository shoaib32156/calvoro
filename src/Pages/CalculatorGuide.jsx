const guides = {
  "/percentage": {
    label: "Math guide",
    title: "Understanding percentage calculations",
    intro:
      "Percentages are used to describe parts of a whole, compare values, calculate discounts, and understand changes in numbers.",
    howTo: [
      "Enter the number you want to calculate a percentage from.",
      "Enter the percentage value you want to apply.",
      "Calculate the result and review the answer.",
    ],
    formula:
      "Percentage amount = (Number × Percentage) ÷ 100",
    example:
      "25% of 200 is 50 because (200 × 25) ÷ 100 = 50.",
    notes: [
      "A percentage represents a portion out of 100.",
      "Check both values before calculating.",
      "The result represents the percentage amount, not necessarily the original number.",
    ],
    faqs: [
      {
        question: "What does percentage mean?",
        answer:
          "A percentage represents a number as a portion out of 100. For example, 25% means 25 out of 100.",
      },
      {
        question: "How do I calculate a percentage of a number?",
        answer:
          "Multiply the number by the percentage and divide the result by 100.",
      },
      {
        question: "Where are percentages used?",
        answer:
          "Percentages are commonly used for discounts, taxes, statistics, grades, interest, and comparisons.",
      },
    ],
  },

  "/age": {
    label: "Date & time guide",
    title: "Understanding age calculations",
    intro:
      "An age calculator determines the time between a birth date and another selected date.",
    howTo: [
      "Enter the date of birth.",
      "Enter the comparison date when required.",
      "Calculate and review the resulting age.",
    ],
    formula:
      "Age is calculated from the calendar difference between two dates.",
    example:
      "Someone born on January 1, 2000 completes another full year of age on January 1 each year.",
    notes: [
      "Exact dates matter when calculating years, months, and days.",
      "Leap years and different month lengths can affect day calculations.",
      "Review both dates before calculating.",
    ],
    faqs: [
      {
        question: "Can an age calculator show months and days?",
        answer:
          "Yes. Depending on the calculator, the result can include years, months, and days.",
      },
      {
        question: "Does the exact birth date matter?",
        answer:
          "Yes. The day, month, and year all affect the calculation.",
      },
      {
        question: "Can I calculate age on another date?",
        answer:
          "Yes. A custom comparison date can be used when the calculator supports it.",
      },
    ],
  },

  "/bmi": {
    label: "Health guide",
    title: "Understanding BMI calculations",
    intro:
      "Body Mass Index, or BMI, is a numerical value calculated from height and weight and commonly used as a screening measure.",
    howTo: [
      "Enter your weight using the requested unit.",
      "Enter your height using the requested unit.",
      "Calculate your BMI and review the result.",
    ],
    formula:
      "BMI = weight ÷ height²",
    example:
      "For metric units, divide weight in kilograms by height in meters squared.",
    notes: [
      "BMI is a screening measure and does not directly measure body fat.",
      "Use the units requested by the calculator.",
      "Health decisions may require additional information.",
    ],
    faqs: [
      {
        question: "What does BMI stand for?",
        answer:
          "BMI stands for Body Mass Index.",
      },
      {
        question: "What information is needed for BMI?",
        answer:
          "A standard BMI calculation uses height and weight.",
      },
      {
        question: "Is BMI a complete measure of health?",
        answer:
          "No. BMI is one screening measure and does not describe every aspect of individual health.",
      },
    ],
  },

  "/loan": {
    label: "Finance guide",
    title: "Understanding loan calculations",
    intro:
      "A loan calculator can estimate periodic payments, total interest, and repayment amounts using the financial values you enter.",
    howTo: [
      "Enter the loan amount.",
      "Enter the interest rate and repayment period.",
      "Calculate the estimated payment and total cost.",
    ],
    formula:
      "Loan payment depends on principal, interest rate, payment frequency, and repayment period.",
    example:
      "A fixed-rate loan can be entered with its principal, annual interest rate, and repayment term to estimate periodic payments.",
    notes: [
      "Additional fees, insurance, and taxes may not be included.",
      "Interest calculations depend on the loan terms.",
      "Use lender-provided figures for exact repayment information.",
    ],
    faqs: [
      {
        question: "What does a loan calculator show?",
        answer:
          "It can estimate periodic payments, total interest, and total repayment depending on the calculator.",
      },
      {
        question: "Does it include every loan fee?",
        answer:
          "Not necessarily. Some fees and charges may need to be added separately.",
      },
      {
        question: "Can I compare different loan terms?",
        answer:
          "Yes. You can change the amount, rate, or repayment period and compare the resulting estimates.",
      },
    ],
  },

  "/emi": {
    label: "Finance guide",
    title: "Understanding EMI calculations",
    intro:
      "EMI stands for Equated Monthly Installment and is commonly used to describe a regular monthly loan payment.",
    howTo: [
      "Enter the principal loan amount.",
      "Enter the interest rate and repayment term.",
      "Calculate the estimated monthly EMI.",
    ],
    formula:
      "EMI depends on principal, periodic interest rate, and number of payments.",
    example:
      "A fixed-rate loan can be entered with its principal, annual rate, and number of monthly payments to estimate EMI.",
    notes: [
      "Actual lender payments may include additional charges.",
      "The rate and repayment term affect the EMI.",
      "Compare total repayment as well as monthly payment.",
    ],
    faqs: [
      {
        question: "What is EMI?",
        answer:
          "EMI means Equated Monthly Installment and generally refers to a regular monthly loan payment.",
      },
      {
        question: "Can EMI change?",
        answer:
          "Depending on the loan structure, payment amounts can change when interest rates or loan terms change.",
      },
      {
        question: "Does lower EMI mean lower total cost?",
        answer:
          "Not necessarily. A longer repayment period can reduce the monthly payment while increasing total interest.",
      },
    ],
  },

  "/currency": {
    label: "Finance guide",
    title: "Understanding currency conversion",
    intro:
      "A currency converter changes an amount from one currency into another using an exchange rate.",
    howTo: [
      "Enter the amount you want to convert.",
      "Choose the source currency.",
      "Choose the target currency and review the converted value.",
    ],
    formula:
      "Converted amount = Original amount × Exchange rate",
    example:
      "If an exchange rate is 1.25 target units for one source unit, 100 source units would equal 125 target units.",
    notes: [
      "Exchange rates change over time.",
      "Banks and payment providers may use their own rates or fees.",
      "Displayed conversion values may differ from the amount received in a real transaction.",
    ],
    faqs: [
      {
        question: "What is an exchange rate?",
        answer:
          "An exchange rate describes how much one currency is worth relative to another currency.",
      },
      {
        question: "Why can the converted amount differ from a bank quote?",
        answer:
          "Banks and payment services can add spreads, fees, or use different rates.",
      },
      {
        question: "Can exchange rates change?",
        answer:
          "Yes. Exchange rates can change frequently as currency markets move.",
      },
    ],
  },

  "/discount": {
    label: "Finance guide",
    title: "Understanding discount calculations",
    intro:
      "A discount calculator determines how much is reduced from an original price and the resulting final price.",
    howTo: [
      "Enter the original price.",
      "Enter the discount percentage.",
      "Calculate the discount amount and final price.",
    ],
    formula:
      "Discount amount = Original price × Discount rate ÷ 100",
    example:
      "A 20% discount on 1,000 is 200, leaving a final price of 800.",
    notes: [
      "Check whether taxes are applied before or after the discount.",
      "A percentage discount is normally calculated from the original price.",
      "Multiple discounts can produce different results depending on how they are applied.",
    ],
    faqs: [
      {
        question: "How is a discount calculated?",
        answer:
          "Multiply the original price by the discount percentage and divide by 100.",
      },
      {
        question: "How do I find the final price?",
        answer:
          "Subtract the discount amount from the original price.",
      },
      {
        question: "Can I calculate multiple discounts?",
        answer:
          "Some calculators support multiple discounts, but the result depends on the calculation method.",
      },
    ],
  },

  "/tip": {
    label: "Everyday finance guide",
    title: "Understanding tip calculations",
    intro:
      "A tip calculator helps estimate gratuity and can also divide a bill among multiple people.",
    howTo: [
      "Enter the total bill amount.",
      "Enter the desired tip percentage.",
      "Enter the number of people when splitting the bill.",
    ],
    formula:
      "Tip amount = Bill total × Tip percentage ÷ 100",
    example:
      "A 15% tip on a 2,000 bill is 300, giving a total of 2,300.",
    notes: [
      "Tip customs vary by location and service.",
      "Check whether a service charge is already included.",
      "When splitting a bill, rounding can affect each person's share.",
    ],
    faqs: [
      {
        question: "How is a tip calculated?",
        answer:
          "Multiply the bill amount by the selected tip percentage and divide by 100.",
      },
      {
        question: "Can I split a bill?",
        answer:
          "Yes, when the calculator includes a people or group input.",
      },
      {
        question: "Should I tip when a service charge is included?",
        answer:
          "Check the bill carefully because a service charge may already cover some or all gratuity.",
      },
    ],
  },

  "/timezone": {
    label: "Date & time guide",
    title: "Understanding time zone conversion",
    intro:
      "A time zone converter helps determine the corresponding local time in another location.",
    howTo: [
      "Enter the original date and time.",
      "Choose the source time zone.",
      "Choose the destination time zone and review the converted time.",
    ],
    formula:
      "Converted time = Source time adjusted by the difference between time zones.",
    example:
      "A time entered in one city can be converted to the local time used in another city.",
    notes: [
      "Time zone offsets can change because of daylight-saving rules.",
      "The date may change when converting between distant time zones.",
      "Check the selected locations carefully.",
    ],
    faqs: [
      {
        question: "Why can the date change after conversion?",
        answer:
          "The time difference between two locations can move the clock across midnight.",
      },
      {
        question: "Does daylight saving time matter?",
        answer:
          "Yes. Locations that observe daylight saving time may have changing offsets during the year.",
      },
      {
        question: "Can I compare multiple locations?",
        answer:
          "That depends on the calculator. A converter can be used repeatedly to compare different locations.",
      },
    ],
  },

  "/gpa": {
    label: "Education guide",
    title: "Understanding GPA calculations",
    intro:
      "A GPA calculator combines grades and credits to estimate an overall grade point average.",
    howTo: [
      "Enter your course or subject information.",
      "Enter each grade and credit value.",
      "Calculate the weighted GPA and review the result.",
    ],
    formula:
      "GPA = Total quality points ÷ Total credits",
    example:
      "A course worth more credits can contribute more to a weighted GPA than a lower-credit course.",
    notes: [
      "Schools use different grading scales.",
      "Some institutions use weighted or unweighted GPA systems.",
      "Use the grading scale required by your institution.",
    ],
    faqs: [
      {
        question: "What does GPA stand for?",
        answer:
          "GPA stands for Grade Point Average.",
      },
      {
        question: "Why do credits matter?",
        answer:
          "Credits can determine the weight of each course in the GPA calculation.",
      },
      {
        question: "Do all schools use the same GPA scale?",
        answer:
          "No. Institutions can use different scales and calculation methods.",
      },
    ],
  },

  "/unit": {
    label: "Math guide",
    title: "Understanding unit conversion",
    intro:
      "A unit converter changes a measurement from one unit into another while preserving the underlying quantity.",
    howTo: [
      "Choose the type of measurement.",
      "Enter the value and source unit.",
      "Select the target unit and review the conversion.",
    ],
    formula:
      "Converted value = Original value × Conversion factor",
    example:
      "A length entered in meters can be converted into centimeters using the appropriate conversion factor.",
    notes: [
      "Make sure the source and target units are correct.",
      "Different measurement systems use different conversion factors.",
      "Check decimal precision when working with small measurements.",
    ],
    faqs: [
      {
        question: "What can a unit converter be used for?",
        answer:
          "It can convert measurements such as length, weight, volume, temperature, and other supported units.",
      },
      {
        question: "Are conversion factors exact?",
        answer:
          "Many standard conversions are defined precisely, while some real-world measurements are approximate.",
      },
      {
        question: "Why should I check the units first?",
        answer:
          "Using the wrong unit can produce a mathematically correct but practically incorrect result.",
      },
    ],
  },

  "/fuel-cost": {
    label: "Everyday guide",
    title: "Understanding fuel cost calculations",
    intro:
      "A fuel cost calculator estimates trip fuel usage and cost using distance, vehicle efficiency, and fuel price.",
    howTo: [
      "Enter the travel distance.",
      "Enter fuel efficiency.",
      "Enter fuel price and calculate the estimated cost.",
    ],
    formula:
      "Fuel used = Distance ÷ Fuel efficiency",
    example:
      "A vehicle traveling 500 kilometers at 10 kilometers per liter would use an estimated 50 liters.",
    notes: [
      "Traffic, speed, weather, and vehicle condition affect real-world fuel usage.",
      "Keep distance and efficiency units consistent.",
      "Fuel prices can change over time.",
    ],
    faqs: [
      {
        question: "What information is needed?",
        answer:
          "Typical inputs include distance, fuel efficiency, and fuel price.",
      },
      {
        question: "Will actual fuel use match the estimate?",
        answer:
          "Not always. Real driving conditions can affect fuel consumption.",
      },
      {
        question: "Can I calculate a round trip?",
        answer:
          "Yes. Enter the total distance for the complete journey.",
      },
    ],
  },

  "/mortgage": {
    label: "Finance guide",
    title: "Understanding mortgage calculations",
    intro:
      "A mortgage calculator estimates periodic mortgage payments using the loan amount, interest rate, and repayment term.",
    howTo: [
      "Enter the property or mortgage amount.",
      "Enter the interest rate and repayment period.",
      "Calculate the estimated mortgage payment.",
    ],
    formula:
      "Mortgage payments depend on principal, interest rate, and number of repayment periods.",
    example:
      "Changing a mortgage rate or repayment term can change the estimated monthly payment.",
    notes: [
      "Property taxes, insurance, and fees may not be included.",
      "Actual lender terms may differ.",
      "Compare both monthly payments and total repayment.",
    ],
    faqs: [
      {
        question: "What does a mortgage calculator estimate?",
        answer:
          "It commonly estimates periodic mortgage payments and related repayment amounts.",
      },
      {
        question: "Does it include property taxes?",
        answer:
          "Only if the calculator specifically includes a field for them.",
      },
      {
        question: "Why does the loan term matter?",
        answer:
          "A longer term can change the monthly payment and total interest paid.",
      },
    ],
  },

  "/salary": {
    label: "Finance guide",
    title: "Understanding salary calculations",
    intro:
      "A salary calculator helps estimate earnings over different periods and may also estimate deductions.",
    howTo: [
      "Enter your salary or hourly pay.",
      "Enter the relevant working period.",
      "Calculate the estimated earnings or take-home amount.",
    ],
    formula:
      "Earnings depend on pay rate, working time, and applicable deductions.",
    example:
      "An hourly wage can be converted to an estimated annual income using the expected hours worked.",
    notes: [
      "Actual take-home pay depends on taxes and deductions.",
      "Benefits and payroll arrangements can affect results.",
      "Use current payroll information for an exact figure.",
    ],
    faqs: [
      {
        question: "Can hourly pay be converted to annual salary?",
        answer:
          "Yes. An estimate can be made when working hours and pay frequency are known.",
      },
      {
        question: "Is estimated take-home pay exact?",
        answer:
          "No. Actual deductions can vary based on taxes, benefits, and employment circumstances.",
      },
      {
        question: "Why can take-home pay differ between people?",
        answer:
          "Different deductions, taxes, benefits, and employment arrangements can change the final amount.",
      },
    ],
  },

  "/compound-interest": {
    label: "Finance guide",
    title: "How compound interest works",
    intro:
      "Compound interest allows accumulated interest to become part of the balance used for future interest calculations.",
    howTo: [
      "Enter the initial principal.",
      "Enter the interest rate, compounding frequency, and time.",
      "Calculate the future balance.",
    ],
    formula:
      "A = P(1 + r/n)^(nt)",
    example:
      "If interest is regularly added to an account balance, later interest can be calculated on both the original amount and accumulated interest.",
    notes: [
      "Compounding frequency affects the final amount.",
      "Use the interest-rate unit requested by the calculator.",
      "Actual returns can differ from a fixed mathematical example.",
    ],
    faqs: [
      {
        question: "What is compound interest?",
        answer:
          "It is interest calculated on the original principal and accumulated interest from earlier periods.",
      },
      {
        question: "Why does compounding frequency matter?",
        answer:
          "Different compounding frequencies change how often accumulated interest is added to the balance.",
      },
      {
        question: "How is compound interest different from simple interest?",
        answer:
          "Simple interest generally uses the original principal, while compound interest also accounts for accumulated interest.",
      },
    ],
  },

  "/tax": {
    label: "Finance guide",
    title: "Understanding tax calculations",
    intro:
      "A tax calculator estimates a tax amount or after-tax value from the income, rate, and other inputs supported by the tool.",
    howTo: [
      "Enter the income or amount being taxed.",
      "Enter the applicable tax information.",
      "Calculate the estimated tax and remaining amount.",
    ],
    formula:
      "Basic tax estimate = Taxable amount × Tax rate",
    example:
      "A taxable amount of 100,000 at a simple 10% rate would produce a basic tax estimate of 10,000.",
    notes: [
      "Actual tax systems may use brackets, deductions, credits, and exemptions.",
      "Rules vary by country and tax year.",
      "Use official tax information for filing decisions.",
    ],
    faqs: [
      {
        question: "Is a simple tax calculation always accurate?",
        answer:
          "No. Real tax systems can include multiple rates, deductions, credits, and special rules.",
      },
      {
        question: "Why can tax rules change?",
        answer:
          "Tax laws and thresholds can be updated by governments over time.",
      },
      {
        question: "Can I use a calculator for filing taxes?",
        answer:
          "A calculator can help with estimates, but official tax guidance should be used for filing.",
      },
    ],
  },

  "/profit-margin": {
    label: "Business guide",
    title: "Understanding profit margin calculations",
    intro:
      "A profit margin calculator compares profit with revenue to show how much of sales remains after costs.",
    howTo: [
      "Enter the selling price or revenue.",
      "Enter the cost or expenses.",
      "Calculate the profit and margin.",
    ],
    formula:
      "Profit margin = (Profit ÷ Revenue) × 100",
    example:
      "If revenue is 1,000 and total cost is 700, profit is 300 and the profit margin is 30%.",
    notes: [
      "Profit margin is different from markup.",
      "Use consistent revenue and cost values.",
      "Accounting methods can affect reported profit.",
    ],
    faqs: [
      {
        question: "What is profit margin?",
        answer:
          "Profit margin shows profit as a percentage of revenue.",
      },
      {
        question: "What is the difference between margin and markup?",
        answer:
          "Margin compares profit with selling revenue, while markup generally compares profit with cost.",
      },
      {
        question: "Can profit margin be negative?",
        answer:
          "Yes. A negative margin indicates that costs exceed the revenue used in the calculation.",
      },
    ],
  },

  "/break-even": {
    label: "Business guide",
    title: "Understanding break-even calculations",
    intro:
      "A break-even calculator estimates the sales level where total revenue equals total costs.",
    howTo: [
      "Enter fixed costs.",
      "Enter selling price and variable cost information.",
      "Calculate the break-even quantity or sales amount.",
    ],
    formula:
      "Break-even units = Fixed costs ÷ (Selling price − Variable cost per unit)",
    example:
      "If fixed costs are 10,000 and contribution per unit is 100, the break-even point is 100 units.",
    notes: [
      "The calculation depends on the assumptions entered.",
      "Changes in price or variable cost can change the result.",
      "Actual sales may differ from the estimated break-even level.",
    ],
    faqs: [
      {
        question: "What is the break-even point?",
        answer:
          "It is the point where total revenue equals total costs.",
      },
      {
        question: "What are fixed costs?",
        answer:
          "Fixed costs are costs that generally do not change directly with the number of units produced over the relevant period.",
      },
      {
        question: "Why is break-even analysis useful?",
        answer:
          "It can help explain how many units or how much sales revenue may be needed before generating a profit.",
      },
    ],
  },

  "/roi": {
    label: "Business guide",
    title: "Understanding ROI calculations",
    intro:
      "Return on Investment, or ROI, compares the gain or loss from an investment with the original investment amount.",
    howTo: [
      "Enter the original investment.",
      "Enter the final value or gain.",
      "Calculate the ROI percentage.",
    ],
    formula:
      "ROI = (Net gain ÷ Investment cost) × 100",
    example:
      "An investment costing 10,000 that produces a net gain of 2,000 has an ROI of 20%.",
    notes: [
      "Different ROI definitions can use different inputs.",
      "Time is not automatically represented by a basic ROI percentage.",
      "Include relevant costs when calculating net gain.",
    ],
    faqs: [
      {
        question: "What does ROI mean?",
        answer:
          "ROI means Return on Investment and expresses investment gain or loss relative to the investment amount.",
      },
      {
        question: "Can ROI be negative?",
        answer:
          "Yes. A negative ROI indicates a loss relative to the original investment.",
      },
      {
        question: "Does ROI include time?",
        answer:
          "A basic ROI percentage does not necessarily account for how long the investment was held.",
      },
    ],
  },

  "/payback-period": {
    label: "Business guide",
    title: "Understanding payback period calculations",
    intro:
      "The payback period estimates how long it takes for an investment to recover its original cost from cash flows.",
    howTo: [
      "Enter the initial investment.",
      "Enter the expected periodic cash flow.",
      "Calculate the estimated recovery period.",
    ],
    formula:
      "Basic payback period = Initial investment ÷ Periodic cash flow",
    example:
      "An investment of 10,000 producing 2,000 in annual cash flow has a basic payback period of 5 years.",
    notes: [
      "Basic payback does not necessarily account for the time value of money.",
      "Cash flows may vary between periods.",
      "Use detailed financial analysis for major investment decisions.",
    ],
    faqs: [
      {
        question: "What is the payback period?",
        answer:
          "It is the estimated amount of time required to recover an initial investment.",
      },
      {
        question: "Can cash flow change each year?",
        answer:
          "Yes. Some investments generate different cash flows over different periods.",
      },
      {
        question: "Does payback period measure profitability?",
        answer:
          "Not by itself. It focuses primarily on recovery time rather than total profitability.",
      },
    ],
  },

  "/investment": {
    label: "Finance guide",
    title: "Understanding investment growth calculations",
    intro:
      "An investment calculator estimates how an initial amount and future contributions may grow over time using a specified return assumption.",
    howTo: [
      "Enter the initial investment.",
      "Enter contributions, return rate, and time when applicable.",
      "Calculate the estimated future value.",
    ],
    formula:
      "Future investment value depends on principal, contributions, rate, compounding, and time.",
    example:
      "Adding regular contributions can increase the ending balance beyond the growth of the initial deposit alone.",
    notes: [
      "Investment returns are not guaranteed.",
      "Fees, taxes, inflation, and market performance can affect actual results.",
      "The calculator uses the assumptions you enter.",
    ],
    faqs: [
      {
        question: "What can an investment calculator show?",
        answer:
          "It can estimate how an investment may grow based on the assumptions entered.",
      },
      {
        question: "Are projected investment returns guaranteed?",
        answer:
          "No. Mathematical projections are estimates and actual investment performance can differ.",
      },
      {
        question: "Why do regular contributions matter?",
        answer:
          "Additional contributions increase the amount being invested and can change the estimated ending balance.",
      },
    ],
  },

  "/savings": {
    label: "Finance guide",
    title: "Understanding savings calculations",
    intro:
      "A savings calculator estimates how an account balance may grow from an initial deposit, regular contributions, interest, and time.",
    howTo: [
      "Enter your starting savings amount.",
      "Enter regular contributions and interest information.",
      "Calculate the estimated future balance.",
    ],
    formula:
      "Savings growth depends on starting balance, contributions, interest, and time.",
    example:
      "Regular monthly deposits can increase the final balance even when the initial deposit stays the same.",
    notes: [
      "Interest rates can change for some savings products.",
      "Fees and taxes may affect actual balances.",
      "Use realistic contribution amounts and time periods.",
    ],
    faqs: [
      {
        question: "Can I include regular deposits?",
        answer:
          "Yes, when the calculator provides a contribution input.",
      },
      {
        question: "Does the result guarantee future savings?",
        answer:
          "No. It is an estimate based on the assumptions entered.",
      },
      {
        question: "Why does time matter for savings growth?",
        answer:
          "More time can allow additional contributions and interest to accumulate.",
      },
    ],
  },

  "/inflation": {
    label: "Finance guide",
    title: "Understanding inflation calculations",
    intro:
      "An inflation calculator estimates how the purchasing value of money can change over time using an inflation rate.",
    howTo: [
      "Enter the original amount.",
      "Enter the inflation rate and time period.",
      "Calculate the estimated equivalent value.",
    ],
    formula:
      "Inflation-adjusted value depends on the original amount, inflation rate, and time.",
    example:
      "Repeated annual inflation can make the same amount of money buy fewer goods over time.",
    notes: [
      "Inflation rates can vary between years.",
      "Different countries measure inflation differently.",
      "Historical estimates do not guarantee future inflation.",
    ],
    faqs: [
      {
        question: "What is inflation?",
        answer:
          "Inflation is a general increase in prices that can reduce the purchasing power of money.",
      },
      {
        question: "Why does inflation compound?",
        answer:
          "When prices rise repeatedly, each year's increase affects the price level created by earlier increases.",
      },
      {
        question: "Can inflation be different between countries?",
        answer:
          "Yes. Inflation rates vary by country, period, and economic conditions.",
      },
    ],
  },

  "/present-value": {
    label: "Finance guide",
    title: "Understanding present value calculations",
    intro:
      "Present value converts a future amount into an estimated value today using a chosen discount rate.",
    howTo: [
      "Enter the future amount.",
      "Enter the discount rate.",
      "Enter the relevant time period and calculate present value.",
    ],
    formula:
      "PV = FV ÷ (1 + r)^n",
    example:
      "A future amount is worth less in present-value terms when a positive discount rate is applied.",
    notes: [
      "The discount rate has a major effect on present value.",
      "Time periods must match the rate period.",
      "Different financial models can use different discount assumptions.",
    ],
    faqs: [
      {
        question: "What is present value?",
        answer:
          "Present value estimates what a future amount is worth today under a selected discount rate.",
      },
      {
        question: "Why is discounting used?",
        answer:
          "Discounting accounts for the fact that money received in the future has a different value from money received today.",
      },
      {
        question: "Does a higher discount rate change present value?",
        answer:
          "Yes. A higher discount rate generally produces a lower present value for the same future amount.",
      },
    ],
  },

  "/future-value": {
    label: "Finance guide",
    title: "Understanding future value calculations",
    intro:
      "Future value estimates how much a present amount can grow over time under a chosen interest or return assumption.",
    howTo: [
      "Enter the current amount.",
      "Enter the interest or return rate.",
      "Enter the time period and calculate future value.",
    ],
    formula:
      "FV = PV(1 + r)^n",
    example:
      "A present amount can grow over time when a positive return is applied.",
    notes: [
      "Actual investment returns can vary.",
      "Compounding frequency may affect the result.",
      "Match the rate and time-period units.",
    ],
    faqs: [
      {
        question: "What is future value?",
        answer:
          "Future value estimates what a present amount may become after growth over time.",
      },
      {
        question: "Why does compounding matter?",
        answer:
          "Compounding can add previous earnings to the balance used for future growth.",
      },
      {
        question: "Is future value guaranteed?",
        answer:
          "No. It is a mathematical estimate based on the assumptions entered.",
      },
    ],
  },

  "/net-worth": {
    label: "Finance guide",
    title: "Understanding net worth calculations",
    intro:
      "Net worth measures the difference between the total value of assets and the total amount of liabilities.",
    howTo: [
      "Enter your assets.",
      "Enter your liabilities or debts.",
      "Calculate the difference between total assets and liabilities.",
    ],
    formula:
      "Net worth = Total assets − Total liabilities",
    example:
      "If total assets are 500,000 and liabilities are 200,000, net worth is 300,000.",
    notes: [
      "Use current estimates for assets when appropriate.",
      "Include relevant debts and liabilities.",
      "Net worth can change as asset values and debts change.",
    ],
    faqs: [
      {
        question: "What are assets?",
        answer:
          "Assets are things with economic value, such as savings, investments, or property.",
      },
      {
        question: "What are liabilities?",
        answer:
          "Liabilities are financial obligations such as loans, credit balances, or other debts.",
      },
      {
        question: "Can net worth be negative?",
        answer:
          "Yes. Net worth is negative when total liabilities exceed total assets.",
      },
    ],
  },

  "/percentage-change": {
    label: "Math guide",
    title: "Understanding percentage change",
    intro:
      "Percentage change measures how much a value increases or decreases relative to an original value.",
    howTo: [
      "Enter the original value.",
      "Enter the new value.",
      "Calculate the percentage change.",
    ],
    formula:
      "Percentage change = ((New value − Original value) ÷ Original value) × 100",
    example:
      "Changing from 100 to 120 represents a 20% increase.",
    notes: [
      "The original value is used as the reference point.",
      "A negative result indicates a decrease.",
      "Do not confuse percentage change with percentage points.",
    ],
    faqs: [
      {
        question: "What does a positive percentage change mean?",
        answer:
          "It generally indicates that the new value is higher than the original value.",
      },
      {
        question: "What does a negative percentage change mean?",
        answer:
          "It generally indicates that the new value is lower than the original value.",
      },
      {
        question: "Why is the original value important?",
        answer:
          "The original value provides the reference point used to calculate the relative change.",
      },
    ],
  },

  "/average": {
    label: "Math guide",
    title: "Understanding average calculations",
    intro:
      "An average summarizes a group of numbers by finding their arithmetic mean.",
    howTo: [
      "Enter the numbers you want to analyze.",
      "Check that all values are included.",
      "Calculate the average and review the result.",
    ],
    formula:
      "Average = Sum of values ÷ Number of values",
    example:
      "The average of 10, 20, and 30 is 20 because 60 ÷ 3 = 20.",
    notes: [
      "The arithmetic mean can be affected strongly by unusually large or small values.",
      "Make sure the full set of numbers is included.",
      "Other averages, such as median or mode, may be useful for some datasets.",
    ],
    faqs: [
      {
        question: "How is an average calculated?",
        answer:
          "Add all values together and divide the total by the number of values.",
      },
      {
        question: "Can an average be a decimal?",
        answer:
          "Yes. The arithmetic mean does not have to be a whole number.",
      },
      {
        question: "Is average always the best summary?",
        answer:
          "Not necessarily. Median or other measures can be more informative for some datasets.",
      },
    ],
  },

  "/fraction": {
    label: "Math guide",
    title: "Understanding fraction calculations",
    intro:
      "A fraction calculator helps perform arithmetic operations on fractions and simplify the resulting value.",
    howTo: [
      "Enter the numerator and denominator for each fraction.",
      "Choose the arithmetic operation.",
      "Calculate and review the simplified result.",
    ],
    formula:
      "Fraction operations depend on the selected arithmetic operation and common denominators when required.",
    example:
      "For addition, fractions with different denominators can be converted to a common denominator before being combined.",
    notes: [
      "A denominator cannot be zero.",
      "Simplifying a fraction means reducing it to an equivalent form with no common factor between numerator and denominator.",
      "Check mixed-number and improper-fraction formats carefully.",
    ],
    faqs: [
      {
        question: "Can fractions be simplified?",
        answer:
          "Yes. A fraction can be simplified when the numerator and denominator share a common factor.",
      },
      {
        question: "Can a denominator be zero?",
        answer:
          "No. Division by zero is undefined.",
      },
      {
        question: "Can I add fractions with different denominators?",
        answer:
          "Yes, but they first need to be expressed using a common denominator.",
      },
    ],
  },

  "/ratio": {
    label: "Math guide",
    title: "Understanding ratio calculations",
    intro:
      "A ratio compares two or more quantities and can often be simplified into an equivalent form.",
    howTo: [
      "Enter the quantities being compared.",
      "Check that the units represent comparable measurements.",
      "Calculate or simplify the ratio.",
    ],
    formula:
      "A ratio compares quantities by dividing them by a common factor when simplification is possible.",
    example:
      "A ratio of 20:10 can be simplified to 2:1 by dividing both sides by 10.",
    notes: [
      "Both quantities should be understood in the same context.",
      "A zero value may affect whether division or scaling is possible.",
      "Ratios and percentages describe comparisons in different ways.",
    ],
    faqs: [
      {
        question: "What is a ratio?",
        answer:
          "A ratio describes the relationship between two or more quantities.",
      },
      {
        question: "Can a ratio be simplified?",
        answer:
          "Yes. Both sides can be divided by a common factor.",
      },
      {
        question: "Are ratios and percentages the same?",
        answer:
          "No. A ratio expresses a relationship between quantities, while a percentage expresses a proportion out of 100.",
      },
    ],
  },

  "/time-duration": {
    label: "Date & time guide",
    title: "How the Time Duration Calculator works",
    intro:
      "This calculator measures the elapsed time between a start time and an end time. Enter both times in the time fields and the calculator returns the duration in hours and minutes.",
    howTo: [
      "Enter the start time in the first time field.",
      "Enter the end time in the second time field.",
      "Select Calculate Duration.",
      "Read the result as hours and minutes, with total minutes and decimal hours shown below.",
    ],
    formula:
      "Duration = End time − Start time. If the end time is earlier than the start time, 24 hours are added before subtracting.",
    example:
      "From 09:30 to 14:45 is 5 hours and 15 minutes, which is 315 total minutes or 5.25 total hours.",
    notes: [
      "If the end time is earlier than the start time, the calculator treats the end time as the next day. For example, 23:00 to 01:30 returns 2 hours 30 minutes.",
      "The result is a clock duration rather than a date. The calculator does not account for daylight-saving changes because only times are entered.",
      "The time fields use hours and minutes, so seconds are not part of the result.",
    ],
    faqs: [
      {
        question:
          "Why did I get a result when the end time is earlier than the start time?",
        answer:
          "The calculator assumes the end time falls on the next day and adds 24 hours before subtracting. This is useful for overnight shifts of less than 24 hours.",
      },
      {
        question: "Does the result include seconds?",
        answer:
          "No. The time fields use hours and minutes, and the duration is displayed in hours and minutes.",
      },
      {
        question: "How do I convert the result to decimal hours?",
        answer:
          "The calculator displays total hours to two decimal places. You can also divide the total minutes by 60.",
      },
      {
        question: "Can it calculate an overnight shift?",
        answer:
          "Yes, provided the shift is shorter than 24 hours. Enter the actual start and end times and the next-day assumption handles the crossing of midnight.",
      },
    ],
  },

  "/date-difference": {
    label: "Date & time guide",
    title: "How the Date Difference Calculator works",
    intro:
      "This calculator counts the number of days between two calendar dates. It also breaks the total into years, months, and days.",
    howTo: [
      "Enter the start date.",
      "Enter the end date.",
      "Select Calculate Difference.",
      "Read the total number of days and the years, months, and days breakdown.",
    ],
    formula:
      "Total days = the absolute difference between the two dates in whole days. The breakdown divides the total by 365 days per year and 30 days per month.",
    example:
      "From January 1, 2026 to March 1, 2026 is 59 days. The calculator shows 0 years, 1 month, and 29 days because 59 days is treated as one 30-day month plus 29 days.",
    notes: [
      "The total day count is the primary result. The years, months, and days breakdown is approximate because it uses 365-day years and 30-day months.",
      "The order of the dates does not affect the result because the calculator uses the absolute difference.",
      "Dates are compared at midnight, so times of day are not part of the calculation.",
      "The total day count reflects the actual calendar dates, including leap years.",
    ],
    faqs: [
      {
        question: "Why is the month value not a true calendar month?",
        answer:
          "The breakdown uses a fixed 30-day month, so it is an approximate decomposition of the total days rather than a count of calendar month boundaries.",
      },
      {
        question: "Does the end date count as an extra day?",
        answer:
          "No. The result measures the span between the two dates; it does not add a day for the end date.",
      },
      {
        question: "Can I compare dates in the past?",
        answer:
          "Yes. Any valid dates can be compared because the calculator uses the absolute difference between them.",
      },
      {
        question: "Does the calculator account for leap years?",
        answer:
          "The total day count comes from the actual dates, so leap days are included. Only the year and month breakdown uses fixed 365-day and 30-day conversions.",
      },
    ],
  },

  "/speed": {
    label: "Everyday guide",
    title: "How the Speed Calculator works",
    intro:
      "This calculator finds average speed from the distance traveled and the time taken. Distance is entered in kilometers and time in hours.",
    howTo: [
      "Enter the distance in kilometers.",
      "Enter the time in hours. Use a decimal for partial hours, such as 1.5 for 90 minutes.",
      "Select Calculate Speed.",
      "Read the average speed in kilometers per hour and miles per hour.",
    ],
    formula: "Speed = Distance ÷ Time",
    example:
      "A distance of 120 km covered in 2 hours gives an average speed of 60 km/h, which is about 37.28 mph.",
    notes: [
      "The time field uses hours, not minutes. Divide minutes by 60 before entering a partial hour.",
      "The result is the average speed for the whole trip and does not show changes in speed during the journey.",
      "The mph value is converted using 1 km/h = 0.621371 mph.",
    ],
    faqs: [
      {
        question: "How do I enter 45 minutes?",
        answer:
          "Divide 45 by 60 to get 0.75, then enter 0.75 in the time field.",
      },
      {
        question: "How is speed different from velocity?",
        answer:
          "This calculator returns average speed, which has no direction. Velocity also includes direction and is not calculated here.",
      },
      {
        question: "Can I use miles instead of kilometers?",
        answer:
          "The distance field is labeled in kilometers. Convert miles to kilometers before calculating; the result also shows the equivalent speed in mph.",
      },
      {
        question: "Why is the mph value not a whole number?",
        answer:
          "The kilometer-to-mile conversion is not exact, so the equivalent speed is usually a decimal rounded to two places.",
      },
    ],
  },

  "/distance": {
    label: "Everyday guide",
    title: "How the Distance Calculator works",
    intro:
      "This calculator estimates the distance traveled from an average speed and a travel time. Speed is entered in kilometers per hour and time in hours.",
    howTo: [
      "Enter the average speed in kilometers per hour.",
      "Enter the travel time in hours, using a decimal for partial hours.",
      "Select Calculate Distance.",
      "Read the distance in kilometers and miles.",
    ],
    formula: "Distance = Speed × Time",
    example:
      "At 60 km/h for 2 hours, the distance is 120 km, which is about 74.56 miles.",
    notes: [
      "The time must be entered in hours. For 30 minutes, enter 0.5.",
      "The result assumes the entered speed stays constant for the whole trip.",
      "The miles value is converted using 1 km = 0.621371 miles.",
      "The result is only as accurate as the speed and time you enter.",
    ],
    faqs: [
      {
        question: "Can I use this for walking or running?",
        answer:
          "Yes, as long as the speed is in km/h and the time is in hours. If you know pace in minutes per kilometer, use the Pace or Running Pace calculator first.",
      },
      {
        question: "How do I enter 2 hours 30 minutes?",
        answer:
          "Combine the time as 2.5 hours and enter 2.5.",
      },
      {
        question: "Why might the calculated distance differ from a real trip?",
        answer:
          "The result depends on the speed and time entered. If the speed is an estimate rather than a measured average, the calculated distance inherits that uncertainty.",
      },
      {
        question: "Does this calculator account for direction?",
        answer:
          "No. It estimates distance traveled rather than displacement or route direction.",
      },
    ],
  },

  "/pace": {
    label: "Fitness guide",
    title: "How the Pace Calculator works",
    intro:
      "This calculator converts a distance and total time into pace per kilometer and per mile. It also shows the average speed for the same distance and time.",
    howTo: [
      "Enter the distance in kilometers.",
      "Enter the total time using the hours, minutes, and seconds fields.",
      "Select Calculate Pace.",
      "Read the pace per kilometer, pace per mile, total time, and average speed.",
    ],
    formula:
      "Pace per km = Total time in seconds ÷ Distance in km. Pace per mile = Pace per km × 1.609344.",
    example:
      "Running 10 km in 1:30:00 gives 5,400 seconds ÷ 10 = 540 seconds per km, or 9:00 /km. That is about 14:29 /mile and an average speed of 6.67 km/h.",
    notes: [
      "The result is the average pace for the whole distance, not the pace of each kilometer.",
      "Keep the minutes and seconds fields within 0–59 when possible, and carry larger values into the hours field.",
      "A faster time over the same distance produces a lower pace value.",
    ],
    faqs: [
      {
        question: "What is the difference between pace and speed?",
        answer:
          "Pace is time per unit of distance, while speed is distance per unit of time. This calculator displays both.",
      },
      {
        question: "How is pace per mile calculated?",
        answer:
          "The pace per kilometer is multiplied by 1.609344, the number of kilometers in a mile.",
      },
      {
        question: "Why is my pace different from a running app?",
        answer:
          "Apps may use GPS distance, moving time, or different rounding. This calculator divides the exact distance and total time you enter.",
      },
      {
        question: "Can I use this calculator for walking?",
        answer:
          "Yes. Any distance and time can be converted to pace; the page mentions running because pace is commonly used for running.",
      },
    ],
  },

  "/running-speed": {
    label: "Fitness guide",
    title: "How the Running Speed Calculator works",
    intro:
      "This calculator converts a running distance and total time into average speed in kilometers per hour and miles per hour.",
    howTo: [
      "Enter the running distance in kilometers.",
      "Enter the total time using the hours, minutes, and seconds fields.",
      "Select Calculate Speed.",
      "Read the average speed in km/h and mph.",
    ],
    formula:
      "Speed = Distance ÷ Total time in hours",
    example:
      "A 10 km run completed in 1:30:00 takes 1.5 hours, so the average speed is 10 ÷ 1.5 = 6.67 km/h, or about 4.14 mph.",
    notes: [
      "The result is the average speed for the full run, including any walking or stops within the entered total time.",
      "If you know pace in minutes per kilometer but not total time, use the Running Time calculator to find the duration first.",
      "The mph value is converted using 1 km/h = 0.621371 mph.",
    ],
    faqs: [
      {
        question: "How is running speed different from running pace?",
        answer:
          "Speed is distance per hour, while pace is minutes per kilometer or mile. They describe the same run from opposite directions.",
      },
      {
        question: "Should I enter moving time or total time?",
        answer:
          "That depends on what you want to measure. The calculator uses exactly the elapsed time you enter, so choose one convention and use it consistently.",
      },
      {
        question: "Why are two speed units shown?",
        answer:
          "The calculator converts the km/h result to mph so the same run can be read in either unit.",
      },
      {
        question: "Can I enter the distance in miles?",
        answer:
          "The distance field is in kilometers. Convert miles to kilometers first, or read the equivalent mph result shown by the calculator.",
      },
    ],
  },

  "/time-to-run": {
    label: "Fitness guide",
    title: "How the Time to Run Calculator works",
    intro:
      "This calculator estimates how long a distance will take at a chosen average speed. Distance is entered in kilometers and speed in kilometers per hour.",
    howTo: [
      "Enter the distance in kilometers.",
      "Enter the speed in kilometers per hour.",
      "Select Calculate Time.",
      "Read the estimated time in hours, minutes, and seconds.",
    ],
    formula: "Time in hours = Distance ÷ Speed",
    example:
      "Running 5 km at 12 km/h takes 5 ÷ 12 = 0.4167 hours, which is 25 minutes or 1,500 seconds.",
    notes: [
      "The estimate assumes the chosen speed is held for the entire distance.",
      "The result is rounded to the nearest second.",
      "This tool takes speed, not pace. Use the Running Time calculator if you know minutes per kilometer.",
    ],
    faqs: [
      {
        question: "How do I convert the result to minutes?",
        answer:
          "The calculator shows total minutes below the hours, minutes, and seconds result. You can also multiply total hours by 60.",
      },
      {
        question: "What speed should I enter?",
        answer:
          "Use an average speed you can realistically sustain for the full distance rather than a short burst.",
      },
      {
        question: "Does the estimate include warm-up or rest stops?",
        answer:
          "No. It is a constant-speed estimate and does not add breaks.",
      },
      {
        question: "Can I use this for cycling or walking?",
        answer:
          "Yes. Any distance in kilometers and speed in km/h can be used, although the page is labeled for running.",
      },
    ],
  },

  "/running-time": {
    label: "Fitness guide",
    title: "How the Running Time Calculator works",
    intro:
      "This calculator estimates total running time from a distance and a pace per kilometer. Pace is entered as minutes and seconds.",
    howTo: [
      "Enter the running distance in kilometers.",
      "Enter the pace minutes per kilometer.",
      "Enter the pace seconds per kilometer.",
      "Select Calculate Running Time.",
      "Read the total time in hours, minutes, and seconds.",
    ],
    formula:
      "Running time = Distance × Pace per kilometer",
    example:
      "At 6:30 per kilometer, a 10 km run takes 10 × 390 seconds = 3,900 seconds, which is 1:05:00 or 65 minutes.",
    notes: [
      "The pace seconds field accepts values below 60. Enter 90 seconds as 1 minute and 30 seconds in the two fields.",
      "The pace is assumed to stay constant for the whole run.",
      "The result is rounded to the nearest second.",
    ],
    faqs: [
      {
        question: "What if I only know my speed?",
        answer:
          "Convert speed to pace first. For example, 12 km/h equals 5:00 per kilometer, which you can enter as 5 minutes and 0 seconds.",
      },
      {
        question: "Why are pace minutes and seconds separate fields?",
        answer:
          "Pace is commonly written as minutes and seconds, such as 6:30, so the calculator accepts both parts directly.",
      },
      {
        question: "Can I enter a pace of 6.5 minutes?",
        answer:
          "Enter 6 in the minutes field and 30 in the seconds field. Decimal minutes are not accepted as a single combined value.",
      },
      {
        question: "Does the calculator add a warm-up or cool-down?",
        answer:
          "No. It calculates running time from the distance and pace only.",
      },
    ],
  },

  "/running-pace": {
    label: "Fitness guide",
    title: "How the Running Pace Calculator works",
    intro:
      "This calculator finds average running pace per kilometer and per mile from a distance and total time. It also shows the equivalent average speed.",
    howTo: [
      "Enter the running distance in kilometers.",
      "Enter the total time using the hours, minutes, and seconds fields.",
      "Select Calculate Pace.",
      "Read the pace per kilometer, pace per mile, and average speed.",
    ],
    formula:
      "Pace per km = Total time in seconds ÷ Distance in km. Pace per mile = Pace per km × 1.609344.",
    example:
      "A 10 km run in 50:00 gives 3,000 seconds ÷ 10 = 300 seconds per km, or 5:00 /km. That is about 8:03 /mile and 12.00 km/h.",
    notes: [
      "The minutes and seconds fields are limited to 0–59. Enter 75 minutes as 1 hour and 15 minutes.",
      "The result is the average pace for the whole distance.",
      "Pace per mile uses the exact conversion 1 mile = 1.609344 kilometers.",
    ],
    faqs: [
      {
        question: "How is this different from the Pace Calculator?",
        answer:
          "Both use the same pace formula. The Running Pace Calculator limits minutes and seconds to 0–59 and is labeled for running.",
      },
      {
        question: "What is a good running pace?",
        answer:
          "That depends on fitness, distance, terrain, and goals. The calculator measures your pace but does not judge whether it is fast or slow.",
      },
      {
        question: "Why do pace and speed move in opposite directions?",
        answer:
          "A faster run covers more distance per hour but takes fewer minutes per kilometer.",
      },
      {
        question: "Should I use moving time or total elapsed time?",
        answer:
          "Use the time that matches what you want to measure. The calculator simply divides the total time you enter by the distance.",
      },
    ],
  },
};

// ======================================================
// CATEGORY FALLBACKS
// ======================================================

const categoryFallbacks = {
  Math: {
    label: "Math guide",
    title: "How this math calculator works",
    intro:
      "This calculator simplifies a mathematical task by applying the method supported by the tool to the values you enter.",
    howTo: [
      "Enter the values requested by the calculator.",
      "Check the numbers and units.",
      "Calculate and review the result.",
    ],
    notes: [
      "Check your inputs before calculating.",
      "Use consistent units when required.",
      "Results depend on the values entered.",
    ],
  },

  Finance: {
    label: "Finance guide",
    title: "Understanding this financial calculation",
    intro:
      "This calculator provides an estimate using the financial values and calculation method supported by the tool.",
    howTo: [
      "Enter the requested financial values.",
      "Review amounts, rates, and time periods.",
      "Calculate and compare scenarios when useful.",
    ],
    notes: [
      "Fees, taxes, timing, and other assumptions may affect real-world results.",
      "Calculator results are estimates.",
      "Verify important financial information using the relevant provider or official source.",
    ],
  },

  Business: {
    label: "Business guide",
    title: "Understanding this business calculation",
    intro:
      "This calculator helps analyze a business-related value using the inputs and method supported by the tool.",
    howTo: [
      "Enter the requested business values.",
      "Check costs, prices, and units.",
      "Calculate and review the resulting estimate.",
    ],
    notes: [
      "Business calculations depend on the assumptions entered.",
      "Changes in costs or revenue can change the result.",
      "Actual business performance can differ from estimates.",
    ],
  },

  Health: {
    label: "Health guide",
    title: "Understanding this health calculation",
    intro:
      "This calculator provides a numerical estimate based on the information entered.",
    howTo: [
      "Enter the requested measurements.",
      "Check the units carefully.",
      "Calculate and review the result.",
    ],
    notes: [
      "Use accurate measurements where possible.",
      "Different situations may require additional context.",
      "Calculator results should not replace professional guidance when needed.",
    ],
  },

  Education: {
    label: "Education guide",
    title: "Understanding this education calculation",
    intro:
      "This calculator helps perform a common educational calculation using the information provided.",
    howTo: [
      "Enter the requested academic information.",
      "Check grades, credits, or other values.",
      "Calculate and review the result.",
    ],
    notes: [
      "Schools and institutions may use different methods.",
      "Confirm the relevant scale or rules.",
      "Results depend on the data entered.",
    ],
  },

  "Date & Time": {
    label: "Date & time guide",
    title: "Understanding this date and time calculation",
    intro:
      "This calculator helps measure, compare, or convert dates and times using the values entered.",
    howTo: [
      "Enter the required dates or times.",
      "Check the selected units or time zones.",
      "Calculate and review the result.",
    ],
    notes: [
      "Exact dates and times can affect the result.",
      "Time zones and daylight-saving rules can matter.",
      "Check the selected dates carefully.",
    ],
  },

  Everyday: {
    label: "Everyday guide",
    title: "Understanding this everyday calculation",
    intro:
      "This calculator simplifies a common everyday task by handling the arithmetic for you.",
    howTo: [
      "Enter the requested values.",
      "Check the units and numbers.",
      "Calculate and review the result.",
    ],
    notes: [
      "Results depend on the information entered.",
      "Check units before calculating.",
      "Real-world conditions can cause actual results to differ.",
    ],
  },

  Fitness: {
    label: "Fitness guide",
    title: "Understanding this fitness calculation",
    intro:
      "This calculator estimates a fitness-related value using the measurements and information entered.",
    howTo: [
      "Enter the requested measurements.",
      "Check distance, time, pace, or other units.",
      "Calculate and review the result.",
    ],
    notes: [
      "Use consistent units.",
      "Estimates can vary based on conditions.",
      "Use results as guidance rather than a guarantee.",
    ],
  },
};

// ======================================================
// DEFAULT FAQ
// ======================================================

const defaultFaqs = (calculatorName) => [
  {
    question: `How does the ${calculatorName} work?`,
    answer:
      "The calculator applies its supported calculation method to the information entered and displays the resulting value.",
  },
  {
    question: "Can I calculate again with different values?",
    answer:
      "Yes. Change the input values and calculate again to get an updated result.",
  },
  {
    question: "What should I check if the result looks wrong?",
    answer:
      "Review the numbers, dates, units, and other inputs to make sure they match what the calculator requests.",
  },
];

// ======================================================
// COMPONENT
// ======================================================

export default function CalculatorGuide({
  calculator,
}) {
  const guide =
    guides[calculator.path] ||
    categoryFallbacks[calculator.category] || {
      label: "CALVORO guide",
      title: `How to use the ${calculator.name}`,
      intro:
        `This guide explains the basic use of the ${calculator.name} and the type of information needed to produce a result.`,
      howTo: [
        "Enter the requested information.",
        "Check your values carefully.",
        "Calculate and review the result.",
      ],
      notes: [
        "Check your inputs carefully.",
        "Use the correct units where applicable.",
        "Results depend on the values entered.",
      ],
    };

  const faqs =
    guide.faqs ||
    defaultFaqs(calculator.name);

  const formula =
    guide.formula ||
    `The ${calculator.name} applies the calculation method supported by the tool to the values you provide.`;

  const example =
    guide.example ||
    `Enter the required values into the ${calculator.name}, calculate the result, and review the output provided by the tool.`;

  return (
    <section className="calvoro-calculator-guide">

      <style>
        {`
          .calvoro-calculator-guide {
            margin-top: 28px;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            overflow: hidden;
          }

          .calvoro-guide-header {
            padding: 31px 30px;
            background:
              linear-gradient(
                135deg,
                #f8fafc,
                #eff6ff
              );
            border-bottom: 1px solid #e2e8f0;
          }

          .calvoro-guide-label {
            display: inline-flex;
            padding: 6px 9px;
            border-radius: 4px;
            background: #dbeafe;
            color: #1d4ed8;
            font-size: 9px;
            font-weight: 900;
            letter-spacing: 1px;
            text-transform: uppercase;
          }

          .calvoro-guide-header h2 {
            margin: 13px 0 10px;
            color: #0f172a;
            font-size: 29px;
            line-height: 1.2;
            font-weight: 900;
            letter-spacing: -.035em;
          }

          .calvoro-guide-header p {
            max-width: 800px;
            margin: 0;
            color: #64748b;
            font-size: 14px;
            line-height: 1.85;
          }

          .calvoro-guide-body {
            padding: 30px;
          }

          .calvoro-guide-section {
            margin-bottom: 34px;
          }

          .calvoro-guide-section:last-child {
            margin-bottom: 0;
          }

          .calvoro-guide-section h3 {
            margin: 0 0 13px;
            color: #0f172a;
            font-size: 21px;
            font-weight: 900;
          }

          .calvoro-guide-section p {
            margin: 0 0 12px;
            color: #64748b;
            font-size: 14px;
            line-height: 1.85;
          }

          .calvoro-guide-steps {
            display: grid;
            gap: 10px;
          }

          .calvoro-guide-step {
            display: grid;
            grid-template-columns: 36px minmax(0, 1fr);
            gap: 12px;
            align-items: start;
            padding: 16px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 7px;
          }

          .calvoro-guide-step-number {
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: #2563eb;
            color: #ffffff;
            font-size: 12px;
            font-weight: 900;
          }

          .calvoro-guide-step-text {
            padding-top: 5px;
            color: #334155;
            font-size: 13px;
            line-height: 1.65;
            font-weight: 700;
          }

          .calvoro-guide-formula {
            padding: 18px;
            background: #eff6ff;
            border: 1px solid #bfdbfe;
            border-radius: 7px;
            color: #17358f;
            font-size: 15px;
            line-height: 1.7;
            font-weight: 800;
          }

          .calvoro-guide-example {
            padding: 18px;
            background: #f8fafc;
            border-left: 4px solid #2563eb;
            color: #475569;
            font-size: 14px;
            line-height: 1.8;
          }

          .calvoro-guide-notes {
            display: grid;
            gap: 9px;
          }

          .calvoro-guide-note {
            padding: 14px 16px;
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            color: #64748b;
            font-size: 13px;
            line-height: 1.7;
          }

          .calvoro-guide-faq {
            display: grid;
            gap: 9px;
          }

          .calvoro-guide-faq details {
            border: 1px solid #e2e8f0;
            border-radius: 7px;
            background: #ffffff;
          }

          .calvoro-guide-faq summary {
            padding: 16px 17px;
            cursor: pointer;
            color: #0f172a;
            font-size: 13px;
            font-weight: 850;
            line-height: 1.5;
          }

          .calvoro-guide-faq p {
            margin: 0;
            padding: 0 17px 17px;
            color: #64748b;
            font-size: 13px;
            line-height: 1.8;
          }

          @media (max-width: 650px) {

            .calvoro-guide-header {
              padding: 24px 20px;
            }

            .calvoro-guide-header h2 {
              font-size: 24px;
            }

            .calvoro-guide-body {
              padding: 22px 18px;
            }

            .calvoro-guide-section h3 {
              font-size: 19px;
            }

            .calvoro-guide-step {
              grid-template-columns: 32px minmax(0, 1fr);
              padding: 14px;
            }

          }
        `}
      </style>

      {/* HEADER */}

      <div className="calvoro-guide-header">

        <span className="calvoro-guide-label">
          {guide.label}
        </span>

        <h2>
          {guide.title}
        </h2>

        <p>
          {guide.intro}
        </p>

      </div>

      <div className="calvoro-guide-body">

        {/* QUICK GUIDE */}

        <section className="calvoro-guide-section">

          <h3>
            How to use the {calculator.name}
          </h3>

          <div className="calvoro-guide-steps">

            {guide.howTo.map(
              (step, index) => (
                <div
                  key={index}
                  className="calvoro-guide-step"
                >

                  <span className="calvoro-guide-step-number">
                    {index + 1}
                  </span>

                  <div className="calvoro-guide-step-text">
                    {step}
                  </div>

                </div>
              )
            )}

          </div>

        </section>

        {/* FORMULA */}

        <section className="calvoro-guide-section">

          <h3>
            Calculation method
          </h3>

          <div className="calvoro-guide-formula">
            {formula}
          </div>

        </section>

        {/* EXAMPLE */}

        <section className="calvoro-guide-section">

          <h3>
            Example
          </h3>

          <div className="calvoro-guide-example">
            {example}
          </div>

        </section>

        {/* NOTES */}

        <section className="calvoro-guide-section">

          <h3>
            Important notes
          </h3>

          <div className="calvoro-guide-notes">

            {guide.notes.map(
              (note, index) => (
                <div
                  key={index}
                  className="calvoro-guide-note"
                >
                  {note}
                </div>
              )
            )}

          </div>

        </section>

        {/* FAQ */}

        <section className="calvoro-guide-section">

          <h3>
            Frequently asked questions
          </h3>

          <div className="calvoro-guide-faq">

            {faqs.map(
              (faq, index) => (
                <details key={index}>

                  <summary>
                    {faq.question}
                  </summary>

                  <p>
                    {faq.answer}
                  </p>

                </details>
              )
            )}

          </div>

        </section>

      </div>

    </section>
  );
}