export const SUPPORTED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
];

export const MEME_IMAGE_LIMITS = {
  maxBytes: 20 * 1024 * 1024,
  maxPixels: 40_000_000,
  maxDimension: 8000,
};

export const PASSPORT_IMAGE_LIMITS = {
  maxBytes: 30 * 1024 * 1024,
  maxPixels: 60_000_000,
  maxDimension: 10000,
};

const EXTENSION_TYPES = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
};

export function detectImageType(bytes) {
  if (!bytes || bytes.length < 12) return "";

  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return "image/png";
  }

  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return "image/jpeg";
  }

  if (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return "image/webp";
  }

  return "";
}

export async function readImageSignature(file) {
  const buffer = await file.slice(0, 16).arrayBuffer();
  return detectImageType(new Uint8Array(buffer));
}

export function imageTypeLabel(type) {
  if (type === "image/png") return "PNG";
  if (type === "image/jpeg") return "JPEG";
  if (type === "image/webp") return "WebP";
  return "Unknown";
}

export function imageExtension(type) {
  if (type === "image/jpeg") return "jpg";
  if (type === "image/webp") return "webp";
  return "png";
}

export function validateImageMetadata({
  name = "",
  type = "",
  size = 0,
  signatureType = "",
  limits = MEME_IMAGE_LIMITS,
}) {
  const normalizedType = type === "image/jpg" ? "image/jpeg" : type;
  const maxMb = Math.round(limits.maxBytes / (1024 * 1024));

  if (!Number.isFinite(size) || size <= 0) {
    return { ok: false, type: "", error: "That file is empty or unreadable." };
  }

  if (size > limits.maxBytes) {
    return {
      ok: false,
      type: "",
      error: `That image is larger than ${maxMb} MB. Choose a smaller file.`,
    };
  }

  if (!SUPPORTED_IMAGE_TYPES.includes(signatureType)) {
    return {
      ok: false,
      type: "",
      error:
        "The file contents are not a supported PNG, JPEG, or WebP image.",
    };
  }

  if (normalizedType && !SUPPORTED_IMAGE_TYPES.includes(normalizedType)) {
    return {
      ok: false,
      type: "",
      error: "Choose a PNG, JPEG, or WebP image.",
    };
  }

  if (normalizedType && normalizedType !== signatureType) {
    return {
      ok: false,
      type: "",
      error:
        "The file's reported type does not match its contents. Choose the original image file.",
    };
  }

  const extension = String(name).split(".").pop().toLowerCase();
  const extensionType = EXTENSION_TYPES[extension];

  if (extensionType && extensionType !== signatureType) {
    return {
      ok: false,
      type: "",
      error:
        "The file extension does not match its contents. Choose the original image file.",
    };
  }

  return { ok: true, type: signatureType, error: "" };
}

export function validateImageDimensions(
  width,
  height,
  limits = MEME_IMAGE_LIMITS
) {
  if (!Number.isFinite(width) || !Number.isFinite(height)) {
    return "The image dimensions could not be read.";
  }

  if (width < 1 || height < 1) {
    return "The image has no readable dimensions.";
  }

  if (width > limits.maxDimension || height > limits.maxDimension) {
    return `Keep each image side at or below ${limits.maxDimension.toLocaleString()} pixels.`;
  }

  if (width * height > limits.maxPixels) {
    return `That image is larger than ${Math.round(
      limits.maxPixels / 1_000_000
    )} megapixels. Resize it first.`;
  }

  return "";
}

export function wrapTextLines(measureText, text, maxWidth, maxLines = 6) {
  const normalized = String(text || "")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalized || maxWidth <= 0 || maxLines < 1) return [];

  const words = normalized.split(" ");
  const lines = [];
  let current = "";

  const pushLongWord = (word) => {
    let part = "";

    for (const character of word) {
      const candidate = part + character;
      if (!part || measureText(candidate) <= maxWidth) {
        part = candidate;
      } else {
        lines.push(part);
        part = character;
      }
    }

    current = part;
  };

  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;

    if (measureText(candidate) <= maxWidth) {
      current = candidate;
      continue;
    }

    if (current) {
      lines.push(current);
      current = "";
    }

    if (measureText(word) <= maxWidth) {
      current = word;
    } else {
      pushLongWord(word);
    }
  }

  if (current) lines.push(current);

  if (lines.length <= maxLines) return lines;

  const kept = lines.slice(0, maxLines);
  let last = kept[kept.length - 1];

  while (last && measureText(`${last}…`) > maxWidth) {
    last = last.slice(0, -1).trimEnd();
  }

  kept[kept.length - 1] = `${last}…`;
  return kept;
}

export function getScaledPreviewSize(
  width,
  height,
  maxWidth = 1400,
  maxHeight = 900
) {
  const scale = Math.min(1, maxWidth / width, maxHeight / height);
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
    scale,
  };
}

export function canvasToBlob(canvas, type, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("The browser could not encode this image."));
      },
      type,
      quality
    );
  });
}
