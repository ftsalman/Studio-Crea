import { env } from './env'

export const site = {
  name: 'StudioCrea',
  tagline: 'Digital creative studio',
  email: env.contactEmail,
  phone: '+971 50 000 0000',
  address: ['Studio 04, Creative District', 'Dubai, UAE'],
  established: 2021,
}

/** Motion tokens shared by every animation so the whole site feels consistent. */
export const motion = {
  ease: 'expo.out',
  easeInOut: 'expo.inOut',
  duration: 1.2,
  stagger: 0.08,
}
