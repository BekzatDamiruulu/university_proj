import { useDispatch } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { TTeacherActionTypes } from '../teacher.types.ts'
export const useTeacherDispatch = () => {
    const dispatch = useDispatch<Dispatch<TTeacherActionTypes>>()
    return function (payload: TTeacherActionTypes): void {
        dispatch(payload)
    }
}
