import { useEffect, useState, useCallback } from "react";
import { HeaderBar } from "./components/HeaderBar.jsx";
import { Sidebar } from "./components/Sidebar.jsx";
import { CommandPalette } from "./components/CommandPalette.jsx";
import { Toast } from "./components/Toast.jsx";
import { navItems, site } from "./data/site.js";
import { useScrollSpy } from "./hooks/useScrollSpy.js";
import { useTheme } from "./hooks/useTheme.js";
import { Hero } from "./sections/Hero.jsx";
import { Career } from "./sections/Career.jsx";
import { Education } from "./sections/Education.jsx";
import { Work } from "./sections/Work.jsx";
import { About } from "./sections/About.jsx";
import { ArrowUp, Terminal, ShieldCheck } from "lucide-react";
import { playTactileClick } from "./utils/sound.js";

const NAV_IDS = navItems.map((item) => item.id);

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [commandDeckOpen, setCommandDeckOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("info");

  const activeIndex = useScrollSpy(NAV_IDS);
  const { isDark, toggle: toggleTheme } = useTheme();

  const showToast = useCallback((msg, type = "info") => {
    setToastMessage(msg);
    setToastType(type);
  }, []);

  const handleCopyEmail = useCallback(() => {
    try {
      navigator.clipboard.writeText(site.email);
      showToast(`Copied to clipboard: ${site.email}`, "success");
      playTactileClick("click");
    } catch {
      showToast(`Email: ${site.email}`, "info");
    }
  }, [showToast]);

  // Global keyboard shortcuts (Cmd+K, ?, T, 1-5, Esc)
  useEffect(() => {
    function onKeyDown(e) {
      const isInput =
        ["INPUT", "TEXTAREA"].includes(e.target.tagName) || e.target.isContentEditable;

      if (e.key === "Escape") {
        setMenuOpen(false);
        setCommandDeckOpen(false);
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandDeckOpen((prev) => !prev);
        playTactileClick("click");
        return;
      }

      if (!isInput) {
        if (e.key === "?") {
          e.preventDefault();
          setCommandDeckOpen(true);
          playTactileClick("click");
        } else if (e.key.toLowerCase() === "t") {
          e.preventDefault();
          toggleTheme();
          playTactileClick("switch");
          showToast(`Theme: ${isDark ? "Light" : "Dark"} mode`);
        } else if (["1", "2", "3", "4", "5"].includes(e.key)) {
          const index = parseInt(e.key, 10) - 1;
          if (NAV_IDS[index]) {
            e.preventDefault();
            const el = document.getElementById(NAV_IDS[index]);
            el?.scrollIntoView({ behavior: "smooth" });
            playTactileClick("click");
          }
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [toggleTheme, isDark, showToast]);

  const closeMenu = () => setMenuOpen(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    playTactileClick("click");
  };

  return (
    <div className="min-h-screen text-body selection:bg-accent selection:text-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:rounded-md focus:bg-heading focus:px-4 focus:py-2 focus:text-canvas font-mono text-xs"
      >
        Skip to main content
      </a>

      {/* Global Precision Header Telemetry Bar */}
      <HeaderBar
        onOpenMobile={() => setMenuOpen(true)}
        onOpenCommandDeck={() => setCommandDeckOpen(true)}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onTriggerToast={showToast}
      />

      {/* Mobile Drawer Backdrop */}
      <div
        onClick={closeMenu}
        className={`fixed inset-0 z-30 bg-black/50 backdrop-blur-xs transition-opacity duration-200 lg:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Left Sidebar Control Panel */}
      <Sidebar
        open={menuOpen}
        onClose={closeMenu}
        activeIndex={activeIndex}
        onCopyEmail={handleCopyEmail}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Viewport */}
      <div className="lg:pl-72">
        <main id="main" className="mx-auto max-w-3xl px-5 sm:px-8">
          <Hero
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            onOpenCommandDeck={() => setCommandDeckOpen(true)}
            onCopyEmail={handleCopyEmail}
          />
          <Career activeFilter={activeFilter} />
          <Education />
          <Work activeFilter={activeFilter} />
          <About onCopyEmail={handleCopyEmail} />
        </main>

        {/* Engineering Spec Footer */}
        <footer className="mt-20 border-t border-line bg-surface/40 py-10">
          <div className="mx-auto max-w-3xl px-5 sm:px-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between font-mono text-xs text-muted">
              <div>
                <p className="font-semibold text-heading uppercase">
                  {site.name} // {site.shortName}
                </p>
                <p className="mt-1 text-[11px]">
                  Engineered with React 19, Tailwind v4 &amp; Vite. No neon gimmicks.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setCommandDeckOpen(true);
                    playTactileClick("click");
                  }}
                  className="flex items-center gap-1 rounded border border-line bg-surface px-2 py-1 text-[11px] text-muted hover:text-heading hover:border-rule transition-colors"
                >
                  <Terminal className="size-3 text-accent" />
                  <span>DECK [⌘K]</span>
                </button>
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="flex items-center gap-1 rounded border border-line bg-surface px-2 py-1 text-[11px] text-muted hover:text-heading hover:border-rule transition-colors"
                >
                  <ArrowUp className="size-3" />
                  <span>TOP</span>
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between border-t border-line/60 pt-4 font-mono text-[10px] text-muted">
              <span>&copy; {new Date().getFullYear()} {site.name} · All rights reserved.</span>
              <span className="flex items-center gap-1">
                <span className="size-1.5 rounded-full bg-status-ok" />
                <span>ATYRAU, KZ [{site.coordinates}]</span>
              </span>
            </div>
          </div>
        </footer>
      </div>

      {/* Interactive Command Deck Modal */}
      <CommandPalette
        isOpen={commandDeckOpen}
        onClose={() => setCommandDeckOpen(false)}
        onCopyEmail={handleCopyEmail}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onTriggerToast={showToast}
      />

      {/* Global Toast Alerts */}
      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage("")}
      />
    </div>
  );
}
