import { MutableRefObject } from 'react'
import { subjectApi } from '../../../entities/subject/index.ts'
import { useDispatch } from 'react-redux'
import { subjectActions } from '../../../entities/subject/schedule.model.ts'

export function DeleteSubject(
    subjectId: number,
    ref: MutableRefObject<HTMLDivElement | null>
) {
    console.log(ref, subjectId)
    const dispatch = useDispatch()
    const { deleteSubjectAct } = subjectActions
    const { deleteSubject } = subjectApi
    try {
        deleteSubject(subjectId)
        ref.current?.classList.add('scheduleItem__deleted')
        const timeId = setTimeout(() => {
            dispatch(deleteSubjectAct(subjectId))
            clearTimeout(timeId)
        }, 1100)
    } catch (e) {
        alert('error in deleting subject')
    }
}
