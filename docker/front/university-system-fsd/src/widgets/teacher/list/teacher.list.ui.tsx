import { SortHead } from '../../../shared/ui/table.ui/table.ui.sortHead.tsx'
import React, { Context, useEffect, useMemo, useState } from 'react'
import { IContext, Loading } from '../../../shared/index.ts'
import { CustomScrollLayout } from '../../../shared/ui/layouts.ui/customScrollLayout.ui.tsx'
import {
    ITeacher,
    teacherActions,
    teacherApi,
    TeacherContext,
} from '../../../entities/teacher/index.ts'
import { useTeacherDispatch } from '../../../entities/teacher/hooks/index.ts'
import { useAppSelector } from '../../../shared/hooks/index.ts'
import { TeacherItem } from '../listItem/teacher.listItem.ui.tsx'
import { Paginate } from '../../../shared/ui/paginate.ui/index.ts'
export const TeacherList = (): JSX.Element => {
    const columnsName = useMemo(
        () => ['ФИО', 'предмет', 'Группа', 'год рождения', 'редактировать'],
        []
    )
    const enableSortBy = useMemo(
        () => ['name', 'teachersSubject', 'group.name', 'birthDate'],
        []
    )
    const { getTeachers } = teacherApi
    const {
        fetchedTeachers,
        setTeacherStoreInfo,
        fetchingTeachers,
        fetchTeachersError,
    } = teacherActions
    const dispatch = useTeacherDispatch()
    const [stateLimit, setLimit] = useState(5)
    const [stateOffset, setOffset] = useState(0)
    const [orderBy, setOrderBy] = useState('id')
    const [orderType, setOrderType] = useState<'asc' | 'desc'>('asc')

    useEffect(() => {
        dispatch(fetchingTeachers())
        getTeachers(null, stateLimit, stateOffset, orderBy, orderType)
            .then(({ data: { result, ...info } }) => {
                dispatch(fetchedTeachers(result as ITeacher[]))
                dispatch(setTeacherStoreInfo(info))
            })
            .catch((e) => {
                dispatch(fetchTeachersError())
                alert('error in teacher list ')
            })
    }, [stateOffset, stateLimit, orderBy, orderType])
    const teachers = useAppSelector((s) => s.teacher?.teachers)
    const dataStatus = useAppSelector((s) => s.teacher?.statusTeachersData)
    const dataInfo = useAppSelector((s) => s.teacher?.teachersStoreInfo)

    return (
        <TeacherContext.Provider
            value={{
                enableSortBy,
                columnsName,
                total: dataInfo?.total,
                count: dataInfo?.count,
                stateLimit,
                stateOffset,
                setOffset,
                setLimit,
                orderBy,
                orderType,
                setOrderType,
                setOrderBy,
            }}
        >
            <CustomScrollLayout>
                <table className="list">
                    <thead>
                        <SortHead
                            context={TeacherContext as Context<IContext>}
                        />
                    </thead>
                    {dataStatus === 'loaded' ? (
                        <tbody className="list__body">
                            <tr className="list__divider"></tr>
                            {teachers.length > 0
                                ? teachers.map((teacher) => (
                                      <TeacherItem
                                          key={teacher.id}
                                          teacher={teacher}
                                      />
                                  ))
                                : null}
                        </tbody>
                    ) : null}
                </table>
                {dataStatus === 'loading' ? <Loading /> : null}
                {dataStatus === 'error' ? (
                    <h4>something went wrong ...</h4>
                ) : null}
            </CustomScrollLayout>
            <Paginate context={TeacherContext as Context<IContext>} />
        </TeacherContext.Provider>
    )
}
