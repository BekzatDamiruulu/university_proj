import React, { Context, FC, useCallback, useContext, useState } from 'react'
import './group.item.styles.sass'
import { IGroup } from '../../../entities/group/index.ts'
import { GroupEditModal } from '../editModal/group.editModal.ui.tsx'
import { IProcessContext, ProcessContext } from '../../../shared/index.ts'
export const GroupItem: FC<{ group: IGroup }> = ({ group }) => {
    const [hide, setHide] = useState(true)
    const toggleModal = useCallback(() => {
        setHide((s) => !s)
    }, [])
    const { status } = useContext(ProcessContext as Context<IProcessContext>)

    return (
        <tr className="groupItem">
            <td className="groupItem__value">{group.name}</td>
            <td className="groupItem__value">{group.teacher?.name}</td>
            <td className="groupItem__value">{group.countStudents}</td>
            <td className="groupItem__value">{group.faculty.name}</td>
            <td className="groupItem__value">{group.created}</td>
            <GroupEditModal group={group}></GroupEditModal>
        </tr>
    )
}
