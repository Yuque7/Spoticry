import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const NavbarContainer = styled.nav`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  margin-top: 4%;
`;

export const Logo = styled.img`
  height: 40px;
  margin-left: 10%;
`;

export const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin-left: 2rem;
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: #FFFCEC;
  font-weight: bold;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #1CA731;
  }
`;

export const NavLinkLogin = styled(NavLink)`
  display: flex;
  align-items: center;
  margin-right: 10%;
  color: #1CA731;
  text-decoration: none;
  padding: 8px 16px;
  border: 1px solid #FFFCEC;
  border-radius: 12px;
  cursor: pointer;
  background-color: #FFFCEC;
  font-size: inherit;
  margin-left: auto;
`;
