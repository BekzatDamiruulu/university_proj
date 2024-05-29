import './create.btn.ui.styles.sass'
import { FC, MouseEvent } from 'react'
export const CreateBtn: FC<{
    btnText: string
    onClick: (e: MouseEvent<HTMLButtonElement>) => void
}> = ({ btnText, onClick }) => {
    return (
        <button type="submit" onClick={onClick} className="resetBtn createBtn">
            {btnText}
        </button>
    )
}
