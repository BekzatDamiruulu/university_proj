import { DeleteBtn } from '../../../shared/ui/edit.ui'
import { FC, useRef } from 'react'
import { studentApi, studentsActions } from '../../../entities/student'
import { useDispatch } from 'react-redux'
export const DeleteStudent: FC<{ studentId: number }> = ({ studentId }) => {
    const dispatch = useDispatch()
    const { deleteStudent } = studentApi
    const { deleteStudent: delAct } = studentsActions
    const onDelete = () => {
        try {
            deleteStudent(studentId)
            dispatch(delAct(studentId))
        } catch (e) {
            alert(e)
        }
    }
    return <DeleteBtn onDelete={onDelete} />
}
