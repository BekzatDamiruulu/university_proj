import { SaveBtn } from '../../../shared/ui/edit.ui/index.ts'
import { IAddSubjectDto, subjectApi } from '../../../entities/subject/index.ts'
import { FC } from 'react'
import { subjectActions } from '../../../entities/subject/schedule.model.ts'
import { useDispatch } from 'react-redux'
export const CreateSubject: FC<{ onClick: () => void }> = ({ onClick }) => {
    const { postSubject } = subjectApi
    const { addSubject } = subjectActions
    const dispatch = useDispatch()

    return <SaveBtn onClick={onClick} btnText={'Добавить урок'} />
}
