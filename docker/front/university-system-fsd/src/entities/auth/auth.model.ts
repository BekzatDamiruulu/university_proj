import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IAuth {
    authorized: boolean
}

const auth: IAuth = {
    authorized: false,
}
export const authSlice = createSlice({
    name: 'auth',
    initialState: auth,
    reducers: {
        login: (s, a: PayloadAction<boolean>) => {
            s.authorized = a.payload
        },
    },
})
const { reducer, actions } = authSlice
export { reducer as authReducer }
export const authActions = actions
