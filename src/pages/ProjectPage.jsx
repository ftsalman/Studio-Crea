import { useParams } from 'react-router-dom'
import { findProject } from '@constants/projects'
import { usePageTitle } from '@hooks/usePageTitle'
import ProjectDetail from '@features/projects/ProjectDetail'
import NotFoundPage from './NotFoundPage'

export default function ProjectPage() {
  const { slug } = useParams()
  const project = findProject(slug)
  usePageTitle(project?.title)
  if (!project) return <NotFoundPage />
  return <ProjectDetail key={slug} project={project} />
}
