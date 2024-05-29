import { CSSProperties, FC, useRef, useState, ChangeEvent } from 'react'
import './create.inputFile.ui.styles.sass'
export const InputFile: FC<{
    labelText: string
    style?: CSSProperties
    name: string
}> = ({ labelText, style, name }) => {
    const ref = useRef<HTMLInputElement | null>(null)
    const wrapperRef = useRef<HTMLDivElement | null>(null)
    const [fileName, setFileName] = useState('файл не выбран')
    return (
        <div style={style} className="inputFile">
            <div className="inputFile__labelText">{labelText}</div>
            <input
                name={name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const target = e.target as HTMLInputElement
                    if (target.files?.length) {
                        setFileName(target.files[0].name)
                        wrapperRef.current?.classList.add(
                            'inputFile__wrapper-selected'
                        )
                    }
                }}
                ref={ref}
                style={{ display: 'none' }}
                type="file"
                id="imageFile"
                accept="image/*"
            />
            <div ref={wrapperRef} className="inputFile__wrapper">
                <button
                    onClick={(e) => {
                        ref.current?.click()
                    }}
                    className="resetBtn inputFile__btn"
                >
                    Выберите файл
                </button>
                <div className="inputFile__fileName">{fileName}</div>
            </div>
        </div>
    )
}
