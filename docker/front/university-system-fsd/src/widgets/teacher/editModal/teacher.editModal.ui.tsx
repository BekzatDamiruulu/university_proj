import { EditModalLayout } from '../../../shared/ui/layouts.ui'
import { Context, FC, useContext, useRef, useState } from 'react'
import { CancelBtn, EditInput, EditBtn } from '../../../shared/ui/edit.ui'
import { SelectGroupWithFilter } from '../../../features/group'
import { ITeacher, teacherActions, teacherApi } from '../../../entities/teacher'
import { useFormik } from 'formik'
import { IProcessContext, IUpdate, ProcessContext } from '../../../shared'
import { SaveBtn } from '../../../shared/ui/edit.ui'
import { groupActions, TGroupPick } from '../../../entities/group'
import { useDispatch } from 'react-redux'
import { DeleteTeacher } from '../../../features/teacher'
function validate(values: IFormikValues) {
    const error: Partial<{ birthDate: string }> = {}
    if (!values.birthDate) {
        error.birthDate = 'Заполните поле !'
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.birthDate)) {
        error.birthDate = 'Дата не валидный !'
    }
    return error
}

interface IFormikValues {
    name: string
    birthDate: string
    teachersSubject: string
    group: TGroupPick | null
}
export const TeacherEditModal: FC<{
    teacher: ITeacher
}> = ({ teacher }) => {
    const [hide, setHide] = useState(true)
    const toggleModal = () => {
        setHide((h) => !h)
    }
    return (
        <>
            <EditBtn onClick={toggleModal}></EditBtn>
            {!hide ? (
                <EditModalLayout
                    toggleModal={toggleModal}
                    headerText={'редактировать '}
                >
                    <EditTeacher teacher={teacher} toggleModal={toggleModal} />
                </EditModalLayout>
            ) : null}
        </>
    )
}
const EditTeacher = ({
    teacher,
    toggleModal,
}: {
    teacher: ITeacher
    toggleModal: () => void
}) => {
    const { setTime, setStatus } = useContext(
        ProcessContext as Context<IProcessContext>
    )
    const dispatch = useDispatch()
    const updateFields = useRef<IUpdate<ITeacher, string | number>[]>([])
    const { updateTeacher: updateTeacherAction } = teacherActions
    const { deleteGroupWithCertainProps, addGroupWithCertainProps } =
        groupActions
    const { updateTeacher } = teacherApi

    const formik = useFormik<IFormikValues>({
        initialValues: {
            name: teacher.name,
            birthDate: teacher.birthDate,
            teachersSubject: teacher.teachersSubject ?? '',
            group: teacher.group
                ? { Id: teacher.groupId, Name: teacher.group.name }
                : null,
        },
        validate,
        onSubmit: ({ group, name, teachersSubject, birthDate }) => {
            console.log('submit')
            console.log(group, teacher.group)
            setStatus('loading')
            if (group && group?.Id != teacher.groupId) {
                updateFields.current.push({
                    fieldName: 'groupId',
                    fieldValue: group.Id,
                })
            }
            if (name !== teacher.name) {
                updateFields.current.push({
                    fieldName: 'name',
                    fieldValue: name,
                })
            }
            if (teachersSubject !== teacher.teachersSubject) {
                updateFields.current.push({
                    fieldName: 'teachersSubject',
                    fieldValue: teachersSubject,
                })
            }
            if (birthDate !== teacher.birthDate) {
                updateFields.current.push({
                    fieldName: 'birthDate',
                    fieldValue: birthDate,
                })
            }
            const updateFunction = () => {
                updateTeacher(teacher.id, updateFields.current)
                    .then(({ data }) => {
                        formik.resetForm()
                        toggleModal()
                        dispatch(updateTeacherAction(data))
                        setStatus('success')
                        setTime()
                    })
                    .catch((e) => {
                        setStatus('error')
                        setTime()
                    })
                    .finally(() => {})
            }

            if (group && group?.Id !== teacher.groupId) {
                dispatch(deleteGroupWithCertainProps(group.Id))
                teacher.group
                    ? dispatch(
                          addGroupWithCertainProps({
                              Id: teacher.groupId,
                              Name: teacher.group.name,
                          })
                      )
                    : (() => {})()
                updateTeacher(teacher.id, [
                    { fieldValue: null, fieldName: 'groupId' },
                ])
                    .then(({ data }) => {
                        dispatch(updateTeacherAction(data))
                    })
                    .catch((e) => alert(e))
                    .finally(updateFunction)
                return
            }
            updateFunction()
        },
    })
    function onChange(name: string, value: IFormikValues[keyof IFormikValues]) {
        formik.handleChange({ target: { name, value } })
    }

    return (
        <>
            <div className="editModal__body">
                <EditInput
                    placeholder={'ФИО'}
                    setStateValue={(v) => onChange('name', v)}
                    name={'editNameOfTeacher'}
                    labelText={'ФИО учителя:'}
                    value={formik.values.name}
                />
                <EditInput
                    placeholder={'Предмет'}
                    setStateValue={(v) => onChange('teachersSubject', v)}
                    name={'editSubjectOfTeacher'}
                    labelText={'Предмет:'}
                    value={formik.values.teachersSubject}
                />
                <EditInput
                    placeholder={'День рождения'}
                    setStateValue={(v:string) => onChange('birthDate', v)}
                    name={'editBirthDate'}
                    labelText={'День рождения:'}
                    value={formik.values.birthDate}
                />
                {formik.touched.birthDate && formik.errors.birthDate && (
                    <div className="fieldIsNotValid">
                        {formik.errors.birthDate}
                    </div>
                )}
                <SelectGroupWithFilter
                    value={formik.values.group}
                    setValue={(v) => onChange('group', v)}
                    filter={{
                        filterBy: 'Teacher',
                        filterValue: null,
                        filterConditions: ['EXACT'],
                    }}
                />
            </div>
            <div className="editModal__footer">
                <CancelBtn onClick={toggleModal}></CancelBtn>
                <DeleteTeacher teacherId={teacher.id} />
                <SaveBtn
                    onClick={() => {
                        formik.handleSubmit()
                    }}
                />
            </div>
        </>
    )
}
