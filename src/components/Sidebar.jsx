import { site } from "../data/site.js";
import { SidebarNav } from "./SidebarNav.jsx";
import { Copy, FileDown, X, Terminal, Cpu } from "lucide-react";
import { playTactileClick } from "../utils/sound.js";

export function Sidebar({ open, onClose, activeIndex, onCopyEmail }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-line bg-surface px-5 py-6 transition-transform duration-200 lg:translate-x-0 ${
        open ? "translate-x-0 shadow-2xl" : "-translate-x-full"
      }`}
    >
      {/* Mobile Close Button */}
      <div className="flex items-center justify-between pb-4 lg:hidden">
        <span className="font-mono text-xs uppercase tracking-wider text-muted">
          // NAVIGATION MENU
        </span>
        <button
          type="button"
          onClick={() => {
            onClose();
            playTactileClick("click");
          }}
          aria-label="Close menu"
          className="rounded p-1.5 text-muted hover:bg-canvas hover:text-heading"
        >
          <X className="size-4" />
        </button>
      </div>

      {/* Engineer Identity Monogram */}
      <div className="border-b border-line pb-6">
        <div className="flex items-center gap-3">
          <div className="relative flex size-10 items-center justify-center rounded-lg border border-line bg-surface-subtle font-mono text-sm font-bold text-heading">
            AI
            <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full border-2 border-surface bg-status-ok" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="font-mono text-sm font-semibold tracking-tight text-heading">
                {site.name}
              </h2>
            </div>
            <p className="font-mono text-[11px] text-muted">@{site.shortName}</p>
          </div>
        </div>

        {/* Live operational badge */}
        <div className="mt-3 flex items-center gap-2 rounded-md border border-line/60 bg-surface-subtle px-2.5 py-1.5">
          <span className="size-1.5 rounded-full bg-status-ok animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-body">
            {site.status}
          </span>
        </div>

        {/* Quick Contact & CV actions */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => {
              onCopyEmail();
              playTactileClick("click");
            }}
            className="flex items-center justify-center gap-1.5 rounded-md border border-line bg-surface-subtle px-2.5 py-1.5 font-mono text-[11px] text-heading hover:border-rule hover:bg-surface-active transition-colors"
            title="Copy email to clipboard"
          >
            <Copy className="size-3 text-accent" />
            <span>COPY EMAIL</span>
          </button>
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => playTactileClick("click")}
            className="flex items-center justify-center gap-1.5 rounded-md border border-line bg-surface-subtle px-2.5 py-1.5 font-mono text-[11px] text-heading hover:border-rule hover:bg-surface-active transition-colors"
          >
            <FileDown className="size-3 text-accent" />
            <span>GET CV</span>
          </a>
        </div>
      </div>

      {/* Nav List */}
      <div className="mt-6 flex-1 overflow-y-auto pr-1">
        <SidebarNav activeIndex={activeIndex} onNavigate={onClose} />
      </div>

      {/* Hardware / Architecture Spec Footer */}
      <div className="border-t border-line pt-4">
        <div className="flex items-center justify-between font-mono text-[10px] text-muted">
          <div className="flex items-center gap-1.5">
            <Cpu className="size-3 text-muted" />
            <span>REACT 19 · TW4</span>
          </div>
          <span className="text-[10px]">BUILD v2.6.4</span>
        </div>
      </div>
    </aside>
  );
}
