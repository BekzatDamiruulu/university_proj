import { ITeacher } from './teacher.contracts.ts'
import { teachersSlice } from './teacher.model.ts'
export type TTeacherPicked = { Id: number; Name: string }

export type TTeacherActionTypes = ReturnType<
    (typeof teachersSlice.actions)[keyof typeof teachersSlice.actions]
>
