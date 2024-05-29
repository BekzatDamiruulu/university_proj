import { $api } from '../../shared/index.ts'
import { ISubjectApi } from './schedule.contracts.ts'
export const subjectApi: ISubjectApi = {
    getSubjects: async (
        filter = null,
        limit = 10,
        offset = 0,
        orderType = 'ASC',
        orderBy = 'Id'
    ) => {
        return await $api.get(
            `/api/v1/Subjects?${
                filter ? `filter=${JSON.stringify(filter)}&` : ''
            }limit=${limit}&offset=${offset}&orderType=${orderType}&orderBy=${orderBy}`
        )
    },

    postSubject: async (subject) => {
        console.log(subject)
        return await $api.post(`/api/v1/Subjects`, subject)
    },

    updateSubject: async (id, jsonUpdate) => {
        console.log(id, jsonUpdate)
        return await $api.patch(
            `/api/v1/Subjects?id=${id}&json=${JSON.stringify(jsonUpdate)}`,
            null
        )
    },
    deleteSubject: async (subjId) => {
        return await $api.delete(`/api/v1/Subjects?id=${subjId}`)
    },
}
