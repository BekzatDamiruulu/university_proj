import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './store.rootReducer.ts'
export const store = configureStore({
    reducer: rootReducer,
})
