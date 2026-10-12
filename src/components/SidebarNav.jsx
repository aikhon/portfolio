import { useLayoutEffect, useRef, useState } from "react";
import { navItems } from "../data/site.js";
import { socials } from "../data/socials.js";
import { playTactileClick } from "../utils/sound.js";

export function SidebarNav({ activeIndex, onNavigate }) {
  const linkRefs = useRef([]);
  const [indicator, setIndicator] = useState(null);

  useLayoutEffect(() => {
    function place() {
      const el = linkRefs.current[activeIndex];
      if (el) {
        setIndicator({ top: el.offsetTop, height: el.offsetHeight });
      }
    }

    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [activeIndex]);

  return (
    <nav className="flex flex-col gap-6" aria-label="Main navigation">
      {/* Precision Track Navigation */}
      <div className="relative">
        {/* Animated active hairline rail */}
        <span
          aria-hidden="true"
          className="absolute left-0 w-0.5 rounded-full bg-accent transition-all duration-200 ease-out"
          style={{
            top: indicator?.top ?? 0,
            height: indicator?.height ?? 0,
            opacity: indicator ? 1 : 0,
          }}
        />

        <ul className="space-y-1">
          {navItems.map((item, i) => {
            const isActive = i === activeIndex;
            return (
              <li key={item.id}>
                <a
                  ref={(el) => {
                    linkRefs.current[i] = el;
                  }}
                  href={`#${item.id}`}
                  onClick={() => {
                    onNavigate();
                    playTactileClick("click");
                  }}
                  aria-current={isActive ? "true" : undefined}
                  className={`group flex items-center justify-between rounded-md px-3 py-2 font-mono text-xs transition-colors ${
                    isActive
                      ? "bg-surface-active font-semibold text-heading shadow-xs"
                      : "text-muted hover:bg-surface-subtle hover:text-heading"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className={`text-[10px] ${
                        isActive ? "text-accent font-bold" : "text-muted/60"
                      }`}
                    >
                      {item.code}
                    </span>
                    <span className="uppercase tracking-wider">{item.label}</span>
                  </span>
                  {isActive && (
                    <span className="size-1 rounded-full bg-accent animate-pulse" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Social Telemetry Links */}
      <div>
        <p className="px-3 pb-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted">
          COMMS & PROFILES
        </p>
        <ul className="flex flex-wrap gap-1 px-1">
          {socials.map(({ label, url, Icon }) => (
            <li key={label}>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                onClick={() => playTactileClick("click")}
                className="flex items-center gap-1.5 rounded-md border border-line bg-surface-subtle px-2 py-1.5 text-muted transition-all hover:border-rule hover:bg-surface-active hover:text-heading"
              >
                <Icon className={`size-3.5 shrink-0 ${label === "monkeytype" ? "scale-110 text-accent" : ""}`} />
                <span className="font-mono text-[11px] uppercase">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
