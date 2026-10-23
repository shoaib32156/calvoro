import { Link } from "react-router-dom";
import {
  formatArticleDate,
  getReadTime,
} from "../../content/articles/index.js";

export default function ArticleCard({ article, variant = "default" }) {
  return (
    <Link
      to={`/blog/${article.slug}`}
      className={`calvoro-editorial-card calvoro-editorial-card-${variant}`}
    >
      <div className="calvoro-editorial-card-meta">
        <span className="calvoro-editorial-badge">{article.category}</span>
        <span>{getReadTime(article)}</span>
      </div>

      <h3>{article.title}</h3>
      <p>{article.excerpt}</p>

      <div className="calvoro-editorial-card-footer">
        <span>{formatArticleDate(article.date)}</span>
        <span className="calvoro-editorial-read-link">
          Read guide <b aria-hidden="true">→</b>
        </span>
      </div>
    </Link>
  );
}
