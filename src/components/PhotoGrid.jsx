// A square-cropped grid of photos. Renders nothing if the list is empty, so
// the About section stays tidy before any photos are added.
export function PhotoGrid({ photos }) {
  if (!photos.length) return null

  return (
    <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
      {photos.map((photo) => (
        <li
          key={photo.src}
          className="overflow-hidden rounded-lg border border-line bg-surface"
        >
          <img
            src={photo.src}
            alt={photo.alt}
            // Lazy so photos below the fold don't compete with the fonts on load.
            loading="lazy"
            decoding="async"
            // aspect-square reserves the space before the file arrives, so
            // nothing on the page jumps as images load.
            className="aspect-square w-full object-cover transition-transform duration-300 motion-safe:hover:scale-105"
          />
        </li>
      ))}
    </ul>
  )
}
