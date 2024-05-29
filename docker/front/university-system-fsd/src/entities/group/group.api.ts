import { $api } from '../../shared/index.ts'
import { IGroupApi } from './group.contracts.ts'
export const groupApi: IGroupApi = {
    getGroups: async (
        offset = 0,
        limit = 10,
        orderBy = 'Id',
        orderType = 'ASC'
    ) => {
        return await $api.get(
            `/api/v1/Group?limit=${limit}&offset=${offset}&orderType=${orderType}&orderBy=${orderBy}`
        )
    },
    getGroupsWithCertainProps: async (filter, offset = 0, limit = 10) => {
        return await $api.post(
            `/api/v1/Group/dataCertainProp?${
                filter ? `filter=${JSON.stringify(filter)}&` : ''
            }limit=${limit}&offset=${offset}&orderType=ASC&orderBy=Id&readAll=false`,
            ['id', 'name']
        )
    },
    updateGroupById: async (id, json) => {
        return await $api.patch(
            `/api/v1/Group?id=${id}&json=${JSON.stringify(json)}`,
            null
        )
    },
    createGroup: async (name, maxNumberOfStudents, facultyId) => {
        return await $api.post('/api/v1/Group', {
            name: name,
            maxNumberOfStudents: maxNumberOfStudents,
            facultyId: facultyId,
        })
    },
    deleteGroup: (groupId) => {
        $api.delete(`/api/v1/Group?id=${groupId}`).then((r) => {
            if (r.status === 200) {
                return r.data
            }
        })
    },
}
