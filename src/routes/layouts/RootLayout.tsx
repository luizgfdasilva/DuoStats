import { Outlet } from 'react-router-dom'
import { Navigation } from '../../components/Navigation'
import * as S from './styles'

/**
 * Root layout component
 * Wraps all pages with common UI elements like navigation
 */
export const RootLayout = () => {
    return (
        <S.Container>
            <Navigation />
            <S.Main>
                <Outlet />
            </S.Main>
        </S.Container>
    )
}
