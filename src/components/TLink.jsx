import { forwardRef } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '@hooks/useApp'

/** Router link that plays the page-transition curtain before navigating. */
const TLink = forwardRef(function TLink({ to, onClick, children, ...rest }, ref) {
  const { navigate } = useApp()

  const handleClick = (e) => {
    onClick?.(e)
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    e.preventDefault()
    navigate(to)
  }

  return (
    <Link ref={ref} to={to} onClick={handleClick} {...rest}>
      {children}
    </Link>
  )
})

export default TLink
