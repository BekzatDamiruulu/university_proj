import { $api } from '../../shared/index.ts'
import { ITeacherApi } from './teacher.contracts.ts'

export const teacherApi: ITeacherApi = {
    getTeachers: async (filter, limit, offset, orderBy, orderType) => {
        return await $api.get(
            `/api/v1/Teacher?${
                filter ? `filter=${JSON.stringify(filter)}&` : ''
            }limit=${limit}&offset=${offset}&orderType=${orderType}&orderBy=${orderBy}`
        )
    },

    getTeachersCertainProps: async (filter, offset, limit, ...props) => {
        return await $api.post(
            `/api/v1/Teacher/dataCertainProp?${
                filter ? `filter=${JSON.stringify(filter)}&` : ''
            }limit=${limit}&offset=${offset}&orderType=ASC&orderBy=Id&readAll=false`,
            ['id', 'name']
        )
    },
    updateTeacher: async (id, updateFieldsJson) => {
        return await $api.patch(
            `/api/v1/Teacher?id=${id}&json=${JSON.stringify(updateFieldsJson)}`
        )
    },

    createTeacher: async (teacherObject) => {
        return await $api.post('/api/v1/Teacher', teacherObject)
    },
    deleteTeacher: async (teacherId) => {
        return await $api.delete(`/api/v1/Teacher?id=${teacherId}`)
    },
}
