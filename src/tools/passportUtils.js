export const PASSPORT_PRESETS = [
  {
    id: "us-2x2",
    label: "US 2 × 2 in",
    widthMm: 50.8,
    heightMm: 50.8,
  },
  {
    id: "35x45",
    label: "35 × 45 mm",
    widthMm: 35,
    heightMm: 45,
  },
  {
    id: "33x48",
    label: "33 × 48 mm",
    widthMm: 33,
    heightMm: 48,
  },
  {
    id: "50x70",
    label: "50 × 70 mm",
    widthMm: 50,
    heightMm: 70,
  },
];

export const PASSPORT_DPI_OPTIONS = [300, 600];

export const PASSPORT_SHEET_PAGES = [
  {
    id: "a4",
    label: "A4 portrait (210 × 297 mm)",
    widthMm: 210,
    heightMm: 297,
  },
  {
    id: "4x6",
    label: "4 × 6 in portrait (102 × 152 mm)",
    widthMm: 101.6,
    heightMm: 152.4,
  },
];

export const PHOTO_MIN_MM = 20;
export const PHOTO_MAX_MM = 150;

function clampNumber(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function mmToPixels(mm, dpi) {
  return Math.max(1, Math.round((Number(mm) / 25.4) * Number(dpi)));
}

export function mmToPoints(mm) {
  return (Number(mm) / 25.4) * 72;
}

export function validatePhotoDimensionsMm(widthMm, heightMm) {
  if (!Number.isFinite(widthMm) || !Number.isFinite(heightMm)) {
    return "Enter a valid width and height in millimetres.";
  }

  if (
    widthMm < PHOTO_MIN_MM ||
    heightMm < PHOTO_MIN_MM ||
    widthMm > PHOTO_MAX_MM ||
    heightMm > PHOTO_MAX_MM
  ) {
    return `Custom dimensions must be between ${PHOTO_MIN_MM} and ${PHOTO_MAX_MM} mm.`;
  }

  return "";
}

export function getPhotoDimensionsMm({
  presetId,
  customWidthMm,
  customHeightMm,
}) {
  if (presetId !== "custom") {
    const preset = PASSPORT_PRESETS.find((entry) => entry.id === presetId);

    if (!preset) {
      return {
        widthMm: 0,
        heightMm: 0,
        error: "Choose a photo size.",
      };
    }

    return {
      widthMm: preset.widthMm,
      heightMm: preset.heightMm,
      error: "",
    };
  }

  const widthMm = Number(customWidthMm);
  const heightMm = Number(customHeightMm);
  const error = validatePhotoDimensionsMm(widthMm, heightMm);

  return {
    widthMm: error ? 0 : widthMm,
    heightMm: error ? 0 : heightMm,
    error,
  };
}

export function calculatePassportSize({
  presetId,
  customWidthMm,
  customHeightMm,
  dpi,
}) {
  const dimensions = getPhotoDimensionsMm({
    presetId,
    customWidthMm,
    customHeightMm,
  });

  if (dimensions.error) {
    return {
      ...dimensions,
      widthPx: 0,
      heightPx: 0,
      widthPt: 0,
      heightPt: 0,
    };
  }

  const numericDpi = Number(dpi);

  if (!PASSPORT_DPI_OPTIONS.includes(numericDpi)) {
    return {
      ...dimensions,
      widthPx: 0,
      heightPx: 0,
      widthPt: 0,
      heightPt: 0,
      error: "Choose 300 or 600 DPI.",
    };
  }

  return {
    ...dimensions,
    widthPx: mmToPixels(dimensions.widthMm, numericDpi),
    heightPx: mmToPixels(dimensions.heightMm, numericDpi),
    widthPt: mmToPoints(dimensions.widthMm),
    heightPt: mmToPoints(dimensions.heightMm),
  };
}

export function computeSourceCrop({
  sourceWidth,
  sourceHeight,
  targetAspect,
  zoom = 1,
  panX = 0,
  panY = 0,
}) {
  if (
    !Number.isFinite(sourceWidth) ||
    !Number.isFinite(sourceHeight) ||
    !Number.isFinite(targetAspect) ||
    sourceWidth <= 0 ||
    sourceHeight <= 0 ||
    targetAspect <= 0
  ) {
    return null;
  }

  const safeZoom = Math.max(1, Number(zoom) || 1);
  let cropWidth = Math.min(sourceWidth, sourceHeight * targetAspect);
  let cropHeight = cropWidth / targetAspect;
  cropWidth /= safeZoom;
  cropHeight /= safeZoom;

  const maxX = Math.max(0, (sourceWidth - cropWidth) / 2);
  const maxY = Math.max(0, (sourceHeight - cropHeight) / 2);
  const safePanX = clampNumber(Number(panX) || 0, -1, 1);
  const safePanY = clampNumber(Number(panY) || 0, -1, 1);

  return {
    x: (sourceWidth - cropWidth) / 2 + safePanX * maxX,
    y: (sourceHeight - cropHeight) / 2 + safePanY * maxY,
    width: cropWidth,
    height: cropHeight,
    maxX,
    maxY,
  };
}

export function getSheetLayout({
  pageId,
  photoWidthMm,
  photoHeightMm,
  marginMm = 6,
  gapMm = 4,
}) {
  const page = PASSPORT_SHEET_PAGES.find((entry) => entry.id === pageId);

  if (!page) {
    return {
      page: null,
      columns: 0,
      rows: 0,
      count: 0,
      positions: [],
      error: "Choose a printable sheet size.",
    };
  }

  if (
    !Number.isFinite(photoWidthMm) ||
    !Number.isFinite(photoHeightMm) ||
    photoWidthMm <= 0 ||
    photoHeightMm <= 0
  ) {
    return {
      page,
      columns: 0,
      rows: 0,
      count: 0,
      positions: [],
      error: "Enter a valid photo size first.",
    };
  }

  const availableWidth = page.widthMm - marginMm * 2;
  const availableHeight = page.heightMm - marginMm * 2;

  if (photoWidthMm > availableWidth || photoHeightMm > availableHeight) {
    return {
      page,
      columns: 0,
      rows: 0,
      count: 0,
      positions: [],
      error: "That photo is too large to fit on this sheet size.",
    };
  }

  const columns = Math.max(
    1,
    Math.floor((availableWidth + gapMm) / (photoWidthMm + gapMm))
  );
  const rows = Math.max(
    1,
    Math.floor((availableHeight + gapMm) / (photoHeightMm + gapMm))
  );
  const gridWidth = columns * photoWidthMm + (columns - 1) * gapMm;
  const gridHeight = rows * photoHeightMm + (rows - 1) * gapMm;
  const startX = (page.widthMm - gridWidth) / 2;
  const startY = (page.heightMm - gridHeight) / 2;
  const positions = [];

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      positions.push({
        row,
        column,
        xMm: startX + column * (photoWidthMm + gapMm),
        yMm: startY + row * (photoHeightMm + gapMm),
        widthMm: photoWidthMm,
        heightMm: photoHeightMm,
      });
    }
  }

  return {
    page,
    columns,
    rows,
    count: positions.length,
    positions,
    error: "",
  };
}
