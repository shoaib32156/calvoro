import test from "node:test";
import assert from "node:assert/strict";
import {
  MEME_IMAGE_LIMITS,
  detectImageType,
  imageExtension,
  validateImageDimensions,
  validateImageMetadata,
  wrapTextLines,
} from "../src/tools/creativeUtils.js";
import {
  getMemeExportName,
  getMemeFontFamily,
  getMemeFontSize,
} from "../src/tools/memeUtils.js";
import {
  PASSPORT_PRESETS,
  calculatePassportSize,
  computeSourceCrop,
  getPhotoDimensionsMm,
  getSheetLayout,
  mmToPixels,
  mmToPoints,
} from "../src/tools/passportUtils.js";

const PNG_SIGNATURE = new Uint8Array([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0, 0, 0, 0,
]);
const JPEG_SIGNATURE = new Uint8Array([
  0xff, 0xd8, 0xff, 0xe0, 0, 0, 0, 0, 0, 0, 0, 0,
]);
const WEBP_SIGNATURE = new Uint8Array([
  0x52, 0x49, 0x46, 0x46, 0x20, 0, 0, 0, 0x57, 0x45, 0x42, 0x50,
]);

function measureByCharacterWidth(text) {
  return text.length * 10;
}

test("image signatures are identified by file contents", () => {
  assert.equal(detectImageType(PNG_SIGNATURE), "image/png");
  assert.equal(detectImageType(JPEG_SIGNATURE), "image/jpeg");
  assert.equal(detectImageType(WEBP_SIGNATURE), "image/webp");
  assert.equal(detectImageType(new Uint8Array([1, 2, 3])), "");
  assert.equal(imageExtension("image/jpeg"), "jpg");
  assert.equal(imageExtension("image/webp"), "webp");
  assert.equal(imageExtension("image/png"), "png");
});

test("creative image validation rejects spoofed, unsupported, and oversized files", () => {
  const valid = validateImageMetadata({
    name: "photo.png",
    type: "image/png",
    size: 1024,
    signatureType: "image/png",
    limits: MEME_IMAGE_LIMITS,
  });
  assert.equal(valid.ok, true);
  assert.equal(valid.type, "image/png");

  const spoofed = validateImageMetadata({
    name: "photo.jpg",
    type: "image/jpeg",
    size: 1024,
    signatureType: "image/png",
    limits: MEME_IMAGE_LIMITS,
  });
  assert.equal(spoofed.ok, false);
  assert.match(spoofed.error, /does not match|extension/i);

  const unsupported = validateImageMetadata({
    name: "photo.gif",
    type: "image/gif",
    size: 1024,
    signatureType: "image/gif",
    limits: MEME_IMAGE_LIMITS,
  });
  assert.equal(unsupported.ok, false);

  const oversized = validateImageMetadata({
    name: "photo.png",
    type: "image/png",
    size: MEME_IMAGE_LIMITS.maxBytes + 1,
    signatureType: "image/png",
    limits: MEME_IMAGE_LIMITS,
  });
  assert.equal(oversized.ok, false);
  assert.match(oversized.error, /20 MB/);
});

test("image dimensions are bounded before decoding large canvases", () => {
  assert.equal(
    validateImageDimensions(1200, 800, MEME_IMAGE_LIMITS),
    ""
  );
  assert.match(
    validateImageDimensions(8001, 100, MEME_IMAGE_LIMITS),
    /8,000/
  );
  assert.match(
    validateImageDimensions(8000, 8000, MEME_IMAGE_LIMITS),
    /40 megapixels/
  );
  assert.match(validateImageDimensions(0, 100, MEME_IMAGE_LIMITS), /readable/);
});

test("caption wrapping respects width, max lines, and long words", () => {
  assert.deepEqual(
    wrapTextLines(measureByCharacterWidth, "one two three", 70, 6),
    ["one two", "three"]
  );
  assert.deepEqual(
    wrapTextLines(measureByCharacterWidth, "abcdefghij", 30, 6),
    ["abc", "def", "ghi", "j"]
  );
  assert.deepEqual(
    wrapTextLines(measureByCharacterWidth, "aa bb cc dd ee", 20, 2),
    ["aa", "b…"]
  );
  assert.deepEqual(
    wrapTextLines(measureByCharacterWidth, "   ", 100, 6),
    []
  );
});

test("meme font helpers provide sane fallbacks and filenames", () => {
  assert.equal(getMemeFontSize(1000, 9), 90);
  assert.equal(getMemeFontSize(100, 1), 10);
  assert.match(getMemeFontFamily("impact"), /Impact/);
  assert.match(getMemeFontFamily("unknown"), /Impact/);
  assert.equal(
    getMemeExportName("my photo.PNG", "image/jpeg"),
    "my-photo-meme.jpg"
  );
});

test("passport presets and physical-to-pixel conversions are exact", () => {
  const labels = PASSPORT_PRESETS.map((preset) => preset.label);
  assert.deepEqual(labels, [
    "US 2 × 2 in",
    "35 × 45 mm",
    "33 × 48 mm",
    "50 × 70 mm",
  ]);

  const us = calculatePassportSize({
    presetId: "us-2x2",
    customWidthMm: "",
    customHeightMm: "",
    dpi: 300,
  });
  assert.equal(us.widthMm, 50.8);
  assert.equal(us.widthPx, 600);
  assert.equal(us.heightPx, 600);
  assert.equal(us.widthPt, 144);

  const standard = calculatePassportSize({
    presetId: "35x45",
    customWidthMm: "",
    customHeightMm: "",
    dpi: 300,
  });
  assert.equal(standard.widthPx, 413);
  assert.equal(standard.heightPx, 531);

  assert.equal(mmToPixels(25.4, 300), 300);
  assert.equal(mmToPoints(25.4), 72);

  const custom = calculatePassportSize({
    presetId: "custom",
    customWidthMm: "33.3",
    customHeightMm: "48.2",
    dpi: 600,
  });
  assert.equal(custom.error, "");
  assert.equal(custom.widthPx, 787);

  const invalidCustom = calculatePassportSize({
    presetId: "custom",
    customWidthMm: "10",
    customHeightMm: "45",
    dpi: 300,
  });
  assert.match(invalidCustom.error, /between 20 and 150 mm/);

  const missingPreset = getPhotoDimensionsMm({
    presetId: "missing",
    customWidthMm: "",
    customHeightMm: "",
  });
  assert.match(missingPreset.error, /Choose a photo size/);
});

test("the crop window stays inside the source image", () => {
  const centered = computeSourceCrop({
    sourceWidth: 1000,
    sourceHeight: 800,
    targetAspect: 1,
  });
  assert.deepEqual(
    { x: centered.x, y: centered.y, width: centered.width, height: centered.height },
    { x: 100, y: 0, width: 800, height: 800 }
  );

  const zoomed = computeSourceCrop({
    sourceWidth: 1000,
    sourceHeight: 800,
    targetAspect: 1,
    zoom: 2,
    panX: 0,
    panY: 0,
  });
  assert.deepEqual(
    { x: zoomed.x, y: zoomed.y, width: zoomed.width, height: zoomed.height },
    { x: 300, y: 200, width: 400, height: 400 }
  );

  const edge = computeSourceCrop({
    sourceWidth: 1000,
    sourceHeight: 800,
    targetAspect: 1,
    zoom: 2,
    panX: 1,
    panY: 1,
  });
  assert.equal(edge.x, 600);
  assert.equal(edge.y, 400);
  assert.ok(edge.x + edge.width <= 1000);
  assert.ok(edge.y + edge.height <= 800);

  assert.equal(
    computeSourceCrop({
      sourceWidth: 0,
      sourceHeight: 0,
      targetAspect: 1,
    }),
    null
  );
});

test("printable sheet layouts fit and produce non-overlapping positions", () => {
  const a4 = getSheetLayout({
    pageId: "a4",
    photoWidthMm: 35,
    photoHeightMm: 45,
  });
  assert.equal(a4.error, "");
  assert.equal(a4.columns, 5);
  assert.equal(a4.rows, 5);
  assert.equal(a4.count, 25);
  assert.equal(a4.positions.length, 25);

  for (const position of a4.positions) {
    assert.ok(position.xMm >= 0);
    assert.ok(position.yMm >= 0);
    assert.ok(position.xMm + position.widthMm <= a4.page.widthMm);
    assert.ok(position.yMm + position.heightMm <= a4.page.heightMm);
  }

  const first = a4.positions[0];
  const second = a4.positions[1];
  assert.ok(second.xMm >= first.xMm + first.widthMm);

  const smallSheet = getSheetLayout({
    pageId: "4x6",
    photoWidthMm: 35,
    photoHeightMm: 45,
  });
  assert.equal(smallSheet.error, "");
  assert.equal(smallSheet.count, 4);

  const tooLarge = getSheetLayout({
    pageId: "4x6",
    photoWidthMm: 150,
    photoHeightMm: 150,
  });
  assert.match(tooLarge.error, /too large/);
  assert.equal(tooLarge.count, 0);

  const invalidPage = getSheetLayout({
    pageId: "letter",
    photoWidthMm: 35,
    photoHeightMm: 45,
  });
  assert.match(invalidPage.error, /sheet size/);
});

test("custom dimensions preserve millimetre and point values for PDF pages", () => {
  const result = calculatePassportSize({
    presetId: "custom",
    customWidthMm: "35",
    customHeightMm: "45",
    dpi: 600,
  });
  assert.equal(result.widthPts, undefined);
  assert.ok(Math.abs(result.widthPt - 99.21259842519684) < 0.000001);
  assert.ok(Math.abs(result.heightPt - 127.55905511811024) < 0.000001);
  assert.equal(result.widthPx, 827);
  assert.equal(result.heightPx, 1063);
});
