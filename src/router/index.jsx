import { createBrowserRouter } from 'react-router-dom'
import { ROUTES } from '@constants/routes'
import MainLayout from '@layout/MainLayout'
import HomePage from '@pages/HomePage'
import AboutPage from '@pages/AboutPage'
import ProjectsPage from '@pages/ProjectsPage'
import ProjectPage from '@pages/ProjectPage'
import ContactPage from '@pages/ContactPage'
import NotFoundPage from '@pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.ABOUT, element: <AboutPage /> },
      { path: ROUTES.PROJECTS, element: <ProjectsPage /> },
      { path: ROUTES.PROJECT, element: <ProjectPage /> },
      { path: ROUTES.CONTACT, element: <ContactPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
