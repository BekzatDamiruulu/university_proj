import './create.input.ui.styles.sass'
import { CSSProperties, FC, FocusEvent } from 'react'

interface IInputProps {
    style?: CSSProperties
    name: string
    placeholder: string
    id: string
    labelText: string
    type?: 'text' | 'number' | 'email'
    setValue: (v: string) => void
    value: string | number
    handleBlur: (e: FocusEvent<HTMLInputElement>) => void
}

export const CreateInput: FC<IInputProps> = ({
    style,
    name,
    placeholder,
    id,
    labelText,
    type,
    setValue,
    value,
    handleBlur,
}) => {
    return (
        <div style={style} className="createInput">
            <label className="createInput__label" htmlFor={id}>
                {labelText}
            </label>
            <input
                onBlur={handleBlur}
                onChange={(e) => setValue(e.currentTarget.value)}
                placeholder={placeholder}
                className="createInput__input"
                id={id}
                value={value}
                name={name}
                type={type ?? 'text'}
            />
        </div>
    )
}
