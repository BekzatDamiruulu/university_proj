import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IStudent, IStudentState } from './student.contracts.ts'
import { IStoreInformation } from '../../shared/index.ts'

const studentsInitialState: IStudentState = {
    students: [],
    studentsWithCertainProps: [],
    statusStudentsData: 'idle',
    infoDataStudents: { total: 0, count: 0, offset: 0, limit: 0 },
    infoDataStudentsCertainProps: { total: 0, count: 0, offset: 0, limit: 0 },
}

export const studentsSlice = createSlice({
    name: 'students',
    initialState: studentsInitialState,
    reducers: {
        fetchStudents: (state) => {
            state.statusStudentsData = 'loading'
        },
        fetchedStudents: (state, action: PayloadAction<IStudent[]>) => {
            state.students = action.payload
            state.statusStudentsData = 'loaded'
        },
        fetchStudentsError: (state) => {
            state.statusStudentsData = 'error'
        },
        addStudent: (state, action: PayloadAction<IStudent>) => {
            state.students.push(action.payload)
            state.infoDataStudents.count = state.infoDataStudents.count + 1
            state.infoDataStudents.total = state.infoDataStudents.total + 1
        },
        deleteStudent: (state, action: PayloadAction<number>) => {
            state.infoDataStudents.count = state.infoDataStudents.count - 1
            state.infoDataStudents.total = state.infoDataStudents.total - 1
            state.students = state.students.filter(
                (s) => s.id !== action.payload
            )
        },
        updateStudent: (s, a: PayloadAction<IStudent>) => {
            let index = 0
            s.students.filter((s, i) => {
                if (s.id === a.payload.id) {
                    index = i
                }
            })
            s.students.splice(index, 1, a.payload)
        },
        setInfoDataStudents: (s, a: PayloadAction<IStoreInformation>) => {
            s.infoDataStudents = a.payload
        },
    },
})
const { reducer, actions } = studentsSlice
export { reducer as studentReducer }
export const studentsActions = actions
