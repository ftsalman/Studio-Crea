import { useTranslation } from 'react-i18next'
import { usePageTitle } from '@hooks/usePageTitle'
import { ROUTES } from '@constants/routes'
import FieryCanvas from '@components/FieryCanvas'
import RevealText from '@components/RevealText'
import Button from '@components/Button'
import './NotFoundPage.css'

export default function NotFoundPage() {
  const { t } = useTranslation()
  usePageTitle('404')
  return (
    <section className="notfound" data-header="dark">
      <FieryCanvas className="notfound__bg" ribs={50} />
      <div className="notfound__content">
        <span className="notfound__code">404</span>
        <RevealText as="h1" className="notfound__title" scroll={false} delay={0.4}>
          {t('notFound.title')}
        </RevealText>
        <p>{t('notFound.body')}</p>
        <Button to={ROUTES.HOME} variant="light">
          {t('notFound.cta')}
        </Button>
      </div>
    </section>
  )
}
