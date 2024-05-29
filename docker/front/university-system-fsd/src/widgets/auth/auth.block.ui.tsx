import './auth.block.styles.sass'
import { useFormik } from 'formik'
import { Loading } from '../../shared'
import { authApi } from '../../entities/auth'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authActions } from '../../entities/auth'

interface IFormikAuth {
    Login: string
    Password: string
}

export const AuthBlock = () => {
    const navigate = useNavigate()

    const { login } = authApi
    const dispatch = useDispatch()
    useEffect(() => {
        let token = localStorage.getItem('access_token')
        if (token) {
            dispatch(authActions.login(true))
            navigate('/')
        }
    })
    const [status, setStatus] = useState('idle')
    function validation(values: IFormikAuth) {
        const error: Partial<IFormikAuth> = {}
        if (!values.Login.trim()) {
            error.Login = 'Заполните !'
        }
        if (!values.Password.trim()) {
            error.Password = 'Заполните !'
        }
        return error
    }
    const formik = useFormik<IFormikAuth>({
        initialValues: { Login: '', Password: '' },
        validate: validation,
        onSubmit: () => {
            setStatus('loading')
            login(formik.values.Login, formik.values.Password)
                .then(({ data }) => {
                    localStorage.setItem('access_token', data)
                    setStatus('idle')
                    navigate('/groups')
                    dispatch(authActions.login(true))
                })
                .catch((e) => {
                    setStatus('error')
                    const timeId = setTimeout(() => {
                        clearTimeout(timeId)
                        setStatus('idle')
                    }, 1200)
                })
        },
    })
    return (
        <div style={{ height: '100%', paddingTop: 100 }}>
            <div className="auth">
                <h2 className="auth__header">Авторизация</h2>
                <input
                    onChange={formik.handleChange}
                    style={{ marginTop: 12 }}
                    className="auth__input"
                    placeholder={'login'}
                    name={'Login'}
                    type="text"
                    onBlur={formik.handleBlur}
                />
                {formik.errors.Login && formik.touched.Login && (
                    <div className="notValidBlock">{formik.errors.Login}</div>
                )}

                <input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    style={{ marginTop: 16 }}
                    className="auth__input"
                    placeholder={'Password'}
                    name={'Password'}
                    type="password"
                />

                {formik.errors.Password && formik.touched.Password && (
                    <div className="notValidBlock">
                        {formik.errors.Password}
                    </div>
                )}

                {status === 'loading' ? (
                    <Loading />
                ) : status === 'idle' ? null : status === 'error' ? (
                    <div className="notValidBlock">
                        Пароль или логин не правильно
                    </div>
                ) : null}

                <button
                    onClick={() => formik.handleSubmit()}
                    className="resetBtn auth__btn"
                    type="submit"
                >
                    Войти
                </button>
            </div>
        </div>
    )
}
