import {
    CreateWrapper,
    InfoWrapper,
    AdditionInfo,
    InputFile,
    CreateInput,
    SelectForCreate,
} from '../../../shared/ui/create.ui'
import { groupActions, groupApi, TGroupPick } from '../../../entities/group'
import { Context, useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLoadMoreGroups } from '../../../entities/group/hooks'
import { useAppSelector } from '../../../shared/hooks'
import { useFormik } from 'formik'
import { teacherApi } from '../../../entities/teacher'
import { IProcessContext, ProcessContext } from '../../../shared'

interface IFormikValues {
    fullName: string
    birthDate: string
    subject: string
    group: TGroupPick | null
}

export const CreateTeacherPage = () => {
    const dispatch = useDispatch()
    const { getGroupsWithCertainProps } = groupApi
    const {
        setGroupsWithCertainProps,
        deleteGroupWithCertainProps,
        setGroupsWithCertainPropsInfo,
    } = groupActions
    const { createTeacher } = teacherApi

    useEffect(() => {
        getGroupsWithCertainProps(
            {
                filterBy: 'Teacher',
                filterValue: null,
                filterConditions: ['EXACT'],
            },
            0,
            5
        )
            .then(({ data: { result, ...info } }) => {
                dispatch(setGroupsWithCertainPropsInfo(info))
                dispatch(setGroupsWithCertainProps(result))
            })
            .catch((e) => alert('error in student create information'))
    }, [])
    const { setStatus, setTime } = useContext(
        ProcessContext as Context<IProcessContext>
    )
    function validate(values: IFormikValues) {
        const error: Partial<Record<keyof IFormikValues, string>> = {}
        if (!values.fullName) {
            error.fullName = 'Имя не может быть пустым !'
        } else if (values.fullName && values.fullName.length < 5) {
            error.fullName = 'Имя не может быть меньше 5 символов !'
        }
        if (!values.birthDate) {
            error.birthDate = 'Заполните поле !'
        } else if (!/^\d{4}-\d{2}-\d{2}$/.test(values.birthDate)) {
            error.birthDate = 'Дата не валидный !'
        }
        if (!values.subject) {
            error.subject = 'Заполните поле !'
        }
        return error
    }

    const formik = useFormik<IFormikValues>({
        initialValues: {
            fullName: '',
            birthDate: '',
            subject: '',
            group: null,
        },
        validate,
        onSubmit: ({ fullName, birthDate, subject, group }) => {
            setStatus('loading')
            createTeacher({
                name: fullName,
                birthDate,
                teachersSubject: subject,
                groupId: group ? group.Id : null,
                photo: 'no photo',
            })
                .then(({ data }) => {
                    setStatus('success')
                    if (group) {
                        dispatch(deleteGroupWithCertainProps(group.Id))
                    }
                    setTime()
                    formik.resetForm()
                })
                .catch((error) => {
                    setStatus('error')
                    setTime()
                })
        },
    })
    const { onScrollGroup } = useLoadMoreGroups({
        filterBy: 'Teacher',
        filterValue: null,
        filterConditions: ['EXACT'],
    })

    const groupsWithCertainProps = useAppSelector(
        (s) => s.group?.groupsWithCertainProps
    )

    function onChange(name: string, value: unknown) {
        formik.handleChange({ target: { name, value } })
    }
    return (
        <div className="createPage">
            <CreateWrapper
                onClickCancel={() => formik.resetForm()}
                onClickCreate={() => formik.submitForm()}
                headerText={'добавить учителя'}
                BtnText={'добавить учителя'}
            />
            <div className="createPage__wrapper">
                <InfoWrapper
                    style={{ minHeight: '300px' }}
                    infoText={'Информация об учителе '}
                >
                    <CreateInput
                        handleBlur={formik.handleBlur}
                        setValue={(e) => onChange('fullName', e)}
                        value={formik.values.fullName}
                        name="fullNameOfTeacher"
                        id={'fullNameOfTeacher'}
                        placeholder={'Асан Усенов'}
                        labelText={'ФИО Учителя:'}
                    />
                    {formik.touched.fullName && formik.errors.fullName && (
                        <div className="fieldIsNotValid">
                            {formik.errors.fullName}
                        </div>
                    )}
                    <CreateInput
                        handleBlur={formik.handleBlur}
                        value={formik.values.subject}
                        setValue={(e) => onChange('subject', e)}
                        style={{ marginTop: 10 }}
                        name="teachersSubject"
                        id={'teachersSubject'}
                        placeholder={'математика'}
                        labelText={'Предмет:'}
                    />
                    {formik.touched.subject && formik.errors.subject && (
                        <div className="fieldIsNotValid">
                            {formik.errors.subject}
                        </div>
                    )}
                    <CreateInput
                        handleBlur={formik.handleBlur}
                        setValue={(e) => onChange('birthDate', e)}
                        value={formik.values.birthDate}
                        style={{ marginTop: 10 }}
                        name="teacherBirthDate"
                        id={'teacherBirthDate'}
                        placeholder={'yyyy-MM-dd'}
                        labelText={'День рождения:'}
                    />
                    {formik.touched.birthDate && formik.errors.birthDate && (
                        <div className="fieldIsNotValid">
                            {formik.errors.birthDate}
                        </div>
                    )}
                </InfoWrapper>
                <AdditionInfo addInfoText={'Дополнительно'}>
                    <SelectForCreate
                        prop={'Name'}
                        activeValue={null}
                        onScroll={onScrollGroup}
                        handleBlur={() => {
                            formik.setFieldTouched('group', true, true)
                        }}
                        setValue={(e) => onChange('group', e)}
                        value={formik.values.group}
                        style={{ marginTop: 10, width: 564 }}
                        labelText={'выбрать Группу:'}
                        text={'Группа'}
                        values={groupsWithCertainProps}
                    />
                    <InputFile
                        name={'photoOfTeacher'}
                        style={{ marginTop: 10 }}
                        labelText={'Фотография учителя:'}
                    />
                </AdditionInfo>
            </div>
        </div>
    )
}
