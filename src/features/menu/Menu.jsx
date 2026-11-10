import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { gsap, useGSAP } from '@utils/gsap'
import { cn } from '@utils/cn'
import { pad } from '@utils/math'
import { useApp } from '@hooks/useApp'
import { NAV_LINKS, SOCIALS } from '@constants/navigation'
import { site } from '@config/site'
import { LANGUAGES } from '@/i18n'
import TLink from '@components/TLink'
import RollText from '@components/RollText'
import { ArrowIcon } from '@components/Icons'
import './Menu.css'

/** Drop-down menu panel anchored to the top-right, with staggered link reveals. */
export default function Menu() {
  const { t, i18n } = useTranslation()
  const { menuOpen, setMenuOpen } = useApp()
  const { pathname } = useLocation()
  const ref = useRef(null)
  const tl = useRef(null)

  useGSAP(
    () => {
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: 'expo.out' } })
        .set(ref.current, { visibility: 'visible' })
        .to('.menu__backdrop', { opacity: 1, duration: 0.6 }, 0)
        .fromTo(
          '.menu__panel',
          { clipPath: 'inset(0% 0% 100% 0% round 1.5rem)' },
          { clipPath: 'inset(0% 0% 0% 0% round 1.5rem)', duration: 1 },
          0
        )
        .from('.menu__link-inner', { yPercent: 110, stagger: 0.06, duration: 1 }, 0.15)
        .from('.menu__foot > *', { opacity: 0, y: 16, stagger: 0.05, duration: 0.8 }, 0.35)
    },
    { scope: ref }
  )

  useEffect(() => {
    const timeline = tl.current
    if (!timeline) return
    if (menuOpen) timeline.timeScale(1).play()
    else timeline.timeScale(1.8).reverse()
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen, setMenuOpen])

  const lang = i18n.resolvedLanguage

  return (
    <div ref={ref} className={cn('menu', { 'is-open': menuOpen })} id="site-menu" aria-hidden={!menuOpen}>
      <div className="menu__backdrop" onClick={() => setMenuOpen(false)} />
      <div className="menu__panel" role="dialog" aria-label={t('nav.menu')}>
        <nav>
          <ul className="menu__links">
            {NAV_LINKS.map((l, i) => (
              <li key={l.to}>
                <TLink
                  to={l.to}
                  className={cn('menu__link', 'roll-host', { 'is-active': pathname === l.to })}
                  tabIndex={menuOpen ? 0 : -1}
                >
                  <span className="menu__link-inner">
                    <em>{pad(i + 1)}</em>
                    <RollText>{t(l.key)}</RollText>
                    <ArrowIcon className="menu__arrow" />
                  </span>
                </TLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="menu__foot">
          <div className="menu__langs" role="group" aria-label="Language">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                type="button"
                className={cn({ 'is-active': lang === l.code })}
                onClick={() => i18n.changeLanguage(l.code)}
                tabIndex={menuOpen ? 0 : -1}
              >
                {l.label}
              </button>
            ))}
          </div>
          <div className="menu__socials">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" tabIndex={menuOpen ? 0 : -1}>
                {s.label}
              </a>
            ))}
          </div>
          <a className="menu__mail" href={`mailto:${site.email}`} tabIndex={menuOpen ? 0 : -1}>
            {site.email}
          </a>
        </div>
      </div>
    </div>
  )
}
