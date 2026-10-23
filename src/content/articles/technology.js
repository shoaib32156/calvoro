export const technologyArticles = [
  {
    slug: "how-to-merge-pdf-files-safely",
    title: "How to Merge PDF Files Without Uploading Them",
    category: "Technology",
    date: "2026-10-02",
    excerpt:
      "Combine PDFs in your browser, keep sensitive documents on your device, and check page order, bookmarks, and file size before you share the result.",
    tool: { name: "PDF Studio", path: "/pdf-studio" },
    takeaways: [
      "Merging copies pages into a new document; it does not compress or convert them.",
      "Browser-based merging can keep files on your device, but verify how the specific tool works.",
      "Review page order, bookmarks, form fields, and signatures before sharing the merged file.",
    ],
    sections: [
      {
        heading: "What a Merge Actually Does",
        paragraphs: [
          "Merging PDFs combines the pages of several files into one document. The pages are copied in the order you choose, so each page keeps its original size, orientation, and layout. Merging is not the same as compressing or converting a PDF.",
          "A PDF page is a set of drawing instructions plus fonts and images. Merging copies those resources into a new file and builds a new page tree. Features that depend on the whole document, such as bookmarks and signatures, may not survive.",
        ],
      },
      {
        heading: "Why Local Processing Matters",
        paragraphs: [
          "Many merge tools upload your files to a server, process them there, and return a download link. A browser-based tool can instead read the files with the File API, combine them in memory, and create a download without sending the content anywhere.",
          "That distinction matters for contracts, medical records, and identity documents. It is still worth checking how a specific tool works: open the network panel while merging, or disconnect and see whether the merge completes. The device and browser must also be trustworthy.",
        ],
      },
      {
        heading: "Prepare the Files",
        paragraphs: [
          "Unlock encrypted PDFs before merging, using a password you are authorized to use. Rotate sideways pages, delete blank pages, and decide whether mixed page sizes are acceptable. A merge preserves those differences rather than smoothing them out.",
          "Name the files in the order you want them to appear. If the documents are chapters or exhibits, note the intended sequence separately so a drag-and-drop mistake is easy to catch. Check that each file opens and its page count matches.",
        ],
        list: [
          "Remove passwords you are authorized to remove.",
          "Rotate pages and delete blanks first.",
          "Name files in the intended order.",
          "Check each page count before merging.",
        ],
      },
      {
        heading: "Order, Bookmarks, and Signatures",
        paragraphs: [
          "Merge order is reading order, so review the file list first. Bookmarks and the document outline often belong to the source files and may be dropped or flattened. If navigation matters, add a simple table of contents after merging.",
          "Metadata such as title and author usually comes from the first file or the tool's defaults. Form fields with the same name can collide, and digital signatures are invalidated by any change to the document. Keep signed originals separate.",
        ],
      },
      {
        heading: "Check the Merged File",
        paragraphs: [
          "Confirm that the page count equals the sum of the sources. Open the first and last page of each source, then spot-check pages with images and unusual fonts. Select text to confirm it is still searchable.",
          "Check the file size and test it in the viewer your recipient is likely to use. If the result is much larger than expected, the tool may have duplicated fonts or images. If it is much smaller, check that nothing was dropped.",
        ],
        example: {
          title: "Example: a four-document packet",
          lines: [
            "Sources: cover (1 page), contract (6), appendix (3), signed page (1).",
            "Expected total: 1 + 6 + 3 + 1 = 11 pages.",
            "Check the start and end of each source in the merged file.",
            "Keep the signed page as a separate original.",
          ],
        },
      },
      {
        heading: "When to Keep Files Separate",
        paragraphs: [
          "Very large files can become slow to open and hard to email. Documents that need separate signatures, audit trails, or access controls should usually stay separate. Accessibility tags can also be lost when files are combined.",
          "If the goal is simply to send several files together, a ZIP archive or a shared folder may be better. Merge when a single reading sequence is genuinely useful, not just because one attachment feels tidier.",
        ],
      },
    ],
    faq: [
      {
        question: "Are merged PDFs still searchable?",
        answer:
          "If the source pages contain real text, that text is normally preserved and remains searchable. Scanned pages are images, so they stay unsearchable unless someone has already run optical character recognition on them.",
      },
      {
        question: "Does merging reduce PDF quality?",
        answer:
          "Pages are usually copied rather than re-rendered, but some tools recompress images to reduce size. Compare the result with the originals at a high zoom level, and check the file size, before you send it.",
      },
      {
        question: "Can I merge password-protected PDFs?",
        answer:
          "Only after unlocking them with a password you are authorized to use. Some tools will prompt for the password, while others require you to save an unlocked copy first.",
      },
    ],
  },
  {
    slug: "how-to-resize-images-for-the-web",
    title: "How to Resize Images for the Web",
    category: "Technology",
    date: "2026-10-06",
    excerpt:
      "Resize images for the web without distortion, choose the right pixel dimensions and file format, and balance visual quality against download size.",
    tool: { name: "Image Studio", path: "/image-studio" },
    takeaways: [
      "Export images at the largest pixel size the layout will actually display.",
      "Lock the aspect ratio when resizing, or crop deliberately when the shape must change.",
      "Format and compression settings often matter as much as the dimensions.",
    ],
    sections: [
      {
        heading: "Pixels Decide the File Size",
        paragraphs: [
          "A digital image has a fixed number of pixels arranged in a grid. A photo that is 4,000 pixels wide contains far more detail than a page slot 800 pixels wide can show. Resizing changes that grid, not just how large the image appears on screen.",
          "Browsers scale images to fit their layout, but they still download the full file. Serving a 4,000-pixel photo in a 400-pixel slot wastes bandwidth and can make a page slower. Export at the largest size the layout will actually use.",
        ],
      },
      {
        heading: "Keep the Aspect Ratio",
        paragraphs: [
          "Aspect ratio is the relationship between width and height, such as 3:2 or 16:9. Divide the width by the height to find it: 1,200 ÷ 800 = 1.5, or 3:2. Changing one dimension without the other stretches the image.",
          "When the target shape differs, choose between cropping and letterboxing. Cropping removes pixels from the edges and keeps the subject sharp; letterboxing adds empty space. Decide where the important part of the image sits before you crop.",
        ],
      },
      {
        heading: "Choose the Right Format",
        paragraphs: [
          "JPEG suits photographs and other continuous-tone images. PNG is better for screenshots, diagrams, and images that need transparency. WebP is widely supported and often smaller than JPEG or PNG at similar quality, while AVIF can be smaller still but takes longer to encode.",
          "SVG is different: it describes shapes rather than pixels, so it stays sharp at any size and is ideal for logos and icons. It is not suitable for photographs. The wrong format can make a file larger without improving it.",
        ],
      },
      {
        heading: "Quality and Compression",
        paragraphs: [
          "Lossy formats such as JPEG and WebP discard some detail to save space. A quality setting around 70 to 85 is a common starting point, but the right value depends on the image. Check smooth gradients and fine text, where artifacts show first.",
          "Each re-save of a lossy image loses more detail, so keep an original and export from it rather than editing the exported copy. Many exporters also strip metadata such as camera details and location; decide whether that information should remain.",
        ],
      },
      {
        heading: "Size for Real Screens",
        paragraphs: [
          "A CSS pixel is not always one physical pixel. On a high-density display, a 400-pixel-wide slot may use 800 or more physical pixels. Many responsive sites provide 1x and 2x versions and let the browser choose.",
          "Use the layout to set the maximum display width, then export at that width and at twice that width for high-density screens. For full-width banners, account for the content container rather than the full monitor width.",
        ],
        list: [
          "Measure the slot in CSS pixels.",
          "Export at 1x and 2x for high-density screens.",
          "Let the browser choose with responsive image markup.",
          "Compress and inspect the final file.",
        ],
      },
      {
        heading: "A Repeatable Workflow",
        paragraphs: [
          "Crop first, then resize to the largest dimension you need, then export in the chosen format. Check the pixel dimensions and file size before uploading. Rename the file so its dimensions or purpose are obvious, and write alt text that describes its role.",
          "Compare the exported image with the original at 100 percent zoom. If edges look soft or text looks blurry, you may have upscaled or compressed too aggressively. A smaller file is only an improvement if it still looks right.",
        ],
        example: {
          title: "Example: a 3:2 photo for a 600-pixel slot",
          lines: [
            "Slot width: 600 CSS pixels; height at 3:2 is 400.",
            "Export at 600 × 400 for standard displays.",
            "Export at 1,200 × 800 for high-density displays.",
            "Check the file size and inspect the result at 100 percent.",
          ],
        },
      },
    ],
    faq: [
      {
        question: "Does resizing an image reduce its quality?",
        answer:
          "Making an image smaller discards pixels, but it usually looks fine at the new size. Enlarging it adds pixels that were never captured, so it tends to look soft. Lossy compression can reduce quality at any size.",
      },
      {
        question: "What size should a hero image be?",
        answer:
          "Measure the widest container the hero will fill, then export at that width and at twice that width for high-density screens. A single oversized file wastes bandwidth on every visit.",
      },
      {
        question: "Should screenshots use PNG or JPEG?",
        answer:
          "PNG is usually the better choice for screenshots because it preserves sharp text and flat colors without compression artifacts. JPEG is more suitable for photographs.",
      },
    ],
  },
  {
    slug: "how-qr-codes-work",
    title: "How QR Codes Work",
    category: "Technology",
    date: "2026-10-10",
    excerpt:
      "A plain-language explanation of QR code structure, error correction, capacity, and the practical choices that decide whether a code scans reliably.",
    tool: { name: "QR Code Generator", path: "/qr-code-generator" },
    takeaways: [
      "Finder patterns let a scanner locate the code and determine its orientation.",
      "Higher error correction adds redundancy but makes the grid denser for the same data.",
      "Contrast, print size, and a clear quiet zone matter as much as the encoded content.",
    ],
    sections: [
      {
        heading: "A Grid of Modules",
        paragraphs: [
          "A QR code is a square grid of dark and light modules. Three large squares in the corners are finder patterns; they let a scanner locate the code and work out its orientation. Alignment patterns help correct distortion on a curved surface.",
          "The code also contains timing patterns, format information, and the encoded data. Version 1 is a 21 × 21 grid, and the largest version is 177 × 177. A clear margin, called the quiet zone, must surround the code for scanners to separate it from the background.",
        ],
      },
      {
        heading: "From Data to Modules",
        paragraphs: [
          "An encoder chooses a mode based on the content. Numeric mode packs digits efficiently, alphanumeric mode handles uppercase letters and a few symbols, and byte mode carries arbitrary bytes such as UTF-8 text. The mode, length, and payload are written into the data stream.",
          "Error-correction codewords are calculated with a Reed-Solomon algorithm and interleaved with the data. The result is masked to avoid large blank areas or misleading shapes, then placed in the grid with format information.",
        ],
      },
      {
        heading: "Error Correction Is a Trade-off",
        paragraphs: [
          "QR codes support four error-correction levels. Level L can recover roughly 7 percent of damaged codewords, M about 15 percent, Q about 25 percent, and H about 30 percent. Higher levels make the code denser because more redundant codewords are added.",
          "Use a higher level when a code will be printed small, scuffed, or covered by a logo. Do not cover the finder patterns or the quiet zone. If a logo covers too much of the data area, no error-correction level can guarantee a scan.",
        ],
      },
      {
        heading: "Capacity and Scan Reliability",
        paragraphs: [
          "Capacity depends on the version, the error-correction level, and the encoding mode. A version 40 code at level L can hold just under 3,000 bytes, but a code that dense needs a large, high-quality print to scan reliably. Most links use far less data.",
          "Reliability comes from contrast, size, and a clean background. Dark modules on a light background are conventional. Avoid glare, low-resolution screens, and printing too small for the scanning distance. Test with more than one phone.",
        ],
      },
      {
        heading: "Static and Dynamic Codes",
        paragraphs: [
          "A static QR code contains the destination directly. It cannot be changed after printing and does not depend on a third-party service. A dynamic code points to a short URL that redirects, which allows the destination to be edited and lets the provider count scans.",
          "Dynamic codes depend on that redirect service staying online and on its terms. They may collect data about scans, so disclose that where required. For a poster, package, or long-lived document, a static code is often safer.",
        ],
      },
      {
        heading: "Design and Testing",
        paragraphs: [
          "Keep the code square and preserve its proportions. A border of light space is part of the design, not empty margin. If you add a logo, test the result at the final print size and scanning distance.",
          "Keep the URL short enough to keep the grid open, and serve it over HTTPS. Check the link on both iOS and Android, in low light, and with the phone held at an angle. A code that scans on your desk may fail on a printed sign.",
        ],
        example: {
          title: "Example: a code for a menu",
          lines: [
            "Destination: a mobile-friendly menu page over HTTPS.",
            "Payload: about 40 characters, byte mode.",
            "Print size: large enough to scan from a table.",
            "Test: two phones, normal and low light.",
          ],
        },
      },
    ],
    faq: [
      {
        question: "Can a QR code be read after it is damaged?",
        answer:
          "Often, within limits. Error correction can reconstruct some missing or unreadable modules, but the amount depends on the level used and the type of damage. Damage to a finder pattern is especially likely to prevent a scan.",
      },
      {
        question: "Do QR codes expire?",
        answer:
          "A static code does not expire, because the data is contained in the pattern. A dynamic code works only while its redirect service is online and the link remains active.",
      },
      {
        question: "Is it safe to scan a QR code?",
        answer:
          "Treat it like a link from an unknown source. Preview the destination before opening it, and be cautious if the page asks for a password, payment, or personal details. The code itself cannot tell you whether the destination is trustworthy.",
      },
    ],
  },
  {
    slug: "json-formatting-basics",
    title: "JSON Formatting and Validation Basics",
    category: "Technology",
    date: "2026-10-14",
    excerpt:
      "Learn the rules that make JSON data valid, fix the errors parsers report most often, and understand why formatting is separate from correctness.",
    tool: { name: "JSON Formatter", path: "/json-formatter" },
    takeaways: [
      "JSON uses double quotes, no comments, and no trailing commas.",
      "Pretty-printing makes data readable but does not make invalid JSON valid.",
      "Parser errors point to a position; the actual cause is often just before it.",
    ],
    sections: [
      {
        heading: "JSON in One Paragraph",
        paragraphs: [
          "JSON is a text format for representing structured data. It began as a subset of JavaScript object notation but is now language-independent, with its grammar defined by RFC 8259 and ECMA-404. Nearly every programming language can read and write it.",
          "A JSON document is built from objects, arrays, strings, numbers, true, false, and null. Objects use curly braces and string keys; arrays use square brackets. That small set of building blocks is enough to describe nested records, lists, and configuration.",
        ],
      },
      {
        heading: "The Rules That Break Parsers",
        paragraphs: [
          "Strings and keys must use double quotes. Single quotes and unquoted keys are common in JavaScript but invalid in JSON. Commas separate members, and a trailing comma before a closing brace or bracket is not allowed.",
          "Comments are not part of the format. Numbers cannot have leading zeros or use hexadecimal notation, and values such as NaN and Infinity are not valid. A top-level value may be an object, an array, or a scalar, though objects and arrays are most common.",
        ],
        list: [
          "Use double quotes for every key and string.",
          "Remove trailing commas.",
          "Remove comments before parsing.",
          "Check for smart quotes pasted from a word processor.",
        ],
      },
      {
        heading: "Formatting Is Not Validation",
        paragraphs: [
          "Whitespace between tokens has no meaning in JSON. A minified document and an indented one parse to the same data. Pretty-printing adds line breaks and indentation so humans can read the structure; it does not make an invalid document valid.",
          "A formatter will often refuse to format invalid input, which is useful but not the same as validation against a schema. Schema validation checks types, required fields, and allowed values. Those rules come from the application, not from JSON itself.",
        ],
      },
      {
        heading: "Read the Error Message",
        paragraphs: [
          "Most parsers report a line and column, or a character position. Start there and look just before it: a missing comma often produces an error at the next token, and a stray quote can shift everything after it. The reported position is a clue, not always the cause.",
          "A byte order mark at the start of a file, invisible characters from a copy-paste, or an unescaped newline inside a string can all cause failures that look mysterious. Use a tool that shows line numbers and highlights the exact offending character.",
        ],
      },
      {
        heading: "Escaping and Unicode",
        paragraphs: [
          "Inside a string, a double quote must be escaped with a backslash, and so must a backslash. Newlines, tabs, and other control characters are written as escape sequences such as a backslash followed by n. Forward slashes may be escaped but do not have to be.",
          "Non-ASCII text can appear directly in UTF-8 JSON or as a backslash-u escape. Both are valid, but the literal form is easier to read. Ensure the file is saved as UTF-8 and the parser is told the encoding.",
        ],
      },
      {
        heading: "Working With Large Documents",
        paragraphs: [
          "Hand-editing a large JSON file is risky. Change one value at a time, keep a backup, and re-run the parser after each change. If the data is generated, fix the generator rather than the output, because the next export will overwrite the repair.",
          "Use a formatter to inspect structure and a schema validator to check meaning. Duplicate keys are not covered clearly by the format; different parsers may keep the first or last value. Avoid duplicate keys entirely.",
        ],
        example: {
          title: "Example: fixing a common error",
          lines: [
            "Invalid: a trailing comma before the closing brace.",
            "Parser message: unexpected token at line 4.",
            "Fix: remove the comma and parse again.",
            "Then validate the data against the expected schema.",
          ],
        },
      },
    ],
    faq: [
      {
        question: "Is JSON the same as a JavaScript object?",
        answer:
          "No. JSON is a text format with stricter rules. JavaScript object literals allow single quotes, unquoted keys, comments, and trailing commas, while JSON does not.",
      },
      {
        question: "Why does my JSON fail when it looks fine?",
        answer:
          "Invisible characters, smart quotes, a byte order mark, or a missing comma are common causes. Paste the text into a validator that reports a line and column, then inspect the position just before the error.",
      },
      {
        question: "Can JSON contain comments?",
        answer:
          "Not in standard JSON. Some tools accept comments as an extension, but a standard parser will reject them. Put explanatory notes in a separate field or document instead.",
      },
    ],
  },
  {
    slug: "markdown-for-beginners",
    title: "Markdown for Beginners",
    category: "Technology",
    date: "2026-10-18",
    excerpt:
      "Learn the Markdown syntax you will use most, avoid the formatting traps, and understand how a preview turns plain text into structured HTML.",
    tool: { name: "Markdown Previewer", path: "/markdown-previewer" },
    takeaways: [
      "Markdown is plain text with a few formatting conventions that convert to HTML.",
      "A blank line between blocks prevents many unexpected rendering problems.",
      "Flavors differ, so preview in the tool that will publish the document.",
    ],
    sections: [
      {
        heading: "Plain Text With Structure",
        paragraphs: [
          "Markdown is a lightweight markup language created by John Gruber in 2004. You write plain text with a few conventions, and a converter turns it into HTML. The source remains readable before conversion, which is why Markdown is used for notes, documentation, and README files.",
          "There is no single definitive Markdown. CommonMark defines a precise specification, and GitHub Flavored Markdown adds features such as tables and task lists. Other platforms add their own extensions. The same file can render slightly differently in different tools.",
        ],
      },
      {
        heading: "Headings and Paragraphs",
        paragraphs: [
          "A heading starts with one or more hash marks followed by a space. One hash is a level-one heading, two hashes a level-two heading, and so on through level six. Use the level that reflects the document structure rather than the size you want.",
          "Separate paragraphs with a blank line. A single line break usually does not create a new paragraph; it may render as a space. Some flavors treat line breaks differently, so check the preview when the distinction matters.",
        ],
      },
      {
        heading: "Emphasis, Lists, and Links",
        paragraphs: [
          "Surround text with one asterisk for italic and two for bold. Underscores also work, but they can behave differently inside words, so asterisks are safer. Lists use a hyphen or asterisk at the start of each line, with blank lines and indentation for nested items.",
          "A link places the link text in square brackets followed by the URL in parentheses. An image uses the same pattern with an exclamation mark in front. Reference-style links collect the URLs elsewhere, which keeps long documents readable.",
        ],
      },
      {
        heading: "Code, Quotes, and Tables",
        paragraphs: [
          "Wrap short code in backticks. For a block of code, use three backticks on their own lines, optionally followed by a language name for syntax highlighting. Fence the block so that special characters inside it are not treated as formatting.",
          "A greater-than sign at the start of a line creates a block quote. Tables are common in GitHub Flavored Markdown but are not part of the original specification. Pipes separate the cells, and a line of dashes separates the header from the body.",
        ],
      },
      {
        heading: "Mistakes That Change the Output",
        paragraphs: [
          "The most common problem is a missing blank line before a list or heading, which can cause the markup to be treated as ordinary text. Inconsistent indentation breaks nested lists, and mixing tabs with spaces makes the structure hard to predict.",
          "Special characters such as asterisks, underscores, and brackets can be escaped with a backslash when you want them to appear literally. HTML is allowed in many Markdown processors, but not all platforms permit it, so do not rely on it for essential layout.",
        ],
      },
      {
        heading: "Preview and Keep It Portable",
        paragraphs: [
          "Write in a plain-text editor and preview in the same renderer that will publish the document. If the target is a README, preview on the hosting platform; if it is a static site, preview with the site's converter. Differences in flavor show up quickly this way.",
          "Keep the source in version control if the document will change over time. Avoid platform-specific extensions when portability matters, and check that links resolve. Markdown is meant to be simple, so prefer the plainest syntax that produces the result you need.",
          "A quick preview catches most broken lists, stray asterisks, and links that point to the wrong place before the document reaches a reader.",
        ],
      },
    ],
    faq: [
      {
        question: "Is Markdown the same as HTML?",
        answer:
          "No. Markdown is a lightweight text syntax that is converted into HTML. The source file stays readable as plain text, while HTML is the output that browsers render.",
      },
      {
        question: "Why is my line break not showing?",
        answer:
          "A single newline is often treated as a space. Leave a blank line between paragraphs, or check whether your flavor supports a hard line break with two trailing spaces or a backslash.",
      },
      {
        question: "Which Markdown flavor should I use?",
        answer:
          "Use the flavor supported by your publishing platform. CommonMark is a solid default, and GitHub Flavored Markdown is common for code hosting and documentation.",
      },
    ],
  },
];
