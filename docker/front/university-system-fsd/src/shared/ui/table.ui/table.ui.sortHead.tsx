import './table.ui.sortHead.styles.sass'
import { SortColumn } from './table.ui.sortColumn.tsx'
import { Context, FC, useContext, useRef } from 'react'
import { IContext } from '../../contracts.ts'

export const SortHead: FC<{ context: Context<IContext> }> = ({ context }) => {
    const { columnsName, enableSortBy, setOrderBy, setOrderType } = useContext(
        context
    ) as IContext
    const ref = useRef<HTMLDivElement | null>(null)
    const onClickSort = (
        arrowAsc: HTMLDivElement | null,
        orderType: 'asc' | 'desc'
    ) => {
        if (ref.current && arrowAsc !== ref.current) {
            ref.current.classList.remove('field__arrow-asc')
        }
        setOrderType(orderType)
        ref.current = arrowAsc
    }
    return (
        <tr className="sortFields">
            {columnsName.map((columnName, i) => {
                return (
                    <SortColumn
                        key={i + columnName}
                        onClickSortChangeArrow={(element, orderType) => {
                            onClickSort(element, orderType)
                            setOrderBy(enableSortBy[i])
                        }}
                        field={columnName}
                    />
                )
            })}
        </tr>
    )
}
