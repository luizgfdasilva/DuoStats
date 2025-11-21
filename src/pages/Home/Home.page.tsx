import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import reactLogo from '../../assets/react.svg'
import viteLogo from '/vite.svg'
import * as S from './Home.styles'
import { QueryAccountByRiotId } from '../../features/accounts'

export const Home = () => {
    const [count, setCount] = useState(0)
    const { t, i18n } = useTranslation()

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng)
    }

    const handleGetUuid = async () => {
        try {
            const account = await QueryAccountByRiotId('imEDGE', '666')
            console.log('Account data:', account)
        } catch (error) {
            console.error('Failed to fetch account:', error)
        }
    }

    return (
        <S.Container>
            <S.LogoContainer>
                <a href="https://vite.dev" target="_blank" rel="noreferrer">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank" rel="noreferrer">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </S.LogoContainer>

            <S.Title>{t('welcome')}</S.Title>
            <S.Description>{t('description')}</S.Description>

            <S.LanguageButtons>
                <button onClick={() => changeLanguage('en')}>English</button>
                <button onClick={() => changeLanguage('es')}>Español</button>
                <button onClick={() => changeLanguage('pt')}>Português</button>
                <button onClick={handleGetUuid}>teste de api riot</button>
            </S.LanguageButtons>

            <S.Card>
                <button onClick={() => setCount(count => count + 1)}>{t('counter.button', { count })}</button>
                <p>{t('counter.instruction')}</p>
            </S.Card>

            <S.Footer>{t('footer')}</S.Footer>
        </S.Container>
    )
}
