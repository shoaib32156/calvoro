import { useMemo, useState } from "react";
import ToolPage from "./ToolPage.jsx";
import { copyText, downloadBlob } from "./utils.js";

const MODES = [
  { value: "asc", label: "A to Z" },
  { value: "desc", label: "Z to A" },
  { value: "length-asc", label: "Shortest first" },
  { value: "length-desc", label: "Longest first" },
  { value: "natural", label: "Natural order (2 before 10)" },
  { value: "shuffle", label: "Shuffle" },
];

function createRandom(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let value = state;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };
}

export default function LineSorter() {
  const [text, setText] = useState("");
  const [mode, setMode] = useState("asc");
  const [removeBlanks, setRemoveBlanks] = useState(true);
  const [removeDuplicates, setRemoveDuplicates] = useState(false);
  const [trimLines, setTrimLines] = useState(false);
  const [reverse, setReverse] = useState(false);
  const [shuffleSeed, setShuffleSeed] = useState(1);
  const [copyStatus, setCopyStatus] = useState("");

  const { originalLines, duplicateCount, sorted } = useMemo(() => {
    const sourceLines = text ? text.replace(/\r\n?/g, "\n").split("\n") : [];
    let lines = trimLines ? sourceLines.map((line) => line.trim()) : sourceLines;

    const seen = new Set();
    let duplicates = 0;

    if (removeDuplicates) {
      lines = lines.filter((line) => {
        const key = line.toLowerCase();
        if (seen.has(key)) {
          duplicates += 1;
          return false;
        }
        seen.add(key);
        return true;
      });
    }

    if (removeBlanks) {
      lines = lines.filter((line) => line.trim().length > 0);
    }

    const collator = new Intl.Collator(undefined, {
      numeric: mode === "natural",
      sensitivity: "base",
    });

    const result = [...lines];

    if (mode === "asc" || mode === "natural") {
      result.sort(collator.compare);
    } else if (mode === "desc") {
      result.sort((a, b) => collator.compare(b, a));
    } else if (mode === "length-asc") {
      result.sort((a, b) => a.length - b.length || collator.compare(a, b));
    } else if (mode === "length-desc") {
      result.sort((a, b) => b.length - a.length || collator.compare(a, b));
    } else {
      const random = createRandom(shuffleSeed);
      for (let index = result.length - 1; index > 0; index -= 1) {
        const swapWith = Math.floor(random() * (index + 1));
        [result[index], result[swapWith]] = [result[swapWith], result[index]];
      }
    }

    if (reverse) {
      result.reverse();
    }

    return {
      originalLines: sourceLines.length,
      duplicateCount: duplicates,
      sorted: result.join("\n"),
    };
  }, [text, mode, removeBlanks, removeDuplicates, trimLines, reverse, shuffleSeed]);

  const sortedCount = sorted ? sorted.split("\n").length : 0;

  const copy = async () => {
    const copied = await copyText(sorted);
    setCopyStatus(copied ? "Sorted lines copied." : "Copy was blocked by the browser.");
    window.setTimeout(() => setCopyStatus(""), 2500);
  };

  const download = () => {
    downloadBlob(
      new Blob([sorted], { type: "text/plain;charset=utf-8" }),
      "calvoro-sorted-lines.txt"
    );
  };

  return (
    <ToolPage
      title="Line Sorter"
      kicker="Text tool"
      description="Sort a list alphabetically, by line length, or in natural numeric order. Remove blanks and duplicate lines before you copy the list."
      seoTitle="Sort Lines Online - Alphabetical, Length, and Natural Order | CALVORO"
      seoDescription="Sort lines of text in your browser. Choose A to Z, Z to A, shortest or longest first, or natural numeric order, with optional duplicate removal."
      steps={[
        "Paste a list with one item per line.",
        "Choose a sort order and any cleanup options.",
        "Copy the sorted list or download it as a text file.",
      ]}
      notes={[
        "Natural order treats numbers inside a line as numbers, so item 2 comes before item 10.",
        "Alphabetical sorting ignores letter case by default, using your browser's locale rules.",
        "Duplicate removal ignores case, so \"Apple\" and \"apple\" count as the same entry. The first occurrence is kept.",
      ]}
      related={[
        { name: "Duplicate Line Remover", path: "/remove-duplicate-lines" },
        { name: "Text Cleanup", path: "/text-cleanup" },
        { name: "Find and Replace", path: "/find-replace" },
      ]}
    >
      <div className="calvoro-field">
        <label htmlFor="sorter-input">List to sort</label>
        <textarea
          id="sorter-input"
          className="calvoro-tool-textarea"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={"Banana\nApple\nCherry"}
          rows={9}
        />
      </div>

      <div className="calvoro-tool-grid-2" style={{ marginTop: 16 }}>
        <div className="calvoro-field">
          <label htmlFor="sorter-mode">Sort order</label>
          <select
            id="sorter-mode"
            value={mode}
            onChange={(event) => setMode(event.target.value)}
          >
            {MODES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="calvoro-checkbox-grid">
          <label className="calvoro-checkbox">
            <input
              type="checkbox"
              checked={removeBlanks}
              onChange={(event) => setRemoveBlanks(event.target.checked)}
            />
            Remove blank lines
          </label>
          <label className="calvoro-checkbox">
            <input
              type="checkbox"
              checked={removeDuplicates}
              onChange={(event) => setRemoveDuplicates(event.target.checked)}
            />
            Remove duplicate lines
          </label>
          <label className="calvoro-checkbox">
            <input
              type="checkbox"
              checked={trimLines}
              onChange={(event) => setTrimLines(event.target.checked)}
            />
            Trim spaces around each line
          </label>
          <label className="calvoro-checkbox">
            <input
              type="checkbox"
              checked={reverse}
              onChange={(event) => setReverse(event.target.checked)}
            />
            Reverse the final order
          </label>
        </div>
      </div>

      <div className="calvoro-tool-actions">
        <button
          type="button"
          className="calvoro-tool-button"
          onClick={copy}
          disabled={!sorted}
        >
          Copy sorted list
        </button>
        <button
          type="button"
          className="calvoro-tool-button is-secondary"
          onClick={download}
          disabled={!sorted}
        >
          Download .txt
        </button>
        {mode === "shuffle" && (
          <button
            type="button"
            className="calvoro-tool-button is-secondary"
            onClick={() => setShuffleSeed((current) => current + 1)}
            disabled={!text}
          >
            Reshuffle
          </button>
        )}
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
          <span>Input lines</span>
          <strong>{originalLines.toLocaleString()}</strong>
          <small>Before sorting</small>
        </div>
        <div className="calvoro-stat-card">
          <span>Output lines</span>
          <strong>{sortedCount.toLocaleString()}</strong>
          <small>After options</small>
        </div>
        <div className="calvoro-stat-card">
          <span>Duplicates</span>
          <strong>{duplicateCount.toLocaleString()}</strong>
          <small>{removeDuplicates ? "Removed" : "Not removed"}</small>
        </div>
      </div>

      <div className="calvoro-field" style={{ marginTop: 18 }}>
        <label htmlFor="sorter-output">Sorted result</label>
        <textarea
          id="sorter-output"
          className="calvoro-tool-textarea"
          value={sorted}
          readOnly
          rows={9}
          placeholder="The sorted list will appear here."
        />
      </div>

      <p className="calvoro-inline-note" aria-live="polite">
        {copyStatus || "The list updates as you change the sort order."}
      </p>
    </ToolPage>
  );
}
