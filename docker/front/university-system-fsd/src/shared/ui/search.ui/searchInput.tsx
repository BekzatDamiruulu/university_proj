import './searchInput.styles.sass'
import { FC, useRef, useState } from 'react'
export const SearchInput: FC<{ name: string; placeholder: string }> = ({
    name,
    placeholder,
}) => {
    const [value, setValue] = useState('')
    const ref = useRef<HTMLInputElement | null>(null)
    return (
        <div className="searchInput-wrapper">
            <input
                ref={ref}
                onChange={(e) => setValue(e.currentTarget.value)}
                value={value}
                placeholder={placeholder}
                className="searchInput"
                name={name}
                type="text"
            />
            <div
                onClick={(e) => ref.current?.focus()}
                className="searchInput__img"
            ></div>
        </div>
    )
}
