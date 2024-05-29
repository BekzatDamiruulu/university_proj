import { groupApi } from '../group.api.ts'
import { groupActions } from '../group.model.ts'
import { useGroupDispatch } from './useGroupDispatch.ts'
import { UIEvent, useState } from 'react'
import { IFilter, sharedHooks } from '../../../shared/index.ts'
export const useLoadMoreGroups = <TFilter>(
    filter: IFilter<TFilter> | IFilter<TFilter>[] | null
) => {
    const dispatch = useGroupDispatch()
    const { total, count } = sharedHooks.useAppSelector(
        (s) => s.group?.infoOfDataGroupCertainProps
    )
    const { loadMoreGroupsWithCerProps } = groupActions
    const { getGroupsWithCertainProps } = groupApi
    const [localOffset, setLocalOffset] = useState(5)

    function onScrollGroup(e: UIEvent<HTMLDivElement>) {
        if (
            e.currentTarget.scrollHeight - e.currentTarget.clientHeight - 10 <
                e.currentTarget.scrollTop &&
            total > count &&
            total > localOffset
        ) {
            console.log('load more')
            getGroupsWithCertainProps(filter, localOffset, 5)
                .then(({ data }) => {
                    dispatch(loadMoreGroupsWithCerProps(data.result))
                })
                .catch((e) => {
                    alert('error in useLoadMoreGroupsWithCerProps')
                })
            setLocalOffset((o) => o + 5)
        }
    }
    return { onScrollGroup }
}
