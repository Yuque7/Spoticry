import platforms from '../../assets/platforms.svg';
import {
  SecondContainer,
  SecondContent,
  ImagePlatform,
  SectionText,
} from '../../styles/LandingPage/SecondSectionStyles';

const SecondSection = () => {
  return (
    <>
      <SecondContainer className="newback">
        <SecondContent>
          <h1>
            Listen now on <br />
            multiple platforms
          </h1>
        </SecondContent>
        <ImagePlatform src={platforms} alt="Imagem do app do Spoticry funcionando tanto no celular como no computador." />
      </SecondContainer>

      <SectionText className="section">
        <h1>
          More than 1 million registered artists.
          <br/>
          Listen to all music styles in one place
        </h1>
      </SectionText>
    </>
  );
};

export default SecondSection;
