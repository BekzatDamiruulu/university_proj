import './edit.ui.styles.sass'
import { FC } from 'react'

export const SaveBtn: FC<{ onClick: () => void; btnText?: string }> = ({
    onClick,
    btnText,
}) => {
    return (
        <button
            type="submit"
            onClick={onClick}
            className="resetBtn editBtns__change editBtns__btn"
        >
            {btnText ?? 'Сохранить'}
        </button>
    )
}
