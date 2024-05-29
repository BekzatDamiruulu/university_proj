import { createContext } from 'react'
import { IProcessContext } from '../contracts.ts'

export const ProcessContext = createContext<IProcessContext | null>(null)
