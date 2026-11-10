import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap, useGSAP } from '@utils/gsap'
import { LogoMark } from '@components/Logo'
import './Preloader.css'

/**
 * Intro loader: the monogram assembles, a counter runs to 100 (waiting on
 * fonts + window load), then the curtain wipes up to reveal the page.
 */
export default function Preloader({ onReveal, onComplete }) {
  const { t } = useTranslation()
  const ref = useRef(null)
  const countRef = useRef(null)

  useGSAP(
    () => {
      const counter = { v: 0 }
      const ready = Promise.all([
        document.fonts?.ready ?? Promise.resolve(),
        document.readyState === 'complete'
          ? Promise.resolve()
          : new Promise((r) => window.addEventListener('load', r, { once: true })),
      ])

      const tl = gsap.timeline()
      tl.from('.preloader__mark path:first-child', { xPercent: -60, opacity: 0, duration: 1.2 }, 0)
        .from('.preloader__mark path:last-child', { xPercent: 60, opacity: 0, duration: 1.2 }, 0.1)
        .from('.preloader__word span', { yPercent: 110, stagger: 0.03, duration: 1 }, 0.2)
        .from('.preloader__meta', { opacity: 0, y: 12, duration: 0.8 }, 0.3)
        .to(counter, {
          v: 86,
          duration: 1.8,
          ease: 'power2.inOut',
          onUpdate: () => (countRef.current.textContent = Math.round(counter.v)),
        }, 0)
        .to('.preloader__bar i', { scaleX: 0.86, duration: 1.8, ease: 'power2.inOut' }, 0)
        .addPause('+=0', () => {
          ready.then(() => tl.resume())
        })
        .to(counter, {
          v: 100,
          duration: 0.6,
          ease: 'power2.out',
          onUpdate: () => (countRef.current.textContent = Math.round(counter.v)),
        })
        .to('.preloader__bar i', { scaleX: 1, duration: 0.6, ease: 'power2.out' }, '<')
        .to('.preloader__content', { yPercent: -30, opacity: 0, duration: 0.9, ease: 'expo.in' }, '+=0.15')
        .add(() => onReveal?.(), '-=0.1')
        .to(ref.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1.2, ease: 'expo.inOut' }, '-=0.25')
        .add(() => onComplete?.())
    },
    { scope: ref }
  )

  return (
    <div ref={ref} className="preloader" role="status" aria-label={t('preloader.loading')}>
      <div className="preloader__content">
        <div className="preloader__brand">
          <LogoMark className="preloader__mark" />
          <div className="preloader__word" aria-hidden="true">
            {'studiocrea'.split('').map((c, i) => (
              <span key={i} className={i < 6 ? 'b' : undefined}>
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="preloader__meta">
          <span>{t('preloader.loading')}</span>
          <span className="preloader__count">
            <span ref={countRef}>0</span>%
          </span>
        </div>
        <div className="preloader__bar" aria-hidden="true">
          <i />
        </div>
      </div>
    </div>
  )
}
