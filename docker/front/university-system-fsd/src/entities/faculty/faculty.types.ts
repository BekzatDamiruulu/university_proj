import { facultySlice } from './faculty.model.ts'

export type TFacultyActionTypes = ReturnType<
    (typeof facultySlice.actions)[keyof typeof facultySlice.actions]
>
