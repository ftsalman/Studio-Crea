import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SERVICES } from '@constants/services'
import { pad } from '@utils/math'
import { cn } from '@utils/cn'
import RevealText from '@components/RevealText'

export default function Capabilities() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(0)

  return (
    <section className="caps container">
      <RevealText as="h2" className="section-title">
        {t('about.capabilities')}
      </RevealText>
      <ul className="caps__list">
        {SERVICES.map((s, i) => (
          <li key={s.key} className={cn('caps__item', { 'is-open': open === i })}>
            <button
              type="button"
              className="caps__head"
              aria-expanded={open === i}
              onClick={() => setOpen(open === i ? -1 : i)}
              onMouseEnter={() => window.matchMedia('(hover: hover)').matches && setOpen(i)}
            >
              <span className="caps__num">{pad(i + 1)}</span>
              <span className="caps__name">{t(`services.${s.key}`)}</span>
              <span className="caps__plus" aria-hidden="true" />
            </button>
            <div className="caps__body">
              <div>
                <ul>
                  {s.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
