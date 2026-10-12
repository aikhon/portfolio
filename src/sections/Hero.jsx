import { site } from "../data/site.js";
import { Mail, FileText, ExternalLink, MapPin, Zap, Flame, Trophy } from "lucide-react";
import { playTactileClick } from "../utils/sound.js";

export function Hero({ onCopyEmail }) {
  const telemetry = [
    {
      icon: MapPin,
      label: "Atyrau, Kazakhstan (UTC+5)",
      highlight: false,
    },
    {
      icon: Trophy,
      label: "WorldSkills 1st Place Champion",
      highlight: true,
    },
    {
      icon: Zap,
      label: "120+ WPM (Monkeytype)",
      highlight: false,
      url: "https://monkeytype.com/profile/pixeln",
    },
    {
      icon: Flame,
      label: "Endurance Distance Runner",
      highlight: false,
    },
  ];

  return (
    <section id="hero" className="pt-24 sm:pt-32 pb-14">
      {/* Name and Title */}
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-medium tracking-[-0.03em] text-neutral-900 dark:text-neutral-50">
          Alikhan Ikhlassov
        </h1>
        <p className="text-base sm:text-lg text-neutral-500 dark:text-neutral-400 font-normal">
          Full-stack developer &amp; systems engineer
        </p>
      </div>

      {/* Narrative */}
      <div className="mt-6 space-y-4 text-[15px] sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-400">
        <p>
          I'm a developer based in Atyrau, Kazakhstan. I focus on building reliable,
          high-throughput software—from customer-facing web platforms with React, .NET, and Python
          to hands-on field infrastructure, network routing, and containerized enterprise setups.
        </p>
        <p>
          I believe the best systems are forged through disciplined execution, clean primitives,
          and fast feedback loops. Whether it's architecting real-time transit ticketing for regional
          passengers or running 21km on a weekend morning, I value pacing, resilience, and finishing what I start.
        </p>
      </div>

      {/* Telemetry Chips */}
      <div className="mt-8 flex flex-wrap gap-2">
        {telemetry.map((item, idx) => {
          const Icon = item.icon;
          const content = (
            <>
              <Icon className="size-3.5 text-neutral-400 dark:text-neutral-500 shrink-0" />
              <span>{item.label}</span>
              {item.url && <ExternalLink className="size-3 text-neutral-400 shrink-0" />}
            </>
          );

          if (item.url) {
            return (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                onClick={() => playTactileClick("click")}
                className="inline-flex items-center gap-1.5 rounded-full border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] px-3 py-1 font-mono text-xs text-neutral-600 dark:text-neutral-400 hover:border-black/25 dark:hover:border-white/25 transition-colors"
              >
                {content}
              </a>
            );
          }

          return (
            <div
              key={idx}
              className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs ${
                item.highlight
                  ? "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                  : "border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.03] text-neutral-600 dark:text-neutral-400"
              }`}
            >
              {content}
            </div>
          );
        })}
      </div>

      {/* Action CTA Buttons */}
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => {
            onCopyEmail();
            playTactileClick("click");
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 transition-colors shadow-xs"
        >
          <Mail className="size-4" />
          <span>Contact</span>
        </button>

        <a
          href={site.resumeUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => playTactileClick("click")}
          className="inline-flex items-center gap-2 rounded-lg border border-black/[0.08] dark:border-white/[0.08] px-4 py-2 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-black/[0.02] dark:hover:bg-white/[0.04] transition-colors"
        >
          <FileText className="size-4 text-neutral-400" />
          <span>Resume (PDF)</span>
        </a>

        <a
          href="https://github.com/aikhon"
          target="_blank"
          rel="noreferrer"
          onClick={() => playTactileClick("click")}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
        >
          <span>GitHub</span>
          <ExternalLink className="size-3.5" />
        </a>

        <a
          href="https://t.me/ikhlasov"
          target="_blank"
          rel="noreferrer"
          onClick={() => playTactileClick("click")}
          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
        >
          <span>Telegram</span>
          <ExternalLink className="size-3.5" />
        </a>
      </div>
    </section>
  );
}
