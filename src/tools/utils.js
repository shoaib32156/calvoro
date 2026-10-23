export function formatBytes(bytes, decimals = 1) {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return "0 B";
  }

  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(
    Math.floor(Math.log(bytes) / Math.log(1024)),
    units.length - 1
  );
  const value = bytes / 1024 ** index;

  return `${value.toFixed(index === 0 ? 0 : decimals)} ${units[index]}`;
}

export function sanitizeFilename(name, fallback = "calvoro-output") {
  const cleaned = String(name || "")
    .replace(/[<>:"/\\|?*\u0000-\u001f]/g, "-")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90);

  return cleaned || fallback;
}

export function baseFilename(name, fallback = "file") {
  return sanitizeFilename(
    String(name || fallback).replace(/\.[^.]+$/, ""),
    fallback
  );
}

export function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export async function copyText(text) {
  const value = String(text ?? "");

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(value);
      return true;
    } catch {
      // Fall through to the legacy path when clipboard permission is denied.
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  let copied = false;

  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }

  textarea.remove();
  return copied;
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function parsePageRanges(input, pageCount) {
  const text = String(input || "").trim();

  if (!text) {
    return { pages: [], error: "Enter at least one page or range." };
  }

  const pages = [];
  const seen = new Set();
  const parts = text.split(",").map((part) => part.trim()).filter(Boolean);

  for (const part of parts) {
    const match = part.match(/^(\d+)(?:\s*-\s*(\d+))?$/);

    if (!match) {
      return {
        pages: [],
        error: `“${part}” is not a valid page or range. Use a format such as 1-3,5.`,
      };
    }

    const start = Number(match[1]);
    const end = match[2] ? Number(match[2]) : start;

    if (start < 1 || end < 1 || start > pageCount || end > pageCount) {
      return {
        pages: [],
        error: `Pages must be between 1 and ${pageCount}.`,
      };
    }

    if (start > end) {
      return {
        pages: [],
        error: `The range ${part} is reversed. Start with the smaller page number.`,
      };
    }

    for (let page = start; page <= end; page += 1) {
      if (!seen.has(page)) {
        seen.add(page);
        pages.push(page);
      }
    }
  }

  return { pages, error: "" };
}

export function parsePageOrder(input, pageCount) {
  const text = String(input || "").trim();

  if (!text) {
    return {
      pages: Array.from({ length: pageCount }, (_, index) => index + 1),
      error: "",
    };
  }

  const pages = text
    .split(/[\s,]+/)
    .map((part) => part.trim())
    .filter(Boolean)
    .map(Number);

  if (pages.some((page) => !Number.isInteger(page))) {
    return { pages: [], error: "Use whole page numbers separated by commas." };
  }

  if (pages.some((page) => page < 1 || page > pageCount)) {
    return {
      pages: [],
      error: `Every page number must be between 1 and ${pageCount}.`,
    };
  }

  return { pages, error: "" };
}

export function todayStamp() {
  const date = new Date();
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getDate()).padStart(2, "0")}`;
}
