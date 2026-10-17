import { photos } from '../data/photos.js'
import { ExternalLink } from './ExternalLink.jsx'

export function PhotoStrip() {
  return (
    <div className="photo-strip" aria-label="A few moments along the way">
      {photos.map((photo) => (
        <figure key={photo.src}>
          <ExternalLink href={photo.original} aria-label={`View full photo: ${photo.alt}`}>
            <img src={photo.src} srcSet={photo.srcSet} sizes="(max-width: 640px) 30vw, 205px" alt={photo.alt} width="600" height="600" decoding="async" style={{ objectPosition: photo.position }} />
          </ExternalLink>
          <figcaption>{photo.caption}</figcaption>
        </figure>
      ))}
    </div>
  )
}
