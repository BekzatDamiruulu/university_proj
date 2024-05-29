import { useSelector } from 'react-redux'
import { facultyApi } from '../faculty.api.ts'
import { facultyActions } from '../faculty.model.ts'
import { useEffect } from 'react'
import { useFacultyDispatch } from './useFacultyDispatch.ts'
import { IFaculty } from '../faculty.contracts.ts'
import { useAppSelector } from '../../../shared/hooks/index.ts'

export function useGetFaculties(offset: number, limit: number): IFaculty[] {
    const dispatch = useFacultyDispatch()
    const { setFaculties, setFacultyStoreInfo, setFaculty, loadMoreFaculties } =
        facultyActions
    const { getFaculties } = facultyApi
    useEffect(() => {
        getFaculties(offset, limit)
            .then((response) => {
                const { result, ...infos } = response.data
                dispatch(setFacultyStoreInfo(infos))
                dispatch(setFaculties(response.data.result))
            })
            .catch((e) => {
                alert('error in useGetFaculties')
            })
    }, [])

    return useAppSelector((s) => s.faculty?.faculties)
}
