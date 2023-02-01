import { css } from "styled-components";

export const DottedBackground = css<{ imageUrl: string }>`
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAG0lEQVQYV2NkYGD4z8DAwMgABXAGNgGwSgwVAFbmAgXQdISfAAAAAElFTkSuQmCC"),
    url(${(props) => props.imageUrl});

  background-repeat: repeat;
  background-blend-mode: overlay;
  background-position: 0px;
  background-size: auto, cover;
  width: 100%;
  height: 100%;
  /* position: absolute; */
  top: 0px;
  left: 0px;
  z-index: 1;
`;
