import { useTranslation } from 'react-i18next'
import { ROUTES } from '@constants/routes'
import Eyebrow from '@components/Eyebrow'
import RevealText from '@components/RevealText'
import Button from '@components/Button'
import './Intro.css'

export default function Intro() {
  const { t } = useTranslation()
  return (
    <section className="intro container" id="intro">
      <Eyebrow index="01">{t('intro.eyebrow')}</Eyebrow>
      <div className="intro__grid">
        <RevealText as="h2" className="intro__title">
          {t('intro.title')}
        </RevealText>
        <div className="intro__side">
          <RevealText as="p" className="intro__body" delay={0.15}>
            {t('intro.body')}
          </RevealText>
          <Button to={ROUTES.ABOUT}>{t('intro.cta')}</Button>
        </div>
      </div>
    </section>
  )
}
