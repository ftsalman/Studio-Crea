import { useTranslation } from 'react-i18next'
import { usePageTitle } from '@hooks/usePageTitle'
import AboutHero from '@features/about/AboutHero'
import Stats from '@features/about/Stats'
import Values from '@features/about/Values'
import Capabilities from '@features/about/Capabilities'
import Clients from '@features/about/Clients'

export default function AboutPage() {
  const { t } = useTranslation()
  usePageTitle(t('nav.about'))
  return (
    <>
      <AboutHero />
      <Stats />
      <Values />
      <Capabilities />
      <Clients />
    </>
  )
}
