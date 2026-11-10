import { useRef } from 'react'
import { cn } from '@utils/cn'
import { useMagnetic } from '@hooks/useMagnetic'
import RollText from './RollText'
import TLink from './TLink'
import { ArrowIcon } from './Icons'
import './Button.css'

/**
 * Pill button: a dot on the left that floods the pill with color on hover,
 * letter-roll label, an arrow that slides in, and a magnetic pull.
 *
 * variant: 'dark' | 'light' | 'red' | 'outline'
 */
export default function Button({
  children,
  to,
  href,
  variant = 'dark',
  size = 'md',
  arrow = true,
  magnetic = true,
  className,
  type = 'button',
  ...rest
}) {
  const ref = useRef(null)
  useMagnetic(ref, { strength: 0.25, inner: '.btn__inner', enabled: magnetic })

  const content = (
    <span className="btn__inner">
      <span className="btn__fill" aria-hidden="true" />
      <span className="btn__dot" aria-hidden="true" />
      <RollText className="btn__label">{children}</RollText>
      {arrow && (
        <span className="btn__arrow" aria-hidden="true">
          <ArrowIcon />
        </span>
      )}
    </span>
  )

  const cls = cn('btn', 'roll-host', `btn--${variant}`, `btn--${size}`, { 'btn--arrow': arrow }, className)

  if (to) {
    return (
      <TLink ref={ref} to={to} className={cls} {...rest}>
        {content}
      </TLink>
    )
  }
  if (href) {
    return (
      <a ref={ref} href={href} className={cls} {...rest}>
        {content}
      </a>
    )
  }
  return (
    <button ref={ref} type={type} className={cls} {...rest}>
      {content}
    </button>
  )
}
