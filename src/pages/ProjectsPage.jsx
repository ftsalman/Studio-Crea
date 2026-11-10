import { useTranslation } from 'react-i18next'
import { usePageTitle } from '@hooks/usePageTitle'
import ProjectsIndex from '@features/projects/ProjectsIndex'

export default function ProjectsPage() {
  const { t } = useTranslation()
  usePageTitle(t('nav.projects'))
  return <ProjectsIndex />
}
