import { useTranslation } from 'react-i18next'
import { projectPath } from '@constants/routes'
import { cn } from '@utils/cn'
import ArtCover from '@components/ArtCover'
import RollText from '@components/RollText'
import TLink from '@components/TLink'
import './ProjectCard.css'

export default function ProjectCard({ project, className }) {
  const { t } = useTranslation()
  return (
    <TLink to={projectPath(project.slug)} className={cn('pcard', 'roll-host', className)} data-cursor={t('work.view')}>
      <ArtCover project={project} />
      <div className="pcard__info">
        <h3 className="pcard__title">
          <RollText>{project.title}</RollText>
        </h3>
        <span className="pcard__year">{project.year}</span>
      </div>
      <ul className="pcard__tags">
        {project.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    </TLink>
  )
}
