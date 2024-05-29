import './addBtn.styles.sass'
import { Link, useLocation } from 'react-router-dom'
import { CSSProperties, FC } from 'react'
export const AddBtn: FC<{
    btnText: string
    path: string
    style?: CSSProperties
}> = ({ btnText, path, style }) => {
    const pathName = useLocation().pathname
    if (!path) {
        path = pathName
    }
    return (
        <Link
            to={path}
            onClick={(e) => {
                if (pathName === path) {
                    e.preventDefault()
                }
            }}
        >
            <button className="resetBtn addBtn">{btnText}</button>
        </Link>
    )
}
