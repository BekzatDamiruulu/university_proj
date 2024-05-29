import { SaveBtn } from '../../../shared/ui/edit.ui'
import {
    groupHooks,
    groupActions,
    groupApi,
    IGroup,
} from '../../../entities/group'
import { Context, FC, useContext } from 'react'
import { IProcessContext, IUpdate, ProcessContext } from '../../../shared'
import {
    teacherActions,
    teacherApi,
    TTeacherPicked,
} from '../../../entities/teacher'
import { useDispatch } from 'react-redux'
export const UpdateGroup: FC<{
    groupId: number
    getChangedFields: () => IUpdate<IGroup, string | number | TTeacherPicked>[]
    lastTeacherId: number | null
}> = ({ groupId, getChangedFields, lastTeacherId }) => {
    const { setTime, setStatus } = useContext(
        ProcessContext as Context<IProcessContext>
    )

    const { updateGroupById } = groupApi
    const dispatch = useDispatch()
    const { updateTeacher } = teacherApi
    const { addNewTeacherWithCertainProps, deleteTeacherWithCertainProps } =
        teacherActions
    const { updateGroup, updateGroupTeacher } = groupActions

    const onClick = () => {
        if (getChangedFields().length > 0) {
            setStatus('loading')
            const changedFields = getChangedFields()
            let teacher = changedFields.find((update, i) => {
                if (update.fieldName === 'teacher') {
                    changedFields.splice(i, 1)
                    return true
                }
            })
            const updateGroupFields = () => {
                if (changedFields.length > 0) {
                    console.log('update changed fields')
                    updateGroupById(groupId, changedFields)
                        .then(({ data }) => {
                            dispatch(updateGroup(data))
                            setStatus('success')
                            setTime()
                        })
                        .catch((e) => {
                            setStatus('error')
                            setTime()
                        })
                    return
                } else {
                    setStatus('success')
                    setTime()
                }
            }
            const updateTeacherFunc = () => {
                if (teacher) {
                    const fieldTeacher = teacher.fieldValue as TTeacherPicked
                    updateTeacher(fieldTeacher.Id, [
                        {
                            fieldName: 'groupId',
                            fieldValue: groupId,
                        },
                    ])
                        .then(({ data }) => {
                            dispatch(
                                deleteTeacherWithCertainProps(fieldTeacher.Id)
                            )
                            dispatch(updateGroupTeacher(data))
                        })
                        .catch((e) => {
                            setStatus('error')
                            setTime()
                        })
                        .finally(updateGroupFields)
                    return
                } else {
                    updateGroupFields()
                }
            }

            if (lastTeacherId != null && teacher) {
                updateTeacher(lastTeacherId, [
                    {
                        fieldName: 'groupId',
                        fieldValue: null,
                    },
                ])
                    .then(({ data }) => {
                        dispatch(
                            addNewTeacherWithCertainProps({
                                Id: data.id,
                                Name: data.name,
                            })
                        )
                    })
                    .catch((e) => {
                        setStatus('error')
                        setTime()
                    })
                    .finally(() => {
                        updateTeacherFunc()
                    })
                return
            } else {
                updateTeacherFunc()
            }
        }
    }
    return <SaveBtn onClick={onClick} />
}
