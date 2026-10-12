import { useState, useEffect } from "react";
import { Sun, Moon, Volume2, VolumeX } from "lucide-react";
import { playTactileClick, toggleSound, isSoundEnabled } from "../utils/sound.js";

export function Navbar({ isDark, toggleTheme, onTriggerToast }) {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero", "work", "experience", "accolades", "notes", "contact"];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const next = toggleSound();
    setSoundOn(next);
    playTactileClick("beep");
    onTriggerToast(next ? "Tactile audio enabled" : "Tactile audio muted");
  };

  const navLinks = [
    { id: "work", label: "Work" },
    { id: "experience", label: "Experience" },
    { id: "accolades", label: "Accolades" },
    { id: "notes", label: "Notes" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4 sm:pt-6 pointer-events-none">
      <nav
        aria-label="Main Navigation"
        className="pointer-events-auto flex items-center justify-between gap-3 sm:gap-6 rounded-full border border-black/[0.08] dark:border-white/[0.1] bg-white/80 dark:bg-neutral-950/80 px-3.5 py-1.5 backdrop-blur-md shadow-xs transition-colors"
      >
        {/* Left: Brand Moniker + Status */}
        <a
          href="#hero"
          onClick={() => playTactileClick("click")}
          className="flex items-center gap-2 pr-1 font-mono text-xs font-semibold text-neutral-900 dark:text-neutral-100 hover:opacity-80 transition-opacity"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="tracking-tight">aikhon</span>
        </a>

        {/* Center: Clean Section Links */}
        <div className="hidden sm:flex items-center gap-1 text-[13px]">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => playTactileClick("click")}
                className={`rounded-full px-2.5 py-1 transition-colors ${
                  isActive
                    ? "font-medium text-neutral-900 dark:text-white bg-black/[0.04] dark:bg-white/[0.08]"
                    : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Right: Sound FX and Theme Toggle */}
        <div className="flex items-center gap-1 border-l border-black/[0.08] dark:border-white/[0.1] pl-2">
          <button
            type="button"
            onClick={handleSoundToggle}
            aria-label="Toggle tactile clicks"
            className={`rounded-full p-1.5 transition-colors ${
              soundOn
                ? "text-amber-600 dark:text-amber-400"
                : "text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-200"
            }`}
            title={soundOn ? "Mute clicks" : "Enable tactile clicks"}
          >
            {soundOn ? <Volume2 className="size-3.5" /> : <VolumeX className="size-3.5" />}
          </button>

          <button
            type="button"
            onClick={() => {
              toggleTheme();
              playTactileClick("switch");
            }}
            aria-label="Toggle theme"
            className="rounded-full p-1.5 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
            title={`Switch to ${isDark ? "Light" : "Dark"} mode`}
          >
            {isDark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
          </button>
        </div>
      </nav>
    </header>
  );
}
