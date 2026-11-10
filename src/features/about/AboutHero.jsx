import { useTranslation } from 'react-i18next'
import { useApp } from '@hooks/useApp'
import brandImage from '@assets/images/reel-fiery.webp'
import Eyebrow from '@components/Eyebrow'
import RevealText from '@components/RevealText'
import ArtCover from '@components/ArtCover'
import './About.css'

export default function AboutHero() {
  const { t } = useTranslation()
  const { loaded } = useApp()
  return (
    <section className="about-hero container">
      <Eyebrow>{t('about.eyebrow')}</Eyebrow>
      <RevealText as="h1" className="page-title" play={loaded} scroll={false} delay={0.5}>
        {t('about.title')}
      </RevealText>

      <div className="about-story">
        <ArtCover project={{ title: 'StudioCrea', image: brandImage }} className="about-story__img" eager />
        <div className="about-story__text">
          <RevealText as="p" className="lead">
            {t('about.body1')}
          </RevealText>
          <RevealText as="p" className="muted" delay={0.1}>
            {t('about.body2')}
          </RevealText>
        </div>
      </div>
    </section>
  )
}
