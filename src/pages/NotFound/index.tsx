import { ROUTES } from '../../routes/paths'
import * as S from './styles'

export const NotFound = () => {
    return (
        <S.Container>
            <S.ErrorCode>404</S.ErrorCode>
            <S.Title>Page Not Found</S.Title>
            <S.Description>The page you are looking for does not exist or has been moved.</S.Description>
            <S.HomeLink to={ROUTES.HOME}>Go back to Home</S.HomeLink>
        </S.Container>
    )
}
