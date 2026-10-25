export const everydayArticles = [
  {
    slug: "how-to-calculate-fuel-cost",
    title: "How to Calculate Fuel Cost for a Trip",
    category: "Everyday",
    date: "2026-09-30",
    excerpt:
      "Work out what a journey will cost in fuel by using distance, fuel consumption, and price, with clear examples for litres, gallons, and round trips.",
    tool: { name: "Fuel Cost Calculator", path: "/fuel-cost" },
    takeaways: [
      "Fuel cost comes from distance, consumption per 100 units, and price, with all units kept consistent.",
      "A round trip doubles the distance, and detours or heavy loads raise real consumption.",
      "Official economy figures are a starting point; your own fill-up records are more reliable.",
    ],
    sections: [
      {
        heading: "Three Numbers Behind Every Estimate",
        paragraphs: [
          "A fuel estimate needs three inputs: the distance to be driven, the vehicle's consumption rate, and the price of fuel. Each one is easy to find, and the arithmetic is a single chain of multiplication and division.",
          "The part people usually get wrong is the distance. A journey to a destination and back is twice the one-way figure. Detours, a different route home, and driving around at the destination all add distance that a point-to-point measurement misses.",
        ],
        formula:
          "Fuel cost = (Distance ÷ 100) × Consumption in L/100 km × Price per litre",
      },
      {
        heading: "A Worked Example in Litres",
        paragraphs: [
          "Suppose a trip is 420 km, the car uses 7.5 litres per 100 km, and fuel costs 1.60 per litre. First find the fuel needed: 420 ÷ 100 = 4.2, then 4.2 × 7.5 = 31.5 litres.",
          "Multiply by the price to get the one-way cost: 31.5 × 1.60 = 50.40. For a return trip on the same route, double the distance before calculating. Doubling the one-way cost gives the same total, but the distance-first method keeps the fuel quantity visible and makes a detour easier to add.",
        ],
        example: {
          title: "Example: 420 km at 7.5 L/100 km",
          lines: [
            "Fuel: 420 ÷ 100 × 7.5 = 31.5 litres.",
            "One-way cost: 31.5 × 1.60 = 50.40.",
            "Return distance: 840 km, so 63 litres.",
            "Return cost: 63 × 1.60 = 100.80.",
          ],
        },
      },
      {
        heading: "Cars That Use Miles per Gallon",
        paragraphs: [
          "In the United States, fuel economy is usually quoted in miles per gallon. The calculation becomes gallons = miles ÷ MPG, and cost = gallons × price per gallon. Keep miles and gallons together; mixing miles with litres or kilometres with gallons produces a meaningless number.",
          "A US gallon and an imperial gallon are different sizes, so a figure quoted in imperial MPG is not directly comparable with a US MPG figure. Use the gallon type that matches the price at the pump.",
        ],
        example: {
          title: "Example: 240 miles at 30 MPG",
          lines: [
            "Fuel: 240 ÷ 30 = 8 gallons.",
            "Cost at 3.50 per gallon: 8 × 3.50 = 28.00.",
            "The same method works for any distance and price.",
          ],
        },
      },
      {
        heading: "Why Real Consumption Differs from the Label",
        paragraphs: [
          "Published consumption figures come from standardized test cycles. Real driving includes cold starts, traffic, hills, air conditioning, and loads that the test may not fully represent. A fully loaded car with a roof box can use noticeably more fuel than the same car driven alone.",
          "Speed matters too. Consumption per kilometre usually rises at high motorway speeds because aerodynamic drag increases. Short trips are also inefficient because the engine runs cold for a larger share of the journey.",
        ],
        list: [
          "Air conditioning and heating add load to the engine.",
          "Roof racks and trailers increase aerodynamic drag.",
          "Low tyre pressure raises rolling resistance.",
          "Frequent acceleration and braking waste energy.",
        ],
      },
      {
        heading: "Building a Round-Trip Budget",
        paragraphs: [
          "For a budget, start with the full distance, including the return leg and any planned detours. Add a reserve rather than planning to arrive on empty. A reserve covers a missed turn, a traffic diversion, or a price difference between stations.",
          "If you already know the car's real consumption from previous fill-ups, use that figure instead of the official one. A simple record of distance travelled and fuel added gives a more personal number.",
        ],
        example: {
          title: "Example: a 1,050 km round trip",
          lines: [
            "Fuel at 6.8 L/100 km: 1,050 ÷ 100 × 6.8 = 71.4 litres.",
            "Cost at 1.55 per litre: 71.4 × 1.55 = 110.67.",
            "A 10% reserve brings the budget to about 121.74.",
          ],
        },
      },
      {
        heading: "Checking the Estimate After the Trip",
        paragraphs: [
          "The fill-up method is the simplest way to measure real consumption. Fill the tank, reset the trip meter, drive normally, then fill the tank again at the same pump. Divide the distance travelled by the fuel added, using the same units.",
          "Compare the result with your estimate and note the conditions. A single trip is not enough to establish a reliable average, but a few records quickly show whether your planning figure is too optimistic.",
        ],
        list: [
          "Record distance and litres at every fill-up.",
          "Use the same filling method each time.",
          "Compare like journeys: town, motorway, and loaded trips differ.",
        ],
        note:
          "A fuel cost estimate is a planning tool, not a guarantee. Prices and driving conditions change, so keep a small buffer in the budget.",
      },
    ],
    faq: [
      {
        question: "How much fuel do I need for 300 km at 8 L/100 km?",
        answer:
          "Multiply 300 ÷ 100 by 8 to get 24 litres. Multiply 24 by the price per litre to find the cost of that fuel.",
      },
      {
        question: "Should I use the official consumption figure?",
        answer:
          "Use it as a starting point, then replace it with your own fill-up average when you have one. Real driving conditions often differ from the standardized test cycle.",
      },
      {
        question: "How do I convert US MPG to L/100 km?",
        answer:
          "Divide 235.215 by the MPG figure. For example, 30 MPG is about 7.8 L/100 km. The constant applies to US gallons, not imperial gallons.",
      },
    ],
  },
  {
    slug: "how-to-estimate-trip-time",
    title: "How to Estimate Trip Time with Speed and Distance",
    category: "Everyday",
    date: "2026-10-03",
    excerpt:
      "Estimate arrival times from distance and average speed, account for stops and slower roads, and turn the result into a realistic travel schedule.",
    tool: { name: "Speed Calculator", path: "/speed" },
    takeaways: [
      "Travel time is distance divided by the average speed you can actually sustain.",
      "Split a route into segments with different road types instead of using one speed for everything.",
      "Stops add fixed minutes, so add them after the driving time is calculated.",
    ],
    sections: [
      {
        heading: "Time Comes From Distance and Speed",
        paragraphs: [
          "Travel time is distance divided by average speed. The answer is only as good as the average you choose, so treat the posted speed limit as a ceiling rather than a prediction.",
          "A 280 km drive at an average of 70 km/h takes 4 hours. The same distance at 80 km/h takes 3.5 hours. Small changes in average speed have a larger effect on long trips than on short ones.",
        ],
        formula: "Travel time = Distance ÷ Average speed",
      },
      {
        heading: "Plan Road Types Separately",
        paragraphs: [
          "A journey rarely happens at one speed. Motorway, rural road, and town driving have different practical averages. Split the route into segments, calculate each time, then add them.",
          "This is more accurate than applying one average to the whole distance, especially when a short urban section takes a disproportionate share of the time.",
        ],
        example: {
          title: "Example: a 180 km route",
          lines: [
            "120 km motorway at 100 km/h = 1.2 hours.",
            "45 km rural road at 60 km/h = 0.75 hours.",
            "15 km town at 30 km/h = 0.5 hours.",
            "Total: 2.45 hours, or about 2 hours 27 minutes.",
          ],
        },
      },
      {
        heading: "Add Stops as Fixed Time",
        paragraphs: [
          "Breaks, fuel stops, meals, and expected delays are better added as minutes than as a percentage. A 30-minute stop is 30 minutes whether the drive is 100 km or 500 km.",
          "Convert each stop to hours and add it to the driving time. A departure at 08:15 with 4 hours of driving and a 45-minute stop gives an arrival time of 13:00.",
        ],
        formula:
          "Arrival time = Departure time + Driving time + Total stop time",
      },
      {
        heading: "Keep Minutes and Hours Consistent",
        paragraphs: [
          "Speeds in km/h require time in hours. A 20-minute segment is 20 ÷ 60 = 0.333 hours, not 0.20 hours. The decimal part of a time is not minutes; 2.5 hours is 2 hours 30 minutes.",
          "After dividing, convert the decimal back to minutes by multiplying by 60. For 2.45 hours, 0.45 × 60 = 27 minutes. Rounding to 2.5 hours would add three minutes that the route does not contain.",
        ],
        list: [
          "15 minutes = 0.25 hours",
          "20 minutes = 0.33 hours",
          "30 minutes = 0.50 hours",
          "45 minutes = 0.75 hours",
        ],
      },
      {
        heading: "Work Backward From an Arrival Time",
        paragraphs: [
          "For a deadline, divide the distance by the time available to find the average speed required, then judge whether that average is realistic with stops and traffic. If the required speed is above the speed limit, the schedule needs to change.",
          "Navigation apps use live traffic and their own assumptions, so your estimate may differ. Compare the two and adjust the average rather than the distance.",
        ],
        formula: "Required average speed = Distance ÷ Available driving time",
        example: {
          title: "Example: 240 km in 3 hours 15 minutes",
          lines: [
            "Convert the time: 3 hours 15 minutes = 3.25 hours.",
            "Required average: 240 ÷ 3.25 = 73.8 km/h.",
            "A 30-minute stop leaves 2.75 hours, raising the requirement to 87.3 km/h.",
          ],
        },
      },
      {
        heading: "Building a Realistic Schedule",
        paragraphs: [
          "Add a buffer for the unexpected, particularly on long trips or in heavy traffic. A fuel stop that takes 15 minutes can become 30 when the station is busy.",
          "Estimate an arrival window, not a single minute. A range of 20 to 30 minutes is more honest than a precise time that assumes everything goes perfectly.",
        ],
        list: [
          "Use realistic averages for each road type.",
          "Add stops in minutes, not as a percentage.",
          "Check the route for roadworks before leaving.",
          "Keep a buffer for traffic and parking.",
        ],
        note:
          "If you cross a time zone, convert the arrival time as well as the departure time. Use the [Time Zone Converter](/timezone) so the dashboard clock and the destination clock do not catch you out.",
      },
    ],
    faq: [
      {
        question: "How do I calculate travel time at 80 km/h?",
        answer:
          "Divide the distance in kilometres by 80. A 200 km trip takes 200 ÷ 80 = 2.5 hours, or 2 hours 30 minutes.",
      },
      {
        question: "How do I include a 30-minute stop?",
        answer:
          "Convert the stop to hours and add it to the driving time. Three hours of driving plus a 30-minute stop becomes 3.5 hours.",
      },
      {
        question: "Why is my actual trip time longer than calculated?",
        answer:
          "The calculation assumes a constant average speed. Traffic, junction delays, lower rural speeds, parking, and stops all add time that a single average may not capture.",
      },
    ],
  },
  {
    slug: "time-zone-conversion-for-meetings",
    title: "Time Zone Conversion for Meetings and Travel",
    category: "Everyday",
    date: "2026-10-07",
    excerpt:
      "Convert meeting times across time zones without losing a day, handle daylight saving changes, and find an hour that works for everyone involved.",
    tool: { name: "Time Zone Converter", path: "/timezone" },
    takeaways: [
      "Convert through UTC first, then apply the destination offset instead of guessing the gap.",
      "A conversion can change the calendar date as well as the clock time.",
      "Daylight saving schedules differ by country, so check the offset for the actual meeting date.",
    ],
    sections: [
      {
        heading: "Use UTC as the Common Reference",
        paragraphs: [
          "Every time zone is described by an offset from Coordinated Universal Time, or UTC. A clock at UTC+2 is two hours ahead of UTC; a clock at UTC−5 is five hours behind. Converting through UTC avoids guessing the difference between two local times.",
          "The offset is not the same as the time zone name. Names such as Eastern Time or Central European Time describe regions, while offsets describe the actual clock difference on a specific date.",
        ],
        formula: "Local time = UTC time + Offset",
      },
      {
        heading: "Reading Positive and Negative Offsets",
        paragraphs: [
          "Offsets east of the prime meridian are positive, and offsets west are negative. Tokyo is UTC+9, London is UTC+0 in winter, and New York is UTC−5 in winter. The sign tells you which way to move the clock.",
          "Some zones use half-hour or quarter-hour offsets. India is UTC+5:30, Newfoundland is UTC−3:30, and Nepal is UTC+5:45. These are not rounding errors; they are official offsets.",
        ],
        list: [
          "UTC+0: London in winter",
          "UTC+1: Paris and Berlin in winter",
          "UTC+5:30: India",
          "UTC−5: New York in winter",
          "UTC+9: Tokyo",
        ],
      },
      {
        heading: "Converting Between Two Zones",
        paragraphs: [
          "To convert, turn the source time into UTC, then apply the destination offset. If New York is on UTC−5 and Berlin is on UTC+1, a 14:00 meeting in New York is 19:00 UTC and 20:00 in Berlin.",
          "The difference between the two zones is 1 − (−5) = 6 hours. You can also add that difference directly, but going through UTC is clearer when several zones are involved.",
        ],
        example: {
          title: "Example: New York to Berlin",
          lines: [
            "New York: 14:00, UTC−5.",
            "UTC: 14:00 + 5 hours = 19:00.",
            "Berlin: 19:00 + 1 hour = 20:00.",
            "The meeting is at 20:00 in Berlin and 14:00 in New York.",
          ],
        },
      },
      {
        heading: "When the Date Changes",
        paragraphs: [
          "Converting between distant zones can move the calendar day. A 09:00 Monday meeting in Tokyo is 00:00 Monday UTC, which is 16:00 Sunday in Los Angeles on Pacific Standard Time.",
          "Always state the date with the time when zones are far apart. Saying Monday at 09:00 without a zone is incomplete, and saying Monday without a date is ambiguous.",
        ],
        example: {
          title: "Example: Tokyo to Los Angeles",
          lines: [
            "Tokyo: Monday 09:00, UTC+9.",
            "UTC: Monday 00:00.",
            "Los Angeles: Sunday 16:00, UTC−8.",
            "The calendar day is one day earlier in Los Angeles.",
          ],
        },
      },
      {
        heading: "Daylight Saving Changes the Gap",
        paragraphs: [
          "Offsets change when a region starts or ends daylight saving time. The United States and Europe change on different dates, so the gap between New York and Berlin is 6 hours for part of the year and 5 hours for another part.",
          "Use the IANA time zone name, such as America/New_York, rather than a fixed abbreviation. Abbreviations like CST can mean Central Standard Time or China Standard Time, and EDT and EST are not interchangeable.",
        ],
        list: [
          "Check both zones for daylight saving on the meeting date.",
          "Prefer full zone names over abbreviations.",
          "Note the date as well as the time.",
          "Recheck the conversion close to the meeting.",
        ],
        note:
          "Some regions have changed their offset or abolished daylight saving. A conversion that was correct last year may not be correct this year.",
      },
      {
        heading: "Finding a Workable Meeting Hour",
        paragraphs: [
          "List the working hours of each participant in local time, convert them to a common reference, and look for overlap. It is often easier to compare UTC blocks than to juggle several clocks.",
          "When no overlap exists, rotate the inconvenient hour rather than asking the same person to join late every time. Record the time in both zones in the invitation.",
        ],
        list: [
          "Ask for each participant's zone, not just their city.",
          "Convert the candidate hours to UTC.",
          "Check that the date is correct for everyone.",
          "Put the time and zone in the invitation text.",
        ],
        note:
          "The [Time Zone Converter](/timezone) shows the offset and date for each location, which is safer than relying on a remembered difference.",
      },
    ],
    faq: [
      {
        question: "Why is the time difference not always the same?",
        answer:
          "Daylight saving time starts and ends on different dates in different regions. Two places can be 6 hours apart for part of the year and 5 hours apart after one of them changes its clocks.",
      },
      {
        question: "What is UTC?",
        answer:
          "UTC is Coordinated Universal Time, the reference clock used for time zone offsets. It does not observe daylight saving, so it provides a stable base for conversion.",
      },
      {
        question: "How do I convert a meeting time correctly?",
        answer:
          "Convert the source time to UTC using its offset, apply the destination offset, and check whether the date has changed. Confirm the offsets for the actual meeting date.",
      },
    ],
  },
  {
    slug: "how-to-calculate-time-duration",
    title: "How to Calculate Time Duration Across Midnight",
    category: "Everyday",
    date: "2026-10-11",
    excerpt:
      "Learn how to subtract start and end times across midnight, include breaks correctly, and handle work shifts that run for more than 24 hours.",
    tool: { name: "Time Duration Calculator", path: "/time-duration" },
    takeaways: [
      "Subtract the start time from the end time, and add 24 hours if the result is negative.",
      "Converting both times to total minutes makes overnight subtraction easier to check.",
      "Subtract breaks separately, and account for daylight saving on clock-based shifts.",
    ],
    sections: [
      {
        heading: "Subtract the Start from the End",
        paragraphs: [
          "For two times on the same day, subtract the start from the end. From 09:15 to 12:40, treat the hours and minutes separately: 12:40 − 09:15 = 3 hours 25 minutes.",
          "When the end time is earlier than the start, the period has crossed midnight. Add 24 hours to the end before subtracting, or add 24 hours to the negative result.",
        ],
        formula:
          "Duration = End − Start, then add 24 hours if the result is negative",
      },
      {
        heading: "A Worked Overnight Example",
        paragraphs: [
          "A shift starts at 22:45 and ends at 06:30. Subtracting gives a negative result, so add 24 hours. 06:30 plus 24:00 is 30:30, and 30:30 − 22:45 = 7:45.",
          "In minutes, 22:45 is 1,365 minutes and 06:30 is 390 minutes. 390 − 1,365 = −975, and −975 + 1,440 = 465 minutes, which is 7 hours 45 minutes.",
        ],
        example: {
          title: "Example: 22:45 to 06:30",
          lines: [
            "Start: 22:45 = 1,365 minutes.",
            "End: 06:30 = 390 minutes.",
            "Difference: 390 − 1,365 = −975.",
            "Add 1,440: 465 minutes = 7 hours 45 minutes.",
          ],
        },
      },
      {
        heading: "Subtract Breaks and Unpaid Time",
        paragraphs: [
          "An elapsed duration is not always the time paid or worked. If the overnight shift includes a 30-minute unpaid break, subtract 30 minutes from 7 hours 45 minutes to get 7 hours 15 minutes.",
          "Keep the break separate when it has its own rate or rule. Subtracting it too early can make it hard to explain the final figure or to check it against a timesheet.",
        ],
        example: {
          title: "Example: deducting a break",
          lines: [
            "Elapsed shift: 7 hours 45 minutes.",
            "Unpaid break: 30 minutes.",
            "Worked time: 7 hours 15 minutes.",
            "A second 15-minute break would leave 7 hours.",
          ],
        },
      },
      {
        heading: "Shifts Longer Than 24 Hours",
        paragraphs: [
          "For a period spanning several days, count the midnights crossed, then add the remaining hours. From Friday 18:00 to Monday 09:00, the clock passes midnight three times, so the duration is 3 × 24 + 09:00 − 18:00 = 63 hours.",
          "Counting full days from the start time also works, but the remainder must be measured from the same time of day. Mixing the two methods is a common source of an extra or missing day.",
        ],
        formula: "Duration = Midnights crossed × 24 hours + End time − Start time",
        example: {
          title: "Example: Friday 18:00 to Monday 09:00",
          lines: [
            "Midnights crossed: Saturday, Sunday, and Monday = 3.",
            "3 × 24 = 72 hours.",
            "72 + 9 − 18 = 63 hours.",
            "That is 2 days and 15 hours.",
          ],
        },
      },
      {
        heading: "Clock Changes and 23-Hour Days",
        paragraphs: [
          "Daylight saving time can make a calendar day 23 or 25 hours long. A shift from 22:00 to 06:00 may be 7 hours on the night clocks spring forward and 9 hours on the night they fall back.",
          "If the duration is tied to a clock time rather than elapsed time, decide which basis you need. A time sheet usually follows the clock; a machine log usually follows elapsed time.",
        ],
        note:
          "For legal, payroll, or safety-critical calculations, follow the applicable rules and records rather than a general-purpose calculator.",
      },
      {
        heading: "Common Time-Duration Mistakes",
        paragraphs: [
          "Most errors come from mixing 12-hour and 24-hour notation, treating 12:00 as both noon and midnight, or subtracting minutes without borrowing. Writing every time in 24-hour form removes the first problem.",
          "Midnight is 00:00 at the start of a day. The notation 24:00 is sometimes used for the end of a day, but 00:00 is less ambiguous. When borrowing feels error-prone, convert both times to minutes.",
        ],
        list: [
          "Do not subtract clock digits independently.",
          "Use 00:00 for midnight.",
          "Add 24 hours when the end is earlier than the start.",
          "Keep breaks separate until the elapsed time is correct.",
          "Convert the final minutes back to hours carefully.",
        ],
      },
    ],
    faq: [
      {
        question: "How long is 10:00 PM to 6:30 AM?",
        answer:
          "Add 24 hours to 6:30 to get 30:30, then subtract 22:00. The duration is 8 hours 30 minutes.",
      },
      {
        question: "Can a day have 25 hours?",
        answer:
          "A calendar day can last 25 clock hours when daylight saving time ends and clocks move back. It can last 23 hours when clocks move forward in spring.",
      },
      {
        question: "How do I calculate an overnight shift with a break?",
        answer:
          "Add 24 hours to the end time, subtract the start time, and then deduct the break. If the shift spans several days, count the midnights crossed first.",
      },
    ],
  },
  {
    slug: "how-to-count-days-between-dates",
    title: "How to Count Days Between Dates",
    category: "Everyday",
    date: "2026-10-15",
    excerpt:
      "Count calendar days between two dates, choose between inclusive and exclusive counting, and handle leap years, deadlines, and business days correctly.",
    tool: { name: "Date Difference Calculator", path: "/date-difference" },
    takeaways: [
      "The basic date difference is the later date minus the earlier date.",
      "Inclusive counting includes both end dates and gives one more day than elapsed time.",
      "Leap years add a day, so the same date pair can differ by one across years.",
    ],
    sections: [
      {
        heading: "The Difference Is a Subtraction",
        paragraphs: [
          "A date is a position in the calendar. The number of days between two dates is the later date minus the earlier date. This is a straightforward subtraction once both dates are put on the same calendar.",
          "The result counts the days you move forward from the earlier date to reach the later one. It does not include the earlier date itself, because at the start of that day you have not yet moved anywhere.",
        ],
        formula: "Days between = Later date − Earlier date",
      },
      {
        heading: "A Worked Calendar Count",
        paragraphs: [
          "Take July 4 to September 1, 2026. From July 4 to the end of July is 27 days, August adds 31 days, and September 1 adds one more. The total is 59 days.",
          "You can also use day-of-year numbers. July 4 is day 185 and September 1 is day 244 in a non-leap year, so 244 − 185 = 59. Both methods agree when the dates are in the same year.",
        ],
        example: {
          title: "Example: July 4 to September 1, 2026",
          lines: [
            "July 4 to July 31: 27 days.",
            "August: 31 days.",
            "September 1: 1 day.",
            "Total: 27 + 31 + 1 = 59 days.",
          ],
        },
      },
      {
        heading: "Inclusive and Exclusive Counting",
        paragraphs: [
          "Exclusive counting gives the elapsed days between dates: 59 in the example. Inclusive counting includes both the start and end dates, which gives 60. The right choice depends on what you are counting.",
          "A hotel stay from July 4 to September 1 covers 59 nights, matching the exclusive count. A festival that runs from July 4 through September 1 operates on 60 calendar days, matching the inclusive count.",
        ],
        list: [
          "Elapsed time between events: exclusive.",
          "Number of nights: exclusive.",
          "Number of calendar dates touched: inclusive.",
          "Working days: count weekdays separately.",
        ],
        note:
          "State which convention you used. Ten days between two dates and ten days including both dates describe different end points.",
      },
      {
        heading: "Leap Years and February 29",
        paragraphs: [
          "A leap year adds February 29, so the number of days between the same pair of dates can change by one. From February 1 to March 1 is 28 days in 2027 and 29 days in 2028.",
          "When counting across several years, include every leap day in the interval. A date calculator handles this automatically, but manual counts often forget the extra day.",
        ],
        list: [
          "2024, 2028, and 2032 are leap years.",
          "1900 was not a leap year.",
          "2000 was a leap year.",
        ],
        note:
          "A year is a leap year if it is divisible by 4, except for century years that are not divisible by 400.",
      },
      {
        heading: "Dates, Timestamps, and Time Zones",
        paragraphs: [
          "Dates alone do not have a time or a zone. If you are counting from a timestamp, the result can depend on the zone used. A flight that leaves on one date and lands on another is a duration problem, not a simple date difference.",
          "Daylight saving time does not usually change the number of calendar days, but it does change the number of hours between two moments. Use a time-duration calculation when hours matter.",
        ],
        note:
          "For international travel, convert both timestamps to the same zone before comparing. The calendar date on the ticket may not match the date at the destination.",
      },
      {
        heading: "Business Days and Other Counts",
        paragraphs: [
          "Calendar days include weekends and public holidays. Business days usually exclude weekends and may exclude holidays, which vary by country and year. A date difference alone cannot tell you which days are working days.",
          "For planning, identify the calendar difference first, then subtract the non-working days that fall inside the interval. If a deadline is stated in business days, count forward from the start date using the relevant holiday calendar.",
        ],
        list: [
          "Define whether weekends are excluded.",
          "Check public holidays for the correct country.",
          "Confirm whether the start date counts.",
          "Keep the end date convention consistent.",
        ],
        note:
          "The [Date Difference Calculator](/date-difference) reports the elapsed days and can help you verify a manual count before you commit to a date.",
      },
    ],
    faq: [
      {
        question: "Does the start date count in the difference?",
        answer:
          "Not in an exclusive count, which measures elapsed days. An inclusive count adds one to include both the start and end dates.",
      },
      {
        question: "How many days are there from July 4 to September 1?",
        answer:
          "In a non-leap year the exclusive count is 59 days. Inclusive counting, which includes both dates, gives 60 calendar days.",
      },
      {
        question: "Why does February 29 matter?",
        answer:
          "A leap day adds one calendar day to the year. Any interval that crosses February 29 is one day longer than the same interval in a non-leap year.",
      },
    ],
  },
  {
    slug: "how-to-calculate-your-age",
    title: "How to Calculate Your Age in Years, Months, and Days",
    category: "Everyday",
    date: "2026-10-19",
    excerpt:
      "Turn a birth date into years, months, and days with a clear, practical method, including end-of-month cases, leap years, and February 29 birthdays.",
    tool: { name: "Age Calculator", path: "/age" },
    takeaways: [
      "Age in years, months, and days compares the birth date with a reference date unit by unit.",
      "Borrow from the next larger unit when a day or month subtraction is negative.",
      "February 29 birthdays and end-of-month dates follow conventions that can differ between systems.",
    ],
    sections: [
      {
        heading: "Age Is Not Just Days Divided by 365",
        paragraphs: [
          "Age is usually reported in completed years, months, and days. Dividing total days by 365 gives an approximation, but leap years and unequal month lengths make it inaccurate for a calendar age.",
          "The calendar method compares the birth date with the reference date in order: years first, then months, then days. Each unit is completed only when the corresponding date part has been reached.",
        ],
        formula:
          "Age = completed years, then months, then days between birth date and reference date",
      },
      {
        heading: "A Worked Example",
        paragraphs: [
          "For a birth date of May 20, 1990 and a reference date of October 19, 2026, the person has completed 36 years, because May 20, 2026 has passed. From May 20 to September 20 is four full months.",
          "From September 20 to October 19 is 29 days, since September has 30 days. The age is 36 years, 4 months, and 29 days.",
        ],
        example: {
          title: "Example: born May 20, 1990",
          lines: [
            "36th birthday: May 20, 2026.",
            "Four full months later: September 20, 2026.",
            "Plus 29 days: October 19, 2026.",
            "Age: 36 years, 4 months, 29 days.",
          ],
        },
      },
      {
        heading: "The Borrowing Method",
        paragraphs: [
          "Subtract the birth day from the reference day, the birth month from the reference month, and the birth year from the reference year. If a subtraction is negative, borrow from the next larger unit.",
          "For October 19 and a birth day of 20, 19 − 20 = −1. Borrow the number of days in the preceding month, which is 30 for September, giving 29 days, and reduce the month count by one.",
        ],
        list: [
          "Subtract years, months, and days separately.",
          "Borrow days from the preceding month when needed.",
          "Borrow months from the year when the month subtraction is negative.",
          "Use the actual length of the month you borrow from.",
        ],
      },
      {
        heading: "End-of-Month and Leap-Day Cases",
        paragraphs: [
          "Calendar months do not all have the same length. A birth date of January 31 makes one month later ambiguous in February. Calculators and legal systems may resolve the case differently.",
          "People born on February 29 have a birthday that does not appear every year. Some celebrate on February 28, others on March 1, and some legal rules specify one date. An age calculator may also treat February 28 as the completion date in non-leap years.",
        ],
        note:
          "For official forms, use the definition required by the form or the relevant authority. General calendar arithmetic may not match a specific legal rule.",
      },
      {
        heading: "Age in Days, Weeks, and Months",
        paragraphs: [
          "Age in total days counts every elapsed day since birth, including leap days. Age in weeks divides those days by seven. These measures are useful for infants, project timelines, and curiosity, but they do not replace completed years and months.",
          "Age in total months is the number of full months since birth. It is not simply the year difference multiplied by 12 plus the month difference, because the day of the month determines whether the latest month is complete.",
        ],
        list: [
          "Total days: every elapsed calendar day.",
          "Total weeks: total days ÷ 7.",
          "Completed months: full calendar months since birth.",
          "Years, months, days: the conventional form.",
        ],
      },
      {
        heading: "Reading an Age Calculator Correctly",
        paragraphs: [
          "The result depends on the reference date and the time zone. If the calculator uses today's date in one zone and the birth date in another, the day count can shift near midnight.",
          "Check whether the calculator reports completed units or a rounded total. A result of 36 years means the 36th birthday has passed; it does not mean the person is in their 36th year, which is a different convention.",
        ],
        list: [
          "Enter the birth date in the same calendar you use today.",
          "Check the reference date, especially near a birthday.",
          "Read the units: completed years versus total days.",
          "Use the same convention consistently in comparisons.",
        ],
        note:
          "The [Age Calculator](/age) shows the result in years, months, and days so you can compare the borrow method with a second calculation.",
      },
    ],
    faq: [
      {
        question: "Why not divide total days by 365?",
        answer:
          "Leap years add days and months have different lengths, so 365 is only an average. Calendar age counts completed years, months, and days rather than assuming every year is identical.",
      },
      {
        question: "How do I calculate age manually?",
        answer:
          "Subtract the birth date from the reference date in years, months, and days. Borrow from the next unit when a subtraction is negative, using the actual length of the month involved.",
      },
      {
        question: "What is the age of someone born on February 29?",
        answer:
          "In non-leap years the birthday is usually observed on February 28 or March 1, depending on local convention. Check the rule that applies before using the date for an official purpose.",
      },
    ],
  },
  {
    slug: "how-to-make-a-meme-without-uploading-photos",
    title: "How to Make a Meme Without Uploading Your Photos",
    category: "Everyday",
    date: "2026-10-24",
    excerpt:
      "Build a meme from a local image, write captions that fit the frame, choose readable text, and export a clean PNG or JPEG without sending the photo to a server.",
    tool: {
      name: "Meme Generator",
      path: "/meme-generator",
      description:
        "Add top and bottom captions to a local image, adjust the font and outline, and download a PNG or JPEG.",
    },
    takeaways: [
      "A local canvas editor keeps the original image in the browser tab instead of sending it to a server.",
      "Top and bottom captions need short lines, deliberate wrapping, and enough contrast to survive a small screen.",
      "PNG preserves transparency and sharp edges; JPEG is smaller but turns transparent areas white.",
      "Check that you have the right to use and share the underlying image before you publish the meme.",
    ],
    sections: [
      {
        heading: "Why Local Editing Is the Safest Default",
        paragraphs: [
          "A meme is usually made from a personal photo, a screenshot, or an image found online. Uploading that file to an unfamiliar converter creates a copy on someone else's server, along with questions about retention, access, and deletion. A browser-based editor avoids that transfer: the file is read locally, drawn on a canvas, and exported by your own device.",
          "Local processing does not make every image appropriate to share, and it does not settle copyright questions. It does remove one unnecessary risk from the workflow. The [Meme Generator](/meme-generator) decodes the image in the current tab, keeps it there while you edit, and downloads the finished result directly.",
        ],
      },
      {
        heading: "Start With an Image You Have the Right to Use",
        paragraphs: [
          "The safest source is an image you created: a photo from your camera, a drawing, or a screenshot of your own work. If you use someone else's image, confirm the license or permission covers the way you plan to share it. A meme that is fine among friends may still be inappropriate to publish on a public page.",
          "Also consider the people in the image. A photo of a friend may be private even if you took it. Avoid using images of minors, confidential screens, or identifiable people in a context they did not agree to. Humor does not remove consent or privacy obligations.",
        ],
        list: [
          "Use your own photo, artwork, or screenshot when possible.",
          "Check the license before republishing an image you found online.",
          "Ask before sharing a picture of someone else.",
          "Remove personal details such as addresses, badges, and account names.",
        ],
      },
      {
        heading: "Build the Classic Top-and-Bottom Layout",
        paragraphs: [
          "The familiar format places one caption at the top and another at the bottom, leaving the middle of the image visible. That structure works because viewers can read the setup, look at the image, and then read the punchline. It also gives the picture room to carry the joke rather than covering it with text.",
          "Keep each caption to a few words. The tool wraps text to 90 percent of the image width and caps each block at six lines. A long paragraph will either shrink into unreadable text or fill the frame. If a caption needs more than three short lines, consider cutting a clause or splitting the idea across the two positions.",
        ],
        example: {
          title: "Example: a balanced two-line setup",
          lines: [
            "Top: WHEN THE WEEKEND HAS PLANS",
            "Bottom: AND YOU HAVE NONE",
            "The image supplies the reaction; the captions supply the contrast.",
          ],
        },
      },
      {
        heading: "Write Captions That Fit the Frame",
        paragraphs: [
          "Read the caption at the size it will appear on a phone. A line that looks comfortable on a large monitor may become a thin ribbon of text in a chat app. Short words, concrete nouns, and a clear turn between the top and bottom line are easier to scan than a long explanation.",
          "Capitalization is a style choice, not a requirement. All caps can make a short line punchy, but a long all-caps block feels shouted and is harder to read. Test the uppercase setting with the real caption, then judge the preview rather than the text box.",
        ],
        list: [
          "Put the setup at the top and the turn at the bottom.",
          "Prefer specific words over general ones.",
          "Cut anything the image already communicates.",
          "Check the preview on a narrow screen before exporting.",
        ],
      },
      {
        heading: "Make the Text Readable",
        paragraphs: [
          "Text needs contrast against the busiest part of the image, not just the average background. White text with a dark outline is a reliable starting point because the outline separates the letters from both light and dark areas. A light fill with a dark outline works in the opposite direction.",
          "Font size should be large enough to read at a glance. Increase the size before adding more caption text, and use the outline width to strengthen the edge without turning the letters into blobs. A bold display font may look energetic but can lose detail at small sizes; a simpler font is safer when the meme will be viewed in a feed.",
        ],
      },
      {
        heading: "Preview, Export, and Pick the Right Format",
        paragraphs: [
          "The preview is generated by the same canvas that produces the download, so it is the best guide to the final placement. Check that no line is clipped, that the text does not cover an important face or object, and that the outline remains visible over the brightest and darkest parts of the picture.",
          "Choose PNG when the image has transparency, fine text, or flat graphics. PNG keeps those edges crisp and supports an alpha channel. Choose JPEG when file size matters more and the image is a photograph; JPEG cannot store transparency, so transparent areas are filled with white. Both exports use the original image dimensions, not the smaller preview.",
        ],
        note:
          "Canvas output uses the fonts installed on your device. A font that is available on one computer may be substituted on another, so check the exported file rather than assuming every viewer sees the same typeface.",
      },
      {
        heading: "A Repeatable Five-Minute Workflow",
        paragraphs: [
          "Start with the smallest version of the idea: one sentence for the top, one for the bottom. Load the image, type both lines, and adjust the size until the text is readable without hiding the subject. Change one setting at a time so you can see which adjustment helped.",
          "When the preview looks right, export once and open the downloaded file. This catches font substitutions, transparency surprises, and captions that looked fine only in the editor. If the file is going into a group chat, send a compressed preview first and keep the full-size export as the original.",
        ],
        list: [
          "Choose and verify the source image.",
          "Write two short captions before touching the style controls.",
          "Set the font size, fill, and outline for contrast.",
          "Export, reopen the file, and check it at phone size.",
        ],
      },
      {
        heading: "Before You Share",
        paragraphs: [
          "A meme can travel far beyond the conversation where it started. Check the caption for inside jokes that only make sense to you, names that should not be public, and references that could embarrass someone at work or school. The image may also carry metadata or visible details that were not obvious in the preview.",
          "If the meme is for a public account, treat it like any other published image. Credit the photographer or artist when required, follow the platform's rules, and be ready to remove it if a person in the photo asks you to. Local editing protects the file in transit; it does not replace judgment about what should be published.",
        ],
        note:
          "This guide is general information, not legal advice. Copyright and privacy rules vary by country and by how an image is used.",
      },
    ],
    faq: [
      {
        question: "Is a browser-based meme generator private?",
        answer:
          "It can be, if the image is processed locally and never uploaded. Verify that the tool says it uses the Canvas API in your browser and that no upload request is made. The CALVORO Meme Generator follows that model, but you should still avoid loading sensitive images into any site you do not trust.",
      },
      {
        question: "Why does my exported meme look different from the preview?",
        answer:
          "The most likely cause is a font substitution on the device that rendered the export. Another possibility is a format difference: JPEG cannot store transparency and fills those areas with white. Reopen the exported file before sharing it.",
      },
      {
        question: "Should I use PNG or JPEG for a meme?",
        answer:
          "Use PNG for screenshots, transparent images, and crisp text. Use JPEG for photographs when a smaller file is more important than perfect edges. Both formats are supported by the generator and keep the source image's dimensions.",
      },
      {
        question: "How long can the captions be?",
        answer:
          "Each caption can hold up to 240 characters, but the visible limit is much shorter. Text wraps to six lines per position, and a caption that fills all six lines usually covers too much of the image. Two or three short lines per position is a practical target.",
      },
    ],
  },
  {
    slug: "passport-photo-sizes-and-printing-guide",
    title: "Passport Photo Sizes and Printing: A Practical Guide",
    category: "Everyday",
    date: "2026-10-24",
    excerpt:
      "Understand common passport photo dimensions, convert millimetres to pixels at 300 and 600 DPI, and print a correctly sized photo sheet without accidental scaling.",
    tool: {
      name: "Passport Photo Maker",
      path: "/passport-photo-maker",
      description:
        "Crop and zoom a local photo to a common or custom size, then download an image, single PDF, or printable sheet.",
    },
    takeaways: [
      "Start with the exact size required by the receiving authority, not a size that looks close.",
      "The pixel dimensions of a printed photo depend on both its millimetre size and the chosen DPI.",
      "Print at 100 percent or actual size and verify the result with a ruler before cutting the sheet.",
      "A correctly sized photo can still be rejected for pose, background, lighting, or expression rules.",
    ],
    sections: [
      {
        heading: "Start With the Size Your Form Requires",
        paragraphs: [
          "Passport and identity photo requirements are set by the issuing authority, not by a universal standard. Two countries can both ask for a 35 × 45 mm photo while imposing different rules for head height, background, and margins. The dimensions are only one part of the specification.",
          "Find the current instructions for the exact document you are applying for. Save or print that page so you can check the details while editing. If the instructions give a size in inches, convert it carefully; small rounding differences matter when a photo is measured against a template.",
        ],
      },
      {
        heading: "Common Sizes and Where They Appear",
        paragraphs: [
          "The tool includes four presets: US 2 × 2 inches, 35 × 45 mm, 33 × 48 mm, and 50 × 70 mm. The 2 × 2 inch size is 50.8 × 50.8 mm, which is why it cannot be treated as a neat 50 mm square. The 35 × 45 mm and 33 × 48 mm sizes appear in passport and visa systems in different regions, while 50 × 70 mm is a larger format used by some countries.",
          "A preset is a starting point, not a guarantee that the photo meets the receiving country's rules. Use a custom size when the instructions call for something else. The [Passport Photo Maker](/passport-photo-maker) keeps the physical dimensions visible so you can compare the output with the form before downloading.",
        ],
        list: [
          "US 2 × 2 in: 50.8 × 50.8 mm.",
          "35 × 45 mm: a common passport and visa size.",
          "33 × 48 mm: used by some national photo specifications.",
          "50 × 70 mm: a larger format for specific documents.",
        ],
      },
      {
        heading: "Millimetres, Inches, and Pixels",
        paragraphs: [
          "Millimetres and inches describe the physical size of the printed photo. Pixels describe the digital image. The bridge between them is resolution, measured in dots per inch (DPI). At 300 DPI, one inch contains 300 pixels; at 600 DPI, it contains 600.",
          "To convert a millimetre width to pixels, divide by 25.4 to get inches and multiply by the DPI. A 35 mm photo at 300 DPI is about 413 pixels wide; at 600 DPI it is about 827 pixels. The physical size stays the same, but the file contains more detail for the printer to use.",
        ],
        formula: "Pixels = (Millimetres ÷ 25.4) × DPI",
        example: {
          title: "Example: a 35 × 45 mm photo",
          lines: [
            "At 300 DPI: 35 mm ≈ 413 px wide, 45 mm ≈ 531 px tall.",
            "At 600 DPI: 35 mm ≈ 827 px wide, 45 mm ≈ 1,063 px tall.",
            "The printed size is identical; only the pixel density changes.",
          ],
        },
      },
      {
        heading: "Why DPI Matters for Printing",
        paragraphs: [
          "A printer cannot create detail that is not in the file. If the source image is cropped to a small pixel area and then enlarged to fill a 600 DPI photo, the extra pixels are interpolated rather than real. The print may look soft even though its dimensions are correct.",
          "Choose 300 DPI for most home and photo-lab printing. It is a well-established target that keeps file sizes manageable. Use 600 DPI when the receiving instructions require it or when a printer explicitly benefits, and make sure the original photo has enough resolution to support the crop.",
        ],
      },
      {
        heading: "Framing the Face with Crop, Pan, and Zoom",
        paragraphs: [
          "The crop decides what appears inside the photo. Start with the head roughly centered and the eyes in the upper portion of the frame, then check the official guidance for head size and margin. Most passport rules leave space above the head and show the top of the shoulders at the bottom.",
          "Zoom controls how much of the source image fills the frame; pan moves the crop window without changing its size. Make small adjustments and check the preview each time. If the image is low resolution, excessive zoom will expose blur or noise. It is better to start with a sharper source photo than to enlarge a small face.",
        ],
        list: [
          "Keep the whole head and the top of the shoulders visible.",
          "Leave the required space above the head.",
          "Center the face rather than cropping it to one side.",
          "Avoid zooming so far that the image becomes soft.",
        ],
      },
      {
        heading: "Printable Sheets: A4 and 4 × 6",
        paragraphs: [
          "A single photo file is convenient for an online application, but a printed sheet is more practical when you need several copies. The tool can arrange the selected photo on an A4 portrait page or a 4 × 6 inch portrait page, adding thin cut guides around each copy.",
          "The sheet does not change the photo's physical size. It places the same dimensions repeatedly with a margin between them. Check how many copies fit before printing, then use the guides to cut evenly. A paper trimmer produces straighter edges than scissors, especially for small photos.",
        ],
      },
      {
        heading: "Print at Actual Size and Verify with a Ruler",
        paragraphs: [
          "The most common printing failure is accidental scaling. A printer driver set to fit the page, shrink oversized content, or add borders can reduce a 35 × 45 mm photo to something slightly smaller. Look for a setting labelled 100 percent, Actual size, or Scale: none.",
          "After printing, measure the photo before cutting the whole sheet. Check both width and height against the required dimensions. If the copy is off, adjust the printer setting rather than the crop. A ruler check takes seconds and catches a problem while the sheet is still intact.",
        ],
        example: {
          title: "Example: checking a 35 × 45 mm print",
          lines: [
            "Measure the width: it should read 35 mm.",
            "Measure the height: it should read 45 mm.",
            "If both are short by the same percentage, the printer scaled the page.",
            "If one dimension is wrong, check the selected preset and aspect ratio.",
          ],
        },
      },
      {
        heading: "What This Tool Does Not Do",
        paragraphs: [
          "The maker crops, resizes, and arranges photos. It does not detect faces, remove backgrounds, adjust lighting, verify expression, or decide whether a photo meets an official specification. Those requirements vary, and a photo can be the right size while still failing for another reason.",
          "Some authorities require a plain background, a neutral expression, no glasses, or a specific head height. Others reject shadows, reflections, or digitally altered images. Read the current rules for your document and use the tool as a careful cropping and printing aid, not as a guarantee of acceptance.",
        ],
        note:
          "Photo processing happens locally with canvas and pdf-lib. The source image is not uploaded to CALVORO. Check the receiving authority's current requirements before submitting any photo.",
      },
    ],
    faq: [
      {
        question: "How many pixels is a 35 × 45 mm photo at 300 DPI?",
        answer:
          "About 413 × 531 pixels. Divide each millimetre value by 25.4 to get inches, then multiply by 300. At 600 DPI the same photo is about 827 × 1,063 pixels.",
      },
      {
        question: "Why did my printed photo come out the wrong size?",
        answer:
          "The printer probably scaled the page to fit or added a border. Choose 100 percent or Actual size in the print dialog, then measure the printed result before cutting it. The digital dimensions can be correct while the print settings change the physical output.",
      },
      {
        question: "Can I use a phone photo for a passport picture?",
        answer:
          "Often, if the photo is sharp, well lit, and large enough for the crop. Avoid digital zoom, heavy filters, and shadows. The source resolution must support the chosen DPI without excessive enlargement, and the result must still meet the pose and background rules.",
      },
      {
        question: "Does a correctly sized photo guarantee acceptance?",
        answer:
          "No. Size is only one requirement. Pose, background, lighting, expression, image quality, and whether digital editing is allowed all matter. Check the current instructions from the authority that will receive the photo.",
      },
    ],
  },
];
