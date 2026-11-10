import { useTranslation } from 'react-i18next'
import { usePageTitle } from '@hooks/usePageTitle'
import { useApp } from '@hooks/useApp'
import { site } from '@config/site'
import { SOCIALS } from '@constants/navigation'
import Eyebrow from '@components/Eyebrow'
import RevealText from '@components/RevealText'
import ContactForm from '@features/contact/ContactForm'

export default function ContactPage() {
  const { t } = useTranslation()
  const { loaded } = useApp()
  usePageTitle(t('nav.contact'))

  return (
    <section className="contact container">
      <Eyebrow>{t('contact.eyebrow')}</Eyebrow>
      <RevealText as="h1" className="page-title" play={loaded} scroll={false} delay={0.5}>
        {t('contact.title')}
      </RevealText>

      <div className="contact__grid">
        <aside className="contact__aside">
          <RevealText as="p" className="lead">
            {t('contact.body')}
          </RevealText>
          <div>
            <h3>{t('footer.contact')}</h3>
            <a className="contact__mail" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>
          <div>
            <h3>{t('footer.address')}</h3>
            {site.address.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
          <div>
            <h3>{t('footer.social')}</h3>
            <div className="contact__socials">
              {SOCIALS.map((s) => (
                <a key={s.label} className="chip" href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </aside>
        <ContactForm />
      </div>
    </section>
  )
}
