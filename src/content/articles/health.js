export const healthArticles = [
  {
    slug: "how-to-calculate-bmi",
    title: "How to Calculate BMI",
    category: "Health & Fitness",
    date: "2026-09-30",
    excerpt:
      "Work through the BMI formula in metric and imperial units, read the standard categories, and understand what the result can and cannot tell you.",
    tool: { name: "BMI Calculator", path: "/bmi" },
    takeaways: [
      "BMI divides weight in kilograms by height in metres squared.",
      "The imperial version multiplies by 703 when weight is in pounds and height is in inches.",
      "BMI is a general screening measure, not a diagnosis or a full picture of body composition.",
    ],
    sections: [
      {
        heading: "What BMI Measures",
        paragraphs: [
          "Body Mass Index, usually shortened to BMI, relates body weight to height in a single number. It was designed to compare weight across large groups, where individual differences tend to average out. The calculation is deliberately simple, which is both its strength and its main limitation.",
          "BMI does not measure body fat directly. Two people with the same BMI can have very different proportions of muscle, bone, and fat, so the result is best treated as a general screening indicator rather than a description of an individual's health.",
        ],
      },
      {
        heading: "The Metric Formula",
        paragraphs: [
          "In metric units, BMI equals weight in kilograms divided by height in metres squared. Square the height first, then divide. At 70 kg and 1.75 m, the height squared is 3.0625, and 70 ÷ 3.0625 = 22.86.",
          "Keep the units consistent. Height must be in metres, not centimetres, so 175 cm becomes 1.75 m before squaring. Entering 175 directly would produce a result thousands of times too small.",
        ],
        formula: "BMI = Weight (kg) ÷ Height (m)²",
        example: {
          title: "Example: 70 kg at 1.75 m",
          lines: [
            "Square the height: 1.75 × 1.75 = 3.0625 m².",
            "Divide weight by height squared: 70 ÷ 3.0625 = 22.86.",
            "Rounded to one decimal place, BMI is 22.9.",
          ],
        },
      },
      {
        heading: "The Imperial Formula",
        paragraphs: [
          "When weight is in pounds and height in inches, multiply by 703: BMI = 703 × weight (lb) ÷ height (in)². The constant converts the imperial inputs into the same scale as the metric formula.",
          "At 154 lb and 69 in, the height squared is 4,761. Multiplying 154 by 703 gives 108,262, and dividing by 4,761 gives 22.7. The answer is close to the metric example because the measurements describe similar bodies.",
        ],
      },
      {
        heading: "Reading the Result",
        paragraphs: [
          "For adults, commonly used categories are below 18.5, 18.5 to 24.9, 25.0 to 29.9, and 30.0 and above. These bands are population-level guides, and different organizations or countries may publish slightly different cut-offs.",
          "A category label is not a diagnosis. The number is one data point among many, and a qualified professional would consider other factors before drawing conclusions. If a result is unexpected or worrying, discuss it with them rather than self-assessing.",
        ],
        list: [
          "Below 18.5: often described as underweight.",
          "18.5 to 24.9: often described as a healthy weight range.",
          "25.0 to 29.9: often described as overweight.",
          "30.0 and above: often described as obesity.",
        ],
      },
      {
        heading: "Measuring Accurately",
        paragraphs: [
          "Small measurement errors can move the result noticeably, especially for shorter heights. Weigh at a consistent time of day, use the same scale, and measure height without shoes, standing straight with heels together.",
          "Round only at the end. Keeping the full value during the calculation avoids compounding errors, and reporting BMI to one decimal place is usually enough for everyday use.",
        ],
        note:
          "BMI categories are defined for adults. Children and teenagers are assessed with age- and sex-specific growth references, so adult bands should not be applied to them.",
      },
      {
        heading: "Using BMI Sensibly",
        paragraphs: [
          "BMI is useful for quick comparisons and for tracking changes in the same person over time. It is less informative when muscle mass is unusually high or low, when fat is distributed unevenly, or when fluid balance has changed.",
          "Treat BMI as a starting point, not a verdict. Pair it with other information, such as waist circumference, fitness, and medical history, and rely on a qualified professional for personal health decisions. A [BMI Calculator](/bmi) can handle the arithmetic while you focus on interpretation.",
        ],
      },
    ],
    faq: [
      {
        question: "What is a normal BMI?",
        answer:
          "Many public health bodies describe 18.5 to 24.9 as the healthy range for adults. Individual circumstances vary, and the category is a screening guide, not a personal assessment. A clinician can interpret it alongside other information.",
      },
      {
        question: "Does BMI use feet and pounds?",
        answer:
          "Yes, with the imperial formula. Convert height to inches and weight to pounds, then use 703 × weight ÷ height squared. Converting to kilograms and metres produces the same result.",
      },
      {
        question: "Why does BMI not measure body fat?",
        answer:
          "BMI uses only height and weight. It cannot distinguish muscle from fat or show where fat is stored. Two people with the same BMI can have very different body compositions, so the number is only a rough screening indicator.",
      },
    ],
  },
  {
    slug: "bmi-limitations-and-what-it-doesnt-measure",
    title: "BMI Limitations: What It Does and Does Not Measure",
    category: "Health & Fitness",
    date: "2026-10-01",
    excerpt:
      "BMI is a quick screening number, not a complete health assessment. See what it misses, from muscle mass to fat distribution, and how to interpret it carefully.",
    tool: { name: "BMI Calculator", path: "/bmi" },
    takeaways: [
      "BMI uses only height and weight, so it cannot distinguish muscle from fat or show where fat is stored.",
      "The same BMI can mean different things at different ages, body types, and population groups.",
      "BMI is most useful as one input alongside other measures and professional guidance.",
    ],
    sections: [
      {
        heading: "What BMI Was Designed to Do",
        paragraphs: [
          "BMI began as a population-level tool. Its purpose was to summarize weight relative to height across large groups, where individual differences tend to average out. For that use, a simple calculation is cheap, quick, and easy to compare across studies.",
          "The trouble starts when a population summary is applied to one person. An average relationship between weight and height does not capture body composition, health history, or lifestyle.",
        ],
      },
      {
        heading: "It Cannot Separate Muscle from Fat",
        paragraphs: [
          "Muscle and fat both contribute to body weight, and BMI counts them the same way. A person with a large amount of muscle can land in an overweight category despite a low proportion of body fat. In the other direction, someone with low muscle mass can have a BMI in the healthy range while carrying more fat than the number suggests.",
          "This is not a rare edge case; it is a built-in limitation of using weight alone. Body composition measurement answers a different question and has its own errors.",
        ],
      },
      {
        heading: "Fat Distribution Matters",
        paragraphs: [
          "Where fat is stored matters for health, not just how much is stored. Fat around the abdomen and internal organs behaves differently from fat under the skin of the hips and thighs. BMI cannot tell these patterns apart because it has no information about shape or waist measurement.",
          "Waist circumference and waist-to-height ratio add information that BMI lacks. They are simple measurements, though they also have limitations and need to be taken consistently. A clinician may combine them with BMI rather than replacing one number with another.",
        ],
        list: [
          "Waist circumference measures around the middle, usually at the navel or the narrowest point.",
          "Waist-to-height ratio divides waist circumference by height.",
          "Both measures are affected by posture, breathing, and tape position.",
        ],
      },
      {
        heading: "Age, Sex, and Population Differences",
        paragraphs: [
          "Body composition changes with age. Older adults often carry less muscle and more fat at the same weight, which can make a given BMI less informative. Sex differences in fat distribution and muscle mass have a similar effect.",
          "BMI categories were derived largely from population data, and the relationship between BMI and health risk varies across groups. Some public health bodies use different cut-offs for particular populations, so one universal band oversimplifies that variation.",
        ],
      },
      {
        heading: "Situations Where BMI Is Less Useful",
        paragraphs: [
          "BMI is difficult to interpret during pregnancy, after major fluid shifts, or when swelling changes weight quickly. It can also mislead for athletes and anyone whose training or work builds substantial muscle.",
          "Children and adolescents need age- and sex-specific growth charts rather than adult categories. People with disabilities or atypical body proportions may also find standard BMI references a poor fit.",
        ],
        list: [
          "Athletes and highly muscular people: weight may reflect muscle rather than fat.",
          "Pregnancy: adult BMI categories do not apply to expected weight changes.",
          "Older adults: muscle loss can hide changes in body composition.",
        ],
      },
      {
        heading: "Using BMI as One Input",
        paragraphs: [
          "The most defensible use of BMI is as a screening signal. A result outside a reference range can prompt a closer look, while a result inside it does not guarantee anything. The trend over months or years is often more informative than a single reading.",
          "If you track weight, record the conditions: time of day, scale, clothing, and hydration. If a measurement raises a concern, discuss it with a qualified professional rather than self-diagnosing from a label.",
        ],
        note:
          "No single number can summarize health. BMI, waist measurements, fitness, blood pressure, and other clinical checks each describe a different part of the picture.",
      },
    ],
    faq: [
      {
        question: "Is BMI accurate for athletes?",
        answer:
          "Often not. Muscle is dense, so a muscular athlete can have a high BMI with a low body-fat percentage. BMI cannot distinguish the two, which is why sports and clinical settings use additional measurements.",
      },
      {
        question: "Can BMI be used for children?",
        answer:
          "Not with adult categories. Children and teenagers use age- and sex-specific growth references, because body composition changes rapidly during growth.",
      },
      {
        question: "What should I use instead of BMI?",
        answer:
          "There is no single replacement. Waist circumference, waist-to-height ratio, body composition estimates, and clinical assessment each add different information. A qualified professional can help interpret them together.",
      },
    ],
  },
  {
    slug: "running-pace-vs-speed",
    title: "Running Pace vs Speed: What the Numbers Mean",
    category: "Health & Fitness",
    date: "2026-10-05",
    excerpt:
      "Pace and speed describe the same run from opposite directions. Learn the conversion formulas, when each number helps, and how to switch between kilometres and miles.",
    tool: { name: "Pace Calculator", path: "/pace" },
    takeaways: [
      "Pace is time per unit of distance; speed is distance per unit of time.",
      "Speed in km/h equals 60 divided by pace in minutes per kilometre.",
      "Mile pace is about 1.609 times kilometre pace, so 5:00/km is roughly 8:03/mile.",
    ],
    sections: [
      {
        heading: "Two Views of the Same Effort",
        paragraphs: [
          "A runner says 5 minutes per kilometre. A treadmill display says 12 kilometres per hour. Both describe the same speed, because pace and speed are reciprocals: one measures time per distance, the other distance per time.",
          "Runners tend to use pace because race distances are fixed. Cyclists and treadmill consoles tend to use speed because it is easier to display and adjust. Neither is more accurate; the choice is a matter of convenience.",
        ],
      },
      {
        heading: "Converting Pace to Speed",
        paragraphs: [
          "To convert pace in minutes per kilometre to speed in kilometres per hour, divide 60 by the pace. A 5:00/km pace becomes 60 ÷ 5 = 12 km/h. A 6:00/km pace becomes 60 ÷ 6 = 10 km/h.",
          "The reverse conversion divides 60 by the speed. A treadmill set to 11 km/h corresponds to 60 ÷ 11 = 5.4545 minutes per kilometre, which is 5:27/km after converting the decimal part to seconds.",
        ],
        formula: "Speed (km/h) = 60 ÷ Pace (min/km)",
        example: {
          title: "Example: 5:30 per kilometre",
          lines: [
            "Pace: 5:30 per kilometre, or 5.5 minutes.",
            "Speed: 60 ÷ 5.5 = 10.909 km/h.",
            "In miles per hour: 10.909 ÷ 1.609344 = 6.78 mph.",
          ],
        },
      },
      {
        heading: "Converting Between Kilometres and Miles",
        paragraphs: [
          "One mile is exactly 1.609344 kilometres. To convert a kilometre pace to a mile pace, multiply by 1.609344. A 5:00/km pace becomes 5 × 1.609344 = 8.04672 minutes, or about 8:03 per mile.",
          "To go the other way, divide the mile pace by 1.609344. An 8:00/mile pace is 8 ÷ 1.609344 = 4.971 minutes per kilometre, or about 4:58/km.",
        ],
        formula: "Pace (min/mile) = Pace (min/km) × 1.609344",
        note:
          "A marathon is 42.195 km or 26.219 miles. Because the mile is longer, the same effort always produces more minutes per mile than per kilometre.",
      },
      {
        heading: "Why Runners Train by Pace",
        paragraphs: [
          "Pace maps directly onto split times. If your target is 4:30/km, each kilometre should take 4 minutes 30 seconds, and a 5 km workout should take 22:30 if the pace is even. That makes pacing easy to check at each marker.",
          "Speed changes nonlinearly with pace, which can be counterintuitive. Improving from 6:00/km to 5:30/km is a 30-second gain per kilometre, but the corresponding speed rises from 10.0 to 10.9 km/h, not by a round number.",
        ],
      },
      {
        heading: "Where Speed Is More Useful",
        paragraphs: [
          "Treadmills, stationary bikes, and some race cut-off charts use speed. Treadmill belts are usually labeled in km/h or mph, and adjusting the number while running is simpler than recalculating pace in your head.",
          "Speed is also natural for cycling, driving, and walking estimates. For a run, speed can hide small changes: 11.0 to 11.5 km/h looks modest but shifts pace from 5:27 to 5:13 per kilometre.",
        ],
      },
      {
        heading: "Keeping the Units Straight",
        paragraphs: [
          "Most pace errors come from mixing minutes and seconds or kilometres and miles. Convert everything to seconds before dividing, then convert back at the end. A pace of 5:30 is 330 seconds, not 5.3 minutes.",
          "A [Pace Calculator](/pace) performs these conversions in either direction, which is useful when a workout is written in one unit and your watch or treadmill uses another. Round the final result, but keep full precision during the calculation.",
        ],
        list: [
          "1 mile = 1.609344 km.",
          "Speed (km/h) = 60 ÷ pace (min/km).",
          "Speed (mph) = 60 ÷ pace (min/mile).",
          "Pace (min/km) = 60 ÷ speed (km/h).",
          "Pace (min/mile) = 60 ÷ speed (mph).",
        ],
      },
    ],
    faq: [
      {
        question: "Is a faster pace always a higher speed?",
        answer:
          "Yes. Pace and speed are inversely related. A smaller number of minutes per kilometre means more kilometres per hour. The relationship is not linear, so a fixed pace improvement produces a different speed gain at different starting points.",
      },
      {
        question: "How do I convert 6:00/km to mph?",
        answer:
          "First convert to km/h: 60 ÷ 6 = 10 km/h. Then divide by 1.609344, which gives 6.21 mph. Equivalently, divide 60 by the mile pace of 9:39, which also gives 6.21 mph.",
      },
      {
        question: "Should I use pace or speed for treadmill runs?",
        answer:
          "Either works if you convert consistently. Pace is easier to compare with outdoor splits; speed is easier to set on the console. Pick one for the session and convert only when you need the other.",
      },
    ],
  },
  {
    slug: "how-to-plan-race-splits",
    title: "How to Plan Race Splits",
    category: "Health & Fitness",
    date: "2026-10-09",
    excerpt:
      "Turn a goal time into kilometre or mile splits, build a realistic pacing plan, and adjust for hills, weather, and the way races actually unfold.",
    tool: { name: "Running Pace Calculator", path: "/running-pace" },
    takeaways: [
      "A split is the time for one segment of a race, and even splits are the simplest baseline plan.",
      "Divide the goal time in seconds by the race distance to get target pace.",
      "Small course and condition adjustments are more realistic than chasing a perfectly even race.",
    ],
    sections: [
      {
        heading: "What a Split Is",
        paragraphs: [
          "A split is the time taken to complete one part of a race, usually a kilometre or a mile. Splits let you compare your actual pace with your plan while the race is still in progress, rather than waiting for the finish time.",
          "Watches and race apps often record automatic splits. Manual splits at markers work too. The useful comparison is between the split you ran and the split you intended, not between one runner and another.",
        ],
      },
      {
        heading: "Start with Even Splits",
        paragraphs: [
          "The simplest plan divides the goal time by the race distance. If you want to finish a 10 km race in 50:00, the target pace is 50 × 60 = 3,000 seconds divided by 10, which is 300 seconds or 5:00/km.",
          "For a 5 km goal of 25:00, the same method gives 1,500 ÷ 5 = 300 seconds, or 5:00/km. A 42.195 km marathon in 4:00:00 gives 14,400 ÷ 42.195 = 341.3 seconds, or 5:41/km.",
        ],
        formula: "Target pace = Goal time (seconds) ÷ Race distance",
        example: {
          title: "Example: a half marathon in 1:45:00",
          lines: [
            "Convert the goal: 105 × 60 = 6,300 seconds.",
            "Divide by 21.0975 km: 6,300 ÷ 21.0975 = 298.6 seconds.",
            "Target pace: 4:59/km, or about 8:01/mile.",
          ],
        },
      },
      {
        heading: "Translate Pace into a Split Plan",
        paragraphs: [
          "Once you have a target pace, write out the cumulative time at each marker. For a 5:00/km goal, 5 km is 25:00 and 10 km is 50:00. Cumulative targets are easier to check when a marker is missed.",
          "Most runners do not run perfectly even splits, and that is normal. A plan should allow a few seconds of variation without treating every discrepancy as a failure. The goal is to avoid large early surpluses or deficits that change the rest of the race.",
        ],
      },
      {
        heading: "Adjust for the Course",
        paragraphs: [
          "Hills, sharp turns, and crowded starts affect pace. A kilometre with a long climb will usually be slower than a flat one at the same effort, and the descent may not repay the loss. Planning by effort alongside pace keeps the race manageable.",
          "If a course has a significant hill, assign a slower target for that split and a slightly faster target elsewhere. The total should still match your goal time, but the individual numbers need not be identical.",
        ],
      },
      {
        heading: "Adjust for Conditions",
        paragraphs: [
          "Heat, humidity, wind, and altitude can raise the effort required for a given pace. A plan built for a cool flat day may be unrealistic on a warm, exposed course. Adjusting the goal before the start is better than forcing the original splits.",
          "There is no universal correction factor that fits every runner. Use recent training in similar conditions, and treat the first half of the race as information rather than a test of willpower.",
        ],
        note:
          "If you have a medical condition or have not raced before, discuss the plan with a qualified coach or clinician. General pacing guidance is not personalized medical or training advice.",
      },
      {
        heading: "Review and Revise",
        paragraphs: [
          "After the race, compare each split with the plan. A fast start followed by a slowdown often means the opening pace was too ambitious. A slow start followed by a strong finish may mean the plan was too conservative.",
          "Use that pattern to set the next goal. A [Running Pace Calculator](/running-pace) can turn a new goal time into splits in seconds, so you can compare several scenarios before committing to one.",
        ],
      },
    ],
    faq: [
      {
        question: "What are negative splits?",
        answer:
          "Negative splits mean running the second half of a race faster than the first. Many runners aim for this pattern because it avoids spending too much energy early, but it is a pacing strategy rather than a requirement.",
      },
      {
        question: "Should every split be identical?",
        answer:
          "No. Even splits are a useful baseline, but terrain, crowding, and conditions make small variations normal. A plan with realistic adjustments beats one that assumes a uniform course.",
      },
      {
        question: "How do I pace a race without a watch?",
        answer:
          "Use course markers and a known target pace. If your goal is 5:00/km, each kilometre marker should arrive every 5 minutes. Check at a few markers rather than constantly, and adjust gradually if you are consistently ahead or behind.",
      },
    ],
  },
  {
    slug: "using-a-pace-calculator-for-training",
    title: "Using a Pace Calculator for Training Runs",
    category: "Health & Fitness",
    date: "2026-10-13",
    excerpt:
      "See how runners use a pace calculator to set easy, tempo, interval, and long-run targets, and how to check that each workout matches its purpose.",
    tool: { name: "Pace Calculator", path: "/pace" },
    takeaways: [
      "Different training runs call for different paces, and a calculator turns a target into checkpoints.",
      "Start from a recent performance, then adjust for the purpose of the session.",
      "Consistent, repeatable pacing matters more than hitting an exact second on every run.",
    ],
    sections: [
      {
        heading: "Why One Pace Does Not Fit Every Run",
        paragraphs: [
          "Different sessions place different demands on the body, so an easy run and a hard interval session should not share a pace. A calculator translates the purpose of a workout into a number you can check.",
          "The numbers are targets, not tests. Wind, hills, heat, and fatigue all change the pace associated with a given effort. A calculator gives you a reference point; your breathing and perceived effort tell you whether the target still makes sense on the day.",
        ],
      },
      {
        heading: "Start from a Recent Result",
        paragraphs: [
          "A recent race or time trial provides an anchor. A 5 km in 24:00 means 24 × 60 = 1,440 seconds divided by 5, or 288 seconds per kilometre: 4:48/km.",
          "Use a result from the last few months and from a distance close to the workouts you plan. An old personal best may not reflect current fitness, and a short race may overstate the pace you can hold for longer sessions.",
        ],
        example: {
          title: "Example: 5 km in 24:00",
          lines: [
            "Convert to seconds: 24 × 60 = 1,440.",
            "Divide by 5 km: 1,440 ÷ 5 = 288 seconds.",
            "Average pace: 4:48/km, or about 7:43/mile.",
          ],
        },
      },
      {
        heading: "Easy and Recovery Runs",
        paragraphs: [
          "Easy runs build aerobic volume without much stress. They are usually slower than race pace and comfortable enough to hold a conversation. The exact pace matters less than the effort, so treat calculator output as a ceiling rather than a target.",
          "If a recent 5 km was 4:48/km, an easy run might sit around 5:45 to 6:15/km. That range is an illustration, not a rule; fitness, terrain, and conditions shift it. Slower is acceptable on an easy day, while faster turns the session into something else.",
        ],
      },
      {
        heading: "Tempo and Threshold Sessions",
        paragraphs: [
          "Tempo runs are sustained efforts that feel comfortably hard, often described as a pace you could hold for about an hour in a race. A calculator converts the target tempo pace into splits for the tempo block.",
          "Suppose the tempo portion is 6 km at 5:10/km. That is 6 × 310 = 1,860 seconds, or 31:00 for the block. Checking the block time is often easier than checking every kilometre, especially on a route without markers.",
        ],
      },
      {
        heading: "Intervals and Repetitions",
        paragraphs: [
          "Short repetitions are usually prescribed by distance, such as 8 × 400 m. At 4:48/km, a 400 m rep should take 288 × 0.4 = 115.2 seconds, or about 1:55.",
          "The same pace gives 200 m in 57.6 seconds, about 58 seconds, and 800 m in 230.4 seconds, or 3:50. Rest periods are separate; the calculator handles the work interval, while the workout plan sets the recovery.",
        ],
        list: [
          "400 m at 4:48/km: about 1:55.",
          "800 m at 4:48/km: about 3:50.",
          "200 m at 4:48/km: about 58 seconds.",
        ],
      },
      {
        heading: "Long Runs and Weekly Consistency",
        paragraphs: [
          "Long runs are usually paced by effort and duration rather than a strict target. A calculator is still useful for estimating finish time and for checking that the pace is not drifting faster than intended as the run progresses.",
          "Record the pace, distance, and how the run felt. Over several weeks, the pattern is more informative than any single session. If the same pace consistently feels harder, review the plan rather than force the numbers.",
        ],
        note:
          "Training guidance here is general. If you are new to running, returning from injury, or managing a health condition, seek advice from a qualified professional before following a structured plan.",
      },
    ],
    faq: [
      {
        question: "How often should I check my pace during a run?",
        answer:
          "Check at intervals rather than constantly. Frequent glances can make you overcorrect for small variations. For steady runs, a mid-run check and a final check are enough; for intervals, check each rep.",
      },
      {
        question: "What if I cannot hit the calculated pace?",
        answer:
          "Adjust the target rather than forcing the session. Fatigue, weather, and terrain all affect pace. If the effort feels appropriate but the pace is slower, the target may be based on outdated fitness.",
      },
      {
        question: "Can I use a pace calculator for walking?",
        answer:
          "Yes. The same relationship applies: pace equals time divided by distance. Walking pace is often expressed in minutes per kilometre or per mile, and the calculator works without assuming running.",
      },
    ],
  },
  {
    slug: "treadmill-pace-conversion",
    title: "Treadmill Pace Conversion: Speed, Incline, and Effort",
    category: "Health & Fitness",
    date: "2026-10-18",
    excerpt:
      "Convert treadmill speed to pace in kilometres or miles, account for incline, and match an outdoor workout without guessing what the belt is doing.",
    tool: { name: "Running Speed Calculator", path: "/running-speed" },
    takeaways: [
      "Treadmill speed and running pace are reciprocal, so 10 km/h equals 6:00/km.",
      "Miles per hour and kilometres per hour differ by a factor of 1.609344.",
      "Incline raises effort but does not change the distance displayed, so pace and effort diverge on hills.",
    ],
    sections: [
      {
        heading: "What the Treadmill Display Tells You",
        paragraphs: [
          "Most treadmills show speed in kilometres or miles per hour, plus time, distance, and incline. The speed is the belt's pace, not necessarily your effort: holding the handrails or changing stride length can alter the demand.",
          "Many models do not display pace directly. Converting speed to minutes per kilometre or per mile makes the session comparable with outdoor runs and training plans written in pace.",
        ],
      },
      {
        heading: "Converting Speed to Pace",
        paragraphs: [
          "For a speed in kilometres per hour, pace in minutes per kilometre is 60 divided by the speed. At 12 km/h, the pace is 60 ÷ 12 = 5 minutes per kilometre, or 5:00/km.",
          "For miles per hour, the same logic gives minutes per mile: 60 ÷ mph. At 6.0 mph, the pace is 10:00 per mile. To express that in minutes per kilometre, divide by 1.609344, which gives about 6:13/km.",
        ],
        formula: "Pace (min/km) = 60 ÷ Speed (km/h)",
        example: {
          title: "Example: 10.5 km/h",
          lines: [
            "Pace: 60 ÷ 10.5 = 5.714 minutes per kilometre.",
            "Convert the decimal: 0.714 × 60 = 42.9 seconds.",
            "Result: about 5:43/km.",
          ],
        },
      },
      {
        heading: "Switching Between Kilometres and Miles",
        paragraphs: [
          "One mile is 1.609344 kilometres, so a speed in mph is 1.609344 times the same speed in km/h. A 6.0 mph setting is 9.66 km/h; a 10 km/h setting is 6.21 mph.",
          "Pace conversions go the other way: minutes per mile are 1.609344 times minutes per kilometre. A 5:00/km pace is 8:03/mile, and a 9:00/mile pace is about 5:36/km.",
        ],
        list: [
          "Speed (mph) = Speed (km/h) ÷ 1.609344.",
          "Speed (km/h) = Speed (mph) × 1.609344.",
          "Pace (min/mile) = Pace (min/km) × 1.609344.",
          "Pace (min/km) = Pace (min/mile) ÷ 1.609344.",
        ],
      },
      {
        heading: "Incline Changes Effort, Not Distance",
        paragraphs: [
          "Incline is usually shown as a percentage grade: rise divided by horizontal run, multiplied by 100. A 1% incline rises 1 metre for every 100 metres travelled. Running uphill at the same belt speed requires more effort than running flat.",
          "The treadmill still counts belt distance, not vertical gain, so the displayed pace does not change when you raise the incline. That is why a hilly outdoor run and a flat treadmill run at the same pace are not equivalent workouts.",
        ],
        formula: "Grade (%) = (Rise ÷ Run) × 100",
        note:
          "Some runners set a small incline to better approximate outdoor flat running, but the right setting depends on the treadmill, the runner, and the workout. Treat any specific percentage as an experiment, not a universal rule.",
      },
      {
        heading: "Matching an Outdoor Workout",
        paragraphs: [
          "Start with the target pace, convert it to speed, and set the belt. A target of 5:30/km is 5.5 minutes per kilometre, so the required speed is 60 ÷ 5.5 = 10.9 km/h. In miles per hour, that is 10.9 ÷ 1.609344 = 6.78 mph.",
          "Warm up before the main set and adjust gradually. If the target feels much harder than it would outdoors, check the incline, the belt calibration, and whether you are holding the rails. Small differences in setup can change the effort substantially.",
        ],
      },
      {
        heading: "Calibration and Realistic Expectations",
        paragraphs: [
          "Treadmill belts can drift from their displayed speed over time. If a machine consistently feels harder or easier than others at the same setting, it may need calibration. For training purposes, consistency on the same machine is often more useful than chasing an exact number.",
          "Use the display as a guide and your effort as a check. A [Running Speed Calculator](/running-speed) can convert between speed, pace, and distance so you can compare sessions without mid-run arithmetic.",
        ],
      },
    ],
    faq: [
      {
        question: "Is treadmill pace the same as outdoor pace?",
        answer:
          "Not exactly. The belt sets the speed, but wind, terrain, and surface are absent, and incline or handrail use can change the effort. The pace is a useful reference, not a perfect match for outdoors.",
      },
      {
        question: "What incline is equivalent to outdoor running?",
        answer:
          "There is no single answer. The effect depends on the treadmill, your stride, and the outdoor route. Some runners use a small incline as an approximation, but the conversion is not exact.",
      },
      {
        question: "How do I convert 6.5 mph to pace per kilometre?",
        answer:
          "First convert to minutes per mile: 60 ÷ 6.5 = 9.23 minutes, or 9:14/mile. Divide by 1.609344 to get about 5:44/km.",
      },
    ],
  },
];
