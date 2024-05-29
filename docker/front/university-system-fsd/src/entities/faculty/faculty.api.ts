import { $api } from '../../shared/index.ts'
import { IFacultyApi } from './faculty.contracts.ts'
export const facultyApi: IFacultyApi = {
    getFaculties: async (offset = 0, limit = 10) => {
        return await $api.get(
            `/api/v1/Faculty?limit=${limit}&offset=${offset}&orderType=ASC&orderBy=Id&readAll=false`
        )
    },
    createFaculty: async (body) => {
        return await $api.post('/api/v1/Faculty', body)
    },
}
