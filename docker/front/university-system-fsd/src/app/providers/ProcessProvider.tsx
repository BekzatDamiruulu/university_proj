import { ProcessContext, TStatus } from '../../shared'
import { ReactNode, useCallback, useEffect, useState } from 'react'

export const ProcessProvider = ({ children }: { children: ReactNode }) => {
    const [status, setStatus] = useState<TStatus>('idle')
    const setTime = useCallback(() => {
        const id = setTimeout(() => {
            setStatus('idle')
            clearTimeout(id)
        }, 1500)
    }, [])
    return (
        <ProcessContext.Provider value={{ setTime, status, setStatus }}>
            {children}
        </ProcessContext.Provider>
    )
}
