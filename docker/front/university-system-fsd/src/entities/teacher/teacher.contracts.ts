import { IGroup } from '../group/forAnotherSlice/teacher.ts'
import { AxiosResponse } from 'axios'
import { IFilter, IStoreInformation, IUpdate } from '../../shared/index.ts'
import { TTeacherPicked } from './teacher.types.ts'
export interface ITeacher {
    id: number
    name: string
    photo: string
    groupId: number
    group: IGroup | null
    teachersSubject?: string
    birthDate: string
}
export interface ICreateTeacherDto {
    name: string
    photo: string
    groupId: number | null
    teachersSubject: string
    birthDate: string
}

export interface ITeacherState {
    teachers: ITeacher[]
    teachersPickedProps: TTeacherPicked[]
    statusTeachersData: 'idle' | 'loading' | 'loaded' | 'error'
    teachersStoreInfo: IStoreInformation
    teachersPickedPropsStoreInfo: IStoreInformation
}
interface ITeacherResponse extends IStoreInformation {
    result: TTeacherPicked[] | ITeacher[]
}

export interface ITeacherApi {
    getTeachers: <T>(
        filter: IFilter<T> | IFilter<T>[] | null,
        limit: number,
        offset: number,
        orderBy: string,
        orderType: 'asc' | 'desc'
    ) => Promise<AxiosResponse<ITeacherResponse>>

    getTeachersCertainProps: <TFilter>(
        filter: IFilter<TFilter> | IFilter<TFilter>[] | null,
        offset: number,
        limit: number
    ) => Promise<AxiosResponse<ITeacherResponse>>
    updateTeacher: <TFields>(
        id: number,
        updateFieldsJson: IUpdate<ITeacher, TFields>[]
    ) => Promise<AxiosResponse<ITeacher>>
    createTeacher: (
        teacherObject: ICreateTeacherDto
    ) => Promise<AxiosResponse<ITeacher>>
    deleteTeacher: (teacherId: number) => void
}
