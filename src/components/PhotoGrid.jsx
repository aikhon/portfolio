import { useState } from "react";
import { X, ZoomIn } from "lucide-react";
import { playTactileClick } from "../utils/sound.js";

export function PhotoGrid({ photos }) {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  if (!photos || photos.length === 0) return null;

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between pb-3">
        <span className="font-mono text-xs uppercase tracking-wider text-muted">
          // FIELD PHOTOGRAPHY &amp; GALLERY
        </span>
        <span className="font-mono text-[11px] text-muted">
          Click photo to inspect
        </span>
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((photo, i) => (
          <li
            key={photo.src}
            className="group relative cursor-pointer overflow-hidden rounded-xl border border-line bg-surface p-1 transition-all duration-300 hover:border-accent hover:shadow-lg"
            onClick={() => {
              setSelectedPhoto(photo);
              playTactileClick("click");
            }}
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-surface-subtle">
              <img
                src={photo.src}
                alt={photo.alt || `Alikhan photo ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                <ZoomIn className="size-5 text-white" />
              </div>
            </div>
            <div className="flex items-center justify-between px-1.5 py-1 font-mono text-[10px] text-muted">
              <span>PHOTO_0{i + 1}.RAW</span>
              <span className="text-accent uppercase">KZ</span>
            </div>
          </li>
        ))}
      </ul>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-h-[90vh] max-w-2xl overflow-hidden rounded-xl border border-line bg-surface p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close photo"
              className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/90 transition-colors"
            >
              <X className="size-4" />
            </button>
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.alt || "Alikhan Ikhlassov"}
              className="max-h-[80vh] w-auto rounded-lg object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
