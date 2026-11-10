import { cn } from '@utils/cn'
import './Eyebrow.css'

export default function Eyebrow({ children, className, index }) {
  return (
    <span className={cn('eyebrow', className)}>
      <i aria-hidden="true" />
      {index && <em>{index}</em>}
      {children}
    </span>
  )
}
