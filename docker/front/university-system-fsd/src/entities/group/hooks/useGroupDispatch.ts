import { useDispatch } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'
import { TActionTypes } from '../group.types.ts'

export const useGroupDispatch = () => {
    const dispatch = useDispatch<Dispatch<TActionTypes>>()
    return function (payload: TActionTypes): void {
        dispatch(payload)
    }
}
