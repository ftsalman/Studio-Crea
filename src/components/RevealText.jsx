import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '@utils/gsap'
import { cn } from '@utils/cn'
import './RevealText.css'

const STAGGER = { lines: 0.1, words: 0.035, chars: 0.018 }

/**
 * Masked text reveal (lines / words / chars slide up from behind a mask).
 * - `scroll` (default) waits until the element enters the viewport.
 * - `play={false}` holds the text hidden until you flip it (e.g. after the preloader).
 */
export default function RevealText({
  as: Tag = 'div',
  children,
  type = 'lines',
  play = true,
  scroll = true,
  delay = 0,
  stagger,
  duration = 1.3,
  start = 'top 88%',
  className,
  ...rest
}) {
  const ref = useRef(null)
  const text = typeof children === 'string' ? children : ''

  useGSAP(
    () => {
      const el = ref.current
      if (!el || !play) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(el, { visibility: 'visible' })
        return
      }
      const split = SplitText.create(el, {
        type: type === 'chars' ? 'words,chars' : type,
        mask: type,
        autoSplit: true,
        onSplit(self) {
          gsap.set(el, { visibility: 'visible' })
          return gsap.from(self[type], {
            yPercent: 120,
            rotate: type === 'lines' ? 3 : 0,
            transformOrigin: '0% 0%',
            duration,
            ease: 'expo.out',
            stagger: stagger ?? STAGGER[type],
            delay,
            scrollTrigger: scroll ? { trigger: el, start, once: true } : undefined,
          })
        },
      })
      return () => split.revert()
    },
    { dependencies: [play, text, type], scope: ref }
  )

  return (
    <Tag key={text} ref={ref} className={cn('reveal', className)} {...rest}>
      {children}
    </Tag>
  )
}
