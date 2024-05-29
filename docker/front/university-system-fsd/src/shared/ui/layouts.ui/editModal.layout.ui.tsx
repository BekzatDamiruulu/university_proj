import './editModal.layout.styles.sass'
import { FC, ReactElement, ReactHTML, ReactHTMLElement, ReactNode } from 'react'
import { CreatePortal } from '../../utils'
interface EditModalUiLayoutProps extends React.PropsWithChildren {
    headerText: string
    children: ReactNode
    toggleModal: () => void
}
export const EditModalLayout: FC<EditModalUiLayoutProps> = ({
    children,
    headerText = '',
    toggleModal,
}) => {
    return (
        <CreatePortal toggleModal={toggleModal}>
            <div
                style={{
                    height: window.screen.height,
                    width: window.screen.width,
                }}
                className="modalEdit"
            >
                <div className="editModal">
                    <div className="editModal__header">{headerText}</div>
                    {children}
                </div>
            </div>
        </CreatePortal>
    )
}
