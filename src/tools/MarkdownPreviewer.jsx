import { useMemo, useState } from "react";
import ToolPage from "./ToolPage.jsx";
import { copyText, downloadBlob } from "./utils.js";

const SAMPLE = [
  "# CALVORO Markdown preview",
  "",
  "A **safe** preview for *notes*, lists, and links. Raw HTML is shown as text, not executed.",
  "",
  "## Why use Markdown?",
  "",
  "- Structure a document with `#` headings",
  "- Add [links](/blog) or [external links](https://example.com)",
  "- Keep code inside fenced blocks",
  "",
  "> Markdown is easier to scan than a wall of HTML.",
  "",
  "1. Write in the left panel",
  "2. Review the preview",
  "3. Copy or download the source",
  "",
  "### A small code block",
  "",
  "```js",
  "const total = 2 + 2;",
  "console.log(total);",
  "```",
  "",
  "---",
  "",
  "That is the core syntax.",
].join("\n");

const INLINE_PATTERN =
  /(!\[[^\]\n]*\]\([^()\s]+\)|`[^`\n]+`|\*\*[^*\n]+\*\*|__[^_\n]+__|\*[^*\n]+\*|_[^_\n]+_|\[[^\]\n]+\]\([^()\s]+\))/g;

const headingPattern = /^(#{1,6})\s+(.*)$/;
const fencePattern = /^ {0,3}```(.*)$/;
const closingFencePattern = /^ {0,3}```\s*$/;
const hrPattern = /^ {0,3}([-*_])(?:\s*\1){2,}\s*$/;
const quotePattern = /^ {0,3}>\s?(.*)$/;
const unorderedPattern = /^ {0,3}[-*+]\s+(.*)$/;
const orderedPattern = /^ {0,3}(\d{1,9})[.)]\s+(.*)$/;

function safeHref(value) {
  const url = value.trim();
  if (/^https?:\/\//i.test(url) || /^mailto:/i.test(url)) return url;
  if (url.startsWith("/") && !url.startsWith("//")) return url;
  if (url.startsWith("#")) return url;
  return null;
}

function isBlockStart(value) {
  return (
    !value.trim() ||
    headingPattern.test(value) ||
    fencePattern.test(value) ||
    hrPattern.test(value) ||
    quotePattern.test(value) ||
    unorderedPattern.test(value) ||
    orderedPattern.test(value)
  );
}

function renderInline(text, keyPrefix) {
  const nodes = [];
  let lastIndex = 0;
  let match;
  INLINE_PATTERN.lastIndex = 0;

  while ((match = INLINE_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    const key = `${keyPrefix}-${match.index}`;

    if (token.startsWith("![")) {
      const labelMatch = token.match(/^!\[([^\]]*)\]\(([^()\s]+)\)$/);
      nodes.push(
        <span key={key} title={labelMatch ? labelMatch[2] : ""}>
          [image omitted: {labelMatch && labelMatch[1] ? labelMatch[1] : "untitled"}]
        </span>
      );
    } else if (token.startsWith("`")) {
      nodes.push(<code key={key}>{token.slice(1, -1)}</code>);
    } else if (token.startsWith("**") || token.startsWith("__")) {
      nodes.push(<strong key={key}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("*") || token.startsWith("_")) {
      nodes.push(<em key={key}>{token.slice(1, -1)}</em>);
    } else {
      const linkMatch = token.match(/^\[([^\]]+)\]\(([^()\s]+)\)$/);
      if (linkMatch) {
        const [, label, rawUrl] = linkMatch;
        const href = safeHref(rawUrl);
        if (href) {
          const external = /^https?:\/\//i.test(href);
          nodes.push(
            <a
              key={key}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
            >
              {label}
            </a>
          );
        } else {
          nodes.push(<span key={key}>{label}</span>);
        }
      } else {
        nodes.push(token);
      }
    }

    lastIndex = match.index + token.length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

function parseMarkdown(source) {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  const blocks = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (!line.trim()) {
      index += 1;
      continue;
    }

    const fence = line.match(fencePattern);
    if (fence) {
      const language = fence[1].trim();
      const code = [];
      index += 1;
      while (index < lines.length && !closingFencePattern.test(lines[index])) {
        code.push(lines[index]);
        index += 1;
      }
      if (index < lines.length) index += 1;
      blocks.push({ type: "code", language, content: code.join("\n") });
      continue;
    }

    const heading = line.match(headingPattern);
    if (heading) {
      blocks.push({
        type: "heading",
        level: heading[1].length,
        text: heading[2].trim(),
      });
      index += 1;
      continue;
    }

    if (hrPattern.test(line)) {
      blocks.push({ type: "hr" });
      index += 1;
      continue;
    }

    if (quotePattern.test(line)) {
      const quoteLines = [];
      while (index < lines.length) {
        const quoteMatch = lines[index].match(quotePattern);
        if (!quoteMatch) break;
        quoteLines.push(quoteMatch[1]);
        index += 1;
      }
      blocks.push({
        type: "quote",
        children: parseMarkdown(quoteLines.join("\n")),
      });
      continue;
    }

    if (unorderedPattern.test(line)) {
      const items = [];
      while (index < lines.length) {
        const itemMatch = lines[index].match(unorderedPattern);
        if (!itemMatch) break;
        let item = itemMatch[1];
        index += 1;
        while (index < lines.length && !isBlockStart(lines[index])) {
          item += ` ${lines[index].trim()}`;
          index += 1;
        }
        items.push(item);
      }
      blocks.push({ type: "list", ordered: false, start: 1, items });
      continue;
    }

    const ordered = line.match(orderedPattern);
    if (ordered) {
      const items = [];
      const start = Number(ordered[1]);
      while (index < lines.length) {
        const itemMatch = lines[index].match(orderedPattern);
        if (!itemMatch) break;
        let item = itemMatch[2];
        index += 1;
        while (index < lines.length && !isBlockStart(lines[index])) {
          item += ` ${lines[index].trim()}`;
          index += 1;
        }
        items.push(item);
      }
      blocks.push({ type: "list", ordered: true, start, items });
      continue;
    }

    const paragraph = [line];
    index += 1;
    while (index < lines.length && !isBlockStart(lines[index])) {
      paragraph.push(lines[index]);
      index += 1;
    }
    blocks.push({ type: "paragraph", lines: paragraph });
  }

  return blocks;
}

function renderBlocks(blocks, prefix = "md") {
  return blocks.map((block, index) => {
    const key = `${prefix}-${index}`;

    if (block.type === "heading") {
      const Tag = `h${Math.min(6, Math.max(1, block.level))}`;
      return <Tag key={key}>{renderInline(block.text, key)}</Tag>;
    }

    if (block.type === "code") {
      return (
        <pre key={key}>
          <code className={block.language ? `language-${block.language}` : undefined}>
            {block.content}
          </code>
        </pre>
      );
    }

    if (block.type === "hr") {
      return <hr key={key} />;
    }

    if (block.type === "quote") {
      return <blockquote key={key}>{renderBlocks(block.children, key)}</blockquote>;
    }

    if (block.type === "list") {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag key={key} start={block.ordered ? block.start : undefined}>
          {block.items.map((item, itemIndex) => (
            <li key={`${key}-item-${itemIndex}`}>
              {renderInline(item, `${key}-item-${itemIndex}`)}
            </li>
          ))}
        </Tag>
      );
    }

    const content = [];
    block.lines.forEach((line, lineIndex) => {
      const hardBreak = / {2,}$/.test(line) || /\\$/.test(line);
      const cleaned = line.replace(/\\$/, "").replace(/ {2,}$/, "");
      content.push(...renderInline(cleaned, `${key}-line-${lineIndex}`));
      if (lineIndex < block.lines.length - 1) {
        content.push(
          hardBreak ? <br key={`${key}-break-${lineIndex}`} /> : " "
        );
      }
    });

    return <p key={key}>{content}</p>;
  });
}

export default function MarkdownPreviewer() {
  const [source, setSource] = useState(SAMPLE);
  const [copyStatus, setCopyStatus] = useState("");

  const blocks = useMemo(() => parseMarkdown(source), [source]);
  const wordCount = source.trim() ? source.trim().split(/\s+/).length : 0;

  const copy = async () => {
    const copied = await copyText(source);
    setCopyStatus(copied ? "Markdown copied." : "Copy was blocked by the browser.");
    window.setTimeout(() => setCopyStatus(""), 2500);
  };

  const download = () => {
    downloadBlob(
      new Blob([source], { type: "text/markdown;charset=utf-8" }),
      "calvoro-notes.md"
    );
  };

  return (
    <ToolPage
      title="Markdown Previewer"
      kicker="Developer tool"
      description="Write Markdown and see a safe rendered preview with headings, lists, links, quotes, and fenced code. Raw HTML is never executed."
      seoTitle="Markdown Previewer - Safe Live Markdown Editor | CALVORO"
      seoDescription="Preview Markdown in your browser as you type. Supports headings, lists, links, quotes, inline code, and fenced code, with no HTML injection."
      steps={[
        "Write or paste Markdown in the editor.",
        "Review the rendered preview beside it.",
        "Copy the Markdown source or download it as a .md file.",
      ]}
      notes={[
        "This previewer supports common Markdown building blocks: headings, paragraphs, bold, italic, inline code, links, bullet and numbered lists, blockquotes, horizontal rules, and fenced code.",
        "Raw HTML is displayed as text and is never inserted into the page. Image syntax is marked as omitted rather than loading a remote file. Tables and deeply nested lists are not rendered specially.",
        "The generated preview is for checking structure and readability. A publishing platform may apply its own Markdown extensions or sanitizing rules.",
      ]}
      related={[
        { name: "Text Comparison", path: "/text-compare" },
        { name: "Word and Character Counter", path: "/word-counter" },
        { name: "JSON Formatter and Validator", path: "/json-formatter" },
      ]}
    >
      <div className="calvoro-tool-split">
        <div>
          <div className="calvoro-field">
            <label htmlFor="markdown-input">Markdown source</label>
            <textarea
              id="markdown-input"
              className="calvoro-tool-textarea"
              value={source}
              onChange={(event) => setSource(event.target.value)}
              rows={20}
              spellCheck="false"
              style={{ minHeight: 360 }}
            />
          </div>

          <div className="calvoro-tool-actions">
            <button
              type="button"
              className="calvoro-tool-button"
              onClick={copy}
              disabled={!source}
            >
              Copy Markdown
            </button>
            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={download}
              disabled={!source}
            >
              Download .md
            </button>
            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={() => setSource(SAMPLE)}
            >
              Load sample
            </button>
            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={() => setSource("")}
              disabled={!source}
            >
              Clear
            </button>
          </div>
        </div>

        <div>
          <div className="calvoro-field">
            <span className="calvoro-field-label">Rendered preview</span>
            <div className="calvoro-markdown-preview">
              {source.trim() ? (
                renderBlocks(blocks)
              ) : (
                <p style={{ color: "#94a3b8" }}>
                  Write some Markdown to see the preview.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="calvoro-stat-grid" style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}>
        <div className="calvoro-stat-card">
          <span>Words</span>
          <strong>{wordCount.toLocaleString()}</strong>
          <small>Whitespace split</small>
        </div>
        <div className="calvoro-stat-card">
          <span>Characters</span>
          <strong>{source.length.toLocaleString()}</strong>
          <small>Including Markdown syntax</small>
        </div>
        <div className="calvoro-stat-card">
          <span>Blocks</span>
          <strong>{blocks.length.toLocaleString()}</strong>
          <small>Headings, lists, code, and text</small>
        </div>
      </div>

      <p className="calvoro-inline-note" aria-live="polite">
        {copyStatus || "The preview updates as you type and never executes raw HTML."}
      </p>
    </ToolPage>
  );
}
