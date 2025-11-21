import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 2rem;
    text-align: center;
`

export const ErrorCode = styled.h1`
    font-size: 6rem;
    font-weight: bold;
    margin: 0;
    color: ${({ theme }) => theme.colors.primary.main};
    line-height: 1;
`

export const Title = styled.h2`
    font-size: 2rem;
    margin: 1rem 0 0.5rem;
    color: ${({ theme }) => theme.colors.text.primary};
`

export const Description = styled.p`
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: 2rem;
    max-width: 500px;
`

export const HomeLink = styled(Link)`
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.primary.contrast};
    background-color: ${({ theme }) => theme.colors.primary.main};
    border: none;
    border-radius: 8px;
    text-decoration: none;
    transition: opacity 0.25s;

    &:hover {
        opacity: 0.8;
    }
`
