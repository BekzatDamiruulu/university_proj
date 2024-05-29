import { StudentContext } from '../student.context.ts'
import { FC, ReactElement, ReactNode, useMemo } from 'react'
import { IStudent } from '../student.contracts.ts'
import { Simulate } from 'react-dom/test-utils'
import toggle = Simulate.toggle
export const StudentContextProvider: FC<{
    children: ReactElement
    setOrderBy: (v: string) => void
    setOrderType: (v: 'asc' | 'desc') => void
    orderBy: string
    orderType: 'asc' | 'desc'
}> = ({ children, setOrderType, setOrderBy, orderType, orderBy }) => {
    const columnsName = useMemo(
        () => [
            'Full name',
            'Group name',
            'Age',
            'Phone number',
            'Email',
            'редактировать',
        ],
        []
    )
    const enableSortBy = useMemo(
        () => ['fullName', 'group.name', 'age', 'phoneNumber', 'email'],
        []
    )
    return (
        <StudentContext.Provider
            value={{
                enableSortBy,
                setOrderBy: setOrderBy,
                setOrderType: setOrderType,
                columnsName,
                orderType,
                orderBy,
                total: 0,
                count: 0,
                stateLimit: 0,
                stateOffset: 0,
            }}
        >
            {children}
        </StudentContext.Provider>
    )
}
