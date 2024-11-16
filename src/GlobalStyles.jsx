import { createGlobalStyle } from "styled-components";
import back from './assets/backgroungGreen.svg';

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
}`