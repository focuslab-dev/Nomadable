import { forMobile } from "./../Responsive";
import { css } from "styled-components";

import { HideScrollBarCss } from "./StyleUtils";
import * as cons from "../../constants";

export const ModalOverlayCss = css<{
  visible: boolean;
  alignTop?: boolean;
  coverAllMobile?: boolean;
}>`
  background-color: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 3;
  pointer-events: auto;

  display: flex;
  justify-content: center;
  align-items: center;

  opacity: 0;
  pointer-events: none;
  /* transition: 0.2s all ease-out; */
  transition: 0.4s all cubic-bezier(0, 0.93, 0.59, 0.87);

  ${(props) =>
    props.visible &&
    `
    opacity: 1;
    pointer-events: auto;
	`}

  overflow: scroll;
  overflow-x: hidden;
  box-sizing: border-box;

  ${HideScrollBarCss}

  ${(props) =>
    props.alignTop &&
    `
    align-items: flex-start;
  `};

  ${(props) =>
    props.coverAllMobile &&
    `
    align-items: flex-start;
  `};

  ${forMobile(`
    align-items: flex-start;
    padding: 0 0.5rem 3rem 0.5rem;
  `)}
`;

export const ModalWindowCss = css<{
  visible: boolean;
  width: string;
  alignTop?: boolean;
  coverAllMobile?: boolean;
}>`
  z-index: 100000000000000000000000000;
  position: relative;
  overflow: hidden;

  opacity: 0;
  pointer-events: none;
  transform: translateY(1rem);
  transition: 0.4s all cubic-bezier(0, 0.93, 0.59, 0.87);

  ${(props) =>
    props.visible &&
    `
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0rem);
      `}

  background-color: white;
  border-radius: 0.5rem;
  max-width: 100%;
  box-shadow: ${cons.SHADOW_3};
  width: ${(props) => props.width};

  ${(props) =>
    props.alignTop &&
    `
      margin-top: 5rem;
      margin-bottom: 5rem;
    `};

  ${(props) =>
    props.coverAllMobile &&
    `
      @media only screen and (max-width: ${cons.WIDTH_TABLET}px) {
        border-radius: 0;
        min-height: 100%;
      }
    `};

  ${forMobile(`
      margin-top: 2rem;
      margin-bottom: 2rem;
  `)}
`;
