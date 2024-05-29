import './create.wrapperInformation.ui.styles.sass'
import { CSSProperties, FC, ReactElement, ReactNode } from 'react'

export const InfoWrapper: FC<{
    style?: CSSProperties
    infoText: string
    children: ReactNode
}> = ({ style, infoText, children }) => {
    return (
        <div style={style} className="infoAboutGroup">
            <div className="infoAboutGroup__header">{infoText}</div>
            {children}
        </div>
    )
}
