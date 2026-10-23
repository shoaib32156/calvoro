import { Fragment } from "react";
import { Link } from "react-router-dom";

const tokenPattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)\s]+\))/g;

function safeHref(value) {
  if (/^\/(?!\/)/.test(value) || value.startsWith("#")) {
    return value;
  }

  if (/^(https?:\/\/|mailto:)/i.test(value)) {
    return value;
  }

  return null;
}

export default function RichText({ text }) {
  const value = String(text ?? "");
  const parts = value.split(tokenPattern).filter(Boolean);

  return (
    <Fragment>
      {parts.map((part, index) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={index}>{part.slice(2, -2)}</strong>;
        }

        const linkMatch = part.match(
          /^\[([^\]]+)\]\(([^)\s]+)\)$/
        );

        if (linkMatch) {
          const [, label, href] = linkMatch;
          const destination = safeHref(href);

          if (!destination) {
            return <Fragment key={index}>{label}</Fragment>;
          }

          if (destination.startsWith("/") || destination.startsWith("#")) {
            return (
              <Link key={index} to={destination}>
                {label}
              </Link>
            );
          }

          return (
            <a
              key={index}
              href={destination}
              target="_blank"
              rel="noopener noreferrer"
            >
              {label}
            </a>
          );
        }

        return <Fragment key={index}>{part}</Fragment>;
      })}
    </Fragment>
  );
}
