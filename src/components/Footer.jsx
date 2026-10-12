import { Copy, Mail, MessageCircle, ArrowUp } from "lucide-react";
import { site } from "../data/site.js";
import { socials } from "../data/socials.js";
import { playTactileClick } from "../utils/sound.js";

export function Footer({ onCopyEmail }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    playTactileClick("click");
  };

  return (
    <footer id="contact" className="mt-20 border-t border-black/[0.08] dark:border-white/[0.08] pt-14 pb-16">
      {/* Contact Banner */}
      <div className="rounded-xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.02] p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-medium text-neutral-900 dark:text-neutral-100">
              Let's build something durable.
            </h3>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 max-w-md">
              Available for full-stack engineering, backend architecture, and technical roles in Kazakhstan or remote.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => {
                onCopyEmail();
                playTactileClick("click");
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-black/[0.1] dark:border-white/[0.12] bg-white dark:bg-neutral-900 px-4 py-2 text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:bg-black/[0.02] dark:hover:bg-neutral-800 transition-colors shadow-xs"
            >
              <Copy className="size-3.5 text-neutral-400" />
              <span>Copy Email</span>
            </button>

            <a
              href="https://t.me/ikhlasov"
              target="_blank"
              rel="noreferrer"
              onClick={() => playTactileClick("click")}
              className="inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100 transition-colors shadow-xs"
            >
              <MessageCircle className="size-3.5" />
              <span>Telegram</span>
            </a>
          </div>
        </div>
      </div>

      {/* Profiles & Links */}
      <div className="mt-10">
        <h4 className="text-xs uppercase text-neutral-400 dark:text-neutral-500 tracking-wider font-medium">
          Profiles &amp; Links
        </h4>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => playTactileClick("click")}
              className="text-sm text-neutral-500 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline dark:text-neutral-400 dark:hover:text-white"
            >
              {s.label.toUpperCase()}
            </a>
          ))}
          <a
            href={site.resumeUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => playTactileClick("click")}
            className="text-sm text-neutral-500 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline dark:text-neutral-400 dark:hover:text-white"
          >
            RESUME (PDF)
          </a>
          <a
            href={`mailto:${site.email}`}
            className="text-sm text-neutral-500 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline dark:text-neutral-400 dark:hover:text-white"
          >
            EMAIL
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between font-mono text-xs text-neutral-400 dark:text-neutral-500 border-t border-black/[0.04] dark:border-white/[0.06] pt-6">
        <div>
          <span>&copy; {new Date().getFullYear()} {site.name}</span>
          <span className="mx-2">·</span>
          <span>Atyrau, Kazakhstan</span>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="inline-flex items-center gap-1 hover:text-neutral-900 dark:hover:text-white transition-colors self-start sm:self-auto"
        >
          <span>Back to top</span>
          <ArrowUp className="size-3" />
        </button>
      </div>
    </footer>
  );
}
