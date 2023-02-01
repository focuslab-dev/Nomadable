import { BG_COLOR } from "./../constants";
import { createGlobalStyle } from "styled-components";
import { KeyFrames } from "./styled-components/Animations";

const GlobalStyles = createGlobalStyle`
  ${KeyFrames}

    html {
        font-size: 16px;
    }

  body {
    margin: 0;

    font-weight: 300;
    -webkit-tap-highlight-color: transparent;
    -webkit-font-smoothing: antialiased;
    position: relative;
    overflow-x: hidden;

    background-color: ${BG_COLOR};
    font-family:    -apple-system, BlinkMacSystemFont, Helvetica Neue, Segoe UI,
    Hiragino Kaku Gothic ProN, Hiragino Sans, ヒラギノ角ゴ ProN W3, Arial,
    メイリオ, Meiryo, sans-serif;
  }

  a {
    color: #e87474;
    text-decoration: none;
  }

  p,
  li {
    line-height: 1.6em;
    color: #444;
  }

  h1,
  h2,
  h3,
  h4,
  p {
    margin: 0;
    /* font-size: 18px; */
    font-weight: 400;
  }

  button,
  input,
  textarea {
    font-family:    -apple-system, BlinkMacSystemFont, Helvetica Neue, Segoe UI,
    Hiragino Kaku Gothic ProN, Hiragino Sans, ヒラギノ角ゴ ProN W3, Arial,
    メイリオ, Meiryo, sans-serif;
  }

  input:focus,
  button:focus,
  textarea:focus,
  select:focus {
    outline: none;
  }
`;

export default GlobalStyles;
