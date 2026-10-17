# Alikhan Ikhlassov

A small, personal portfolio built with React and Vite. One reading column, real photographs, selected projects, and expandable experience. Warm paper and muted green in light mode; a matching dark theme follows the system until the visitor chooses a preference.

## Run locally

Use Node.js 24.15+ and pnpm 10.34.5. Node 22.22.2+ and 26+ are also supported; the engine range includes the requirements of the test environment.

```sh
pnpm install
pnpm dev
```

```sh
pnpm test     # DOM, local links, assets, disclosures, and theme behavior
pnpm build    # production output in dist/
pnpm preview  # serve the production build locally
```

Deploy `dist/` to any static host. No API keys, backend, or external font service are required.

## Update the content

- `src/data/`: projects, career, education, photo captions, social links, and contact details.
- `src/sections/Hero.jsx` and `About.jsx`: personal introduction and interests.
- `public/cv/cv.pdf`: the original résumé.
- `public/photos/`: original photographs, linked from the photo strip.
- `src/style.css`: layout, typography, responsive rules, and both color themes.

Run `pnpm photos` after replacing a photograph. This generates 300px and 600px WebP versions in `public/photos/optimized/` while preserving originals. Optimized versions are committed so production builds need no image-processing step. Update the source list in `scripts/optimize-photos.mjs` and `src/data/photos.js` if filenames change.

Career history and education milestones use native `<details>` elements. Navigation uses normal anchor links. Reduced-motion preferences are respected. Theme persistence is optional and safely handles blocked storage.

## Direction and content

References: [Arlan Rakhmetzhanov](https://www.arlanrakh.com/) and [Dimash Aizharykov](https://dimash.cc/). The direction takes their narrow reading layout, personal voice, and emphasis on concrete work; copy, photographs, and identity come from this repository.

The existing project descriptions, six roles, two education entries, nine milestones, CV, and social profiles are retained and edited for clarity. Dates remain as supplied; experience is arranged by relevance, rather than implying precise employment ranges. No performance metrics or additional clients have been invented. The WhatsApp number uses Kazakhstan’s international `+7` format in place of the original domestic `8` prefix.

## Verification limits

The automated tests use jsdom; they check DOM behavior, not rendered geometry. Desktop/mobile layout, focus appearance, and image crops still need a real-browser visual pass. No browser was connected in the implementation environment.
