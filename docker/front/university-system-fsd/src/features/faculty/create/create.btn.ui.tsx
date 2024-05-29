import { SaveBtn } from '../../../shared/ui/edit.ui'
import { FC } from 'react'
import { facultyApi } from '../../../entities/faculty'

export const CreateFaculty: FC<{
    toggleModal: () => void
    setStatus: (s: 'idle' | 'error' | 'loading' | 'success') => void
    facultyName: string
}> = ({ toggleModal, setStatus, facultyName }) => {
    const { createFaculty } = facultyApi
    function onSubmit() {
        toggleModal()
        setStatus('loading')
        createFaculty({ name: facultyName })
            .then(() => {
                setStatus('success')
                const timeId = setTimeout(() => {
                    clearTimeout(timeId)
                    setStatus('idle')
                }, 1200)
            })
            .catch((e) => {
                setStatus('error')
                const timeId = setTimeout(() => {
                    clearTimeout(timeId)
                    setStatus('idle')
                }, 1200)
            })
    }
    return <SaveBtn onClick={onSubmit}></SaveBtn>
}
