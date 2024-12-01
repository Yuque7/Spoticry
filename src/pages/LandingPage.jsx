import FirstSection from "../components/LandingPage/FirstSection";
//import Footer from "../components/LandingPage/Footer";
import Navbar from "../components/LandingPage/Navbar";
//import SecondSection from "../components/LandingPage/SecondSection";
import { GlobalStyled } from "../GlobalStyles";

export default function LandingPage() {
  return (
    <>
      <GlobalStyled />
      <Navbar />
      <FirstSection/>
      {/* <SecondSection/>
      <Footer/> */}
    </>
  );
}
