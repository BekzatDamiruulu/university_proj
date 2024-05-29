import { IGroup } from '../group/forAnotherSlice/student.ts'
import { TStudentPicked } from './student.types.ts'
import { IFilter, IStoreInformation, IUpdate } from '../../shared/index.ts'
import { AxiosResponse } from 'axios'

export interface IStudent {
    id: number
    age: number
    fullName: string
    groupId: number
    group: IGroup | null
    phoneNumber: string
    email: string
    photo: string | null
}

export interface IStudentResponse extends IStoreInformation {
    result: IStudent[]
}

export interface IStudentState {
    students: IStudent[]
    studentsWithCertainProps: TStudentPicked[]
    statusStudentsData: 'idle' | 'loading' | 'loaded' | 'error'
    infoDataStudents: IStoreInformation
    infoDataStudentsCertainProps: IStoreInformation
}
type TCreateStudentDto = Omit<IStudent, 'id' | 'group'>
export interface IStudentApi {
    getStudents: <TFilter>(
        filter: IFilter<TFilter> | IFilter<TFilter>[] | null,
        limit: number,
        offset: number,
        orderBy: keyof IStudent,
        orderType: 'asc' | 'desc'
    ) => Promise<AxiosResponse<IStudentResponse>>
    updateStudent: <TUpdate>(
        id: number,
        updateStudent: IUpdate<TUpdate, string | number>[]
    ) => Promise<AxiosResponse<IStudent>>
    createStudent: (
        student: TCreateStudentDto
    ) => Promise<AxiosResponse<IStudent>>
    deleteStudent: (studentId: number) => void
}
