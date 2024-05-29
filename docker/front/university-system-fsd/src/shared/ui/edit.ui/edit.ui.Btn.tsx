import React, { FC } from 'react'

import './edit.ui.Btn.styles.sass'
export const EditBtn: FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <td className="btn__edit-padding">
            <div tabIndex={0} onClick={onClick} className="btn__edit"></div>
        </td>
    )
}
