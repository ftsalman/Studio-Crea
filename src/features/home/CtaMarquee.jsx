import { useTranslation } from 'react-i18next'
import { ROUTES } from '@constants/routes'
import Marquee from '@components/Marquee'
import TLink from '@components/TLink'
import './CtaMarquee.css'

export default function CtaMarquee() {
  const { t } = useTranslation()
  return (
    <section className="cta-marquee" data-header="dark">
      <TLink to={ROUTES.CONTACT} className="cta-marquee__link" data-cursor={t('nav.letsTalk')}>
        <Marquee className="cta-marquee__row">{t('marquee')}</Marquee>
        <Marquee className="cta-marquee__row cta-marquee__row--outline" reverse speed={0.8}>
          {t('marquee')}
        </Marquee>
      </TLink>
    </section>
  )
}
