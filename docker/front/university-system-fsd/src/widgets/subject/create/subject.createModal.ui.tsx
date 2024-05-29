import { EditModalLayout } from '../../../shared/ui/layouts.ui/index.ts'
import { Context, FC, useContext, useEffect, useState } from 'react'
import { CancelBtn } from '../../../shared/ui/edit.ui/index.ts'
import { EditInput } from '../../../shared/ui/edit.ui/index.ts'
import { SelectTeacher } from '../../../features/teacher/index.ts'
import {
    DaysEnum,
    IProcessContext,
    ProcessContext,
} from '../../../shared/index.ts'
import { useFormik } from 'formik'
import { TTeacherPicked } from '../../../entities/teacher/index.ts'
import { subjectActions } from '../../../entities/subject/schedule.model.ts'
import { subjectApi } from '../../../entities/subject/index.ts'
import { useDispatch } from 'react-redux'
import { CreateSubject } from '../../../features/subject/index.ts'

interface IFormikValues {
    ends: string
    nameOfSubject: string
    numberOfSubject: 1
    starts: string
    teacher: TTeacherPicked | null
    typeOfSubject: string
    roomNumber: 0
    groupId: number | null
    day: DaysEnum | null
}
function validate({
    ends,
    starts,
    nameOfSubject,
    numberOfSubject,
    teacher,
    typeOfSubject,
    roomNumber,
    groupId,
    day,
}: IFormikValues) {
    const error: Partial<Record<keyof IFormikValues, string>> = {}
    {
        if (!nameOfSubject) {
            error.nameOfSubject = 'Заполните !'
        }
        if (!numberOfSubject) {
            error.numberOfSubject = 'Заполните !'
        }
        if (!teacher) {
            error.teacher = 'Заполните !'
        }
        if (!typeOfSubject) {
            error.typeOfSubject = 'Заполните !'
        }
        if (!roomNumber) {
            error.roomNumber = 'Заполните !'
        }
    }
    if (!starts) {
        error.starts = 'Заполните !'
    } else if (!/^(0\d|1\d|2[0-2]):[0-5]\d$/.test(starts)) {
        error.starts = 'Введите правильно 00:00 ! '
    }
    if (!ends) {
        error.ends = 'Заполните !'
    } else if (!/^(0\d|1\d|2[0-2]):[0-5]\d$/.test(ends)) {
        error.ends = 'Введите правильно 00:00 ! '
    } else if (starts === ends) {
        error.ends = 'Введите другое время !'
    }
    if (numberOfSubject < 0) {
        error.numberOfSubject = 'Не может быть негативным !'
    }
    if (!groupId || groupId === 0) {
        error.groupId = 'Выберите группу !'
    }
    return error
}

export const CreateSubjectModal: FC<{
    toggleModal: () => void
    groupId: number | null
    day: DaysEnum
}> = ({ day, groupId, toggleModal }) => {
    const [status, setStatus] = useState<
        'idle' | 'error' | 'loading' | 'success'
    >('idle')
    return (
        <>
            {status === 'idle' ? (
                <EditModalLayout
                    toggleModal={toggleModal}
                    headerText={'Новый урок'}
                >
                    <CreateModal
                        toggleModal={toggleModal}
                        groupId={groupId!}
                        day={day}
                    ></CreateModal>
                </EditModalLayout>
            ) : null}
        </>
    )
}

const CreateModal = ({
    day,
    groupId,
    toggleModal,
}: {
    day: DaysEnum
    groupId: number
    toggleModal: () => void
}) => {
    const { setStatus, setTime } = useContext(
        ProcessContext as Context<IProcessContext>
    )
    const dispatch = useDispatch()
    const { addSubject } = subjectActions
    const { postSubject } = subjectApi

    const formik = useFormik<IFormikValues>({
        initialValues: {
            groupId: groupId,
            ends: '',
            nameOfSubject: '',
            numberOfSubject: 1,
            starts: '',
            teacher: null,
            typeOfSubject: '',
            roomNumber: 0,
            day: day,
        },
        validate,
        onSubmit: ({
            teacher,
            ends,
            nameOfSubject,
            numberOfSubject,
            starts,
            typeOfSubject,
            roomNumber,
        }) => {
            setStatus('loading')
            postSubject({
                groupId: groupId!,
                teacherId: teacher!.Id,
                ends,
                nameOfSubject,
                numberOfSubject,
                roomNumber,
                starts,
                typeOfSubject,
                day,
            })
                .then(({ data }) => {
                    dispatch(addSubject(data))
                    setStatus('success')
                    setTime()
                })
                .catch(() => {
                    setStatus('error')
                    setTime()
                })
        },
    })
    function onChange(name: string, value: unknown) {
        formik.handleChange({ target: { name, value } })
    }
    return (
        <>
            <div className="editModal__body">
                <EditInput
                    placeholder={'1 '}
                    type="number"
                    name={'editNumberOfSubject'}
                    labelText={'порядок урока :'}
                    setStateValue={(v) => onChange('numberOfSubject', v)}
                    value={formik.values.numberOfSubject}
                />
                {formik.touched.numberOfSubject &&
                    formik.errors.numberOfSubject && (
                        <div className="fieldIsNotValid">
                            {formik.errors.numberOfSubject}
                        </div>
                    )}
                <EditInput
                    placeholder={'Аудитория'}
                    type="number"
                    name={'editNumberOfSubject'}
                    labelText={'Аудитория:'}
                    setStateValue={(v) => onChange('roomNumber', v)}
                    value={formik.values.roomNumber}
                />
                {formik.touched.roomNumber && formik.errors.roomNumber && (
                    <div className="fieldIsNotValid">
                        {formik.errors.roomNumber}
                    </div>
                )}
                <EditInput
                    placeholder={'Урок'}
                    setStateValue={(v) => onChange('nameOfSubject', v)}
                    name={'editNameOfSubject'}
                    labelText={'Названия урока:'}
                    value={formik.values.nameOfSubject}
                />
                {formik.touched.nameOfSubject &&
                    formik.errors.nameOfSubject && (
                        <div className="fieldIsNotValid">
                            {formik.errors.nameOfSubject}
                        </div>
                    )}
                <EditInput
                    placeholder={'тип урока '}
                    name={'editNameOfSubject'}
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

                <SelectTeacher
                    filter={null}
                    activeTeacher={formik.values.teacher}
                    setValue={(teacher) => {
                        onChange('teacher', teacher)
                    }}
                />

                {formik.touched.teacher && formik.errors.teacher && (
                    <div className="fieldIsNotValid">
                        {formik.errors.teacher}
                    </div>
                )}
                <EditInput
                    name={'lessonStart'}
                    placeholder={'00:00'}
                    labelText={'Начало урока:'}
                    value={formik.values.starts}
                    setStateValue={(v) => onChange('starts', v)}
                />
                {formik.touched.starts && formik.errors.starts && (
                    <div className="fieldIsNotValid">
                        {formik.errors.starts}
                    </div>
                )}
                <EditInput
                    name={'lessonEnds'}
                    placeholder={'00:00'}
                    labelText={'Конец урока:'}
                    value={formik.values.ends}
                    setStateValue={(v) => onChange('ends', v)}
                />
                {formik.touched.ends && formik.errors.ends && (
                    <div className="fieldIsNotValid">{formik.errors.ends}</div>
                )}
                {formik.errors.groupId && (
                    <div className="fieldIsNotValid">
                        {formik.errors.groupId}
                    </div>
                )}
            </div>
            <div className="editModal__footer">
                <CancelBtn
                    onClick={() => {
                        toggleModal()
                    }}
                ></CancelBtn>
                <CreateSubject onClick={formik.submitForm}></CreateSubject>
            </div>
        </>
    )
}
