import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { theme } from '../styles/theme'
import { GlobalStyles } from '../styles/GlobalStyles'
import type { ReactNode } from 'react'

interface ThemeProviderProps {
    children: ReactNode
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    return (
        <StyledThemeProvider theme={theme}>
            <GlobalStyles />
            {children}
        </StyledThemeProvider>
    )
}
