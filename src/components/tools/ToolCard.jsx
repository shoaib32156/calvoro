import { Link } from "react-router-dom";
import { categoryColor } from "../../design/categoryIcons.js";
import ToolGlyph from "./ToolGlyph.jsx";

export default function ToolCard({
  tool,
  action = "Open tool",
  badge,
}) {
  return (
    <Link
      to={tool.path}
      className="calvoro-tool-card"
      style={{ "--cat": categoryColor(tool.category) }}
    >
      <div className="calvoro-tool-card-top">
        <span className="calvoro-tool-icon" aria-hidden="true">
          <ToolGlyph tool={tool} />
        </span>

        {badge ? <span className="calvoro-tool-popular">{badge}</span> : null}
      </div>

      <h3>{tool.name}</h3>
      <p>{tool.description}</p>

      <div className="calvoro-tool-card-footer">
        <span className="calvoro-tool-card-category">{tool.category}</span>
        <span className="calvoro-tool-card-open">
          {action} <b aria-hidden="true">→</b>
        </span>
      </div>
    </Link>
  );
}
