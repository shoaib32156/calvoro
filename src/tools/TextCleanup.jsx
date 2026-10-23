import { useMemo, useState } from "react";
import ToolPage from "./ToolPage.jsx";
import { copyText, downloadBlob } from "./utils.js";

export default function TextCleanup() {
  const [text, setText] = useState("");
  const [options, setOptions] = useState({
    trimLines: true,
    collapseSpaces: true,
    removeBlankLines: false,
    tabsToSpaces: true,
    removeInvisible: true,
    normalizeTypography: false,
    tidyPunctuation: false,
  });
  const [copyStatus, setCopyStatus] = useState("");

  const toggle = (name) => {
    setOptions((current) => ({ ...current, [name]: !current[name] }));
  };

  const cleaned = useMemo(() => {
    if (!text) return "";

    let value = text.replace(/\r\n?/g, "\n");

    if (options.removeInvisible) {
      value = value.replace(/[\u200B-\u200D\uFEFF\u2060]/g, "");
    }

    if (options.normalizeTypography) {
      value = value
        .replace(/[\u2018\u2019\u201A\u201B]/g, "'")
        .replace(/[\u201C\u201D\u201E\u201F]/g, '"')
        .replace(/[\u2013\u2014]/g, "-")
        .replace(/\u2026/g, "...")
        .replace(/\u00A0/g, " ");
    }

    if (options.tabsToSpaces) {
      value = value.replace(/\t/g, "  ");
    }

    let lines = value.split("\n");

    if (options.trimLines) {
      lines = lines.map((line) => line.trim());
    }

    if (options.collapseSpaces) {
      lines = lines.map((line) => line.replace(/ {2,}/g, " "));
    }

    if (options.tidyPunctuation) {
      lines = lines.map((line) =>
        line
          .replace(/\s+([,.;:!?])/g, "$1")
          .replace(/([,.;:!?])(?=[A-Za-z])/g, "$1 ")
          .replace(/ {2,}/g, " ")
      );
    }

    if (options.removeBlankLines) {
      lines = lines.filter((line) => line.trim().length > 0);
    }

    return lines.join("\n").replace(/^\n+|\n+$/g, "");
  }, [text, options]);

  const originalLines = text ? text.split(/\r?\n/).length : 0;
  const cleanedLines = cleaned ? cleaned.split("\n").length : 0;

  const copy = async () => {
    const copied = await copyText(cleaned);
    setCopyStatus(copied ? "Cleaned text copied." : "Copy was blocked by the browser.");
    window.setTimeout(() => setCopyStatus(""), 2500);
  };

  const download = () => {
    downloadBlob(
      new Blob([cleaned], { type: "text/plain;charset=utf-8" }),
      "calvoro-cleaned-text.txt"
    );
  };

  return (
    <ToolPage
      title="Text Cleanup"
      kicker="Text tool"
      description="Fix pasted text by trimming line endings, collapsing extra spaces, removing invisible characters, and normalizing blank lines."
      seoTitle="Clean Up Text - Remove Extra Spaces and Blank Lines | CALVORO"
      seoDescription="Clean pasted text in your browser: trim lines, collapse spaces, remove blank lines and invisible characters, and normalize quotes and dashes."
      steps={[
        "Paste the text that needs cleaning.",
        "Turn on only the transformations that suit the document.",
        "Review the result, then copy it or download it as a text file.",
      ]}
      notes={[
        "Cleaning changes characters, not meaning. It cannot detect a misspelled word or repair grammar.",
        "Turning on punctuation tidying adds a space after punctuation followed by a letter and removes spaces before punctuation. Check abbreviations and code samples afterward.",
        "Normalizing typography converts curly quotes, dashes, and ellipses to plain ASCII equivalents. Keep it off when the original typography is intentional.",
      ]}
      related={[
        { name: "Duplicate Line Remover", path: "/remove-duplicate-lines" },
        { name: "Find and Replace", path: "/find-replace" },
        { name: "Word and Character Counter", path: "/word-counter" },
      ]}
    >
      <div className="calvoro-field">
        <label htmlFor="cleanup-input">Text to clean</label>
        <textarea
          id="cleanup-input"
          className="calvoro-tool-textarea"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Paste messy text here..."
          rows={10}
        />
      </div>

      <div className="calvoro-checkbox-grid" style={{ marginTop: 16 }}>
        <label className="calvoro-checkbox">
          <input
            type="checkbox"
            checked={options.trimLines}
            onChange={() => toggle("trimLines")}
          />
          Trim spaces at the start and end of each line
        </label>
        <label className="calvoro-checkbox">
          <input
            type="checkbox"
            checked={options.collapseSpaces}
            onChange={() => toggle("collapseSpaces")}
          />
          Collapse repeated spaces
        </label>
        <label className="calvoro-checkbox">
          <input
            type="checkbox"
            checked={options.removeBlankLines}
            onChange={() => toggle("removeBlankLines")}
          />
          Remove blank lines
        </label>
        <label className="calvoro-checkbox">
          <input
            type="checkbox"
            checked={options.tabsToSpaces}
            onChange={() => toggle("tabsToSpaces")}
          />
          Convert tabs to two spaces
        </label>
        <label className="calvoro-checkbox">
          <input
            type="checkbox"
            checked={options.removeInvisible}
            onChange={() => toggle("removeInvisible")}
          />
          Remove zero-width and invisible characters
        </label>
        <label className="calvoro-checkbox">
          <input
            type="checkbox"
            checked={options.normalizeTypography}
            onChange={() => toggle("normalizeTypography")}
          />
          Normalize curly quotes, dashes, and ellipses
        </label>
        <label className="calvoro-checkbox">
          <input
            type="checkbox"
            checked={options.tidyPunctuation}
            onChange={() => toggle("tidyPunctuation")}
          />
          Tidy spaces around punctuation
        </label>
      </div>

      <div className="calvoro-tool-actions">
        <button
          type="button"
          className="calvoro-tool-button"
          onClick={copy}
          disabled={!cleaned}
        >
          Copy cleaned text
        </button>
        <button
          type="button"
          className="calvoro-tool-button is-secondary"
          onClick={download}
          disabled={!cleaned}
        >
          Download .txt
        </button>
        <button
          type="button"
          className="calvoro-tool-button is-secondary"
          onClick={() => setText("")}
          disabled={!text}
        >
          Clear
        </button>
      </div>

      <div className="calvoro-stat-grid">
        <div className="calvoro-stat-card">
          <span>Characters</span>
          <strong>{cleaned.length.toLocaleString()}</strong>
          <small>{(text.length - cleaned.length).toLocaleString()} removed</small>
        </div>
        <div className="calvoro-stat-card">
          <span>Lines</span>
          <strong>{cleanedLines.toLocaleString()}</strong>
          <small>{(originalLines - cleanedLines).toLocaleString()} fewer</small>
        </div>
        <div className="calvoro-stat-card">
          <span>Spaces</span>
          <strong>{(cleaned.match(/ /g) || []).length.toLocaleString()}</strong>
          <small>After cleanup</small>
        </div>
        <div className="calvoro-stat-card">
          <span>Words</span>
          <strong>
            {(cleaned.trim() ? cleaned.trim().split(/\s+/).length : 0).toLocaleString()}
          </strong>
          <small>Approximate whitespace count</small>
        </div>
      </div>

      <div className="calvoro-field" style={{ marginTop: 18 }}>
        <label htmlFor="cleanup-output">Cleaned result</label>
        <textarea
          id="cleanup-output"
          className="calvoro-tool-textarea"
          value={cleaned}
          readOnly
          rows={10}
          placeholder="The cleaned text will appear here."
        />
      </div>

      <p className="calvoro-inline-note" aria-live="polite">
        {copyStatus || "Preview updates as you change the options."}
      </p>
    </ToolPage>
  );
}
