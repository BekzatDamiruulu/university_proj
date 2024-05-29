import './day.ui.styles.sass'
import { FC } from 'react'
import { DaysEnum } from '../../enums/day.enum.ts'
export const DayBtn: FC<{
    day: DaysEnum
    activeDay: DaysEnum
    onClick: (d: DaysEnum) => void
}> = ({ day, activeDay, onClick }) => {
    return (
        <button
            onClick={() => onClick(day)}
            className={`resetBtn schedule__btn${
                activeDay
                    ? activeDay === day
                        ? ' schedule__btn-active'
                        : ''
                    : ''
            }`}
        >
            {day}
        </button>
    )
}
