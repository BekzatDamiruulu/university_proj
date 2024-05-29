import { IStudent } from './student.contracts.ts'

type TPickProps = 'id' | 'fullName'

export type TStudentPicked = Pick<IStudent, TPickProps>
