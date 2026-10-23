import { Link } from "react-router-dom";

export default function Breadcrumbs({ items, tone = "light" }) {
  return (
    <nav
      className={`calvoro-breadcrumbs calvoro-breadcrumbs-${tone}`}
      aria-label="Breadcrumb"
    >
      <ol>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`}>
              {isLast || !item.to ? (
                <span aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              ) : (
                <Link to={item.to}>{item.label}</Link>
              )}
              {!isLast && <b aria-hidden="true">/</b>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
