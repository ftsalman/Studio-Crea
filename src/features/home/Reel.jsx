import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap, useGSAP } from '@utils/gsap'
import reelImage from '@assets/images/reel-fiery.webp'
import { PlayIcon } from '@components/Icons'
import ReelModal from './ReelModal'
import './Reel.css'

/**
 * "Play Reel": a small framed preview that expands to full-bleed as you
 * scroll, while the PLAY / REEL words slide apart.
 */
export default function Reel() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const [open, setOpen] = useState(false)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add({ desktop: '(min-width: 768px)', mobile: '(max-width: 767px)' }, ({ conditions }) => {
        const startInset = conditions.desktop ? 'inset(30% 31% 30% 31% round 1.75rem)' : 'inset(36% 8% 36% 8% round 1.25rem)'
        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom bottom', scrub: true },
          })
          .fromTo('.reel__frame', { clipPath: startInset }, { clipPath: 'inset(0% 0% 0% 0% round 0rem)', duration: 1 }, 0)
          .fromTo('.reel__frame img', { scale: 1.45 }, { scale: 1, duration: 1 }, 0)
          .to('.reel__word--play', { xPercent: -80, opacity: 0, duration: 0.6 }, 0)
          .to('.reel__word--reel', { xPercent: 80, opacity: 0, duration: 0.6 }, 0)
          .fromTo('.reel__btn', { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3 }, 0.55)
          .to({}, { duration: 0.25 })
      })
    },
    { scope: ref }
  )

  return (
    <section ref={ref} className="reel">
      <div className="reel__sticky">
        <button
          type="button"
          className="reel__frame"
          data-cursor={t('intro.play')}
          onClick={() => setOpen(true)}
          aria-label={`${t('intro.play')} ${t('intro.reel')}`}
        >
          <img src={reelImage} alt="" loading="lazy" decoding="async" />
          <span className="reel__btn" aria-hidden="true">
            <PlayIcon />
          </span>
        </button>
        <div className="reel__words" aria-hidden="true">
          <span className="reel__word reel__word--play">{t('intro.play')}</span>
          <span className="reel__word reel__word--reel">{t('intro.reel')}</span>
        </div>
      </div>
      {open && <ReelModal onClose={() => setOpen(false)} />}
    </section>
  )
}
