import {
    createSlice,
    combineReducers,
    PayloadAction,
    Reducer,
    ReducersMapObject,
} from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { IFaculty, IFacultyState } from './faculty.contracts.ts'
import { useDispatch } from 'react-redux'
import { TFacultyActionTypes } from './faculty.types.ts'
import { IStoreInformation } from '../../shared/index.ts'

const initialState: IFacultyState = {
    faculties: [],
    facultyStoreInformation: { count: 0, total: 0, limit: 0, offset: 0 },
}
export const facultySlice = createSlice({
    name: 'facultySlice',
    initialState,
    reducers: {
        setFacultyStoreInfo: (s, a: PayloadAction<IStoreInformation>) => {
            s.facultyStoreInformation = a.payload
        },
        setFaculty: (s, a: PayloadAction<IFaculty>) => {
            s.faculties.push(a.payload)
        },
        setFaculties: (s, a: PayloadAction<IFaculty[]>) => {
            s.faculties = a.payload
        },
        loadMoreFaculties: (s, a: PayloadAction<IFaculty[]>) => {
            s.faculties = [...s.faculties, ...a.payload]
            s.facultyStoreInformation.count =
                s.facultyStoreInformation.count + a.payload.length
        },
    },
})

// Определение обобщенного типа для ключей
type ValidKey = string | number | symbol

// Определение типа для объекта редукторов
type ReducersObject<S> = {
    [key in ValidKey]: Reducer<S | undefined>
}

// Определение интерфейса для среза состояния
interface Slice<S> {
    name: ValidKey // Используем обобщенный тип для name
    reducer: Reducer<S | undefined> // Обновляем тип редуктора
}

export const facultyActions = facultySlice.actions
export const facultyReducer = facultySlice.reducer
