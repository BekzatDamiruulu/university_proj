import './create.wrapper.ui.styles.sass'

import { CreateCancelBtn } from './create.cancelBtn.ui.tsx'
import { CreateBtn } from './create.btn.ui.tsx'
import { FC, MouseEvent } from 'react'
import { CreatePageHead } from './create.header.ui.tsx'
export const CreateWrapper: FC<{
    headerText: string
    BtnText: string
    onClickCancel: () => void
    onClickCreate: (e: MouseEvent<HTMLButtonElement>) => void
}> = ({ headerText, BtnText, onClickCancel, onClickCreate }) => {
    return (
        <div className="createPageHeader">
            <div className="createPageHeader__wrapper">
                <CreatePageHead text={headerText} />
                <div className="createPageHeader__btns">
                    <CreateCancelBtn
                        btnText={'отменить'}
                        onClickCancel={onClickCancel}
                    />
                    <CreateBtn onClick={onClickCreate} btnText={BtnText} />
                </div>
            </div>
        </div>
    )
}
