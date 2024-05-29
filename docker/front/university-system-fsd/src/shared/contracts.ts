import { TStatus } from './types.ts'

export interface IStoreInformation {
    total: number
    count: number
    offset: number
    limit: number
}

export interface IFilter<FilterT> {
    filterBy: string
    filterValue: FilterT
    filterConditions: ['EXACT'] | ['MORE'] | ['LESS'] | ['LIKE']
}

export interface IUpdate<Entity, T> {
    fieldName: keyof Entity
    fieldValue: T
}
type setFunc = (o: number) => number
export interface IContext {
    count: number
    total: number
    setLimit?: (n: number | setFunc) => void
    setOffset?: (n: number | setFunc) => void
    orderBy: string
    orderType: 'asc' | 'desc'
    stateLimit: number
    stateOffset: number
    setOrderBy: (v: string) => void
    setOrderType: (v: 'asc' | 'desc') => void
    columnsName: string[]
    enableSortBy: string[]
}

export interface IEntity {
    Id: number
    Name: string
}

export interface IProcessContext {
    setTime: () => void
    status: TStatus
    setStatus: (status: TStatus) => void
}
