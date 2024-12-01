import { createGlobalStyle } from "styled-components";
import albuns from "./assets/albuns.svg";
import backnew from './assets/backgroundNew.svg';
import back from './assets/backgroungGreen.svg';

export const GlobalStyled = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=Antonio:wght@100..700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  font-family: "Antonio", sans-serif;
  height: 100%;
  background-image: url(${back});
  background-size: cover;
  background-position: center;
  width: 100%;
}


.section{
  background-image: url(${albuns});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 90vh;
}

.newback{
  background-image: url(${backnew});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 90vh;
}

/* .footerback{
  background-image: url(${back});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 40vh; 
} */
`;
