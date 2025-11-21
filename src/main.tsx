import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './i18n/config'
import { ThemeProvider } from './providers/ThemeProvider'
import { ApolloProvider } from './providers/ApolloProvider'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ApolloProvider>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </ApolloProvider>
    </StrictMode>,
)
