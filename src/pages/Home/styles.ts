import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;

  a {
    transition: filter 0.3s;

    &:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }
  }

  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;

    &.react:hover {
      filter: drop-shadow(0 0 2em #61dafbaa);
    }
  }
`

export const Title = styled.h1`
  font-size: 3.2em;
  line-height: 1.1;
  margin-bottom: 1rem;
`

export const Description = styled.p`
  font-size: 1.2em;
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.colors.text.primary};
`

export const LanguageButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin: 1.5rem 0;

  button {
    padding: 0.5rem 1rem;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: ${({ theme }) => theme.colors.background.paper};
    color: ${({ theme }) => theme.colors.text.primary};
    cursor: pointer;
    transition: border-color 0.25s;
    border: 1px solid transparent;
    border-radius: 8px;

    &:hover {
      border-color: ${({ theme }) => theme.colors.primary.main};
    }

    &:focus,
    &:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }
  }
`

export const Card = styled.div`
  padding: 2em;

  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: ${({ theme }) => theme.colors.background.paper};
    color: ${({ theme }) => theme.colors.text.primary};
    cursor: pointer;
    transition: border-color 0.25s;

    &:hover {
      border-color: ${({ theme }) => theme.colors.primary.main};
    }

    &:focus,
    &:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }
  }

  p {
    margin-top: 1rem;
  }
`

export const Footer = styled.p`
  color: ${({ theme }) => theme.colors.text.secondary};
`
