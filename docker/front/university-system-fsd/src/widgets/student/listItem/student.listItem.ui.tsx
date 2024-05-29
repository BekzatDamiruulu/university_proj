import { useState, useCallback, FC } from 'react'
import { IStudent } from '../../../entities/student/student.contracts.ts'
import { StudentEditModal } from '../editModal/student.editModal.ui.tsx'
export const StudentListItem: FC<{ student: IStudent }> = ({ student }) => {
    const [hide, setHide] = useState(true)
    const toggleModal = useCallback(() => {
        setHide((s) => !s)
    }, [])
    const columns = ['fullName', 'group', 'age', 'phoneNumber', 'email']
    return (
        <>
            <tr className="list__divider"></tr>
            <tr key={student['id']}>
                <td>{student['fullName']}</td>
                <td>{student['group']?.['name']}</td>
                <td>{student['age']}</td>
                <td>{student['phoneNumber']}</td>
                <td>{student['email']}</td>
                <StudentEditModal student={student} />
            </tr>
        </>
    )
}
