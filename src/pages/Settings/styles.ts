import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
`

export const Title = styled.h1`
    font-size: 2.5em;
    line-height: 1.1;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.text.primary};
`

export const Description = styled.p`
    font-size: 1.1em;
    margin-bottom: 2rem;
    color: ${({ theme }) => theme.colors.text.secondary};
`

export const SettingsSection = styled.section`
    background-color: ${({ theme }) => theme.colors.background.paper};
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border: 1px solid ${({ theme }) => theme.colors.grey[300]};
`

export const SectionTitle = styled.h2`
    font-size: 1.5em;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.text.primary};
`

export const SectionDescription = styled.p`
    font-size: 0.95em;
    margin-bottom: 1.5rem;
    color: ${({ theme }) => theme.colors.text.secondary};
`

export const LanguageGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
`

export const LanguageOption = styled.button<{ $isActive: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1.5rem;
    border-radius: 8px;
    border: 2px solid ${({ $isActive, theme }) => ($isActive ? theme.colors.primary.main : theme.colors.grey[300])};
    background-color: ${({ $isActive, theme }) => ($isActive ? `${theme.colors.primary.main}20` : 'transparent')};
    cursor: pointer;
    transition: all 0.25s;

    &:hover {
        border-color: ${({ theme }) => theme.colors.primary.main};
        background-color: ${({ theme }) => `${theme.colors.primary.main}10`};
    }

    &:focus,
    &:focus-visible {
        outline: 4px auto -webkit-focus-ring-color;
    }
`

export const LanguageFlag = styled.span`
    font-size: 2em;
`

export const LanguageName = styled.span`
    font-size: 1em;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.text.primary};
`

export const InfoText = styled.p`
    font-size: 0.95em;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.colors.text.secondary};

    &:last-child {
        margin-bottom: 0;
    }
`
