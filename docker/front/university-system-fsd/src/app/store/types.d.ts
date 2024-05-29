import { store } from './store.ts'

declare global {
    export type RootStore = typeof store
    export type RootState = ReturnType<typeof store.getState>
    export type AppDispatch = typeof store.dispatch
}
