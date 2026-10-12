import { useState } from "react";
import { X } from "lucide-react";

export function PhotoGrid({ photos }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  if (!photos || photos.length === 0) return null;

  return (
    <div>
      <ul className="grid grid-cols-3 gap-2.5 sm:gap-3">
        {photos.map((photo, i) => (
          <li
            key={photo.src}
            className="group relative cursor-pointer overflow-hidden rounded-lg border border-black/[0.08] dark:border-white/[0.08] transition-all hover:border-black/25 dark:hover:border-white/25"
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="aspect-[4/5] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
              <img
                src={photo.src}
                alt={photo.alt || `Alikhan photo ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0 group-hover:scale-105"
              />
            </div>
          </li>
        ))}
      </ul>

      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs animate-fade-in"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-xl overflow-hidden rounded-lg border border-white/15 bg-neutral-950 p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 rounded-full bg-black/60 p-1.5 text-white hover:bg-black/90 transition-colors"
            >
              <X className="size-4" />
            </button>
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt || "Alikhan"}
              className="max-h-[82vh] w-auto rounded object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
