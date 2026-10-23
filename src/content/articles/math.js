export const mathArticles = [
  {
    slug: "how-to-calculate-percentage",
    title: "How to Calculate Percentage Easily",
    category: "Math",
    date: "2026-09-30",
    excerpt:
      "Learn the three percentage questions people ask most often, with worked examples, the percentage-change formula, and common mistakes to avoid.",
    tool: { name: "Percentage Calculator", path: "/percentage" },
    takeaways: [
      "A percentage compares a part with a whole and expresses the result out of 100.",
      "The basic relationship is part = percent ÷ 100 × whole.",
      "Percentage change compares a new value with an original value, while percentage points describe a simple difference between two percentages.",
    ],
    sections: [
      {
        heading: "What a Percentage Actually Means",
        paragraphs: [
          "The word percent means 'per hundred.' When you say that 25% of a group is left-handed, you mean that 25 out of every 100 people in that group fit the description. The same idea works for money, exam marks, distances, and any other quantity that can be divided into parts.",
          "A percentage is therefore a fraction with 100 in the denominator. 25% is the same as 25/100, or 0.25. Moving between the percent form and the decimal form is the first step in most percentage calculations.",
        ],
        list: [
          "Percent to decimal: divide by 100. For example, 18% = 0.18.",
          "Decimal to percent: multiply by 100. For example, 0.07 = 7%.",
          "Fraction to percent: divide the numerator by the denominator, then multiply by 100. For example, 3/4 = 0.75 = 75%.",
        ],
      },
      {
        heading: "The Basic Percentage Formula",
        paragraphs: [
          "Most percentage questions can be answered with one relationship: part = percent ÷ 100 × whole. The 'whole' is the full amount, the 'percent' is the share you want, and the 'part' is the resulting amount.",
          "If you know any two of the three quantities, you can rearrange the formula to find the third. This is why a percentage calculator can answer several different types of question without needing a separate formula for each one.",
        ],
        formula: "Part = (Percent ÷ 100) × Whole",
        example: {
          title: "Example: 18% of 250",
          lines: [
            "Convert the percentage to a decimal: 18 ÷ 100 = 0.18.",
            "Multiply by the whole: 0.18 × 250 = 45.",
            "So 18% of 250 is 45.",
          ],
        },
      },
      {
        heading: "The Three Questions Percentages Answer",
        paragraphs: [
          "A useful way to approach percentage problems is to identify which quantity is missing. The wording of the question usually tells you whether you are looking for the part, the percent, or the whole.",
        ],
        list: [
          "Find the part: What is 30% of 80? Multiply 0.30 × 80 = 24.",
          "Find the percent: 24 is what percent of 80? Divide 24 ÷ 80 = 0.30, then multiply by 100 to get 30%.",
          "Find the whole: 24 is 30% of what number? Divide 24 ÷ 0.30 = 80.",
        ],
        note:
          "When the percent is the unknown, divide the part by the whole before converting to a percentage. Dividing in the other order gives a decimal that does not represent the share.",
      },
      {
        heading: "Percentage Increase and Decrease",
        paragraphs: [
          "Percentage change compares a new value with the original value. Subtract the original from the new value, divide by the original, and multiply by 100. A positive result is an increase; a negative result is a decrease.",
          "The original value always belongs in the denominator. Using the new value instead is a common mistake and produces a different, misleading answer.",
        ],
        formula: "Percentage change = ((New − Original) ÷ Original) × 100",
        example: {
          title: "Example: a price rises from 80 to 92",
          lines: [
            "Subtract the original: 92 − 80 = 12.",
            "Divide by the original: 12 ÷ 80 = 0.15.",
            "Multiply by 100: 0.15 × 100 = 15%.",
            "The price increased by 15%.",
          ],
        },
      },
      {
        heading: "Percentage Points Are Not Percentages",
        paragraphs: [
          "If an interest rate moves from 4% to 5%, it has risen by 1 percentage point. In relative terms, however, it has risen by 25%, because the change of 1 is one quarter of the original 4%. Both statements are correct, but they describe different comparisons.",
          "This distinction matters in news reports, product claims, and financial documents. When someone says a rate 'increased by 5%,' check whether they mean 5 percentage points or a 5% relative change.",
        ],
        example: {
          title: "Example: a rate moves from 10% to 12%",
          lines: [
            "The change in percentage points is 12 − 10 = 2 percentage points.",
            "The relative change is (12 − 10) ÷ 10 × 100 = 20%.",
            "The rate rose by 2 percentage points, or by 20% of its original value.",
          ],
        },
      },
      {
        heading: "Avoiding Common Percentage Errors",
        paragraphs: [
          "Percentage mistakes often come from mixing up the base, applying two changes as if they were additive, or forgetting to convert the percent to a decimal before multiplying. A quick estimate can catch many of these errors.",
          "For a 20% increase followed by a 20% decrease, the final value is not the original value. A 100 item becomes 120 after the increase, then 96 after the decrease, for a net change of −4%. The two percentages apply to different bases.",
        ],
        list: [
          "Check that the whole is the amount you are comparing against.",
          "Convert the percent to a decimal before multiplying.",
          "Treat successive percentage changes separately rather than adding them.",
          "Use a rough estimate to confirm that the answer is in the right range.",
        ],
      },
    ],
    faq: [
      {
        question: "How do I calculate a percentage without a calculator?",
        answer:
          "Use familiar benchmarks. Ten percent is one tenth, so move the decimal one place. Five percent is half of that, and one percent is one hundredth. Combine these pieces to estimate the result, then adjust if you need an exact figure.",
      },
      {
        question: "What is the difference between a percentage and a percentage point?",
        answer:
          "A percentage describes a share of a whole, such as 20% of a budget. A percentage point describes the arithmetic difference between two percentages. Moving from 20% to 25% is a change of 5 percentage points, which is a 25% relative increase.",
      },
      {
        question: "Why does a 50% increase not cancel a 50% decrease?",
        answer:
          "The two changes use different starting amounts. A 50% increase takes 100 to 150, but a 50% decrease from 150 takes it to 75. The net result is a 25% decrease from the original value.",
      },
    ],
  },
  {
    slug: "percentage-increase-and-decrease",
    title: "Percentage Increase and Decrease, Explained",
    category: "Math",
    date: "2026-10-03",
    excerpt:
      "Use the percentage-change formula confidently, work backward from a final price, and understand why successive percentage changes do not simply add up.",
    tool: { name: "Percentage Change Calculator", path: "/percentage-change" },
    takeaways: [
      "Percentage change is the difference divided by the original value, then multiplied by 100.",
      "A discount and a markup of the same percentage do not return a price to its starting point.",
      "To reverse a percentage change, divide by the multiplier rather than subtracting the percentage.",
    ],
    sections: [
      {
        heading: "The Percentage-Change Formula",
        paragraphs: [
          "Percentage change measures how far a value has moved relative to where it started. The formula is ((new − original) ÷ original) × 100. The sign of the result tells you the direction: positive for an increase and negative for a decrease.",
          "The original value is the anchor. If a shop raises a price from 40 to 50, the increase is 10, and 10 ÷ 40 × 100 = 25%. If you instead divided by 50, you would get 20%, which describes a different comparison and understates the increase.",
        ],
        formula: "Change (%) = ((New − Original) ÷ Original) × 100",
      },
      {
        heading: "Working Through an Increase",
        paragraphs: [
          "Suppose a subscription costs 240 per year and rises to 270. The absolute increase is 30. Divide 30 by the original 240 to get 0.125, then multiply by 100 to get 12.5%. The new price is 112.5% of the old price.",
          "You can also use a multiplier. An increase of 12.5% corresponds to multiplying by 1.125. Checking 240 × 1.125 gives 270, which confirms the result. Multipliers are especially useful when a value changes more than once.",
        ],
        example: {
          title: "Example: salary increase",
          lines: [
            "Original salary: 2,400 per month.",
            "New salary: 2,580 per month.",
            "Difference: 2,580 − 2,400 = 180.",
            "Change: 180 ÷ 2,400 × 100 = 7.5%.",
          ],
        },
      },
      {
        heading: "Working Through a Decrease",
        paragraphs: [
          "A decrease uses the same formula. If a jacket falls from 120 to 84, the difference is −36. Divide −36 by 120 to get −0.30, or −30%. The new price is 70% of the original, which corresponds to a multiplier of 0.70.",
          "Be careful with the wording of discounts. A '30% off' sale means the customer pays 70% of the original price. The discount itself is 30%, but the multiplier for the final price is 0.70.",
        ],
        example: {
          title: "Example: a 30% discount",
          lines: [
            "Original price: 120.",
            "Discount: 30% of 120 = 0.30 × 120 = 36.",
            "Sale price: 120 − 36 = 84.",
            "As a multiplier: 120 × 0.70 = 84.",
          ],
        },
      },
      {
        heading: "Reversing a Percentage Change",
        paragraphs: [
          "If you know the final value and the percentage change, you can recover the original. Divide the final value by the multiplier. For a 25% increase, divide by 1.25. For a 30% decrease, divide by 0.70.",
          "A common mistake is to subtract the percentage from the final value. That treats the final value as the base, which is incorrect. The original must be recovered by division.",
        ],
        example: {
          title: "Example: finding the pre-sale price",
          lines: [
            "An item costs 84 after a 30% discount.",
            "The sale price represents 70% of the original.",
            "Original = 84 ÷ 0.70 = 120.",
            "Subtracting 30% of 84 would give 58.80, which is not the original price.",
          ],
        },
      },
      {
        heading: "Why Successive Changes Do Not Add",
        paragraphs: [
          "Percentage changes apply to the current value, not to the original value. A 20% increase followed by a 20% decrease therefore does not return to the starting point. The increase uses the original as its base, while the decrease uses the larger intermediate value.",
          "To combine changes, multiply their multipliers. A 20% increase is ×1.20, and a 20% decrease is ×0.80. The combined multiplier is 1.20 × 0.80 = 0.96, which is a 4% decrease overall.",
        ],
        note:
          "When a problem involves several percentage changes, convert each one to a multiplier and multiply them in order. This avoids adding percentages that are based on different amounts.",
      },
      {
        heading: "Using Percentage Change Correctly",
        paragraphs: [
          "Percentage change is useful for sales growth, price movements, weight changes, and performance comparisons. It is most informative when the base is meaningful and large enough that small absolute changes do not produce misleading percentages.",
          "If a value rises from 1 to 2, that is a 100% increase, even though the absolute change is only 1. Always report the original value alongside the percentage when the context matters.",
        ],
        list: [
          "Use the original value in the denominator.",
          "Keep the sign to show direction, or state 'increase' or 'decrease' explicitly.",
          "Multiply successive multipliers rather than adding percentages.",
          "Report the base when a percentage could be misunderstood.",
        ],
      },
    ],
    faq: [
      {
        question: "How do I calculate a percentage decrease?",
        answer:
          "Subtract the new value from the original, divide by the original, and multiply by 100. For example, a fall from 80 to 60 is (60 − 80) ÷ 80 × 100 = −25%, which is a 25% decrease.",
      },
      {
        question: "What is a 20% increase followed by a 20% decrease?",
        answer:
          "It is a net decrease of 4%. The multipliers are 1.20 and 0.80, and 1.20 × 0.80 = 0.96. The final value is 96% of the original.",
      },
      {
        question: "Can percentage change be greater than 100%?",
        answer:
          "Yes. A value that doubles has increased by 100%, and a value that triples has increased by 200%. The percentage describes the change relative to the original, not a share that must stay below 100%.",
      },
    ],
  },
  {
    slug: "how-to-calculate-an-average",
    title: "How to Calculate an Average (Mean) Correctly",
    category: "Math",
    date: "2026-10-05",
    excerpt:
      "Find the mean of a list of numbers, understand when the average can mislead, and see how median and weighted averages differ from a simple mean.",
    tool: { name: "Average Calculator", path: "/average" },
    takeaways: [
      "The mean is the sum of the values divided by the number of values.",
      "A single extreme value can pull the mean away from the typical value.",
      "A weighted average gives some values more influence than others.",
    ],
    sections: [
      {
        heading: "The Mean in One Sentence",
        paragraphs: [
          "The arithmetic mean, usually called the average, is the total of all the values divided by how many values there are. It is the balance point of a list: every value contributes equally to the result.",
          "For the numbers 4, 7, 9, and 12, the sum is 32 and there are four values, so the mean is 32 ÷ 4 = 8. The mean does not have to appear in the original list.",
        ],
        formula: "Mean = Sum of all values ÷ Number of values",
        example: {
          title: "Example: average daily step count",
          lines: [
            "Steps over five days: 6,200; 7,100; 5,800; 8,000; 7,400.",
            "Total: 6,200 + 7,100 + 5,800 + 8,000 + 7,400 = 34,500.",
            "Mean: 34,500 ÷ 5 = 6,900 steps per day.",
          ],
        },
      },
      {
        heading: "Mean, Median, and Mode",
        paragraphs: [
          "The mean is only one way to summarize a list. The median is the middle value after the numbers are sorted, and the mode is the value that appears most often. Each measure answers a slightly different question.",
          "When a list contains an outlier, the median can be more representative than the mean. For incomes or house prices, where a few very large values can dominate the total, the median is often the better description of a typical case.",
        ],
        list: [
          "Mean: the sum divided by the count; uses every value.",
          "Median: the middle value; resistant to extreme values.",
          "Mode: the most frequent value; useful for categories or repeated values.",
        ],
      },
      {
        heading: "How Outliers Affect the Mean",
        paragraphs: [
          "Consider the values 10, 12, 13, 14, and 101. The mean is 150 ÷ 5 = 30, which is higher than four of the five values. The outlier raises the average without representing a typical observation.",
          "This is not a flaw in the arithmetic; it is a property of the mean. If your goal is to describe the typical value in a skewed list, report the median as well, or explain why the extreme value belongs in the data.",
        ],
        example: {
          title: "Example: a high outlier",
          lines: [
            "Values: 10, 12, 13, 14, 101.",
            "Mean: 150 ÷ 5 = 30.",
            "Median: 13, the middle value.",
            "The mean is pulled upward by the value 101.",
          ],
        },
      },
      {
        heading: "Averages of Averages",
        paragraphs: [
          "You cannot always average two group averages by adding them and dividing by two. If one group has many more observations than the other, its average should carry more weight. The correct overall mean is the combined total divided by the combined count.",
          "Suppose group A has 10 people with an average of 20, and group B has 30 people with an average of 40. The overall average is not 30. The totals are 200 and 1,200, so the combined mean is 1,400 ÷ 40 = 35.",
        ],
        formula: "Combined mean = (Total A + Total B) ÷ (Count A + Count B)",
      },
      {
        heading: "When to Use a Weighted Average",
        paragraphs: [
          "A weighted average gives different values different levels of importance. Grades based on credits, portfolio returns based on investment amounts, and survey results weighted by population are common examples.",
          "The method is the same as a simple mean, except each value is multiplied by its weight before summing. Divide the weighted total by the sum of the weights. We cover the calculation in more detail in our guide to weighted averages.",
        ],
        note:
          "Weights can be counts, credits, percentages, or any positive values that reflect relative importance. They do not need to add up to 100, as long as you divide by their actual sum.",
      },
      {
        heading: "Checking an Average",
        paragraphs: [
          "A quick check can catch many errors. The mean must lie between the smallest and largest values. If it falls outside that range, you have probably divided by the wrong count or included an extra value.",
          "It is also useful to ask whether every value should count equally. If not, a weighted average may be more appropriate. If the list is skewed, report the median alongside the mean so readers can see the difference.",
        ],
        list: [
          "Confirm the count matches the number of values you added.",
          "Check that the mean lies within the range of the data.",
          "Look for missing values or accidental zeros.",
          "Report the median when the data is heavily skewed.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the difference between mean and average?",
        answer:
          "In everyday use, average usually means the arithmetic mean. In statistics, average can refer to the mean, median, or mode, so it is clearer to name the specific measure you used.",
      },
      {
        question: "Can the average be a number that is not in the list?",
        answer:
          "Yes. The mean of 2 and 4 is 3, even though 3 does not appear in the list. The mean is a calculated balance point, not necessarily an observed value.",
      },
      {
        question: "How do I average percentages?",
        answer:
          "Average percentages directly only when the underlying totals are similar. If the percentages come from different-sized groups, convert each one back to a count or amount, combine the totals, and then recalculate the percentage.",
      },
    ],
  },
  {
    slug: "how-to-add-subtract-multiply-fractions",
    title: "How to Add, Subtract, Multiply, and Divide Fractions",
    category: "Math",
    date: "2026-10-07",
    excerpt:
      "A practical guide to fraction arithmetic: common denominators, reciprocals, simplification, mixed numbers, and the mistakes that cause most errors.",
    tool: { name: "Fraction Calculator", path: "/fraction" },
    takeaways: [
      "Add and subtract fractions only after the denominators match.",
      "Multiply numerators and denominators directly; divide by multiplying by the reciprocal.",
      "Simplify the final answer by dividing the numerator and denominator by their greatest common divisor.",
    ],
    sections: [
      {
        heading: "The Parts of a Fraction",
        paragraphs: [
          "A fraction shows a division relationship. In 3/4, the numerator 3 tells you how many parts are being counted, and the denominator 4 tells you how many equal parts make a whole. The same fraction can be written in many equivalent forms, such as 6/8 or 75/100.",
          "Simplifying a fraction means dividing the numerator and denominator by a common factor. 6/8 simplifies to 3/4 because both numbers are divisible by 2. A fraction is in simplest form when the only common factor is 1.",
        ],
        formula: "a/b where b ≠ 0",
      },
      {
        heading: "Adding and Subtracting Fractions",
        paragraphs: [
          "You can only add or subtract fractions when the denominators are the same, because the denominator names the size of each part. If the denominators differ, rewrite one or both fractions with a common denominator first.",
          "The least common denominator is the smallest number that both denominators divide into. For 1/4 and 1/6, the least common denominator is 12: 1/4 = 3/12 and 1/6 = 2/12. Adding gives 5/12.",
        ],
        formula: "a/b + c/d = (ad + bc) ÷ bd",
        example: {
          title: "Example: 1/4 + 1/6",
          lines: [
            "Find a common denominator: 12.",
            "Rewrite: 1/4 = 3/12 and 1/6 = 2/12.",
            "Add the numerators: 3 + 2 = 5.",
            "Result: 5/12, which is already in simplest form.",
          ],
        },
      },
      {
        heading: "Subtracting with Borrowing",
        paragraphs: [
          "Mixed numbers contain a whole number and a fraction, such as 2 1/3. To subtract 2 1/3 from 5 1/4, convert both to improper fractions first, or borrow one whole from the larger number and convert it into a fraction.",
          "Converting to improper fractions is often less error-prone: 5 1/4 = 21/4 and 2 1/3 = 7/3. A common denominator of 12 gives 63/12 − 28/12 = 35/12, which is 2 11/12 as a mixed number.",
        ],
        example: {
          title: "Example: 5 1/4 − 2 1/3",
          lines: [
            "Convert: 5 1/4 = 21/4 and 2 1/3 = 7/3.",
            "Common denominator 12: 63/12 − 28/12 = 35/12.",
            "Convert back: 35/12 = 2 11/12.",
          ],
        },
      },
      {
        heading: "Multiplying Fractions",
        paragraphs: [
          "Multiplication is the simplest fraction operation: multiply the numerators, then multiply the denominators. There is no need for a common denominator. Simplify before multiplying when possible to keep the numbers small.",
          "For 2/3 × 9/10, you can divide 9 and 3 by 3 to get 2/1 × 3/10, then multiply to get 6/10, which simplifies to 3/5. Simplifying early reduces the chance of arithmetic errors.",
        ],
        formula: "a/b × c/d = (a × c) ÷ (b × d)",
        example: {
          title: "Example: 2/3 × 9/10",
          lines: [
            "Simplify across the fractions: 9 ÷ 3 = 3 and 3 ÷ 3 = 1.",
            "Multiply: (2 × 3) ÷ (1 × 10) = 6/10.",
            "Simplify: 6/10 = 3/5.",
          ],
        },
      },
      {
        heading: "Dividing Fractions",
        paragraphs: [
          "Dividing by a fraction is the same as multiplying by its reciprocal. The reciprocal swaps the numerator and denominator, so the reciprocal of 3/4 is 4/3. Change the division sign to multiplication and flip the second fraction.",
          "For 2/5 ÷ 3/7, rewrite as 2/5 × 7/3 = 14/15. Do not flip the first fraction; only the divisor is inverted.",
        ],
        formula: "a/b ÷ c/d = (a/b) × (d/c)",
        example: {
          title: "Example: 2/5 ÷ 3/7",
          lines: [
            "Reciprocal of 3/7 is 7/3.",
            "Multiply: 2/5 × 7/3 = 14/15.",
            "The result is already in simplest form.",
          ],
        },
      },
      {
        heading: "Common Fraction Mistakes",
        paragraphs: [
          "Most fraction errors come from applying a rule to the wrong operation. Adding numerators and denominators straight across is incorrect, and so is forgetting to invert the divisor when dividing.",
          "Always simplify the final result and check whether the answer makes sense. A fraction greater than one can be left as an improper fraction or converted to a mixed number; both forms are valid, but the context may call for one or the other.",
        ],
        list: [
          "Do not add denominators when adding fractions.",
          "Use a common denominator before subtracting.",
          "Flip only the fraction you are dividing by.",
          "Simplify using the greatest common divisor.",
          "Check that the answer is reasonable compared with the inputs.",
        ],
      },
    ],
    faq: [
      {
        question: "Why do fractions need a common denominator when adding?",
        answer:
          "The denominator describes the size of each part. You cannot add quarters and sixths directly because the parts are different sizes. Rewriting both fractions with the same denominator makes the parts comparable.",
      },
      {
        question: "How do I simplify a fraction?",
        answer:
          "Divide the numerator and denominator by their greatest common divisor. For 18/24, the greatest common divisor is 6, so the simplified fraction is 3/4.",
      },
      {
        question: "Can a fraction have a denominator of zero?",
        answer:
          "No. Division by zero is undefined, so a fraction with a zero denominator has no value. Any calculation that produces one should be treated as an error.",
      },
    ],
  },
  {
    slug: "ratios-and-proportions-explained",
    title: "Ratios and Proportions Explained with Everyday Examples",
    category: "Math",
    date: "2026-10-09",
    excerpt:
      "Understand part-to-part and part-to-whole ratios, simplify them, solve proportions, and apply scaling to recipes, maps, and shared costs.",
    tool: { name: "Ratio Calculator", path: "/ratio" },
    takeaways: [
      "A ratio compares quantities; a proportion states that two ratios are equal.",
      "Part-to-part and part-to-whole ratios answer different questions, so identify the whole first.",
      "Scaling a ratio preserves the relationship while changing the total amount.",
    ],
    sections: [
      {
        heading: "What a Ratio Represents",
        paragraphs: [
          "A ratio compares two or more quantities. If a recipe uses 2 cups of flour for every 1 cup of sugar, the ratio of flour to sugar is 2:1. The numbers describe a relationship, not necessarily the actual amounts in a single batch.",
          "Ratios can be written with a colon, as a fraction, or in words. The ratio 2:1 is equivalent to 2/1 and to the phrase 'two to one.' Each form carries the same comparison.",
        ],
        formula: "a : b or a/b",
      },
      {
        heading: "Part-to-Part vs Part-to-Whole",
        paragraphs: [
          "A part-to-part ratio compares two components of a group, such as boys to girls in a class. A part-to-whole ratio compares one component with the entire group, such as boys to all students.",
          "If a class has 12 boys and 18 girls, the part-to-part ratio is 12:18, or 2:3. The part-to-whole ratio for boys is 12:30, or 2:5. Confusing the two is one of the most common ratio errors.",
        ],
        example: {
          title: "Example: a class of 30 students",
          lines: [
            "Boys: 12, girls: 18, total: 30.",
            "Boys to girls: 12:18 = 2:3.",
            "Boys to all students: 12:30 = 2:5.",
            "Girls to all students: 18:30 = 3:5.",
          ],
        },
      },
      {
        heading: "Simplifying Ratios",
        paragraphs: [
          "Simplify a ratio by dividing every term by the same common factor. The ratio 15:20 simplifies to 3:4 when both terms are divided by 5. Simplifying makes the relationship easier to compare, but it does not change it.",
          "Ratios can involve decimals or fractions. Multiply all terms by a common multiple to remove fractions, then simplify as usual. The goal is a ratio with whole-number terms whenever possible.",
        ],
        list: [
          "Divide all terms by their greatest common factor.",
          "Keep the order of the terms; 2:3 is not the same as 3:2.",
          "Do not add the terms unless the question asks for the whole.",
        ],
      },
      {
        heading: "Solving a Proportion",
        paragraphs: [
          "A proportion says two ratios are equal, such as 3/4 = x/20. Cross-multiplication turns the proportion into an equation: 3 × 20 = 4 × x, so x = 15.",
          "Proportions are useful whenever a known relationship needs to be applied to a new total. If 3 out of every 4 students pass, and there are 20 students, the expected number is 15.",
        ],
        formula: "a/b = c/d implies a × d = b × c",
        example: {
          title: "Example: scaling a recipe",
          lines: [
            "A recipe uses 2 cups of flour for 12 cookies.",
            "You want 30 cookies: 2/12 = x/30.",
            "Cross-multiply: 2 × 30 = 12 × x, so 60 = 12x.",
            "x = 5 cups of flour.",
          ],
        },
      },
      {
        heading: "Splitting a Total in a Given Ratio",
        paragraphs: [
          "To divide a total into parts in a given ratio, add the ratio terms to find the number of parts, divide the total by that number, and multiply by each term. This is how shared costs, profits, and recipes are scaled.",
          "If 600 is shared in the ratio 2:3, there are 5 parts in total. Each part is 600 ÷ 5 = 120. The shares are 240 and 360. The sum of the shares equals the original total, which is a useful check.",
        ],
        example: {
          title: "Example: sharing 600 in the ratio 2:3",
          lines: [
            "Total parts: 2 + 3 = 5.",
            "Value of one part: 600 ÷ 5 = 120.",
            "Shares: 2 × 120 = 240 and 3 × 120 = 360.",
            "Check: 240 + 360 = 600.",
          ],
        },
      },
      {
        heading: "Ratios in Maps and Models",
        paragraphs: [
          "Map scales are ratios. A scale of 1:50,000 means one unit on the map represents 50,000 of the same units on the ground. If a map distance is 4 cm, the real distance is 200,000 cm, or 2 km.",
          "The units must match before you multiply. Converting the result to a convenient unit, such as kilometres, is part of the calculation, not an optional extra.",
        ],
        note:
          "When a ratio compares quantities with different units, state the units explicitly. A ratio of 2 hours to 30 minutes is not 2:30; convert to the same unit first, giving 4:1.",
      },
    ],
    faq: [
      {
        question: "What is the difference between a ratio and a fraction?",
        answer:
          "A fraction usually represents a part of a whole, while a ratio can compare any two quantities, including parts that are not measured against a total. The notation can look similar, but the meaning depends on the context.",
      },
      {
        question: "How do I simplify a ratio with decimals?",
        answer:
          "Multiply every term by the same power of ten to remove the decimals, then divide by the greatest common factor. For 0.5:1.5, multiply by 10 to get 5:15, then divide by 5 to get 1:3.",
      },
      {
        question: "How do I split money in a ratio?",
        answer:
          "Add the ratio terms to find the total number of parts, divide the amount by that total, and multiply the result by each term. Check that the shares add back up to the original amount.",
      },
    ],
  },
  {
    slug: "how-to-convert-units",
    title: "How to Convert Units Without Getting Lost",
    category: "Math",
    date: "2026-10-11",
    excerpt:
      "Convert length, weight, volume, and temperature with confidence using conversion factors, unit cancellation, and sensible rounding.",
    tool: { name: "Unit Converter", path: "/unit" },
    takeaways: [
      "A conversion factor is a fraction equal to one that changes the unit without changing the value.",
      "Set up the calculation so unwanted units cancel diagonally.",
      "Temperature conversions use offsets, not just multiplication.",
    ],
    sections: [
      {
        heading: "Conversion Factors Are Fractions Equal to One",
        paragraphs: [
          "A unit conversion replaces one way of measuring with another while keeping the same physical quantity. The tool is a conversion factor, such as 1 kilometre = 1,000 metres. Written as a fraction, 1,000 m / 1 km equals one because the numerator and denominator describe the same distance.",
          "Because the factor equals one, multiplying by it does not change the value. It only changes the unit. This is the idea behind dimensional analysis, a reliable method for checking conversions.",
        ],
        formula: "Quantity in new unit = Quantity × Conversion factor",
      },
      {
        heading: "Cancel Units to Check Your Work",
        paragraphs: [
          "Write the conversion as a fraction and arrange it so the unit you want to remove appears in the opposite position. If you are converting kilometres to metres, multiply by 1,000 m / 1 km. The kilometres cancel, leaving metres.",
          "If the units do not cancel, the factor is upside down. This simple check catches many conversion mistakes before you calculate.",
        ],
        example: {
          title: "Example: convert 3.5 km to metres",
          lines: [
            "Conversion factor: 1,000 m = 1 km.",
            "Multiply: 3.5 km × (1,000 m / 1 km).",
            "The kilometres cancel: 3.5 × 1,000 m = 3,500 m.",
          ],
        },
      },
      {
        heading: "Metric Prefixes",
        paragraphs: [
          "The metric system is built from prefixes that represent powers of ten. Kilo means 1,000, centi means one hundredth, milli means one thousandth, and micro means one millionth. Once you know the prefix, the conversion is a decimal shift.",
          "For example, 1 metre = 100 centimetres = 1,000 millimetres. Moving between centimetres and millimetres multiplies or divides by 10. Moving between metres and millimetres multiplies or divides by 1,000.",
        ],
        list: [
          "1 kilometre = 1,000 metres",
          "1 metre = 100 centimetres = 1,000 millimetres",
          "1 kilogram = 1,000 grams",
          "1 litre = 1,000 millilitres",
          "1 tonne = 1,000 kilograms",
        ],
      },
      {
        heading: "Common Imperial Conversions",
        paragraphs: [
          "Imperial and US customary units do not share a single base-ten system, so exact factors matter. One inch is exactly 2.54 centimetres. One foot is 12 inches, one yard is 3 feet, and one mile is 1,609.344 metres.",
          "Liquid measures differ between the US and the UK. A US gallon is about 3.785 litres, while an imperial gallon is about 4.546 litres. Always check which gallon a recipe or fuel figure uses.",
        ],
        example: {
          title: "Example: convert 68 inches to centimetres",
          lines: [
            "Conversion factor: 1 inch = 2.54 cm.",
            "Multiply: 68 × 2.54 = 172.72 cm.",
            "The result is about 1.73 metres.",
          ],
        },
      },
      {
        heading: "Temperature Is Different",
        paragraphs: [
          "Temperature scales have different zero points, so you cannot convert with multiplication alone. Celsius to Fahrenheit uses F = (C × 9/5) + 32. Fahrenheit to Celsius uses C = (F − 32) × 5/9.",
          "Kelvin uses the same size degree as Celsius but starts at absolute zero. K = C + 273.15. A change of one degree Celsius equals a change of one kelvin, but the absolute readings differ by the offset.",
        ],
        formula: "F = (C × 9/5) + 32",
        example: {
          title: "Example: convert 25°C to Fahrenheit",
          lines: [
            "Multiply by 9/5: 25 × 1.8 = 45.",
            "Add 32: 45 + 32 = 77°F.",
            "Check: 0°C is 32°F and 100°C is 212°F, so 77°F is plausible.",
          ],
        },
      },
      {
        heading: "Rounding and Precision",
        paragraphs: [
          "A converted value should not imply more precision than the original measurement. If a distance is given as 3 km, reporting it as 3,000.000 metres suggests millimetre accuracy that was never measured.",
          "Round the final answer to a sensible number of digits, and keep more precision in intermediate steps than you plan to show. For everyday conversions, two or three significant figures are usually enough.",
        ],
        note:
          "When converting a value used in a later calculation, keep extra digits until the end. Rounding too early can shift the final result, especially when several conversions are chained together.",
      },
    ],
    faq: [
      {
        question: "How do I know whether to multiply or divide?",
        answer:
          "Use unit cancellation. Arrange the conversion factor so the unwanted unit cancels. If you are converting from a larger unit to a smaller unit, the number gets larger, so you generally multiply.",
      },
      {
        question: "Is 1 litre the same as 1 kilogram?",
        answer:
          "Only for a substance with a density of 1 kilogram per litre, such as water under standard conditions. Litres measure volume and kilograms measure mass, so the conversion depends on the material.",
      },
      {
        question: "Why is Fahrenheit conversion not a simple multiplication?",
        answer:
          "The Fahrenheit and Celsius scales have different zero points as well as different degree sizes. The conversion therefore needs both a scale factor and an offset of 32 degrees.",
      },
    ],
  },
  {
    slug: "speed-distance-and-time-explained",
    title: "Speed, Distance, and Time: The Relationship That Solves Travel Problems",
    category: "Math",
    date: "2026-10-13",
    excerpt:
      "Use the speed-distance-time triangle to plan journeys, convert units correctly, and calculate average speed across multiple legs of a trip.",
    tool: { name: "Speed Calculator", path: "/speed" },
    takeaways: [
      "Speed equals distance divided by time; distance equals speed times time; time equals distance divided by speed.",
      "Convert minutes to hours before using kilometres per hour.",
      "Average speed is total distance divided by total time, not the average of the individual speeds.",
    ],
    sections: [
      {
        heading: "The Core Relationship",
        paragraphs: [
          "Speed describes how much distance is covered in a given amount of time. If a car travels 150 kilometres in 2.5 hours, its average speed is 150 ÷ 2.5 = 60 kilometres per hour.",
          "The same relationship can be rearranged to find distance or time. The version you use depends on which quantity is missing. Keeping the units consistent is the key to getting a correct answer.",
        ],
        formula: "Speed = Distance ÷ Time",
        example: {
          title: "Example: a 150 km journey",
          lines: [
            "Distance: 150 km.",
            "Time: 2.5 hours.",
            "Speed: 150 ÷ 2.5 = 60 km/h.",
          ],
        },
      },
      {
        heading: "Finding Distance and Time",
        paragraphs: [
          "To find distance, multiply speed by time. A train travelling at 80 km/h for 3 hours covers 240 km. To find time, divide distance by speed. A 240 km trip at 80 km/h takes 3 hours.",
          "These rearrangements are useful for planning. If you know the distance and the speed limit, you can estimate arrival time. If you know the distance and the time available, you can estimate the required average speed.",
        ],
        list: [
          "Distance = Speed × Time",
          "Time = Distance ÷ Speed",
          "Speed = Distance ÷ Time",
        ],
        example: {
          title: "Example: time for a 210 km drive",
          lines: [
            "Distance: 210 km.",
            "Average speed: 70 km/h.",
            "Time: 210 ÷ 70 = 3 hours.",
          ],
        },
      },
      {
        heading: "Make the Units Match",
        paragraphs: [
          "A speed in kilometres per hour expects time in hours and distance in kilometres. If a trip takes 45 minutes, convert it to 0.75 hours before dividing. Using 45 directly would produce a speed 60 times too small.",
          "To convert minutes to hours, divide by 60. To convert hours to minutes, multiply by 60. For a time given in hours and minutes, convert the minutes separately and add the decimal to the whole hours.",
        ],
        example: {
          title: "Example: 45 minutes at 80 km/h",
          lines: [
            "Convert time: 45 ÷ 60 = 0.75 hours.",
            "Distance: 80 × 0.75 = 60 km.",
            "Using 45 as hours would incorrectly give 3,600 km.",
          ],
        },
      },
      {
        heading: "Average Speed Across Multiple Legs",
        paragraphs: [
          "Average speed is not the average of the speeds unless each leg takes the same amount of time. The correct method is to add the distances and divide by the total time.",
          "Suppose you drive 100 km at 50 km/h and then 100 km at 100 km/h. The first leg takes 2 hours and the second takes 1 hour. Total distance is 200 km and total time is 3 hours, so average speed is 66.7 km/h, not 75 km/h.",
        ],
        formula: "Average speed = Total distance ÷ Total time",
        example: {
          title: "Example: two equal-distance legs",
          lines: [
            "Leg 1: 100 km at 50 km/h = 2 hours.",
            "Leg 2: 100 km at 100 km/h = 1 hour.",
            "Total: 200 km in 3 hours.",
            "Average speed: 200 ÷ 3 = 66.7 km/h.",
          ],
        },
      },
      {
        heading: "Speed, Velocity, and Pace",
        paragraphs: [
          "Speed is a magnitude; velocity also includes direction. For everyday travel calculations, speed is usually enough. Pace is the reciprocal of speed and is often used by runners: minutes per kilometre rather than kilometres per hour.",
          "A pace of 5 minutes per kilometre corresponds to a speed of 12 km/h. To convert, divide 60 by the pace in minutes per kilometre. To go the other way, divide 60 by the speed.",
        ],
        formula: "Speed (km/h) = 60 ÷ Pace (min/km)",
        example: {
          title: "Example: converting running pace",
          lines: [
            "Pace: 5 min/km.",
            "Speed: 60 ÷ 5 = 12 km/h.",
            "A 6 min/km pace corresponds to 10 km/h.",
          ],
        },
        note:
          "For a running workout, pace is often more useful than speed because it changes linearly with the time you want to hit for each kilometre. Use our pace calculator when you need splits rather than a single average.",
      },
      {
        heading: "Planning with Estimates",
        paragraphs: [
          "Real journeys include stops, traffic, and speed changes, so a calculated time is an estimate. Add a realistic allowance for breaks and delays rather than assuming the whole trip happens at the speed limit.",
          "The same caution applies to fuel and cost estimates. Distance and average speed give a baseline, but conditions determine the actual result. Treat the number as a planning tool, not a guarantee.",
        ],
        list: [
          "Use consistent units before calculating.",
          "Add time for stops and traffic when planning a trip.",
          "Remember that average speed is a single summary of a changing journey.",
          "Use total distance and total time for multi-leg trips.",
        ],
      },
    ],
    faq: [
      {
        question: "How do I calculate speed in km/h?",
        answer:
          "Divide the distance in kilometres by the time in hours. If the time is given in minutes, divide by 60 first. For example, 30 km in 20 minutes is 30 ÷ (20/60) = 90 km/h.",
      },
      {
        question: "Why is average speed not the average of the speeds?",
        answer:
          "Each speed applies for a different amount of time. Averaging the speed values gives them equal weight, while average speed requires weighting by time. The correct method is total distance divided by total time.",
      },
      {
        question: "How do I convert pace to speed?",
        answer:
          "Divide 60 by the pace in minutes per kilometre. A 5 min/km pace is 60 ÷ 5 = 12 km/h. For minutes per mile, divide 60 by the pace and convert the distance unit if needed.",
      },
    ],
  },
  {
    slug: "how-to-calculate-a-weighted-average",
    title: "How to Calculate a Weighted Average",
    category: "Math",
    date: "2026-10-18",
    excerpt:
      "Learn when a simple mean is not enough, calculate a weighted average step by step, and apply it to grades, prices, and performance scores.",
    tool: { name: "Average Calculator", path: "/average" },
    takeaways: [
      "A weighted average multiplies each value by its weight before dividing by the total weight.",
      "Weights express relative importance, not necessarily percentages.",
      "A simple average is a special case where every weight is equal.",
    ],
    sections: [
      {
        heading: "Why Weights Matter",
        paragraphs: [
          "A simple average treats every value equally. That is appropriate when each observation is equally important, but not when some values represent larger groups, longer periods, or more credit. A weighted average accounts for that difference.",
          "For example, a final exam worth 50% of a course should influence the course grade more than a quiz worth 10%. A simple average of the two scores would give them equal influence and produce a misleading result.",
        ],
        formula: "Weighted average = Σ(value × weight) ÷ Σ(weight)",
      },
      {
        heading: "The Calculation Step by Step",
        paragraphs: [
          "Multiply each value by its weight, add those products, then divide by the sum of the weights. The weights can be credits, percentages, counts, or any positive numbers that reflect relative importance.",
          "If the weights are percentages that add up to 100, the denominator is 100. If they are credits, the denominator is the total credits. The method is the same either way.",
        ],
        example: {
          title: "Example: a course grade",
          lines: [
            "Homework: score 85, weight 20%.",
            "Quiz: score 70, weight 30%.",
            "Final exam: score 90, weight 50%.",
            "Weighted total: (85 × 20) + (70 × 30) + (90 × 50) = 8,300.",
            "Weighted average: 8,300 ÷ 100 = 83.",
          ],
        },
      },
      {
        heading: "Weighted Averages with Credits",
        paragraphs: [
          "Grade point averages often use course credits as weights. A three-credit course contributes three times as much as a one-credit course. The calculation multiplies each grade point by its credits, adds the results, and divides by total credits.",
          "Suppose you earn a 4.0 in a 3-credit course and a 3.0 in a 1-credit course. The weighted total is (4.0 × 3) + (3.0 × 1) = 15. Dividing by 4 credits gives 3.75. A simple average of 4.0 and 3.0 would give 3.5, which ignores the larger course.",
        ],
        example: {
          title: "Example: two courses",
          lines: [
            "Course A: 4.0 grade points, 3 credits.",
            "Course B: 3.0 grade points, 1 credit.",
            "Weighted total: 12 + 3 = 15.",
            "Total credits: 4.",
            "Weighted GPA contribution: 15 ÷ 4 = 3.75.",
          ],
        },
      },
      {
        heading: "Weighted Averages in Business and Finance",
        paragraphs: [
          "Investors use weighted averages to calculate the average price paid for shares. If you buy 10 shares at 100 and 30 shares at 120, the average cost is not 110. The total cost is 1,000 + 3,600 = 4,600 for 40 shares, so the weighted average is 115 per share.",
          "The same logic applies to inventory costs, portfolio returns, and survey results. Whenever the groups being averaged have different sizes, a weighted average is usually the correct choice.",
        ],
        example: {
          title: "Example: average share price",
          lines: [
            "Purchase 1: 10 shares at 100 = 1,000.",
            "Purchase 2: 30 shares at 120 = 3,600.",
            "Total cost: 4,600 for 40 shares.",
            "Weighted average price: 4,600 ÷ 40 = 115.",
          ],
        },
      },
      {
        heading: "Percentages as Weights",
        paragraphs: [
          "When the weights are percentages, they should add up to 100. If they do not, either a weight is missing or the percentages describe different totals. Do not force them to add up by changing the numbers; investigate the source first.",
          "You can also use fractional weights, such as 0.2, 0.3, and 0.5. The arithmetic is identical because the denominator is the sum of the weights, which is 1.",
        ],
        note:
          "Some systems exclude missing assignments from the denominator instead of treating them as zero. Whether a missing score counts as zero depends on the grading policy, so check before calculating a course grade.",
      },
      {
        heading: "Checking the Result",
        paragraphs: [
          "A weighted average must fall between the smallest and largest values being averaged. If it does not, check for a weight that was entered in the wrong column or a denominator that does not match the weights.",
          "It is also useful to compare the weighted and simple averages. A large difference usually means the weights are unevenly distributed. That is not an error by itself, but it is worth explaining when you report the result.",
        ],
        list: [
          "Keep each value paired with its weight.",
          "Multiply before adding; do not average the weights separately.",
          "Divide by the sum of the weights, not by the number of values.",
          "Check that the result lies within the range of the inputs.",
        ],
      },
    ],
    faq: [
      {
        question: "What is the difference between a weighted average and a simple average?",
        answer:
          "A simple average gives every value equal influence. A weighted average gives each value an influence proportional to its weight. If all weights are equal, the weighted average equals the simple average.",
      },
      {
        question: "Can weights be decimals or fractions?",
        answer:
          "Yes. Weights can be any positive numbers. The calculation divides by the sum of the weights, so decimals and fractions work as long as they reflect the relative importance of each value.",
      },
      {
        question: "How do I calculate a weighted GPA?",
        answer:
          "Multiply each course's grade points by its credit hours, add the results, and divide by the total credit hours. Use the grade-point scale specified by your school, since scales can differ.",
      },
    ],
  },
];
