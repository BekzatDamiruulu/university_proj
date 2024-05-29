import { ChangeEvent, Context, FC, useContext } from 'react'
import './paginat.ui.styles.sass'
import { IContext } from '../../contracts.ts'
export const Paginate: FC<{ context: Context<IContext> }> = ({ context }) => {
    const { stateLimit, stateOffset, count, total, setLimit, setOffset } =
        useContext(context) as IContext
    return (
        <div className="paginate">
            Строки:
            <select
                className="paginate__limit"
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                    setLimit?.(+e.currentTarget.value)
                }}
                style={{ marginLeft: 16 }}
                name="limit"
                id="limit"
                value={stateLimit}
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
            </select>
            <div className="paginate__wrapper">
                <div className="paginate__info">
                    {stateOffset * stateLimit} -{' '}
                    {stateOffset * stateLimit + count} of {total}
                </div>
                <button
                    className="paginate__btn"
                    onClick={() =>
                        setOffset?.((o: number): number => {
                            if (total - stateLimit > o * stateLimit) {
                                return o + 1
                            }
                            return o
                        })
                    }
                >
                    next
                </button>
                <button
                    className="paginate__btn paginate__btn-prev"
                    onClick={() =>
                        setOffset?.((o) => {
                            if (o > 0) {
                                return o - 1
                            }
                            return o
                        })
                    }
                >
                    prev
                </button>
            </div>
        </div>
    )
}
