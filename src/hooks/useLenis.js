import { useContext, useEffect } from 'react'
import { LenisContext } from './lenisContext'

/** Returns the Lenis instance; optionally subscribes to its scroll event. */
export function useLenis(onScroll, deps = []) {
  const lenis = useContext(LenisContext)
  useEffect(() => {
    if (!lenis || !onScroll) return
    lenis.on('scroll', onScroll)
    return () => lenis.off('scroll', onScroll)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lenis, ...deps])
  return lenis
}
