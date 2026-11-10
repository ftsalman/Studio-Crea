import { cn } from '@utils/cn'
import './Logo.css'

/** The StudioCrea "S" monogram — two offset rounded slabs. */
export function LogoMark({ className }) {
  return (
    <svg className={cn('logo-mark', className)} viewBox="0 0 100 98" aria-hidden="true" focusable="false">
      <path
        className="logo-mark__top"
        d="M24 0H82C99 0 104 14 95 26L88 35C84 40 79 42 72 42H44C38 42 34 44 31 49L27 55C12 55 0 45 0 28C0 12 11 0 24 0Z"
      />
      <path
        className="logo-mark__bottom"
        d="M45 52H80C96 52 100 64 100 75C100 88 91 98 77 98H18C8 98 4 90 10 82L33 57C36 54 40 52 45 52Z"
      />
    </svg>
  )
}

export default function Logo({ className, showWord = true }) {
  return (
    <span className={cn('logo', className)} aria-label="StudioCrea">
      <LogoMark />
      {showWord && (
        <span className="logo__word" aria-hidden="true">
          <b>studio</b>crea
        </span>
      )}
    </span>
  )
}
