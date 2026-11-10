import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap, SplitText, useGSAP } from '@utils/gsap'
import { useLenis } from '@hooks/useLenis'
import { useMagnetic } from '@hooks/useMagnetic'
import { site } from '@config/site'
import { SOCIALS } from '@constants/navigation'
import { ROUTES } from '@constants/routes'
import { subscribe } from '@services/newsletterService'
import Eyebrow from '@components/Eyebrow'
import RevealText from '@components/RevealText'
import RollText from '@components/RollText'
import TLink from '@components/TLink'
import { ArrowIcon } from '@components/Icons'
import './Footer.css'

export default function Footer() {
  const { t } = useTranslation()
  const lenis = useLenis()
  const ref = useRef(null)
  const talkRef = useRef(null)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  useMagnetic(talkRef, { strength: 0.3, inner: '.footer__talk-inner' })

  useGSAP(
    () => {
      // footer slides up from underneath the rounded page edge
      gsap.fromTo(
        '.footer__inner',
        { yPercent: -18 },
        {
          yPercent: 0,
          ease: 'none',
          scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom bottom', scrub: true },
        }
      )
      // giant wordmark letters rise in as you reach the bottom
      const split = SplitText.create('.footer__word', { type: 'chars', mask: 'chars' })
      gsap.from(split.chars, {
        yPercent: 100,
        stagger: 0.04,
        ease: 'none',
        scrollTrigger: { trigger: '.footer__word', start: 'top bottom', end: 'bottom bottom', scrub: 0.6 },
      })
    },
    { scope: ref }
  )

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      await subscribe(email)
      setStatus('done')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <footer ref={ref} className="footer" data-header="dark">
      <div className="footer__inner">
        <div className="footer__cta container">
          <div>
            <Eyebrow>{t('footer.eyebrow')}</Eyebrow>
            <RevealText as="h2" className="footer__title">
              {t('footer.title')}
            </RevealText>
            <RevealText as="h2" className="footer__title footer__title--accent" delay={0.1}>
              {t('footer.titleAccent')}
            </RevealText>
          </div>
          <TLink ref={talkRef} to={ROUTES.CONTACT} className="footer__talk roll-host" data-cursor={t('nav.letsTalk')}>
            <span className="footer__talk-inner">
              <RollText>{t('nav.letsTalk')}</RollText>
              <ArrowIcon direction="up-right" />
            </span>
          </TLink>
        </div>

        <div className="footer__grid container">
          <div className="footer__col">
            <h3>{t('footer.address')}</h3>
            {site.address.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </div>
          <div className="footer__col">
            <h3>{t('footer.contact')}</h3>
            <a className="footer__link roll-host" href={`mailto:${site.email}`}>
              <RollText>{site.email}</RollText>
            </a>
            <a className="footer__link roll-host" href={`tel:${site.phone.replace(/\s/g, '')}`}>
              <RollText>{site.phone}</RollText>
            </a>
          </div>
          <div className="footer__col">
            <h3>{t('footer.social')}</h3>
            {SOCIALS.map((s) => (
              <a key={s.label} className="footer__link roll-host" href={s.href} target="_blank" rel="noreferrer">
                <RollText>{s.label}</RollText>
              </a>
            ))}
          </div>
          <form className="footer__news" onSubmit={onSubmit}>
            <h3>{t('footer.newsletter')}</h3>
            {status === 'done' ? (
              <p className="footer__news-ok">{t('footer.subscribed')}</p>
            ) : (
              <div className="footer__field">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={t('footer.emailPlaceholder')}
                  aria-label={t('footer.emailPlaceholder')}
                />
                <button type="submit" aria-label={t('footer.subscribe')} disabled={status === 'loading'}>
                  <ArrowIcon />
                </button>
              </div>
            )}
          </form>
        </div>

        <div className="footer__bottom">
          <div className="footer__word" aria-hidden="true">
            studiocrea
          </div>
          <div className="footer__legal container">
            <span>
              © {new Date().getFullYear()} {site.name}. {t('footer.rights')}
            </span>
            <button type="button" className="footer__top roll-host" onClick={() => lenis?.scrollTo(0, { duration: 2 })}>
              <RollText>{t('footer.backToTop')}</RollText>
              <ArrowIcon direction="up" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}
