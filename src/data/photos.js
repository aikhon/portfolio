// Run `pnpm photos` after changing an original. CSS controls the visible crop.
export const photos = [
  {
    src: '/photos/optimized/building-600.webp',
    srcSet: '/photos/optimized/building-300.webp 300w, /photos/optimized/building-600.webp 600w',
    original: '/photos/me.jpeg',
    alt: 'Alikhan at his laptop during the Atyrau Youth Hackathon',
    caption: 'building',
    position: '50% 53%',
  },
  {
    src: '/photos/optimized/presenting-600.webp',
    srcSet: '/photos/optimized/presenting-300.webp 300w, /photos/optimized/presenting-600.webp 600w',
    original: '/photos/me3.jpg',
    alt: 'Alikhan presenting a project to hackathon judges',
    caption: 'sharing',
    position: '68% 50%',
  },
  {
    src: '/photos/optimized/kazhackstan-600.webp',
    srcSet: '/photos/optimized/kazhackstan-300.webp 300w, /photos/optimized/kazhackstan-600.webp 600w',
    original: '/photos/me2.jpeg',
    alt: 'Alikhan celebrating with a PS Cloud Services prize at KazHackStan',
    caption: 'enjoying the process',
    position: '50% 40%',
  },
]
