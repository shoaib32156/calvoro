import { baseFilename } from "./utils.js";
import { imageExtension, wrapTextLines } from "./creativeUtils.js";

export const MEME_FONT_OPTIONS = [
  {
    value: "impact",
    label: "Impact-style",
    family: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
  },
  {
    value: "arial-black",
    label: "Arial Black",
    family: "'Arial Black', Gadget, sans-serif",
  },
  {
    value: "verdana",
    label: "Verdana",
    family: "Verdana, Geneva, sans-serif",
  },
  {
    value: "georgia",
    label: "Georgia",
    family: "Georgia, 'Times New Roman', serif",
  },
  {
    value: "trebuchet",
    label: "Trebuchet",
    family: "'Trebuchet MS', Tahoma, sans-serif",
  },
];

export const DEFAULT_MEME_SETTINGS = {
  topText: "",
  bottomText: "",
  fontId: "impact",
  sizePercent: 9,
  fillColor: "#ffffff",
  outlineColor: "#000000",
  outlinePercent: 4,
  uppercase: true,
};

export function getMemeFontSize(canvasHeight, sizePercent) {
  return Math.max(10, Math.round((canvasHeight * Number(sizePercent)) / 100));
}

export function getMemeFontFamily(fontId) {
  return (
    MEME_FONT_OPTIONS.find((entry) => entry.value === fontId)?.family ||
    MEME_FONT_OPTIONS[0].family
  );
}

export function getMemeExportName(originalName, format) {
  return `${baseFilename(originalName, "calvoro-meme")}-meme.${imageExtension(
    format
  )}`;
}

export function getMemeLines(context, text, maxWidth, maxLines = 6) {
  return wrapTextLines(
    (candidate) => context.measureText(candidate).width,
    text,
    maxWidth,
    maxLines
  );
}
