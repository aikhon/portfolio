import { site } from "../data/site.js";
import {
  Mail,
  FileText,
  Terminal,
  MapPin,
  Cpu,
  Trophy,
  Zap,
  ArrowDown,
  Layers,
} from "lucide-react";
import { playTactileClick } from "../utils/sound.js";

export function Hero({
  activeFilter,
  onFilterChange,
  onOpenCommandDeck,
  onCopyEmail,
}) {
  const domains = [
    { id: "all", label: "ALL DISCIPLINES", count: "6 EXP / 4 PROJ" },
    { id: "swe", label: "FULL-STACK SWE", count: ".NET · REACT · DJANGO" },
    { id: "systems", label: "SYSTEMS & FIELD IT", count: "LAN · PXE · HARDWARE" },
    { id: "automation", label: "AUTOMATION", count: "SCRIPTS · API · BOT" },
  ];

  return (
    <section id="home" className="pt-10 sm:pt-16 pb-12">
      {/* Station Header Chip */}
      <div className="flex flex-wrap items-center gap-2 pb-4 font-mono text-xs text-muted">
        <span className="flex items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-heading">
          <span className="size-2 rounded-full bg-status-ok animate-pulse" />
          <span className="font-medium">AVAILABLE FOR HIRE</span>
        </span>
        <span>//</span>
        <span className="flex items-center gap-1">
          <MapPin className="size-3 text-accent" />
          <span>ATYRAU, KAZAKHSTAN</span>
        </span>
      </div>

      {/* Main Title Banner */}
      <div className="space-y-3">
        <h1 className="font-mono text-3xl font-bold tracking-tight text-heading sm:text-5xl lg:text-6xl">
          Alikhan Ikhlassov
        </h1>
        <p className="font-mono text-sm sm:text-base font-medium text-accent">
          &gt; full-stack developer &bull; systems &amp; field it engineer
        </p>
      </div>

      {/* Core Mission & Narrative */}
      <p className="mt-6 text-base sm:text-lg leading-relaxed text-body max-w-2xl">
        Bridging resilient modern web platforms with real-world infrastructure.
        From shipping full-stack transit ticketing systems and POS architectures (.NET, React, Python)
        to configuring containerized field networks and enterprise automation scripts in Western Kazakhstan.
      </p>

      {/* Engineering Spec Matrix (Tactile 4-grid) */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg border border-line bg-surface p-3 transition-colors hover:border-rule">
          <div className="flex items-center gap-1.5 text-accent font-mono text-[10px] font-semibold uppercase">
            <Cpu className="size-3" />
            <span>CORE STACK</span>
          </div>
          <p className="mt-1 font-mono text-xs font-medium text-heading">
            React · .NET · Django
          </p>
          <p className="mt-0.5 text-[11px] text-muted">Next.js · Docker · SQL</p>
        </div>

        <div className="rounded-lg border border-line bg-surface p-3 transition-colors hover:border-rule">
          <div className="flex items-center gap-1.5 text-accent font-mono text-[10px] font-semibold uppercase">
            <Trophy className="size-3" />
            <span>ACCOLADES</span>
          </div>
          <p className="mt-1 font-mono text-xs font-medium text-heading">
            WorldSkills 1st
          </p>
          <p className="mt-0.5 text-[11px] text-muted">IT Solutions &amp; Web</p>
        </div>

        <div className="rounded-lg border border-line bg-surface p-3 transition-colors hover:border-rule">
          <div className="flex items-center gap-1.5 text-accent font-mono text-[10px] font-semibold uppercase">
            <Zap className="size-3" />
            <span>TYPING SPEED</span>
          </div>
          <p className="mt-1 font-mono text-xs font-medium text-heading">
            120+ WPM
          </p>
          <p className="mt-0.5 text-[11px] text-muted">Monkeytype (pixeln)</p>
        </div>

        <div className="rounded-lg border border-line bg-surface p-3 transition-colors hover:border-rule">
          <div className="flex items-center gap-1.5 text-accent font-mono text-[10px] font-semibold uppercase">
            <Layers className="size-3" />
            <span>FIELD DISCIPLINE</span>
          </div>
          <p className="mt-1 font-mono text-xs font-medium text-heading">
            Field IT &amp; LAN
          </p>
          <p className="mt-0.5 text-[11px] text-muted">PXE · DHCP · Hardware</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap gap-2.5">
        <button
          type="button"
          onClick={() => {
            onCopyEmail();
            playTactileClick("click");
          }}
          className="flex items-center gap-2 rounded-lg bg-heading px-4 py-2.5 font-mono text-xs font-medium text-canvas hover:opacity-90 transition-opacity"
        >
          <Mail className="size-3.5" />
          <span>CONTACT ME</span>
        </button>

        <a
          href="#work"
          onClick={() => playTactileClick("click")}
          className="flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 font-mono text-xs font-medium text-heading hover:bg-surface-active hover:border-rule transition-colors"
        >
          <ArrowDown className="size-3.5 text-accent" />
          <span>VIEW PROJECTS</span>
        </a>

        <a
          href={site.resumeUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => playTactileClick("click")}
          className="flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 font-mono text-xs font-medium text-heading hover:bg-surface-active hover:border-rule transition-colors"
        >
          <FileText className="size-3.5 text-muted" />
          <span>CURRICULUM VITAE</span>
        </a>

        <button
          type="button"
          onClick={() => {
            onOpenCommandDeck();
            playTactileClick("click");
          }}
          className="flex items-center gap-2 rounded-lg border border-line bg-surface-subtle px-3 py-2.5 font-mono text-xs text-muted hover:text-heading hover:border-rule transition-colors"
          title="Open interactive terminal"
        >
          <Terminal className="size-3.5 text-accent" />
          <span className="hidden sm:inline">TERMINAL</span>
          <span className="text-[10px] bg-canvas px-1.5 py-0.5 rounded border border-line">⌘K</span>
        </button>
      </div>

      {/* Interactive Domain Filter Strip */}
      <div className="mt-10 rounded-xl border border-line bg-surface p-2 sm:p-3 shadow-xs">
        <div className="mb-2 flex items-center justify-between px-1 font-mono text-[11px] text-muted">
          <span>// FILTER PERSPECTIVE ACROSS PORTFOLIO:</span>
          <span className="text-[10px] uppercase text-accent font-semibold">
            {domains.find((d) => d.id === activeFilter)?.label}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
          {domains.map((dom) => {
            const isSelected = activeFilter === dom.id;
            return (
              <button
                key={dom.id}
                type="button"
                onClick={() => {
                  onFilterChange(dom.id);
                  playTactileClick("switch");
                }}
                className={`flex flex-col items-start rounded-lg p-2 text-left transition-all ${
                  isSelected
                    ? "bg-surface-active border border-rule text-heading shadow-xs"
                    : "border border-transparent text-muted hover:bg-surface-subtle hover:text-heading"
                }`}
              >
                <span className="font-mono text-[11px] font-semibold">
                  {dom.label}
                </span>
                <span className="font-mono text-[9px] text-muted mt-0.5 truncate w-full">
                  {dom.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
