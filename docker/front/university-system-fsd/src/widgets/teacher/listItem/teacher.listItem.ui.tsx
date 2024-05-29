import { FC } from 'react'
import { ITeacher } from '../../../entities/teacher/index.ts'
import { TeacherEditModal } from '../editModal/teacher.editModal.ui.tsx'
export const TeacherItem: FC<{ teacher: ITeacher }> = ({ teacher }) => {
    return (
        <>
            <tr className="list__divider"></tr>
            <tr key={teacher.id}>
                <td key={0}>{teacher['name']}</td>
                <td key={1}>{teacher['teachersSubject']}</td>
                <td key={2}>{teacher.group?.name}</td>
                <td key={3}>{teacher['birthDate']}</td>
                <TeacherEditModal teacher={teacher} />
            </tr>
        </>
    )
}
