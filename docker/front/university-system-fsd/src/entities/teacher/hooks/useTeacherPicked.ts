import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { teacherActions } from '../teacher.model.ts'
import { teacherApi } from '../teacher.api.ts'
import { TTeacherPicked } from '../teacher.types.ts'
import { useAppSelector } from '../../../shared/hooks/index.ts'
import { IFilter } from '../../../shared/index.ts'
export function useTeacherPicked<TFilter>(
    filter: IFilter<TFilter> | IFilter<TFilter>[] | null,
    offset: number,
    limit: number
): TTeacherPicked[] {
    const { getTeachersCertainProps } = teacherApi
    const { setTeachersWithCertainProps, setTeachersWithCertainPropsInfo } =
        teacherActions
    const dispatch = useDispatch()
    useEffect(() => {
        getTeachersCertainProps(filter, offset, limit)
            .then(({ data }) => {
                console.log(data)
                dispatch(
                    setTeachersWithCertainPropsInfo({
                        count: data.count,
                        offset: data.offset,
                        limit: data.limit,
                        total: data.total,
                    })
                )
                dispatch(
                    setTeachersWithCertainProps(data.result as TTeacherPicked[])
                )
            })
            .catch((e) => {
                alert('error in useTaacherPicked')
            })
    }, [])

    const teachersWithCertainProps = useAppSelector(
        (state) => state.teacher?.teachersPickedProps
    )
    return teachersWithCertainProps
}
