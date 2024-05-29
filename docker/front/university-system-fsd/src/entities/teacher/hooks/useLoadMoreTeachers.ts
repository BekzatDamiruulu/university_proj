import { useSelector, useDispatch } from 'react-redux'
import { useRef, UIEvent } from 'react'
import { teacherActions } from '../teacher.model.ts'
import { teacherApi } from '../teacher.api.ts'
import { IFilter } from '../../../shared/index.ts'
import { useTeacherDispatch } from './useTeacherDispatch.ts'
import { useAppSelector } from '../../../shared/hooks/index.ts'
import { TTeacherPicked } from '../teacher.types.ts'
export const useLoadMoreTeachers = <TFilter>(
    filter: IFilter<TFilter> | IFilter<TFilter>[] | null
) => {
    const dispatch = useTeacherDispatch()
    const { getTeachersCertainProps } = teacherApi
    const { setTeacherStoreInfo, loadMoreTeachersWithProps } = teacherActions
    const { count: teacherCount, total: teacherTotal } = useAppSelector(
        (s) => s.teacher?.teachersPickedPropsStoreInfo
    )
    const localOffset = useRef(0)
    function onScrollTeachers(e: UIEvent) {
        if (
            e.currentTarget.scrollHeight - e.currentTarget.clientHeight - 10 <
                e.currentTarget.scrollTop &&
            teacherTotal > teacherCount &&
            teacherTotal > localOffset.current
        ) {
            console.log('loading')
            localOffset.current = localOffset.current + 5
            getTeachersCertainProps<TFilter>(filter, localOffset.current, 5)
                .then(({ data }) => {
                    dispatch(
                        setTeacherStoreInfo({
                            count: data.count,
                            offset: data.offset,
                            limit: data.limit,
                            total: data.total,
                        })
                    )
                    dispatch(
                        loadMoreTeachersWithProps(
                            data.result as TTeacherPicked[]
                        )
                    )
                })
                .catch((e) => {
                    alert('error in useLoadMoreTeachersWithProps')
                })
        }
    }
    return {
        onScrollTeachers,
    }
}
