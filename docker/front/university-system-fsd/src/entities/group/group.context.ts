import { createContext } from 'react'
import { IGroup } from './group.contracts.ts'
import { IContext } from '../../shared/index.ts'

export const GroupContext = createContext<IContext | null>(
    null
    // {
    // orderBy: 'id',
    // orderType: 'asc',
    // stateLimit: 10,
    // stateOffset: 0,
    // columnsName: [
    //     'Группа',
    //     'Учитель',
    //     'студенты',
    //     'факультет',
    //     'год создания',
    //     'редактировать',
    // ],
    // enableSortBy: [
    //     'name',
    //     'teacher.name',
    //     'countStudents',
    //     'faculty.name',
    //     'created',
    // ],
    // setOrderBy: (v) => {},
    // setOrderType: (v) => {},
    // }
)
