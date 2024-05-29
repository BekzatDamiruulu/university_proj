import { EditSelect } from '../../../shared/ui/edit.ui'
import { FC } from 'react'
import { TTeacherPicked, teacherHooks } from '../../../entities/teacher'
import { types } from 'sass'
import Null = types.Null
import { IFilter } from '../../../shared'
export const SelectTeacher: FC<{
    activeTeacher: TTeacherPicked | null
    setValue: (value: TTeacherPicked) => void
    filter?: null | IFilter<string | number | null>
}> = ({
    activeTeacher,
    setValue,
    filter = {
        filterBy: 'groupId',
        filterValue: null,
        filterConditions: ['EXACT'],
    },
}) => {
    const teachersPicked = teacherHooks.useTeacherPicked(filter, 0, 5)
    const { onScrollTeachers } = teacherHooks.useLoadMoreTeachers(filter)
    return (
        <EditSelect
            labelText={'Выбрать учителя'}
            selectText={'Учитель'}
            activeValue={activeTeacher}
            values={teachersPicked}
            props={['Id', 'Name']}
            setValue={setValue}
            onScroll={onScrollTeachers}
        ></EditSelect>
    )
}
