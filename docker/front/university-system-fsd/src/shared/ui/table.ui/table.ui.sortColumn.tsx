import './table.ui.sortColumn.styles.sass'
import { FC, useCallback, useRef } from 'react'
export const SortColumn: FC<{
    field: string
    onClickSortChangeArrow: (
        element: HTMLDivElement | null,
        orderType: 'asc' | 'desc'
    ) => void
}> = ({ field, onClickSortChangeArrow }) => {
    const ref = useRef<HTMLDivElement>(null)
    const isEdit = field.toLowerCase() !== 'редактировать'
    const onClickSort = useCallback(() => {
        let orderType: 'asc' | 'desc' = 'desc'
        ref.current?.classList.contains('field__arrow-asc')
            ? ref.current?.classList.remove('field__arrow-asc')
            : ref.current?.classList.add('field__arrow-asc')

        orderType = ref.current?.classList.contains('field__arrow-asc')
            ? 'asc'
            : 'desc'
        console.log(orderType)
        onClickSortChangeArrow(ref.current, orderType)
    }, [onClickSortChangeArrow])
    return (
        <td
            style={{
                cursor: !isEdit ? 'default' : 'pointer',
                background: '#EDEDED',
            }}
            onClick={isEdit ? onClickSort : () => {}}
            className="field"
        >
            <span className="field__text">{field}</span>
            {!isEdit ? null : (
                <div ref={ref} className="field__arrow">
                    &#8595;
                </div>
            )}
        </td>
    )
}
