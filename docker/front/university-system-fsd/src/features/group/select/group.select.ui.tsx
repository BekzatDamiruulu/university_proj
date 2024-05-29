import { EditSelect } from '../../../shared/ui/edit.ui'
import {
    groupActions,
    groupApi,
    IGroup,
    TGroupPick,
} from '../../../entities/group'
import { useLoadMoreGroups } from '../../../entities/group/hooks'
import { useAppSelector } from '../../../shared/hooks'
import { IFilter } from '../../../shared'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
interface ISelectProps {
    setValue: (value: TGroupPick) => void
    value: TGroupPick | null
}
export const SelectGroup = ({ setValue, value }: ISelectProps) => {
    // const { getGroupsWithCertainProps } = groupApi
    // const { setGroupsWithCertainProps, setGroupsWithCertainPropsInfo } =
    //     groupActions
    // const dispatch = useDispatch()
    // useEffect(() => {
    //     getGroupsWithCertainProps(null, 0, 10)
    //         .then(({ data: { result, ...info } }) => {
    //             dispatch(setGroupsWithCertainProps(result))
    //             dispatch(setGroupsWithCertainPropsInfo(info))
    //         })
    //         .catch((e) => alert('error in group select'))
    //         .finally(() => {
    //             setValue(groups[0])
    //         })
    // }, [])
    const groups = useAppSelector((s) => s.group?.groupsWithCertainProps)

    const { onScrollGroup } = useLoadMoreGroups(null)
    return (
        <EditSelect
            onScroll={onScrollGroup}
            selectText={'Группа:'}
            labelText={'Группа:'}
            setValue={setValue}
            activeValue={value}
            values={groups}
            props={['Id', 'Name']}
        />
    )
}
