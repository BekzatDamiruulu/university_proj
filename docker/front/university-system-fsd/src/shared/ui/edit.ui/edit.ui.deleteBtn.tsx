import './edit.ui.styles.sass'
import { FC } from 'react'
export const DeleteBtn: FC<{ onDelete: () => void }> = ({ onDelete }) => {
    return (
        <button
            onClick={onDelete}
            className="resetBtn editBtns__delete editBtns__btn"
        >
            удалить
        </button>
    )
}
