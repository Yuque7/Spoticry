import styled from 'styled-components'
import { FaUserCircle } from "react-icons/fa";
// Styled Components
export const NavBarContainer = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  margin-top: 2%;
`;

export const Logo = styled.img`
  width: 120px;
`;


export const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ProfileIcon = styled(FaUserCircle)`
  font-size: 1.8rem;
  color: #fffcec;
  cursor: pointer;

  &:hover {
    color: #c1beaf;
  }
`;

export const LogoutButton = styled.button`
  background-color: #ff4d4f;
  color: #fff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e04143;
  }
`;
