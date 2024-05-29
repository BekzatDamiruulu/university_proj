import './create.wrapperAddInfo.ui.styles.sass'
import { CSSProperties, FC, ReactNode } from 'react'
export const AdditionInfo: FC<{
    style?: CSSProperties
    addInfoText: string
    children: ReactNode
}> = ({ style, addInfoText, children }) => {
    return (
        <div style={style} className="additionInfo">
            <div className="additionInfo__header">{addInfoText}</div>
            {children}
        </div>
    )
}
