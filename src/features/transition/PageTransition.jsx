import { forwardRef, useImperativeHandle, useRef } from 'react'
import { gsap } from '@utils/gsap'
import { LogoMark } from '@components/Logo'
import './PageTransition.css'

/**
 * Two-layer curtain (ember + red ribbed panel) that covers the screen before a
 * route change and lifts off afterwards. Exposes cover() / reveal() promises.
 */
const PageTransition = forwardRef(function PageTransition(_props, ref) {
  const root = useRef(null)
  const covered = useRef(false)

  useImperativeHandle(ref, () => ({
    cover() {
      return new Promise((resolve) => {
        const layers = root.current.querySelectorAll('.pt__layer')
        gsap.killTweensOf(layers)
        gsap.set(root.current, { visibility: 'visible' })
        gsap
          .timeline({ onComplete: () => { covered.current = true; resolve() } })
          .fromTo(layers, { yPercent: 100 }, { yPercent: 0, duration: 0.9, ease: 'expo.inOut', stagger: 0.08 })
          .fromTo('.pt__mark', { scale: 0.6, opacity: 0, rotate: -20 }, { scale: 1, opacity: 1, rotate: 0, duration: 0.6, ease: 'back.out(2)' }, '-=0.35')
      })
    },
    reveal() {
      return new Promise((resolve) => {
        if (!covered.current) return resolve()
        const layers = [...root.current.querySelectorAll('.pt__layer')].reverse()
        gsap
          .timeline({
            onComplete: () => {
              covered.current = false
              gsap.set(root.current, { visibility: 'hidden' })
              resolve()
            },
          })
          .to('.pt__mark', { scale: 0.8, opacity: 0, duration: 0.3, ease: 'power2.in' })
          .to(layers, { yPercent: -100, duration: 0.9, ease: 'expo.inOut', stagger: 0.08 }, '-=0.05')
      })
    },
  }))

  return (
    <div ref={root} className="pt" aria-hidden="true">
      <div className="pt__layer pt__layer--ember" />
      <div className="pt__layer pt__layer--red">
        <LogoMark className="pt__mark" />
      </div>
    </div>
  )
})

export default PageTransition
