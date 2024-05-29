import React, { FC } from 'react'
import './create.header.ui.styles.sass'
export const CreatePageHead: FC<{ text: string }> = ({ text }) => {
    return <h3 className="createHeader">{text}</h3>
}
