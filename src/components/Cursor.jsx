import { useEffect, useRef } from 'react'
import { gsap } from '@utils/gsap'
import './Cursor.css'

/**
 * Custom cursor: a dot that trails the pointer, grows over interactive
 * elements, and turns into a labelled bubble over `[data-cursor="Label"]`.
 */
export default function Cursor() {
  const ref = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return
    const el = ref.current
    document.documentElement.classList.add('has-cursor')
    const xTo = gsap.quickTo(el, 'x', { duration: 0.45, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.45, ease: 'power3' })

    const move = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
      el.classList.add('is-visible')
    }
    const over = (e) => {
      const t = e.target
      if (!(t instanceof Element)) return
      const labelled = t.closest('[data-cursor]')
      const label = labelled?.getAttribute('data-cursor')
      if (label) labelRef.current.textContent = label
      el.classList.toggle('is-label', !!label)
      el.classList.toggle(
        'is-hover',
        !label && !!t.closest('a, button, [role="button"], input, textarea, select, label')
      )
    }
    const leave = () => el.classList.remove('is-visible')
    const down = () => el.classList.add('is-down')
    const up = () => el.classList.remove('is-down')

    window.addEventListener('pointermove', move)
    document.addEventListener('pointerover', over)
    document.documentElement.addEventListener('pointerleave', leave)
    window.addEventListener('pointerdown', down)
    window.addEventListener('pointerup', up)
    return () => {
      document.documentElement.classList.remove('has-cursor')
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('pointerleave', leave)
      window.removeEventListener('pointerdown', down)
      window.removeEventListener('pointerup', up)
    }
  }, [])

  return (
    <div ref={ref} className="cursor" aria-hidden="true">
      <div className="cursor__dot">
        <span ref={labelRef} className="cursor__label" />
      </div>
    </div>
  )
}
