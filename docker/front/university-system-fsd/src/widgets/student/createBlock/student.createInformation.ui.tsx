import {
    InfoWrapper,
    CreateInput,
    SelectForCreate,
    InputFile,
    AdditionInfo,
    CreateWrapper,
} from '../../../shared/ui/create.ui'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import { useLoadMoreGroups } from '../../../entities/group/hooks'
import { groupActions, groupApi, TGroupPick } from '../../../entities/group'
import { Context, useContext, useEffect, useState } from 'react'
import { useAppSelector } from '../../../shared/hooks'
import { studentApi, studentsActions } from '../../../entities/student'
import { IProcessContext, ProcessContext } from '../../../shared'
interface IFormikValues {
    fullName: string
    email: string
    phoneN: string
    age: number
    group: TGroupPick | null
}
export const StudentCreateInformation = () => {
    const { setStatus, setTime } = useContext(
        ProcessContext as Context<IProcessContext>
    )
    const { addStudent } = studentsActions
    const { createStudent } = studentApi
    function validate(values: IFormikValues) {
        const error: Partial<Record<keyof IFormikValues, string>> = {}
        if (!values.fullName) {
            error.fullName = 'Заполните !'
        }
        if (!values.email) {
            error.email = 'Введите email !'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            error.email = 'Введите правильный формат email !'
        }
        if (!values.phoneN) {
            error.phoneN = 'Введите номер телефона !'
        } else if (!/^(996|0)(\d{9})$/.test(values.phoneN)) {
            error.phoneN = 'Введите правильный формат !'
        }
        if (values.age < 0) {
            error.age = 'Возвраст должен быть положительным !'
        } else if (values.age > 100) {
            error.age = 'Возвраст не должен превышать 100 !'
        }
        if (!values.group?.Name) {
            error.group = 'Выберите группу !'
        }
        return error
    }

    const formik = useFormik<IFormikValues>({
        initialValues: {
            fullName: '',
            email: '',
            phoneN: '',
            age: 0,
            group: null,
        },
        validate,
        onSubmit: ({ fullName, phoneN, age, group, email }) => {
            setStatus('loading')
            createStudent({
                age,
                fullName,
                groupId: group!.Id,
                phoneNumber: phoneN,
                email,
                photo: 'no photo',
            })
                .then(({ data }) => {
                    dispatch(addStudent(data))
                    setStatus('success')
                    setTime()
                    formik.resetForm()
                })
                .catch((err) => {
                    setStatus('error')
                    setTime()
                })
        },
    })
    const dispatch = useDispatch()
    const { getGroupsWithCertainProps } = groupApi
    const { setGroupsWithCertainProps, setGroupsWithCertainPropsInfo } =
        groupActions

    useEffect(() => {
        getGroupsWithCertainProps(null, 0, 10)
            .then(({ data: { result, ...info } }) => {
                dispatch(setGroupsWithCertainPropsInfo(info))
                dispatch(setGroupsWithCertainProps(result))
            })
            .catch((e) => alert('error in student create information'))
    }, [])
    const groups = useAppSelector((s) => s.group?.groupsWithCertainProps)
    const { onScrollGroup } = useLoadMoreGroups(null)
    function onChange(name: string, value: unknown) {
        formik.handleChange({ target: { name, value } })
    }
    return (
        <div className="createPage">
            <CreateWrapper
                onClickCancel={() => formik.resetForm()}
                onClickCreate={() => formik.submitForm()}
                headerText={'добавить студента'}
                BtnText={'добавить студента'}
            />
            <div className="createPage__wrapper">
                <InfoWrapper
                    style={{ minHeight: 420 }}
                    infoText={'Информация о новом студенте '}
                >
                    <CreateInput
                        handleBlur={formik.handleBlur}
                        value={formik.values.fullName}
                        setValue={(v) => onChange('fullName', v)}
                        name="fullName"
                        id={'fullName'}
                        placeholder={'Асан Усенов'}
                        labelText={'ФИО студента:'}
                    />
                    {formik.touched.fullName && formik.errors.fullName && (
                        <div className="fieldIsNotValid">
                            {formik.errors.fullName}
                        </div>
                    )}
                    <CreateInput
                        handleBlur={formik.handleBlur}
                        style={{ marginTop: 10 }}
                        name="email"
                        id={'email'}
                        placeholder={'Example@gmail.com'}
                        labelText={'Email:'}
                        value={formik.values.email}
                        type={'email'}
                        setValue={(v) => onChange('email', v)}
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className="fieldIsNotValid">
                            {formik.errors.email}
                        </div>
                    )}
                    <CreateInput
                        handleBlur={formik.handleBlur}
                        style={{ marginTop: 10 }}
                        name="phoneN"
                        id={'phoneN'}
                        value={formik.values.phoneN}
                        setValue={(v) => onChange('phoneN', v)}
                        placeholder={'+996123456789'}
                        labelText={'номер телефона:'}
                    />
                    {formik.touched.phoneN && formik.errors.phoneN && (
                        <div className="fieldIsNotValid">
                            {formik.errors.phoneN}
                        </div>
                    )}
                    <CreateInput
                        handleBlur={formik.handleBlur}
                        style={{ marginTop: 10 }}
                        name="age"
                        id={'age'}
                        type={'number'}
                        placeholder={'Возраст'}
                        labelText={'Возраст:'}
                        setValue={(v) => onChange('age', v)}
                        value={formik.values.age}
                    />
                    {formik.touched.age && formik.errors.age && (
                        <div className="fieldIsNotValid">
                            {formik.errors.age}
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
                        value={formik.values.group}
                        setValue={(v) => onChange('group', v)}
                        style={{ marginTop: 10, width: 564 }}
                        labelText={'выбрать Группу:'}
                        text={'Группа'}
                        values={groups}
                    />
                    {formik.touched.group && formik.errors.group && (
                        <div className="fieldIsNotValid">
                            {formik.errors.group}
                        </div>
                    )}
                    <InputFile
                        name={'studentPhoto'}
                        style={{ marginTop: 10 }}
                        labelText={'Фотография студента:'}
                    />
                </AdditionInfo>
            </div>
        </div>
    )
}
