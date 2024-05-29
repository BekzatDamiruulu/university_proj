import React, { Context, FC } from 'react'
import { StudentListItem } from '../listItem/student.listItem.ui.tsx'
import { IStudent } from '../../../entities/student/student.contracts.ts'
import { SortHead } from '../../../shared/ui/table.ui/table.ui.sortHead.tsx'
import { IContext, Loading } from '../../../shared/index.ts'
import { StudentContext } from '../../../entities/student/student.context.ts'
import { CustomScrollLayout } from '../../../shared/ui/layouts.ui/customScrollLayout.ui.tsx'
export const StudentList: FC<{ students: IStudent[]; dataStatus: string }> = ({
    students,
    dataStatus,
}) => {
    return (
        <CustomScrollLayout>
            <table className="list">
                <thead>
                    <SortHead context={StudentContext as Context<IContext>} />
                </thead>
                {dataStatus === 'loaded' ? (
                    <tbody className="list__body">
                        <tr className="list__divider"></tr>
                        {students.length > 0
                            ? students.map((student) => (
                                  <StudentListItem
                                      key={student.id}
                                      student={student}
                                  />
                              ))
                            : null}
                    </tbody>
                ) : null}
            </table>
            {dataStatus === 'loading' ? <Loading /> : null}
            {dataStatus === 'error' ? <h4>something went wrong ...</h4> : null}
        </CustomScrollLayout>
    )
}
