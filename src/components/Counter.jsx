import { useRef } from 'react'
import { gsap, useGSAP } from '@utils/gsap'

/** Number that counts up when scrolled into view. */
export default function Counter({ value, suffix = '', duration = 2.2 }) {
  const ref = useRef(null)

  useGSAP(
    () => {
      const obj = { v: 0 }
      gsap.to(obj, {
        v: value,
        duration,
        ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 90%', once: true },
        onUpdate: () => {
          if (ref.current) ref.current.textContent = `${Math.round(obj.v)}${suffix}`
        },
      })
    },
    { scope: ref, dependencies: [value] }
  )

  return <span ref={ref}>{`0${suffix}`}</span>
}
