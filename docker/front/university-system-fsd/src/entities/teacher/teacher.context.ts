import { createContext } from 'react'
import { IContext } from '../../shared'

export const TeacherContext = createContext<IContext | null>(null)
