import { css } from "styled-components";

import * as cons from "../../constants";
import { ClickableStyle } from "./Interactions";
import { FontSizeNormal, FontSizeSemiSmall, FontSizeSmall } from "./FontSize";
import { HideScrollBarCss } from "./StyleUtils";
import { forMobile } from "../Responsive";

export const PhotoCardsWrapperStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  position: relative;
`;

export const PhotoCardWrapperStyle = css`
  width: 15.3rem;
  min-height: 20rem;
  border: 1px solid ${cons.FONT_COLOR_LIGHTEST};
  padding: 0.7rem 0.6rem;
  border-radius: 0.3rem;
  box-sizing: border-box;

  @media only screen and (max-width: ${cons.WIDTH_TABLET}px) {
    width: 100%;
    min-height: 18rem;
    /* border: 0; */
    padding: 0.8rem;
  }
`;

export const PhotoImageWrapperStyle = css`
  overflow: hidden;
  width: 100%;
  max-height: 12rem;

  @media only screen and (max-width: ${cons.WIDTH_TABLET}px) {
    max-height: 14rem;
    max-height: 20rem;
  }
`;

export const PhotoImageStyle = `
  object-fit: contain;
  background-color: black;
  width: 100%;
  max-height: 12rem;

  @media only screen and (max-width: ${cons.WIDTH_TABLET}px) {
    max-height: 14rem;
    max-height: 20rem;
  }

`;

export const PhotoCardSpotWrapperStyle = css`
  margin-top: 1em;
  ${ClickableStyle}
  display: inline-flex;
  align-items: flex-start;
  font-size: 1em;
  font-weight: bold;
  color: #555;
  & img {
    opacity: 0.7;
  }
`;

export const PhotoCardSpotIconStyle = css`
  opacity: 0.5;
  width: 0.9em;
  transform: translateY(0.15em);
`;

export const PhotoCardSpotNameStyle = css`
  margin-left: 0.1em;
`;

export const PhotoCardCommentStyle = css`
  margin-top: 0.8em;
  margin-bottom: 0.5em;
  line-height: 1.8em;

  width: 100%;
  min-height: 6em;
  box-sizing: border-box;
  ${HideScrollBarCss};
  ${FontSizeSemiSmall};
  border: none;
  resize: none;
  color: ${cons.FONT_COLOR_NORMAL};

  ${forMobile(`
   font-size: 0.9rem;
   line-height: 2em;
    min-height: 0;
  `)}
`;
