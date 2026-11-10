import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { FieryRibs } from '@lib/webgl/FieryRibs'
import { cn } from '@utils/cn'
import './FieryCanvas.css'

/**
 * React wrapper for the WebGL brand texture.
 * A brand-new <canvas> is created on every mount: a canvas can only ever hold
 * one WebGL context, so reusing it after cleanup (e.g. React StrictMode's
 * double mount in dev) would leave a dead, blank context.
 * The wrapper's CSS gradient shows whenever WebGL is unavailable or lost.
 */
const FieryCanvas = forwardRef(function FieryCanvas({ className, ribs = 70, refract = 0.09 }, ref) {
  const wrapRef = useRef(null)
  const fxRef = useRef(null)

  useImperativeHandle(ref, () => ({ setScroll: (v) => fxRef.current?.setScroll(v) }), [])

  useEffect(() => {
    const wrap = wrapRef.current
    const canvas = document.createElement('canvas')
    canvas.setAttribute('aria-hidden', 'true')
    wrap.appendChild(canvas)

    let fx
    try {
      fx = new FieryRibs(canvas, { ribs, refract })
      if (fx.failed) throw new Error('WebGL not supported')
      fx.start()
      fxRef.current = fx
      wrap.classList.add('is-live')
    } catch (err) {
      console.warn('[FieryCanvas] WebGL unavailable, using CSS fallback', err)
    }

    const onLost = (e) => {
      e.preventDefault()
      wrap.classList.remove('is-live')
    }
    canvas.addEventListener('webglcontextlost', onLost)

    return () => {
      canvas.removeEventListener('webglcontextlost', onLost)
      fx?.destroy()
      fxRef.current = null
      canvas.remove()
      wrap.classList.remove('is-live')
    }
  }, [ribs, refract])

  return <div ref={wrapRef} className={cn('fiery-canvas', className)} aria-hidden="true" />
})

export default FieryCanvas
