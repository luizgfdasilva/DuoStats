import { ROUTES } from '../../routes/paths'
import * as S from './styles'

export const Navigation = () => {
    return (
        <S.Nav>
            <S.Container>
                <S.Logo>DuoStats</S.Logo>

                <S.NavList>
                    <li>
                        <S.StyledNavLink to={ROUTES.HOME}>Home</S.StyledNavLink>
                    </li>
                    <li>
                        <S.StyledNavLink to={ROUTES.SETTINGS}>Settings</S.StyledNavLink>
                    </li>
                </S.NavList>
            </S.Container>
        </S.Nav>
    )
}
