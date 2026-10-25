import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import {
  SITE_URL,
  canonicalUrlForPath,
  routeInventory,
} from "../src/routeMetadata.js";

const REPO_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);
const DIST_DIR = path.join(REPO_ROOT, "dist");
const TEMPLATE_PATH = path.join(DIST_DIR, "index.html");
const SITEMAP_PATH = path.join(REPO_ROOT, "public", "sitemap.xml");
const NOT_FOUND_PATH = path.join(DIST_DIR, "404.html");
const EXPECTED_SITEMAP_ROUTE_COUNT = 133;

const NOT_FOUND_METADATA = {
  title: "Page not found - CALVORO",
  description:
    "The page you requested could not be found. Return to CALVORO to use free online calculators and tools.",
  type: "WebPage",
};

const SUPPORTED_TYPES = new Set([
  "WebSite",
  "WebApplication",
  "WebPage",
  "article",
]);

function fail(message) {
  throw new Error(`[route-html] ${message}`);
}

function escapeText(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttribute(value) {
  return escapeText(value)
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function validateRoutePath(routePath, context) {
  if (typeof routePath !== "string" || routePath.length === 0) {
    fail(`${context}: route path must be a non-empty string.`);
  }

  if (!routePath.startsWith("/")) {
    fail(`${context}: route path must start with "/": ${routePath}`);
  }

  if (routePath !== "/" && routePath.endsWith("/")) {
    fail(`${context}: route path must not end with "/": ${routePath}`);
  }

  if (
    routePath.includes("?") ||
    routePath.includes("#") ||
    routePath.includes("\\") ||
    routePath.includes("//") ||
    routePath.includes("..")
  ) {
    fail(`${context}: route path contains invalid characters: ${routePath}`);
  }

  if (/\.html?$/i.test(routePath)) {
    fail(`${context}: route path must not include an HTML extension: ${routePath}`);
  }

  if (routePath.trim() !== routePath) {
    fail(`${context}: route path contains surrounding whitespace: "${routePath}"`);
  }
}

function parseSiteUrl(value, context) {
  let url;

  try {
    url = new URL(value);
  } catch {
    fail(`${context}: invalid URL: ${value}`);
  }

  if (url.protocol !== "https:") {
    fail(`${context}: URL must use HTTPS: ${value}`);
  }

  if (url.origin !== SITE_URL) {
    fail(`${context}: URL must use ${SITE_URL}: ${value}`);
  }

  if (url.search || url.hash) {
    fail(`${context}: URL must not contain a query or hash: ${value}`);
  }

  return url;
}

function validateInventory() {
  if (!Array.isArray(routeInventory) || routeInventory.length === 0) {
    fail("The route inventory is empty.");
  }

  const byPath = new Map();
  const canonicalOwners = new Map();

  for (const metadata of routeInventory) {
    validateRoutePath(metadata.path, "Route inventory");

    if (
      typeof metadata.title !== "string" ||
      metadata.title.trim().length === 0
    ) {
      fail(`Route ${metadata.path}: missing title metadata.`);
    }

    if (
      typeof metadata.description !== "string" ||
      metadata.description.trim().length === 0
    ) {
      fail(`Route ${metadata.path}: missing description metadata.`);
    }

    if (!SUPPORTED_TYPES.has(metadata.type)) {
      fail(
        `Route ${metadata.path}: unsupported metadata type "${metadata.type}".`
      );
    }

    if (byPath.has(metadata.path)) {
      fail(`Duplicate route inventory path: ${metadata.path}`);
    }

    byPath.set(metadata.path, metadata);

    const canonical = canonicalUrlForPath(metadata.path);

    parseSiteUrl(canonical, `Canonical for ${metadata.path}`);

    if (canonicalOwners.has(canonical)) {
      fail(
        `Duplicate canonical URL "${canonical}" for ${canonicalOwners.get(canonical)} and ${metadata.path}.`
      );
    }

    canonicalOwners.set(canonical, metadata.path);
  }

  return byPath;
}

function readSitemapPaths() {
  if (!fs.existsSync(SITEMAP_PATH)) {
    fail(`Sitemap not found: ${SITEMAP_PATH}`);
  }

  const xml = fs.readFileSync(SITEMAP_PATH, "utf8");
  const locations = [
    ...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g),
  ];

  if (locations.length === 0) {
    fail("The sitemap contains no <loc> entries.");
  }

  const paths = [];
  const seen = new Set();

  locations.forEach((match, index) => {
    const url = parseSiteUrl(
      match[1].trim(),
      `Sitemap entry ${index + 1}`
    );

    if (url.pathname !== "/" && url.pathname.endsWith("/")) {
      fail(
        `Sitemap entry ${index + 1} uses a trailing slash: ${url.href}`
      );
    }

    if (url.pathname.includes("\\") || url.pathname.includes("..")) {
      fail(
        `Sitemap entry ${index + 1} contains an invalid path: ${url.href}`
      );
    }

    validateRoutePath(url.pathname, `Sitemap entry ${index + 1}`);

    if (seen.has(url.pathname)) {
      fail(`Duplicate sitemap path: ${url.pathname}`);
    }

    seen.add(url.pathname);
    paths.push(url.pathname);
  });

  if (paths.length !== EXPECTED_SITEMAP_ROUTE_COUNT) {
    fail(
      `Expected ${EXPECTED_SITEMAP_ROUTE_COUNT} sitemap URLs, found ${paths.length}.`
    );
  }

  return paths;
}

function compareInventoryWithSitemap(byPath, sitemapPaths) {
  const sitemapSet = new Set(sitemapPaths);
  const inventoryPaths = [...byPath.keys()];
  const inventorySet = new Set(inventoryPaths);

  const missingMetadata = sitemapPaths.filter(
    (routePath) => !inventorySet.has(routePath)
  );
  const missingSitemapEntries = inventoryPaths.filter(
    (routePath) => !sitemapSet.has(routePath)
  );

  if (
    missingMetadata.length > 0 ||
    missingSitemapEntries.length > 0 ||
    inventoryPaths.length !== sitemapPaths.length
  ) {
    const details = [
      `Route inventory: ${inventoryPaths.length}`,
      `Sitemap URLs: ${sitemapPaths.length}`,
      missingMetadata.length > 0
        ? `Missing metadata: ${missingMetadata.join(", ")}`
        : "",
      missingSitemapEntries.length > 0
        ? `Missing sitemap entries: ${missingSitemapEntries.join(", ")}`
        : "",
    ]
      .filter(Boolean)
      .join("\n");

    fail(
      `Route inventory does not match the sitemap.\n${details}`
    );
  }
}

function stripManagedHeadTags(head) {
  let cleaned = head.replace(
    /<title\b[^>]*>[\s\S]*?<\/title>/gi,
    ""
  );

  cleaned = cleaned.replace(
    /<meta\b[^>]*?\/?>/gi,
    (tag) => {
      const nameMatch = tag.match(
        /\bname\s*=\s*["']([^"']+)["']/i
      );
      const propertyMatch = tag.match(
        /\bproperty\s*=\s*["']([^"']+)["']/i
      );
      const name = nameMatch ? nameMatch[1].toLowerCase() : "";
      const property = propertyMatch
        ? propertyMatch[1].toLowerCase()
        : "";

      if (
        name === "description" ||
        name === "robots" ||
        name.startsWith("twitter:")
      ) {
        return "";
      }

      if (property.startsWith("og:")) {
        return "";
      }

      return tag;
    }
  );

  cleaned = cleaned.replace(
    /<link\b[^>]*?\/?>/gi,
    (tag) =>
      /\brel\s*=\s*["']canonical["']/i.test(tag)
        ? ""
        : tag
  );

  cleaned = cleaned.replace(
    /<script\b[^>]*\bid\s*=\s*["']calvoro-structured-data["'][^>]*>[\s\S]*?<\/script>/gi,
    ""
  );

  return cleaned;
}

function stripAdsense(head) {
  return head
    .replace(
      /<script\b[^>]*\bsrc\s*=\s*["'][^"']*googlesyndication[^"']*["'][^>]*>\s*<\/script>/gi,
      ""
    )
    .replace(/<!--\s*Google AdSense\s*-->/gi, "");
}

function buildManagedTags(metadata, { notFound = false } = {}) {
  const title = escapeText(metadata.title);
  const description = escapeAttribute(metadata.description);
  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="${notFound ? "noindex, follow" : "index, follow"}" />`,
  ];

  if (!notFound) {
    const canonical = escapeAttribute(
      canonicalUrlForPath(metadata.path)
    );
    const ogType =
      metadata.type === "article" ? "article" : "website";

    tags.push(
      `<link rel="canonical" href="${canonical}" />`,
      `<meta property="og:title" content="${escapeAttribute(metadata.title)}" />`,
      `<meta property="og:description" content="${description}" />`,
      `<meta property="og:url" content="${canonical}" />`,
      `<meta property="og:type" content="${ogType}" />`,
      `<meta property="og:site_name" content="CALVORO" />`,
      `<meta name="twitter:card" content="summary" />`,
      `<meta name="twitter:title" content="${escapeAttribute(metadata.title)}" />`,
      `<meta name="twitter:description" content="${description}" />`
    );
  }

  return tags.join("\n    ");
}

function buildDocument(templateHead, metadata, { notFound = false } = {}) {
  let head = stripManagedHeadTags(templateHead);

  if (notFound) {
    head = stripAdsense(head);
  }

  const managedTags = buildManagedTags(metadata, { notFound });

  return `<head>${head.trimEnd()}\n\n    ${managedTags}\n  </head>`;
}

function countMatches(value, regex) {
  const matches = value.match(regex);

  return matches ? matches.length : 0;
}

function validateGeneratedDocument(
  html,
  metadata,
  { notFound = false } = {}
) {
  const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);

  if (!headMatch) {
    fail(`${metadata.path}: generated HTML has no <head> element.`);
  }

  const head = headMatch[1];
  const expectedCounts = notFound
    ? {
        title: 1,
        description: 1,
        robots: 1,
        canonical: 0,
        ogTitle: 0,
        ogDescription: 0,
        ogUrl: 0,
        ogType: 0,
        ogSiteName: 0,
        twitterCard: 0,
        twitterTitle: 0,
        twitterDescription: 0,
      }
    : {
        title: 1,
        description: 1,
        robots: 1,
        canonical: 1,
        ogTitle: 1,
        ogDescription: 1,
        ogUrl: 1,
        ogType: 1,
        ogSiteName: 1,
        twitterCard: 1,
        twitterTitle: 1,
        twitterDescription: 1,
      };

  const actualCounts = {
    title: countMatches(head, /<title\b/gi),
    description: countMatches(
      head,
      /<meta\b[^>]*\bname=["']description["']/gi
    ),
    robots: countMatches(
      head,
      /<meta\b[^>]*\bname=["']robots["']/gi
    ),
    canonical: countMatches(
      head,
      /<link\b[^>]*\brel=["']canonical["']/gi
    ),
    ogTitle: countMatches(
      head,
      /<meta\b[^>]*\bproperty=["']og:title["']/gi
    ),
    ogDescription: countMatches(
      head,
      /<meta\b[^>]*\bproperty=["']og:description["']/gi
    ),
    ogUrl: countMatches(
      head,
      /<meta\b[^>]*\bproperty=["']og:url["']/gi
    ),
    ogType: countMatches(
      head,
      /<meta\b[^>]*\bproperty=["']og:type["']/gi
    ),
    ogSiteName: countMatches(
      head,
      /<meta\b[^>]*\bproperty=["']og:site_name["']/gi
    ),
    twitterCard: countMatches(
      head,
      /<meta\b[^>]*\bname=["']twitter:card["']/gi
    ),
    twitterTitle: countMatches(
      head,
      /<meta\b[^>]*\bname=["']twitter:title["']/gi
    ),
    twitterDescription: countMatches(
      head,
      /<meta\b[^>]*\bname=["']twitter:description["']/gi
    ),
  };

  for (const [tagName, expectedCount] of Object.entries(
    expectedCounts
  )) {
    if (actualCounts[tagName] !== expectedCount) {
      fail(
        `${metadata.path}: expected ${expectedCount} ${tagName} tag(s), found ${actualCounts[tagName]}.`
      );
    }
  }

  const expectedRobots = notFound
    ? "noindex, follow"
    : "index, follow";

  if (
    !head.includes(
      `<meta name="robots" content="${expectedRobots}" />`
    )
  ) {
    fail(`${metadata.path}: robots metadata is incorrect.`);
  }

  if (
    !head.includes(
      `<title>${escapeText(metadata.title)}</title>`
    )
  ) {
    fail(`${metadata.path}: title metadata is incorrect.`);
  }

  if (
    !head.includes(
      `<meta name="description" content="${escapeAttribute(metadata.description)}" />`
    )
  ) {
    fail(`${metadata.path}: description metadata is incorrect.`);
  }

  if (!notFound) {
    const canonical = escapeAttribute(
      canonicalUrlForPath(metadata.path)
    );

    if (
      !head.includes(
        `<link rel="canonical" href="${canonical}" />`
      )
    ) {
      fail(`${metadata.path}: canonical metadata is incorrect.`);
    }

    if (
      !head.includes(
        `<meta property="og:url" content="${canonical}" />`
      )
    ) {
      fail(`${metadata.path}: Open Graph URL is incorrect.`);
    }
  }

  if (notFound && /googlesyndication/i.test(html)) {
    fail("404.html still contains an AdSense loader.");
  }
}

function validateAssetPaths(html, routePath) {
  if (!/\bsrc=["']\/assets\//.test(html)) {
    fail(`${routePath}: missing root-absolute /assets/ script path.`);
  }

  for (const match of html.matchAll(
    /\b(?:src|href)=["']([^"']+)["']/gi
  )) {
    const value = match[1];

    if (/^(?:https?:|data:|mailto:|#)/i.test(value)) {
      continue;
    }

    if (
      (value.includes("assets/") || value.includes("brand/")) &&
      !value.startsWith("/")
    ) {
      fail(
        `${routePath}: asset path must be root-absolute: ${value}`
      );
    }
  }

  if (/(?:src|href)=["']\.{1,2}\//i.test(html)) {
    fail(`${routePath}: relative asset path found.`);
  }
}

function outputPathForRoute(routePath) {
  if (routePath === "/") {
    return path.join(DIST_DIR, "index.html");
  }

  return path.join(
    DIST_DIR,
    `${routePath.slice(1)}.html`
  );
}

function writeDocument(outputPath, html, routePath) {
  const resolvedOutput = path.resolve(outputPath);
  const resolvedDist = path.resolve(DIST_DIR);

  if (
    resolvedOutput !== path.join(resolvedDist, "index.html") &&
    !resolvedOutput.startsWith(`${resolvedDist}${path.sep}`)
  ) {
    fail(
      `${routePath}: generated file escapes the dist directory: ${outputPath}`
    );
  }

  fs.mkdirSync(path.dirname(resolvedOutput), {
    recursive: true,
  });
  fs.writeFileSync(resolvedOutput, html, "utf8");
}

if (!fs.existsSync(TEMPLATE_PATH)) {
  fail(
    "dist/index.html was not found. Run `vite build` before this script."
  );
}

const templateHtml = fs.readFileSync(TEMPLATE_PATH, "utf8");
const templateHeadMatch = templateHtml.match(
  /<head>([\s\S]*?)<\/head>/i
);

if (!templateHeadMatch) {
  fail("dist/index.html has no <head> element.");
}

if (!/\bsrc=["']\/assets\//.test(templateHtml)) {
  fail(
    "dist/index.html does not use root-absolute /assets/ script paths."
  );
}

const inventoryByPath = validateInventory();
const sitemapPaths = readSitemapPaths();
compareInventoryWithSitemap(inventoryByPath, sitemapPaths);

const generatedFiles = new Set();

for (const metadata of routeInventory) {
  const outputPath = outputPathForRoute(metadata.path);
  const generatedHead = buildDocument(
    templateHeadMatch[1],
    metadata
  );
  const html = templateHtml.replace(
    /<head>[\s\S]*?<\/head>/i,
    () => generatedHead
  );

  validateGeneratedDocument(html, metadata);
  validateAssetPaths(html, metadata.path);

  const resolvedOutput = path.resolve(outputPath);

  if (generatedFiles.has(resolvedOutput)) {
    fail(
      `${metadata.path}: duplicate output file path: ${outputPath}`
    );
  }

  generatedFiles.add(resolvedOutput);
  writeDocument(outputPath, html, metadata.path);
}

const notFoundHead = buildDocument(
  templateHeadMatch[1],
  NOT_FOUND_METADATA,
  { notFound: true }
);
const notFoundHtml = templateHtml.replace(
  /<head>[\s\S]*?<\/head>/i,
  () => notFoundHead
);

validateGeneratedDocument(
  notFoundHtml,
  { ...NOT_FOUND_METADATA, path: "/404" },
  { notFound: true }
);
validateAssetPaths(notFoundHtml, "/404");
fs.writeFileSync(NOT_FOUND_PATH, notFoundHtml, "utf8");

for (const sitemapPath of sitemapPaths) {
  const outputPath = outputPathForRoute(sitemapPath);

  if (!fs.existsSync(outputPath)) {
    fail(
      `Generated route file is missing for sitemap URL ${sitemapPath}: ${outputPath}`
    );
  }
}

console.log(
  `[route-html] Generated ${routeInventory.length} route shells and 404.html in dist/.`
);
