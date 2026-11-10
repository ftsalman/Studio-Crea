import { useTranslation } from 'react-i18next'
import { useApp } from '@hooks/useApp'
import { PROJECTS } from '@constants/projects'
import { projectPath, ROUTES } from '@constants/routes'
import Eyebrow from '@components/Eyebrow'
import RevealText from '@components/RevealText'
import ArtCover from '@components/ArtCover'
import TLink from '@components/TLink'
import Button from '@components/Button'
import { ArrowIcon } from '@components/Icons'
import './ProjectDetail.css'

/** Shift a project's palette to generate extra gallery shots for the case study. */
const variant = (p, n) =>
  p.image && n === 0
    ? p
    : { ...p, image: undefined, art: { a: p.art?.c ?? '#ff6a13', b: p.art?.a ?? '#e8160a', c: p.art?.b ?? '#7a0500', angle: (p.art?.angle ?? 160) + 60 * (n + 1) } }

export default function ProjectDetail({ project }) {
  const { t } = useTranslation()
  const { loaded } = useApp()
  const idx = PROJECTS.findIndex((p) => p.slug === project.slug)
  const next = PROJECTS[(idx + 1) % PROJECTS.length]

  return (
    <article className="pdetail">
      <header className="pdetail__hero container">
        <Eyebrow>{project.tags.join(' · ')}</Eyebrow>
        <RevealText as="h1" type="chars" className="pdetail__title" play={loaded} scroll={false} delay={0.5}>
          {project.title}
        </RevealText>
        <dl className="pdetail__meta">
          <div>
            <dt>{t('projects.client')}</dt>
            <dd>{project.client}</dd>
          </div>
          <div>
            <dt>{t('projects.year')}</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>{t('projects.services')}</dt>
            <dd>{project.tags.join(', ')}</dd>
          </div>
        </dl>
      </header>

      <div className="pdetail__cover container">
        <ArtCover project={project} eager />
      </div>

      <section className="pdetail__body container">
        <RevealText as="p" className="pdetail__summary">
          {project.summary}
        </RevealText>
        <div className="pdetail__cols">
          <div>
            <h2>{t('projects.challenge')}</h2>
            <RevealText as="p">{t('projects.challengeBody')}</RevealText>
          </div>
          <div>
            <h2>{t('projects.approach')}</h2>
            <RevealText as="p">{t('projects.approachBody')}</RevealText>
          </div>
        </div>
      </section>

      <section className="pdetail__gallery container">
        <ArtCover project={variant(project, 1)} />
        <ArtCover project={variant(project, 2)} />
      </section>

      <div className="pdetail__back container">
        <Button to={ROUTES.PROJECTS} variant="outline">
          {t('projects.back')}
        </Button>
      </div>

      <TLink to={projectPath(next.slug)} className="pdetail__next" data-cursor={t('projects.next')} data-header="dark">
        <span className="pdetail__next-label">
          {t('projects.next')} <ArrowIcon />
        </span>
        <span className="pdetail__next-title">{next.title}</span>
      </TLink>
    </article>
  )
}
