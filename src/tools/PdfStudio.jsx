import { useRef, useState } from "react";
import ToolPage from "./ToolPage.jsx";
import {
  baseFilename,
  downloadBlob,
  formatBytes,
  parsePageOrder,
  parsePageRanges,
} from "./utils.js";

const MAX_PDF_BYTES = 50 * 1024 * 1024;
const MAX_MERGE_FILES = 20;
const MAX_SPLIT_PAGES = 100;

const TABS = [
  { id: "merge", label: "Merge" },
  { id: "extract", label: "Extract / Split" },
  { id: "rotate", label: "Rotate" },
  { id: "reorder", label: "Reorder" },
  { id: "number", label: "Page numbers" },
  { id: "metadata", label: "Metadata" },
];

const POSITIONS = [
  { value: "bottom-center", label: "Bottom center" },
  { value: "bottom-right", label: "Bottom right" },
  { value: "bottom-left", label: "Bottom left" },
  { value: "top-center", label: "Top center" },
  { value: "top-right", label: "Top right" },
  { value: "top-left", label: "Top left" },
];

function isPdfFile(file) {
  return (
    file.type === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf")
  );
}

function describePdfError(error) {
  const message = error instanceof Error ? error.message : "";

  if (/encrypt|password/i.test(message)) {
    return "This PDF appears to be encrypted or password-protected. Remove the protection in a PDF reader, then try again.";
  }
  if (/invalid pdf|no pdf header|failed to parse|expected instance/i.test(message)) {
    return "That file is not a readable PDF, or its structure is damaged.";
  }
  if (/too large|out of memory/i.test(message)) {
    return "The PDF is too large for this browser tab to process. Try a smaller file.";
  }
  return message || "The PDF could not be processed.";
}

function savePdf(bytes, filename) {
  downloadBlob(
    new Blob([bytes], { type: "application/pdf" }),
    filename
  );
}

function moveItem(items, index, direction) {
  const target = index + direction;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  [next[index], next[target]] = [next[target], next[index]];
  return next;
}

export default function PdfStudio() {
  const [tab, setTab] = useState("merge");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState({ kind: "", message: "" });

  const singleInputRef = useRef(null);
  const mergeInputRef = useRef(null);
  const pdfBytesRef = useRef(null);

  const [mergeFiles, setMergeFiles] = useState([]);
  const [mergeName, setMergeName] = useState("calvoro-merged.pdf");

  const [pdfFile, setPdfFile] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [pageSize, setPageSize] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const [fileError, setFileError] = useState("");
  const [rangeInput, setRangeInput] = useState("");
  const [orderInput, setOrderInput] = useState("");
  const [rotateAngle, setRotateAngle] = useState("90");
  const [numberStart, setNumberStart] = useState(1);
  const [numberSize, setNumberSize] = useState(11);
  const [numberMargin, setNumberMargin] = useState(24);
  const [numberPosition, setNumberPosition] = useState("bottom-center");
  const [numberFormat, setNumberFormat] = useState("plain");
  const [splitOutputs, setSplitOutputs] = useState([]);
  const [metadataFields, setMetadataFields] = useState({
    title: "",
    author: "",
    subject: "",
    keywords: "",
  });
  const [metadataInfo, setMetadataInfo] = useState({
    creator: "",
    producer: "",
  });

  const showStatus = (kind, message) => {
    setStatus({ kind, message });
  };

  const resetDocument = () => {
    pdfBytesRef.current = null;
    setPdfFile(null);
    setPageCount(0);
    setPageSize(null);
    setRangeInput("");
    setOrderInput("");
    setSplitOutputs([]);
    setFileError("");
    setStatus({ kind: "", message: "" });
    setMetadataFields({ title: "", author: "", subject: "", keywords: "" });
    setMetadataInfo({ creator: "", producer: "" });
  };

  const loadSingleFile = async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    setFileError("");
    setFileLoading(true);
    setSplitOutputs([]);

    if (!isPdfFile(file)) {
      setFileError("Choose a PDF file.");
      setFileLoading(false);
      event.target.value = "";
      return;
    }

    if (file.size > MAX_PDF_BYTES) {
      setFileError("That file is larger than 50 MB. Choose a smaller PDF.");
      setFileLoading(false);
      event.target.value = "";
      return;
    }

    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const { PDFDocument } = await import("pdf-lib");
      const document = await PDFDocument.load(bytes, {
        updateMetadata: false,
      });
      const count = document.getPageCount();

      if (count === 0) {
        throw new Error("This PDF has no pages.");
      }

      const firstPage = document.getPage(0).getSize();
      pdfBytesRef.current = bytes;
      setPdfFile(file);
      setPageCount(count);
      setPageSize(firstPage);
      setRangeInput(`1-${count}`);
      setOrderInput("");
      setMetadataFields({
        title: document.getTitle() || "",
        author: document.getAuthor() || "",
        subject: document.getSubject() || "",
        keywords: document.getKeywords() || "",
      });
      setMetadataInfo({
        creator: document.getCreator() || "",
        producer: document.getProducer() || "",
      });
      showStatus(
        "success",
        `Loaded ${file.name}: ${count} page${count === 1 ? "" : "s"}.`
      );
    } catch (error) {
      resetDocument();
      setFileError(describePdfError(error));
    } finally {
      setFileLoading(false);
      event.target.value = "";
    }
  };

  const addMergeFiles = (event) => {
    const picked = Array.from(event.target.files || []);
    if (picked.length === 0) return;

    const accepted = [];
    let rejected = 0;

    for (const file of picked) {
      if (
        mergeFiles.length + accepted.length >= MAX_MERGE_FILES ||
        file.size > MAX_PDF_BYTES ||
        !isPdfFile(file)
      ) {
        rejected += 1;
        continue;
      }
      accepted.push({
        id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        file,
      });
    }

    if (accepted.length > 0) {
      setMergeFiles((current) => [...current, ...accepted]);
      showStatus(
        "success",
        `${accepted.length} file${accepted.length === 1 ? "" : "s"} added in order.`
      );
    }

    if (rejected > 0) {
      showStatus(
        "warning",
        `${rejected} file${rejected === 1 ? " was" : "s were"} skipped. Use PDFs under 50 MB and keep the list to ${MAX_MERGE_FILES} files.`
      );
    }

    event.target.value = "";
  };

  const mergePdfs = async () => {
    if (mergeFiles.length < 2) {
      showStatus("warning", "Add at least two PDF files to merge.");
      return;
    }

    setBusy(true);
    showStatus("", "");

    try {
      const { PDFDocument } = await import("pdf-lib");
      const merged = await PDFDocument.create();

      for (const entry of mergeFiles) {
        let source;
        try {
          const bytes = new Uint8Array(await entry.file.arrayBuffer());
          source = await PDFDocument.load(bytes, { updateMetadata: false });
        } catch (error) {
          throw new Error(
            `“${entry.file.name}” could not be read. ${describePdfError(error)}`
          );
        }

        const pages = await merged.copyPages(source, source.getPageIndices());
        for (const page of pages) merged.addPage(page);
      }

      const bytes = await merged.save();
      savePdf(
        bytes,
        `${baseFilename(mergeName, "calvoro-merged")}.pdf`
      );
      showStatus(
        "success",
        `Merged ${mergeFiles.length} files into a ${formatBytes(bytes.length)} PDF.`
      );
    } catch (error) {
      showStatus("error", describePdfError(error));
    } finally {
      setBusy(false);
    }
  };

  const getSourceDocument = async () => {
    const { PDFDocument } = await import("pdf-lib");
    return PDFDocument.load(pdfBytesRef.current, { updateMetadata: false });
  };

  const extractPages = async () => {
    const parsed = parsePageRanges(rangeInput, pageCount);
    if (parsed.error) {
      showStatus("error", parsed.error);
      return;
    }

    setBusy(true);
    showStatus("", "");

    try {
      const { PDFDocument } = await import("pdf-lib");
      const source = await getSourceDocument();
      const output = await PDFDocument.create();
      const copied = await output.copyPages(
        source,
        parsed.pages.map((page) => page - 1)
      );
      for (const page of copied) output.addPage(page);

      const bytes = await output.save();
      savePdf(
        bytes,
        `${baseFilename(pdfFile.name, "document")}-extracted.pdf`
      );
      showStatus(
        "success",
        `Extracted ${parsed.pages.length} page${parsed.pages.length === 1 ? "" : "s"} into a ${formatBytes(bytes.length)} PDF.`
      );
    } catch (error) {
      showStatus("error", describePdfError(error));
    } finally {
      setBusy(false);
    }
  };

  const splitEveryPage = async () => {
    if (pageCount > MAX_SPLIT_PAGES) {
      showStatus(
        "warning",
        `This PDF has ${pageCount} pages. Split at most ${MAX_SPLIT_PAGES} pages at a time by extracting a smaller range, then repeat.`
      );
      return;
    }

    setBusy(true);
    showStatus("", "");
    setSplitOutputs([]);

    try {
      const { PDFDocument } = await import("pdf-lib");
      const source = await getSourceDocument();
      const prefix = baseFilename(pdfFile.name, "document");
      const outputs = [];

      for (let index = 0; index < pageCount; index += 1) {
        const output = await PDFDocument.create();
        const [page] = await output.copyPages(source, [index]);
        output.addPage(page);
        const bytes = await output.save();
        outputs.push({
          page: index + 1,
          filename: `${prefix}-page-${index + 1}.pdf`,
          blob: new Blob([bytes], { type: "application/pdf" }),
          size: bytes.length,
        });
      }

      setSplitOutputs(outputs);
      showStatus(
        "success",
        `Prepared ${outputs.length} single-page PDFs. Download them below.`
      );
    } catch (error) {
      showStatus("error", describePdfError(error));
    } finally {
      setBusy(false);
    }
  };

  const rotatePages = async () => {
    const parsed = parsePageRanges(rangeInput, pageCount);
    if (parsed.error) {
      showStatus("error", parsed.error);
      return;
    }

    setBusy(true);
    showStatus("", "");

    try {
      const { degrees } = await import("pdf-lib");
      const source = await getSourceDocument();
      const angle = Number(rotateAngle);

      for (const pageNumber of parsed.pages) {
        const page = source.getPage(pageNumber - 1);
        const current = page.getRotation().angle || 0;
        page.setRotation(degrees((current + angle) % 360));
      }

      const bytes = await source.save();
      savePdf(
        bytes,
        `${baseFilename(pdfFile.name, "document")}-rotated.pdf`
      );
      showStatus(
        "success",
        `Rotated ${parsed.pages.length} page${parsed.pages.length === 1 ? "" : "s"} by ${angle}°.`
      );
    } catch (error) {
      showStatus("error", describePdfError(error));
    } finally {
      setBusy(false);
    }
  };

  const reorderPages = async () => {
    const parsed = parsePageOrder(orderInput, pageCount);
    if (parsed.error) {
      showStatus("error", parsed.error);
      return;
    }

    setBusy(true);
    showStatus("", "");

    try {
      const { PDFDocument } = await import("pdf-lib");
      const source = await getSourceDocument();
      const output = await PDFDocument.create();
      const copied = await output.copyPages(
        source,
        parsed.pages.map((page) => page - 1)
      );
      for (const page of copied) output.addPage(page);

      const bytes = await output.save();
      savePdf(
        bytes,
        `${baseFilename(pdfFile.name, "document")}-reordered.pdf`
      );
      showStatus(
        "success",
        `Created a ${parsed.pages.length}-page PDF in the requested order.`
      );
    } catch (error) {
      showStatus("error", describePdfError(error));
    } finally {
      setBusy(false);
    }
  };

  const numberPages = async () => {
    const parsed = parsePageRanges(rangeInput, pageCount);
    if (parsed.error) {
      showStatus("error", parsed.error);
      return;
    }

    setBusy(true);
    showStatus("", "");

    try {
      const { StandardFonts, rgb } = await import("pdf-lib");
      const source = await getSourceDocument();
      const font = await source.embedFont(StandardFonts.Helvetica);
      const size = Math.max(6, Math.min(48, Number(numberSize) || 11));
      const margin = Math.max(6, Math.min(120, Number(numberMargin) || 24));
      const start = Number(numberStart) || 1;
      const total = parsed.pages.length;

      parsed.pages.forEach((pageNumber, index) => {
        const page = source.getPage(pageNumber - 1);
        const { width, height } = page.getSize();
        const pageLabel = start + index;
        const text =
          numberFormat === "page"
            ? `Page ${pageLabel}`
            : numberFormat === "of"
              ? `${pageLabel} / ${total}`
              : String(pageLabel);

        const textWidth = font.widthOfTextAtSize(text, size);
        let x = margin;

        if (numberPosition.endsWith("center")) {
          x = (width - textWidth) / 2;
        } else if (numberPosition.endsWith("right")) {
          x = width - margin - textWidth;
        }

        const y = numberPosition.startsWith("top")
          ? height - margin - size
          : margin;

        page.drawText(text, {
          x,
          y,
          size,
          font,
          color: rgb(0.12, 0.16, 0.24),
        });
      });

      const bytes = await source.save();
      savePdf(
        bytes,
        `${baseFilename(pdfFile.name, "document")}-numbered.pdf`
      );
      showStatus(
        "success",
        `Added page numbers to ${total} page${total === 1 ? "" : "s"}.`
      );
    } catch (error) {
      showStatus("error", describePdfError(error));
    } finally {
      setBusy(false);
    }
  };

  const saveMetadata = async () => {
    setBusy(true);
    showStatus("", "");

    try {
      const source = await getSourceDocument();
      source.setTitle(metadataFields.title.trim());
      source.setAuthor(metadataFields.author.trim());
      source.setSubject(metadataFields.subject.trim());
      source.setKeywords(
        metadataFields.keywords
          .split(/[,\n]/)
          .map((keyword) => keyword.trim())
          .filter(Boolean)
      );

      const bytes = await source.save();
      savePdf(
        bytes,
        `${baseFilename(pdfFile.name, "document")}-metadata.pdf`
      );
      showStatus(
        "success",
        "Saved a copy with updated document information."
      );
    } catch (error) {
      showStatus("error", describePdfError(error));
    } finally {
      setBusy(false);
    }
  };

  const statusClass = `calvoro-tool-status${status.kind ? ` is-${status.kind}` : ""}`;
  const prefix = pdfFile ? baseFilename(pdfFile.name, "document") : "document";
  const needsSingleFile = tab !== "merge";

  return (
    <ToolPage
      title="PDF Studio"
      kicker="PDF tool"
      description="Merge, extract, split, rotate, reorder, number, and inspect PDF pages. Files are processed with pdf-lib inside this tab and are not uploaded."
      seoTitle="PDF Studio - Merge, Split, Rotate, and Number PDFs | CALVORO"
      seoDescription="Edit PDF pages in your browser: merge files, extract ranges, split pages, rotate, reorder, add page numbers, and view or update metadata."
      steps={[
        "Choose the action you need from the tabs.",
        "Load one PDF, or several PDFs for merging.",
        "Run the action, then check the downloaded copy before replacing the original.",
      ]}
      notes={[
        "Everything runs locally with pdf-lib. The original file is never changed; each action downloads a new copy.",
        "Encrypted or password-protected PDFs are rejected. Remove protection in a PDF reader first, then load the unprotected copy.",
        "Page numbers are added in the page's coordinate space. If a page already has a 90° or 270° rotation, rotate or flatten it in another tool first if the number appears along the wrong edge.",
        "Splitting is capped at 100 pages per run to keep the tab responsive. Extract larger documents in smaller ranges.",
        "Metadata edits update the standard document information fields. Some PDFs also carry XMP metadata from their authoring app, which this tool does not rewrite.",
      ]}
      related={[
        { name: "Image Studio", path: "/image-studio" },
        { name: "QR Code Generator", path: "/qr-code-generator" },
        { name: "Word and Character Counter", path: "/word-counter" },
      ]}
    >
      <div className="calvoro-tool-tabs" role="tablist" aria-label="PDF actions">
        {TABS.map((entry) => (
          <button
            key={entry.id}
            type="button"
            role="tab"
            aria-selected={tab === entry.id}
            className={
              tab === entry.id
                ? "calvoro-tool-tab is-active"
                : "calvoro-tool-tab"
            }
            onClick={() => {
              setTab(entry.id);
              showStatus("", "");
            }}
          >
            {entry.label}
          </button>
        ))}
      </div>

      {needsSingleFile && (
        <div role="tabpanel" aria-label={TABS.find((entry) => entry.id === tab)?.label}>
          <input
            ref={singleInputRef}
            type="file"
            accept=".pdf,application/pdf"
            onChange={loadSingleFile}
            style={{ display: "none" }}
          />

          <button
            type="button"
            className="calvoro-file-drop"
            onClick={() => singleInputRef.current?.click()}
            style={{ width: "100%", font: "inherit" }}
            disabled={fileLoading || busy}
          >
            <strong>
              {fileLoading
                ? "Reading the PDF..."
                : pdfFile
                  ? "Replace the loaded PDF"
                  : "Choose a PDF file"}
            </strong>
            <small>One PDF up to 50 MB. Encrypted files cannot be opened.</small>
          </button>

          {pdfFile && (
            <ul className="calvoro-file-list">
              <li>
                <span>
                  {pdfFile.name} · {formatBytes(pdfFile.size)} ·{" "}
                  {pageCount.toLocaleString()} page{pageCount === 1 ? "" : "s"}
                  {pageSize
                    ? ` · first page ${Math.round(pageSize.width)} × ${Math.round(pageSize.height)} pt`
                    : ""}
                </span>
                <button type="button" onClick={resetDocument} disabled={busy}>
                  Remove
                </button>
              </li>
            </ul>
          )}

          {fileError && (
            <p className="calvoro-tool-status is-error" role="alert">
              {fileError}
            </p>
          )}
        </div>
      )}

      {tab === "merge" && (
        <div role="tabpanel" aria-label="Merge PDFs">
          <input
            ref={mergeInputRef}
            type="file"
            accept=".pdf,application/pdf"
            multiple
            onChange={addMergeFiles}
            style={{ display: "none" }}
          />

          <button
            type="button"
            className="calvoro-file-drop"
            onClick={() => mergeInputRef.current?.click()}
            style={{ width: "100%", font: "inherit" }}
            disabled={busy}
          >
            <strong>Add PDF files to merge</strong>
            <small>
              Files are combined in the order shown below. Up to {MAX_MERGE_FILES} files, 50 MB
              each.
            </small>
          </button>

          {mergeFiles.length > 0 ? (
            <ul className="calvoro-file-list">
              {mergeFiles.map((entry, index) => (
                <li key={entry.id}>
                  <span>
                    {index + 1}. {entry.file.name} · {formatBytes(entry.file.size)}
                  </span>
                  <span style={{ display: "flex", gap: 8, flex: "0 0 auto" }}>
                    <button
                      type="button"
                      style={{ color: "#2563eb" }}
                      onClick={() =>
                        setMergeFiles((current) => moveItem(current, index, -1))
                      }
                      disabled={busy || index === 0}
                    >
                      Up
                    </button>
                    <button
                      type="button"
                      style={{ color: "#2563eb" }}
                      onClick={() =>
                        setMergeFiles((current) => moveItem(current, index, 1))
                      }
                      disabled={busy || index === mergeFiles.length - 1}
                    >
                      Down
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setMergeFiles((current) =>
                          current.filter((item) => item.id !== entry.id)
                        )
                      }
                      disabled={busy}
                    >
                      Remove
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="calvoro-tool-empty" style={{ marginTop: 14 }}>
              No files added yet.
            </div>
          )}

          <div className="calvoro-field" style={{ marginTop: 16 }}>
            <label htmlFor="merge-filename">Output filename</label>
            <input
              id="merge-filename"
              type="text"
              value={mergeName}
              onChange={(event) => setMergeName(event.target.value)}
              placeholder="calvoro-merged.pdf"
            />
          </div>

          <div className="calvoro-tool-actions">
            <button
              type="button"
              className="calvoro-tool-button"
              onClick={mergePdfs}
              disabled={busy || mergeFiles.length < 2}
            >
              {busy ? "Merging..." : "Merge PDFs"}
            </button>
            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={() => {
                setMergeFiles([]);
                showStatus("", "");
              }}
              disabled={busy || mergeFiles.length === 0}
            >
              Clear list
            </button>
          </div>
        </div>
      )}

      {tab === "extract" && (
        <div role="tabpanel" aria-label="Extract or split pages">
          <div className="calvoro-field">
            <label htmlFor="extract-range">Pages to extract</label>
            <input
              id="extract-range"
              type="text"
              value={rangeInput}
              onChange={(event) => setRangeInput(event.target.value)}
              placeholder="1-3,5"
              disabled={!pdfFile || busy}
            />
            <span className="calvoro-field-hint">
              Use commas for separate pages or ranges, such as 1-3, 7, 10-12.
            </span>
          </div>

          <div className="calvoro-tool-actions">
            <button
              type="button"
              className="calvoro-tool-button"
              onClick={extractPages}
              disabled={!pdfFile || busy}
            >
              {busy ? "Working..." : "Extract into one PDF"}
            </button>
            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={splitEveryPage}
              disabled={!pdfFile || busy || pageCount > MAX_SPLIT_PAGES}
            >
              Split every page
            </button>
          </div>

          {pageCount > MAX_SPLIT_PAGES && (
            <p className="calvoro-tool-status is-warning">
              Split is limited to {MAX_SPLIT_PAGES} pages. This document has{" "}
              {pageCount}. Extract a smaller page range first.
            </p>
          )}

          {splitOutputs.length > 0 && (
            <div style={{ marginTop: 16 }}>
              <h3>Prepared single-page files</h3>
              <ul className="calvoro-file-list">
                {splitOutputs.map((output) => (
                  <li key={output.page}>
                    <span>
                      Page {output.page} · {formatBytes(output.size)}
                    </span>
                    <button
                      type="button"
                      style={{ color: "#2563eb" }}
                      onClick={() => downloadBlob(output.blob, output.filename)}
                    >
                      Download
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {tab === "rotate" && (
        <div role="tabpanel" aria-label="Rotate pages">
          <div className="calvoro-tool-grid">
            <div className="calvoro-field">
              <label htmlFor="rotate-range">Pages to rotate</label>
              <input
                id="rotate-range"
                type="text"
                value={rangeInput}
                onChange={(event) => setRangeInput(event.target.value)}
                placeholder="1-3,5"
                disabled={!pdfFile || busy}
              />
              <span className="calvoro-field-hint">Leave as 1-N to rotate every page.</span>
            </div>

            <div className="calvoro-field">
              <label htmlFor="rotate-angle">Rotation</label>
              <select
                id="rotate-angle"
                value={rotateAngle}
                onChange={(event) => setRotateAngle(event.target.value)}
                disabled={!pdfFile || busy}
              >
                <option value="90">90° clockwise</option>
                <option value="180">180°</option>
                <option value="270">270° clockwise</option>
              </select>
            </div>
          </div>

          <div className="calvoro-tool-actions">
            <button
              type="button"
              className="calvoro-tool-button"
              onClick={rotatePages}
              disabled={!pdfFile || busy}
            >
              {busy ? "Rotating..." : "Rotate and download"}
            </button>
          </div>
        </div>
      )}

      {tab === "reorder" && (
        <div role="tabpanel" aria-label="Reorder pages">
          <div className="calvoro-field">
            <label htmlFor="reorder-input">New page order</label>
            <input
              id="reorder-input"
              type="text"
              value={orderInput}
              onChange={(event) => setOrderInput(event.target.value)}
              placeholder="3,1,2"
              disabled={!pdfFile || busy}
            />
            <span className="calvoro-field-hint">
              Use page numbers separated by commas. Leave blank to keep the
              original order. Repeat a number to duplicate a page.
            </span>
          </div>

          <div className="calvoro-tool-actions">
            <button
              type="button"
              className="calvoro-tool-button"
              onClick={reorderPages}
              disabled={!pdfFile || busy}
            >
              {busy ? "Working..." : "Reorder and download"}
            </button>
            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={() =>
                setOrderInput(
                  Array.from({ length: pageCount }, (_, index) => index + 1).join(",")
                )
              }
              disabled={!pdfFile || busy}
            >
              Fill current order
            </button>
            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={() =>
                setOrderInput(
                  Array.from({ length: pageCount }, (_, index) => pageCount - index).join(",")
                )
              }
              disabled={!pdfFile || busy}
            >
              Reverse order
            </button>
          </div>
        </div>
      )}

      {tab === "number" && (
        <div role="tabpanel" aria-label="Add page numbers">
          <div className="calvoro-tool-grid">
            <div className="calvoro-field">
              <label htmlFor="number-range">Pages to number</label>
              <input
                id="number-range"
                type="text"
                value={rangeInput}
                onChange={(event) => setRangeInput(event.target.value)}
                placeholder="1-3,5"
                disabled={!pdfFile || busy}
              />
            </div>

            <div className="calvoro-field">
              <label htmlFor="number-position">Position</label>
              <select
                id="number-position"
                value={numberPosition}
                onChange={(event) => setNumberPosition(event.target.value)}
                disabled={!pdfFile || busy}
              >
                {POSITIONS.map((position) => (
                  <option key={position.value} value={position.value}>
                    {position.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="calvoro-field">
              <label htmlFor="number-format">Format</label>
              <select
                id="number-format"
                value={numberFormat}
                onChange={(event) => setNumberFormat(event.target.value)}
                disabled={!pdfFile || busy}
              >
                <option value="plain">1</option>
                <option value="page">Page 1</option>
                <option value="of">1 / total</option>
              </select>
            </div>

            <div className="calvoro-field">
              <label htmlFor="number-start">Start at</label>
              <input
                id="number-start"
                type="number"
                min="0"
                max="1000000"
                value={numberStart}
                onChange={(event) => setNumberStart(event.target.value)}
                disabled={!pdfFile || busy}
              />
            </div>

            <div className="calvoro-field">
              <label htmlFor="number-size">Font size (pt)</label>
              <input
                id="number-size"
                type="number"
                min="6"
                max="48"
                value={numberSize}
                onChange={(event) => setNumberSize(event.target.value)}
                disabled={!pdfFile || busy}
              />
            </div>

            <div className="calvoro-field">
              <label htmlFor="number-margin">Margin (pt)</label>
              <input
                id="number-margin"
                type="number"
                min="6"
                max="120"
                value={numberMargin}
                onChange={(event) => setNumberMargin(event.target.value)}
                disabled={!pdfFile || busy}
              />
            </div>
          </div>

          <div className="calvoro-tool-actions">
            <button
              type="button"
              className="calvoro-tool-button"
              onClick={numberPages}
              disabled={!pdfFile || busy}
            >
              {busy ? "Numbering..." : "Add page numbers"}
            </button>
          </div>
        </div>
      )}

      {tab === "metadata" && (
        <div role="tabpanel" aria-label="PDF metadata">
          {pdfFile ? (
            <>
              <div className="calvoro-tool-table-wrap">
                <table className="calvoro-tool-table">
                  <tbody>
                    <tr>
                      <th scope="row">File</th>
                      <td>{pdfFile.name}</td>
                    </tr>
                    <tr>
                      <th scope="row">Size</th>
                      <td>{formatBytes(pdfFile.size)}</td>
                    </tr>
                    <tr>
                      <th scope="row">Pages</th>
                      <td>{pageCount.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <th scope="row">First page</th>
                      <td>
                        {pageSize
                          ? `${Math.round(pageSize.width)} × ${Math.round(pageSize.height)} pt`
                          : "—"}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Creator</th>
                      <td>{metadataInfo.creator || "Not set"}</td>
                    </tr>
                    <tr>
                      <th scope="row">Producer</th>
                      <td>{metadataInfo.producer || "Not set"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="calvoro-tool-grid" style={{ marginTop: 18 }}>
                <div className="calvoro-field">
                  <label htmlFor="meta-title">Title</label>
                  <input
                    id="meta-title"
                    type="text"
                    value={metadataFields.title}
                    onChange={(event) =>
                      setMetadataFields((current) => ({
                        ...current,
                        title: event.target.value,
                      }))
                    }
                    disabled={busy}
                  />
                </div>
                <div className="calvoro-field">
                  <label htmlFor="meta-author">Author</label>
                  <input
                    id="meta-author"
                    type="text"
                    value={metadataFields.author}
                    onChange={(event) =>
                      setMetadataFields((current) => ({
                        ...current,
                        author: event.target.value,
                      }))
                    }
                    disabled={busy}
                  />
                </div>
                <div className="calvoro-field">
                  <label htmlFor="meta-subject">Subject</label>
                  <input
                    id="meta-subject"
                    type="text"
                    value={metadataFields.subject}
                    onChange={(event) =>
                      setMetadataFields((current) => ({
                        ...current,
                        subject: event.target.value,
                      }))
                    }
                    disabled={busy}
                  />
                </div>
                <div className="calvoro-field">
                  <label htmlFor="meta-keywords">Keywords</label>
                  <input
                    id="meta-keywords"
                    type="text"
                    value={metadataFields.keywords}
                    onChange={(event) =>
                      setMetadataFields((current) => ({
                        ...current,
                        keywords: event.target.value,
                      }))
                    }
                    disabled={busy}
                  />
                </div>
              </div>

              <div className="calvoro-tool-actions">
                <button
                  type="button"
                  className="calvoro-tool-button"
                  onClick={saveMetadata}
                  disabled={busy}
                >
                  {busy ? "Saving..." : "Save a copy with these details"}
                </button>
              </div>
            </>
          ) : (
            <div className="calvoro-tool-empty">
              Load a PDF above to inspect its document information.
            </div>
          )}
        </div>
      )}

      <p className={statusClass} role="status" aria-live="polite">
        {status.message ||
          (needsSingleFile && !pdfFile
            ? "Load a PDF to begin. Files stay on this device."
            : "Choose an action above. Output files are downloaded, never uploaded.")}
      </p>

      {splitOutputs.length > 0 && tab !== "extract" && (
        <p className="calvoro-inline-note">
          {splitOutputs.length} single-page files from the last split are still
          available on the Extract / Split tab.
        </p>
      )}
    </ToolPage>
  );
}
