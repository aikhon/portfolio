import { site } from '../data/site.js'

export function Hero() {
  return (
    <section id="home" className="pt-16 sm:pt-24 pb-10 sm:pb-10 flex flex-col gap-5">
      <h1 className="text-4xl font-semibold tracking-tight text-heading sm:text-5xl">
        Alikhan <span className="text-muted">(messa)</span> Ikhlassov
      </h1>

      <p className="text-lg leading-relaxed">
        A backend developer. A system administrator.<br></br>Moving to fullstack.<br></br> Open to new opportunities & challenges.
      </p>

      <div className="flex flex-wrap gap-3">
        <a
          href={`mailto:${site.email}`}
          className="rounded-md bg-heading px-4 py-2 text-sm font-medium text-canvas hover:opacity-85"
        >
          Get in touch
        </a>
        <a
          href="#work"
          className="rounded-md border border-line px-4 py-2 text-sm font-medium text-heading hover:bg-surface"
        >
          See my work
        </a>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <div className="rounded-full h-2.5 w-2.5 bg-green-700 animate-pulse-dot motion-reduce:animate-none"></div>
        <p className="text-[13px]">Available for Almaty, Atyrau</p>

        &bull;

        <p className="text-[13px]">Open to remote positions</p>
      </div>
    </section>
  )
}
