import { css } from "styled-components";
import { COLOR_RED_0, SHADOW_1 } from "../../constants";

export const NotificationMarkCss = css<{ visible: boolean }>`
  display: none;
  position: absolute;
  top: 0.2rem;
  right: 0.2rem;
  height: 0.8rem;
  width: 0.8rem;
  border-radius: 50rem;
  background-color: ${COLOR_RED_0};
  /* box-shadow: ${SHADOW_1}; */
  z-index: 1;
  border: 2px solid white;

  ${(props) =>
    props.visible &&
    `
    display: block;
  `};
`;
