import { useEffect, useRef, useState } from "react";
import ToolPage from "./ToolPage.jsx";
import { downloadBlob } from "./utils.js";

const ERROR_LEVELS = [
  { value: "L", label: "Low (7% recovery)" },
  { value: "M", label: "Medium (15% recovery)" },
  { value: "Q", label: "Quartile (25% recovery)" },
  { value: "H", label: "High (30% recovery)" },
];

const SIZES = [256, 512, 1024];

function safeColor(value, fallback) {
  return /^#[0-9a-f]{6}$/i.test(value) ? value : fallback;
}

export default function QrCodeGenerator() {
  const canvasRef = useRef(null);
  const [text, setText] = useState("https://calvorotool.com");
  const [size, setSize] = useState(512);
  const [margin, setMargin] = useState(3);
  const [errorCorrection, setErrorCorrection] = useState("M");
  const [dark, setDark] = useState("#0f172a");
  const [light, setLight] = useState("#ffffff");
  const [status, setStatus] = useState("Generating preview...");
  const [isReady, setIsReady] = useState(false);
  const [downloadStatus, setDownloadStatus] = useState("");

  const options = useRef({ errorCorrection: "M", dark: "#0f172a", light: "#ffffff", margin: 3 });
  options.current = {
    errorCorrection,
    dark: safeColor(dark, "#0f172a"),
    light: safeColor(light, "#ffffff"),
    margin,
  };

  useEffect(() => {
    let active = true;
    const timer = window.setTimeout(async () => {
      if (!text.trim()) {
        setIsReady(false);
        setStatus("Enter a link or some text to create a QR code.");
        const canvas = canvasRef.current;
        if (canvas) {
          const context = canvas.getContext("2d");
          context.clearRect(0, 0, canvas.width, canvas.height);
        }
        return;
      }

      try {
        const QRCode = (await import("qrcode")).default;
        if (!active || !canvasRef.current) return;

        await QRCode.toCanvas(canvasRef.current, text, {
          width: size,
          margin: options.current.margin,
          errorCorrectionLevel: options.current.errorCorrection,
          color: {
            dark: options.current.dark,
            light: options.current.light,
          },
        });

        if (active) {
          setIsReady(true);
          setStatus("Preview updated. The QR code contains exactly the text you entered.");
        }
      } catch (error) {
        if (!active) return;
        setIsReady(false);
        setStatus(
          error instanceof Error
            ? `Could not create the QR code: ${error.message}`
            : "Could not create the QR code from that text."
        );
      }
    }, 250);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [text, size, margin, errorCorrection, dark, light]);

  const downloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas || !isReady) return;

    canvas.toBlob((blob) => {
      if (blob) {
        downloadBlob(blob, "calvoro-qr-code.png");
        setDownloadStatus("PNG downloaded at the selected size.");
      } else {
        setDownloadStatus("The browser could not export the canvas.");
      }
    }, "image/png");
  };

  const downloadSvg = async () => {
    if (!isReady || !text.trim()) return;

    try {
      const QRCode = (await import("qrcode")).default;
      const svg = await QRCode.toString(text, {
        type: "svg",
        width: size,
        margin: options.current.margin,
        errorCorrectionLevel: options.current.errorCorrection,
        color: {
          dark: options.current.dark,
          light: options.current.light,
        },
      });
      downloadBlob(
        new Blob([svg], { type: "image/svg+xml;charset=utf-8" }),
        "calvoro-qr-code.svg"
      );
      setDownloadStatus("SVG downloaded. Vector output stays sharp when scaled.");
    } catch (error) {
      setDownloadStatus(
        error instanceof Error ? error.message : "The SVG could not be generated."
      );
    }
  };

  return (
    <ToolPage
      title="QR Code Generator"
      kicker="Developer tool"
      description="Turn a link, an email address, or a short message into a downloadable QR code. The code is generated locally and never sent to a server."
      seoTitle="QR Code Generator - Download PNG or SVG | CALVORO"
      seoDescription="Create a QR code from a URL or text in your browser. Choose size, colors, margin, and error correction, then download PNG or SVG."
      steps={[
        "Enter the address or text the QR code should contain.",
        "Adjust the size, colors, and error-correction level as needed.",
        "Test the QR code with a phone before downloading it for print or packaging.",
      ]}
      notes={[
        "Error correction adds duplicate data so a code can still scan when partly covered. Higher levels make the pattern denser and can reduce capacity for long text.",
        "Keep strong contrast between the dark and light colors. Light-on-dark codes work for many modern scanners but are less reliable than dark-on-light.",
        "Short links scan more comfortably at small print sizes. Long text produces a dense code that may need more physical space.",
      ]}
      related={[
        { name: "Password Generator", path: "/password-generator" },
        { name: "UUID Generator", path: "/uuid-generator" },
        { name: "Color Palette Generator", path: "/color-palette-generator" },
      ]}
    >
      <div className="calvoro-tool-grid">
        <div>
          <div className="calvoro-field">
            <label htmlFor="qr-content">Content to encode</label>
            <textarea
              id="qr-content"
              value={text}
              onChange={(event) => setText(event.target.value)}
              rows={5}
              placeholder="https://example.com or a short message"
              maxLength={2000}
            />
            <span className="calvoro-field-hint">
              {text.length.toLocaleString()} / 2,000 characters. Very long content may not fit.
            </span>
          </div>

          <div className="calvoro-tool-grid" style={{ marginTop: 14 }}>
            <div className="calvoro-field">
              <label htmlFor="qr-size">Download size</label>
              <select
                id="qr-size"
                value={size}
                onChange={(event) => setSize(Number(event.target.value))}
              >
                {SIZES.map((pixels) => (
                  <option key={pixels} value={pixels}>
                    {pixels} × {pixels} px
                  </option>
                ))}
              </select>
            </div>

            <div className="calvoro-field">
              <label htmlFor="qr-error-level">Error correction</label>
              <select
                id="qr-error-level"
                value={errorCorrection}
                onChange={(event) => setErrorCorrection(event.target.value)}
              >
                {ERROR_LEVELS.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="calvoro-field">
              <label htmlFor="qr-margin">Quiet-zone margin: {margin} modules</label>
              <input
                id="qr-margin"
                type="range"
                min="0"
                max="8"
                step="1"
                value={margin}
                onChange={(event) => setMargin(Number(event.target.value))}
              />
            </div>

            <div className="calvoro-field">
              <label htmlFor="qr-dark">Dark modules</label>
              <input
                id="qr-dark"
                type="color"
                value={dark}
                onChange={(event) => setDark(event.target.value)}
              />
            </div>

            <div className="calvoro-field">
              <label htmlFor="qr-light">Light modules</label>
              <input
                id="qr-light"
                type="color"
                value={light}
                onChange={(event) => setLight(event.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="calvoro-qr-preview">
            <canvas ref={canvasRef} aria-label="QR code preview" role="img" />
          </div>

          <div className="calvoro-tool-actions">
            <button
              type="button"
              className="calvoro-tool-button"
              onClick={downloadPng}
              disabled={!isReady}
            >
              Download PNG
            </button>
            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={downloadSvg}
              disabled={!isReady}
            >
              Download SVG
            </button>
          </div>
        </div>
      </div>

      <p
        className={`calvoro-tool-status ${isReady ? "is-success" : ""}`}
        aria-live="polite"
      >
        {downloadStatus || status}
      </p>
    </ToolPage>
  );
}
