import { useContext } from 'react'
import { AppContext } from './appContext'

/** Global UI state: preloader finished, menu open, page transitions. */
export const useApp = () => useContext(AppContext)
