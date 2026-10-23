import { useMemo, useState } from "react";
import ToolPage from "./ToolPage.jsx";
import { clamp, copyText } from "./utils.js";

const SETS = {
  lower: "abcdefghijklmnopqrstuvwxyz",
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.?/",
};

const AMBIGUOUS = new Set("O0Il1|`'\"".split(""));

function randomInt(max) {
  if (max <= 0) return 0;
  const limit = Math.floor(4294967296 / max) * max;
  const buffer = new Uint32Array(1);
  let value;
  do {
    crypto.getRandomValues(buffer);
    value = buffer[0];
  } while (value >= limit);
  return value % max;
}

function pickCharacter(pool) {
  return pool[randomInt(pool.length)];
}

function buildPools(options) {
  return Object.entries(SETS)
    .filter(([key]) => options[key])
    .map(([, characters]) =>
      options.excludeAmbiguous
        ? [...characters].filter((character) => !AMBIGUOUS.has(character)).join("")
        : characters
    )
    .filter((pool) => pool.length > 0);
}

function generatePassword(options) {
  const pools = buildPools(options);
  if (pools.length === 0) return "";

  const combined = pools.join("");
  const length = clamp(options.length, pools.length, 128);
  const characters = pools.map((pool) => pickCharacter(pool));

  while (characters.length < length) {
    characters.push(pickCharacter(combined));
  }

  for (let index = characters.length - 1; index > 0; index -= 1) {
    const swapWith = randomInt(index + 1);
    [characters[index], characters[swapWith]] = [
      characters[swapWith],
      characters[index],
    ];
  }

  return characters.join("");
}

function strengthFor(length, poolSize) {
  const entropy = length * Math.log2(poolSize || 1);

  if (entropy < 50) {
    return { label: "Weak", level: "", entropy };
  }
  if (entropy < 75) {
    return { label: "Fair", level: "is-good", entropy };
  }
  if (entropy < 110) {
    return { label: "Strong", level: "is-strong", entropy };
  }
  return { label: "Very strong", level: "is-strong", entropy };
}

const defaultOptions = {
  length: 20,
  lower: true,
  upper: true,
  numbers: true,
  symbols: true,
  excludeAmbiguous: false,
};

export default function PasswordGenerator() {
  const [options, setOptions] = useState(defaultOptions);
  const [password, setPassword] = useState(() => generatePassword(defaultOptions));
  const [copyStatus, setCopyStatus] = useState("");

  const poolSize = useMemo(
    () => buildPools(options).reduce((total, pool) => total + pool.length, 0),
    [options]
  );

  const strength = strengthFor(password.length, poolSize);
  const noCharacterSet =
    !options.lower && !options.upper && !options.numbers && !options.symbols;

  const update = (name, value) => {
    setOptions((current) => ({ ...current, [name]: value }));
  };

  const generate = () => {
    setPassword(generatePassword(options));
    setCopyStatus("");
  };

  const copy = async () => {
    const copied = await copyText(password);
    setCopyStatus(copied ? "Password copied." : "Copy was blocked by the browser.");
    window.setTimeout(() => setCopyStatus(""), 2500);
  };

  return (
    <ToolPage
      title="Password Generator"
      kicker="Developer tool"
      description="Create a random password with Web Crypto, choose its length and character sets, and see an entropy-based strength estimate before you copy it."
      seoTitle="Random Password Generator - Browser Only | CALVORO"
      seoDescription="Generate a strong random password in your browser. Choose length, uppercase, lowercase, numbers, symbols, and exclude ambiguous characters."
      steps={[
        "Choose the length and at least one character set.",
        "Select Generate password to draw new random characters.",
        "Copy the password into your password manager and store it there, not in a document.",
      ]}
      notes={[
        "Passwords are generated with the browser's cryptographic random number generator and are never sent anywhere.",
        "The strength figure is an estimate based on length and pool size. It does not know whether a password has appeared in a breach.",
        "A password manager generates and remembers unique passwords more safely than reusing one strong password across sites.",
      ]}
      related={[
        { name: "UUID Generator", path: "/uuid-generator" },
        { name: "QR Code Generator", path: "/qr-code-generator" },
        { name: "JSON Formatter and Validator", path: "/json-formatter" },
      ]}
    >
      <div className="calvoro-password-display" aria-live="polite">
        {password || "Select at least one character set."}
      </div>

      <div className="calvoro-strength-track" aria-hidden="true">
        <span
          className={strength.level}
          style={{ width: `${Math.min(100, Math.round((strength.entropy / 128) * 100))}%` }}
        />
      </div>

      <p className="calvoro-inline-note">
        {password
          ? `${strength.label} · about ${Math.round(strength.entropy)} bits of entropy · ${password.length} characters`
          : "No character set is selected, so a password cannot be generated."}
      </p>

      <div className="calvoro-tool-actions">
        <button type="button" className="calvoro-tool-button" onClick={generate}>
          Generate new password
        </button>
        <button
          type="button"
          className="calvoro-tool-button is-secondary"
          onClick={copy}
          disabled={!password}
        >
          Copy password
        </button>
      </div>

      <div className="calvoro-tool-panel" style={{ marginTop: 20 }}>
        <div className="calvoro-field">
          <label htmlFor="password-length">
            Length: {options.length} characters
          </label>
          <input
            id="password-length"
            type="range"
            min="8"
            max="64"
            step="1"
            value={options.length}
            onChange={(event) => update("length", Number(event.target.value))}
          />
          <span className="calvoro-field-hint">
            Longer passwords add far more strength than extra symbol types.
          </span>
        </div>

        <div className="calvoro-checkbox-grid" style={{ marginTop: 16 }}>
          <label className="calvoro-checkbox">
            <input
              type="checkbox"
              checked={options.lower}
              onChange={(event) => update("lower", event.target.checked)}
            />
            Lowercase letters (a–z)
          </label>
          <label className="calvoro-checkbox">
            <input
              type="checkbox"
              checked={options.upper}
              onChange={(event) => update("upper", event.target.checked)}
            />
            Uppercase letters (A–Z)
          </label>
          <label className="calvoro-checkbox">
            <input
              type="checkbox"
              checked={options.numbers}
              onChange={(event) => update("numbers", event.target.checked)}
            />
            Numbers (0–9)
          </label>
          <label className="calvoro-checkbox">
            <input
              type="checkbox"
              checked={options.symbols}
              onChange={(event) => update("symbols", event.target.checked)}
            />
            Symbols (!@#$…)
          </label>
          <label className="calvoro-checkbox">
            <input
              type="checkbox"
              checked={options.excludeAmbiguous}
              onChange={(event) => update("excludeAmbiguous", event.target.checked)}
            />
            Exclude look-alike characters (O, 0, I, l, 1)
          </label>
        </div>

        {noCharacterSet && (
          <p className="calvoro-tool-status is-error" role="alert">
            Select at least one character set to generate a password.
          </p>
        )}
      </div>

      <p className="calvoro-inline-note" aria-live="polite">
        {copyStatus || "Changing options does not replace the password shown until you generate again."}
      </p>
    </ToolPage>
  );
}
