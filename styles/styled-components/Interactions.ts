import { css } from "styled-components";

export const ClickableStyle = css`
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
  &:active {
    opacity: 0.8;
  }
  user-select: none;
`;
