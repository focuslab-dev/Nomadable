import { FontSizeNormal, FontSizeSemiSmall, FontSizeSmall } from "./FontSize";
import * as cons from "./../../constants";
import { css } from "styled-components";
import { ClickableStyle } from "./Interactions";

/**
 * Basic Style
 */

const ButtonBase = css`
  ${ClickableStyle}
  font-weight: 700;
  border: none;
`;

/**
 * Size Definition
 */

const SizeLarge = css`
  /* ${FontSizeNormal}
  border-radius: 0.2rem;
  padding: 1.2rem 2rem; */

  border-radius: 0.2rem;
  height: 3.4rem;
  padding: 0 2.8rem;
  font-size: 1rem;
`;

const SizeMedium = css`
  ${FontSizeSemiSmall}
  height: 3.2rem;
  border-radius: 0.2rem;
  padding: 0 1.2rem;
  min-width: 7.5rem;
`;

const SizeSmall = css`
  ${FontSizeSemiSmall}
  height: 2.9rem;
  border-radius: 0.2rem;
  padding: 0 1.2rem;
  min-width: 7.5rem;
`;

const SizeSmallest = css`
  border-radius: 0.3rem;
  min-width: 5rem;
  font-size: 0.9rem;
  ${FontSizeSmall}
  height: 2.3rem;
  padding: 0rem 1rem;
`;

/**
 * Color Definition
 */

const ColorPrimary = css<{ disabled?: boolean }>`
  background-color: ${cons.COLOR_PRIMARY_1};
  color: white;
  ${(props) =>
    props.disabled &&
    `
    cursor: not-allowed;
    pointer-events: none !important;
    background-color: ${cons.FONT_COLOR_LIGHTEST};
    color: ${cons.FONT_COLOR_NORMAL};
    opacity: 0.7;
  `}
`;

const ColorBlack = css<{ disabled?: boolean }>`
  background-color: #333;
  color: white;
  ${(props) =>
    props.disabled &&
    `
    cursor: not-allowed;
    pointer-events: none !important;
    background-color: ${cons.FONT_COLOR_LIGHTEST};
    color: ${cons.FONT_COLOR_SECONDARY};
    opacity: 0.7;
  `}
`;

const ColorGray = css<{ disabled?: boolean }>`
  background-color: ${cons.FONT_COLOR_LIGHTEST};
  color: ${cons.FONT_COLOR_LIGHT};
  ${(props) =>
    props.disabled &&
    `
    cursor: not-allowed;
    pointer-events: none !important;
    opacity: 0.7;
  `}
`;

const ColorWhite = css<{ disabled?: boolean }>`
  background-color: ${cons.FONT_COLOR_NORMAL};
  background-color: white;
  color: ${cons.FONT_COLOR_NORMAL};
  /* color: white; */
  border: 1px solid ${cons.FONT_COLOR_LIGHTEST};

  ${(props) =>
    props.disabled &&
    `
    cursor: not-allowed;
    pointer-events: none !important;
    opacity: 0.7;
  `};
`;

const ColorRed = css<{ disabled?: boolean }>`
  background-color: ${cons.COLOR_RED_0};
  color: white;
  ${(props) =>
    props.disabled &&
    `
    cursor: not-allowed;
    pointer-events: none !important;
    background-color: ${cons.FONT_COLOR_LIGHTEST};
    color: ${cons.FONT_COLOR_NORMAL};
    opacity: 0.7;
  `}
`;

/**
 * Export Buttons
 */

export const ButtonPrimaryLarge = css`
  ${ButtonBase}
  ${SizeLarge}
  ${ColorPrimary}
`;

export const ButtonSecondaryLarge = css`
  ${ButtonBase}
  ${SizeLarge}
  ${ColorWhite}
`;

export const ButtonSecondaryMedium = css`
  ${ButtonBase}
  ${SizeMedium}
  ${ColorWhite}
`;

export const ButtonPrimaryMedium = css`
  ${ButtonBase}
  ${SizeMedium}
  ${ColorPrimary}
`;

export const ButtonPrimarySmall = css`
  ${ButtonBase}
  ${SizeSmall}
  ${ColorPrimary}
`;

export const ButtonPrimarySmallest = css`
  ${ButtonBase}
  ${SizeSmallest}
  ${ColorPrimary}
`;

export const ButtonBlackSmall = css`
  ${ButtonBase}
  ${SizeSmall}
  ${ColorBlack}
`;

export const ButtonBlackSmallest = css`
  ${ButtonBase}
  ${SizeSmallest}
  ${ColorBlack}
`;

export const ButtonBlackLarge = css`
  ${ButtonBase}
  ${SizeLarge}
  ${ColorBlack}
`;

export const ButtonSecondarySmall = css`
  ${ButtonBase}
  ${SizeSmall}
  ${ColorWhite}
`;

export const ButtonSecondarySmallest = css`
  ${ButtonBase}
  ${SizeSmallest}
  ${ColorWhite}
`;

export const ButtonGraySmall = css`
  ${ButtonBase}
  ${SizeSmall}
  ${ColorGray}
`;

export const ButtonRedLarge = css`
  ${ButtonBase}
  ${SizeLarge}
  ${ColorRed}
`;

export const ButtonRedMedium = css`
  ${ButtonBase}
  ${SizeMedium}
  ${ColorRed}
`;

export const ButtonText = css`
  ${ClickableStyle}
  background: none;
  color: ${cons.FONT_COLOR_LIGHT};
  font-weight: bold;
  ${FontSizeSemiSmall};
  border: none;
`;
