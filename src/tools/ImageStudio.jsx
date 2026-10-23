import { useEffect, useRef, useState } from "react";
import ToolPage from "./ToolPage.jsx";
import {
  baseFilename,
  downloadBlob,
  formatBytes,
} from "./utils.js";

const MAX_IMAGE_BYTES = 30 * 1024 * 1024;
const MAX_SOURCE_PIXELS = 60_000_000;
const MAX_OUTPUT_DIMENSION = 12000;
const MAX_OUTPUT_PIXELS = 40_000_000;

const TABS = [
  { id: "resize", label: "Resize" },
  { id: "crop", label: "Crop" },
  { id: "optimize", label: "Optimize" },
  { id: "info", label: "Image info" },
  { id: "pdf", label: "Image to PDF" },
];

const FORMAT_OPTIONS = [
  { value: "image/png", label: "PNG (lossless, supports transparency)" },
  { value: "image/jpeg", label: "JPEG (smaller, no transparency)" },
  { value: "image/webp", label: "WebP (small, browser support required)" },
];

const EXTENSIONS = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
};

function isSupportedImage(file) {
  return (
    ["image/png", "image/jpeg", "image/webp"].includes(file.type) ||
    /\.(png|jpe?g|webp)$/i.test(file.name)
  );
}

function typeLabel(type) {
  if (type === "image/png") return "PNG";
  if (type === "image/jpeg") return "JPEG";
  if (type === "image/webp") return "WebP";
  return type || "Unknown";
}

function validateDimensions(width, height) {
  if (!Number.isFinite(width) || !Number.isFinite(height)) {
    return "Enter a whole number for both the width and the height.";
  }
  const roundedWidth = Math.round(width);
  const roundedHeight = Math.round(height);
  if (roundedWidth < 1 || roundedHeight < 1) {
    return "Width and height must be at least 1 pixel.";
  }
  if (
    roundedWidth > MAX_OUTPUT_DIMENSION ||
    roundedHeight > MAX_OUTPUT_DIMENSION
  ) {
    return `Keep each side at or below ${MAX_OUTPUT_DIMENSION.toLocaleString()} pixels.`;
  }
  if (roundedWidth * roundedHeight > MAX_OUTPUT_PIXELS) {
    return "That output would exceed 40 megapixels. Choose smaller dimensions.";
  }
  return "";
}

function greatestCommonDivisor(a, b) {
  let first = a;
  let second = b;
  while (second) {
    [first, second] = [second, first % second];
  }
  return first || 1;
}

async function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("The browser could not encode the image."));
      },
      type,
      quality
    );
  });
}

async function encodeImage({
  width,
  height,
  draw,
  format,
  quality = 0.9,
  background = "#ffffff",
}) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Canvas drawing is not available in this browser.");
  }

  if (format === "image/jpeg") {
    context.fillStyle = background;
    context.fillRect(0, 0, width, height);
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  draw(context, canvas);

  const blob = await canvasToBlob(canvas, format, quality);
  return {
    blob,
    type: blob.type || format,
  };
}

function FormatFields({
  prefix,
  format,
  setFormat,
  quality,
  setQuality,
  background,
  setBackground,
  disabled,
}) {
  return (
    <>
      <div className="calvoro-field">
        <label htmlFor={`${prefix}-format`}>Output format</label>
        <select
          id={`${prefix}-format`}
          value={format}
          onChange={(event) => setFormat(event.target.value)}
          disabled={disabled}
        >
          {FORMAT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {(format === "image/jpeg" || format === "image/webp") && (
        <div className="calvoro-field">
          <label htmlFor={`${prefix}-quality`}>
            Quality: {Math.round(quality * 100)}%
          </label>
          <input
            id={`${prefix}-quality`}
            type="range"
            min="30"
            max="100"
            step="1"
            value={Math.round(quality * 100)}
            onChange={(event) => setQuality(Number(event.target.value) / 100)}
            disabled={disabled}
          />
        </div>
      )}

      {format === "image/jpeg" && (
        <div className="calvoro-field">
          <label htmlFor={`${prefix}-background`}>
            Background for transparent areas
          </label>
          <input
            id={`${prefix}-background`}
            type="color"
            value={background}
            onChange={(event) => setBackground(event.target.value)}
            disabled={disabled}
          />
        </div>
      )}
    </>
  );
}

function ImageResult({ output, downloadLabel }) {
  if (!output) return null;

  return (
    <div className="calvoro-tool-output">
      <h3>Result</h3>
      <p>
        {output.width && output.height
          ? `${output.width.toLocaleString()} × ${output.height.toLocaleString()} px · `
          : ""}
        {formatBytes(output.size)}
        {output.detail ? ` · ${output.detail}` : ""}
      </p>

      {output.url && (
        <div className="calvoro-tool-preview is-flat" style={{ marginTop: 12 }}>
          <img src={output.url} alt="Processed image preview" />
        </div>
      )}

      <div className="calvoro-tool-actions">
        <button
          type="button"
          className="calvoro-tool-button"
          onClick={() => downloadBlob(output.blob, output.name)}
        >
          {downloadLabel}
        </button>
      </div>
    </div>
  );
}

export default function ImageStudio() {
  const [tab, setTab] = useState("resize");
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState("");
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState({ kind: "", message: "" });

  const inputRef = useRef(null);
  const imageUrlRef = useRef(null);
  const outputsRef = useRef({});
  const [outputs, setOutputs] = useState({});

  const [resizeWidth, setResizeWidth] = useState("");
  const [resizeHeight, setResizeHeight] = useState("");
  const [keepAspect, setKeepAspect] = useState(true);
  const [resizeFormat, setResizeFormat] = useState("image/png");
  const [resizeQuality, setResizeQuality] = useState(0.9);
  const [resizeBackground, setResizeBackground] = useState("#ffffff");

  const [cropX, setCropX] = useState("0");
  const [cropY, setCropY] = useState("0");
  const [cropWidth, setCropWidth] = useState("");
  const [cropHeight, setCropHeight] = useState("");
  const [cropFormat, setCropFormat] = useState("image/png");
  const [cropQuality, setCropQuality] = useState(0.9);
  const [cropBackground, setCropBackground] = useState("#ffffff");

  const [optimizeFormat, setOptimizeFormat] = useState("image/webp");
  const [optimizeQuality, setOptimizeQuality] = useState(0.8);
  const [optimizeScale, setOptimizeScale] = useState(100);
  const [optimizeBackground, setOptimizeBackground] = useState("#ffffff");

  const [transparency, setTransparency] = useState("");

  const [pageSize, setPageSize] = useState("a4");
  const [orientation, setOrientation] = useState("auto");
  const [pdfMargin, setPdfMargin] = useState("24");

  const showStatus = (kind, message) => setStatus({ kind, message });

  const revokeOutputs = () => {
    Object.values(outputsRef.current).forEach((output) => {
      if (output?.url) URL.revokeObjectURL(output.url);
    });
    outputsRef.current = {};
    setOutputs({});
  };

  const setOutput = (key, output) => {
    const previous = outputsRef.current[key];
    if (previous?.url) URL.revokeObjectURL(previous.url);
    outputsRef.current = { ...outputsRef.current, [key]: output };
    setOutputs(outputsRef.current);
  };

  useEffect(() => {
    return () => {
      if (imageUrlRef.current) URL.revokeObjectURL(imageUrlRef.current);
      Object.values(outputsRef.current).forEach((output) => {
        if (output?.url) URL.revokeObjectURL(output.url);
      });
    };
  }, []);

  useEffect(() => {
    if (!image) {
      setTransparency("");
      return;
    }

    if (image.type === "image/jpeg") {
      setTransparency("JPEG does not support transparency.");
      return;
    }

    try {
      const scale = Math.min(1, 160 / Math.max(image.width, image.height));
      const width = Math.max(1, Math.round(image.width * scale));
      const height = Math.max(1, Math.round(image.height * scale));
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      context.drawImage(image.el, 0, 0, width, height);
      const data = context.getImageData(0, 0, width, height).data;
      let found = false;

      for (let index = 3; index < data.length; index += 4) {
        if (data[index] < 255) {
          found = true;
          break;
        }
      }

      setTransparency(
        found
          ? "Transparency detected in a sample of the image."
          : "No transparent pixels were found in a small sample."
      );
    } catch {
      setTransparency("Transparency could not be sampled in this browser.");
    }
  }, [image]);

  const resetSettingsFor = (loaded) => {
    setResizeWidth(String(loaded.width));
    setResizeHeight(String(loaded.height));
    setCropX("0");
    setCropY("0");
    setCropWidth(String(loaded.width));
    setCropHeight(String(loaded.height));
    setOptimizeScale(100);
  };

  const loadImageFile = async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    setImageError("");
    setLoading(true);

    if (!isSupportedImage(file)) {
      setImageError("Choose a PNG, JPEG, or WebP image.");
      setLoading(false);
      event.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_BYTES) {
      setImageError("That image is larger than 30 MB. Choose a smaller file.");
      setLoading(false);
      event.target.value = "";
      return;
    }

    const url = URL.createObjectURL(file);

    try {
      const element = await new Promise((resolve, reject) => {
        const candidate = new Image();
        candidate.onload = () => resolve(candidate);
        candidate.onerror = () =>
          reject(new Error("The browser could not decode this image."));
        candidate.src = url;
      });

      if (!element.naturalWidth || !element.naturalHeight) {
        throw new Error("The image has no readable dimensions.");
      }

      if (element.naturalWidth * element.naturalHeight > MAX_SOURCE_PIXELS) {
        throw new Error(
          "That image is larger than 60 megapixels. Resize it in a desktop editor first."
        );
      }

      if (imageUrlRef.current) URL.revokeObjectURL(imageUrlRef.current);
      imageUrlRef.current = url;
      revokeOutputs();

      const loaded = {
        file,
        el: element,
        url,
        width: element.naturalWidth,
        height: element.naturalHeight,
        type: ["image/png", "image/jpeg", "image/webp"].includes(file.type)
          ? file.type
          : /\.png$/i.test(file.name)
            ? "image/png"
            : /\.webp$/i.test(file.name)
              ? "image/webp"
              : "image/jpeg",
        size: file.size,
        lastModified: file.lastModified,
      };

      setImage(loaded);
      resetSettingsFor(loaded);
      showStatus(
        "success",
        `Loaded ${file.name}: ${loaded.width.toLocaleString()} × ${loaded.height.toLocaleString()} px.`
      );
    } catch (error) {
      URL.revokeObjectURL(url);
      setImageError(
        error instanceof Error ? error.message : "The image could not be loaded."
      );
    } finally {
      setLoading(false);
      event.target.value = "";
    }
  };

  const resetImage = () => {
    if (imageUrlRef.current) URL.revokeObjectURL(imageUrlRef.current);
    imageUrlRef.current = null;
    revokeOutputs();
    setImage(null);
    setImageError("");
    setTransparency("");
    showStatus("", "");
  };

  const ratio = image ? image.width / image.height : 1;
  const prefixName = image ? baseFilename(image.file.name, "image") : "image";

  const changeResizeWidth = (value) => {
    setResizeWidth(value);
    if (keepAspect && Number(value) > 0) {
      setResizeHeight(String(Math.max(1, Math.round(Number(value) / ratio))));
    }
  };

  const changeResizeHeight = (value) => {
    setResizeHeight(value);
    if (keepAspect && Number(value) > 0) {
      setResizeWidth(String(Math.max(1, Math.round(Number(value) * ratio))));
    }
  };

  const runResize = async () => {
    if (!image) return;

    const width = Math.round(Number(resizeWidth));
    const height = Math.round(Number(resizeHeight));
    const dimensionError = validateDimensions(width, height);

    if (dimensionError) {
      showStatus("error", dimensionError);
      return;
    }

    setBusy(true);
    showStatus("", "");

    try {
      const { blob, type } = await encodeImage({
        width,
        height,
        format: resizeFormat,
        quality: resizeQuality,
        background: resizeBackground,
        draw: (context) => {
          context.drawImage(image.el, 0, 0, width, height);
        },
      });

      const actualType = type || resizeFormat;
      const extension = EXTENSIONS[actualType] || "png";
      const url = URL.createObjectURL(blob);

      setOutput("resize", {
        blob,
        url,
        width,
        height,
        size: blob.size,
        type: actualType,
        name: `${prefixName}-resized.${extension}`,
        detail: actualType !== resizeFormat
          ? `${typeLabel(actualType)} fallback`
          : typeLabel(actualType),
      });

      if (actualType !== resizeFormat) {
        showStatus(
          "warning",
          `This browser could not encode ${typeLabel(resizeFormat)}. The image was saved as ${typeLabel(actualType)} instead.`
        );
      } else {
        showStatus("success", "Resized image ready. Check the preview before downloading.");
      }
    } catch (error) {
      showStatus(
        "error",
        error instanceof Error ? error.message : "The image could not be resized."
      );
    } finally {
      setBusy(false);
    }
  };

  const runCrop = async () => {
    if (!image) return;

    const x = Math.round(Number(cropX));
    const y = Math.round(Number(cropY));
    const width = Math.round(Number(cropWidth));
    const height = Math.round(Number(cropHeight));

    if (![x, y, width, height].every(Number.isFinite)) {
      showStatus("error", "Enter whole numbers for the crop position and size.");
      return;
    }

    if (x < 0 || y < 0 || width < 1 || height < 1) {
      showStatus("error", "The crop position must be zero or greater, and the size must be at least 1 pixel.");
      return;
    }

    if (x + width > image.width || y + height > image.height) {
      showStatus(
        "error",
        `The crop extends past the image. Keep x + width within ${image.width} and y + height within ${image.height}.`
      );
      return;
    }

    const dimensionError = validateDimensions(width, height);
    if (dimensionError) {
      showStatus("error", dimensionError);
      return;
    }

    setBusy(true);
    showStatus("", "");

    try {
      const { blob, type } = await encodeImage({
        width,
        height,
        format: cropFormat,
        quality: cropQuality,
        background: cropBackground,
        draw: (context) => {
          context.drawImage(image.el, x, y, width, height, 0, 0, width, height);
        },
      });

      const actualType = type || cropFormat;
      const extension = EXTENSIONS[actualType] || "png";
      const url = URL.createObjectURL(blob);

      setOutput("crop", {
        blob,
        url,
        width,
        height,
        size: blob.size,
        type: actualType,
        name: `${prefixName}-cropped.${extension}`,
        detail: `Crop at ${x}, ${y}`,
      });
      showStatus("success", "Cropped image ready. Check the preview before downloading.");
    } catch (error) {
      showStatus(
        "error",
        error instanceof Error ? error.message : "The image could not be cropped."
      );
    } finally {
      setBusy(false);
    }
  };

  const centerSquare = () => {
    if (!image) return;
    const side = Math.min(image.width, image.height);
    setCropX(String(Math.round((image.width - side) / 2)));
    setCropY(String(Math.round((image.height - side) / 2)));
    setCropWidth(String(side));
    setCropHeight(String(side));
  };

  const runOptimize = async () => {
    if (!image) return;

    const scale = Math.min(100, Math.max(10, Number(optimizeScale) || 100));
    const width = Math.max(1, Math.round((image.width * scale) / 100));
    const height = Math.max(1, Math.round((image.height * scale) / 100));
    const dimensionError = validateDimensions(width, height);

    if (dimensionError) {
      showStatus("error", dimensionError);
      return;
    }

    setBusy(true);
    showStatus("", "");

    try {
      const { blob, type } = await encodeImage({
        width,
        height,
        format: optimizeFormat,
        quality: optimizeQuality,
        background: optimizeBackground,
        draw: (context) => {
          context.drawImage(image.el, 0, 0, width, height);
        },
      });

      const actualType = type || optimizeFormat;
      const extension = EXTENSIONS[actualType] || "png";
      const change = Math.round((1 - blob.size / image.size) * 100);
      const url = URL.createObjectURL(blob);

      setOutput("optimize", {
        blob,
        url,
        width,
        height,
        size: blob.size,
        type: actualType,
        name: `${prefixName}-optimized.${extension}`,
        detail:
          change >= 0
            ? `${change}% smaller than the original`
            : `${Math.abs(change)}% larger than the original`,
      });

      if (actualType !== optimizeFormat) {
        showStatus(
          "warning",
          `This browser could not encode ${typeLabel(optimizeFormat)}. The image was saved as ${typeLabel(actualType)} instead.`
        );
      } else {
        showStatus("success", "Optimized copy ready. Compare the size and preview.");
      }
    } catch (error) {
      showStatus(
        "error",
        error instanceof Error ? error.message : "The image could not be optimized."
      );
    } finally {
      setBusy(false);
    }
  };

  const createPdf = async () => {
    if (!image) return;

    const margin = Number(pdfMargin);
    if (!Number.isFinite(margin) || margin < 0 || margin > 72) {
      showStatus("error", "Use a margin between 0 and 72 points.");
      return;
    }

    setBusy(true);
    showStatus("", "");

    try {
      let pageWidth;
      let pageHeight;

      if (pageSize === "fit") {
        const maxSide = 842;
        const scale = maxSide / Math.max(image.width, image.height);
        pageWidth = image.width * scale + margin * 2;
        pageHeight = image.height * scale + margin * 2;
      } else {
        const [baseWidth, baseHeight] =
          pageSize === "letter" ? [612, 792] : [595.28, 841.89];
        const landscape =
          orientation === "auto"
            ? image.width > image.height
            : orientation === "landscape";
        pageWidth = landscape ? baseHeight : baseWidth;
        pageHeight = landscape ? baseWidth : baseHeight;
      }

      const availableWidth = pageWidth - margin * 2;
      const availableHeight = pageHeight - margin * 2;

      if (availableWidth <= 20 || availableHeight <= 20) {
        throw new Error("The margin leaves no room for the image on that page size.");
      }

      const drawScale = Math.min(
        availableWidth / image.width,
        availableHeight / image.height
      );
      const drawWidth = image.width * drawScale;
      const drawHeight = image.height * drawScale;

      const { blob } = await encodeImage({
        width: image.width,
        height: image.height,
        format:
          image.type === "image/jpeg" ? "image/jpeg" : "image/png",
        quality: 0.92,
        background: "#ffffff",
        draw: (context) => {
          context.drawImage(image.el, 0, 0, image.width, image.height);
        },
      });

      const bytes = new Uint8Array(await blob.arrayBuffer());
      const { PDFDocument } = await import("pdf-lib");
      const pdf = await PDFDocument.create();
      const embedded =
        image.type === "image/jpeg"
          ? await pdf.embedJpg(bytes)
          : await pdf.embedPng(bytes);
      const page = pdf.addPage([pageWidth, pageHeight]);

      page.drawImage(embedded, {
        x: (pageWidth - drawWidth) / 2,
        y: (pageHeight - drawHeight) / 2,
        width: drawWidth,
        height: drawHeight,
      });

      const pdfBytes = await pdf.save();
      const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });

      setOutput("pdf", {
        blob: pdfBlob,
        size: pdfBlob.size,
        name: `${prefixName}.pdf`,
        detail: `${Math.round(pageWidth)} × ${Math.round(pageHeight)} pt page`,
      });
      showStatus("success", "PDF created. Download it and check the page before sharing.");
    } catch (error) {
      showStatus(
        "error",
        error instanceof Error ? error.message : "The PDF could not be created."
      );
    } finally {
      setBusy(false);
    }
  };

  const gcd = image
    ? greatestCommonDivisor(image.width, image.height)
    : 1;

  const statusClass = `calvoro-tool-status${status.kind ? ` is-${status.kind}` : ""}`;

  return (
    <ToolPage
      title="Image Studio"
      kicker="Image tool"
      description="Resize, crop, re-encode, inspect, or turn one PNG, JPEG, or WebP image into a PDF. The image is processed on a canvas in this tab."
      seoTitle="Image Studio - Resize, Crop, Optimize, and Convert to PDF | CALVORO"
      seoDescription="Edit images in your browser: resize with aspect-ratio locking, crop by pixels, compress to JPEG or WebP, inspect details, or create a PDF."
      steps={[
        "Load a PNG, JPEG, or WebP image up to 30 MB.",
        "Choose a tab and set the dimensions or format you need.",
        "Preview the result, then download the new copy.",
      ]}
      notes={[
        "The image never leaves this browser tab. Output is produced by an HTML canvas, so very large images can be limited by the tab's available memory.",
        "JPEG cannot store transparency. Transparent areas are filled with the background color you choose. PNG and WebP keep the alpha channel where the browser supports it.",
        "Resizing does not add detail. Enlarging a small image produces a softer result, and repeated JPEG saves lose quality.",
        "The image-to-PDF tab creates a single-page PDF. PNG and WebP sources are embedded as PNG to preserve transparency, which can make photo-heavy PDFs larger than expected.",
      ]}
      related={[
        { name: "PDF Studio", path: "/pdf-studio" },
        { name: "Color Palette Generator", path: "/color-palette-generator" },
        { name: "QR Code Generator", path: "/qr-code-generator" },
      ]}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
        onChange={loadImageFile}
        style={{ display: "none" }}
      />

      <button
        type="button"
        className="calvoro-file-drop"
        onClick={() => inputRef.current?.click()}
        style={{ width: "100%", font: "inherit" }}
        disabled={loading || busy}
      >
        <strong>
          {loading
            ? "Loading the image..."
            : image
              ? "Replace the loaded image"
              : "Choose an image"}
        </strong>
        <small>PNG, JPEG, or WebP up to 30 MB. Nothing is uploaded.</small>
      </button>

      {image && (
        <div className="calvoro-image-grid" style={{ marginTop: 16 }}>
          <div>
            <h3>Source preview</h3>
            <div className="calvoro-tool-preview is-flat">
              <img src={image.url} alt="Original image preview" />
            </div>
          </div>
          <div>
            <h3>Source details</h3>
            <ul className="calvoro-file-list">
              <li>
                <span>{image.file.name}</span>
                <button type="button" onClick={resetImage} disabled={busy}>
                  Remove
                </button>
              </li>
              <li>
                <span>Dimensions</span>
                <span>
                  {image.width.toLocaleString()} × {image.height.toLocaleString()} px
                </span>
              </li>
              <li>
                <span>Format</span>
                <span>{typeLabel(image.type)}</span>
              </li>
              <li>
                <span>Size</span>
                <span>{formatBytes(image.size)}</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {imageError && (
        <p className="calvoro-tool-status is-error" role="alert">
          {imageError}
        </p>
      )}

      <div
        className="calvoro-tool-tabs"
        role="tablist"
        aria-label="Image actions"
        style={{ marginTop: 20 }}
      >
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

      {tab === "resize" && (
        <div role="tabpanel" aria-label="Resize image">
          <div className="calvoro-tool-grid">
            <div className="calvoro-field">
              <label htmlFor="resize-width">Width (px)</label>
              <input
                id="resize-width"
                type="number"
                min="1"
                max={MAX_OUTPUT_DIMENSION}
                value={resizeWidth}
                onChange={(event) => changeResizeWidth(event.target.value)}
                disabled={!image || busy}
              />
            </div>
            <div className="calvoro-field">
              <label htmlFor="resize-height">Height (px)</label>
              <input
                id="resize-height"
                type="number"
                min="1"
                max={MAX_OUTPUT_DIMENSION}
                value={resizeHeight}
                onChange={(event) => changeResizeHeight(event.target.value)}
                disabled={!image || busy}
              />
            </div>

            <FormatFields
              prefix="resize"
              format={resizeFormat}
              setFormat={setResizeFormat}
              quality={resizeQuality}
              setQuality={setResizeQuality}
              background={resizeBackground}
              setBackground={setResizeBackground}
              disabled={!image || busy}
            />
          </div>

          <label className="calvoro-checkbox" style={{ marginTop: 12 }}>
            <input
              type="checkbox"
              checked={keepAspect}
              onChange={(event) => setKeepAspect(event.target.checked)}
              disabled={!image || busy}
            />
            Keep the original aspect ratio
          </label>

          <div className="calvoro-tool-actions">
            <button
              type="button"
              className="calvoro-tool-button"
              onClick={runResize}
              disabled={!image || busy}
            >
              {busy ? "Working..." : "Resize image"}
            </button>
            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={() => {
                if (!image) return;
                setResizeWidth(String(image.width));
                setResizeHeight(String(image.height));
              }}
              disabled={!image || busy}
            >
              Use original size
            </button>
          </div>

          <ImageResult output={outputs.resize} downloadLabel="Download resized image" />
        </div>
      )}

      {tab === "crop" && (
        <div role="tabpanel" aria-label="Crop image">
          <p style={{ marginTop: 0 }}>
            Coordinates start at the top-left corner. The crop must stay inside
            the {image ? `${image.width} × ${image.height}` : "source"} image.
          </p>

          <div className="calvoro-tool-grid">
            <div className="calvoro-field">
              <label htmlFor="crop-x">Left offset (px)</label>
              <input
                id="crop-x"
                type="number"
                min="0"
                value={cropX}
                onChange={(event) => setCropX(event.target.value)}
                disabled={!image || busy}
              />
            </div>
            <div className="calvoro-field">
              <label htmlFor="crop-y">Top offset (px)</label>
              <input
                id="crop-y"
                type="number"
                min="0"
                value={cropY}
                onChange={(event) => setCropY(event.target.value)}
                disabled={!image || busy}
              />
            </div>
            <div className="calvoro-field">
              <label htmlFor="crop-width">Width (px)</label>
              <input
                id="crop-width"
                type="number"
                min="1"
                value={cropWidth}
                onChange={(event) => setCropWidth(event.target.value)}
                disabled={!image || busy}
              />
            </div>
            <div className="calvoro-field">
              <label htmlFor="crop-height">Height (px)</label>
              <input
                id="crop-height"
                type="number"
                min="1"
                value={cropHeight}
                onChange={(event) => setCropHeight(event.target.value)}
                disabled={!image || busy}
              />
            </div>

            <FormatFields
              prefix="crop"
              format={cropFormat}
              setFormat={setCropFormat}
              quality={cropQuality}
              setQuality={setCropQuality}
              background={cropBackground}
              setBackground={setCropBackground}
              disabled={!image || busy}
            />
          </div>

          <div className="calvoro-tool-actions">
            <button
              type="button"
              className="calvoro-tool-button"
              onClick={runCrop}
              disabled={!image || busy}
            >
              {busy ? "Cropping..." : "Crop image"}
            </button>
            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={centerSquare}
              disabled={!image || busy}
            >
              Center square
            </button>
            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={() => {
                if (!image) return;
                setCropX("0");
                setCropY("0");
                setCropWidth(String(image.width));
                setCropHeight(String(image.height));
              }}
              disabled={!image || busy}
            >
              Reset crop
            </button>
          </div>

          <ImageResult output={outputs.crop} downloadLabel="Download cropped image" />
        </div>
      )}

      {tab === "optimize" && (
        <div role="tabpanel" aria-label="Optimize image">
          <div className="calvoro-tool-grid">
            <div className="calvoro-field">
              <label htmlFor="optimize-format">Output format</label>
              <select
                id="optimize-format"
                value={optimizeFormat}
                onChange={(event) => setOptimizeFormat(event.target.value)}
                disabled={!image || busy}
              >
                {FORMAT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {(optimizeFormat === "image/jpeg" ||
              optimizeFormat === "image/webp") && (
              <div className="calvoro-field">
                <label htmlFor="optimize-quality">
                  Quality: {Math.round(optimizeQuality * 100)}%
                </label>
                <input
                  id="optimize-quality"
                  type="range"
                  min="30"
                  max="100"
                  step="1"
                  value={Math.round(optimizeQuality * 100)}
                  onChange={(event) =>
                    setOptimizeQuality(Number(event.target.value) / 100)
                  }
                  disabled={!image || busy}
                />
              </div>
            )}

            <div className="calvoro-field">
              <label htmlFor="optimize-scale">
                Scale: {optimizeScale}% of the original
              </label>
              <input
                id="optimize-scale"
                type="range"
                min="10"
                max="100"
                step="5"
                value={optimizeScale}
                onChange={(event) => setOptimizeScale(Number(event.target.value))}
                disabled={!image || busy}
              />
            </div>

            {optimizeFormat === "image/jpeg" && (
              <div className="calvoro-field">
                <label htmlFor="optimize-background">
                  Background for transparent areas
                </label>
                <input
                  id="optimize-background"
                  type="color"
                  value={optimizeBackground}
                  onChange={(event) => setOptimizeBackground(event.target.value)}
                  disabled={!image || busy}
                />
              </div>
            )}
          </div>

          <div className="calvoro-tool-actions">
            <button
              type="button"
              className="calvoro-tool-button"
              onClick={runOptimize}
              disabled={!image || busy}
            >
              {busy ? "Optimizing..." : "Create optimized copy"}
            </button>
            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={() => {
                setOptimizeScale(100);
                setOptimizeQuality(0.8);
                setOptimizeFormat("image/webp");
              }}
              disabled={!image || busy}
            >
              Reset settings
            </button>
          </div>

          <ImageResult output={outputs.optimize} downloadLabel="Download optimized image" />

          <p className="calvoro-inline-note">
            Re-encoding an already compressed JPEG can reduce quality again.
            Compare the preview before replacing a photo you care about.
          </p>
        </div>
      )}

      {tab === "info" && (
        <div role="tabpanel" aria-label="Image information">
          {image ? (
            <>
              <div className="calvoro-stat-grid">
                <div className="calvoro-stat-card">
                  <span>Width</span>
                  <strong>{image.width.toLocaleString()}</strong>
                  <small>Pixels</small>
                </div>
                <div className="calvoro-stat-card">
                  <span>Height</span>
                  <strong>{image.height.toLocaleString()}</strong>
                  <small>Pixels</small>
                </div>
                <div className="calvoro-stat-card">
                  <span>Megapixels</span>
                  <strong>
                    {(image.width * image.height / 1_000_000).toFixed(1)}
                  </strong>
                  <small>Millions of pixels</small>
                </div>
                <div className="calvoro-stat-card">
                  <span>File size</span>
                  <strong>{formatBytes(image.size)}</strong>
                  <small>{typeLabel(image.type)}</small>
                </div>
              </div>

              <div className="calvoro-tool-table-wrap" style={{ marginTop: 16 }}>
                <table className="calvoro-tool-table">
                  <tbody>
                    <tr>
                      <th scope="row">File name</th>
                      <td>{image.file.name}</td>
                    </tr>
                    <tr>
                      <th scope="row">Dimensions</th>
                      <td>
                        {image.width.toLocaleString()} × {image.height.toLocaleString()} px
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Aspect ratio</th>
                      <td>
                        {image.width / gcd}:{image.height / gcd} ({ratio.toFixed(3)}:1)
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">Transparency</th>
                      <td>{transparency || "Checking..."}</td>
                    </tr>
                    <tr>
                      <th scope="row">Last modified</th>
                      <td>
                        {image.lastModified
                          ? new Date(image.lastModified).toLocaleString()
                          : "Not provided by the browser"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="calvoro-inline-note">
                Transparency is sampled at a reduced size to keep this quick. A
                fully opaque sample can miss a transparent pixel in a very small area.
              </p>
            </>
          ) : (
            <div className="calvoro-tool-empty">
              Load an image to see its dimensions, type, size, and aspect ratio.
            </div>
          )}
        </div>
      )}

      {tab === "pdf" && (
        <div role="tabpanel" aria-label="Image to PDF">
          <div className="calvoro-tool-grid">
            <div className="calvoro-field">
              <label htmlFor="pdf-page-size">Page size</label>
              <select
                id="pdf-page-size"
                value={pageSize}
                onChange={(event) => setPageSize(event.target.value)}
                disabled={!image || busy}
              >
                <option value="a4">A4 (210 × 297 mm)</option>
                <option value="letter">US Letter (8.5 × 11 in)</option>
                <option value="fit">Fit the image proportions</option>
              </select>
            </div>

            <div className="calvoro-field">
              <label htmlFor="pdf-orientation">Orientation</label>
              <select
                id="pdf-orientation"
                value={orientation}
                onChange={(event) => setOrientation(event.target.value)}
                disabled={!image || busy || pageSize === "fit"}
              >
                <option value="auto">Automatic from the image</option>
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>

            <div className="calvoro-field">
              <label htmlFor="pdf-margin">Margin (points)</label>
              <input
                id="pdf-margin"
                type="number"
                min="0"
                max="72"
                value={pdfMargin}
                onChange={(event) => setPdfMargin(event.target.value)}
                disabled={!image || busy}
              />
              <span className="calvoro-field-hint">
                72 points equal one inch. Zero puts the image against the edge.
              </span>
            </div>
          </div>

          <div className="calvoro-tool-actions">
            <button
              type="button"
              className="calvoro-tool-button"
              onClick={createPdf}
              disabled={!image || busy}
            >
              {busy ? "Creating PDF..." : "Create PDF"}
            </button>
          </div>

          <ImageResult output={outputs.pdf} downloadLabel="Download PDF" />
        </div>
      )}

      <p className={statusClass} role="status" aria-live="polite">
        {status.message ||
          (image
            ? "Choose a tab and an action. The source image stays unchanged."
            : "Load an image to begin. Files stay on this device.")}
      </p>
    </ToolPage>
  );
}
