import { FC, ReactNode, useEffect, useRef, UIEvent } from 'react'
import './customScrollLayout.styles.sass'
export const CustomScrollLayout: FC<{ children: ReactNode }> = ({
    children,
}) => {
    useEffect(() => {
        const wrapper = document.querySelector('.scroll-hide')
        const table = document.querySelector('.list')
        if (wrapper && table) {
            const scrollBar = document.querySelector(
                '.scrollBar'
            ) as HTMLDivElement
            const scrollBarBlock = document.querySelector(
                '.scrollBar__block'
            ) as HTMLDivElement
            const wrapperHeight =
                +window.getComputedStyle(wrapper).height.replace('px', '') - 62
            const tableHeight =
                +window.getComputedStyle(table).height.replace('px', '') - 74
            scrollBar.style.display = 'none'
            if (tableHeight > wrapperHeight) {
                scrollBar.style.display = 'block'
                scrollBar.style.height = wrapperHeight + 'px'
                scrollBarBlock.style.height =
                    wrapperHeight / (tableHeight / wrapperHeight) + 'px'
                if (
                    wrapperHeight >
                    wrapperHeight / (tableHeight / wrapperHeight)
                ) {
                    scrollBarBlock.style.height =
                        wrapperHeight / (tableHeight / wrapperHeight) + 'px'
                }
                const listWrapper = document.querySelector('.list__wrapper')
                if (listWrapper) {
                    listWrapper.addEventListener('scroll', () => {
                        scrollBarBlock.style.top =
                            (
                                listWrapper.scrollTop /
                                +(tableHeight / wrapperHeight).toFixed(3)
                            ).toString() + 'px'
                    })
                }
            }
        }
    }, [children])
    const onScroll = (e: UIEvent<HTMLDivElement>) => {
        const scrolled = e.currentTarget.scrollTop
        const elem = e.currentTarget.querySelector('.list__toTop')
        if (scrolled > 70) {
            elem?.classList.add('list__toTop-active')
        } else if (scrolled < 70) {
            elem?.classList.remove('list__toTop-active')
        }
    }
    const ref = useRef<HTMLDivElement | null>(null)
    return (
        <div style={{ position: 'relative' }}>
            <div className="scroll-hide">
                <div ref={ref} className="list__wrapper" onScroll={onScroll}>
                    {children}
                    <div
                        onClick={(e) => {
                            ref.current!.scrollTop = 0
                        }}
                        className="list__toTop"
                    ></div>
                </div>
            </div>
            <div className="scrollBar">
                <div className="scrollBar__block"></div>
            </div>
        </div>
    )
}
