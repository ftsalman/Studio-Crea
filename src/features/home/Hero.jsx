import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap, useGSAP } from '@utils/gsap'
import { useApp } from '@hooks/useApp'
import { useLenis } from '@hooks/useLenis'
import FieryCanvas from '@components/FieryCanvas'
import RevealText from '@components/RevealText'
import { ArrowIcon } from '@components/Icons'
import './Hero.css'

export default function Hero() {
  const { t } = useTranslation()
  const { loaded } = useApp()
  const lenis = useLenis()
  const ref = useRef(null)
  const canvasRef = useRef(null)

  useGSAP(
    () => {
      // scroll: the full-bleed canvas shrinks into a rounded card, copy drifts up
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          onUpdate: (self) => canvasRef.current?.setScroll(self.progress),
        },
        defaults: { ease: 'none' },
      })
      tl.to('.hero__frame', { clipPath: 'inset(6% 3% 0% 3% round 2.5rem)', scale: 0.92 }, 0)
        .to('.hero__content', { yPercent: -40, opacity: 0 }, 0)
    },
    { scope: ref }
  )

  useGSAP(
    () => {
      if (!loaded) return
      gsap
        .timeline()
        .fromTo('.fiery-canvas', { scale: 1.15 }, { scale: 1, duration: 2.4, ease: 'expo.out' }, 0)
        .from('.hero__meta > *', { y: 24, opacity: 0, stagger: 0.1, duration: 1.2 }, 0.6)
    },
    { scope: ref, dependencies: [loaded] }
  )

  return (
    <section ref={ref} className="hero" data-header="dark">
      <div className="hero__frame">
        <FieryCanvas ref={canvasRef} />
        <div className="hero__shade" />
      </div>

      <div className="hero__content container">
        <RevealText as="h1" className="hero__title" play={loaded} scroll={false} delay={0.25}>
          {t('hero.title')}
        </RevealText>
        <div className="hero__meta">
          <span className="hero__label">{t('hero.label')}</span>
          <button
            type="button"
            className="hero__scroll"
            onClick={() => lenis?.scrollTo('#intro', { duration: 1.6 })}
          >
            <span>{t('hero.scroll')}</span>
            <span className="hero__scroll-icon">
              <ArrowIcon direction="down" />
            </span>
          </button>
        </div>
      </div>
    </section>
  )
}
