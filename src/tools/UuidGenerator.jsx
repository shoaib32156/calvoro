import { useEffect, useState } from "react";
import ToolPage from "./ToolPage.jsx";
import { clamp, copyText, downloadBlob } from "./utils.js";

function uuidV4() {
  if (typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  const bytes = crypto.getRandomValues(new Uint8Array(16));
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  const hex = [...bytes].map((byte) => byte.toString(16).padStart(2, "0"));
  return [
    hex.slice(0, 4).join(""),
    hex.slice(4, 6).join(""),
    hex.slice(6, 8).join(""),
    hex.slice(8, 10).join(""),
    hex.slice(10, 16).join(""),
  ].join("-");
}

function makeUuids(count, uppercase, hyphens) {
  return Array.from({ length: count }, () => {
    let value = uuidV4();
    if (!hyphens) value = value.replace(/-/g, "");
    return uppercase ? value.toUpperCase() : value;
  });
}

export default function UuidGenerator() {
  const [count, setCount] = useState(10);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [uuids, setUuids] = useState(() => makeUuids(10, false, true));
  const [copyStatus, setCopyStatus] = useState("");

  useEffect(() => {
    if (!copyStatus) return undefined;
    const timer = window.setTimeout(() => setCopyStatus(""), 2500);
    return () => window.clearTimeout(timer);
  }, [copyStatus]);

  const generate = () => {
    setUuids(makeUuids(clamp(Number(count) || 1, 1, 500), uppercase, hyphens));
    setCopyStatus("");
  };

  const copyAll = async () => {
    const copied = await copyText(uuids.join("\n"));
    setCopyStatus(copied ? `${uuids.length} UUIDs copied.` : "Copy was blocked by the browser.");
  };

  const copyOne = async (value) => {
    const copied = await copyText(value);
    setCopyStatus(copied ? "UUID copied." : "Copy was blocked by the browser.");
  };

  const download = () => {
    downloadBlob(
      new Blob([uuids.join("\n")], { type: "text/plain;charset=utf-8" }),
      "calvoro-uuids.txt"
    );
  };

  return (
    <ToolPage
      title="UUID Generator"
      kicker="Developer tool"
      description="Generate up to 500 random version 4 UUIDs with the browser's cryptographic API, then copy individual values or download the whole list."
      seoTitle="UUID Generator - Random Version 4 UUIDs | CALVORO"
      seoDescription="Generate random UUID v4 values in your browser. Choose how many, remove hyphens or use uppercase, then copy or download the list."
      steps={[
        "Enter how many UUIDs you need, up to 500.",
        "Choose uppercase and hyphen options if your system requires them.",
        "Generate, then copy individual values or download the full list.",
      ]}
      notes={[
        "These are version 4 UUIDs, which are random rather than based on a name, time, or location. Each generation is independent.",
        "Removing hyphens produces the same 32 hexadecimal digits in a compact form. Check the format your database or API expects.",
        "A UUID is an identifier, not a secret. Do not use one as a password or authentication token.",
      ]}
      related={[
        { name: "Password Generator", path: "/password-generator" },
        { name: "JSON Formatter and Validator", path: "/json-formatter" },
        { name: "QR Code Generator", path: "/qr-code-generator" },
      ]}
    >
      <div className="calvoro-tool-grid">
        <div className="calvoro-field">
          <label htmlFor="uuid-count">How many UUIDs?</label>
          <input
            id="uuid-count"
            type="number"
            min="1"
            max="500"
            step="1"
            value={count}
            onChange={(event) => setCount(event.target.value)}
          />
          <span className="calvoro-field-hint">Between 1 and 500.</span>
        </div>

        <div className="calvoro-checkbox-grid">
          <label className="calvoro-checkbox">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(event) => setUppercase(event.target.checked)}
            />
            Uppercase letters
          </label>
          <label className="calvoro-checkbox">
            <input
              type="checkbox"
              checked={hyphens}
              onChange={(event) => setHyphens(event.target.checked)}
            />
            Include hyphens
          </label>
        </div>
      </div>

      <div className="calvoro-tool-actions">
        <button type="button" className="calvoro-tool-button" onClick={generate}>
          Generate UUIDs
        </button>
        <button
          type="button"
          className="calvoro-tool-button is-secondary"
          onClick={copyAll}
          disabled={uuids.length === 0}
        >
          Copy all
        </button>
        <button
          type="button"
          className="calvoro-tool-button is-secondary"
          onClick={download}
          disabled={uuids.length === 0}
        >
          Download .txt
        </button>
      </div>

      <div className="calvoro-stat-grid">
        <div className="calvoro-stat-card">
          <span>Generated</span>
          <strong>{uuids.length.toLocaleString()}</strong>
          <small>Version 4 UUIDs</small>
        </div>
        <div className="calvoro-stat-card">
          <span>Format</span>
          <strong>{hyphens ? "36" : "32"}</strong>
          <small>Characters each</small>
        </div>
        <div className="calvoro-stat-card">
          <span>Letter case</span>
          <strong>{uppercase ? "Upper" : "Lower"}</strong>
          <small>Hexadecimal</small>
        </div>
      </div>

      <ul className="calvoro-uuid-list">
        {uuids.map((value, index) => (
          <li key={`${value}-${index}`}>
            <span>{value}</span>
            <button type="button" onClick={() => copyOne(value)}>
              Copy
            </button>
          </li>
        ))}
      </ul>

      <p className="calvoro-inline-note" aria-live="polite">
        {copyStatus || "Generating again creates an entirely new list."}
      </p>
    </ToolPage>
  );
}
