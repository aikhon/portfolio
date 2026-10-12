import { Section } from "../components/Section.jsx";
import { PhotoGrid } from "../components/PhotoGrid.jsx";
import { photos } from "../data/photos.js";
import { site } from "../data/site.js";
import {
  Heart,
  Flame,
  Zap,
  Compass,
  MessageCircle,
  Mail,
  Copy,
  ExternalLink,
} from "lucide-react";
import { playTactileClick } from "../utils/sound.js";

export function About({ onCopyEmail }) {
  return (
    <Section
      id="about"
      code="05"
      title="field notes & telemetry"
      subtitle="The runner, typist, and system engineer behind the shell"
    >
      {/* Bio Cards Grid */}
      <div className="space-y-6">
        <div className="rounded-xl border border-line bg-surface p-6 shadow-xs leading-relaxed text-body">
          <p className="text-base text-heading font-medium">
            A developer with relentless curiosity and real-world grit.
          </p>
          <p className="mt-3 text-sm">
            I spend most of my waking hours at the terminal and editor—mastering backend system design,
            concurrency, and infrastructure reliability. An acute listener and fast learner who adapts
            rapidly to evolving tech stacks.
          </p>
          <p className="mt-3 text-sm text-muted">
            Whether it's wiring up physical network equipment in field offices or designing
            clean microservices and UI flows, I focus on shipping things that work reliably.
          </p>
        </div>

        {/* Hobbies & Discipline Telemetry */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Runner Telemetry */}
          <div className="rounded-xl border border-line bg-surface p-5">
            <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase text-accent">
              <Flame className="size-4" />
              <span>ENDURANCE &amp; DISTANCE RUNNING</span>
            </div>
            <p className="mt-2 text-xs text-muted font-mono">
              STATUS: HALF-MARATHON PACING
            </p>
            <p className="mt-2 text-sm text-body leading-relaxed">
              Long-distance running is my discipline framework. Pacing over sprinting,
              staying calm under pressure, and breaking daunting 42km challenges into methodical 1km steps.
            </p>
          </div>

          {/* Monkeytype & Velocity */}
          <div className="rounded-xl border border-line bg-surface p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase text-accent">
                <Zap className="size-4" />
                <span>INPUT SPEED &amp; KEYBOARDS</span>
              </div>
              <a
                href="https://monkeytype.com/profile/pixeln"
                target="_blank"
                rel="noreferrer"
                onClick={() => playTactileClick("click")}
                className="font-mono text-[11px] text-muted hover:text-heading flex items-center gap-1"
              >
                <span>pixeln</span>
                <ExternalLink className="size-3" />
              </a>
            </div>
            <p className="mt-2 text-xs text-muted font-mono">
              RECORD: 120+ WPM (MONKEYTYPE)
            </p>
            <p className="mt-2 text-sm text-body leading-relaxed">
              Fast typing keeps code output synchronized with thought. Mechanical switches,
              vim motions, and high-velocity muscle memory for instant iteration speed.
            </p>
          </div>
        </div>

        {/* Direct Comms Box */}
        <div className="rounded-xl border border-line bg-surface-subtle p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-mono text-xs font-semibold uppercase text-heading">
                TRANSMIT A MESSAGE
              </p>
              <p className="mt-1 text-xs text-muted">
                Open to full-stack, backend, and infrastructure opportunities in Kazakhstan or remote worldwide.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  onCopyEmail();
                  playTactileClick("click");
                }}
                className="flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-2 font-mono text-xs text-heading hover:bg-surface-active transition-colors"
              >
                <Copy className="size-3.5 text-accent" />
                <span>COPY EMAIL</span>
              </button>
              <a
                href="https://t.me/ikhlasov"
                target="_blank"
                rel="noreferrer"
                onClick={() => playTactileClick("click")}
                className="flex items-center gap-1.5 rounded-lg bg-heading px-3 py-2 font-mono text-xs font-medium text-canvas hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="size-3.5" />
                <span>TELEGRAM</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Field Photography Grid */}
      <PhotoGrid photos={photos} />
    </Section>
  );
}
