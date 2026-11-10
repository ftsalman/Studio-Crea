import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { gsap, useGSAP } from '@utils/gsap'
import { useLenis } from '@hooks/useLenis'
import FieryCanvas from '@components/FieryCanvas'
import Logo from '@components/Logo'
import { CloseIcon } from '@components/Icons'
import './ReelModal.css'

/**
 * Fullscreen reel player. Shows the live brand texture until a real reel is
 * available — drop a video into /public and set REEL_SRC to use it.
 */
const REEL_SRC = null // e.g. '/reel.mp4'

export default function ReelModal({ onClose }) {
  const lenis = useLenis()
  const ref = useRef(null)

  useEffect(() => {
    lenis?.stop()
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      window.removeEventListener('keydown', onKey)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lenis])

  useGSAP(
    () => {
      gsap
        .timeline()
        .fromTo(ref.current, { clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(75% at 50% 50%)', duration: 1.1, ease: 'expo.inOut' })
        .from('.reel-modal__logo', { y: 40, opacity: 0, duration: 1 }, '-=0.4')
    },
    { scope: ref }
  )

  const close = () => {
    gsap.to(ref.current, { clipPath: 'circle(0% at 50% 50%)', duration: 0.8, ease: 'expo.inOut', onComplete: onClose })
  }

  return createPortal(
    <div ref={ref} className="reel-modal" role="dialog" aria-modal="true" aria-label="Showreel">
      {REEL_SRC ? (
        <video src={REEL_SRC} autoPlay controls playsInline className="reel-modal__video" />
      ) : (
        <>
          <FieryCanvas ribs={90} />
          <Logo className="reel-modal__logo" />
        </>
      )}
      <button type="button" className="reel-modal__close" onClick={close} aria-label="Close" autoFocus>
        <CloseIcon />
      </button>
    </div>,
    document.body
  )
}
