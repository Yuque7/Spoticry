
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logocompleta.svg";
import { NavBarContainer,Logo,UserActions,ProfileIcon,LogoutButton } from "../../styles/Paginaprincipal/NavbarStyles";

const Navbar = () => {
  const navigate = useNavigate();


  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove o token do localStorage
    navigate("/"); // Redireciona para a página de login
  };

  const handleProfileClick = () => {
    navigate("/userPage"); // Redireciona para a página de usuário
  };

  const handleHomePage = () => {
    navigate("/homePage"); // Redireciona para a página home
  };

  
  return (
    <NavBarContainer>
      <Logo src={logo} alt=""  onClick={handleHomePage}/>
      <UserActions>
        <ProfileIcon onClick={handleProfileClick} />
        <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
      </UserActions>
    </NavBarContainer>
  );
};

export default Navbar;