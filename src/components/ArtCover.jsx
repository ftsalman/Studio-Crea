import { useRef } from 'react'
import { gsap, useGSAP } from '@utils/gsap'
import { cn } from '@utils/cn'
import { LogoMark } from './Logo'
import './ArtCover.css'

/**
 * Project cover. Uses `project.image` when present, otherwise generates a
 * brand-colored "ribbed glass" artwork from `project.art`.
 * Inner layer parallaxes against scroll; the frame reveals with a clip wipe.
 */
export default function ArtCover({ project, className, parallax = true, reveal = true, eager = false }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const el = ref.current
      if (reveal) {
        gsap.fromTo(
          el,
          { clipPath: 'inset(18% 8% 0% 8% round 1.5rem)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 1.5rem)',
            duration: 1.6,
            ease: 'expo.out',
            scrollTrigger: { trigger: el, start: 'top 92%', once: true },
          }
        )
      }
      if (parallax) {
        gsap.fromTo(
          '.cover__inner',
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: 'none',
            scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
          }
        )
      }
    },
    { scope: ref }
  )

  const art = project.art ?? {}

  return (
    <div ref={ref} className={cn('cover', className)}>
      <div className="cover__inner">
        {project.image ? (
          <img src={project.image} alt={project.title} loading={eager ? 'eager' : 'lazy'} decoding="async" />
        ) : (
          <div
            className="cover__art"
            style={{ '--a': art.a, '--b': art.b, '--c': art.c, '--angle': `${art.angle ?? 160}deg` }}
            role="img"
            aria-label={project.title}
          >
            <span className="cover__blob" />
            <span className="cover__ribs" />
            <LogoMark className="cover__mark" />
            <span className="cover__word">{project.title}</span>
          </div>
        )}
      </div>
    </div>
  )
}
