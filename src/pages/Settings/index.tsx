import { useTranslation } from 'react-i18next'
import * as S from './styles'

export const Settings = () => {
  const { i18n } = useTranslation()

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng)
  }

  const currentLanguage = i18n.language

  return (
    <S.Container>
      <S.Title>Settings</S.Title>
      <S.Description>Configure your preferences</S.Description>

      <S.SettingsSection>
        <S.SectionTitle>Language</S.SectionTitle>
        <S.SectionDescription>
          Choose your preferred language for the application
        </S.SectionDescription>

        <S.LanguageGrid>
          <S.LanguageOption
            $isActive={currentLanguage === 'en'}
            onClick={() => changeLanguage('en')}
          >
            <S.LanguageFlag>🇺🇸</S.LanguageFlag>
            <S.LanguageName>English</S.LanguageName>
          </S.LanguageOption>

          <S.LanguageOption
            $isActive={currentLanguage === 'es'}
            onClick={() => changeLanguage('es')}
          >
            <S.LanguageFlag>🇪🇸</S.LanguageFlag>
            <S.LanguageName>Español</S.LanguageName>
          </S.LanguageOption>

          <S.LanguageOption
            $isActive={currentLanguage === 'pt'}
            onClick={() => changeLanguage('pt')}
          >
            <S.LanguageFlag>🇧🇷</S.LanguageFlag>
            <S.LanguageName>Português</S.LanguageName>
          </S.LanguageOption>
        </S.LanguageGrid>
      </S.SettingsSection>

      <S.SettingsSection>
        <S.SectionTitle>About</S.SectionTitle>
        <S.InfoText>
          DuoStats - Track your Duolingo progress and statistics
        </S.InfoText>
        <S.InfoText>Version: 0.0.0</S.InfoText>
      </S.SettingsSection>
    </S.Container>
  )
}
