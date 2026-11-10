import { cn } from '@utils/cn'
import './RollText.css'

/**
 * Letter-by-letter "roll" on hover: every character slides up and a copy
 * slides in from below with a small stagger. Triggers when any ancestor with
 * the `roll-host` class (buttons, links) is hovered.
 */
export default function RollText({ children, className }) {
  const text = String(children ?? '')
  return (
    <span className={cn('roll', className)}>
      <span className="sr-only">{text}</span>
      <span className="roll__row" aria-hidden="true">
        {[...text].map((c, i) => {
          const ch = c === ' ' ? ' ' : c
          return (
            <span className="roll__char" key={i} style={{ '--i': i }}>
              <span>{ch}</span>
              <span>{ch}</span>
            </span>
          )
        })}
      </span>
    </span>
  )
}
