import './Process.ui.styles.sass'
import { FC, useEffect, useMemo } from 'react'
import { CreatePortal } from '../../utils/index.ts'
import { TStatus } from '../../types.ts'
import { createPortal } from 'react-dom'
export const ProcessUi: FC<{
    status: TStatus
}> = ({ status = 'idle' }) => {
    const classStatus =
        status === 'loading'
            ? ' process__image-loading'
            : status === 'success'
              ? ' process__image-success'
              : status === 'error'
                ? ' process__image-error'
                : ''
    const div = useMemo(() => {
        return document.createElement('div')
    }, [])
    div.className = 'portal'
    useEffect(() => {
        const modal = div.querySelector('div')
        modal?.addEventListener('click', (e) => {
            if (e.currentTarget === e.target) {
                div.remove()
            }
        })
        return () => {
            div.remove()
            modal?.removeEventListener('click', (e) => {
                if (e.currentTarget === e.target) {
                    div.remove()
                }
            })
        }
    }, [])
    const processComponent = useMemo(() => {
        return status === 'idle' ? null : (
            <div
                className="process"
                style={{
                    height: window.screen.height,
                    width: window.screen.width,
                }}
            >
                <div className="process__wrapper">
                    <div className={'process__image' + classStatus}></div>
                    {status === 'loading' ? (
                        <div className="process__result">Подождите</div>
                    ) : status === 'success' ? (
                        <div className="process__result">
                            Все прошло успешно
                        </div>
                    ) : (
                        <div className="process__result">
                            Что-то пошло не так !
                        </div>
                    )}
                </div>
            </div>
        )
    }, [status])
    document.body.append(div)
    return createPortal(processComponent, div)
}
