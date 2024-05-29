import { useLoadMoreFaculties } from '../../../entities/faculty'
import { FC } from 'react'
import { EditSelect } from '../../../shared/ui/edit.ui'
import { IFaculty, facultyHooks } from '../../../entities/faculty'
export const SelectFaculty: FC<{
    setValue: (value: IFaculty) => void
    value: IFaculty
}> = ({ setValue, value }) => {
    const faculties = facultyHooks.useGetFaculties(0, 10)
    const { onScrollFaculty } = useLoadMoreFaculties()
    return (
        <EditSelect<IFaculty>
            onScroll={onScrollFaculty}
            selectText={'Факультет:'}
            labelText={'Факультет:'}
            setValue={setValue}
            activeValue={value}
            values={faculties}
            props={['id', 'name']}
        />
    )
}
