import { useMemo, useState } from "react";
import ToolPage from "./ToolPage.jsx";
import { copyText } from "./utils.js";

const STOP_WORDS = new Set([
  "the", "and", "for", "that", "with", "this", "from", "have", "has", "had",
  "not", "are", "was", "were", "but", "you", "your", "they", "their", "them",
  "will", "would", "can", "could", "should", "into", "than", "then", "when",
  "what", "which", "who", "how", "why", "where", "all", "any", "our", "out",
  "about", "over", "under", "more", "most", "some", "such", "only", "also",
  "its", "it's", "been", "being", "each", "other", "there", "these", "those",
  "may", "might", "must", "very", "just", "does", "did", "doing", "use",
]);

function countWords(text) {
  if (!text.trim()) return 0;

  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter("en", { granularity: "word" });
    return Array.from(segmenter.segment(text)).filter(
      (segment) => segment.isWordLike
    ).length;
  }

  return (text.trim().match(/\S+/g) || []).length;
}

function countSentences(text) {
  if (!text.trim()) return 0;

  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    const segmenter = new Intl.Segmenter("en", { granularity: "sentence" });
    return Array.from(segmenter.segment(text)).filter((segment) =>
      segment.segment.trim()
    ).length;
  }

  return (text.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || []).filter((part) =>
    part.trim()
  ).length;
}

function getTopWords(text) {
  const matches = text.toLowerCase().match(/[a-z0-9']+/g) || [];
  const counts = new Map();

  matches.forEach((word) => {
    const cleaned = word.replace(/^'+|'+$/g, "");

    if (cleaned.length < 3 || STOP_WORDS.has(cleaned)) {
      return;
    }

    counts.set(cleaned, (counts.get(cleaned) || 0) + 1);
  });

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 10);
}

export default function WordCounter() {
  const [text, setText] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  const stats = useMemo(() => {
    const words = countWords(text);
    const paragraphs = text.trim()
      ? text.split(/\n\s*\n/).filter((part) => part.trim()).length
      : 0;

    return {
      words,
      characters: text.length,
      charactersNoSpaces: text.replace(/\s/g, "").length,
      sentences: countSentences(text),
      paragraphs,
      lines: text ? text.split(/\r?\n/).length : 0,
      reading: words === 0 ? 0 : Math.max(1, Math.ceil(words / 225)),
      speaking: words === 0 ? 0 : Math.max(1, Math.ceil(words / 130)),
    };
  }, [text]);

  const topWords = useMemo(() => getTopWords(text), [text]);

  const summary = `Words: ${stats.words}\nCharacters: ${stats.characters}\nCharacters without spaces: ${stats.charactersNoSpaces}\nSentences: ${stats.sentences}\nParagraphs: ${stats.paragraphs}\nReading time: ${stats.reading} min\nSpeaking time: ${stats.speaking} min`;

  const handleCopy = async () => {
    const copied = await copyText(summary);
    setCopyStatus(copied ? "Summary copied." : "Copy was blocked by the browser.");
    window.setTimeout(() => setCopyStatus(""), 2500);
  };

  return (
    <ToolPage
      title="Word and Character Counter"
      kicker="Text tool"
      description="Count words, characters, sentences, paragraphs, and estimated reading time as you type. Nothing leaves this browser tab."
      seoTitle="Word and Character Counter - Free Online Tool | CALVORO"
      seoDescription="Count words, characters, sentences, paragraphs, reading time, and repeated words with CALVORO's free browser-based counter."
      steps={[
        "Paste an article, essay, message, or any block of text.",
        "Review the live counts and the most repeated meaningful words.",
        "Copy the summary or clear the box before starting another document.",
      ]}
      notes={[
        "Word counts can differ slightly between programs because hyphenated words, apostrophes, and non-Latin scripts are segmented differently. This tool prefers the browser's built-in Intl.Segmenter and falls back to whitespace counting.",
        "Reading time assumes about 225 words per minute. Speaking time assumes about 130 words per minute. Both are estimates, not limits.",
        "Character limits on social platforms and forms may count line breaks, emoji, or URLs differently. Check the destination service when an exact limit matters.",
      ]}
      related={[
        { name: "Text Cleanup", path: "/text-cleanup" },
        { name: "Text Comparison", path: "/text-compare" },
        { name: "Find and Replace", path: "/find-replace" },
      ]}
    >
      <div className="calvoro-field">
        <label htmlFor="word-counter-input">Your text</label>
        <textarea
          id="word-counter-input"
          className="calvoro-tool-textarea"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Paste or type your text here..."
          rows={12}
        />
        <span className="calvoro-field-hint">
          Text stays in this tab and is never submitted to a server.
        </span>
      </div>

      <div className="calvoro-tool-actions">
        <button
          type="button"
          className="calvoro-tool-button"
          onClick={handleCopy}
          disabled={!text}
        >
          Copy summary
        </button>
        <button
          type="button"
          className="calvoro-tool-button is-secondary"
          onClick={() => setText("")}
          disabled={!text}
        >
          Clear text
        </button>
      </div>

      <div className="calvoro-stat-grid" aria-label="Text statistics">
        <div className="calvoro-stat-card">
          <span>Words</span>
          <strong>{stats.words.toLocaleString()}</strong>
          <small>Whitespace and Unicode aware</small>
        </div>
        <div className="calvoro-stat-card">
          <span>Characters</span>
          <strong>{stats.characters.toLocaleString()}</strong>
          <small>{stats.charactersNoSpaces.toLocaleString()} without spaces</small>
        </div>
        <div className="calvoro-stat-card">
          <span>Sentences</span>
          <strong>{stats.sentences.toLocaleString()}</strong>
          <small>{stats.paragraphs.toLocaleString()} paragraphs</small>
        </div>
        <div className="calvoro-stat-card">
          <span>Reading time</span>
          <strong>{stats.reading} min</strong>
          <small>About {stats.speaking} min spoken</small>
        </div>
      </div>

      <div className="calvoro-tool-output">
        <h3>Most repeated words</h3>
        {topWords.length > 0 ? (
          <div className="calvoro-copy-row">
            {topWords.map(([word, count]) => (
              <span key={word} className="calvoro-swatch-contrast">
                {word} · {count}
              </span>
            ))}
          </div>
        ) : (
          <p>
            Repeated meaningful words will appear here after you add a longer
            piece of text. Common short words such as “the” are ignored.
          </p>
        )}
      </div>

      <p className="calvoro-inline-note" aria-live="polite">
        {copyStatus || `${stats.lines.toLocaleString()} line${stats.lines === 1 ? "" : "s"} in the editor.`}
      </p>
    </ToolPage>
  );
}
