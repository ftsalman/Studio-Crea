import { useTranslation } from 'react-i18next'
import { CLIENTS } from '@constants/services'
import Marquee from '@components/Marquee'
import Eyebrow from '@components/Eyebrow'

export default function Clients() {
  const { t } = useTranslation()
  return (
    <section className="clients">
      <div className="container">
        <Eyebrow>{t('about.clients')}</Eyebrow>
      </div>
      <Marquee className="clients__row" repeat={2} separator="●">
        {CLIENTS.join('   ●   ')}
      </Marquee>
    </section>
  )
}
