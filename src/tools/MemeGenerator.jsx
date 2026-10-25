import { useEffect, useRef, useState } from "react";
import ToolPage from "./ToolPage.jsx";
import { downloadBlob, formatBytes } from "./utils.js";
import {
  MEME_IMAGE_LIMITS,
  canvasToBlob,
  getScaledPreviewSize,
  imageTypeLabel,
  readImageSignature,
  validateImageDimensions,
  validateImageMetadata,
} from "./creativeUtils.js";
import {
  DEFAULT_MEME_SETTINGS,
  MEME_FONT_OPTIONS,
  getMemeExportName,
  getMemeFontFamily,
  getMemeFontSize,
  getMemeLines,
} from "./memeUtils.js";
import "./creativeTools.css";

function loadImageElement(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () =>
      reject(new Error("The browser could not decode this image."));
    image.src = url;
  });
}

function paintMemeText(context, width, height, settings) {
  const fontPx = getMemeFontSize(height, settings.sizePercent);
  const family = getMemeFontFamily(settings.fontId);
  const padding = Math.max(8, Math.round(height * 0.035));
  const lineHeight = Math.max(fontPx, Math.round(fontPx * 1.08));
  const maxWidth = width * 0.9;
  const outlineWidth = Math.max(
    0,
    Math.round(fontPx * (Number(settings.outlinePercent) / 100))
  );

  context.font = `900 ${fontPx}px ${family}`;
  context.textAlign = "center";
  context.textBaseline = "top";
  context.lineJoin = "round";

  const drawBlock = (text, position) => {
    const content = settings.uppercase ? String(text).toUpperCase() : text;
    const lines = getMemeLines(context, content, maxWidth, 6);

    if (!lines.length) return;

    const blockHeight = lines.length * lineHeight;
    const startY =
      position === "top"
        ? padding
        : height - padding - blockHeight;

    lines.forEach((line, index) => {
      const x = width / 2;
      const y = startY + index * lineHeight;

      if (outlineWidth > 0) {
        context.strokeStyle = settings.outlineColor;
        context.lineWidth = outlineWidth;
        context.strokeText(line, x, y);
      }

      context.fillStyle = settings.fillColor;
      context.fillText(line, x, y);
    });
  };

  drawBlock(settings.topText, "top");
  drawBlock(settings.bottomText, "bottom");
}

export default function MemeGenerator() {
  const [image, setImage] = useState(null);
  const [settings, setSettings] = useState(DEFAULT_MEME_SETTINGS);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [imageError, setImageError] = useState("");
  const [status, setStatus] = useState({ kind: "", message: "" });

  const inputRef = useRef(null);
  const imageUrlRef = useRef("");
  const canvasRef = useRef(null);

  useEffect(() => {
    return () => {
      if (imageUrlRef.current) URL.revokeObjectURL(imageUrlRef.current);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!image || !canvas) return;

    const preview = getScaledPreviewSize(image.width, image.height);
    canvas.width = preview.width;
    canvas.height = preview.height;

    const context = canvas.getContext("2d");
    if (!context) return;

    context.clearRect(0, 0, preview.width, preview.height);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(image.el, 0, 0, preview.width, preview.height);
    paintMemeText(context, preview.width, preview.height, settings);
  }, [image, settings]);

  const updateSetting = (key, value) => {
    setSettings((current) => ({ ...current, [key]: value }));
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
        limits: MEME_IMAGE_LIMITS,
      });

      if (!validation.ok) throw new Error(validation.error);

      const url = URL.createObjectURL(file);

      try {
        const element = await loadImageElement(url);
        const dimensionError = validateImageDimensions(
          element.naturalWidth,
          element.naturalHeight,
          MEME_IMAGE_LIMITS
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
        setSettings(DEFAULT_MEME_SETTINGS);
        setStatus({
          kind: "success",
          message: "Image loaded. Add a caption and choose an export format.",
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
    setSettings(DEFAULT_MEME_SETTINGS);
    setImageError("");
    setStatus({ kind: "", message: "" });
  };

  const resetCaptions = () => {
    setSettings(DEFAULT_MEME_SETTINGS);
    setStatus({
      kind: "success",
      message: "Caption settings reset to the defaults.",
    });
  };

  const exportMeme = async (format) => {
    if (!image) return;

    setBusy(true);
    setStatus({ kind: "", message: "" });

    try {
      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const context = canvas.getContext("2d");

      if (!context) {
        throw new Error("Canvas drawing is not available in this browser.");
      }

      if (format === "image/jpeg") {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }

      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      context.drawImage(image.el, 0, 0, canvas.width, canvas.height);
      paintMemeText(context, canvas.width, canvas.height, settings);

      const blob = await canvasToBlob(canvas, format, 0.93);
      downloadBlob(blob, getMemeExportName(image.file.name, format));
      setStatus({
        kind: "success",
        message: `Downloaded the ${format === "image/jpeg" ? "JPEG" : "PNG"} meme.`,
      });
    } catch (error) {
      setStatus({
        kind: "error",
        message:
          error instanceof Error
            ? error.message
            : "The meme could not be exported.",
      });
    } finally {
      setBusy(false);
    }
  };

  return (
    <ToolPage
      title="Meme Generator"
      kicker="Image tool"
      description="Add top and bottom captions to a PNG, JPEG, or WebP image, adjust the text styling, and export a PNG or JPEG. The image is processed on a canvas in this tab."
      seoTitle="Meme Generator - Add Captions and Download an Image | CALVORO"
      seoDescription="Create a meme in your browser: upload a PNG, JPEG, or WebP image, add wrapped top and bottom text, adjust the font and outline, then download a PNG or JPEG."
      privacyBadge="Runs in your browser. Your image never leaves this tab."
      steps={[
        "Choose a PNG, JPEG, or WebP image up to 20 MB.",
        "Add top and bottom text, then adjust the font, size, colors, and outline.",
        "Preview the result and download it as a PNG or JPEG.",
      ]}
      notes={[
        "The image is decoded and drawn locally with the Canvas API. It is not uploaded, and no server or third-party conversion service is involved.",
        "Captions wrap to 90% of the image width and are capped at six lines. JPEG cannot store transparency, so transparent areas become white in a JPEG export.",
        "Canvas output depends on the fonts installed on your device. The preview and export use the same browser rendering, but another device may substitute a different font.",
        "Very large images can hit the browser tab's memory or canvas limits. The tool rejects images above 40 megapixels or 8,000 pixels on a side.",
        "Read [how to make a meme without uploading photos](/blog/how-to-make-a-meme-without-uploading-photos) for caption and sharing guidance.",
      ]}
      related={[
        { name: "Passport Photo Maker", path: "/passport-photo-maker" },
        { name: "Image Studio", path: "/image-studio" },
        { name: "Color Palette Generator", path: "/color-palette-generator" },
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
            ? "Checking the image..."
            : image
              ? "Replace the loaded image"
              : "Choose an image"}
        </strong>
        <small>
          PNG, JPEG, or WebP up to 20 MB. The file is checked locally and is
          never uploaded.
        </small>
      </button>

      {imageError && (
        <p className="calvoro-tool-status is-error" role="alert">
          {imageError}
        </p>
      )}

      {!image && !loading && (
        <p className="calvoro-creative-empty">
          Load an image to open the caption editor and preview.
        </p>
      )}

      {image && (
        <div className="calvoro-meme-layout">
          <div className="calvoro-meme-preview-column">
            <div className="calvoro-creative-preview">
              <canvas
                ref={canvasRef}
                className="calvoro-meme-canvas"
                role="img"
                aria-label="Meme preview with the current captions and styling"
              />
            </div>

            <ul className="calvoro-file-list">
              <li>
                <span>{image.file.name}</span>
                <button type="button" onClick={removeImage} disabled={busy}>
                  Remove
                </button>
              </li>
              <li>
                <span>Dimensions</span>
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

          <div className="calvoro-meme-controls">
            <div className="calvoro-field">
              <label htmlFor="meme-top-text">Top caption</label>
              <textarea
                id="meme-top-text"
                className="calvoro-meme-caption-input"
                value={settings.topText}
                maxLength={240}
                placeholder="One does not simply..."
                onChange={(event) =>
                  updateSetting("topText", event.target.value)
                }
              />
            </div>

            <div className="calvoro-field">
              <label htmlFor="meme-bottom-text">Bottom caption</label>
              <textarea
                id="meme-bottom-text"
                className="calvoro-meme-caption-input"
                value={settings.bottomText}
                maxLength={240}
                placeholder="...forget the bottom caption"
                onChange={(event) =>
                  updateSetting("bottomText", event.target.value)
                }
              />
            </div>

            <div className="calvoro-tool-grid">
              <div className="calvoro-field">
                <label htmlFor="meme-font">Font</label>
                <select
                  id="meme-font"
                  value={settings.fontId}
                  onChange={(event) =>
                    updateSetting("fontId", event.target.value)
                  }
                >
                  {MEME_FONT_OPTIONS.map((font) => (
                    <option key={font.value} value={font.value}>
                      {font.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="calvoro-field">
                <label htmlFor="meme-size">
                  Text size: {settings.sizePercent}% of image height
                </label>
                <input
                  id="meme-size"
                  type="range"
                  min="3"
                  max="18"
                  step="1"
                  value={settings.sizePercent}
                  onChange={(event) =>
                    updateSetting("sizePercent", Number(event.target.value))
                  }
                />
              </div>

              <div className="calvoro-field">
                <label htmlFor="meme-fill">Text color</label>
                <input
                  id="meme-fill"
                  type="color"
                  value={settings.fillColor}
                  onChange={(event) =>
                    updateSetting("fillColor", event.target.value)
                  }
                />
              </div>

              <div className="calvoro-field">
                <label htmlFor="meme-outline-color">Outline color</label>
                <input
                  id="meme-outline-color"
                  type="color"
                  value={settings.outlineColor}
                  onChange={(event) =>
                    updateSetting("outlineColor", event.target.value)
                  }
                />
              </div>
            </div>

            <div className="calvoro-field">
              <label htmlFor="meme-outline-width">
                Outline width: {settings.outlinePercent}% of text size
              </label>
              <input
                id="meme-outline-width"
                type="range"
                min="0"
                max="10"
                step="1"
                value={settings.outlinePercent}
                onChange={(event) =>
                  updateSetting("outlinePercent", Number(event.target.value))
                }
              />
            </div>

            <label className="calvoro-checkbox">
              <input
                type="checkbox"
                checked={settings.uppercase}
                onChange={(event) =>
                  updateSetting("uppercase", event.target.checked)
                }
              />
              Use uppercase lettering
            </label>

            <div className="calvoro-tool-actions">
              <button
                type="button"
                className="calvoro-tool-button"
                onClick={() => exportMeme("image/png")}
                disabled={busy}
              >
                Download PNG
              </button>
              <button
                type="button"
                className="calvoro-tool-button is-secondary"
                onClick={() => exportMeme("image/jpeg")}
                disabled={busy}
              >
                Download JPEG
              </button>
              <button
                type="button"
                className="calvoro-tool-button is-ghost"
                onClick={resetCaptions}
                disabled={busy}
              >
                Reset captions
              </button>
            </div>

            <p
              className={`calvoro-tool-status${
                status.kind ? ` is-${status.kind}` : ""
              }`}
              aria-live="polite"
            >
              {status.message ||
                "The preview updates as you type. Text is capped at six lines."}
            </p>
          </div>
        </div>
      )}
    </ToolPage>
  );
}
