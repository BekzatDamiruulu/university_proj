import './subject.listItem.ui.styles.sass'
import { useState, useCallback, useRef, FC, MutableRefObject } from 'react'
import { ModalEditSubject } from '../editModal/schedule.editModal.ui.tsx'
import { useDispatch } from 'react-redux'
import { ISubject } from '../../../entities/subject/schedule.contracts.ts'
import { DeleteSubject } from '../../../features/subject/index.ts'
import { subjectActions } from '../../../entities/subject/schedule.model.ts'
import { subjectApi } from '../../../entities/subject/index.ts'
export const SubjectListItem: FC<{
    subject: ISubject
}> = ({ subject }) => {
    const [status, setStatus] = useState<
        'idle' | 'error' | 'loading' | 'success'
    >('idle')
    const [hide, setHide] = useState(true)
    const toggleModal = useCallback(() => {
        setHide((s) => !s)
    }, [setHide])
    const dispatch = useDispatch()
    const ref = useRef<HTMLDivElement | null>(null)

    function DeleteSubject(subjectId: number) {
        const { deleteSubjectAct } = subjectActions
        const { deleteSubject } = subjectApi
        try {
            deleteSubject(subjectId)
            ref.current?.classList.add('scheduleItem__deleted')
            const timeId = setTimeout(() => {
                dispatch(deleteSubjectAct(subjectId))
                clearTimeout(timeId)
            }, 1100)
        } catch (e) {
            alert('error in deleting subject')
        }
    }

    return (
        <>
            <div ref={ref} className="scheduleItem">
                <div className="scheduleItem__left left">
                    <div className="left__time">
                        {subject.numberOfSubject} Урок{' '}
                        {`${subject.starts} - ${subject.ends}`}
                    </div>
                    <div className="left__type">{`${subject.roomNumber} ${subject.typeOfSubject}`}</div>
                </div>
                <div className="scheduleItem__right right">
                    <div className="right__subject">
                        {subject.nameOfSubject}
                    </div>
                    <div className="right__teacher">
                        {subject.teacher?.name}
                    </div>
                </div>
                <div className="scheduleItem__mechanics mechanics">
                    <button
                        onClick={toggleModal}
                        className="resetBtn mechanics__edit"
                    ></button>
                    <button
                        onClick={() => DeleteSubject(subject.id)}
                        className="resetBtn mechanics__delete"
                    ></button>
                </div>
                {hide ? null : (
                    <ModalEditSubject
                        toggleModal={toggleModal}
                        subject={subject}
                    />
                )}
            </div>
        </>
    )
}
