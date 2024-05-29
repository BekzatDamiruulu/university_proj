import { useRef, UIEvent } from 'react'
import { facultyActions } from '../faculty.model.ts'
import { facultyApi } from '../faculty.api.ts'
import { useFacultyDispatch } from './useFacultyDispatch.ts'
import { useAppSelector } from '../../../shared/hooks/index.ts'

export const useLoadMoreFaculties = () => {
    const dispatch = useFacultyDispatch()
    const { getFaculties } = facultyApi
    const { loadMoreFaculties } = facultyActions

    const { count, total } = useAppSelector(
        (state) => state.faculty?.facultyStoreInformation
    )
    const localOffset = useRef(5)

    function onScroll(e: UIEvent<HTMLDivElement>) {
        if (
            e.currentTarget.scrollHeight - e.currentTarget.clientHeight - 10 <
                e.currentTarget.scrollTop &&
            total > count
        ) {
            localOffset.current = localOffset.current + 5
            getFaculties(localOffset.current, 5)
                .then((response) => {
                    dispatch(loadMoreFaculties(response.data.result))
                })
                .catch((e) => {
                    alert('error in useLoadMoreFaculties')
                })
        }
    }
    return { onScrollFaculty: onScroll }
}
