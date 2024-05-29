import { DeleteBtn } from '../../../shared/ui/edit.ui'
import { FC } from 'react'
import { groupActions, groupHooks, groupApi } from '../../../entities/group'
export const DeleteGroup: FC<{ groupId: number }> = ({ groupId }) => {
    const dispatch = groupHooks.useGroupDispatch()
    const { deleteGroup: deleteGroupApi } = groupApi
    const { deleteGroup } = groupActions
    const onDelete = () => {
        try {
            deleteGroupApi(groupId)
            dispatch(deleteGroup(groupId))
        } catch (e) {
            alert(e)
        }
    }
    return <DeleteBtn onDelete={onDelete} />
}
