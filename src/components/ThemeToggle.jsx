import { Sun, Moon } from "lucide-react";
import { useTheme } from "../hooks/useTheme.js";

export function ThemeToggle() {
  const { isDark, toggle } = useTheme();

  return (
    <button
      type="button"
      aria-label="Toggle color theme"
      onClick={toggle}
      className="fixed top-4 right-4 sm:top-6 sm:right-6 z-50 inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/10 dark:border-white/15 bg-white/80 dark:bg-black/80 backdrop-blur-md text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white hover:border-black/30 dark:hover:border-white/30 transition-colors cursor-pointer"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
