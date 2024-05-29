import './group.selectFilter.styles.sass'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import selectImg from './../../../shared/assets/images/selectTriangle.svg'
import { useLoadMoreGroups } from '../../../entities/group/hooks'
import { groupActions, groupApi, TGroupPick } from '../../../entities/group'
import { useAppSelector } from '../../../shared/hooks'
import { useDispatch } from 'react-redux'

export const GroupSelectFilter: FC<{
    setGroupId: (v: number) => void
}> = ({ setGroupId }) => {
    const dispatch = useDispatch()
    const [groupName, setGroupName] = useState<string>()
    const myRef = useRef<HTMLDivElement | null>(null)
    const { onScrollGroup } = useLoadMoreGroups(null)
    const { getGroupsWithCertainProps } = groupApi
    const { setGroupsWithCertainPropsInfo, setGroupsWithCertainProps } =
        groupActions
    const groupsWithCertainProps = useAppSelector(
        (s) => s.group?.groupsWithCertainProps
    )
    useEffect(() => {
        getGroupsWithCertainProps(null, 0, 5)
            .then(({ data: { result, ...info } }) => {
                console.log(info)
                dispatch(setGroupsWithCertainProps(result))
                dispatch(setGroupsWithCertainPropsInfo(info))
            })
            .catch((e) => alert('error in selectFilter'))
            .finally(() => {})
    }, [])

    const callBack = useCallback((group: TGroupPick) => {
        if (!groupName) {
            setGroupId(group.Id)
            setGroupName(group.Name)
        }
    }, [])
    useEffect(() => {
        if (groupsWithCertainProps?.length > 0) {
            callBack(groupsWithCertainProps[0])
        }
    }, [groupsWithCertainProps])
    return (
        <div
            onClick={(e) => {
                !myRef.current!.classList.contains('selectFilter__values-show')
                    ? myRef.current!.classList.add('selectFilter__values-show')
                    : myRef.current!.classList.remove(
                          'selectFilter__values-show'
                      )
            }}
            className="selectFilter"
        >
            {groupName}
            <img className="selectFilter__img" src={selectImg} alt="select" />
            <div
                onScroll={onScrollGroup}
                onClick={(e) => {
                    e.stopPropagation()
                    e.currentTarget.classList.remove(
                        'selectFilter__values-show'
                    )
                }}
                ref={myRef}
                className="selectFilter__values values"
            >
                {groupsWithCertainProps.length !== 0 ? (
                    groupsWithCertainProps.map((group, i) => {
                        return (
                            <div
                                key={group.Id}
                                onClick={() => {
                                    setGroupName(group.Name)
                                    setGroupId(group.Id)
                                }}
                                className={`values__item${
                                    groupName === group.Name
                                        ? ' values__item-active'
                                        : ''
                                }`}
                            >
                                {group.Name}
                            </div>
                        )
                    })
                ) : (
                    <h4 className="values__item-no">нету выбора</h4>
                )}
            </div>
        </div>
    )
}
