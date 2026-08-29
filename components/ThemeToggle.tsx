"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      type="button"
      role="switch"
      aria-checked={isDark}
      className={`
        relative inline-flex h-8 w-14 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent 
        transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
        shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)]
        ${isDark ? "bg-primary" : "bg-outline-variant"}
      `}
    >
      <span className="sr-only">Toggle theme</span>
      <span
        aria-hidden="true"
        className={`
          pointer-events-none inline-block h-6 w-6 transform rounded-full shadow-md ring-0 transition duration-300 ease-in-out
          ${isDark ? "translate-x-6 bg-on-primary" : "translate-x-0 bg-surface-container-lowest"}
        `}
      />
    </button>
  );
}
