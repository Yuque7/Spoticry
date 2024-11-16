import { FooterContainer, LogoContainer, Column,Logo, SocialIcon} from '../../styles/LandingPage/FooterStyles';
import logo from '../../assets/logoV2.svg';
import { FaYoutube,FaInstagram , } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
      <FooterContainer className="footerback">
        <LogoContainer>
          <Logo src={logo} alt="Logo" />
        </LogoContainer>
        <Column>
          <h3>PRODUCT</h3>
          <ul>
            <li><a href="#">Download</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Use</a></li>
            <li><a href="#">Security</a></li>
            <li><a href="#">Integrations</a></li>
            <li><a href="#">Credits</a></li>
          </ul>
        </Column>
        <Column>
          <h3>RESOURCES</h3>
          <ul>
            <li><a href="#">Release Notes</a></li>
            <li><a href="#">Resource Center</a></li>
            <li><a href="#">Plans</a></li>
            <li><a href="#">FAQ</a></li>
            <li>
            <SocialIcon href="http://" target="_blank" rel="noopener noreferrer">
              <FaYoutube />
            </SocialIcon>
            <SocialIcon href="http://" target="_blank" rel="noopener noreferrer">
              <FaInstagram />
            </SocialIcon>
            <SocialIcon href="http://" target="_blank" rel="noopener noreferrer">
              <FaSquareXTwitter />
            </SocialIcon>
            </li>
          </ul>
        </Column>
      </FooterContainer>
    );
  };
  
  export default Footer;