import { SaveBtn } from '../../../shared/ui/edit.ui/index.ts'
import { FC } from 'react'
import { IUpdate } from '../../../shared/index.ts'
import { studentApi, studentsActions } from '../../../entities/student/index.ts'
import { useDispatch } from 'react-redux'
import { IStudent } from '../../../entities/student/student.contracts.ts'
export const UpdateStudent: FC<{
    studentId: number
    getUpdateFields: () => IUpdate<IStudent, string | number>[]
}> = ({ studentId, getUpdateFields }) => {
    const { updateStudent } = studentApi
    const dispatch = useDispatch()
    const { updateStudent: updateAct } = studentsActions
    const onClick = () => {
        console.log(getUpdateFields())
        updateStudent(studentId, getUpdateFields())
            .then((response) => dispatch(updateAct(response.data)))
            .catch((e) => {
                alert(e)
            })
    }
    return <SaveBtn onClick={onClick} />
}
