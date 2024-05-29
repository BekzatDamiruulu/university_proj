import { EditModalLayout } from '../../../shared/ui/layouts.ui'
import { Context, FC, useContext, useState } from 'react'
import { UpdateGroup, DeleteGroup } from '../../../features/group'
import { CancelBtn } from '../../../shared/ui/edit.ui'
import { EditInput } from '../../../shared/ui/edit.ui'
import { groupApi, IGroup } from '../../../entities/group'
import { SelectFaculty } from '../../../features/faculty'
import { SelectTeacher } from '../../../features/teacher'
import { EditBtn } from '../../../shared/ui/edit.ui'
import { TTeacherPicked } from '../../../entities/teacher'
import { IFaculty } from '../../../entities/faculty'
import { IUpdate } from '../../../shared'
export const GroupEditModal: FC<{
    group: IGroup
}> = ({ group }) => {
    const [hide, setHide] = useState(true)
    const toggleModal = () => {
        setHide((h) => !h)
    }
    return (
        <>
            <EditBtn onClick={toggleModal}></EditBtn>
            {hide ? null : (
                <EditModalLayout
                    toggleModal={toggleModal}
                    headerText={'редактировать группу'}
                >
                    <GroupEdit
                        group={group}
                        toggleModal={toggleModal}
                    ></GroupEdit>
                </EditModalLayout>
            )}
        </>
    )
}

const GroupEdit = ({
    group,
    toggleModal,
}: {
    group: IGroup
    toggleModal: () => void
}) => {
    const [isValid, setIsValid] = useState<boolean | null>(null)
    const [groupName, setGroupName] = useState(group.name)
    const [faculty, setFaculty] = useState<IFaculty>(group.faculty)
    const [teacher, setTeacher] = useState<TTeacherPicked | null>(
        group.teacher
            ? { Id: group.teacher.id, Name: group.teacher.name }
            : null
    )
    const getChangedFields = () => {
        const changedFiles: IUpdate<
            IGroup,
            string | number | TTeacherPicked
        >[] = []
        if (faculty.id !== group.faculty.id) {
            changedFiles.push({
                fieldName: 'facultyId',
                fieldValue: faculty.id,
            })
        }
        if (group.name !== groupName) {
            changedFiles.push({
                fieldName: 'name',
                fieldValue: groupName,
            })
        }
        if (teacher && group.teacher?.id !== teacher?.Id) {
            changedFiles.push({
                fieldName: 'teacher',
                fieldValue: teacher,
            })
        }
        toggleModal()
        return changedFiles
    }
    return (
        <>
            <div className="editModal__body">
                <EditInput
                    placeholder={''}
                    name={'editNameOfGroup'}
                    labelText={'Названия группы:'}
                    value={groupName}
                    setStateValue={(value) => {
                        setGroupName(value)
                    }}
                />
                {isValid && (
                    <div className="fieldIsNotValid">
                        Введите названия группы
                    </div>
                )}
                <SelectFaculty setValue={setFaculty} value={faculty} />
                <SelectTeacher activeTeacher={teacher} setValue={setTeacher} />
            </div>
            <div className="editModal__footer">
                <CancelBtn onClick={toggleModal}></CancelBtn>
                <DeleteGroup groupId={group.id}></DeleteGroup>
                <UpdateGroup
                    lastTeacherId={group.teacher?.id ?? null}
                    groupId={group.id}
                    getChangedFields={getChangedFields}
                ></UpdateGroup>
            </div>
        </>
    )
}
