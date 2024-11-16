import { FirstContainer,FirstContent,FirstTitle,TextPrincipal,ImagePhone } from '../../styles/LandingPage/FirstSectionStyles';
import phone from '../../assets/phone.svg'

const FirstSection = () => {
    return (
      <FirstContainer>
        <FirstContent>
          <FirstTitle>It’s play time.</FirstTitle>
          <TextPrincipal>
            Say hello to the most entertaining Spoticry ever.
            <br />
            Play free or subscribe to Spoticry Premium.
          </TextPrincipal>
          <ImagePhone>
          <img src={phone} alt="Phone" />
        </ImagePhone>
        </FirstContent>
      </FirstContainer>
    );
  };
  
  export default FirstSection;