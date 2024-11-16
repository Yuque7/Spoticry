import {
    NavbarContainer,
    Logo,
    NavLink,
    NavLinks,
    NavLinkLogin,
  } from '../../styles/LandingPage/NavbarStyles';
  import { BsPersonCircle } from "react-icons/bs";
  import logo from '../../assets/logo.svg';
  
  const Navbar = () => {
    return (
      <NavbarContainer>
        <Logo src={logo} alt="logo" />
        <NavLinks>
          <NavLink to="/">Upgrade</NavLink>
          <NavLink to="/">Help</NavLink>
          <NavLink to="/">Mobile</NavLink>
          <NavLink to="/">Plans</NavLink>
        </NavLinks>
        <NavLinkLogin to="/">
          <BsPersonCircle /> Login
        </NavLinkLogin>
      </NavbarContainer>
    );
  };
  
  export default Navbar;
  