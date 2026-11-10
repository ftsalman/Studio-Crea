import { useTranslation } from 'react-i18next'
import { STATS } from '@constants/services'
import Counter from '@components/Counter'

export default function Stats() {
  const { t } = useTranslation()
  return (
    <section className="stats container">
      {STATS.map((s) => (
        <div key={s.key} className="stats__item">
          <span className="stats__value">
            <Counter value={s.value} suffix={s.suffix} />
          </span>
          <span className="stats__label">{t(s.key)}</span>
        </div>
      ))}
    </section>
  )
}
