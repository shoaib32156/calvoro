import { createElement } from "react";
import { iconForTool } from "../../design/categoryIcons.js";

export default function ToolGlyph({ tool, size = 20, strokeWidth = 1.8 }) {
  return createElement(iconForTool(tool), {
    size,
    strokeWidth,
    "aria-hidden": true,
  });
}
