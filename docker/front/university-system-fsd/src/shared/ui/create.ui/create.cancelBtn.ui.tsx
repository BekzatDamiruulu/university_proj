import { FC } from 'react'
import './create.cancelBtn.ui.styles.sass'
export const CreateCancelBtn: FC<{
    btnText: string
    onClickCancel: () => void
}> = ({ btnText, onClickCancel }) => {
    return (
        <button onClick={onClickCancel} className="resetBtn cancelBtn">
            {btnText}
        </button>
    )
}
