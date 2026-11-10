import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap, useGSAP } from '@utils/gsap'
import { pad } from '@utils/math'
import RevealText from '@components/RevealText'
import { LogoMark } from '@components/Logo'

/** Sticky stacking cards: each card pins, then shrinks back as the next one slides over it. */
export default function Values() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const values = t('about.values', { returnObjects: true })

  useGSAP(
    () => {
      const cards = gsap.utils.toArray('.value-card')
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return
        gsap.to(card, {
          scale: 0.9 - (cards.length - i) * 0.02,
          filter: 'brightness(0.7)',
          ease: 'none',
          scrollTrigger: { trigger: cards[i + 1], start: 'top bottom', end: 'top 20%', scrub: true },
        })
      })
    },
    { scope: ref }
  )

  return (
    <section ref={ref} className="values container" data-header="dark">
      <RevealText as="h2" className="section-title">
        {t('about.valuesTitle')}
      </RevealText>
      <div className="values__stack">
        {values.map((v, i) => (
          <article key={v.title} className="value-card" style={{ '--i': i }}>
            <span className="value-card__num">{pad(i + 1)}</span>
            <h3>{v.title}</h3>
            <p>{v.body}</p>
            <LogoMark className="value-card__mark" />
          </article>
        ))}
      </div>
    </section>
  )
}
