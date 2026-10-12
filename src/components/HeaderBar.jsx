import { useEffect, useState } from "react";
import {
  Menu,
  Moon,
  Sun,
  Volume2,
  VolumeX,
  Terminal,
  Activity,
} from "lucide-react";
import { site } from "../data/site.js";
import { playTactileClick, toggleSound, isSoundEnabled } from "../utils/sound.js";

export function HeaderBar({
  onOpenMobile,
  onOpenCommandDeck,
  isDark,
  toggleTheme,
  onTriggerToast,
}) {
  const [timeStr, setTimeStr] = useState("");
  const [soundActive, setSoundActive] = useState(isSoundEnabled());

  useEffect(() => {
    function updateClock() {
      try {
        const now = new Date();
        // Atyrau local time (UTC+5)
        const formatter = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Oral",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        });
        setTimeStr(formatter.format(now));
      } catch {
        setTimeStr(new Date().toLocaleTimeString());
      }
    }

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSoundToggle = () => {
    const next = toggleSound();
    setSoundActive(next);
    playTactileClick("beep");
    onTriggerToast(next ? "Tactile audio FX: Enabled" : "Tactile audio FX: Disabled");
  };

  const handleThemeToggle = () => {
    toggleTheme();
    playTactileClick("switch");
    onTriggerToast(`Theme: Switched to ${isDark ? "Light" : "Dark"} mode`);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-surface/85 backdrop-blur-md">
      <div className="flex h-12 items-center justify-between px-4 sm:px-6">
        {/* Left: Mobile trigger & Identity / Telemetry */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              onOpenMobile();
              playTactileClick("click");
            }}
            aria-label="Open navigation drawer"
            className="rounded p-1.5 text-muted hover:bg-canvas hover:text-heading lg:hidden transition-colors"
          >
            <Menu className="size-4" />
          </button>

          <div className="flex items-center gap-2 font-mono text-xs text-heading">
            <span className="font-semibold tracking-tight uppercase">
              {site.shortName}
            </span>
            <span className="hidden sm:inline text-muted">//</span>
            <span className="hidden sm:inline text-muted text-[11px]">
              ENG-STATION
            </span>
          </div>

          <div className="hidden min-[900px]:flex items-center gap-2 pl-3 border-l border-line font-mono text-[11px] text-muted">
            <Activity className="size-3 text-status-ok animate-pulse" />
            <span>ATYRAU, KZ [{site.coordinates}]</span>
          </div>
        </div>

        {/* Center / Right: Live Clock & Quick Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Live UTC+5 Ticker */}
          <div className="flex items-center gap-1.5 rounded border border-line bg-surface-subtle px-2 py-1 font-mono text-[11px] text-heading">
            <span className="size-1.5 rounded-full bg-status-ok" />
            <span className="text-muted hidden md:inline">UTC+5</span>
            <span className="tabular-nums font-medium">{timeStr || "00:00:00"}</span>
          </div>

          {/* Quick Command Deck Trigger */}
          <button
            type="button"
            onClick={() => {
              onOpenCommandDeck();
              playTactileClick("click");
            }}
            className="flex items-center gap-1.5 rounded border border-line bg-surface-subtle px-2 py-1 font-mono text-[11px] text-muted hover:border-rule hover:text-heading transition-colors"
            title="Open Command Deck (Ctrl+K or ?)"
          >
            <Terminal className="size-3 text-accent" />
            <span className="hidden md:inline">CMD</span>
            <span className="rounded bg-canvas px-1 py-0.2 text-[10px] text-heading">
              ⌘K
            </span>
          </button>

          {/* Tactile Audio Switch */}
          <button
            type="button"
            onClick={handleSoundToggle}
            className={`rounded border border-line p-1.5 text-xs transition-colors ${
              soundActive
                ? "bg-accent text-white border-accent"
                : "bg-surface-subtle text-muted hover:text-heading"
            }`}
            title={soundActive ? "Mute mechanical clicks" : "Enable tactile mechanical clicks"}
            aria-label="Toggle tactile sound effects"
          >
            {soundActive ? <Volume2 className="size-3.5" /> : <VolumeX className="size-3.5" />}
          </button>

          {/* Theme Switch */}
          <button
            type="button"
            onClick={handleThemeToggle}
            className="rounded border border-line bg-surface-subtle p-1.5 text-muted hover:border-rule hover:text-heading transition-colors"
            title={`Switch to ${isDark ? "Light" : "Dark"} mode`}
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
