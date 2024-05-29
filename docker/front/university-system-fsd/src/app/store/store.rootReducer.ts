import { combineReducers } from '@reduxjs/toolkit'
import { facultyReducer } from '../../entities/faculty'
import { groupReducer } from '../../entities/group'
import { teacherReducer } from '../../entities/teacher'
import { studentReducer } from '../../entities/student'
import { subjectReducer } from '../../entities/subject'
import { authReducer } from '../../entities/auth'
export const rootReducer = combineReducers({
    faculty: facultyReducer,
    group: groupReducer,
    teacher: teacherReducer,
    student: studentReducer,
    subject: subjectReducer,
    auth: authReducer,
})
