// frontend/src/components/ThemeToggle.tsx
"use client";

import { useTheme } from "./ThemeProvider";

const themeLabels: Record<string, string> = {
  light: "Light",
  dark: "Dark",
  forest: "Forest",
};

export default function ThemeToggle() {
  const { theme, cycleTheme } = useTheme();

  return (
    <button className="theme-toggle" onClick={cycleTheme}>
      <span className="theme-indicator" />
      <span className="theme-label">{themeLabels[theme]} mode</span>
    </button>
  );
}
