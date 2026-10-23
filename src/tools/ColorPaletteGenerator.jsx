import { useMemo, useState } from "react";
import ToolPage from "./ToolPage.jsx";
import { clamp, copyText } from "./utils.js";

const HARMONIES = [
  { value: "analogous", label: "Analogous" },
  { value: "complementary", label: "Complementary" },
  { value: "triadic", label: "Triadic" },
  { value: "split", label: "Split complementary" },
  { value: "tetradic", label: "Tetradic" },
  { value: "monochromatic", label: "Monochromatic" },
];

function normalizeHex(value) {
  let clean = String(value).trim().replace(/^#/, "");
  if (/^[0-9a-f]{3}$/i.test(clean)) {
    clean = clean
      .split("")
      .map((character) => character + character)
      .join("");
  }
  if (!/^[0-9a-f]{6}$/i.test(clean)) return null;
  return `#${clean.toLowerCase()}`;
}

function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function rgbToHsl({ r, g, b }) {
  const red = r / 255;
  const green = g / 255;
  const blue = b / 255;
  const maximum = Math.max(red, green, blue);
  const minimum = Math.min(red, green, blue);
  const delta = maximum - minimum;
  const lightness = (maximum + minimum) / 2;

  let hue = 0;
  let saturation = 0;

  if (delta !== 0) {
    saturation =
      lightness > 0.5
        ? delta / (2 - maximum - minimum)
        : delta / (maximum + minimum);

    if (maximum === red) {
      hue = ((green - blue) / delta + (green < blue ? 6 : 0)) * 60;
    } else if (maximum === green) {
      hue = ((blue - red) / delta + 2) * 60;
    } else {
      hue = ((red - green) / delta + 4) * 60;
    }
  }

  return {
    h: hue,
    s: saturation * 100,
    l: lightness * 100,
  };
}

function hslToHex(h, s, l) {
  const hue = ((h % 360) + 360) % 360;
  const saturation = clamp(s, 0, 100) / 100;
  const lightness = clamp(l, 0, 100) / 100;

  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  const section = hue / 60;
  const second = chroma * (1 - Math.abs((section % 2) - 1));
  const match = lightness - chroma / 2;

  let red = 0;
  let green = 0;
  let blue = 0;

  if (section >= 0 && section < 1) {
    [red, green, blue] = [chroma, second, 0];
  } else if (section < 2) {
    [red, green, blue] = [second, chroma, 0];
  } else if (section < 3) {
    [red, green, blue] = [0, chroma, second];
  } else if (section < 4) {
    [red, green, blue] = [0, second, chroma];
  } else if (section < 5) {
    [red, green, blue] = [second, 0, chroma];
  } else {
    [red, green, blue] = [chroma, 0, second];
  }

  const toHex = (value) =>
    Math.round((value + match) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

function relativeLuminance({ r, g, b }) {
  const channel = (value) => {
    const normalized = value / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  };

  return (
    0.2126 * channel(r) +
    0.7152 * channel(g) +
    0.0722 * channel(b)
  );
}

function contrastRatio(first, second) {
  const lighter = Math.max(relativeLuminance(first), relativeLuminance(second));
  const darker = Math.min(relativeLuminance(first), relativeLuminance(second));
  return (lighter + 0.05) / (darker + 0.05);
}

function buildPalette(base, harmony) {
  const { h, s, l } = base;
  let values;

  if (harmony === "monochromatic") {
    values = [-30, -15, 0, 15, 30].map((shift) => ({
      h,
      s,
      l: l + shift,
    }));
  } else if (harmony === "complementary") {
    values = [
      { h, s, l },
      { h, s, l: l + 16 },
      { h: h + 180, s, l },
      { h: h + 180, s, l: l + 12 },
      { h: h + 180, s: s - 18, l: l - 12 },
    ];
  } else if (harmony === "triadic") {
    values = [
      { h, s, l },
      { h: h + 120, s, l },
      { h: h + 240, s, l },
      { h, s: s - 12, l: l + 18 },
      { h: h + 120, s, l: l - 15 },
    ];
  } else if (harmony === "split") {
    values = [
      { h, s, l },
      { h: h + 150, s, l },
      { h: h + 210, s, l },
      { h: h + 30, s: s - 10, l: l + 16 },
      { h: h - 30, s, l: l - 14 },
    ];
  } else if (harmony === "tetradic") {
    values = [
      { h, s, l },
      { h: h + 90, s, l },
      { h: h + 180, s, l },
      { h: h + 270, s, l },
      { h, s: s - 15, l: l + 20 },
    ];
  } else {
    values = [
      { h: h - 30, s, l: l + 6 },
      { h: h - 15, s, l: l + 2 },
      { h, s, l },
      { h: h + 15, s, l: l - 4 },
      { h: h + 30, s, l: l - 8 },
    ];
  }

  return values.map((value) => {
    const hex = hslToHex(value.h, value.s, value.l);
    const rgb = hexToRgb(hex);
    return {
      hex,
      whiteRatio: contrastRatio(rgb, { r: 255, g: 255, b: 255 }),
      blackRatio: contrastRatio(rgb, { r: 0, g: 0, b: 0 }),
    };
  });
}

function randomHex() {
  const values = new Uint8Array(3);
  crypto.getRandomValues(values);
  return `#${[...values]
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("")}`;
}

export default function ColorPaletteGenerator() {
  const [baseHex, setBaseHex] = useState("#2563eb");
  const [hexDraft, setHexDraft] = useState("#2563eb");
  const [harmony, setHarmony] = useState("analogous");
  const [status, setStatus] = useState("");

  const base = useMemo(() => rgbToHsl(hexToRgb(baseHex)), [baseHex]);
  const palette = useMemo(() => buildPalette(base, harmony), [base, harmony]);

  const cssVariables = useMemo(
    () =>
      [
        ":root {",
        ...palette.map(
          (swatch, index) =>
            `  --palette-${index + 1}: ${swatch.hex};`
        ),
        "}",
      ].join("\n"),
    [palette]
  );

  const applyHex = (value) => {
    const normalized = normalizeHex(value);
    if (normalized) {
      setBaseHex(normalized);
      setHexDraft(normalized);
      setStatus("");
    }
  };

  const copy = async (value, message) => {
    const copied = await copyText(value);
    setStatus(copied ? message : "Copy was blocked by the browser.");
    window.setTimeout(() => setStatus(""), 2500);
  };

  const copyAll = () => {
    copy(
      palette.map((swatch) => swatch.hex).join(", "),
      "Palette hex values copied."
    );
  };

  const copyCss = () => {
    copy(cssVariables, "CSS variables copied.");
  };

  const randomize = () => {
    const next = randomHex();
    setBaseHex(next);
    setHexDraft(next);
    setStatus("");
  };

  return (
    <ToolPage
      title="Color Palette Generator"
      kicker="Design tool"
      description="Build a five-color palette from a base color, copy hex values, and check each swatch against white and black for contrast."
      seoTitle="Color Palette Generator - Harmonious HEX Colors | CALVORO"
      seoDescription="Generate analogous, complementary, triadic, split-complementary, tetradic, or monochromatic color palettes. Copy hex values and CSS variables."
      steps={[
        "Pick a base color or type a hex value.",
        "Choose a harmony rule to generate five related colors.",
        "Click a swatch to copy its hex value, or copy the full palette or CSS variables.",
      ]}
      notes={[
        "Palette colors are generated by rotating hue, saturation, and lightness in HSL. They are a starting point, not a guaranteed accessible combination.",
        "Contrast ratios show each swatch against pure white and pure black. For normal body text, WCAG AA asks for at least 4.5:1; large text can use 3:1.",
        "Screen colors vary. Check important brand choices on a calibrated display and test them with real content before publishing.",
      ]}
      related={[
        { name: "QR Code Generator", path: "/qr-code-generator" },
        { name: "Image Studio", path: "/image-studio" },
        { name: "Word and Character Counter", path: "/word-counter" },
      ]}
    >
      <div className="calvoro-tool-grid">
        <div className="calvoro-field">
          <label htmlFor="palette-base">Base color</label>
          <div className="calvoro-field-row">
            <input
              id="palette-base"
              type="color"
              value={baseHex}
              onChange={(event) => applyHex(event.target.value)}
              style={{ maxWidth: 72 }}
            />
            <input
              type="text"
              value={hexDraft}
              onChange={(event) => {
                setHexDraft(event.target.value);
                const normalized = normalizeHex(event.target.value);
                if (normalized) {
                  setBaseHex(normalized);
                  setStatus("");
                }
              }}
              onBlur={() => {
                if (!normalizeHex(hexDraft)) setHexDraft(baseHex);
              }}
              aria-label="Base color hex value"
              spellCheck="false"
              style={{ maxWidth: 140 }}
            />
            <button
              type="button"
              className="calvoro-tool-button is-secondary"
              onClick={randomize}
            >
              Random
            </button>
          </div>
        </div>

        <div className="calvoro-field">
          <label htmlFor="palette-harmony">Harmony rule</label>
          <select
            id="palette-harmony"
            value={harmony}
            onChange={(event) => setHarmony(event.target.value)}
          >
            {HARMONIES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="calvoro-palette-grid">
        {palette.map((swatch, index) => (
          <div className="calvoro-swatch" key={`${swatch.hex}-${index}`}>
            <button
              type="button"
              className="calvoro-swatch-color"
              style={{ background: swatch.hex, border: 0, width: "100%", cursor: "pointer" }}
              onClick={() => copy(swatch.hex, `${swatch.hex} copied.`)}
              aria-label={`Copy color ${swatch.hex}`}
              title={`Copy ${swatch.hex}`}
            />
            <div className="calvoro-swatch-body">
              <strong>{swatch.hex}</strong>
              <span className="calvoro-swatch-contrast" title="Contrast ratio with white">
                White {swatch.whiteRatio.toFixed(2)}:1
              </span>
              <span className="calvoro-swatch-contrast" title="Contrast ratio with black">
                Black {swatch.blackRatio.toFixed(2)}:1
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="calvoro-tool-actions">
        <button type="button" className="calvoro-tool-button" onClick={copyAll}>
          Copy hex values
        </button>
        <button type="button" className="calvoro-tool-button is-secondary" onClick={copyCss}>
          Copy CSS variables
        </button>
      </div>

      <pre className="calvoro-code-display" style={{ marginTop: 16 }}>
        {cssVariables}
      </pre>

      <p className="calvoro-inline-note" aria-live="polite">
        {status || "Click any color block to copy its hex value."}
      </p>
    </ToolPage>
  );
}
