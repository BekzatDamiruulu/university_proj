import { DayBtn } from '../../../shared/ui/day.ui/day.ui.tsx'
import { SubjectList } from '../list/subject.list.ui.tsx'
import { DaysEnum } from '../../../shared/index.ts'
import { FC, useCallback, useEffect, useState } from 'react'
import { useAppSelector } from '../../../shared/hooks/index.ts'
import { subjectApi } from '../../../entities/subject/index.ts'
import { useDispatch } from 'react-redux'
import { subjectActions } from '../../../entities/subject/schedule.model.ts'
import { CreateSubjectModal } from '../create/subject.createModal.ui.tsx'

const days = [
    DaysEnum.MONDAY,
    DaysEnum.TUESDAY,
    DaysEnum.WEDNESDAY,
    DaysEnum.THURSDAY,
    DaysEnum.FRIDAY,
    DaysEnum.SATURDAY,
]
export const WrapperDaysSubjectList: FC<{ groupId: number | null }> = ({
    groupId,
}) => {
    const [hide, setHide] = useState(true)
    const toggleModal = useCallback(() => {
        setHide((s) => !s)
    }, [])
    const dispatch = useDispatch()
    const { setSubjects, setSubjectsStoreInfo } = subjectActions
    const { getSubjects } = subjectApi
    const [activeDay, setDay] = useState<DaysEnum>(DaysEnum.MONDAY)
    useEffect(() => {
        if (groupId) {
            if (activeDay) {
                console.log(activeDay, groupId)
                getSubjects<DaysEnum | number>(
                    [
                        {
                            filterBy: 'Day',
                            filterValue: activeDay,
                            filterConditions: ['EXACT'],
                        },
                        {
                            filterBy: 'groupId',
                            filterValue: groupId,
                            filterConditions: ['EXACT'],
                        },
                    ],
                    10,
                    0,
                    'asc',
                    'id'
                )
                    .then(({ data: { result, ...info } }) => {
                        dispatch(setSubjects(result))
                        dispatch(setSubjectsStoreInfo(info))
                    })
                    .catch((e) => {
                        alert('error in wrapperDaylist')
                    })
            }
        }
    }, [groupId, activeDay])
    const subjects = useAppSelector((s) => s.subject?.subjects)
    return (
        <>
            <div className="schedulePage__days">
                {days.map((d) => {
                    return (
                        <DayBtn
                            key={d}
                            day={d}
                            activeDay={activeDay}
                            onClick={setDay}
                        />
                    )
                })}
            </div>
            <SubjectList subjects={subjects} />
            <button
                onClick={toggleModal}
                className="resetBtn schedulePage__btn"
            >
                Добавить урок
            </button>
            {hide ? null : (
                <CreateSubjectModal
                    groupId={groupId}
                    day={activeDay}
                    toggleModal={toggleModal}
                />
            )}
        </>
    )
}
