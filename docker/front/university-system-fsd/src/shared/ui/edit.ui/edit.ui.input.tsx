import './edit.ui.input.styles.sass'
import { FC, useState } from 'react'

interface EditUiInputProps {
    labelText: string
    value: string | number
    name: string
    type?: 'text' | 'number'
    setStateValue: (v: string) => void
    placeholder: string
}

export const EditInput: FC<EditUiInputProps> = ({
    labelText,
    value,
    name,
    type = 'text',
    setStateValue,
    placeholder,
}) => {
    return (
        <div className="editInput">
            <label className="editInput__label" htmlFor={name}>
                {labelText}
            </label>
            <input
                value={value}
                onChange={(e) => setStateValue(e.currentTarget.value)}
                className="editInput__input"
                name={name}
                id={name}
                type={type}
                placeholder={placeholder}
            />
        </div>
    )
}
