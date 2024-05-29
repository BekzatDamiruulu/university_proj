import './faculty.createModal.styles.sass'
import { Context, FC, useContext, useState } from 'react'
import { CancelBtn, EditInput } from '../../../shared/ui/edit.ui'
import { EditModalLayout } from '../../../shared/ui/layouts.ui'
import { CreateFaculty } from '../../../features/faculty'
import { IProcessContext, ProcessContext } from '../../../shared'
export const CreateFacultyModal: FC<{
    toggleModal: () => void
}> = ({ toggleModal }) => {
    const { setStatus } = useContext(ProcessContext as Context<IProcessContext>)
    return (
        <div className="facultyModal">
            <EditModalLayout
                toggleModal={toggleModal}
                headerText={'Создать факультет'}
            >
                <ModalFragment
                    toggleModal={toggleModal}
                    setStatus={setStatus}
                ></ModalFragment>
            </EditModalLayout>
        </div>
    )
}

const ModalFragment: FC<{
    toggleModal: () => void
    setStatus: (s: 'idle' | 'success' | 'error' | 'loading') => void
}> = ({ toggleModal, setStatus }) => {
    const [facultyName, setFacultyName] = useState('')

    return (
        <>
            <div className="editModal__body">
                <EditInput
                    name={'editNameOfGroup'}
                    labelText={'Факультет:'}
                    value={facultyName}
                    setStateValue={setFacultyName}
                    placeholder={'факультет'}
                />
            </div>
            <div className="editModal__footer">
                <CancelBtn onClick={toggleModal}></CancelBtn>
                <CreateFaculty
                    toggleModal={toggleModal}
                    setStatus={setStatus}
                    facultyName={facultyName}
                />
            </div>
        </>
    )
}
