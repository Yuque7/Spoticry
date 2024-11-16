import { createGlobalStyle } from "styled-components";
import back from './assets/backgroungGreen.svg';
import albuns from './assets/albuns.svg';
import backnew from './assets/backgroundNew.svg';

export const GlobalStyled = createGlobalStyle`

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
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
}`