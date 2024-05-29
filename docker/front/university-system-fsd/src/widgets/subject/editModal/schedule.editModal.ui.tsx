import { EditModalLayout } from '../../../shared/ui/layouts.ui/index.ts'
import { useDispatch } from 'react-redux'
import { useFormik } from 'formik'
import {
    CancelBtn,
    EditInput,
    SaveBtn,
} from '../../../shared/ui/edit.ui/index.ts'
import { UpdateSubject } from '../../../features/subject/index.ts'
import { SelectTeacher } from '../../../features/teacher/index.ts'
import { Context, FC, useContext } from 'react'
import { ISubject } from '../../../entities/subject/schedule.contracts.ts'
import { useAppSelector } from '../../../shared/hooks/index.ts'
import {
    teacherActions,
    teacherApi,
    TTeacherPicked,
} from '../../../entities/teacher/index.ts'
import { subjectActions } from '../../../entities/subject/schedule.model.ts'
import { subjectApi } from '../../../entities/subject/index.ts'
import {
    IProcessContext,
    IUpdate,
    ProcessContext,
} from '../../../shared/index.ts'

interface IFormikValues {
    ends: string
    starts: string
    nameOfSubject: string
    numberOfSubject: number
    teacher: TTeacherPicked | null
    typeOfSubject: string
    roomNumber: number
}

export const ModalEditSubject: FC<{
    subject: ISubject
    toggleModal: () => void
}> = ({ subject, toggleModal }) => {
    const { setStatus, setTime } = useContext(
        ProcessContext as Context<IProcessContext>
    )
    const dispatch = useDispatch()
    const { updateSubjectAct } = subjectActions
    const { updateSubject } = subjectApi
    function validate(subject: IFormikValues) {
        const error: Partial<Record<keyof IFormikValues, string>> = {}
        {
            if (!subject.starts) {
                error.starts = 'Заполните !'
            }
            if (!subject.ends) {
                error.ends = 'Заполните !'
            }
            if (!subject.nameOfSubject) {
                error.nameOfSubject = 'Заполните !'
            }
            if (!subject.numberOfSubject) {
                error.numberOfSubject = 'Заполните !'
            }
            if (!subject.teacher) {
                error.teacher = 'Заполните !'
            }
            if (!subject.typeOfSubject) {
                error.typeOfSubject = 'Заполните !'
            }
            if (!subject.roomNumber) {
                error.roomNumber = 'Заполните !'
            }
        }
        if (subject.starts === subject.ends) {
            error.ends = 'Введите другое время !'
        }
        if (!/^(0\d|1\d|2[0-2]):[0-5]\d$/.test(subject.ends)) {
            error.ends = 'Введите правильно 00:00 ! '
        }
        if (!/^(0\d|1\d|2[0-2]):[0-5]\d$/.test(subject.starts)) {
            error.starts = 'Введите правильно 00:00 ! '
        }
        if (subject.numberOfSubject < 0) {
            error.numberOfSubject = 'Не может быть негативным !'
        }
        return error
    }

    const formik = useFormik<IFormikValues>({
        initialValues: {
            ends: subject.ends,
            nameOfSubject: subject.nameOfSubject,
            numberOfSubject: subject.numberOfSubject,
            starts: subject.starts,
            teacher: subject.teacher
                ? { Id: subject.teacher.id, Name: subject.teacher.name }
                : null,
            typeOfSubject: subject.typeOfSubject,
            roomNumber: subject.roomNumber,
        },
        validate,
        onSubmit: (values) => {
            const updateFields: IUpdate<ISubject, string | number>[] = []
            if (values.teacher && values.teacher.Id !== subject.teacherId) {
                updateFields.push({
                    fieldName: 'teacherId',
                    fieldValue: values.teacher.Id,
                })
            }
            if (values.ends !== subject.ends) {
                updateFields.push({
                    fieldName: 'ends',
                    fieldValue: values.ends,
                })
            }
            if (values.starts !== subject.starts) {
                updateFields.push({
                    fieldName: 'starts',
                    fieldValue: values.starts,
                })
            }
            if (values.nameOfSubject !== subject.nameOfSubject) {
                updateFields.push({
                    fieldName: 'nameOfSubject',
                    fieldValue: subject.nameOfSubject,
                })
            }
            if (values.typeOfSubject !== subject.typeOfSubject) {
                updateFields.push({
                    fieldName: 'nameOfSubject',
                    fieldValue: values.typeOfSubject,
                })
            }
            if (values.numberOfSubject !== subject.numberOfSubject) {
                updateFields.push({
                    fieldName: 'numberOfSubject',
                    fieldValue: values.numberOfSubject,
                })
            }
            if (values.roomNumber !== subject.roomNumber) {
                updateFields.push({
                    fieldName: 'roomNumber',
                    fieldValue: values.roomNumber,
                })
            }

            if (updateFields.length > 0) {
                setStatus('loading')
                updateSubject(subject.id, updateFields)
                    .then(({ data }) => {
                        dispatch(updateSubjectAct(data))
                        setStatus('success')
                        setTime()
                        formik.resetForm()
                        toggleModal()
                    })

                    .catch((e) => {
                        setStatus('error')
                        setTime()
                    })
            }
        },
    })
    function onChange(name: string, value: unknown) {
        formik.handleChange({ target: { name, value } })
    }

    return (
        <EditModalLayout
            toggleModal={toggleModal}
            headerText={'редактировать урок'}
        >
            <div className="editModal__body">
                <EditInput
                    placeholder={'Урок'}
                    setStateValue={(v) => onChange('numberOfSubject', v)}
                    name={'editNumberOfSubject'}
                    labelText={'Урок'}
                    value={formik.values.numberOfSubject}
                    type="number"
                />
                {formik.touched.numberOfSubject &&
                    formik.errors.numberOfSubject && (
                        <div className="fieldIsNotValid">
                            {formik.errors.numberOfSubject}
                        </div>
                    )}
                <EditInput
                    placeholder={'Аудитория'}
                    setStateValue={(v) => onChange('roomNumber', v)}
                    name={'roomNumber'}
                    labelText={'Аудитория:'}
                    value={formik.values.roomNumber}
                    type="number"
                />
                {formik.touched.roomNumber && formik.errors.roomNumber && (
                    <div className="fieldIsNotValid">
                        {formik.errors.roomNumber}
                    </div>
                )}
                <EditInput
                    placeholder={'Названия урока '}
                    setStateValue={(v) => onChange('nameOfSubject', v)}
                    name={'editSubject'}
                    labelText={'Названия урока:'}
                    value={formik.values.nameOfSubject}
                    type="text"
                />
                {formik.touched.nameOfSubject &&
                    formik.errors.nameOfSubject && (
                        <div className="fieldIsNotValid">
                            {formik.errors.nameOfSubject}
                        </div>
                    )}
                <EditInput
                    placeholder={'практика'}
                    name={'editTypeSubject'}
                    labelText={'Тип урока:'}
                    value={formik.values.typeOfSubject}
                    setStateValue={(v) => onChange('typeOfSubject', v)}
                />
                {formik.touched.typeOfSubject &&
                    formik.errors.typeOfSubject && (
                        <div className="fieldIsNotValid">
                            {formik.errors.typeOfSubject}
                        </div>
                    )}
                <EditInput
                    placeholder={'начало урока'}
                    name={'starts'}
                    labelText={'Урок начинается:'}
                    value={formik.values.starts}
                    setStateValue={(v) => onChange('starts', v)}
                />
                {formik.touched.starts && formik.errors.starts && (
                    <div className="fieldIsNotValid">
                        {formik.errors.starts}
                    </div>
                )}
                <EditInput
                    placeholder={'конец урока '}
                    name={'ends'}
                    labelText={'Урок заканчивается: '}
                    value={formik.values.ends}
                    setStateValue={(v) => onChange('ends', v)}
                />
                {formik.touched.ends && formik.errors.ends && (
                    <div className="fieldIsNotValid">{formik.errors.ends}</div>
                )}
                <SelectTeacher
                    filter={null}
                    activeTeacher={
                        formik.values.teacher ? formik.values.teacher : null
                    }
                    setValue={(v) => onChange('teacher', v)}
                />
            </div>
            <div className="editModal__footer">
                <CancelBtn onClick={toggleModal}></CancelBtn>
                <SaveBtn onClick={formik.handleSubmit} />
            </div>
        </EditModalLayout>
    )
}
