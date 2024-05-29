import { GroupItem } from '../listItem/group.item.ui.tsx'
import { SortHead } from '../../../shared/ui/table.ui/table.ui.sortHead.tsx'
import React, { Context, useEffect } from 'react'
import { useContext } from 'react'
import {
    groupActions,
    groupApi,
    GroupContext,
    IGroup,
    groupHooks,
} from '../../../entities/group/index.ts'
import {
    IContext,
    IProcessContext,
    Loading,
    ProcessContext,
} from '../../../shared/index.ts'
import { useAppSelector } from '../../../shared/hooks/index.ts'
import './group.list.styles.sass'

export const GroupList = () => {
    const { stateLimit, stateOffset, orderBy, orderType } = useContext(
        GroupContext
    ) as IContext

    const dispatch = groupHooks.useGroupDispatch()
    const { fetchingGroups, fetchedGroups, fetchGroupError, setInfoDataGroup } =
        groupActions
    const { getGroups } = groupApi
    const groupsList = useAppSelector((state) => state.group.groups)
    const dataStatus = useAppSelector((state) => state.group.statusGroupsData)
    useEffect(() => {
        dispatch(fetchingGroups())
        getGroups(stateOffset, stateLimit, orderBy, orderType)
            .then(({ data }) => {
                dispatch(
                    setInfoDataGroup({
                        total: data?.total,
                        count: data?.count,
                        offset: data?.offset,
                        limit: data?.limit,
                    })
                )
                dispatch(fetchedGroups(data.result as IGroup[]))
            })
            .catch((e) => {
                dispatch(fetchGroupError())
                alert('group list error')
            })
    }, [orderBy, orderType, stateLimit, stateOffset])

    return (
        <>
            <div className="groupList__hide">
                <table className="groupList">
                    <thead>
                        <SortHead context={GroupContext as Context<IContext>} />
                    </thead>
                    {dataStatus === 'loaded' ? (
                        <tbody>
                            {groupsList?.map((group) => (
                                <React.Fragment key={group.id}>
                                    <tr
                                        style={{
                                            height: 12,
                                            boxShadow: 'none',
                                        }}
                                    ></tr>
                                    <GroupItem group={group} />
                                </React.Fragment>
                            ))}
                        </tbody>
                    ) : null}
                </table>
                {dataStatus === 'loading' ? <Loading /> : null}
                {dataStatus === 'error' ? (
                    <h4>something went wrong ...</h4>
                ) : null}
            </div>
        </>
    )
}
