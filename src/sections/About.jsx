import { PhotoGrid } from "../components/PhotoGrid.jsx";
import { photos } from "../data/photos.js";
import { Flame, Zap, ExternalLink } from "lucide-react";
import { playTactileClick } from "../utils/sound.js";

export function About() {
  return (
    <section id="notes" className="mt-16 pt-14 border-t border-black/[0.08] dark:border-white/[0.08]">
      <div className="flex items-center justify-between">
        <h2 className="text-xs uppercase text-neutral-400 dark:text-neutral-500 tracking-wider font-medium">
          Field Notes &amp; Outside The Terminal
        </h2>
        <span className="font-mono text-xs text-neutral-400 dark:text-neutral-500">
          04 // 04
        </span>
      </div>

      <div className="mt-6 space-y-4">
        {/* Dual Cards: Runner & Typist */}
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
          {/* Runner */}
          <div className="rounded-xl border border-black/[0.08] dark:border-white/[0.08] p-5 bg-black/[0.015] dark:bg-white/[0.02]">
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
              <Flame className="size-4" />
              <span className="text-xs font-medium uppercase tracking-wider">
                Distance Runner
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              Long-distance running is my discipline framework. Pacing over rushing,
              staying calm under pressure, and breaking complex multi-month milestones
              into consistent daily iterations.
            </p>
          </div>

          {/* Typist */}
          <div className="rounded-xl border border-black/[0.08] dark:border-white/[0.08] p-5 bg-black/[0.015] dark:bg-white/[0.02]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                <Zap className="size-4" />
                <span className="text-xs font-medium uppercase tracking-wider">
                  Input Speed
                </span>
              </div>
              <a
                href="https://monkeytype.com/profile/pixeln"
                target="_blank"
                rel="noreferrer"
                onClick={() => playTactileClick("click")}
                className="inline-flex items-center gap-1 font-mono text-[11px] text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <span>pixeln</span>
                <ExternalLink className="size-3" />
              </a>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
              120+ WPM on Monkeytype. Fast touch-typing and mechanical muscle memory keep
              the speed of implementation directly synchronized with mental velocity.
            </p>
          </div>
        </div>

        {/* Photography Grid */}
        <div className="pt-2">
          <p className="mb-3 text-xs text-neutral-400 dark:text-neutral-500 font-mono">
            // SNAPSHOTS FROM ATYRAU &amp; BEYOND
          </p>
          <PhotoGrid photos={photos} />
        </div>
      </div>
    </section>
  );
}
