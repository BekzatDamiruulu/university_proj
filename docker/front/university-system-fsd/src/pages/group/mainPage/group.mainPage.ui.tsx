import './group.mainPage.styles.sass'
import { PageHeader } from '../../../shared/ui/pageHeader.ui/index.ts'
import { Context, useCallback, useContext, useMemo, useState } from 'react'
import { SearchInput } from '../../../shared/ui/search.ui/searchInput.tsx'
import { GroupContext } from '../../../entities/group/index.ts'
import { useAppSelector } from '../../../shared/hooks/index.ts'
import { AddBtn } from '../../../shared/ui/addBtn.ui/index.ts'
import { GroupList } from '../../../widgets/group/list/index.ts'
import { Paginate } from '../../../shared/ui/paginate.ui/index.ts'
import {
    IContext,
    IProcessContext,
    ProcessContext,
} from '../../../shared/index.ts'
import { CreateFacultyModal } from '../../../widgets/faculty/createModal/faculty.createModal.ui.tsx'

export const GroupMainPageUi = () => {
    const { count: countOfGroup, total } = useAppSelector(
        (s) => s.group.infoOfDataGroup
    )

    const [orderBy, setOrderBy] = useState('Id')
    const [orderType, setOrderType] = useState<'asc' | 'desc'>('asc')
    const [stateLimit, setLimit] = useState(5)
    const [stateOffset, setOffset] = useState(0)
    const paginate = {
        stateLimit,
        stateOffset,
        count: countOfGroup,
        total,
        setLimit,
        setOffset,
    }
    const enableSortBy = useMemo(
        () => [
            'name',
            'teacher.name',
            'countStudents',
            'faculty.name',
            'created',
        ],
        []
    )
    const columnsName = useMemo(
        () => [
            'Группа',
            'Учитель',
            'студенты',
            'факультет',
            'год создания',
            'редактировать',
        ],
        []
    )
    const [hide, setHide] = useState(true)
    const toggleModal = useCallback(() => {
        setHide((s) => !s)
    }, [])
    return (
        <div className="groupListPage">
            <PageHeader text={`Группы (${paginate.count})`} />
            <div className="groupListPage__mechanics">
                <SearchInput
                    name="searchGroup"
                    placeholder={'Поиск группы...'}
                />
                <div>
                    <button
                        onClick={toggleModal}
                        style={{ marginRight: 16, display: 'inline-block' }}
                        className="resetBtn addBtn"
                    >
                        Создать факультет
                    </button>
                    <AddBtn path={'/new-group'} btnText={'Добавить группу'} />
                </div>
            </div>
            <GroupContext.Provider
                value={{
                    orderBy,
                    orderType,
                    columnsName,
                    enableSortBy,
                    ...paginate,
                    setOrderBy,
                    setOrderType,
                }}
            >
                <GroupList />
                <Paginate context={GroupContext as Context<IContext>} />
            </GroupContext.Provider>
            {hide ? null : (
                <CreateFacultyModal
                    toggleModal={toggleModal}
                ></CreateFacultyModal>
            )}
        </div>
    )
}
