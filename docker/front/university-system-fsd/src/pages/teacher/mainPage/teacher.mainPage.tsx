import { PageHeader, SearchInput } from '../../../shared/ui/index.ts'
import React, { useState } from 'react'
import { useAppSelector } from '../../../shared/hooks/index.ts'
import { AddBtn } from '../../../shared/ui/addBtn.ui/index.ts'
import { TeacherList } from '../../../widgets/teacher/list/teacher.list.ui.tsx'
import './teacher.mainPage.styles.sass'
export const TeachersListPage = () => {
    const count = useAppSelector((s) => s.teacher?.teachersStoreInfo.count)
    const [subject, setSubject] = useState('выберите предмет')
    return (
        <div className="teachersListPage">
            <PageHeader text={`Учителя (${count ?? 0})`} />
            <div className="teachersListPage__mechanics">
                <SearchInput
                    name={'teacherName'}
                    placeholder={'Поиск учителя...'}
                />
                {/*<SelectFilter*/}
                {/*    setValue={setSubject}*/}
                {/*    text={'выберите предмет:'}*/}
                {/*    value={subject}*/}
                {/*    values={[]}*/}
                {/*    ids={[]}*/}
                {/*/>*/}
                <AddBtn path={'/new-teacher'} btnText={'Добавить учителя'} />
            </div>
            <TeacherList />
        </div>
    )
}
