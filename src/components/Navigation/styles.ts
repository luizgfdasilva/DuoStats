import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Nav = styled.nav`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background.paper};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey[300]};
  padding: 1rem 0;
`

export const Container = styled.div`
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
`

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary.main};
`

export const NavList = styled.ul`
  display: flex;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
`

export const StyledNavLink = styled(NavLink)`
  padding: 0.5rem 1rem;
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.25s;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
    background-color: ${({ theme }) => theme.colors.grey[100]};
  }

  &.active {
    color: ${({ theme }) => theme.colors.primary.contrast};
    background-color: ${({ theme }) => theme.colors.primary.main};
  }
`
