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
  {
    slug: "website-metadata-and-social-previews",
    title: "Website Metadata and Social Previews: A Practical Audit Guide",
    category: "Technology",
    date: "2026-10-24",
    excerpt:
      "Understand what search engines and social platforms read from a page, which tags matter, and how to audit a public URL without guessing.",
    tool: {
      name: "Website Metadata Checker",
      path: "/website-metadata-checker",
    },
    takeaways: [
      "Metadata describes a page to search engines, social platforms, and browsers; it does not control how every platform will present it.",
      "Title, description, canonical, and robots directives matter most for search; Open Graph and Twitter tags shape link previews.",
      "Many crawlers and social scrapers read raw HTML, so metadata added only by JavaScript may never reach them.",
    ],
    sections: [
      {
        heading: "What Metadata Actually Does",
        paragraphs: [
          "Metadata is the part of a page that describes the page itself. Search engines, social platforms, and browsers read elements such as the title, meta description, canonical link, robots directives, viewport tag, and language attribute. These tags usually do not change what visitors see, but they influence how the page is summarized, indexed, and shared.",
          "There is no single metadata score. Different services read different tags at different times. Google may rewrite a title or description, a social network may keep an old preview, and a crawler may see raw HTML before JavaScript runs. Treat metadata as a set of signals, not a contract.",
        ],
      },
      {
        heading: "Titles and Descriptions",
        paragraphs: [
          "The title element is still one of the strongest on-page signals. Keep it specific, readable, and unique. Roughly 30 to 60 characters is a useful working range, but the real limit is visual: narrow screens and long site names can truncate a title that looks fine on a desktop.",
          "A meta description does not directly set rankings, but it can influence the snippet and click-through rate. Aim for about 70 to 160 characters that tell a reader what the page answers. Write for people first; search engines may replace the description with page text that matches the query.",
        ],
        example: {
          title: "Example: replacing a generic title and description",
          lines: [
            "Weak title: Home | Example Company",
            "Better title: Website Metadata Checker - Audit Titles and Social Tags",
            "Weak description: Learn more about our services.",
            "Better description: Check a public page's title, description, canonical, Open Graph tags, and headings in one report.",
          ],
        },
        note:
          "Character counts are a planning guide. Search engines measure display width, not characters, and can rewrite either field. Use the [Word and Character Counter](/word-counter) when a precise limit matters.",
      },
      {
        heading: "Canonical, Robots, and Indexing",
        paragraphs: [
          "A canonical link tells search engines which URL is the preferred version when the same content is reachable through several addresses. Most pages should use a self-referencing canonical. A canonical pointing to another page is a consolidation request, not a redirect; it does not send visitors anywhere.",
          "Robots directives control indexing and link following. A noindex meta tag or X-Robots-Tag header asks search engines not to index the page. Do not combine noindex with a canonical pointing elsewhere and expect predictable behavior. Check staging sites carefully: a leftover noindex is a common launch mistake.",
        ],
        list: [
          "Use one absolute canonical URL and keep it consistent with og:url.",
          "Check both the robots meta tag and the X-Robots-Tag response header.",
          "Remove noindex from pages that should appear in search results.",
          "Confirm that the canonical URL returns the same content, not a redirect loop.",
        ],
      },
      {
        heading: "Open Graph and Twitter Cards",
        paragraphs: [
          "Open Graph tags describe a page to social platforms. The core set is og:title, og:description, og:image, og:url, and og:type. Twitter/X uses its own tags, but many platforms fall back to Open Graph when Twitter tags are missing.",
          "Preview images should be absolute URLs, large enough to look sharp, and close to a 1.91:1 ratio for wide cards. Platforms cache previews aggressively, so a change may not appear until the URL is fetched again. Some platforms also override the title or image based on their own rules.",
        ],
        list: [
          "Provide og:title, og:description, og:image, og:url, and og:type.",
          "Use a 1200 by 630 pixel image as a practical wide-card default.",
          "Add twitter:card and the matching title, description, and image tags.",
          "Re-scrape or wait for the platform cache after changing an image.",
        ],
      },
      {
        heading: "Structured Data and Headings",
        paragraphs: [
          "JSON-LD is a script block that describes entities such as an Article, Product, FAQPage, or Organization. It can help search engines understand relationships, but it does not guarantee a rich result. The markup must match the visible page; describing a product that is not present is a policy risk.",
          "Headings give the document an outline. One clear H1 is a useful default, followed by H2 sections in reading order. Heading counts are not a ranking formula, but a page with no H1 or with many competing H1s is harder to scan. Use the heading level that fits the structure, not the font size you want.",
        ],
      },
      {
        heading: "Audit a Page in Practice",
        paragraphs: [
          "Start with a URL that returns the page without a login. Check the HTTP status first; a redirected or error page will produce misleading metadata. Then read the title and description as a search result, compare the canonical with the address you expect, and confirm that indexing is allowed.",
          "Social tags and structured data come next. Test a preview in the platform where the link will be shared. Finally, use a checker that reads raw HTML. If tags are injected only by client-side JavaScript, a social scraper may never see them even when a browser does. The [Website Metadata Checker](/website-metadata-checker) groups these fields and flags common problems in one report.",
        ],
        example: {
          title: "Example: a pricing page with a campaign parameter",
          lines: [
            "Requested URL: https://example.com/pricing?ref=newsletter",
            "Canonical: https://example.com/pricing",
            "Status: 200, with no redirect",
            "Title: 52 characters; description: 141 characters",
            "Social image: absolute URL, 1200 by 630 pixels",
          ],
        },
        note:
          "A checker reads the final HTML document after any redirects. It cannot see a logged-in view, a consent wall, or content that appears only after JavaScript runs. It also cannot predict how Google or a social platform will render the preview.",
      },
    ],
    faq: [
      {
        question: "Why does Google show a different description?",
        answer:
          "Google may rewrite a meta description when it believes another passage better matches the query. A clear, specific description still helps, but it is a suggestion rather than a guarantee.",
      },
      {
        question: "Why is my social preview still outdated?",
        answer:
          "Social platforms cache preview data. Update the tags, then use the platform's re-scrape or sharing debugger tool, or wait for the cache to expire. The page must return the new tags to an unauthenticated scraper.",
      },
      {
        question: "Do meta keywords still matter?",
        answer:
          "No major search engine uses the meta keywords tag for ranking. It is not harmful, but it is not a useful place to spend effort. Focus on the visible page and the metadata that shapes indexing and previews.",
      },
      {
        question: "Can JavaScript add metadata?",
        answer:
          "Google can render JavaScript, but many social scrapers and other crawlers read only the initial HTML. Server-render or statically include essential title, description, canonical, robots, and Open Graph tags when previews and indexing matter.",
      },
    ],
  },
  {
    slug: "color-contrast-for-readable-interfaces",
    title: "Color Contrast for Readable Interfaces",
    category: "Technology",
    date: "2026-10-23",
    excerpt:
      "Learn how WCAG contrast ratios are calculated, what AA and AAA require, and how to fix a pair that looks fine to you but fails for others.",
    tool: {
      name: "Color Palette Generator",
      path: "/color-palette-generator",
    },
    takeaways: [
      "Contrast ratio compares relative luminance, not hue difference or perceived brightness.",
      "WCAG AA requires 4.5:1 for normal text and 3:1 for large text and UI components; AAA raises normal text to 7:1.",
      "Adjusting lightness while preserving hue is the most predictable way to fix a failing pair.",
    ],
    sections: [
      {
        heading: "What Contrast Ratio Measures",
        paragraphs: [
          "Contrast ratio compares the relative luminance of two colors. It is not the same as hue difference or how bright a color feels. The formula produces a number from 1:1, where the colors are identical, to 21:1 for black against white.",
          "Relative luminance weights red, green, and blue according to human sensitivity. That is why a saturated blue and a light gray can have less contrast than expected, even though they look different. The ratio is symmetric: swapping text and background does not change it.",
        ],
        formula: "ratio = (lighter luminance + 0.05) / (darker luminance + 0.05)",
      },
      {
        heading: "The WCAG Thresholds",
        paragraphs: [
          "WCAG 2.2 sets minimum contrast for text and non-text content. AA is the common target: 4.5:1 for normal text, 3:1 for large text, and 3:1 for user-interface components and graphical objects needed to understand content. AAA raises normal text to 7:1 and large text to 4.5:1.",
          "Large text is commonly defined as 18 point regular or 14 point bold, roughly 24 pixels or 18.66 pixels in CSS. The exact rendered size depends on the font, so do not rely on a nominal font size alone. Logos and incidental decoration are exempt; body text and essential labels are not.",
        ],
        list: [
          "AA normal text: 4.5:1.",
          "AA large text: 3:1.",
          "AA UI components and meaningful graphics: 3:1.",
          "AAA normal text: 7:1; AAA large text: 4.5:1.",
        ],
      },
      {
        heading: "A Palette Can Look Fine and Fail",
        paragraphs: [
          "Designers often judge contrast on a bright monitor in a bright room. A pair that looks acceptable there can disappear on a phone in sunlight, a projector, or a low-quality display. Thin weights, small sizes, and anti-aliasing make the problem worse.",
          "Color-vision differences matter too. Red and green can have similar luminance even when they look distinct to one viewer. Contrast is not a complete accessibility test, but it is a measurable baseline that does not depend on color perception.",
        ],
      },
      {
        heading: "Fix a Pair Without Changing the Brand",
        paragraphs: [
          "The most predictable fix is to change lightness while preserving hue and saturation. Darkening text on a light background or lightening it on a dark background usually increases contrast without leaving the brand color family. The [Color Palette Generator](/color-palette-generator) suggests the nearest lightness adjustment that reaches the next WCAG target.",
          "Other options include changing the background, swapping text and background, adding a solid surface behind text, or using a larger, heavier typeface. Changing only the font weight does not change the formal contrast ratio, though it can improve legibility. Do not use a gradient as the only contrast fix if text crosses the lightest part.",
        ],
        example: {
          title: "Example: three pairs on white",
          lines: [
            "#2563eb on #ffffff = 5.17:1. Passes AA normal text, fails AAA normal text.",
            "#64748b on #ffffff = 4.76:1. Passes AA normal text with little margin.",
            "#94a3b8 on #ffffff = 2.56:1. Fails AA for normal and large text.",
          ],
        },
      },
      {
        heading: "Check States and Components",
        paragraphs: [
          "A button can pass in its default state and fail on hover. Links, focus rings, disabled controls, form borders, icons that carry meaning, and chart labels all need attention. The 3:1 requirement applies to component boundaries and focus indicators, not only to paragraphs.",
          "Placeholder text is often too light. Disabled text is sometimes exempt from formal contrast requirements, but it should still be readable enough to understand. Test focus states with a keyboard, because a focus indicator that disappears against the background is a functional defect.",
        ],
      },
      {
        heading: "A Practical Workflow",
        paragraphs: [
          "Start with the pair that carries the most text. Check it at the sizes and weights you actually use. If it fails, try a lightness adjustment before changing the palette. Then test the same colors on the surfaces where they appear: white cards, tinted sections, images, and dark mode.",
          "Record the final hex values and the ratio in the design system, and recheck after a theme change. Small changes to a background tint can push a borderline pair below the threshold. Treat contrast as part of the component, not a one-time choice made in a palette tool.",
        ],
        list: [
          "Check body text, headings, links, buttons, borders, and focus states.",
          "Test both light and dark surfaces if the interface supports them.",
          "Prefer lightness changes when the brand hue must stay recognizable.",
          "Recheck after changing a font size, weight, or background tint.",
        ],
        note:
          "Passing AA does not make an interface accessible on its own. Keyboard access, labels, reading order, motion, and clear error messages still matter.",
      },
    ],
    faq: [
      {
        question: "Does every piece of text need 4.5:1?",
        answer:
          "Normal text generally needs 4.5:1 for AA. Large text can use 3:1, and logos or purely decorative text are exempt. Text inside a logo is different from ordinary interface text that happens to be styled prominently.",
      },
      {
        question: "Why does black on white score 21:1?",
        answer:
          "Black has a relative luminance near zero and white near one. Applying the formula gives (1 + 0.05) divided by (0 + 0.05), which equals 21. That is the maximum possible ratio.",
      },
      {
        question: "Can color alone show an error?",
        answer:
          "No. A red border or red text without a message, icon, or other cue can be missed by people who cannot distinguish the color. Use color as an additional signal, not the only one.",
      },
      {
        question: "Do disabled controls need contrast?",
        answer:
          "WCAG exempts inactive user-interface components from the contrast requirement. Usability still improves when disabled text remains readable, so avoid making it so faint that users cannot tell what the control says.",
      },
    ],
  },
];
