import { SaveBtn } from '../../../shared/ui/edit.ui'
import { FC } from 'react'
import { IUpdate } from '../../../shared'
import { ITeacher, teacherActions, teacherApi } from '../../../entities/teacher'
import { useTeacherDispatch } from '../../../entities/teacher/hooks'

export const UpdateTeacher: FC<{
    teacher: IUpdate<ITeacher, string | number>[]
    teacherId: number
}> = ({ teacher, teacherId }) => {
    const { updateTeacher } = teacherApi
    const { updateTeacher: updateAct } = teacherActions
    const dispatch = useTeacherDispatch()

    const onClick = () => {
        updateTeacher(teacherId, teacher)
            .then(({ data }) => {
                dispatch(updateAct(data))
            })
            .catch((e) => alert('error in updateTeacher'))
    }
    return <SaveBtn onClick={onClick}></SaveBtn>
}
