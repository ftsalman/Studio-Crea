import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ScrollTrigger } from '@utils/gsap'
import { cn } from '@utils/cn'
import { useApp } from '@hooks/useApp'
import { useLenis } from '@hooks/useLenis'
import { ROUTES } from '@constants/routes'
import Logo from '@components/Logo'
import Button from '@components/Button'
import TLink from '@components/TLink'
import RollText from '@components/RollText'
import './Header.css'

export default function Header() {
  const { t } = useTranslation()
  const { loaded, menuOpen, setMenuOpen } = useApp()
  const { pathname } = useLocation()
  const [hidden, setHidden] = useState(false)
  const [dark, setDark] = useState(false)
  const lastY = useRef(0)

  // hide on scroll down, show on scroll up
  useLenis(
    ({ scroll }) => {
      const down = scroll > lastY.current
      lastY.current = scroll
      setHidden(down && scroll > 160)
    },
    []
  )

  // switch to light-on-dark when over sections marked data-header="dark"
  useEffect(() => {
    setDark(false) // reset for the new page; triggers re-activate once positions refresh
    const active = new Set()
    const triggers = [...document.querySelectorAll('[data-header="dark"]')].map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: 'top 48px',
        end: 'bottom 48px',
        onToggle: (self) => {
          if (self.isActive) active.add(section)
          else active.delete(section)
          setDark(active.size > 0)
        },
      })
    )
    return () => triggers.forEach((st) => st.kill())
  }, [pathname])

  return (
    <header
      className={cn('header', {
        'is-hidden': hidden && !menuOpen,
        'is-dark': dark && !menuOpen,
        'is-ready': loaded,
      })}
    >
      <TLink to={ROUTES.HOME} className="header__logo" aria-label="StudioCrea — home">
        <Logo />
      </TLink>

      <nav className="header__actions" aria-label="Primary">
        <Button to={ROUTES.CONTACT} variant="dark" size="sm" className="header__talk">
          {t('nav.letsTalk')}
        </Button>
        <button
          type="button"
          className={cn('menu-toggle', 'roll-host', { 'is-open': menuOpen })}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <RollText>{menuOpen ? t('nav.close') : t('nav.menu')}</RollText>
          <span className="menu-toggle__icon" aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </nav>
    </header>
  )
}
