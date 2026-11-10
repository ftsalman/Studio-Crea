import { useEffect } from 'react'
import { gsap } from '@utils/gsap'

/** Pulls an element toward the pointer while hovered (Lusion-style magnetic buttons). */
export function useMagnetic(ref, { strength = 0.35, inner, enabled = true } = {}) {
  useEffect(() => {
    const el = ref.current
    if (!enabled || !el || window.matchMedia('(hover: none)').matches) return
    const xTo = gsap.quickTo(el, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
    const innerEl = inner ? el.querySelector(inner) : null
    const ixTo = innerEl && gsap.quickTo(innerEl, 'x', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })
    const iyTo = innerEl && gsap.quickTo(innerEl, 'y', { duration: 0.8, ease: 'elastic.out(1, 0.4)' })

    const move = (e) => {
      const r = el.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2)
      const dy = e.clientY - (r.top + r.height / 2)
      xTo(dx * strength)
      yTo(dy * strength)
      ixTo?.(dx * strength * 0.4)
      iyTo?.(dy * strength * 0.4)
    }
    const leave = () => {
      xTo(0); yTo(0); ixTo?.(0); iyTo?.(0)
    }
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    return () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    }
  }, [ref, strength, inner, enabled])
}
