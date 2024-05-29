import { SaveBtn } from '../../../shared/ui/edit.ui/index.ts'
import { FC } from 'react'
import { IUpdate } from '../../../shared/index.ts'
import { subjectApi } from '../../../entities/subject/index.ts'
import { subjectActions } from '../../../entities/subject/schedule.model.ts'
import { useDispatch } from 'react-redux'
import { ISubject } from '../../../entities/subject/schedule.contracts.ts'

export const UpdateSubject = ({
    subjectId,
    subject,
}: {
    subjectId: number
    subject: IUpdate<ISubject, string | number | null>[]
}) => {
    const { updateSubject } = subjectApi
    const { updateSubjectAct } = subjectActions
    const dispatch = useDispatch()

    const update = () => {
        updateSubject(subjectId, subject)
            .then(({ data }) => {
                dispatch(updateSubjectAct(data))
            })
            .catch((e) => alert('ERROR ON UDPATING'))
    }
    return <SaveBtn onClick={update} />
}
