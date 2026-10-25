import { useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
  canonicalUrlForPath,
  getRouteMetadata,
} from "./routeMetadata";

export { SITE_URL } from "./routeMetadata";

function setMeta(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function setProperty(property, content) {
  let tag = document.querySelector(
    `meta[property="${property}"]`
  );

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

function setCanonical(url) {
  let canonical = document.querySelector(
    'link[rel="canonical"]'
  );

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }

  canonical.setAttribute("href", url);
}

function setStructuredData(data) {
  let script = document.getElementById(
    "calvoro-structured-data"
  );

  if (!script) {
    script = document.createElement("script");
    script.id = "calvoro-structured-data";
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}

export default function SEO({
  title,
  description,
  type,
  jsonLd,
  noindex = false,
}) {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname || "/";

    const routeSEO = getRouteMetadata(path);

    const seo = title
      ? {
          title,
          description:
            description ||
            routeSEO.description,
          type:
            type ||
            routeSEO.type,
        }
      : routeSEO;

    const canonicalURL =
      canonicalUrlForPath(path);

    document.title = seo.title;

    setMeta(
      "description",
      seo.description
    );

    setMeta(
      "robots",
      noindex
        ? "noindex, follow"
        : "index, follow"
    );

    setCanonical(canonicalURL);

    setProperty(
      "og:title",
      seo.title
    );

    setProperty(
      "og:description",
      seo.description
    );

    setProperty(
      "og:url",
      canonicalURL
    );

    setProperty(
      "og:type",
      seo.type === "article" ? "article" : "website"
    );

    setProperty(
      "og:site_name",
      "CALVORO"
    );

    setMeta(
      "twitter:card",
      "summary"
    );

    setMeta(
      "twitter:title",
      seo.title
    );

    setMeta(
      "twitter:description",
      seo.description
    );

    const structuredData =
      jsonLd ||
      (seo.type === "WebApplication"
        ? {
            "@context":
              "https://schema.org",
            "@type":
              "WebApplication",
            name:
              seo.title,
            description:
              seo.description,
            url:
              canonicalURL,
            applicationCategory:
              "UtilitiesApplication",
            operatingSystem:
              "All",
            isAccessibleForFree:
              true,
            publisher: {
              "@type":
                "Organization",
              name:
                "CALVORO",
            },
          }
        : {
            "@context":
              "https://schema.org",
            "@type":
              seo.type,
            name:
              seo.title,
            description:
              seo.description,
            url:
              canonicalURL,
            publisher: {
              "@type":
                "Organization",
              name:
                "CALVORO",
            },
          });

    setStructuredData(
      structuredData
    );
  }, [
    location.pathname,
    title,
    description,
    type,
    jsonLd,
    noindex,
  ]);

  return null;
}
