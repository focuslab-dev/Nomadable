import { forMobile } from "./../Responsive";
import { css } from "styled-components";

export const FontSizeHeroLarge = css`
  font-size: 4rem;
`;

export const FontSizeHeaderLarge = css`
  font-size: 2.2rem;
`;

export const FontSizeExLarge = css`
  font-size: 1.9rem;
`;

export const FontSizeLarge = css`
  font-size: 1.4rem;
`;

export const FontSizeSemiLarge = css`
  font-size: 1.2rem;

  ${forMobile(`
    font-size: 1.1rem;
  `)}
`;

export const FontSizeNormal = css`
  font-size: 1rem;
`;

export const FontSizeSemiSmall = css`
  font-size: 0.9rem;
`;

export const FontSizeSmall = css`
  font-size: 0.83rem;
`;

export const DEFAULT_LINE_HEIGHT = "1.6em";
