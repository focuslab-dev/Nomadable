import { css } from "styled-components";
import { FONT_COLOR_LIGHTEST, FONT_COLOR_SUPER_LIGHT } from "../../constants";

export const CardBoaderCss = css`
  border: 1px solid rgb(0 0 0 / 11%);
`;

export const CardShadowCss = css`
  border: 1px solid ${FONT_COLOR_SUPER_LIGHT};
  box-shadow: rgb(224 224 224) 0px 2px 3px;
`;
