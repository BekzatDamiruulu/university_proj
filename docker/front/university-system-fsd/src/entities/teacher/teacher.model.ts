import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ITeacher, ITeacherState } from './teacher.contracts.ts'
import { IStoreInformation } from '../../shared/index.ts'
import { TTeacherPicked } from './teacher.types.ts'

const initialState: ITeacherState = {
    teachers: [],
    teachersPickedProps: [],
    statusTeachersData: 'idle',
    teachersStoreInfo: { count: 0, offset: 0, limit: 0, total: 0 },
    teachersPickedPropsStoreInfo: { count: 0, offset: 0, limit: 0, total: 0 },
}
export const teachersSlice = createSlice({
    name: 'teachers',
    initialState,
    reducers: {
        setTeacherStoreInfo: (
            state,
            action: PayloadAction<IStoreInformation>
        ) => {
            state.teachersStoreInfo = action.payload
        },
        fetchingTeachers: (state) => {
            state.statusTeachersData = 'loading'
        },
        fetchTeachersError: (state) => {
            state.statusTeachersData = 'error'
        },
        fetchedTeachers: (state, action: PayloadAction<ITeacher[]>) => {
            state.teachers = action.payload
            state.statusTeachersData = 'loaded'
        },
        addTeacher: (state, action: PayloadAction<ITeacher>) => {
            state.teachers.push(action.payload)
        },
        deleteTeacher: (state, action: PayloadAction<number>) => {
            state.teachersStoreInfo.count = state.teachersStoreInfo.count - 1
            state.teachersStoreInfo.total = state.teachersStoreInfo.total - 1
            state.teachers = state.teachers.filter(
                (s) => s.id !== action.payload
            )
        },
        setTeachersWithCertainPropsInfo: (
            s,
            a: PayloadAction<IStoreInformation>
        ) => {
            s.teachersPickedPropsStoreInfo = a.payload
        },
        setTeachersWithCertainProps: (
            state,
            action: PayloadAction<TTeacherPicked[]>
        ) => {
            state.teachersPickedProps = action.payload
        },
        addNewTeacherWithCertainProps: (
            state,
            action: PayloadAction<TTeacherPicked>
        ) => {
            state.teachersPickedProps.push(action.payload)
        },
        updateTeacher: (s, a: PayloadAction<ITeacher>) => {
            let index = 0
            s.teachers.filter((t, i) => {
                if (t.id === a.payload.id) {
                    index = i
                }
                return true
            })
            s.teachers.splice(index, 1, a.payload)
        },
        deleteTeacherWithCertainProps: (s, a: PayloadAction<number>) => {
            let index = null
            s.teachersPickedProps.filter((t, i) => {
                if (t.Id === a.payload) {
                    index = i
                }
                return true
            })

            if (index || index === 0) {
                console.log(s.teachersPickedProps.splice(index, 1))
            }
        },
        loadMoreTeachersWithProps: (s, a: PayloadAction<TTeacherPicked[]>) => {
            s.teachersPickedProps = [...s.teachersPickedProps, ...a.payload]
            s.teachersPickedPropsStoreInfo.count =
                s.teachersPickedPropsStoreInfo.count + a.payload.length
        },
    },
})
export const teacherActions = teachersSlice.actions
export const teacherReducer = teachersSlice.reducer
