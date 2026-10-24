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

function findAccessibleColor(hex, againstHex, minimumRatio) {
  const base = rgbToHsl(hexToRgb(hex));
  const against = hexToRgb(againstHex);
  let best = null;

  for (let lightness = 0; lightness <= 100; lightness += 1) {
    const candidate = hslToHex(base.h, base.s, lightness);
    const ratio = contrastRatio(hexToRgb(candidate), against);

    if (ratio < minimumRatio) continue;

    const distance = Math.abs(lightness - base.l);

    if (!best || distance < best.distance) {
      best = { hex: candidate, ratio, distance };
    }
  }

  return best;
}

function ContrastBadge({ label, pass, target }) {
  return (
    <span
      className={`calvoro-contrast-badge ${pass ? "is-pass" : "is-fail"}`}
    >
      <strong>{label}</strong>
      <span>
        {pass ? "Pass" : "Fail"} · min {target}
      </span>
    </span>
  );
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
  const [foreground, setForeground] = useState("#0f172a");
  const [foregroundDraft, setForegroundDraft] = useState("#0f172a");
  const [background, setBackground] = useState("#ffffff");
  const [backgroundDraft, setBackgroundDraft] = useState("#ffffff");
  const [status, setStatus] = useState("");

  const base = useMemo(() => rgbToHsl(hexToRgb(baseHex)), [baseHex]);
  const palette = useMemo(() => buildPalette(base, harmony), [base, harmony]);

  const pairRatio = useMemo(
    () => contrastRatio(hexToRgb(foreground), hexToRgb(background)),
    [foreground, background]
  );

  const suggestions = useMemo(() => {
    if (pairRatio >= 7) {
      return { target: "AAA 7:1", foreground: null, background: null };
    }

    const target = pairRatio < 4.5 ? 4.5 : 7;

    return {
      target: target === 7 ? "AAA 7:1" : "AA 4.5:1",
      foreground: findAccessibleColor(foreground, background, target),
      background: findAccessibleColor(background, foreground, target),
    };
  }, [foreground, background, pairRatio]);

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

  const applyPairColor = (role, value) => {
    if (role === "background") {
      setBackground(value);
      setBackgroundDraft(value);
      setStatus(`${value} applied as the background color.`);
    } else {
      setForeground(value);
      setForegroundDraft(value);
      setStatus(`${value} applied as the text color.`);
    }
  };

  const swapPair = () => {
    setForeground(background);
    setForegroundDraft(background);
    setBackground(foreground);
    setBackgroundDraft(foreground);
    setStatus("Text and background colors swapped.");
  };

  const copyPair = () => {
    copy(
      `color: ${foreground};\nbackground-color: ${background};`,
      "Contrast pair copied as CSS."
    );
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
        "Click a swatch to copy its hex value, or send it to the contrast checker as text or background.",
        "Compare the pair against WCAG AA and AAA, then apply a suggested color if the pair falls short.",
      ]}
      notes={[
        "Palette colors are generated by rotating hue, saturation, and lightness in HSL. They are a starting point, not a guaranteed accessible combination.",
        "Contrast ratios show each swatch against pure white and pure black. For normal body text, WCAG AA asks for at least 4.5:1; large text can use 3:1. AAA asks for 7:1 and 4.5:1.",
        "The pair checker uses the WCAG relative-luminance formula. Its suggestions preserve hue and saturation and only adjust lightness, so check the result in context before publishing.",
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
              <div className="calvoro-swatch-actions">
                <button
                  type="button"
                  onClick={() => applyPairColor("foreground", swatch.hex)}
                >
                  Text
                </button>
                <button
                  type="button"
                  onClick={() => applyPairColor("background", swatch.hex)}
                >
                  Background
                </button>
              </div>
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

      <section
        className="calvoro-contrast-studio"
        aria-labelledby="contrast-studio-heading"
      >
        <div className="calvoro-contrast-head">
          <div>
            <span className="calvoro-tool-kicker">Contrast checker</span>
            <h2 id="contrast-studio-heading">
              Check any text and background pair
            </h2>
          </div>
          <p className="calvoro-inline-note">
            WCAG AA needs 4.5:1 for normal text and 3:1 for large text.
          </p>
        </div>

        <div className="calvoro-contrast-controls">
          <div className="calvoro-field">
            <label htmlFor="contrast-foreground">Text color</label>
            <div className="calvoro-field-row">
              <input
                id="contrast-foreground"
                type="color"
                value={foreground}
                onChange={(event) => {
                  const next = normalizeHex(event.target.value);
                  if (next) applyPairColor("foreground", next);
                }}
                style={{ maxWidth: 72 }}
              />
              <input
                type="text"
                value={foregroundDraft}
                onChange={(event) => {
                  setForegroundDraft(event.target.value);
                  const next = normalizeHex(event.target.value);
                  if (next) {
                    setForeground(next);
                    setStatus("");
                  }
                }}
                onBlur={() => {
                  if (!normalizeHex(foregroundDraft)) {
                    setForegroundDraft(foreground);
                  }
                }}
                aria-label="Text color hex value"
                spellCheck="false"
                style={{ maxWidth: 140 }}
              />
            </div>
          </div>

          <div className="calvoro-field">
            <label htmlFor="contrast-background">Background color</label>
            <div className="calvoro-field-row">
              <input
                id="contrast-background"
                type="color"
                value={background}
                onChange={(event) => {
                  const next = normalizeHex(event.target.value);
                  if (next) applyPairColor("background", next);
                }}
                style={{ maxWidth: 72 }}
              />
              <input
                type="text"
                value={backgroundDraft}
                onChange={(event) => {
                  setBackgroundDraft(event.target.value);
                  const next = normalizeHex(event.target.value);
                  if (next) {
                    setBackground(next);
                    setStatus("");
                  }
                }}
                onBlur={() => {
                  if (!normalizeHex(backgroundDraft)) {
                    setBackgroundDraft(background);
                  }
                }}
                aria-label="Background color hex value"
                spellCheck="false"
                style={{ maxWidth: 140 }}
              />
            </div>
          </div>
        </div>

        <div className="calvoro-contrast-layout">
          <div
            className="calvoro-contrast-preview"
            style={{
              background,
              color: foreground,
              borderColor: foreground,
            }}
          >
            <span className="calvoro-contrast-preview-kicker">
              Live preview
            </span>
            <p>
              Normal body text: the quick brown fox jumps over the lazy dog.
            </p>
            <p className="calvoro-contrast-preview-large">
              Large heading text
            </p>
            <span
              className="calvoro-contrast-preview-ui"
              style={{ background: foreground, color: background }}
            >
              UI label
            </span>
          </div>

          <div className="calvoro-contrast-score">
            <span className="calvoro-contrast-kicker">Contrast ratio</span>
            <p className="calvoro-contrast-ratio" aria-live="polite">
              <strong>{pairRatio.toFixed(2)}:1</strong>
              <span>
                {pairRatio >= 7
                  ? "AAA for normal text"
                  : pairRatio >= 4.5
                    ? "AA for normal text"
                    : "Below AA for normal text"}
              </span>
            </p>

            <div className="calvoro-contrast-badges">
              <ContrastBadge
                label="AA normal"
                pass={pairRatio >= 4.5}
                target="4.5:1"
              />
              <ContrastBadge
                label="AAA normal"
                pass={pairRatio >= 7}
                target="7:1"
              />
              <ContrastBadge
                label="AA large"
                pass={pairRatio >= 3}
                target="3:1"
              />
              <ContrastBadge
                label="AAA large"
                pass={pairRatio >= 4.5}
                target="4.5:1"
              />
              <ContrastBadge
                label="UI components"
                pass={pairRatio >= 3}
                target="3:1"
              />
            </div>

            <div className="calvoro-tool-actions">
              <button
                type="button"
                className="calvoro-tool-button is-secondary"
                onClick={swapPair}
              >
                Swap colors
              </button>
              <button
                type="button"
                className="calvoro-tool-button is-secondary"
                onClick={copyPair}
              >
                Copy CSS pair
              </button>
            </div>
          </div>
        </div>

        {(suggestions.foreground || suggestions.background) && (
          <div className="calvoro-contrast-suggestions">
            <div className="calvoro-contrast-suggestion-head">
              <strong>Closest accessible options</strong>
              <span>Target {suggestions.target}</span>
            </div>

            <div className="calvoro-contrast-suggestion-grid">
              {suggestions.foreground && (
                <button
                  type="button"
                  className="calvoro-contrast-suggestion"
                  onClick={() =>
                    applyPairColor(
                      "foreground",
                      suggestions.foreground.hex
                    )
                  }
                >
                  <span
                    className="calvoro-contrast-swatch"
                    style={{ background: suggestions.foreground.hex }}
                    aria-hidden="true"
                  />
                  <span>
                    <strong>Text {suggestions.foreground.hex}</strong>
                    <small>
                      {suggestions.foreground.ratio.toFixed(2)}:1 · apply as
                      text color
                    </small>
                  </span>
                </button>
              )}

              {suggestions.background && (
                <button
                  type="button"
                  className="calvoro-contrast-suggestion"
                  onClick={() =>
                    applyPairColor(
                      "background",
                      suggestions.background.hex
                    )
                  }
                >
                  <span
                    className="calvoro-contrast-swatch"
                    style={{ background: suggestions.background.hex }}
                    aria-hidden="true"
                  />
                  <span>
                    <strong>Background {suggestions.background.hex}</strong>
                    <small>
                      {suggestions.background.ratio.toFixed(2)}:1 · apply as
                      background color
                    </small>
                  </span>
                </button>
              )}
            </div>
          </div>
        )}

        {!suggestions.foreground &&
          !suggestions.background &&
          pairRatio < 7 && (
            <p className="calvoro-inline-note">
              No single lightness adjustment reaches {suggestions.target}{" "}
              against the other color. Change both colors or choose a
              different base palette.
            </p>
          )}

        {pairRatio >= 7 && (
          <p className="calvoro-inline-note">
            This pair meets AAA for normal text. Check the actual font sizes
            and states in the interface before publishing.
          </p>
        )}
      </section>

      <p className="calvoro-inline-note" aria-live="polite">
        {status || "Click any color block to copy its hex value."}
      </p>
    </ToolPage>
  );
}
