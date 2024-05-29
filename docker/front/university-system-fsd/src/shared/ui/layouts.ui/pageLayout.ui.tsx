import './pageLayout.ui.styles.sass'
import { Context, FC, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { NavBar } from '../navBar.ui/navBar.tsx'
import { ProcessProvider } from '../../../app/providers/ProcessProvider.tsx'
import { ProcessUi } from '../process.ui/index.ts'
import { ProcessContext } from '../../contexts/ProcessContext.ts'
import { IProcessContext } from '../../contracts.ts'
export const PageLayout: FC = () => {
    return (
        <div
            className="page"
            style={{
                minHeight: window.screen.height,
            }}
        >
            <NavBar></NavBar>
            <ProcessProvider>
                <Outlet />
                <ProcessComponent />
            </ProcessProvider>
        </div>
    )
}

const ProcessComponent = () => {
    const { status } = useContext(ProcessContext as Context<IProcessContext>)
    return <ProcessUi status={status} />
}
