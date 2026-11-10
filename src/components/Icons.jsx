export const ArrowIcon = ({ className, direction = 'right' }) => {
  const rot = { right: 0, down: 90, left: 180, up: -90, 'up-right': -45 }[direction] ?? 0
  return (
    <svg className={className} viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" style={{ transform: `rotate(${rot}deg)` }}>
      <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export const PlayIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true">
    <path d="M7 4.5v15l13-7.5z" fill="currentColor" />
  </svg>
)

export const CloseIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true">
    <path d="M5 5l14 14M19 5L5 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)
