import { DeleteBtn } from '../../../shared/ui/edit.ui'
import { FC } from 'react'
import { teacherActions, teacherApi } from '../../../entities/teacher'
import { useTeacherDispatch } from '../../../entities/teacher/hooks'

export const DeleteTeacher: FC<{ teacherId: number }> = ({ teacherId }) => {
    const { deleteTeacher } = teacherApi
    const { deleteTeacher: delAct } = teacherActions
    const dispatch = useTeacherDispatch()
    const onClick = () => {
        try {
            deleteTeacher(teacherId)
            dispatch(delAct(teacherId))
        } catch (e) {
            alert('error in delete teacher')
        }
    }
    return <DeleteBtn onDelete={onClick}></DeleteBtn>
}
