import { useDispatch } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { TFacultyActionTypes } from '../faculty.types.ts'

export const useFacultyDispatch = () => {
    const dispatch = useDispatch<Dispatch<TFacultyActionTypes>>()
    return function (payload: TFacultyActionTypes): void {
        dispatch(payload)
    }
}
