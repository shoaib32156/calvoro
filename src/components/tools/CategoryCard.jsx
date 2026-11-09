import { Link } from "react-router-dom";
import { categoryColor, categoryIcons } from "../../design/categoryIcons.js";

export default function CategoryCard({
  category,
  description,
  count,
  href = `/tools?category=${encodeURIComponent(category)}`,
}) {
  const Icon = categoryIcons[category];

  return (
    <Link
      to={href}
      className="calvoro-category-card"
      style={{ "--cat": categoryColor(category) }}
    >
      <span className="calvoro-category-card-icon" aria-hidden="true">
        {Icon ? <Icon size={22} strokeWidth={1.8} /> : null}
      </span>

      <h3>{category}</h3>
      <p>{description}</p>

      <div className="calvoro-category-card-footer">
        <span className="calvoro-category-card-count">
          {count} {count === 1 ? "tool" : "tools"}
        </span>
        <span className="calvoro-category-card-arrow" aria-hidden="true">
          →
        </span>
      </div>
    </Link>
  );
}
