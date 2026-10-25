export const productivityArticles = [
  {
    slug: "pomodoro-technique-explained",
    title: "The Pomodoro Technique: A Practical Guide",
    category: "Productivity",
    date: "2026-10-01",
    excerpt:
      "A practical guide to the Pomodoro Technique: how the 25-minute work and 5-minute break cycle works, how to handle interruptions, and when to change the timing.",
    tool: { name: "Pomodoro Timer", path: "/pomodoro-timer" },
    takeaways: [
      "A pomodoro is one fixed work interval, commonly 25 minutes, followed by a short break.",
      "Interruptions should be recorded and handled later rather than allowed to end the focus block.",
      "The interval length is a starting point; adjust it to the task and review your estimates.",
    ],
    sections: [
      {
        heading: "What the Technique Involves",
        paragraphs: [
          "The Pomodoro Technique is a time-management method built around short, timed work intervals separated by breaks. Each interval is called a pomodoro, named after the tomato-shaped kitchen timer used by the method's creator, Francesco Cirillo.",
          "A common cycle is 25 minutes of focused work followed by a 5-minute break. After four pomodoros, take a longer break of roughly 15 to 30 minutes. These numbers are conventions rather than fixed rules.",
        ],
      },
      {
        heading: "Before You Start the Timer",
        paragraphs: [
          "A pomodoro works best with one defined target. Write the task specifically, such as 'draft the second section of the report' rather than 'work on the report.'",
          "Estimate how many pomodoros the task will take. The estimate need not be accurate; it gives you a number to compare with reality later. Then close unrelated tabs, silence notifications, and put a notepad within reach.",
        ],
        list: [
          "Choose one task and write it down.",
          "Estimate the number of pomodoros first.",
          "Silence notifications and close unrelated tabs.",
        ],
      },
      {
        heading: "The Break Is Part of the Cycle",
        paragraphs: [
          "The five-minute break is not a reward for finishing early. Stand up, look away from the screen, drink water, or take a short walk. Moving is a clearer change of state than scrolling through more of the same content.",
          "The longer break after four pomodoros works the same way at a larger scale. Use it for food, fresh air, or a proper pause. Skipping breaks because a task is going well turns the method back into one long session.",
        ],
        note:
          "Give the break its own timer. A pause without a boundary can quietly become the rest of the afternoon.",
      },
      {
        heading: "Handling Interruptions",
        paragraphs: [
          "Interruptions come from outside, such as a message from a colleague, and from inside, such as the sudden urge to check a headline. The method treats both as information to record, not actions to take immediately.",
          "For an internal interruption, write it down and return to the task. For an external one, decide quickly whether it can wait. If it cannot, deal with it and start a fresh pomodoro; if it can, add it to the list.",
        ],
      },
      {
        heading: "Adjusting the Rhythm",
        paragraphs: [
          "The standard interval suits tasks that can be advanced in a short sitting: editing a page, answering email, or reviewing a section of code. Work that needs a long warm-up may fit better in 45- or 50-minute blocks with 10-minute breaks.",
          "Shorter intervals help when focus is poor or a task is unpleasant, because a 15-minute block is easier to begin. Change one variable at a time, keep it for a week, and judge by completed work rather than by how it felt.",
        ],
        example: {
          title: "Example: one morning of pomodoros",
          lines: [
            "09:00 to 09:25: draft the introduction.",
            "09:25 to 09:30: stand, refill water, look out of the window.",
            "09:30 to 09:55: draft the second section.",
            "After the fourth pomodoro, take a longer break of 15 to 30 minutes.",
          ],
        },
      },
      {
        heading: "Reviewing the Record",
        paragraphs: [
          "At the end of a working day, count completed pomodoros and compare the total with your morning estimate. Over a few weeks, the gap between estimate and reality usually narrows, which makes planning more realistic.",
          "Read the interruption notes too. A recurring entry may point to a fixable cause: a meeting that always overruns, a notification you can turn off, or a task that needs to be split. The timer measures attention as well as protecting it.",
        ],
      },
    ],
    faq: [
      {
        question: "Do I have to use 25-minute intervals?",
        answer:
          "No. Twenty-five minutes is the best-known default, but the method works with other lengths. Choose an interval long enough to make progress and short enough to begin, then adjust after a week of real use.",
      },
      {
        question: "What should I do if I finish a task early?",
        answer:
          "Use the remaining time to review the work, tidy notes, or prepare the next step. Ending it early breaks the association between the timer and a complete block.",
      },
      {
        question: "Is the Pomodoro Technique suitable for teamwork?",
        answer:
          "It can be, if colleagues agree on shared focus periods and know when you are available. The method is primarily a personal planning tool, and it cannot remove interruptions that your role requires you to handle.",
      },
    ],
  },
  {
    slug: "word-count-and-character-limits",
    title: "Word Count and Character Limits: A Practical Guide",
    category: "Productivity",
    date: "2026-10-05",
    excerpt:
      "Understand how word and character counts are measured, why two tools can disagree, and how to fit titles, bios, and applications within strict limits.",
    tool: { name: "Word and Character Counter", path: "/word-counter" },
    takeaways: [
      "Word and character counts measure different things, and a passage can pass one limit while failing another.",
      "Hyphenated words, line breaks, and symbols are counted differently by different tools.",
      "For a strict limit, count the final text in the field that will receive it.",
    ],
    sections: [
      {
        heading: "Three Different Counts",
        paragraphs: [
          "A word count and a character count answer different questions. Words are usually counted by splitting text at spaces and punctuation, while characters include every letter, digit, space, and mark. A page can meet a word limit and still exceed a character limit.",
          "A byte count is a different thing again. Bytes measure storage, and in UTF-8 an accented letter or an emoji can take several bytes. That is why a field labelled characters may reject text that looks short enough.",
        ],
      },
      {
        heading: "Why Two Counters Disagree",
        paragraphs: [
          "Tools make different decisions about hyphenated compounds, contractions, numbers, and URLs. One counter may treat 'well-known' as one word and another as two.",
          "Line breaks, bullet points, and headings count in some tools and not others. Word processors also count text boxes, footnotes, and comments differently. When a limit is strict, count the text in the exact field where it will be submitted.",
        ],
      },
      {
        heading: "Characters With and Without Spaces",
        paragraphs: [
          "Most character limits include spaces, because a space occupies a position in the text. 'Hello world' has 11 characters with the space and 10 without it. The difference grows quickly in longer passages.",
          "Line breaks often count as one or two characters, and tabs may be expanded. Some forms trim trailing spaces before checking the length, while others do not. Paste the final text into the field and watch its counter rather than a separate one.",
        ],
        example: {
          title: "Example: one sentence, three counts",
          lines: [
            "Text: Please review the draft before Friday.",
            "Words: 6.",
            "Characters with spaces: 38.",
            "Characters without spaces: 38 − 5 = 33.",
          ],
        },
      },
      {
        heading: "Limits Worth Designing For",
        paragraphs: [
          "Search and social snippets are display guidelines rather than hard rules. A page title is often cut around 60 characters and a meta description around 155 to 160, but search engines truncate by pixel width.",
          "Application forms, bios, abstracts, and product listings usually enforce exact limits and may count spaces. Treat the stated limit as a maximum, not a target. A shorter entry that says something specific beats one padded to fill the field.",
        ],
        list: [
          "Put the main subject at the start.",
          "Cut filler such as 'in order to' and 'very'.",
          "Use numerals where the style allows.",
          "Check the count in the final field.",
        ],
      },
      {
        heading: "Trimming Without Losing Meaning",
        paragraphs: [
          "Edit at the sentence level first: remove redundant clauses, combine two short sentences, and replace phrases with single words. Then work at the word level. 'At this point in time' becomes 'now'; 'make a decision' becomes 'decide'.",
          "After cutting, read the result aloud and confirm that no condition, number, or name was lost. Limits tempt writers to delete necessary detail. If the meaning no longer fits, consider linking to the full text.",
        ],
      },
      {
        heading: "When the Count Has Consequences",
        paragraphs: [
          "Translation work is often priced per word, and the count may be based on the source or target text. Academic abstracts, grant applications, and legal statements can be rejected for exceeding a limit. Keep the exact submitted text and its count.",
          "Counting is not editing. A tool can tell you that a passage is too long, but it cannot tell you which sentence matters least. Use the number as a constraint, then make the editorial judgment yourself with our [Word and Character Counter](/word-counter) as a check.",
        ],
        note:
          "If a counter disagrees with a submission form, trust the form. Its rules decide whether your text is accepted.",
      },
    ],
    faq: [
      {
        question: "Does a hyphenated word count as one word?",
        answer:
          "It depends on the tool. Many word processors count a hyphenated compound as one word, while some scripts split on the hyphen. Check the count in the system that will receive the text.",
      },
      {
        question: "Why does my character count change when I paste text?",
        answer:
          "Pasting can add or remove line breaks, convert curly quotes, or bring in hidden characters. It can also trigger a different counting rule. Paste as plain text and compare the result with the original.",
      },
      {
        question: "How do I count the words on a printed page?",
        answer:
          "There is no exact answer without the text file. You can estimate by counting words in a few representative lines and multiplying by the line count, but the result is approximate.",
      },
    ],
  },
  {
    slug: "how-to-compare-two-texts",
    title: "How to Compare Two Versions of a Text",
    category: "Productivity",
    date: "2026-10-09",
    excerpt:
      "A practical method for comparing drafts: line versus word comparison, reading a diff, separating meaningful edits from noise, and keeping a record of changes.",
    tool: { name: "Text Compare", path: "/text-compare" },
    takeaways: [
      "A comparison shows differences, not correctness, so every change still needs a human judgment.",
      "Line comparison is fast for code and lists; word comparison is better for prose.",
      "Freeze both versions and normalize formatting noise before you compare them.",
    ],
    sections: [
      {
        heading: "Start With Two Clean Copies",
        paragraphs: [
          "Before comparing, save both versions as separate files and name them by date or author. Do not edit one copy while the other is open. A comparison is only meaningful when each side is a stable record of a moment.",
          "Decide what kind of difference matters. A copy edit calls for word-level attention, a contract review may hinge on a single changed number, and a code review needs to separate formatting from logic. Knowing the question helps you ignore changes that do not affect it.",
        ],
      },
      {
        heading: "Line Comparison and Word Comparison",
        paragraphs: [
          "A line-based comparison treats each line as a unit. It is fast for lists, code, and documents with short paragraphs, but a single changed word can make an entire line appear different. Word-level comparison highlights the changed words within each line.",
          "Comparison tools look for the longest shared sequence of lines or words, then mark what remains as added or removed. They do not understand meaning. A moved paragraph may appear as a deletion in one place and an addition in another.",
        ],
      },
      {
        heading: "Reading the Result",
        paragraphs: [
          "Read additions and deletions together. A deleted phrase and a nearby added phrase may represent a rewrite rather than two unrelated changes. Check the surrounding sentence, because a small edit can reverse the meaning of a clause.",
          "Watch for changes in punctuation, capitalization, and whitespace. These are easy to dismiss but can matter in quotations, code, and legal text. Also check the ends of long paragraphs, where a diff view may hide a final sentence.",
        ],
      },
      {
        heading: "Reduce Noise Before You Compare",
        paragraphs: [
          "Formatting differences can bury real edits. If one version uses curly quotes and the other straight quotes, or different line endings, normalize those first. Remove trailing spaces and convert tabs to spaces only when indentation carries no meaning.",
          "For prose, compare matching sections rather than the whole document. For code, ignore whitespace only if you have reviewed formatting separately. Normalizing too aggressively can hide a change that matters.",
        ],
        list: [
          "Save both versions before opening either one.",
          "Match the comparison type to the material.",
          "Normalize line endings, quotes, and trailing spaces.",
          "Read every change in its surrounding context.",
        ],
      },
      {
        heading: "A Workflow That Catches Changes",
        paragraphs: [
          "Freeze both versions, run the comparison, and scan the summary before reading details. Then work through changes in order, accepting or rejecting each one. Finish by searching for names, figures, and dates.",
          "Keep the comparison report or both versions until the work is approved. If a question arises later, the record shows what changed and when. A screenshot is no substitute for the files.",
        ],
        example: {
          title: "Example: comparing two deadlines",
          lines: [
            "Version A: The deadline is Friday, 16 October.",
            "Version B: The deadline is Friday, 23 October.",
            "A word-level comparison highlights only the number.",
            "Read in context: the weekday still matches, but the date has moved by a week.",
          ],
        },
      },
      {
        heading: "What a Comparison Cannot Tell You",
        paragraphs: [
          "A comparison shows what is different, not what is correct. It cannot tell you whether a new figure is accurate, whether a sentence reads better, or whether a clause has the intended effect. Those judgments require reading the whole text.",
          "Do not paste confidential material into an unknown comparison site. Check whether the tool processes text in your browser or sends it to a server, and follow your organization's rules for the document. Try the [Text Compare](/text-compare) tool on a sample first.",
        ],
      },
    ],
    faq: [
      {
        question: "Should I compare at line level or word level?",
        answer:
          "Use line comparison for code, lists, and short records where whole lines change together. Use word comparison for prose, where a single word inside a long paragraph is often the only difference that matters.",
      },
      {
        question: "Why does unchanged text show as changed?",
        answer:
          "Formatting and encoding often cause this. Curly versus straight quotes, different line endings, trailing spaces, and tabs can all create apparent differences. Normalize those before comparing.",
      },
      {
        question: "Can I compare more than two versions?",
        answer:
          "Yes, but pairwise comparison is easier to follow. Choose one version as the base, compare each other version against it, and keep the reports together so the sequence of edits remains clear.",
      },
    ],
  },
  {
    slug: "how-to-clean-pasted-text",
    title: "How to Clean Up Pasted Text",
    category: "Productivity",
    date: "2026-10-13",
    excerpt:
      "Remove unwanted formatting, line breaks, and stray characters from copied text, and learn which clean-up steps are safe to automate and which need a human check.",
    tool: { name: "Text Cleanup", path: "/text-cleanup" },
    takeaways: [
      "Paste as plain text first, then fix line breaks, invisible characters, and punctuation.",
      "A hyphen at the end of a copied line may be part of a word rather than a wrap marker.",
      "Keep the original until the cleaned text has been proofread against it.",
    ],
    sections: [
      {
        heading: "Where the Mess Comes From",
        paragraphs: [
          "When you copy text, the clipboard can carry several formats at once: plain text, HTML, and rich text. The receiving app picks one. A browser may include layout characters, a PDF may insert a line break at every visual line, and a word processor may attach styles.",
          "The result is text that looks nearly right but behaves badly. Searches fail, line breaks land in the middle of sentences, and quotation marks do not match the style guide. Cleaning text means deciding which artifacts to remove.",
        ],
      },
      {
        heading: "Remove Formatting First",
        paragraphs: [
          "Paste as plain text before editing characters. In many apps this is a separate command, often called Paste Without Formatting, or a keyboard shortcut that differs by platform. It removes fonts, colors, links, and most hidden markup in one step.",
          "Text from a web page may still contain list markers, footnote numbers, or navigation labels. If it came from a PDF, check for repeated headers and page numbers. Remove these leftovers before fixing individual characters.",
        ],
      },
      {
        heading: "Rebuild Paragraphs and Line Breaks",
        paragraphs: [
          "Hard-wrapped text breaks lines to fit a page or screen. Copying it preserves those breaks, so a paragraph becomes a stack of short lines. Join lines that belong together while keeping the blank lines between real paragraphs.",
          "Be careful with lists and verse, where a line break may be intentional. A hyphen at the end of a line is ambiguous: it may be a line-break hyphen to remove or part of a compound word to keep. Check a dictionary if unsure.",
        ],
      },
      {
        heading: "Find the Invisible Characters",
        paragraphs: [
          "Some characters take up no visible space. A non-breaking space looks like a space but prevents a line break; a zero-width space is invisible and can split a word for search.",
          "Replace non-breaking spaces with ordinary spaces when the text will be edited or searched. Remove zero-width characters unless a script needs them. Do not strip every unusual character blindly, because some languages and emoji sequences depend on joiners.",
        ],
        list: [
          "Non-breaking space: looks like a space but blocks a line break.",
          "Zero-width space: invisible, and can break search.",
          "Soft hyphen: invisible unless the line wraps.",
          "Byte order mark: a header that can appear as stray characters.",
        ],
      },
      {
        heading: "Quotes, Dashes, and Broken Encoding",
        paragraphs: [
          "Word processors often convert straight quotes to curly ones and two hyphens to a dash. That is fine for prose but wrong for code, configuration files, and some plain-text systems. Convert to straight quotes when the destination expects them.",
          "Text such as 'Ã©' where 'é' should be usually means UTF-8 bytes were decoded as another encoding. Fixing individual characters is slow; if possible, re-export or re-open the source with the correct encoding. Otherwise, replace the damaged sequences carefully.",
        ],
      },
      {
        heading: "A Safe Cleanup Routine",
        paragraphs: [
          "Work on a copy and keep the original until the cleaned text has been checked. Change one category of problem at a time, such as line breaks, then spaces, then quotes, so you can see what each step affected.",
          "Search for double spaces, stray punctuation, and the first and last words of each paragraph. If the text will be published, proofread it in the final layout. A cleanup tool cannot restore a sentence cut off in the original.",
        ],
        note:
          "Automate the mechanical fixes, but review anything that changes meaning: line joins, hyphen removal, and quote conversion all deserve a quick read.",
      },
    ],
    faq: [
      {
        question: "Is it safe to clean text in a browser?",
        answer:
          "That depends on where the processing happens. A tool that runs entirely in the browser can clean text without sending it anywhere, but you should verify that claim and avoid pasting confidential material into a site you do not trust.",
      },
      {
        question: "How do I remove line breaks without merging paragraphs?",
        answer:
          "Replace blank lines with a temporary marker, join the remaining line breaks, then turn the marker back into a paragraph break. This preserves structure while removing the hard wraps.",
      },
      {
        question: "Why do curly quotes cause problems?",
        answer:
          "Curly quotes are different characters from straight quotes. Code, configuration files, and some content systems only accept the straight versions, so a document that looks correct can fail when pasted into them.",
      },
    ],
  },
  {
    slug: "daily-puzzle-challenge-benefits-and-how-to-play",
    title: "Daily Puzzle Challenge: Benefits and How to Play",
    category: "Productivity",
    date: "2026-10-24",
    excerpt:
      "Build a short daily puzzle habit with eight browser games, understand what a repeatable challenge does and does not prove, and get more from each session.",
    tool: {
      name: "Puzzle Games",
      path: "/puzzle-games",
      description:
        "Play eight free browser puzzles in free mode or a date-stable daily challenge, with no account or saved progress.",
    },
    takeaways: [
      "A daily puzzle creates a small, repeatable decision: one puzzle, one sitting, no setup.",
      "Daily mode reproduces the same starting challenge for the same game and local date.",
      "Free mode is better for experimenting with difficulty, board size, and new game types.",
      "Puzzles can support attention and enjoyment, but they are not a proven substitute for medical advice or cognitive training.",
    ],
    sections: [
      {
        heading: "What a Daily Puzzle Challenge Actually Is",
        paragraphs: [
          "A daily puzzle challenge is a fixed starting problem that changes by date. You open the game, get the board for today, and work on it in one sitting. Because everyone playing that game on that date starts from the same position, the challenge feels shared even without accounts, leaderboards, or saved streaks.",
          "The format reduces the number of decisions around practice. There is no queue of puzzles to choose from and no difficulty setting to negotiate. You open the page, start the daily board, and stop when it is finished or when your time is up.",
        ],
      },
      {
        heading: "The Eight Games at a Glance",
        paragraphs: [
          "The [Puzzle Games hub](/puzzle-games) includes eight games that exercise different kinds of thinking. Sliding Number Puzzle asks you to move tiles into order. Sudoku requires each row, column, and 3 × 3 box to contain the digits 1 through 9. Word Search hides eight words in a grid, and Memory Matching asks you to remember card positions.",
          "The other four games add variety. Daily Brain Teasers presents short riddles with explained answers. Jigsaw Puzzle asks you to swap pieces until an image is whole. 2048 rewards planning ahead as tiles merge, and Word Scramble turns a set of letters into words guided by a clue. Each game has a daily challenge and a free-play mode.",
        ],
        list: [
          "Sliding Number Puzzle: order the tiles using one empty space.",
          "Sudoku: complete a grid without repeating a digit in a group.",
          "Word Search: find themed words in eight possible directions.",
          "Memory Matching: pair identical cards in as few moves as possible.",
          "Brain Teasers: read, commit to an answer, and compare the explanation.",
          "Jigsaw: swap rectangular pieces until the picture is restored.",
          "2048: slide and merge tiles to build larger numbers.",
          "Word Scramble: spell words from shuffled letters using a clue.",
        ],
      },
      {
        heading: "Why a Daily Constraint Helps",
        paragraphs: [
          "A habit is easier to repeat when the start is unambiguous. A daily challenge supplies that start: one specific board, available now, with an obvious finish. The constraint also makes the session easier to time-box. You are not browsing an endless collection; you are working on today's problem.",
          "The same constraint supports comparison. If you play the same game across several days, you can notice changes in how you approach a puzzle without worrying that a different difficulty explains the difference. Do not turn that comparison into a scoreboard. The useful signal is how you think, not whether a particular day felt fast.",
        ],
      },
      {
        heading: "Play to Your Own Clock",
        paragraphs: [
          "A short session is easier to keep than a long one. Ten to fifteen minutes is enough for one puzzle or a few rounds of a faster game. If a Sudoku or jigsaw is unfinished when the time is up, stop and return later or start a fresh free-play board. The daily puzzle is a practice format, not an obligation to finish every grid.",
          "Avoid using a timer as the only measure of progress. Speed can improve with familiarity, but a fast attempt that skips reasoning is not necessarily better than a slower one that notices a pattern. Play at a pace that lets you explain your next move to yourself.",
        ],
      },
      {
        heading: "Daily Mode and Free Mode",
        paragraphs: [
          "Daily mode gives you the date-based challenge. The same game on the same local date reproduces the same starting board after a reload, so you can close the tab and return without losing the puzzle's starting position. Progress inside a session is not saved; reloading resets the board rather than restoring your moves.",
          "Free mode is for choosing your own commitment. Try a 4 × 4 sliding board, pick a different word-search theme, change the number of memory pairs, or start a new 2048 board. Use free mode to learn a game, then use daily mode to make it part of a routine. The [Puzzle Games hub](/puzzle-games) keeps both modes in one place.",
        ],
        list: [
          "Daily mode: fixed by the local calendar date.",
          "Free mode: new boards and adjustable difficulty.",
          "Daily and free games share the same hub and controls.",
          "Neither mode requires an account or saves progress.",
        ],
      },
      {
        heading: "Make the Challenge a Thinking Practice",
        paragraphs: [
          "For brain teasers, write or say your answer before revealing it. The value comes from committing to a line of reasoning and then comparing it with the explanation, not from reading the answer and nodding. For Sudoku, identify the reason a digit belongs in a cell before entering it. For word search, trace the whole word rather than tapping letters until something works.",
          "When you miss a puzzle, ask what information you overlooked. A missed word may have been hidden in a direction you did not check. A failed 2048 board may show that you merged too early and lost flexibility. That reflection is the part that carries into the next attempt.",
        ],
      },
      {
        heading: "Accessibility and Fair Play",
        paragraphs: [
          "The games support mouse, touch, and the keyboard controls described for each puzzle. Sliding tiles, Sudoku cells, and 2048 respond to arrow keys; buttons and cells have visible focus states. Jigsaw pieces can be selected with a keyboard and swapped in sequence. If a control is unclear, the instructions inside the game state the available input.",
          "There are no accounts, saved scores, streaks, or leaderboards. That design keeps the daily challenge simple and avoids turning a short break into another performance metric. It also means there is no server holding your puzzle progress. A daily board is recreated from your device's local date each time you open it.",
        ],
        note:
          "Puzzles are not a treatment for memory loss, attention difficulties, or any medical condition. Treat them as a leisure activity that may support concentration and enjoyment, and seek professional advice for health concerns.",
      },
      {
        heading: "A Simple Weekly Routine",
        paragraphs: [
          "Choose one game for the week and open its daily challenge at a consistent time, such as a morning break or the end of the workday. Complete one board, then stop. If the game is not enjoyable, switch to another of the eight rather than forcing a streak.",
          "Use one longer free-play session to explore a different difficulty, and leave the rest of the week short. The goal is a routine that survives a busy day, not a perfect record. A five-minute daily puzzle is easier to repeat than an hour-long session planned for a day that never has an hour to spare.",
        ],
        list: [
          "Pick one daily game for the week.",
          "Keep the session short enough to repeat tomorrow.",
          "Reflect on one missed clue or move.",
          "Use free mode to try a new game without changing the daily habit.",
        ],
      },
    ],
    faq: [
      {
        question: "Do daily puzzles improve memory or intelligence?",
        answer:
          "Puzzles can be enjoyable and may support attention and problem-solving practice, but the evidence does not support a promise of general intelligence gains or protection from cognitive decline. Treat them as a leisure activity, not a medical intervention.",
      },
      {
        question: "Is the daily puzzle the same for everyone?",
        answer:
          "For a given game and local calendar date, the starting challenge is reproduced deterministically. Someone in another time zone may see a different challenge because their local date is different. There is no central score or shared server state.",
      },
      {
        question: "Does my puzzle progress save if I close the tab?",
        answer:
          "No. The daily starting board is recreated from the date, but moves, answers, matches, and scores stay in the current session. Closing or refreshing the page starts a new session rather than restoring your place.",
      },
      {
        question: "Which puzzle should a beginner start with?",
        answer:
          "Start with a 3 × 3 sliding board, an easy Sudoku, a word search, or Memory Matching with fewer pairs. Word Scramble and 2048 also have simple rules. Use free mode to learn the controls, then open the daily challenge once the game feels comfortable.",
      },
    ],
  },
];
