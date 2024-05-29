import {
    useCallback,
    useRef,
    MouseEvent,
    FC,
    CSSProperties,
    UIEvent,
    Key,
} from 'react'
import './create.select.ui.styles.sass'
import { IEntity } from '../../contracts.ts'

interface ISelectProps<T, K extends keyof T> {
    text: string
    activeValue: T | null
    values: T[]
    labelText: string
    style?: CSSProperties
    setValue: (v: T) => void
    value: T | null
    handleBlur: () => void
    onScroll: (e: UIEvent<HTMLDivElement>) => void
    prop: K
}

export const SelectForCreate = <T, R extends keyof T>({
    text,
    activeValue,
    values = [],
    labelText,
    style,
    setValue,
    value,
    handleBlur,
    onScroll = () => {},
    prop,
}: ISelectProps<T, R>) => {
    const ref = useRef<HTMLDivElement | null>(null)
    const toggleSelect = useCallback((e: MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        ref.current?.classList.contains('selectForCreating__selects-active')
            ? ref.current?.classList.remove('selectForCreating__selects-active')
            : ref.current?.classList.add('selectForCreating__selects-active') ||
              handleBlur()
    }, [])

    return (
        <div style={style} className="selectForCreating">
            <div
                onClick={toggleSelect}
                tabIndex={0}
                className="selectForCreating__label"
            >
                {labelText}
            </div>
            <div onClick={toggleSelect} className="selectForCreating__wrapper">
                <div className="selectForCreating__selected">
                    {value ? (value[prop] as string) : text}
                </div>
                <div className="selectForCreating__triangle"></div>
                <div
                    ref={ref}
                    onScroll={onScroll}
                    className="selectForCreating__selects"
                >
                    {values.length > 0 ? (
                        values.map((v, i) => (
                            <div
                                key={`${v[prop]} + ${i}` as Key}
                                onClick={(e) => {
                                    setValue(v)
                                    toggleSelect(e)
                                }}
                                className="selects__item"
                            >
                                {v[prop] as string}
                            </div>
                        ))
                    ) : (
                        <div
                            style={{
                                textAlign: 'center',
                                color: '#fff',
                                textTransform: 'uppercase',
                            }}
                        >
                            nothing to select
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
