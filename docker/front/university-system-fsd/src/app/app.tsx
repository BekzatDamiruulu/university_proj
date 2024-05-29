import React from 'react'
import { StoreProvider } from './providers/StoreProvider.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './router/Router.tsx'
import { $api } from '../shared/index.ts'
import { useDispatch } from 'react-redux'
import { authActions } from '../entities/auth/index.ts'
export function App() {
    return (
        <StoreProvider>
            <BrowserRouter>
                <Router></Router>
            </BrowserRouter>
        </StoreProvider>
    )
}
