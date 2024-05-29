import { FC, useRef, MouseEvent, Key, ReactNode, UIEvent } from 'react'
import './edit.ui.select.styles.sass'

interface EditSelectProps<T> {
    labelText: string
    selectText: string
    activeValue: T | null
    values: T[]
    props: (keyof T)[]
    setValue: (value: T) => void
    onScroll: (e: UIEvent<HTMLDivElement>) => void
    placeholder?: string
}
export const EditSelect = <T,>({
    placeholder = 'Выбрать учителя ',
    labelText,
    selectText,
    activeValue = null,
    values = [],
    props,
    setValue,
    onScroll = (e) => {},
}: EditSelectProps<T>) => {
    const ref = useRef<HTMLDivElement>(null)
    function onClick(e: MouseEvent<HTMLDivElement>) {
        e.stopPropagation()
        if (e.currentTarget === e.target && values.length > 0) {
            ref.current?.classList?.contains('editSelect__items-active')
                ? ref.current?.classList?.remove('editSelect__items-active')
                : ref.current?.classList?.add('editSelect__items-active')
        }
    }

    return (
        <div className="editSelect">
            <div className="editSelect__label">{labelText}</div>
            <div onClick={onClick} className="editSelect__wrapper">
                <div className="editSelect__selected">
                    {
                        (activeValue?.[props[1]]
                            ? activeValue?.[props[1]]
                            : placeholder) as string
                    }
                </div>
                <div
                    ref={ref}
                    onScroll={onScroll}
                    onClick={onClick}
                    className="editSelect__items"
                >
                    {values.length > 0 ? (
                        values.map((v) => {
                            {
                                if (
                                    activeValue?.[props[1]] === v[props[1]] &&
                                    activeValue?.[props[1]] === selectText
                                ) {
                                    setValue(v)
                                }
                                return (
                                    <div
                                        key={v[props[0]] as Key}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            onClick(e)
                                            setValue(v)
                                        }}
                                        className={`editSelect__item ${activeValue?.[props[0]] === v[props[0]] ? 'editSelect__item-active' : ''}`}
                                    >
                                        {v[props[1]] as ReactNode}
                                    </div>
                                )
                            }
                        })
                    ) : (
                        <div
                            onClick={(e) => {
                                e.stopPropagation()
                                onClick(e)
                            }}
                            style={{
                                textAlign: 'center',
                                fontSize: 20,
                                height: '100%',
                            }}
                        >
                            выбрать нечего
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
