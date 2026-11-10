import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ScrollTrigger } from '@utils/gsap'
import { AppContext } from '@hooks/appContext'
import { useLenis } from '@hooks/useLenis'
import Cursor from '@components/Cursor'
import Preloader from '@features/preloader/Preloader'
import Menu from '@features/menu/Menu'
import PageTransition from '@features/transition/PageTransition'
import SmoothScroll from './SmoothScroll'
import Header from './Header'
import Footer from './Footer'
import './MainLayout.css'

function AppShell() {
  const lenis = useLenis()
  const location = useLocation()
  const routerNavigate = useNavigate()
  const transitionRef = useRef(null)
  const busy = useRef(false)
  const [loaded, setLoaded] = useState(false)
  const [preloaderGone, setPreloaderGone] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // freeze scrolling while the preloader or the menu is up
  useEffect(() => {
    if (!lenis) return
    if (!loaded || menuOpen) lenis.stop()
    else lenis.start()
  }, [lenis, loaded, menuOpen])

  const navigate = useCallback(
    async (to) => {
      if (busy.current) return
      setMenuOpen(false)
      if (to === location.pathname) {
        lenis?.scrollTo(0, { duration: 1.4 })
        return
      }
      busy.current = true
      await transitionRef.current?.cover()
      routerNavigate(to)
    },
    [lenis, location.pathname, routerNavigate]
  )

  // after every route change: jump to top, recalc triggers, lift the curtain
  useEffect(() => {
    lenis?.scrollTo(0, { immediate: true, force: true })
    window.scrollTo(0, 0)
    const id = requestAnimationFrame(() => {
      ScrollTrigger.refresh()
      transitionRef.current?.reveal().then(() => (busy.current = false))
    })
    return () => cancelAnimationFrame(id)
  }, [location.pathname, lenis])

  const value = useMemo(
    () => ({ loaded, menuOpen, setMenuOpen, navigate }),
    [loaded, menuOpen, navigate]
  )

  return (
    <AppContext.Provider value={value}>
      {!preloaderGone && (
        <Preloader onReveal={() => setLoaded(true)} onComplete={() => setPreloaderGone(true)} />
      )}
      <Cursor />
      <Header />
      <Menu />
      <PageTransition ref={transitionRef} />
      <main className="site-main" id="main">
        <Outlet />
      </main>
      <Footer />
    </AppContext.Provider>
  )
}

export default function MainLayout() {
  return (
    <SmoothScroll>
      <AppShell />
    </SmoothScroll>
  )
}
