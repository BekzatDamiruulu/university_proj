import { FC } from 'react'
import { ISubject } from '../../../entities/subject/schedule.contracts.ts'
import { SubjectListItem } from '../listItem/subject.listItem.ui.tsx'

export const SubjectList: FC<{ subjects: ISubject[] }> = ({ subjects }) => {
    return (
        <div
            style={{
                height:
                    subjects.length < 7
                        ? subjects.length === 0
                            ? 45
                            : 85 * subjects.length
                        : 600,
                overflowY: subjects.length > 7 ? 'scroll' : 'hidden',
            }}
            className="schedulePage__subjects"
        >
            {subjects.length === 0 ? (
                <div className="schedulePage__no">нету уроков </div>
            ) : (
                subjects.map((subject) => (
                    <SubjectListItem key={subject.id} subject={subject} />
                ))
            )}
        </div>
    )
}
