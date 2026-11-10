import { useEffect, useRef } from 'react'
import { gsap } from '@utils/gsap'
import { useLenis } from '@hooks/useLenis'
import { cn } from '@utils/cn'
import './Marquee.css'

/**
 * Infinite marquee whose speed reacts to scroll velocity and whose direction
 * follows the scroll direction.
 */
export default function Marquee({ children, speed = 1, repeat = 4, reverse = false, className, separator = '✦' }) {
  const ref = useRef(null)
  const lenis = useLenis()

  useEffect(() => {
    const track = ref.current?.querySelector('.marquee__track')
    if (!track) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let x = 0
    let dir = -1
    const setX = gsap.quickSetter(track, 'xPercent')
    const setSkew = gsap.quickSetter(track, 'skewX', 'deg')
    let skew = 0

    const tick = (_t, delta) => {
      const v = lenis?.velocity ?? 0
      if (Math.abs(v) > 0.5) dir = v > 0 ? -1 : 1
      const f = delta / 16.67
      x += (reverse ? -dir : dir) * (speed * 0.025 + Math.min(Math.abs(v) * 0.012, 0.6)) * f * (reduce ? 0.2 : 1)
      if (x <= -50) x += 50
      if (x > 0) x -= 50
      skew += (gsap.utils.clamp(-8, 8, -v * 0.25) - skew) * 0.1
      setX(x)
      setSkew(reduce ? 0 : skew)
    }
    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [lenis, speed, reverse])

  const group = (key) => (
    <div className="marquee__group" key={key} aria-hidden={key !== 0}>
      {Array.from({ length: repeat }).map((_, i) => (
        <span className="marquee__item" key={i}>
          {children}
          <span className="marquee__sep" aria-hidden="true">
            {separator}
          </span>
        </span>
      ))}
    </div>
  )

  return (
    <div ref={ref} className={cn('marquee', className)}>
      <div className="marquee__track">{[group(0), group(1)]}</div>
    </div>
  )
}
