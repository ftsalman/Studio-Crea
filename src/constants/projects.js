/**
 * Sample portfolio entries — replace with real StudioCrea work.
 * `art` drives the generated cover (no image needed); `image` overrides it.
 */
export const PROJECTS = [
  {
    slug: 'ember-coffee',
    title: 'Ember Coffee Co.',
    client: 'Ember Roasters',
    year: 2026,
    tags: ['Branding', 'Packaging', 'Motion'],
    summary: 'A warm, roasted identity system that turns every cup into a small ritual.',
    art: { a: '#ff6a13', b: '#7a0500', c: '#ffb347', angle: 160 },
  },
  {
    slug: 'pulse-fitness',
    title: 'Pulse Fitness',
    client: 'Pulse Clubs',
    year: 2026,
    tags: ['Website', '3D', 'Interaction'],
    summary: 'An immersive membership site with a heartbeat-driven WebGL hero.',
    art: { a: '#ff3d00', b: '#5a0300', c: '#ffd08a', angle: 30 },
  },
  {
    slug: 'nova-realty',
    title: 'Nova Realty',
    client: 'Nova Group',
    year: 2025,
    tags: ['WebGL', 'Real Estate', 'UX'],
    summary: 'Explore towers before they exist — a real-time 3D sales experience.',
    art: { a: '#e8160a', b: '#1a0503', c: '#ff8a3d', angle: 200 },
  },
  {
    slug: 'kora-skincare',
    title: 'Kora Skincare',
    client: 'Kora Labs',
    year: 2025,
    tags: ['Campaign', 'Art Direction'],
    summary: 'A glow-forward launch campaign across social, OOH and retail.',
    art: { a: '#ffb347', b: '#e8160a', c: '#fff1e6', angle: 120 },
  },
  {
    slug: 'atlas-logistics',
    title: 'Atlas Logistics',
    client: 'Atlas Freight',
    year: 2024,
    tags: ['Web App', 'UI/UX', 'Design System'],
    summary: 'A calm, data-dense dashboard design system for a fleet of 2,000 trucks.',
    art: { a: '#c81005', b: '#140806', c: '#ff6a13', angle: 250 },
  },
  {
    slug: 'sahara-festival',
    title: 'Sahara Festival',
    client: 'Sahara Live',
    year: 2024,
    tags: ['Motion', 'Social', 'Identity'],
    summary: 'A desert-heat identity that moves to the beat of the festival lineup.',
    art: { a: '#ff3d00', b: '#3a0200', c: '#ffc46b', angle: 75 },
  },
]

export const FEATURED_PROJECTS = PROJECTS.slice(0, 4)

export const findProject = (slug) => PROJECTS.find((p) => p.slug === slug)
