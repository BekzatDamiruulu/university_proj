import { EditModalLayout } from '../../../shared/ui/layouts.ui/index.ts'
import { Context, FC, useContext, useRef, useState } from 'react'
import { CancelBtn, SaveBtn } from '../../../shared/ui/edit.ui/index.ts'
import { EditInput } from '../../../shared/ui/edit.ui/index.ts'
import { EditBtn } from '../../../shared/ui/edit.ui/index.ts'
import { useFormik } from 'formik'
import { IStudent } from '../../../entities/student/student.contracts.ts'
import { SelectGroup } from '../../../features/group/index.ts'
import { DeleteStudent } from '../../../features/student/index.ts'
import { groupApi, TGroupPick } from '../../../entities/group/index.ts'
import {
    IProcessContext,
    IUpdate,
    ProcessContext,
} from '../../../shared/index.ts'
import { studentApi, studentsActions } from '../../../entities/student/index.ts'
import { useDispatch } from 'react-redux'
type TValues = Omit<IStudent, 'id' | 'group' | 'groupId' | 'photo'> & {
    group: TGroupPick | null
}
type TError = Partial<Omit<TValues, 'age' | 'groupName'> & { age: string }>

function validate(values: TValues) {
    const error: TError = {}
    if (!values.fullName) {
        error.fullName = 'Заполните поле !'
    }
    if (!values.email) {
        error.email = 'Введите email !'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
        error.email = 'Введите правильный формат email !'
    }
    if (!values.phoneNumber) {
        error.phoneNumber = 'Введите номер телефона !'
    } else if (!/^(996|0)(\d{9})$/.test(values.phoneNumber)) {
        error.phoneNumber = 'Введите правильный формат !'
    }
    if (values.age < 0) {
        error.age = 'Возвраст должен быть положительным !'
    } else if (values.age > 100) {
        error.age = 'Возвраст не должен превышать 100 !'
    } else if (values.age < 10) {
        error.age = 'Возвраст не должен меньше 10 !'
    }
    return error
}
export const StudentEditModal: FC<{
    student: IStudent
}> = ({ student }) => {
    const { status } = useContext(ProcessContext as Context<IProcessContext>)
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
                    headerText={'редактировать'}
                >
                    <EditStudent
                        student={student}
                        toggleModal={toggleModal}
                    ></EditStudent>
                </EditModalLayout>
            ) : null}
        </>
    )
}

const EditStudent = ({
    student,
    toggleModal,
}: {
    student: IStudent
    toggleModal: () => void
}) => {
    const { setStatus, setTime } = useContext(
        ProcessContext as Context<IProcessContext>
    )
    const dispatch = useDispatch()
    const { updateStudent } = studentApi
    const { updateStudent: updateAction, deleteStudent } = studentsActions
    const updateFields = useRef<IUpdate<IStudent, string | number>[]>([])
    const formik = useFormik<TValues>({
        initialValues: {
            fullName: student.fullName,
            age: student.age,
            phoneNumber: student.phoneNumber,
            email: student.email,
            group: student.group
                ? { Id: student.group?.id, Name: student.group?.name }
                : null,
        },
        validate,
        onSubmit: ({ fullName, age, phoneNumber, email, group }) => {
            setStatus('loading')
            if (fullName !== student.fullName) {
                updateFields.current.push({
                    fieldName: 'fullName',
                    fieldValue: fullName,
                })
            }
            if (age !== student.age) {
                updateFields.current.push({
                    fieldName: 'age',
                    fieldValue: age,
                })
            }
            if (phoneNumber !== student.phoneNumber) {
                updateFields.current.push({
                    fieldName: 'phoneNumber',
                    fieldValue: phoneNumber,
                })
            }
            if (email !== student.email) {
                updateFields.current.push({
                    fieldName: 'email',
                    fieldValue: email,
                })
            }
            if (group!.Id !== student.groupId) {
                updateFields.current.push({
                    fieldName: 'groupId',
                    fieldValue: group!.Id,
                })
            }
            updateStudent(student.id, updateFields.current)
                .then(({ data }) => {
                    if (data.groupId === student.groupId) {
                        dispatch(updateAction(data))
                        setStatus('success')
                        setTime()
                        toggleModal()
                        return
                    }
                    dispatch(deleteStudent(data.id))
                    setStatus('success')
                    setTime()
                })
                .catch((error) => {
                    setStatus('error')
                    setTime()
                    alert(error)
                })
            // const props = ['fullName', 'groupId', 'age', 'phoneNumber', 'email']
            // const updateStudentJson = [
            //     fullName,
            //     groupName,
            //     age,
            //     phoneNumber,
            //     email,
            // ]
            //     .map((e, i) => {
            //         if (props[i] == 'groupId') {
            //             const obj = groupsWithCertainProps.filter(
            //                 (g) => g.Name === e
            //             )[0]
            //             if (obj.Id != student.groupId) {
            //                 return {
            //                     fieldName: props[i],
            //                     fieldValue: +obj.Id,
            //                 }
            //             }
            //             return
            //         }
            //         if (student[props[i]] !== e) {
            //             return {
            //                 fieldName: props[i],
            //                 fieldValue: e,
            //             }
            //         }
            //     })
            //     .filter((f) => f)
            // if (updateStudentJson.length > 0) {
            //     updateStudent(student.id, JSON.stringify(updateStudentJson))
            //         .then((data) => {
            //             setStatus('success')
            //             const timeId = setTimeout(() => {
            //                 clearTimeout(timeId)
            //                 setStatus('idle')
            //             }, 1500)
            //             dispatch(updateStudentAct(data))
            //         })
            //         .catch((e) => {
            //             if (e.response.status === 401) {
            //                 dispatch(authActions.login(false))
            //             }
            //         })
            // }
        },
    })
    function onChange(name: keyof TValues, value: TValues[keyof TValues]) {
        formik.handleChange({ target: { name, value } })
    }
    return (
        <>
            <div className="editModal__body">
                <EditInput
                    placeholder={'ФИО'}
                    setStateValue={(v) => onChange('fullName', v)}
                    name={'editNameOfStudent'}
                    labelText={'ФИО студента:'}
                    value={formik.values.fullName}
                />
                {formik.touched.fullName && formik.errors.fullName && (
                    <div className="fieldIsNotValid">
                        {formik.errors.fullName}
                    </div>
                )}
                <EditInput
                    placeholder={'Возвраст '}
                    setStateValue={(v) => onChange('age', v)}
                    name={'age'}
                    labelText={'Возвраст студента:'}
                    value={formik.values.age}
                />
                {formik.touched.age && formik.errors.age && (
                    <div className="fieldIsNotValid">{formik.errors.age}</div>
                )}
                <EditInput
                    placeholder={'Номер '}
                    setStateValue={(v) => onChange('phoneNumber', v)}
                    name={'phoneNumber'}
                    labelText={'Телефон студента: '}
                    value={formik.values.phoneNumber}
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                    <div className="fieldIsNotValid">
                        {formik.errors.phoneNumber}
                    </div>
                )}
                <EditInput
                    placeholder={'Электронная почта '}
                    setStateValue={(v) => onChange('email', v)}
                    name={'email'}
                    labelText={'Электронная почта студента: '}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email && (
                    <div className="fieldIsNotValid">{formik.errors.email}</div>
                )}
                <SelectGroup
                    setValue={(v) => onChange('group', v)}
                    value={formik.values.group}
                ></SelectGroup>
            </div>
            <div className="editModal__footer">
                <CancelBtn onClick={toggleModal}></CancelBtn>
                <DeleteStudent studentId={student.id} />
                <SaveBtn onClick={formik.submitForm}></SaveBtn>
            </div>
        </>
    )
}
