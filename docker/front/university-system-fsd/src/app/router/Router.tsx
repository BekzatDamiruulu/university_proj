import { Routes, Route, useNavigate } from 'react-router-dom'
import { PageLayout } from '../../shared/ui/layouts.ui/index.ts'
import { GroupMainPageUi } from '../../pages/group/mainPage/group.mainPage.ui.tsx'
import { StudentsMainPage } from '../../pages/student/mainPage/index.ts'
import { TeachersListPage } from '../../pages/teacher/mainPage/index.ts'
import { CreateTeacherPage } from '../../pages/teacher/create/teacher.create.ui.tsx'
import { CreateGroupPage } from '../../pages/group/createPage/group.create.ui.tsx'
import { StudentCreateInformation } from '../../widgets/student/createBlock/student.createInformation.ui.tsx'
import { SchedulePage } from '../../pages/schedule/index.ts'
import { AuthPage } from '../../pages/auth/mainPage.tsx'
import { useAppSelector } from '../../shared/hooks/index.ts'
import { useDispatch } from 'react-redux'
import { authActions } from '../../entities/auth/index.ts'
import { $api } from '../../shared/index.ts'
export const Router = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { login } = authActions
    $api.interceptors.response.use(
        (response) => {
            return response
        },
        (error) => {
            if (error.response.status == 401) {
                localStorage.clear()
                dispatch(login(false))
                navigate('/')
            }
        }
    )
    const authorized = useAppSelector((s) => s.auth?.authorized)
    console.log(authorized)
    return (
        <Routes>
            {authorized ? (
                <Route path={'/'} element={<PageLayout />}>
                    <Route path={'groups'} element={<GroupMainPageUi />} />
                    <Route path={'students'} element={<StudentsMainPage />} />
                    <Route path={'teachers'} element={<TeachersListPage />} />
                    <Route
                        path={'new-teacher'}
                        element={<CreateTeacherPage />}
                    />
                    <Route path={'new-group'} element={<CreateGroupPage />} />
                    <Route
                        path={'new-student'}
                        element={<StudentCreateInformation />}
                    />
                    <Route path={'schedule'} element={<SchedulePage />} />
                </Route>
            ) : (
                <Route path={'/'} element={<AuthPage />} />
            )}
        </Routes>
    )
}
