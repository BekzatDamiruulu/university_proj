import './student.mainPage.styles.sass'
import { PageHeader, SearchInput } from '../../../shared/ui/index.ts'
import { GroupSelectFilter } from '../../../features/group/selectFilter/group.selectFilter.ui.tsx'
import { useEffect, useState } from 'react'
import { AddBtn } from '../../../shared/ui/addBtn.ui/index.ts'
import { StudentList } from '../../../widgets/student/list/student.list.ui.tsx'
import { studentApi, studentsActions } from '../../../entities/student/index.ts'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../../shared/hooks/index.ts'
import { StudentContextProvider } from '../../../entities/student/providers/index.ts'
export const StudentsMainPage = () => {
    const [orderType, setOrderType] = useState<'asc' | 'desc'>('desc')
    const [orderBy, setOrderBy] = useState('id')
    const [groupId, setGroupId] = useState<number | null>(null)
    const { getStudents } = studentApi
    const dispatch = useDispatch()
    const {
        fetchedStudents,
        setInfoDataStudents,
        fetchStudentsError,
        fetchStudents,
    } = studentsActions
    useEffect(() => {
        dispatch(fetchStudents())
        console.log(groupId)
        if (groupId) {
            getStudents(
                {
                    filterBy: 'groupId',
                    filterValue: groupId,
                    filterConditions: ['EXACT'],
                },
                10,
                0,
                'id',
                'asc'
            )
                .then(({ data: { result, ...info } }) => {
                    dispatch(fetchedStudents(result))
                    dispatch(setInfoDataStudents(info))
                })
                .catch((e) => dispatch(fetchStudentsError()))
        }
    }, [groupId])
    const students = useAppSelector((s) => s.student?.students)
    const count = useAppSelector((s) => s.student?.infoDataStudents.count)
    const dataStatus = useAppSelector((s) => s.student?.statusStudentsData)
    return (
        <div className="studentsListPage">
            <PageHeader text={`Студенты (${count})`} />
            <div className="studentsListPage__mechanics">
                <SearchInput
                    name={'studentName'}
                    placeholder={'Поиск студента...'}
                />
                <GroupSelectFilter setGroupId={setGroupId} />
                <AddBtn path={'/new-student'} btnText={'Добавить студента'} />
            </div>
            <StudentContextProvider
                orderBy={orderBy}
                orderType={orderType}
                setOrderType={setOrderType}
                setOrderBy={setOrderBy}
            >
                <StudentList
                    students={students}
                    dataStatus={dataStatus}
                ></StudentList>
            </StudentContextProvider>
        </div>
    )
}
