import { ITeacher } from '../teacher/forAnotherSlice/schedule.ts'
import {
    $api,
    IFilter,
    IUpdate,
    DaysEnum,
    IStoreInformation,
} from '../../shared/index.ts'
import { AxiosResponse } from 'axios'

export interface ISubject {
    day: DaysEnum
    ends: string
    groupId: number
    id: number
    nameOfSubject: string
    roomNumber: number
    numberOfSubject: number
    starts: string
    teacher: ITeacher | null
    teacherId: number
    typeOfSubject: string
}
export interface IAddSubjectDto {
    day: DaysEnum
    ends: string
    groupId: number
    nameOfSubject: string
    roomNumber: number
    numberOfSubject: number
    starts: string
    teacherId: number
    typeOfSubject: string
}

interface ISubjectResponse extends IStoreInformation {
    result: ISubject[]
}

export interface ISubjectApi {
    getSubjects: <TFilter>(
        filter: IFilter<TFilter> | IFilter<TFilter>[] | null,
        limit: number,
        offset: number,
        orderType: 'asc' | 'desc',
        orderBy: string
    ) => Promise<AxiosResponse<ISubjectResponse>>

    postSubject: (subject: IAddSubjectDto) => Promise<AxiosResponse<ISubject>>

    updateSubject: (
        id: number,
        jsonUpdate: IUpdate<ISubject, string | number | null>[] | null
    ) => Promise<AxiosResponse<ISubject>>

    deleteSubject: (subjId: number) => void
}
