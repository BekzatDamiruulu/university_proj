import './pageHeader.ui.styles.sass'
import { FC } from 'react'
export const PageHeader: FC<{ text: string }> = ({ text }) => {
    return <h3 className="bodyHeader">{text}</h3>
}
