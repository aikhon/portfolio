import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const photoRoot = new URL('../public/photos/', import.meta.url)
const output = new URL('optimized/', photoRoot)
await mkdir(output, { recursive: true })

const sources = [
  ['me.jpeg', 'building'],
  ['me3.jpg', 'presenting'],
  ['me2.jpeg', 'kazhackstan'],
]

for (const [source, name] of sources) {
  for (const width of [300, 600]) {
    const destination = new URL(`${name}-${width}.webp`, output)
    const result = await sharp(fileURLToPath(new URL(source, photoRoot)))
      .autoOrient()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(fileURLToPath(destination))
    console.log(`${name}-${width}.webp: ${(result.size / 1024).toFixed(1)} KB`)
  }
}
