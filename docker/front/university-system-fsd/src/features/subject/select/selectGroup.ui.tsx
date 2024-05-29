import './selectGroup.styles.sass'
import { FC, useCallback, useEffect, useRef } from 'react'
import { useLoadMoreGroups } from '../../../entities/group/hooks'
import {
    groupActions,
    groupApi,
    IGroup,
    TGroupPick,
} from '../../../entities/group'
import { useDispatch } from 'react-redux'
import { useAppSelector } from '../../../shared/hooks'
export const SelectGroupUiForSubject: FC<{
    group: TGroupPick | null
    setGroup: (g: TGroupPick) => void
}> = ({ group, setGroup }) => {
    const dispatch = useDispatch()
    const ref = useRef<HTMLDivElement | null>(null)
    const toggleSelect = useCallback(() => {
        ref.current?.classList?.contains('scheduleSelect__items-active')
            ? ref.current?.classList?.remove('scheduleSelect__items-active')
            : ref.current?.classList?.add('scheduleSelect__items-active')
    }, [])
    const { setGroupsWithCertainProps, setGroupsWithCertainPropsInfo } =
        groupActions
    const { getGroupsWithCertainProps } = groupApi

    const { onScrollGroup } = useLoadMoreGroups(null)
    useEffect(() => {
        getGroupsWithCertainProps(null, 0, 5)
            .then(({ data: { result, ...info } }) => {
                dispatch(setGroupsWithCertainProps(result))
                dispatch(setGroupsWithCertainPropsInfo(info))
            })
            .catch((e) => alert('ERROR IN SELECT GROUP '))
    }, [])
    const groups = useAppSelector((s) => s.group?.groupsWithCertainProps)
    useEffect(() => {
        if (groups) {
            setGroup(groups[0])
        }
    }, [groups])
    return (
        <div className="scheduleSelect">
            <div onClick={toggleSelect} className="scheduleSelect__wrapper">
                {group?.Name ?? ' Группа '}
                <div className="scheduleSelect__trig"></div>
            </div>
            <div
                onScroll={onScrollGroup}
                ref={ref}
                className="scheduleSelect__items items"
            >
                {groups?.length > 0 ? (
                    groups.map((g, i) => {
                        return (
                            <div
                                key={g.Id}
                                onClick={(e) => {
                                    toggleSelect()
                                    setGroup(g)
                                }}
                                className={`items__item ${
                                    group?.Id === g.Id
                                        ? ' items__item-active'
                                        : ''
                                }`}
                            >
                                {g.Name}
                            </div>
                        )
                    })
                ) : (
                    <h2 onClick={toggleSelect}>no groups to select</h2>
                )}
            </div>
        </div>
    )
}
