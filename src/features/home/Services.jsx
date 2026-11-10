import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap, SplitText, useGSAP } from '@utils/gsap'
import { SERVICES } from '@constants/services'
import { pad } from '@utils/math'
import Eyebrow from '@components/Eyebrow'
import './Services.css'

/** Dark section: the statement lights up word-by-word as you scroll through it. */
export default function Services() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const statement = t('services.statement')

  useGSAP(
    () => {
      const split = SplitText.create('.services__statement', { type: 'words' })
      gsap.fromTo(
        split.words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: '.services__statement', start: 'top 80%', end: 'bottom 45%', scrub: true },
        }
      )
      gsap.from('.services__col', {
        y: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        scrollTrigger: { trigger: '.services__cols', start: 'top 85%', once: true },
      })
      return () => split.revert()
    },
    { scope: ref, dependencies: [statement], revertOnUpdate: true }
  )

  return (
    <section ref={ref} className="services" data-header="dark">
      <div className="container">
        <Eyebrow index="03">{t('services.eyebrow')}</Eyebrow>
        <p key={statement} className="services__statement">
          {statement}
        </p>
        <div className="services__cols">
          {SERVICES.map((s, i) => (
            <div key={s.key} className="services__col">
              <span className="services__num">{pad(i + 1)}</span>
              <h3>{t(`services.${s.key}`)}</h3>
              <ul>
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
