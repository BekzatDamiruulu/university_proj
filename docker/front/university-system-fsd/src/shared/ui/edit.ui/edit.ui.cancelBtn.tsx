import './edit.ui.styles.sass'
import { FC, MouseEvent } from 'react'

export const CancelBtn: FC<{
    onClick: (e: MouseEvent<HTMLButtonElement>) => void
}> = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="resetBtn editBtns__cancel editBtns__btn"
        >
            отменить
        </button>
    )
}
