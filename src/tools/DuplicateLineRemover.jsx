import { useMemo, useState } from "react";
import ToolPage from "./ToolPage.jsx";
import { copyText, downloadBlob } from "./utils.js";

export default function DuplicateLineRemover() {
  const [text, setText] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [trimWhitespace, setTrimWhitespace] = useState(true);
  const [removeEmpty, setRemoveEmpty] = useState(true);
  const [keepLast, setKeepLast] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");

  const result = useMemo(() => {
    if (!text) {
      return { output: "", inputLines: 0, outputLines: 0, removed: 0 };
    }

    const inputLines = text.split(/\r?\n/);
    const seen = new Set();
    const kept = [];
    const indexes = inputLines.map((_, index) => index);

    if (keepLast) {
      indexes.reverse();
    }

    indexes.forEach((index) => {
      const raw = inputLines[index];
      const line = trimWhitespace ? raw.trim() : raw;

      if (removeEmpty && !line.trim()) {
        return;
      }

      const key = caseSensitive ? line : line.toLowerCase();

      if (seen.has(key)) {
        return;
      }

      seen.add(key);
      kept.push(line);
    });

    if (keepLast) {
      kept.reverse();
    }

    const output = kept.join("\n");

    return {
      output,
      inputLines: inputLines.length,
      outputLines: kept.length,
      removed: inputLines.length - kept.length,
    };
  }, [text, caseSensitive, trimWhitespace, removeEmpty, keepLast]);

  const copyOutput = async () => {
    const copied = await copyText(result.output);
    setCopyStatus(copied ? "Unique lines copied." : "Copy was blocked by the browser.");
    window.setTimeout(() => setCopyStatus(""), 2500);
  };

  const download = () => {
    downloadBlob(
      new Blob([result.output], { type: "text/plain;charset=utf-8" }),
      "calvoro-unique-lines.txt"
    );
  };

  return (
    <ToolPage
      title="Duplicate Line Remover"
      kicker="Text tool"
      description="Remove repeated lines from a list while preserving the order you choose. Useful for email lists, tags, inventory, and pasted data."
      seoTitle="Remove Duplicate Lines - Free Online Tool | CALVORO"
      seoDescription="Remove duplicate lines from any list in your browser. Choose case sensitivity, whitespace trimming, blank-line removal, and first or last occurrence."
      steps={[
        "Paste a list with one item per line.",
        "Choose whether matching should ignore case or surrounding spaces.",
        "Select the unique lines and copy or download the cleaned list.",
      ]}
      notes={[
        "The tool compares complete lines. It does not remove duplicate words inside a sentence, and it does not merge lines that differ only in punctuation.",
        "Keeping the first occurrence preserves the earliest position of each unique line. Keeping the last occurrence preserves the latest position instead.",
        "Blank lines can be treated as duplicates or removed entirely. Turn off both options if blank lines are meaningful separators.",
      ]}
      related={[
        { name: "Line Sorter", path: "/line-sorter" },
        { name: "Text Cleanup", path: "/text-cleanup" },
        { name: "Text Comparison", path: "/text-compare" },
      ]}
    >
      <div className="calvoro-field">
        <label htmlFor="duplicate-input">List with possible duplicates</label>
        <textarea
          id="duplicate-input"
          className="calvoro-tool-textarea"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={"apple\nbanana\napple\norange\nbanana"}
          rows={10}
        />
      </div>

      <div className="calvoro-checkbox-grid" style={{ marginTop: 16 }}>
        <label className="calvoro-checkbox">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(event) => setCaseSensitive(event.target.checked)}
          />
          Treat uppercase and lowercase as different
        </label>
        <label className="calvoro-checkbox">
          <input
            type="checkbox"
            checked={trimWhitespace}
            onChange={(event) => setTrimWhitespace(event.target.checked)}
          />
          Trim spaces from each line
        </label>
        <label className="calvoro-checkbox">
          <input
            type="checkbox"
            checked={removeEmpty}
            onChange={(event) => setRemoveEmpty(event.target.checked)}
          />
          Remove empty lines
        </label>
        <label className="calvoro-checkbox">
          <input
            type="checkbox"
            checked={keepLast}
            onChange={(event) => setKeepLast(event.target.checked)}
          />
          Keep the last occurrence instead of the first
        </label>
      </div>

      <div className="calvoro-stat-grid">
        <div className="calvoro-stat-card">
          <span>Input lines</span>
          <strong>{result.inputLines}</strong>
        </div>
        <div className="calvoro-stat-card">
          <span>Unique lines</span>
          <strong>{result.outputLines}</strong>
        </div>
        <div className="calvoro-stat-card">
          <span>Removed</span>
          <strong>{result.removed}</strong>
        </div>
        <div className="calvoro-stat-card">
          <span>Duplicates</span>
          <strong>{Math.max(0, result.inputLines - result.outputLines)}</strong>
        </div>
      </div>

      <div className="calvoro-tool-actions">
        <button
          type="button"
          className="calvoro-tool-button"
          onClick={copyOutput}
          disabled={!result.output}
        >
          Copy unique lines
        </button>
        <button
          type="button"
          className="calvoro-tool-button is-secondary"
          onClick={download}
          disabled={!result.output}
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

      <div className="calvoro-field" style={{ marginTop: 18 }}>
        <label htmlFor="duplicate-output">Unique result</label>
        <textarea
          id="duplicate-output"
          className="calvoro-tool-textarea"
          value={result.output}
          readOnly
          rows={10}
          placeholder="The cleaned list will appear here."
        />
      </div>

      <p className="calvoro-inline-note" aria-live="polite">
        {copyStatus || "Changes are applied instantly as you edit the input."}
      </p>
    </ToolPage>
  );
}
