import { $api } from '../../shared/index.ts'
import { IStudentApi } from './student.contracts.ts'

export const studentApi: IStudentApi = {
    getStudents: async (
        filter = null,
        limit = 20,
        offset = 0,
        orderBy = 'Id',
        orderType = 'asc'
    ) => {
        return await $api.get(
            `/api/v1/Students?${
                filter ? `filter=${JSON.stringify(filter)}&` : ''
            }limit=${limit}&offset=${offset}&orderType=${orderType}&orderBy=${orderBy}`
        )
    },
    updateStudent: async (id, json) => {
        return await $api.patch(
            `/api/v1/Students?id=${id}&json=${JSON.stringify(json)}`
        )
    },
    createStudent: async (student) => {
        console.log(student)
        return await $api.post('/api/v1/Students', student)
    },
    deleteStudent: async (studentId) => {
        return await $api.delete(`/api/v1/Students?id=${studentId}`)
    },
}
