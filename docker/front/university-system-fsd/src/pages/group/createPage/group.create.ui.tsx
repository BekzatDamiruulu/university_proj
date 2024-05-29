import {
    CreateWrapper,
    InfoWrapper,
    CreateInput,
    AdditionInfo,
    SelectForCreate,
} from '../../../shared/ui/create.ui'
import {
    facultyActions,
    facultyApi,
    IFaculty,
    useLoadMoreFaculties,
} from '../../../entities/faculty'
import {
    TTeacherPicked,
    teacherActions,
    teacherApi,
} from '../../../entities/teacher'
import { useDispatch } from 'react-redux'
import { Context, useContext, useEffect, useState } from 'react'
import { useLoadMoreTeachers } from '../../../entities/teacher/hooks'
import { useAppSelector } from '../../../shared/hooks'
import { useFormik } from 'formik'
import { groupActions, groupApi } from '../../../entities/group'
import { IProcessContext, ProcessContext } from '../../../shared'

interface IFormikValues {
    teacher: TTeacherPicked | null
    groupName: string
    faculty: IFaculty | null
    countOfStudents: number
}

export const CreateGroupPage = () => {
    const { setTime, setStatus } = useContext(
        ProcessContext as Context<IProcessContext>
    )
    const { getFaculties } = facultyApi
    const { getTeachersCertainProps, updateTeacher } = teacherApi
    const { createGroup } = groupApi
    const { addGroup } = groupActions
    const {
        setTeachersWithCertainProps,
        deleteTeacherWithCertainProps,
        updateTeacher: updateTeacherAction,
        setTeachersWithCertainPropsInfo,
    } = teacherActions
    const { setFaculties, setFacultyStoreInfo } = facultyActions
    const dispatch = useDispatch()
    useEffect(() => {
        getFaculties(0, 10)
            .then(({ data: { result, ...info } }) => {
                dispatch(setFacultyStoreInfo(info))
                dispatch(setFaculties(result))
            })
            .catch((e) => alert('error in group create'))
    }, [])
    useEffect(() => {
        getTeachersCertainProps(
            {
                filterBy: 'groupId',
                filterValue: null,
                filterConditions: ['EXACT'],
            },
            0,
            10
        )
            .then(({ data: { result, ...info } }) => {
                dispatch(
                    setTeachersWithCertainProps(result as TTeacherPicked[])
                )
                dispatch(setTeachersWithCertainPropsInfo(info))
            })
            .catch((e) => alert('error in teacher efffect CREATE-GROUP'))
    }, [])

    const teachersWithCertainProps = useAppSelector(
        (s) => s.teacher?.teachersPickedProps
    )
    const faculties = useAppSelector((s) => s.faculty?.faculties)

    const validate = (values: IFormikValues) => {
        const errors: Partial<Record<keyof IFormikValues, string>> = {}
        if (!values.groupName) {
            errors.groupName = 'Заполните !'
        } else if (/^[^a-zA-Z0-9]/.test(values.groupName)) {
            errors.groupName = 'Символы недопустимы !'
        }
        if (!values.faculty) {
            errors.faculty = 'Выберите факультет !'
        }
        if (+values.countOfStudents < 0) {
            errors.countOfStudents = 'Недопустимый число ! '
        } else if (values.countOfStudents == 0) {
            errors.countOfStudents = 'Недопустимый число ! '
        }
        return errors
    }

    const formik = useFormik<IFormikValues>({
        initialValues: {
            teacher: null,
            groupName: '',
            faculty: null,
            countOfStudents: 0,
        },
        validate,

        onSubmit: ({ groupName, teacher, countOfStudents, faculty }) => {
            setStatus('loading')
            if (!faculty?.id) {
                formik.setFieldError(
                    'faculty',
                    'идентификатор факультета не найден !'
                )
                return
            }
            createGroup(groupName, countOfStudents, faculty.id)
                .then(({ data }) => {
                    dispatch(addGroup(data))
                    if (teacher?.Id) {
                        updateTeacher(teacher.Id, [
                            {
                                fieldName: 'groupId',
                                fieldValue: data.id,
                            },
                        ])
                            .then(({ data }) => {
                                dispatch(updateTeacherAction(data))
                                dispatch(deleteTeacherWithCertainProps(data.id))
                                setStatus('success')
                                setTime()
                            })
                            .catch((e) => {
                                setStatus('error')
                                setTime()
                            })
                        return
                    }
                    setStatus('success')
                    setTime()
                })
                .catch((e) => {
                    setStatus('error')
                    setTime()
                })
                .finally(formik.resetForm)
        },
    })
    function onChange(name: string, value: unknown) {
        formik.handleChange({ target: { name, value } })
    }

    const { onScrollFaculty } = useLoadMoreFaculties()

    const { onScrollTeachers } = useLoadMoreTeachers({
        filterBy: 'groupId',
        filterValue: null,
        filterConditions: ['EXACT'],
    })

    return (
        <div className="createPage">
            <CreateWrapper
                onClickCancel={() => formik.resetForm()}
                onClickCreate={() => {
                    console.log('Create Success')
                    formik.handleSubmit()
                }}
                headerText={'создать группу '}
                BtnText={'Создать группу'}
            />
            <div className="createPage__wrapper">
                <InfoWrapper
                    style={{ height: '400px' }}
                    infoText={'Информация о группе'}
                >
                    <CreateInput
                        handleBlur={formik.handleBlur}
                        value={formik.values.groupName}
                        setValue={(v) => onChange('groupName', v)}
                        name="groupName"
                        id={'groupName'}
                        placeholder={'Новая Группа '}
                        labelText={'Названия группы:'}
                    />
                    {formik.touched.groupName && formik.errors.groupName && (
                        <div className="fieldIsNotValid">
                            {formik.errors.groupName}
                        </div>
                    )}
                    <SelectForCreate
                        activeValue={formik.values.teacher}
                        prop={'Name'}
                        onScroll={onScrollTeachers}
                        handleBlur={() =>
                            formik.setFieldTouched('teacher', true, true)
                        }
                        style={{ marginTop: 10, width: 580 }}
                        labelText={'выбрать Учителя:'}
                        text={'Учитель'}
                        value={formik.values.teacher}
                        setValue={(v) => onChange('teacher', v)}
                        values={[...teachersWithCertainProps]}
                    />
                    <CreateInput
                        setValue={(v) => onChange('countOfStudents', v)}
                        value={formik.values.countOfStudents}
                        handleBlur={formik.handleBlur}
                        type={'number'}
                        style={{ marginTop: 10 }}
                        name="countOfStudents"
                        id={'countOfStudents'}
                        placeholder={'30'}
                        labelText={'количество студентов:'}
                    />
                    {formik.touched.countOfStudents &&
                        formik.errors.countOfStudents && (
                            <div className="fieldIsNotValid">
                                {formik.errors.countOfStudents}
                            </div>
                        )}
                </InfoWrapper>
                <AdditionInfo
                    style={{ height: 260 }}
                    addInfoText={'Дополнительно'}
                >
                    <SelectForCreate
                        prop={'name'}
                        activeValue={null}
                        onScroll={onScrollFaculty}
                        handleBlur={() => {
                            formik.setFieldTouched('faculty', true, true)
                        }}
                        setValue={(v) => onChange('faculty', v)}
                        style={{ marginTop: 10, width: 564 }}
                        labelText={'выбрать факультет:'}
                        text={'Факультет'}
                        value={formik.values.faculty}
                        values={[...faculties]}
                    />
                    {formik.touched.faculty && formik.errors.faculty && (
                        <div className="fieldIsNotValid">
                            {formik.errors.faculty}
                        </div>
                    )}
                </AdditionInfo>
            </div>
        </div>
    )
}
