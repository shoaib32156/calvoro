import { useState } from "react";
import ToolPage from "./ToolPage.jsx";
import { downloadBlob } from "./utils.js";

const MAX_CELLS = 4_000_000;
const MAX_RENDERED_ROWS = 1500;

function normalizeLine(line, ignoreCase, ignoreWhitespace) {
  let value = line;

  if (ignoreWhitespace) {
    value = value.trim().replace(/\s+/g, " ");
  }

  if (ignoreCase) {
    value = value.toLowerCase();
  }

  return value;
}

function buildDiff(aLines, bLines, ignoreCase, ignoreWhitespace) {
  const aKeys = aLines.map((line) =>
    normalizeLine(line, ignoreCase, ignoreWhitespace)
  );
  const bKeys = bLines.map((line) =>
    normalizeLine(line, ignoreCase, ignoreWhitespace)
  );
  const n = aKeys.length;
  const m = bKeys.length;

  if (n * m > MAX_CELLS) {
    throw new Error(
      "These texts are too large for a detailed line comparison. Compare fewer lines at a time."
    );
  }

  const table = Array.from({ length: n + 1 }, () => new Uint32Array(m + 1));

  for (let i = n - 1; i >= 0; i -= 1) {
    for (let j = m - 1; j >= 0; j -= 1) {
      table[i][j] =
        aKeys[i] === bKeys[j]
          ? table[i + 1][j + 1] + 1
          : Math.max(table[i + 1][j], table[i][j + 1]);
    }
  }

  const rows = [];
  const counts = { unchanged: 0, added: 0, removed: 0 };
  let i = 0;
  let j = 0;

  while (i < n && j < m) {
    if (aKeys[i] === bKeys[j]) {
      rows.push({
        type: "unchanged",
        text: aLines[i],
        aLine: i + 1,
        bLine: j + 1,
      });
      counts.unchanged += 1;
      i += 1;
      j += 1;
    } else if (table[i + 1][j] >= table[i][j + 1]) {
      rows.push({
        type: "removed",
        text: aLines[i],
        aLine: i + 1,
        bLine: null,
      });
      counts.removed += 1;
      i += 1;
    } else {
      rows.push({
        type: "added",
        text: bLines[j],
        aLine: null,
        bLine: j + 1,
      });
      counts.added += 1;
      j += 1;
    }
  }

  while (i < n) {
    rows.push({
      type: "removed",
      text: aLines[i],
      aLine: i + 1,
      bLine: null,
    });
    counts.removed += 1;
    i += 1;
  }

  while (j < m) {
    rows.push({
      type: "added",
      text: bLines[j],
      aLine: null,
      bLine: j + 1,
    });
    counts.added += 1;
    j += 1;
  }

  return { rows, counts };
}

export default function TextCompare() {
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [ignoreCase, setIgnoreCase] = useState(false);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const compare = () => {
    setError("");

    if (!left.trim() || !right.trim()) {
      setResult(null);
      setError("Add text to both boxes before comparing.");
      return;
    }

    try {
      const diff = buildDiff(
        left.split(/\r?\n/),
        right.split(/\r?\n/),
        ignoreCase,
        ignoreWhitespace
      );
      setResult(diff);
    } catch (caught) {
      setResult(null);
      setError(caught.message);
    }
  };

  const clear = () => {
    setLeft("");
    setRight("");
    setResult(null);
    setError("");
  };

  const swap = () => {
    setLeft(right);
    setRight(left);
    setResult(null);
    setError("");
  };

  const downloadDiff = () => {
    if (!result) return;

    const content = result.rows
      .map((row) => {
        if (row.type === "added") return `+ ${row.text}`;
        if (row.type === "removed") return `- ${row.text}`;
        return `  ${row.text}`;
      })
      .join("\n");

    downloadBlob(
      new Blob([content], { type: "text/plain;charset=utf-8" }),
      "calvoro-text-diff.txt"
    );
  };

  const renderedRows = result ? result.rows.slice(0, MAX_RENDERED_ROWS) : [];

  return (
    <ToolPage
      title="Text Comparison"
      kicker="Text tool"
      description="Compare two versions of a document line by line. See unchanged lines, additions, and removals without sending either version anywhere."
      seoTitle="Compare Two Texts - Line by Line Diff | CALVORO"
      seoDescription="Compare two texts line by line in your browser. See added, removed, and unchanged lines, with optional case and whitespace matching."
      steps={[
        "Paste the original text on the left and the revised text on the right.",
        "Choose whether case or repeated whitespace should be ignored.",
        "Select Compare, then review the colored line changes or download the diff.",
      ]}
      notes={[
        "The comparison is line based. A small edit inside a line is shown as a removed line followed by an added line, not as a word-level highlight.",
        "Very large documents are limited to roughly four million line-pair comparisons to keep the browser responsive. Split a very long document into sections if you reach that limit.",
        "Blank lines count as lines. Keep them when spacing matters, or remove them first with the Text Cleanup tool.",
      ]}
      related={[
        { name: "Text Cleanup", path: "/text-cleanup" },
        { name: "Find and Replace", path: "/find-replace" },
        { name: "Word and Character Counter", path: "/word-counter" },
      ]}
    >
      <div className="calvoro-tool-split">
        <div className="calvoro-field">
          <label htmlFor="compare-left">Original text</label>
          <textarea
            id="compare-left"
            className="calvoro-tool-textarea"
            value={left}
            onChange={(event) => setLeft(event.target.value)}
            placeholder="Paste the original version..."
            rows={10}
          />
        </div>
        <div className="calvoro-field">
          <label htmlFor="compare-right">Revised text</label>
          <textarea
            id="compare-right"
            className="calvoro-tool-textarea"
            value={right}
            onChange={(event) => setRight(event.target.value)}
            placeholder="Paste the revised version..."
            rows={10}
          />
        </div>
      </div>

      <div className="calvoro-checkbox-grid" style={{ marginTop: 16 }}>
        <label className="calvoro-checkbox">
          <input
            type="checkbox"
            checked={ignoreCase}
            onChange={(event) => setIgnoreCase(event.target.checked)}
          />
          Ignore uppercase and lowercase differences
        </label>
        <label className="calvoro-checkbox">
          <input
            type="checkbox"
            checked={ignoreWhitespace}
            onChange={(event) => setIgnoreWhitespace(event.target.checked)}
          />
          Ignore repeated spaces and line-edge whitespace
        </label>
      </div>

      <div className="calvoro-tool-actions">
        <button type="button" className="calvoro-tool-button" onClick={compare}>
          Compare texts
        </button>
        <button
          type="button"
          className="calvoro-tool-button is-secondary"
          onClick={swap}
        >
          Swap sides
        </button>
        <button
          type="button"
          className="calvoro-tool-button is-secondary"
          onClick={clear}
        >
          Clear both
        </button>
        {result && (
          <button
            type="button"
            className="calvoro-tool-button is-ghost"
            onClick={downloadDiff}
          >
            Download diff
          </button>
        )}
      </div>

      {error && (
        <p className="calvoro-tool-status is-error" role="alert">
          {error}
        </p>
      )}

      {result && (
        <>
          <div className="calvoro-stat-grid">
            <div className="calvoro-stat-card">
              <span>Added</span>
              <strong style={{ color: "#15803d" }}>{result.counts.added}</strong>
              <small>Lines only in the revised text</small>
            </div>
            <div className="calvoro-stat-card">
              <span>Removed</span>
              <strong style={{ color: "#b91c1c" }}>{result.counts.removed}</strong>
              <small>Lines only in the original</small>
            </div>
            <div className="calvoro-stat-card">
              <span>Unchanged</span>
              <strong>{result.counts.unchanged}</strong>
              <small>Matching lines</small>
            </div>
            <div className="calvoro-stat-card">
              <span>Total rows</span>
              <strong>{result.rows.length}</strong>
              <small>Displayed in the diff</small>
            </div>
          </div>

          <div className="calvoro-diff" aria-label="Line comparison result">
            {renderedRows.map((row, index) => (
              <div
                key={`${row.type}-${index}-${row.aLine}-${row.bLine}`}
                className={`calvoro-diff-row is-${row.type}`}
              >
                <span>
                  {row.aLine ?? "–"} / {row.bLine ?? "–"}
                </span>
                <span>
                  {row.type === "added" ? "+ " : row.type === "removed" ? "− " : "  "}
                  {row.text || " "}
                </span>
              </div>
            ))}
          </div>

          {result.rows.length > MAX_RENDERED_ROWS && (
            <p className="calvoro-tool-status is-warning">
              Showing the first {MAX_RENDERED_ROWS.toLocaleString()} rows. The
              downloaded diff includes the complete comparison.
            </p>
          )}
        </>
      )}

      {!result && !error && (
        <div className="calvoro-tool-empty" style={{ marginTop: 18 }}>
          The comparison result will appear here after you select Compare texts.
        </div>
      )}

      <p className="calvoro-inline-note">
        Line numbers are shown as original / revised. A dash means the line does
        not exist on that side.
      </p>
    </ToolPage>
  );
}
