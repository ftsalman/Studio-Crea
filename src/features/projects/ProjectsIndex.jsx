import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { gsap, ScrollTrigger, useGSAP } from '@utils/gsap'
import { cn } from '@utils/cn'
import { pad } from '@utils/math'
import { useApp } from '@hooks/useApp'
import { PROJECTS } from '@constants/projects'
import { projectPath } from '@constants/routes'
import Eyebrow from '@components/Eyebrow'
import RevealText from '@components/RevealText'
import RollText from '@components/RollText'
import TLink from '@components/TLink'
import ArtCover from '@components/ArtCover'
import { ArrowIcon } from '@components/Icons'
import ProjectCard from './ProjectCard'
import './ProjectsIndex.css'

export default function ProjectsIndex() {
  const { t } = useTranslation()
  const { loaded } = useApp()
  const [view, setView] = useState('list')
  const [active, setActive] = useState(-1)
  const ref = useRef(null)
  const previewRef = useRef(null)

  // floating preview that trails the cursor over the list rows
  useEffect(() => {
    const el = previewRef.current
    if (!el || view !== 'list') return
    const xTo = gsap.quickTo(el, 'x', { duration: 0.7, ease: 'power3' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.7, ease: 'power3' })
    const rTo = gsap.quickTo(el, 'rotate', { duration: 0.9, ease: 'power3' })
    let lastX = 0
    const move = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
      rTo(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6))
      lastX = e.clientX
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [view])

  useGSAP(
    () => {
      gsap.from('.pindex__view > *', {
        y: 80,
        opacity: 0,
        stagger: 0.07,
        duration: 1.2,
        delay: 0.2,
      })
      ScrollTrigger.refresh()
    },
    { scope: ref, dependencies: [view], revertOnUpdate: true }
  )

  return (
    <section ref={ref} className="pindex container">
      <div className="pindex__head">
        <div>
          <Eyebrow>{t('projects.eyebrow')}</Eyebrow>
          <RevealText as="h1" className="page-title" play={loaded} scroll={false} delay={0.5}>
            {t('projects.title')}
          </RevealText>
        </div>
        <div className="pindex__toggle" role="tablist">
          {['list', 'grid'].map((v) => (
            <button
              key={v}
              type="button"
              role="tab"
              aria-selected={view === v}
              className={cn({ 'is-active': view === v })}
              onClick={() => setView(v)}
            >
              {t(`projects.${v}`)}
            </button>
          ))}
          <sup>{pad(PROJECTS.length)}</sup>
        </div>
      </div>

      {view === 'list' ? (
        <ul className="pindex__view pindex__list" onMouseLeave={() => setActive(-1)}>
          {PROJECTS.map((p, i) => (
            <li key={p.slug} onMouseEnter={() => setActive(i)}>
              <TLink to={projectPath(p.slug)} className={cn('prow', 'roll-host', { 'is-dim': active !== -1 && active !== i })}>
                <span className="prow__num">{pad(i + 1)}</span>
                <span className="prow__title">
                  <RollText>{p.title}</RollText>
                </span>
                <span className="prow__tags">{p.tags.join(' · ')}</span>
                <span className="prow__year">{p.year}</span>
                <span className="prow__arrow">
                  <ArrowIcon direction="up-right" />
                </span>
              </TLink>
            </li>
          ))}
        </ul>
      ) : (
        <div className="pindex__view pindex__grid">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      )}

      {view === 'list' && (
        <div ref={previewRef} className={cn('pindex__preview', { 'is-visible': active !== -1 })} aria-hidden="true">
          <div className="pindex__preview-track" style={{ transform: `translateY(${-Math.max(active, 0) * 100}%)` }}>
            {PROJECTS.map((p) => (
              <ArtCover key={p.slug} project={p} parallax={false} reveal={false} />
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
