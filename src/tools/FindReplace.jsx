import { useMemo, useState } from "react";
import ToolPage from "./ToolPage.jsx";
import { copyText, downloadBlob } from "./utils.js";

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export default function FindReplace() {
  const [text, setText] = useState("");
  const [find, setFind] = useState("");
  const [replacement, setReplacement] = useState("");
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [wholeWord, setWholeWord] = useState(false);
  const [useRegex, setUseRegex] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");

  const { matcher, patternError } = useMemo(() => {
    if (!find) return { matcher: null, patternError: "" };

    try {
      const source = useRegex
        ? find
        : wholeWord
          ? `\\b${escapeRegExp(find)}\\b`
          : escapeRegExp(find);
      return {
        matcher: new RegExp(source, caseSensitive ? "g" : "gi"),
        patternError: "",
      };
    } catch (error) {
      return {
        matcher: null,
        patternError: error instanceof Error ? error.message : "Invalid pattern.",
      };
    }
  }, [find, caseSensitive, wholeWord, useRegex]);

  const matchCount = useMemo(() => {
    if (!matcher) return 0;
    return (text.match(matcher) || []).length;
  }, [matcher, text]);

  const result = useMemo(() => {
    if (!matcher) return text;
    return text.replace(matcher, replacement);
  }, [matcher, text, replacement]);

  const changed = matcher ? matchCount > 0 : false;

  const copy = async () => {
    const copied = await copyText(result);
    setCopyStatus(copied ? "Result copied." : "Copy was blocked by the browser.");
    window.setTimeout(() => setCopyStatus(""), 2500);
  };

  const download = () => {
    downloadBlob(
      new Blob([result], { type: "text/plain;charset=utf-8" }),
      "calvoro-replaced-text.txt"
    );
  };

  const reset = () => {
    setText("");
    setFind("");
    setReplacement("");
    setCopyStatus("");
  };

  return (
    <ToolPage
      title="Find and Replace"
      kicker="Text tool"
      description="Replace every occurrence of a word or phrase in a block of text. Choose case-sensitive or whole-word matching before you copy the result."
      seoTitle="Find and Replace Text Online - Case and Whole Word Options | CALVORO"
      seoDescription="Find and replace text in your browser. See the match count, use whole-word or case-sensitive matching, then copy or download the edited text."
      steps={[
        "Paste the text you want to edit.",
        "Enter the text to find and what it should become.",
        "Check the match count and preview, then copy or download the result.",
      ]}
      notes={[
        "All matches are replaced at once. Use the match counter and the preview to confirm the result before copying.",
        "Whole-word matching uses standard word boundaries, so it works best with letters and numbers. Punctuation around a search term may affect what counts as a word.",
        "Leave regular expression mode off to search for literal characters such as dots, brackets, and asterisks. When it is on, standard JavaScript patterns and capture groups work, and you can reference groups in the replacement with $1, $2, and so on.",
      ]}
      related={[
        { name: "Text Cleanup", path: "/text-cleanup" },
        { name: "Text Comparison", path: "/text-compare" },
        { name: "Line Sorter", path: "/line-sorter" },
      ]}
    >
      <div className="calvoro-field">
        <label htmlFor="replace-input">Original text</label>
        <textarea
          id="replace-input"
          className="calvoro-tool-textarea"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Paste the text you want to edit..."
          rows={9}
        />
      </div>

      <div className="calvoro-tool-grid-2" style={{ marginTop: 16 }}>
        <div className="calvoro-field">
          <label htmlFor="replace-find">Find</label>
          <input
            id="replace-find"
            type="text"
            value={find}
            onChange={(event) => setFind(event.target.value)}
            placeholder="e.g. colour"
            autoComplete="off"
          />
        </div>
        <div className="calvoro-field">
          <label htmlFor="replace-with">Replace with</label>
          <input
            id="replace-with"
            type="text"
            value={replacement}
            onChange={(event) => setReplacement(event.target.value)}
            placeholder="e.g. color"
            autoComplete="off"
          />
        </div>
      </div>

      <div className="calvoro-checkbox-grid" style={{ marginTop: 16 }}>
        <label className="calvoro-checkbox">
          <input
            type="checkbox"
            checked={caseSensitive}
            onChange={(event) => setCaseSensitive(event.target.checked)}
          />
          Match case exactly
        </label>
        <label className="calvoro-checkbox">
          <input
            type="checkbox"
            checked={wholeWord}
            disabled={useRegex}
            onChange={(event) => setWholeWord(event.target.checked)}
          />
          Match whole words only
        </label>
        <label className="calvoro-checkbox">
          <input
            type="checkbox"
            checked={useRegex}
            onChange={(event) => setUseRegex(event.target.checked)}
          />
          Treat the search text as a regular expression
        </label>
      </div>

      {patternError && (
        <p className="calvoro-tool-status is-error" role="alert">
          That pattern could not be compiled: {patternError}
        </p>
      )}

      <div className="calvoro-tool-actions">
        <button
          type="button"
          className="calvoro-tool-button"
          onClick={copy}
          disabled={!text || !changed || Boolean(patternError)}
        >
          Copy result
        </button>
        <button
          type="button"
          className="calvoro-tool-button is-secondary"
          onClick={download}
          disabled={!text || !changed || Boolean(patternError)}
        >
          Download .txt
        </button>
        <button
          type="button"
          className="calvoro-tool-button is-secondary"
          onClick={reset}
          disabled={!text && !find && !replacement}
        >
          Clear all
        </button>
      </div>

      <div className="calvoro-stat-grid">
        <div className="calvoro-stat-card">
          <span>Matches</span>
          <strong>{matchCount.toLocaleString()}</strong>
          <small>{find ? "In the original text" : "Enter text to find"}</small>
        </div>
        <div className="calvoro-stat-card">
          <span>Characters</span>
          <strong>{result.length.toLocaleString()}</strong>
          <small>In the result</small>
        </div>
        <div className="calvoro-stat-card">
          <span>Change</span>
          <strong>
            {result.length === text.length
              ? "0"
              : `${result.length > text.length ? "+" : ""}${(
                  result.length - text.length
                ).toLocaleString()}`}
          </strong>
          <small>Character length</small>
        </div>
      </div>

      <div className="calvoro-field" style={{ marginTop: 18 }}>
        <label htmlFor="replace-output">Result</label>
        <textarea
          id="replace-output"
          className="calvoro-tool-textarea"
          value={result}
          readOnly
          rows={9}
          placeholder="The replaced text will appear here."
        />
      </div>

      <p className="calvoro-inline-note" aria-live="polite">
        {copyStatus ||
          (find
            ? `${matchCount.toLocaleString()} match${matchCount === 1 ? "" : "es"} found.`
            : "Enter a search term to see the result.")}
      </p>
    </ToolPage>
  );
}
