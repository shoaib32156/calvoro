import { useMemo, useRef, useState } from "react";
import ToolPage from "./ToolPage.jsx";
import { copyText } from "./utils.js";

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const MAX_PREVIEW_ROWS = 100;
const MAX_PREVIEW_COLUMNS = 40;

const DELIMITERS = [
  { value: "auto", label: "Detect automatically" },
  { value: ",", label: "Comma (,)" },
  { value: "\t", label: "Tab" },
  { value: ";", label: "Semicolon (;)" },
  { value: "|", label: "Pipe (|)" },
];

function detectDelimiter(text) {
  const candidates = [",", "\t", ";", "|"];
  const counts = { ",": 0, "\t": 0, ";": 0, "|": 0 };
  let inQuotes = false;
  let lines = 1;

  for (let index = 0; index < text.length && lines <= 6; index += 1) {
    const character = text[index];

    if (character === '"') {
      if (inQuotes && text[index + 1] === '"') {
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (!inQuotes) {
      if (character === "\n") {
        lines += 1;
      } else if (character in counts) {
        counts[character] += 1;
      }
    }
  }

  let best = ",";
  let bestCount = 0;
  for (const candidate of candidates) {
    if (counts[candidate] > bestCount) {
      best = candidate;
      bestCount = counts[candidate];
    }
  }
  return best;
}

function parseDelimited(rawText, delimiter) {
  const text = rawText.replace(/^\uFEFF/, "");
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < text.length; index += 1) {
    const character = text[index];

    if (inQuotes) {
      if (character === '"') {
        if (text[index + 1] === '"') {
          field += '"';
          index += 1;
        } else {
          inQuotes = false;
        }
      } else {
        field += character;
      }
    } else if (character === '"' && field === "") {
      inQuotes = true;
    } else if (character === delimiter) {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (character !== "\r") {
      field += character;
    }
  }

  if (inQuotes) {
    throw new Error(
      "A quoted field is never closed. Check for a missing closing quotation mark."
    );
  }

  row.push(field);
  if (!(row.length === 1 && row[0] === "")) {
    rows.push(row);
  }

  return rows.filter((line) => line.some((cell) => cell.trim() !== ""));
}

function delimiterLabel(value) {
  if (value === ",") return "Comma";
  if (value === "\t") return "Tab";
  if (value === ";") return "Semicolon";
  if (value === "|") return "Pipe";
  return "Detected";
}

export default function CsvViewer() {
  const fileInputRef = useRef(null);
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [delimiter, setDelimiter] = useState("auto");
  const [hasHeader, setHasHeader] = useState(true);
  const [fileError, setFileError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  const parsed = useMemo(() => {
    if (!text.trim()) {
      return {
        rows: [],
        error: "",
        activeDelimiter: ",",
        columnCount: 0,
      };
    }

    const activeDelimiter =
      delimiter === "auto" ? detectDelimiter(text) : delimiter;

    try {
      const rows = parseDelimited(text, activeDelimiter);
      const columnCount = rows.reduce(
        (maximum, row) => Math.max(maximum, row.length),
        0
      );
      return { rows, error: "", activeDelimiter, columnCount };
    } catch (error) {
      return {
        rows: [],
        error:
          error instanceof Error ? error.message : "The file could not be parsed.",
        activeDelimiter,
        columnCount: 0,
      };
    }
  }, [text, delimiter]);

  const dataRows = hasHeader ? parsed.rows.slice(1) : parsed.rows;
  const headerRow = hasHeader ? parsed.rows[0] || [] : [];
  const visibleColumns = Math.min(parsed.columnCount, MAX_PREVIEW_COLUMNS);
  const visibleRows = dataRows.slice(0, MAX_PREVIEW_ROWS);

  const onFile = async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    setFileError("");
    setCopyStatus("");

    if (file.size > MAX_FILE_BYTES) {
      setFileError("That file is larger than 10 MB. Choose a smaller CSV file.");
      event.target.value = "";
      return;
    }

    try {
      const content = await file.text();
      if (!content.trim()) {
        setFileError("That file is empty.");
        event.target.value = "";
        return;
      }
      setText(content);
      setFileName(file.name);
      setFileSize(file.size);
    } catch {
      setFileError("The browser could not read that file.");
    } finally {
      event.target.value = "";
    }
  };

  const copyTable = async () => {
    const rows = hasHeader
      ? [headerRow, ...dataRows]
      : dataRows;
    const tsv = rows
      .map((row) =>
        row
          .map((cell) => cell.replace(/\t/g, " ").replace(/\r?\n/g, " "))
          .join("\t")
      )
      .join("\n");
    const copied = await copyText(tsv);
    setCopyStatus(
      copied ? "Table copied as tab-separated text." : "Copy was blocked by the browser."
    );
    window.setTimeout(() => setCopyStatus(""), 2500);
  };

  const clear = () => {
    setText("");
    setFileName("");
    setFileSize(0);
    setFileError("");
    setCopyStatus("");
  };

  const headerLabel = (columnIndex) => {
    if (hasHeader && headerRow[columnIndex]?.trim()) {
      return headerRow[columnIndex];
    }
    return `Column ${columnIndex + 1}`;
  };

  const truncated =
    dataRows.length > MAX_PREVIEW_ROWS ||
    parsed.columnCount > MAX_PREVIEW_COLUMNS;

  return (
    <ToolPage
      title="CSV Viewer"
      kicker="Developer tool"
      description="Open a CSV or TSV file and preview it as a table. Choose the delimiter, mark whether the first row is a header, and keep the file on your device."
      seoTitle="CSV Viewer - Preview CSV and TSV Files in a Table | CALVORO"
      seoDescription="View CSV files in your browser as a readable table. Detect the delimiter, toggle the header row, and copy the table without uploading your file."
      steps={[
        "Choose a CSV or TSV file, or paste the contents directly.",
        "Confirm the delimiter and whether the first row contains column names.",
        "Review the table and copy it as tab-separated text if needed.",
      ]}
      notes={[
        "The viewer reads files up to 10 MB and previews the first 100 rows and 40 columns. The full file is parsed for the row and column counts, but very large files may be slow.",
        "Quoted fields, escaped quotes, and line breaks inside quotes are handled. Files with inconsistent rows are shown with blank cells where values are missing.",
        "The text is read as UTF-8. A file saved in a different encoding may show replacement characters; re-save it as UTF-8 before opening it here.",
      ]}
      related={[
        { name: "JSON Formatter and Validator", path: "/json-formatter" },
        { name: "Markdown Previewer", path: "/markdown-previewer" },
        { name: "Line Sorter", path: "/line-sorter" },
      ]}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.tsv,.txt,text/csv,text/tab-separated-values,text/plain"
        onChange={onFile}
        style={{ display: "none" }}
      />

      <div className="calvoro-tool-grid">
        <div>
          <button
            type="button"
            className="calvoro-file-drop"
            onClick={() => fileInputRef.current?.click()}
            style={{ width: "100%", font: "inherit" }}
          >
            <strong>Choose a CSV file</strong>
            <small>CSV, TSV, or plain text up to 10 MB. Nothing is uploaded.</small>
          </button>

          {fileName && (
            <ul className="calvoro-file-list">
              <li>
                <span>
                  {fileName} · {(fileSize / 1024).toLocaleString(undefined, {
                    maximumFractionDigits: 1,
                  })}{" "}
                  KB
                </span>
                <button type="button" onClick={clear}>
                  Remove
                </button>
              </li>
            </ul>
          )}
        </div>

        <div>
          <div className="calvoro-field">
            <label htmlFor="csv-delimiter">Delimiter</label>
            <select
              id="csv-delimiter"
              value={delimiter}
              onChange={(event) => setDelimiter(event.target.value)}
            >
              {DELIMITERS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <label className="calvoro-checkbox" style={{ marginTop: 14 }}>
            <input
              type="checkbox"
              checked={hasHeader}
              onChange={(event) => setHasHeader(event.target.checked)}
            />
            Use the first row as column names
          </label>

          <div className="calvoro-tool-actions">
            <button
              type="button"
              className="calvoro-tool-button"
              onClick={copyTable}
              disabled={dataRows.length === 0}
            >
              Copy as TSV
            </button>
            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={clear}
              disabled={!text && !fileName}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="calvoro-field" style={{ marginTop: 18 }}>
        <label htmlFor="csv-text">
          Or paste CSV / TSV text
        </label>
        <textarea
          id="csv-text"
          className="calvoro-tool-textarea"
          value={text}
          onChange={(event) => {
            setText(event.target.value);
            setFileName("");
            setFileSize(0);
            setFileError("");
          }}
          placeholder={"name,score\nAda,91\nGrace,88"}
          rows={6}
          spellCheck="false"
        />
      </div>

      {fileError && (
        <p className="calvoro-tool-status is-error" role="alert">
          {fileError}
        </p>
      )}

      {parsed.error && (
        <p className="calvoro-tool-status is-error" role="alert">
          {parsed.error}
        </p>
      )}

      <div className="calvoro-stat-grid">
        <div className="calvoro-stat-card">
          <span>Data rows</span>
          <strong>{parsed.error ? "—" : dataRows.length.toLocaleString()}</strong>
          <small>{hasHeader ? "Excluding the header row" : "All rows"}</small>
        </div>
        <div className="calvoro-stat-card">
          <span>Columns</span>
          <strong>{parsed.error ? "—" : parsed.columnCount.toLocaleString()}</strong>
          <small>Widest row</small>
        </div>
        <div className="calvoro-stat-card">
          <span>Delimiter</span>
          <strong style={{ fontSize: 16 }}>
            {delimiterLabel(parsed.activeDelimiter)}
          </strong>
          <small>{delimiter === "auto" ? "Detected from the text" : "Selected manually"}</small>
        </div>
        <div className="calvoro-stat-card">
          <span>Characters</span>
          <strong>{text.length.toLocaleString()}</strong>
          <small>{fileName ? "Loaded from file" : "Pasted text"}</small>
        </div>
      </div>

      {parsed.rows.length > 0 && !parsed.error ? (
        <div style={{ marginTop: 18 }}>
          <div className="calvoro-tool-table-wrap">
            <table className="calvoro-tool-table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  {Array.from({ length: visibleColumns }, (_, columnIndex) => (
                    <th key={columnIndex} scope="col">
                      {headerLabel(columnIndex)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <th scope="row">{rowIndex + 1}</th>
                    {Array.from({ length: visibleColumns }, (_, columnIndex) => (
                      <td key={columnIndex}>{row[columnIndex] ?? ""}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {truncated && (
            <p className="calvoro-inline-note">
              Preview limited to {MAX_PREVIEW_ROWS} rows and{" "}
              {MAX_PREVIEW_COLUMNS} columns. The counts above include the full
              file.
            </p>
          )}
        </div>
      ) : (
        <div className="calvoro-tool-empty" style={{ marginTop: 18 }}>
          {parsed.error
            ? "Fix the quoted field and the table will appear here."
            : "Choose a file or paste CSV text to preview it as a table."}
        </div>
      )}

      <p className="calvoro-inline-note" aria-live="polite">
        {copyStatus || "Your file is read locally and is not uploaded."}
      </p>
    </ToolPage>
  );
}
