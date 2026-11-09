import {
  Briefcase,
  Calculator,
  CalendarDays,
  Code2,
  Compass,
  Dumbbell,
  FileStack,
  FileText,
  Gamepad2,
  GraduationCap,
  HeartPulse,
  Image,
  KeyRound,
  Landmark,
  Palette,
  Percent,
  QrCode,
  Sparkles,
  Timer,
  Type,
} from "lucide-react";

export const categoryColors = {
  Math: "var(--color-cat-mathematics)",
  Finance: "var(--color-cat-finance)",
  Business: "var(--color-cat-business)",
  "Date & Time": "var(--color-cat-datetime)",
  Health: "var(--color-cat-health)",
  Education: "var(--color-cat-education)",
  Everyday: "var(--color-cat-everyday)",
  Fitness: "var(--color-cat-fitness)",
  PDF: "var(--color-cat-pdf)",
  Image: "var(--color-cat-image)",
  Text: "var(--color-cat-text)",
  Developer: "var(--color-cat-developer)",
  Productivity: "var(--color-cat-productivity)",
  Design: "var(--color-cat-design)",
  Games: "var(--color-cat-games)",
  "AI Tools": "var(--color-cat-ai)",
};

export const categoryIcons = {
  Math: Percent,
  Finance: Landmark,
  Business: Briefcase,
  "Date & Time": CalendarDays,
  Health: HeartPulse,
  Education: GraduationCap,
  Everyday: Compass,
  Fitness: Dumbbell,
  PDF: FileStack,
  Image,
  Text: Type,
  Developer: Code2,
  Productivity: Timer,
  Design: Palette,
  Games: Gamepad2,
  "AI Tools": Sparkles,
};

const toolIcons = {
  "/pdf-studio": FileStack,
  "/image-studio": Image,
  "/word-counter": Type,
  "/qr-code-generator": QrCode,
  "/password-generator": KeyRound,
  "/pomodoro-timer": Timer,
  "/json-formatter": Code2,
  "/csv-viewer": FileText,
  "/markdown-previewer": FileText,
};

export function categoryColor(category) {
  return categoryColors[category] || "var(--color-brand-primary)";
}

export function iconForTool(tool) {
  return toolIcons[tool.path] || categoryIcons[tool.category] || Calculator;
}
