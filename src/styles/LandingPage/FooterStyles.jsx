import styled from 'styled-components';

export const FooterContainer = styled.footer`
  padding: 40px 6%;
  display: flex;
  gap: 40px;
`;

export const LogoContainer = styled.div`
  align-items: center;
`;

export const Logo = styled.img`
  width: 30px;
  margin-right: 10px;
`;

export const SocialIcon = styled.a`
font-size: 20px;
color: #FFFCEC; 
margin-right: 10px;
&:hover {
  color: #ccc; 
}
`;

export const Column = styled.div`
  min-width: 10px;

  h3 {
    margin-bottom: 20px;
    font-size: 18px;
    font-weight: bold;
    color: #FFFCEC;
  }

  ul {
    list-style-type: none;
  }

  li {
    margin-bottom: 10px;
    font-size: 14px;

    a {
      text-decoration: none;
      color: #FFFCEC;
      &:hover {
        color: #ccc;
      }
    }
  }
`;
