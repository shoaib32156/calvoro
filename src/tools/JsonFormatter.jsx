import { useMemo, useState } from "react";
import ToolPage from "./ToolPage.jsx";
import { copyText, downloadBlob } from "./utils.js";

const SAMPLE = `{
  "project": "CALVORO",
  "tools": ["percentage", "bmi", "loan"],
  "free": true,
  "settings": {
    "theme": "light",
    "localOnly": true
  }
}`;

function parseJson(value) {
  if (!value.trim()) {
    return { data: null, error: "", empty: true };
  }

  try {
    return { data: JSON.parse(value), error: "", empty: false };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Invalid JSON.",
      empty: false,
    };
  }
}

function sortValue(value) {
  if (Array.isArray(value)) {
    return value.map(sortValue);
  }
  if (value && typeof value === "object") {
    return Object.keys(value)
      .sort((a, b) => a.localeCompare(b))
      .reduce((result, key) => {
        result[key] = sortValue(value[key]);
        return result;
      }, {});
  }
  return value;
}

function describeRoot(data) {
  if (Array.isArray(data)) {
    return `Array with ${data.length} item${data.length === 1 ? "" : "s"}`;
  }
  if (data && typeof data === "object") {
    const keys = Object.keys(data).length;
    return `Object with ${keys} top-level key${keys === 1 ? "" : "s"}`;
  }
  return `Primitive value (${typeof data})`;
}

export default function JsonFormatter() {
  const [input, setInput] = useState("");
  const [indent, setIndent] = useState("2");
  const [sortKeys, setSortKeys] = useState(false);
  const [output, setOutput] = useState("");
  const [outputLabel, setOutputLabel] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  const parsed = useMemo(() => parseJson(input), [input]);
  const byteCount = useMemo(
    () => new Blob([input]).size,
    [input]
  );

  const minified = useMemo(() => {
    if (!parsed.data && parsed.data !== 0 && parsed.data !== false && parsed.data !== null) {
      return "";
    }
    if (parsed.empty || parsed.error) return "";
    try {
      return JSON.stringify(parsed.data);
    } catch {
      return "";
    }
  }, [parsed]);

  const run = (kind) => {
    if (parsed.error) return;
    if (parsed.empty) {
      setOutput("");
      setOutputLabel("");
      return;
    }

    try {
      const value = sortKeys ? sortValue(parsed.data) : parsed.data;
      const indentValue = indent === "tab" ? "\t" : Number(indent);
      const next =
        kind === "minify"
          ? JSON.stringify(value)
          : JSON.stringify(value, null, indentValue);

      setOutput(next);
      setOutputLabel(kind === "minify" ? "Minified JSON" : "Formatted JSON");
      setCopyStatus("");
    } catch (error) {
      setOutput("");
      setOutputLabel("");
      setCopyStatus(
        error instanceof Error ? error.message : "That value could not be serialized."
      );
    }
  };

  const copy = async () => {
    const copied = await copyText(output);
    setCopyStatus(copied ? "JSON copied." : "Copy was blocked by the browser.");
    window.setTimeout(() => setCopyStatus(""), 2500);
  };

  const download = () => {
    downloadBlob(
      new Blob([output], { type: "application/json;charset=utf-8" }),
      "calvoro-formatted.json"
    );
  };

  const loadSample = () => {
    setInput(SAMPLE);
    setOutput("");
    setOutputLabel("");
  };

  const clear = () => {
    setInput("");
    setOutput("");
    setOutputLabel("");
    setCopyStatus("");
  };

  const statusClass = parsed.error
    ? "calvoro-tool-status is-error"
    : parsed.empty
      ? "calvoro-tool-status"
      : "calvoro-tool-status is-success";

  return (
    <ToolPage
      title="JSON Formatter and Validator"
      kicker="Developer tool"
      description="Validate JSON, format it with your preferred indentation, minify it, or sort object keys. Your data stays in this browser tab."
      seoTitle="JSON Formatter and Validator - Format, Minify, Validate | CALVORO"
      seoDescription="Format, minify, and validate JSON in your browser. See parse errors, sort keys, view size statistics, and copy or download the result."
      steps={[
        "Paste JSON into the input box or load the sample.",
        "Fix any validation message before formatting.",
        "Choose indentation and sort options, then copy or download the result.",
      ]}
      notes={[
        "Validation uses the browser's native JSON parser, so it follows the JSON standard. Comments and trailing commas are not valid JSON.",
        "Sorting keys is optional and only affects objects, not arrays. Array order is preserved.",
        "Formatting changes whitespace, not values. Large numbers may already have lost precision when the original file was created.",
      ]}
      related={[
        { name: "CSV Viewer", path: "/csv-viewer" },
        { name: "Markdown Previewer", path: "/markdown-previewer" },
        { name: "Text Comparison", path: "/text-compare" },
      ]}
    >
      <div className="calvoro-tool-grid">
        <div className="calvoro-field">
          <label htmlFor="json-input">JSON input</label>
          <textarea
            id="json-input"
            className="calvoro-tool-textarea"
            value={input}
            onChange={(event) => {
              setInput(event.target.value);
              setOutput("");
              setOutputLabel("");
            }}
            placeholder='{"example": true}'
            rows={14}
            spellCheck="false"
          />
        </div>

        <div>
          <div className="calvoro-field">
            <label htmlFor="json-indent">Indentation</label>
            <select
              id="json-indent"
              value={indent}
              onChange={(event) => setIndent(event.target.value)}
            >
              <option value="2">2 spaces</option>
              <option value="4">4 spaces</option>
              <option value="tab">Tabs</option>
            </select>
          </div>

          <label className="calvoro-checkbox" style={{ marginTop: 14 }}>
            <input
              type="checkbox"
              checked={sortKeys}
              onChange={(event) => setSortKeys(event.target.checked)}
            />
            Sort object keys alphabetically
          </label>

          <div className="calvoro-tool-actions">
            <button
              type="button"
              className="calvoro-tool-button"
              onClick={() => run("format")}
              disabled={parsed.empty || Boolean(parsed.error)}
            >
              Format
            </button>
            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={() => run("minify")}
              disabled={parsed.empty || Boolean(parsed.error)}
            >
              Minify
            </button>
            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={loadSample}
            >
              Load sample
            </button>
            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={clear}
              disabled={!input && !output}
            >
              Clear
            </button>
          </div>

          <div className="calvoro-stat-grid" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
            <div className="calvoro-stat-card">
              <span>Root type</span>
              <strong style={{ fontSize: 14 }}>
                {parsed.empty
                  ? "—"
                  : parsed.error
                    ? "Invalid"
                    : describeRoot(parsed.data)}
              </strong>
              <small>After parsing</small>
            </div>
            <div className="calvoro-stat-card">
              <span>Input size</span>
              <strong>{byteCount.toLocaleString()}</strong>
              <small>Bytes (UTF-8)</small>
            </div>
            <div className="calvoro-stat-card">
              <span>Characters</span>
              <strong>{input.length.toLocaleString()}</strong>
              <small>Including whitespace</small>
            </div>
            <div className="calvoro-stat-card">
              <span>Minified</span>
              <strong>{minified ? minified.length.toLocaleString() : "—"}</strong>
              <small>{minified ? "Characters without whitespace" : "No valid JSON"}</small>
            </div>
          </div>
        </div>
      </div>

      <p className={statusClass} role="status">
        {parsed.error
          ? `Invalid JSON: ${parsed.error}`
          : parsed.empty
            ? "Paste JSON to validate it automatically."
            : "Valid JSON. Choose Format or Minify to create an output copy."}
      </p>

      {output && (
        <div style={{ marginTop: 18 }}>
          <div className="calvoro-copy-row" style={{ marginTop: 0 }}>
            <strong style={{ fontSize: 13 }}>{outputLabel}</strong>
            <button
              type="button"
              className="calvoro-tool-button"
              onClick={copy}
            >
              Copy
            </button>
            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={download}
            >
              Download .json
            </button>
          </div>
          <pre className="calvoro-code-display" style={{ marginTop: 10 }}>
            {output}
          </pre>
        </div>
      )}

      <p className="calvoro-inline-note" aria-live="polite">
        {copyStatus || "Formatting and validation happen locally in this tab."}
      </p>
    </ToolPage>
  );
}
