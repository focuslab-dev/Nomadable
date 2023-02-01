import { SHADOW_3, SHADOW_4 } from "./../../constants";
import { css } from "styled-components";
import * as cons from "../../constants";
import * as fs from "../../styles/styled-components/FontSize";
import { FontSizeSemiSmall } from "./FontSize";
import { NoSelect } from "./StyleUtils";

export const DropdownWindowStyle = css<{
  visible: boolean;
  width: string;
  alignLeft?: boolean;
}>`
  position: absolute;
  display: none;
  transform: translateY(1rem);

  width: ${(props) => props.width};
  box-shadow: ${SHADOW_4};
  background-color: white;
  padding: 0.7em 0em;
  border-radius: 0.5rem;
  ${FontSizeSemiSmall}

  ${(props) =>
    !props.alignLeft &&
    `
     right:0;
  `}
  ${(props) =>
    props.visible &&
    `
        display: block;
    `};
`;

export const DropDownItemStyle = css`
  padding: 0.8em 1.5em;
  cursor: pointer;
  color: ${cons.FONT_COLOR_NORMAL};
  -webkit-font-smoothing: antialiased;
  ${fs.FontSizeNormal}
  font-weight: 500;
  line-height: 1.4em;
  /* display: flex;
  align-items: center; */

  &:hover {
    background-color: ${cons.FONT_COLOR_SUPER_LIGHT};
  }

  ${NoSelect}
`;

export const DropDownIconStyle = css`
  width: 0.8rem;
  margin-right: 0.6rem;
  opacity: 0.8;
`;
