import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ISubject } from './schedule.contracts.ts'
import { IStoreInformation } from '../../shared/index.ts'

const subjectsInitialState: {
    subjects: ISubject[]
    subjectsStoreInfo: IStoreInformation
} = {
    subjects: [],
    subjectsStoreInfo: { count: 0, total: 0, limit: 0, offset: 0 },
}
export const subjectsSlice = createSlice({
    name: 'subjects',
    initialState: subjectsInitialState,
    reducers: {
        setSubjects: (state, action: PayloadAction<ISubject[]>) => {
            state.subjects = action.payload
        },
        setSubjectsStoreInfo: (
            state,
            action: PayloadAction<IStoreInformation>
        ) => {
            state.subjectsStoreInfo = action.payload
        },
        addSubject: (s, a: PayloadAction<ISubject>) => {
            s.subjects.push(a.payload)
        },
        updateSubjectAct: (s, a: PayloadAction<ISubject>) => {
            let index = 0
            s.subjects.filter((sub, i) => {
                if (sub.id === a.payload.id) {
                    index = i
                }
            })
            s.subjects.splice(index, 1, a.payload)
        },
        deleteSubjectAct: (s, a: PayloadAction<number>) => {
            let index = null
            s.subjects.filter((s, i) => {
                if (s.id === a.payload) {
                    index = i
                }
            })
            if (index !== null) {
                console.log('delete')
                s.subjects.splice(index, 1)
            }
        },
    },
})
const { reducer, actions } = subjectsSlice
export const subjectReducer = reducer
export const subjectActions = actions
