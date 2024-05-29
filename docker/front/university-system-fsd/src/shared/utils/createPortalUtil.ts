import { createPortal } from 'react-dom'
import { FC, ReactElement, useEffect, useMemo } from 'react'
export const CreatePortal: FC<{
    toggleModal: () => void
    children: ReactElement
}> = ({ toggleModal, children }) => {
    const div = useMemo(() => {
        return document.createElement('div')
    }, [])
    div.className = 'portal'
    useEffect(() => {
        const modal = div.querySelector('div')
        modal?.addEventListener('click', (e) => {
            if (e.currentTarget === e.target) {
                toggleModal()
                div.remove()
            }
        })
        return () => {
            div.remove()
            modal?.removeEventListener('click', (e) => {
                if (e.currentTarget === e.target) {
                    toggleModal()
                    div.remove()
                }
            })
        }
    }, [])
    document.body.append(div)
    return createPortal(children, div)
}
