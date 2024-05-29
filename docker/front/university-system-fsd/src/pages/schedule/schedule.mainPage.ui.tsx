import { WrapperDaysSubjectList } from '../../widgets/subject'
import { SelectGroupUiForSubject } from '../../features/subject'
import './schedule.mainPage.styles.sass'
import { useState } from 'react'
import { TGroupPick } from '../../entities/group'

export const SchedulePage = () => {
    const [group, setGroup] = useState<TGroupPick | null>(null)
    return (
        <div className="schedulePage">
            <h3 className="schedulePage__header">Расписание</h3>
            <SelectGroupUiForSubject group={group} setGroup={setGroup} />
            <WrapperDaysSubjectList
                groupId={group?.Id ?? null}
            ></WrapperDaysSubjectList>
        </div>
    )
}
