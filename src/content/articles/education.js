export const educationArticles = [
  {
    slug: "how-to-calculate-gpa",
    title: "How to Calculate GPA",
    category: "Education",
    date: "2026-09-30",
    excerpt:
      "Learn how grade points and credit hours combine into a GPA, work through a full example, and avoid the mistakes that throw off a semester average.",
    tool: { name: "GPA Calculator", path: "/gpa" },
    takeaways: [
      "GPA is a credit-weighted average of grade points, not a simple average of letter grades.",
      "Multiply each course's grade points by its credit hours to get quality points.",
      "Divide total quality points by total credits attempted to get the GPA.",
    ],
    sections: [
      {
        heading: "What GPA Summarizes",
        paragraphs: [
          "Grade point average condenses a set of course results into one number. Each letter grade becomes a grade point value, and those values are averaged with credit hours as weights.",
          "Because the calculation depends on a school's grade scale and credit system, the same transcript can produce slightly different GPAs under different rules. Check which scale and which courses your institution includes.",
        ],
      },
      {
        heading: "The Standard 4.0 Scale",
        paragraphs: [
          "Many schools use a 4.0 scale in which an A is 4.0, a B is 3.0, a C is 2.0, a D is 1.0, and an F is 0.0. Plus and minus grades usually sit between these values, such as 3.7 for an A− and 2.7 for a B−.",
          "Some schools use a 4.3 scale, treat an A+ as 4.3, or omit plus and minus grades entirely. The arithmetic is the same; only the point values change.",
        ],
        list: ["A = 4.0", "B = 3.0", "C = 2.0", "D = 1.0", "F = 0.0"],
      },
      {
        heading: "Multiply by Credit Hours",
        paragraphs: [
          "A course's contribution depends on both the grade and the number of credits. Multiply the grade point value by the credit hours to get quality points. A 3-credit course with an A contributes 4.0 × 3 = 12 quality points.",
          "A 4-credit course with a B also contributes 3.0 × 4 = 12 quality points. The two courses affect the GPA equally because their quality points are equal, even though their grades and credit values differ.",
        ],
        formula: "Quality points = Grade points × Credit hours",
      },
      {
        heading: "Divide by Total Credits",
        paragraphs: [
          "Add the quality points for every course, add the credit hours, and divide. Suppose a student takes four courses: an A in a 3-credit course, a B+ in a 4-credit course, an A− in a 3-credit course, and a B in a 2-credit course.",
          "The total is 12.0 + 13.2 + 11.1 + 6.0 = 42.3 quality points over 12 credits. Dividing gives 42.3 ÷ 12 = 3.525, usually reported as 3.53, or truncated to 3.52 depending on school policy.",
        ],
        example: {
          title: "Example: a four-course semester",
          lines: [
            "A, 3 credits: 4.0 × 3 = 12.0 quality points.",
            "B+, 4 credits: 3.3 × 4 = 13.2 quality points.",
            "A−, 3 credits: 3.7 × 3 = 11.1 quality points.",
            "B, 2 credits: 3.0 × 2 = 6.0 quality points.",
          ],
        },
      },
      {
        heading: "Cumulative GPA",
        paragraphs: [
          "A cumulative GPA combines all completed coursework, not just one term. To add a new semester, carry forward the existing quality points and credits, then add the new totals before dividing.",
          "If a student has a 3.40 GPA over 30 credits, that represents 3.40 × 30 = 102 quality points. Adding the 42.3 points and 12 credits from the example gives 144.3 ÷ 42 = 3.436, or about 3.44 cumulative.",
        ],
        formula: "Cumulative GPA = Total quality points ÷ Total credits attempted",
      },
      {
        heading: "Common GPA Mistakes",
        paragraphs: [
          "Averaging semester GPAs without weighting them by credits is the most common error. A 3.0 in a 15-credit term and a 4.0 in a 3-credit term do not average to 3.5 across the year, because the terms represent different amounts of credit.",
          "Other pitfalls include ignoring pass/fail courses, assuming transfer credits count the same way at every school, and using the wrong grade scale. Check the rules before relying on a calculated number.",
        ],
        list: [
          "Weight each course by its credit hours.",
          "Use the grade points your school actually assigns.",
          "Check how repeated, transferred, and pass/fail courses are treated.",
          "Keep precision during the calculation and round at the end.",
        ],
      },
    ],
    faq: [
      {
        question: "Is GPA a simple average of grades?",
        answer:
          "No. It is a credit-weighted average, with credit hours determining how much each course counts. A 4-credit course moves the GPA more than a 1-credit course with the same grade.",
      },
      {
        question: "What is the difference between semester and cumulative GPA?",
        answer:
          "Semester GPA includes only courses from one term. Cumulative GPA includes all coursework completed so far, so it changes more slowly as more credits accumulate.",
      },
      {
        question: "Does a 3.5 GPA mean the same thing at every school?",
        answer:
          "Not necessarily. Grading scales, plus and minus policies, and the courses included can differ. Compare GPAs with caution unless you know the scales are the same.",
      },
    ],
  },
  {
    slug: "weighted-vs-unweighted-gpa",
    title: "Weighted vs Unweighted GPA",
    category: "Education",
    date: "2026-10-02",
    excerpt:
      "Weighted and unweighted GPAs use the same grades but different scales. See how honors and advanced courses change the number and which one to report.",
    tool: { name: "GPA Calculator", path: "/gpa" },
    takeaways: [
      "Unweighted GPA caps grade points at 4.0 and treats every course the same.",
      "Weighted GPA adds extra points for honors, advanced, or college-level courses.",
      "The two numbers answer different questions, so report them in the context your school specifies.",
    ],
    sections: [
      {
        heading: "Same Grades, Different Scales",
        paragraphs: [
          "Weighted and unweighted GPAs begin with the same course grades. The difference is how each grade becomes points. An unweighted scale assigns the same value to an A regardless of course; a weighted scale gives extra points for more demanding courses.",
          "Neither number is inherently more honest. One describes performance on a common scale, while the other accounts for course difficulty. Schools choose what they want the GPA to communicate.",
        ],
      },
      {
        heading: "How Unweighted GPA Works",
        paragraphs: [
          "An unweighted GPA uses a fixed scale, usually A = 4.0, B = 3.0, C = 2.0, D = 1.0, and F = 0.0. Every course counts by its credit hours, but course level does not change the points awarded.",
          "An A in a standard course and an A in an advanced course both contribute 4.0 per credit. The unweighted GPA measures grades without adjusting for schedule difficulty.",
        ],
        formula: "Unweighted GPA = Total quality points ÷ Total credits",
      },
      {
        heading: "How Weighted GPA Works",
        paragraphs: [
          "A weighted GPA adds a premium to grades in honors, Advanced Placement, International Baccalaureate, or other advanced courses. A common approach adds 0.5 points for honors and 1.0 for AP courses, but schools vary.",
          "On a 5.0 weighted scale, an A in an AP course can be worth 5.0, while an A in a standard course remains 4.0. Some schools use a 4.5 or 6.0 maximum, and others cap the weighted GPA.",
          "Suppose four 3-credit courses earn grade points of 5.0 in an AP course, 3.5 in an honors course, 4.0 in a standard course, and 3.0 in another standard course. The quality points are 15.0, 10.5, 12.0, and 9.0, totaling 46.5 over 12 credits, for a weighted GPA of 3.875. Without the AP and honors premiums, the same grades would be worth 4.0, 3.0, 4.0, and 3.0, averaging 3.5.",
        ],
        example: {
          title: "Example: four 3-credit courses",
          lines: [
            "AP course, grade A: 5.0 × 3 = 15.0 quality points.",
            "Honors course, grade B: 3.5 × 3 = 10.5 quality points.",
            "Standard course, grade A: 4.0 × 3 = 12.0 quality points.",
            "Standard course, grade B: 3.0 × 3 = 9.0 quality points.",
          ],
        },
      },
      {
        heading: "What the Extra Points Represent",
        paragraphs: [
          "Weighting attempts to reward students for taking on more demanding coursework. It does not mean the content was mastered better than an A in a standard class; it means the grade was earned in a context the school chose to recognize.",
          "Weighting policies vary widely. Some schools weight only AP courses, others include honors, dual enrollment, or specific subjects. A weighted GPA is therefore most meaningful within the system that produced it.",
        ],
      },
      {
        heading: "How Schools and Colleges Use Them",
        paragraphs: [
          "Many colleges recalculate GPA using their own formula, often unweighted or adjusted for available coursework. They may also review the transcript, considering course rigor alongside grades.",
          "A weighted GPA that looks impressive at one high school may not translate to another context. Admissions offices know how to interpret transcripts, but the numbers are not interchangeable.",
        ],
        note:
          "Check which GPA your school reports and which format each application requests. If both are available, follow the instructions rather than choosing the larger number.",
      },
      {
        heading: "Reporting and Comparing",
        paragraphs: [
          "When a form asks for GPA without specifying a scale, give the one your school uses and state the scale if there is room. Reporting a 4.6 without noting a 5.0 scale invites confusion.",
          "For scholarships, sports eligibility, and school profiles, follow the stated rules exactly. Comparisons across schools are unreliable unless the scales and course policies are known.",
        ],
        list: [
          "State whether the GPA is weighted or unweighted.",
          "Include the scale, such as 4.0 or 5.0.",
          "Use the same set of courses your school includes.",
          "Do not convert between scales without the school's official method.",
        ],
      },
    ],
    faq: [
      {
        question: "Which GPA is better, weighted or unweighted?",
        answer:
          "Neither is universally better. Unweighted GPA is easier to compare across schools, while weighted GPA reflects course difficulty. The right one depends on school policy and the application's instructions.",
      },
      {
        question: "Can an unweighted GPA be higher than a weighted GPA?",
        answer:
          "Typically the weighted figure is equal or higher, because weighting adds points. If a school uses different course sets or caps one figure, the results can differ.",
      },
      {
        question: "How do I convert a weighted GPA to a 4.0 scale?",
        answer:
          "There is no universal conversion. Extra points and maximum scales vary by school. Use the school's official conversion if one exists, or recalculate from individual grades on the 4.0 scale.",
      },
    ],
  },
  {
    slug: "how-credit-hours-affect-gpa",
    title: "How Credit Hours Affect GPA",
    category: "Education",
    date: "2026-10-06",
    excerpt:
      "Credit hours decide how much each course can move your GPA. See the weighting math, compare a 1-credit and 4-credit course, and plan a term with fewer surprises.",
    tool: { name: "GPA Calculator", path: "/gpa" },
    takeaways: [
      "Credit hours are the weights in a GPA calculation, so larger courses have more influence.",
      "Quality points equal grade points multiplied by credit hours.",
      "A single course moves a GPA less when the total credit base is large.",
    ],
    sections: [
      {
        heading: "Credits Are Weights",
        paragraphs: [
          "A GPA is a weighted average, and the weight for each course is its credit hours. A 4-credit course counts twice as much as a 2-credit course with the same grade, because it represents more instructional time and typically more assessed work.",
          "This is why two students with the same letter grades can have different GPAs. The distribution of credits across courses matters as much as the grades themselves.",
        ],
      },
      {
        heading: "Quality Points Make the Weighting Visible",
        paragraphs: [
          "The intermediate value in a GPA calculation is the quality point. **Multiply grade points by credit hours** to get it. An A in a 3-credit course gives 4.0 × 3 = 12 quality points; a C in the same course gives 2.0 × 3 = 6.",
          "Adding quality points and dividing by total credits produces the GPA. Keeping the two totals separate makes it easier to check the arithmetic and see how much a single course contributed.",
        ],
        formula: "Quality points = Grade points × Credit hours",
      },
      {
        heading: "A One-Credit Course Versus a Four-Credit Course",
        paragraphs: [
          "Consider a 4.0 in a 1-credit course and a 2.0 in a 4-credit course. The quality points are 4.0 + 8.0 = 12.0 over 5 credits, for a GPA of 2.40. The weaker grade dominates because it carries four times the weight.",
          "Reverse the grades: a 2.0 in the 1-credit course and a 4.0 in the 4-credit course gives 2.0 + 16.0 = 18.0 over 5 credits, or 3.60. The same grades produce a very different result depending on which course carries more credit.",
        ],
        example: {
          title: "Example: the same grades, swapped credits",
          lines: [
            "4.0 in 1 credit: 4.0 quality points.",
            "2.0 in 4 credits: 8.0 quality points.",
            "GPA: 12.0 ÷ 5 = 2.40.",
            "Swapped: 18.0 ÷ 5 = 3.60.",
          ],
        },
      },
      {
        heading: "How Much Can One Course Move a GPA",
        paragraphs: [
          "The larger your existing credit base, the harder it is for one course to change the cumulative GPA. A new 3-credit course is a small fraction of a 90-credit record but a large fraction of a 15-credit semester.",
          "Suppose a student has a 3.20 GPA over 60 credits, representing 192 quality points. A 4-credit A adds 16 points, giving 208 ÷ 64 = 3.25. A 1-credit A adds only 4 points, giving 196 ÷ 61 = 3.21.",
        ],
      },
      {
        heading: "Credit Load and Semester Volatility",
        paragraphs: [
          "A semester with 12 credits gives each course more relative influence than a semester with 18 credits. That cuts both ways: a strong term can raise the GPA quickly, while a weak term can lower it just as fast.",
          "Part-time study has the same effect over a longer period. Because fewer credits are added each term, the cumulative GPA moves more per course, and earlier grades carry relatively more weight in the total.",
        ],
      },
      {
        heading: "Planning with Credits in Mind",
        paragraphs: [
          "When deciding how to allocate effort, credit hours are a useful guide. A high-credit course with a borderline grade deserves attention, because improving it changes more quality points than improving a low-credit elective.",
          "Check your school's policies on repeated courses, withdrawals, pass/fail grading, and grade replacement. These rules can change which credits enter the GPA and how retakes are counted.",
        ],
        list: [
          "Know the credit value of each course before the term begins.",
          "Prioritize high-credit courses when time is limited.",
          "Confirm how retakes and withdrawals appear on the transcript.",
          "Recalculate after grades post rather than relying on an estimate.",
        ],
      },
    ],
    faq: [
      {
        question: "Do all courses count equally in GPA?",
        answer:
          "No. Courses are weighted by credit hours, so a 4-credit course affects the GPA more than a 1-credit course with the same grade. Some courses, such as pass/fail classes, may be excluded entirely.",
      },
      {
        question: "Does a higher credit load make it easier to raise GPA?",
        answer:
          "A larger credit load dilutes the effect of any one course, which can make the GPA more stable. It also means more work is graded, so the direction of the change depends on performance, not the load alone.",
      },
      {
        question: "How do retakes affect GPA?",
        answer:
          "Policies vary. Some schools replace the original grade, others average the two attempts, and some exclude the retake. Check your institution's rule before assuming the effect.",
      },
    ],
  },
  {
    slug: "how-to-calculate-a-semester-gpa-target",
    title: "How to Calculate the GPA You Need This Semester",
    category: "Education",
    date: "2026-10-10",
    excerpt:
      "Work backward from a target cumulative GPA to the semester grades required, test whether the goal is realistic, and adjust the plan before finals week.",
    tool: { name: "GPA Calculator", path: "/gpa" },
    takeaways: [
      "Required semester GPA depends on your current quality points, current credits, and the credits you will add.",
      "The formula is (target GPA × total credits − current quality points) ÷ new credits.",
      "If the required result exceeds the scale maximum, the target is not reachable in one term.",
    ],
    sections: [
      {
        heading: "Start with Three Numbers",
        paragraphs: [
          "To calculate the GPA you need this semester, gather three figures: your current cumulative GPA, credits already completed, and credits you are attempting now. A fourth number, your target cumulative GPA, defines the goal.",
          "The current GPA and credits combine into quality points, the same intermediate value used in any GPA calculation. Quality points equal GPA × credits. Keeping that total separate makes the backward calculation straightforward.",
        ],
        formula: "Current quality points = Current GPA × Completed credits",
      },
      {
        heading: "The Backward Formula",
        paragraphs: [
          "After the semester, your cumulative GPA will equal total quality points divided by total credits. You know the target and the total credits, so you can work out the quality points required, then subtract what you already have.",
          "Total credits means completed credits plus the credits you are attempting. The result is the average grade point value you need across this semester's courses, weighted by their credits.",
        ],
        formula:
          "Needed semester GPA = (Target GPA × Total credits − Current quality points) ÷ Semester credits",
      },
      {
        heading: "A Worked Example",
        paragraphs: [
          "Suppose you have a 3.40 GPA over 60 completed credits and want a 3.50 cumulative GPA after 15 more credits. Your current quality points are 3.40 × 60 = 204. The target total is 3.50 × 75 = 262.5.",
          "A 3.90 average is high but within a standard 4.0 scale. If the same student attempted 18 credits, the target total would be 3.50 × 78 = 273, requiring 69 ÷ 18 = 3.83. More credits spread the gain over a larger base.",
        ],
        example: {
          title: "Example: from 3.40 to 3.50",
          lines: [
            "Current quality points: 3.40 × 60 = 204.",
            "Target total: 3.50 × 75 = 262.5.",
            "Quality points needed: 262.5 − 204 = 58.5.",
            "Needed semester GPA: 58.5 ÷ 15 = 3.90.",
          ],
        },
      },
      {
        heading: "Check Whether the Goal Is Realistic",
        paragraphs: [
          "If the required semester GPA is above the maximum on your school's scale, the target cannot be reached in one term. If it is below zero, the target is already secured, assuming you pass the current courses.",
          "A result close to the maximum leaves little room for a weak grade. Consider a lower target, more credits, or a longer timeline. Adjusting the plan is better than discovering the shortfall at the end of the term.",
        ],
      },
      {
        heading: "Turn the Target into a Course Plan",
        paragraphs: [
          "The required GPA is an average, not a promise. A 3.90 could come from straight A grades or a mix of A and A− grades depending on the scale. Map the requirement onto your actual courses.",
          "High-credit courses carry more weight, so a realistic plan often focuses effort there. Low-credit courses still matter, but improving one of them changes the semester average less.",
        ],
        list: [
          "List each course and its credit hours.",
          "Identify the grade you would need in each course to reach the average.",
          "Check which courses have the most room for improvement.",
          "Confirm the grade scale, including plus and minus values.",
        ],
      },
      {
        heading: "Recalculate as the Term Progresses",
        paragraphs: [
          "Once graded assignments and midterms are available, replace estimates with actual numbers and run the calculation again. The required GPA may be higher or lower than the original plan.",
          "A [GPA Calculator](/gpa) can handle the arithmetic for each scenario, including the effect of different grades in different courses. Use it to compare options, not to predict a guaranteed outcome.",
        ],
        note:
          "This is an arithmetic planning tool, not academic advice. Course requirements, grade replacement rules, and graduation standards vary by institution, so confirm important decisions with your school.",
      },
    ],
    faq: [
      {
        question: "Can I raise my GPA in one semester?",
        answer:
          "It depends on your credit base and the grades available. A larger existing base makes the GPA harder to move, while a strong semester with many credits can have a bigger effect.",
      },
      {
        question: "What if the required GPA is above 4.0?",
        answer:
          "Under a standard 4.0 scale, that target is not reachable in one semester. You would need a lower target, more credits, or more than one term.",
      },
      {
        question: "Does the calculation include pass/fail courses?",
        answer:
          "Usually not, because pass/fail courses often do not carry grade points. Check your school's policy, since some institutions include them differently or exclude them from the GPA entirely.",
      },
    ],
  },
  {
    slug: "converting-grades-to-grade-points",
    title: "Converting Letter Grades to Grade Points",
    category: "Education",
    date: "2026-10-14",
    excerpt:
      "Convert A to F grades into grade points on a 4.0 scale, handle plus and minus grades, and see why percentage marks need your school's own cut-offs.",
    tool: { name: "GPA Calculator", path: "/gpa" },
    takeaways: [
      "A grade point is the numeric value assigned to a letter grade on a school's scale.",
      "Plus and minus grades usually shift the value by 0.3, but policies differ.",
      "Percentage grades do not convert to letters without the institution's grading bands.",
    ],
    sections: [
      {
        heading: "Why Grades Need Converting",
        paragraphs: [
          "GPA calculations work with numbers, not letters. A grade point is the numeric value a school assigns to each letter grade, and the set of values is called the grading scale. Converting letters to points is the first step in any GPA calculation.",
          "The conversion is not universal. Two schools can use the same letter grades with different point values, especially for plus and minus grades. Use the scale printed in your course catalog or transcript key.",
        ],
      },
      {
        heading: "The Common 4.0 Letter Scale",
        paragraphs: [
          "The most widely used scale maps A to 4.0, B to 3.0, C to 2.0, D to 1.0, and F to 0.0. These values are often called grade points per credit, because they are multiplied by credit hours.",
          "Some schools add a decimal to distinguish performance within a letter, such as 3.5 for a B+ or 2.5 for a C+. Others use whole numbers only, which makes the conversion simpler but less granular.",
        ],
        list: ["A = 4.0", "B = 3.0", "C = 2.0", "D = 1.0", "F = 0.0"],
      },
      {
        heading: "Handling Plus and Minus Grades",
        paragraphs: [
          "A common pattern subtracts 0.3 for a minus grade and adds 0.3 for a plus: A = 4.0, A− = 3.7, B+ = 3.3, B = 3.0, B− = 2.7, and so on. Not every school follows this pattern.",
          "An A+ is especially inconsistent. Some schools treat it as 4.0, some as 4.3, and some do not award it at all. Likewise, some schools do not use minus grades. The letter may look familiar while the point value is not.",
        ],
      },
      {
        heading: "Percentage Grades Are Not Universal",
        paragraphs: [
          "A percentage mark becomes a letter grade only through the bands your school defines. A 90% might be an A at one institution and an A− or B+ at another. No universal standard makes a percentage equivalent to a letter everywhere.",
          "If a transcript shows percentages and your GPA calculator expects letters, find the official conversion table first. Applying a remembered rule of thumb, such as 90 to 100 equals an A, can produce a GPA that does not match your school's records.",
        ],
      },
      {
        heading: "Converting a Transcript Step by Step",
        paragraphs: [
          "Start with the grade scale, then list each course with its letter grade and credit hours. Convert the letter to points, multiply by credits, add the quality points, and divide by total credits. This is the same process used in any GPA calculation.",
          "Check the total credits against the transcript. A missing course or misread credit value changes the result, and such errors are easier to catch before dividing.",
        ],
        example: {
          title: "Example: three courses",
          lines: [
            "A−, 3 credits: 3.7 × 3 = 11.1 quality points.",
            "B+, 4 credits: 3.3 × 4 = 13.2 quality points.",
            "B, 3 credits: 3.0 × 3 = 9.0 quality points.",
            "GPA: (11.1 + 13.2 + 9.0) ÷ 10 = 3.33.",
          ],
        },
      },
      {
        heading: "Institutional and International Scales",
        paragraphs: [
          "Some universities use a 4.3 scale, a 5.0 scale, or a percentage-based system. Others report classifications, such as first-class honors, or a grade point average with a different maximum. These systems are not directly interchangeable.",
          "If you need a GPA on a specific scale, use the official conversion published by the institution receiving the document. Converting by intuition can understate or overstate performance, especially when the original maximum is not 4.0.",
        ],
        note:
          "Keep a copy of the grading scale with any self-reported GPA. If a form asks for a 4.0-scale GPA and your school uses another maximum, state the original scale rather than guessing at a conversion.",
      },
    ],
    faq: [
      {
        question: "Is an A always 4.0?",
        answer:
          "On many 4.0 scales, yes, but not every scale. Some schools award 4.3 for an A+, use a 5.0 maximum, or weight advanced courses. Check the scale your school publishes.",
      },
      {
        question: "How do I convert a percentage to a letter grade?",
        answer:
          "Use your institution's grading bands. There is no universal mapping, and the same percentage can fall into different letter categories at different schools.",
      },
      {
        question: "Do plus and minus grades always change the GPA?",
        answer:
          "Only if the school assigns different point values for them. Some schools record plus and minus grades on the transcript but use whole-number grade points in the GPA calculation.",
      },
    ],
  },
];
