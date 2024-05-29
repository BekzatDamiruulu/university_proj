import { $api, IStoreInformation } from '../../shared'
import { AxiosResponse } from 'axios'

export interface IFacultyApi {
    getFaculties: <Keys>(
        offset: number,
        limit: number
    ) => Promise<AxiosResponse<IFacultyResponse>>
    createFaculty: (body: IFacultyCreateDto) => Promise<AxiosResponse<IFaculty>>
}
export interface IFaculty {
    name: string
    id: number
}

interface IFacultyCreateDto {
    name: string
}
export interface IFacultyState {
    faculties: IFaculty[]
    facultyStoreInformation: IStoreInformation
}
export interface IFacultyResponse {
    total: number
    count: number
    limit: number
    offset: number
    result: IFaculty[]
}
