import { IFilter, IStoreInformation, IUpdate } from '../../shared/index.ts'
import { TGroupPick } from './group.types.ts'
import { AxiosResponse } from 'axios'
import { ITeacher } from '../teacher/forAnotherSlice/group.ts'
import { IFaculty } from '../faculty/index.ts'
export interface IGroup {
    id: number
    name: string
    created: string
    maxNumberOfStudents: number
    countStudents: number
    facultyId: number
    countSubjects: number
    teacher?: ITeacher
    faculty: IFaculty
}

export interface IGroupAddDto {
    name: string
    maxNumberOfStudents: number
    facultyId: number
}
export interface IUpdateGroupDto {
    name: string
    facultyId: number
    teacherId: number
}

export interface IGroupStoreInformation extends IStoreInformation {}
export interface IGroupPickedStoreInfo extends IStoreInformation {}

export interface IGroupState {
    groups: IGroup[]
    groupsWithCertainProps: TGroupPick[]
    statusGroupsData: 'idle' | 'loaded' | 'loading' | 'error'
    infoOfDataGroup: IGroupStoreInformation
    infoOfDataGroupCertainProps: IGroupPickedStoreInfo
}
export interface IGroupResponse extends IStoreInformation {
    result: IGroup[] | TGroupPick[]
}
interface IPickedPropsresponse extends IStoreInformation {
    result: TGroupPick[]
}

export interface IGroupApi {
    getGroups: (
        offset: number,
        limit: number,
        orderBy: string,
        orderType: string
    ) => Promise<AxiosResponse<IGroupResponse>>
    getGroupsWithCertainProps: <FilterT>(
        filter: IFilter<FilterT> | IFilter<FilterT>[] | null,
        offset: number,
        limit: number
    ) => Promise<AxiosResponse<IPickedPropsresponse>>
    updateGroupById: <TFields>(
        id: number,
        json: IUpdate<IGroup, TFields>[]
    ) => Promise<AxiosResponse<IGroup>>
    createGroup: (
        name: string,
        maxNumberOfStudents: number,
        facultyId: number
    ) => Promise<AxiosResponse<IGroup>>
    deleteGroup: (groupId: number) => void
}
