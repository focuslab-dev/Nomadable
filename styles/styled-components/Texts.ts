import styled, { css } from "styled-components";

import * as cons from "../../constants";
import * as fs from "../../styles/styled-components/FontSize";
import { forMobile } from "../Responsive";

export const Header1 = css`
  font-size: 2rem;
  font-weight: 700;
  color: ${cons.FONT_COLOR_NORMAL};
  line-height: 1.3em;

  margin: 1.5em 0 1.5em 0;

  ${forMobile(`
  margin: 1em 0 1em 0;
`)}
`;

export const Header2 = css`
  font-size: 1.4rem;
  font-weight: 700;
  color: ${cons.FONT_COLOR_NORMAL};
  line-height: 1.3em;

  margin: 2em 0 1em 0;

  ${forMobile(`
    margin: 1.5em 0 1em 0;
  `)}
`;

export const Header3 = css`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${cons.FONT_COLOR_NORMAL};
  line-height: 1.3em;
`;

export const Header4 = css`
  font-size: 1rem;
  font-weight: 700;
  color: ${cons.FONT_COLOR_NORMAL};
  line-height: 1.3em;
`;

export const HeaderSmall = css`
  ${fs.FontSizeSemiLarge};
  font-weight: 700;
  color: ${cons.FONT_COLOR_NORMAL};
  margin-top: 1em;
  margin-bottom: 1em;
`;

export const Paragraph = css`
  ${fs.FontSizeNormal}
  line-height: 1.4em;
  font-weight: 400;
  color: ${cons.FONT_COLOR_NORMAL};
  margin-bottom: 1em;
  /* color: ${cons.FONT_COLOR_LIGHT}; */
`;

export const ParagraphLarge = css`
  ${Paragraph}
  ${fs.FontSizeSemiLarge}
`;

export const Bold = styled.span<{ color?: string }>`
  font-weight: bold;
  color: ${(props) => props.color};
`;
