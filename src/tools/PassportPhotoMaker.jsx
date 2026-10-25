import { useEffect, useRef, useState } from "react";
import ToolPage from "./ToolPage.jsx";
import { baseFilename, downloadBlob, formatBytes } from "./utils.js";
import {
  PASSPORT_IMAGE_LIMITS,
  canvasToBlob,
  imageExtension,
  imageTypeLabel,
  readImageSignature,
  validateImageDimensions,
  validateImageMetadata,
} from "./creativeUtils.js";
import {
  PASSPORT_DPI_OPTIONS,
  PASSPORT_PRESETS,
  PASSPORT_SHEET_PAGES,
  calculatePassportSize,
  computeSourceCrop,
  getSheetLayout,
  mmToPoints,
} from "./passportUtils.js";
import "./creativeTools.css";

const PREVIEW_MAX_WIDTH = 320;
const PREVIEW_MAX_HEIGHT = 370;

function loadImageElement(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () =>
      reject(new Error("The browser could not decode this image."));
    image.src = url;
  });
}

function getPreviewFrame(aspect) {
  if (!Number.isFinite(aspect) || aspect <= 0) {
    return { width: PREVIEW_MAX_WIDTH, height: PREVIEW_MAX_WIDTH };
  }

  let width = PREVIEW_MAX_WIDTH;
  let height = width / aspect;

  if (height > PREVIEW_MAX_HEIGHT) {
    height = PREVIEW_MAX_HEIGHT;
    width = height * aspect;
  }

  return {
    width: Math.max(1, Math.round(width)),
    height: Math.max(1, Math.round(height)),
  };
}

function renderPhotoCanvas(image, crop, widthPx, heightPx, format) {
  const canvas = document.createElement("canvas");
  canvas.width = widthPx;
  canvas.height = heightPx;
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas drawing is not available in this browser.");
  }

  if (format === "image/jpeg") {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, widthPx, heightPx);
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(
    image.el,
    crop.x,
    crop.y,
    crop.width,
    crop.height,
    0,
    0,
    widthPx,
    heightPx
  );

  return canvas;
}

export default function PassportPhotoMaker() {
  const [image, setImage] = useState(null);
  const [presetId, setPresetId] = useState("us-2x2");
  const [customWidthMm, setCustomWidthMm] = useState("35");
  const [customHeightMm, setCustomHeightMm] = useState("45");
  const [dpi, setDpi] = useState(300);
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);
  const [format, setFormat] = useState("image/jpeg");
  const [sheetPage, setSheetPage] = useState("a4");
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [imageError, setImageError] = useState("");
  const [status, setStatus] = useState({ kind: "", message: "" });

  const inputRef = useRef(null);
  const imageUrlRef = useRef("");
  const canvasRef = useRef(null);
  const dragRef = useRef(null);

  const size = calculatePassportSize({
    presetId,
    customWidthMm,
    customHeightMm,
    dpi,
  });

  const targetAspect =
    !size.error && size.heightMm > 0 ? size.widthMm / size.heightMm : 1;
  const frame = getPreviewFrame(targetAspect);
  const crop =
    image && !size.error
      ? computeSourceCrop({
          sourceWidth: image.width,
          sourceHeight: image.height,
          targetAspect,
          zoom,
          panX,
          panY,
        })
      : null;
  const sheetLayout = !size.error
    ? getSheetLayout({
        pageId: sheetPage,
        photoWidthMm: size.widthMm,
        photoHeightMm: size.heightMm,
      })
    : null;

  useEffect(() => {
    return () => {
      if (imageUrlRef.current) URL.revokeObjectURL(imageUrlRef.current);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas || !image || !crop) return;

    canvas.width = frame.width;
    canvas.height = frame.height;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.fillStyle = "#f8fafc";
    context.fillRect(0, 0, frame.width, frame.height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(
      image.el,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      frame.width,
      frame.height
    );
  }, [image, crop, frame.height, frame.width]);

  const resetCrop = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  const handleFile = async (file) => {
    if (!file) return;

    setLoading(true);
    setImageError("");
    setStatus({ kind: "", message: "" });

    try {
      const signatureType = await readImageSignature(file);
      const validation = validateImageMetadata({
        name: file.name,
        type: file.type,
        size: file.size,
        signatureType,
        limits: PASSPORT_IMAGE_LIMITS,
      });

      if (!validation.ok) throw new Error(validation.error);

      const url = URL.createObjectURL(file);

      try {
        const element = await loadImageElement(url);
        const dimensionError = validateImageDimensions(
          element.naturalWidth,
          element.naturalHeight,
          PASSPORT_IMAGE_LIMITS
        );

        if (dimensionError) throw new Error(dimensionError);

        if (imageUrlRef.current) URL.revokeObjectURL(imageUrlRef.current);
        imageUrlRef.current = url;

        setImage({
          el: element,
          url,
          file,
          width: element.naturalWidth,
          height: element.naturalHeight,
          type: validation.type,
        });
        resetCrop();
        setStatus({
          kind: "success",
          message:
            "Image loaded. Choose a size, then adjust the crop and zoom.",
        });
      } catch (error) {
        URL.revokeObjectURL(url);
        throw error;
      }
    } catch (error) {
      setImageError(
        error instanceof Error ? error.message : "The image could not be loaded."
      );
    } finally {
      setLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const removeImage = () => {
    if (imageUrlRef.current) URL.revokeObjectURL(imageUrlRef.current);
    imageUrlRef.current = "";
    setImage(null);
    setImageError("");
    setStatus({ kind: "", message: "" });
    resetCrop();
  };

  const getExportCanvas = () => {
    if (!image) throw new Error("Choose an image first.");
    if (size.error) throw new Error(size.error);
    if (!crop) throw new Error("The crop could not be calculated.");

    return renderPhotoCanvas(
      image,
      crop,
      size.widthPx,
      size.heightPx,
      "image/png"
    );
  };

  const exportImage = async () => {
    if (!image) return;

    setBusy(true);
    setStatus({ kind: "", message: "" });

    try {
      if (size.error) throw new Error(size.error);

      const canvas = renderPhotoCanvas(
        image,
        crop,
        size.widthPx,
        size.heightPx,
        format
      );
      const blob = await canvasToBlob(canvas, format, 0.94);
      const extension = imageExtension(format);
      const filename = `${baseFilename(
        image.file.name,
        "passport-photo"
      )}-${size.widthMm}x${size.heightMm}mm-${dpi}dpi.${extension}`;

      downloadBlob(blob, filename);
      setStatus({
        kind: "success",
        message: `Downloaded a ${size.widthPx} × ${size.heightPx} px image at ${dpi} DPI.`,
      });
    } catch (error) {
      setStatus({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "The image could not be exported.",
      });
    } finally {
      setBusy(false);
    }
  };

  const exportPdf = async (asSheet) => {
    if (!image) return;

    setBusy(true);
    setStatus({ kind: "", message: "" });

    try {
      if (size.error) throw new Error(size.error);
      if (asSheet && sheetLayout?.error) throw new Error(sheetLayout.error);

      const canvas = getExportCanvas();
      const pngBlob = await canvasToBlob(canvas, "image/png");
      const pngBytes = new Uint8Array(await pngBlob.arrayBuffer());
      const { PDFDocument, rgb } = await import("pdf-lib");
      const pdf = await PDFDocument.create();
      const embedded = await pdf.embedPng(pngBytes);
      const prefix = baseFilename(image.file.name, "passport-photo");

      if (!asSheet) {
        const page = pdf.addPage([size.widthPt, size.heightPt]);
        page.drawImage(embedded, {
          x: 0,
          y: 0,
          width: size.widthPt,
          height: size.heightPt,
        });
        const bytes = await pdf.save();
        downloadBlob(
          new Blob([bytes], { type: "application/pdf" }),
          `${prefix}-${size.widthMm}x${size.heightMm}mm.pdf`
        );
        setStatus({
          kind: "success",
          message: `Created a single-photo PDF with a ${size.widthMm} × ${size.heightMm} mm page.`,
        });
      } else {
        const pageWidthPt = mmToPoints(sheetLayout.page.widthMm);
        const pageHeightPt = mmToPoints(sheetLayout.page.heightMm);
        const page = pdf.addPage([pageWidthPt, pageHeightPt]);
        const photoWidthPt = mmToPoints(size.widthMm);
        const photoHeightPt = mmToPoints(size.heightMm);
        const guideColor = rgb(0.55, 0.62, 0.7);

        sheetLayout.positions.forEach((position) => {
          const x = mmToPoints(position.xMm);
          const y =
            pageHeightPt - mmToPoints(position.yMm + position.heightMm);

          page.drawImage(embedded, {
            x,
            y,
            width: photoWidthPt,
            height: photoHeightPt,
          });
          page.drawRectangle({
            x,
            y,
            width: photoWidthPt,
            height: photoHeightPt,
            borderColor: guideColor,
            borderWidth: 0.5,
          });
        });

        const bytes = await pdf.save();
        downloadBlob(
          new Blob([bytes], { type: "application/pdf" }),
          `${prefix}-${sheetPage}-sheet.pdf`
        );
        setStatus({
          kind: "success",
          message: `Created a printable ${sheetLayout.page.label} sheet with ${sheetLayout.count} photo${
            sheetLayout.count === 1 ? "" : "s"
          }. Print at 100% or actual size.`,
        });
      }
    } catch (error) {
      setStatus({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "The PDF could not be created.",
      });
    } finally {
      setBusy(false);
    }
  };

  const handlePointerDown = (event) => {
    if (!image || !crop) return;

    event.currentTarget.setPointerCapture?.(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      panX,
      panY,
      crop,
      frameWidth: frame.width,
      frameHeight: frame.height,
    };
    event.preventDefault();
  };

  const handlePointerMove = (event) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    const dx = event.clientX - drag.startX;
    const dy = event.clientY - drag.startY;
    const nextPanX =
      drag.crop.maxX > 0
        ? drag.panX -
          (dx * drag.crop.width) / drag.frameWidth / drag.crop.maxX
        : 0;
    const nextPanY =
      drag.crop.maxY > 0
        ? drag.panY -
          (dy * drag.crop.height) / drag.frameHeight / drag.crop.maxY
        : 0;

    setPanX(Math.min(1, Math.max(-1, nextPanX)));
    setPanY(Math.min(1, Math.max(-1, nextPanY)));
  };

  const finishPointerDrag = (event) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    event.currentTarget.releasePointerCapture?.(event.pointerId);
    dragRef.current = null;
  };

  const statusClass = `calvoro-tool-status${
    status.kind ? ` is-${status.kind}` : ""
  }`;

  return (
    <ToolPage
      title="Passport Photo Maker"
      kicker="Image and PDF tool"
      description="Crop and zoom a local photo to a common or custom passport size, then download a correctly sized image or PDF. The file stays in this browser tab."
      seoTitle="Passport Photo Maker - Crop and Print a Photo at Home | CALVORO"
      seoDescription="Make a passport-style photo in your browser: choose a common or custom size, crop and zoom, set 300 or 600 DPI, and download an image, single-photo PDF, or printable A4/4×6 sheet."
      privacyBadge="Runs in your browser. Your photo is never uploaded."
      steps={[
        "Choose a PNG, JPEG, or WebP photo up to 30 MB.",
        "Select a photo size and DPI, then drag the preview or use the sliders to frame the face.",
        "Download an image or PDF, or create a printable sheet.",
      ]}
      notes={[
        "The output dimensions are calculated from the millimetre size and DPI. The single-photo PDF uses the same physical dimensions on the page.",
        "Print at 100% or actual size. Turn off fit-to-page or shrink-to-fit settings, because scaling changes the physical dimensions. Printers and paper handling can still introduce small differences.",
        "This tool does not check official photo requirements, detect faces, replace backgrounds, or guarantee acceptance by any government or agency. Verify the current rules for your document before submitting a photo.",
        "For a printable sheet, the PDF includes thin cut guides. Use sharp scissors or a paper trimmer and check the printed size with a ruler before cutting the whole sheet. Read the [passport photo sizes and printing guide](/blog/passport-photo-sizes-and-printing-guide) for the requirements behind each size.",
        "Everything is processed locally with canvas and pdf-lib. No photo is sent to CALVORO or another server.",
      ]}
      related={[
        { name: "Image Studio", path: "/image-studio" },
        { name: "PDF Studio", path: "/pdf-studio" },
        { name: "Meme Generator", path: "/meme-generator" },
      ]}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
        onChange={(event) => handleFile(event.target.files?.[0])}
        style={{ display: "none" }}
      />

      <button
        type="button"
        className="calvoro-file-drop"
        onClick={() => inputRef.current?.click()}
        disabled={loading || busy}
        style={{ width: "100%", font: "inherit" }}
      >
        <strong>
          {loading
            ? "Checking the photo..."
            : image
              ? "Replace the loaded photo"
              : "Choose a photo"}
        </strong>
        <small>
          PNG, JPEG, or WebP up to 30 MB. Nothing is uploaded.
        </small>
      </button>

      {imageError && (
        <p className="calvoro-tool-status is-error" role="alert">
          {imageError}
        </p>
      )}

      {!image && !loading && (
        <p className="calvoro-creative-empty">
          Load a photo to open the crop, size, and print controls.
        </p>
      )}

      {image && (
        <div className="calvoro-passport-layout">
          <div className="calvoro-passport-preview-column">
            <div className="calvoro-passport-frame">
              <canvas
                ref={canvasRef}
                role="img"
                aria-label="Cropped passport photo preview"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={finishPointerDrag}
                onPointerCancel={finishPointerDrag}
              />
            </div>
            <p className="calvoro-field-hint">
              Drag inside the preview to reposition the photo. The sliders below
              provide the same control without a pointer.
            </p>

            <div className="calvoro-field">
              <label htmlFor="passport-zoom">
                Zoom: {Math.round(zoom * 100)}%
              </label>
              <input
                id="passport-zoom"
                type="range"
                min="100"
                max="300"
                step="1"
                value={Math.round(zoom * 100)}
                onChange={(event) =>
                  setZoom(Number(event.target.value) / 100)
                }
              />
            </div>

            <div className="calvoro-tool-grid">
              <div className="calvoro-field">
                <label htmlFor="passport-pan-x">
                  Horizontal position: {Math.round(panX * 100)}%
                </label>
                <input
                  id="passport-pan-x"
                  type="range"
                  min="-100"
                  max="100"
                  step="1"
                  value={Math.round(panX * 100)}
                  onChange={(event) =>
                    setPanX(Number(event.target.value) / 100)
                  }
                />
              </div>

              <div className="calvoro-field">
                <label htmlFor="passport-pan-y">
                  Vertical position: {Math.round(panY * 100)}%
                </label>
                <input
                  id="passport-pan-y"
                  type="range"
                  min="-100"
                  max="100"
                  step="1"
                  value={Math.round(panY * 100)}
                  onChange={(event) =>
                    setPanY(Number(event.target.value) / 100)
                  }
                />
              </div>
            </div>

            <div className="calvoro-tool-actions">
              <button
                type="button"
                className="calvoro-tool-button is-secondary"
                onClick={resetCrop}
                disabled={busy}
              >
                Reset crop
              </button>
            </div>

            <ul className="calvoro-file-list">
              <li>
                <span>{image.file.name}</span>
                <button type="button" onClick={removeImage} disabled={busy}>
                  Remove
                </button>
              </li>
              <li>
                <span>Source dimensions</span>
                <span>
                  {image.width.toLocaleString()} ×{" "}
                  {image.height.toLocaleString()} px
                </span>
              </li>
              <li>
                <span>Format</span>
                <span>{imageTypeLabel(image.type)}</span>
              </li>
              <li>
                <span>Size</span>
                <span>{formatBytes(image.file.size)}</span>
              </li>
            </ul>
          </div>

          <div className="calvoro-passport-controls">
            <div className="calvoro-field">
              <label htmlFor="passport-preset">Photo size</label>
              <select
                id="passport-preset"
                value={presetId}
                onChange={(event) => setPresetId(event.target.value)}
              >
                {PASSPORT_PRESETS.map((preset) => (
                  <option key={preset.id} value={preset.id}>
                    {preset.label}
                  </option>
                ))}
                <option value="custom">Custom size</option>
              </select>
            </div>

            {presetId === "custom" && (
              <div className="calvoro-tool-grid">
                <div className="calvoro-field">
                  <label htmlFor="passport-custom-width">
                    Width in millimetres
                  </label>
                  <input
                    id="passport-custom-width"
                    type="number"
                    min="20"
                    max="150"
                    step="0.1"
                    value={customWidthMm}
                    onChange={(event) =>
                      setCustomWidthMm(event.target.value)
                    }
                  />
                </div>
                <div className="calvoro-field">
                  <label htmlFor="passport-custom-height">
                    Height in millimetres
                  </label>
                  <input
                    id="passport-custom-height"
                    type="number"
                    min="20"
                    max="150"
                    step="0.1"
                    value={customHeightMm}
                    onChange={(event) =>
                      setCustomHeightMm(event.target.value)
                    }
                  />
                </div>
              </div>
            )}

            <div className="calvoro-tool-grid">
              <div className="calvoro-field">
                <label htmlFor="passport-dpi">Resolution</label>
                <select
                  id="passport-dpi"
                  value={dpi}
                  onChange={(event) => setDpi(Number(event.target.value))}
                >
                  {PASSPORT_DPI_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option} DPI
                    </option>
                  ))}
                </select>
              </div>

              <div className="calvoro-field">
                <label htmlFor="passport-format">Image format</label>
                <select
                  id="passport-format"
                  value={format}
                  onChange={(event) => setFormat(event.target.value)}
                >
                  <option value="image/jpeg">JPEG (smaller)</option>
                  <option value="image/png">PNG (lossless)</option>
                </select>
              </div>
            </div>

            {size.error ? (
              <p className="calvoro-tool-status is-error" role="alert">
                {size.error}
              </p>
            ) : (
              <div className="calvoro-passport-summary">
                <span>
                  Photo: {size.widthMm} × {size.heightMm} mm
                </span>
                <span>
                  Pixels: {size.widthPx.toLocaleString()} ×{" "}
                  {size.heightPx.toLocaleString()}
                </span>
                <span>
                  PDF page: {size.widthPt.toFixed(2)} ×{" "}
                  {size.heightPt.toFixed(2)} pt
                </span>
              </div>
            )}

            <div className="calvoro-field">
              <label htmlFor="passport-sheet">Printable sheet</label>
              <select
                id="passport-sheet"
                value={sheetPage}
                onChange={(event) => setSheetPage(event.target.value)}
              >
                {PASSPORT_SHEET_PAGES.map((page) => (
                  <option key={page.id} value={page.id}>
                    {page.label}
                  </option>
                ))}
              </select>
              <span className="calvoro-field-hint">
                {sheetLayout?.error
                  ? sheetLayout.error
                  : `${sheetLayout?.count || 0} photo${
                      sheetLayout?.count === 1 ? "" : "s"
                    } fit on this sheet.`}
              </span>
            </div>

            <div className="calvoro-tool-actions">
              <button
                type="button"
                className="calvoro-tool-button"
                onClick={exportImage}
                disabled={busy || Boolean(size.error)}
              >
                Download {format === "image/jpeg" ? "JPEG" : "PNG"}
              </button>
              <button
                type="button"
                className="calvoro-tool-button is-secondary"
                onClick={() => exportPdf(false)}
                disabled={busy || Boolean(size.error)}
              >
                Single-photo PDF
              </button>
              <button
                type="button"
                className="calvoro-tool-button is-secondary"
                onClick={() => exportPdf(true)}
                disabled={
                  busy ||
                  Boolean(size.error) ||
                  Boolean(sheetLayout?.error)
                }
              >
                Printable sheet PDF
              </button>
            </div>

            <div className="calvoro-creative-callout">
              <strong>Print at actual size</strong>
              <p>
                Set the print dialog to 100% or actual size and disable
                fit-to-page. Check the printed dimensions with a ruler before
                cutting. Official acceptance is not guaranteed; verify the
                current requirements for your document.
              </p>
            </div>

            <p className={statusClass} aria-live="polite">
              {status.message ||
                "The photo is cropped locally and never uploaded."}
            </p>
          </div>
        </div>
      )}
    </ToolPage>
  );
}
