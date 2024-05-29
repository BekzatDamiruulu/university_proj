import { createContext } from 'react'
import { IContext } from '../../shared'

export const StudentContext = createContext<IContext | null>(null)
