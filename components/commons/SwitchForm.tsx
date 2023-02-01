import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { ClickableStyle } from "../../styles/styled-components/Interactions";

interface Props {
  onClick: () => void;
  active: boolean;
  activeText?: string;
  inactiveText?: string;
}

export const SwitchForm: React.FC<Props> = ({
  onClick,
  active,
  activeText,
  inactiveText,
}) => {
  return (
    <SwitchFormWrapper onClick={onClick}>
      <SwitchWindow active={active}>
        <SwitchCircle active={active} />
      </SwitchWindow>
      <Text active={active}>{active ? activeText : inactiveText}</Text>
    </SwitchFormWrapper>
  );
};

const SwitchFormWrapper = styled.div`
  ${ClickableStyle}
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
`;

const SwitchWindow = styled.div<{ active: boolean }>`
  height: 2.3rem;
  width: 4rem;
  border-radius: 50rem;
  background-color: ${cons.FONT_COLOR_LIGHTEST};
  position: relative;

  transition: 0.3s all cubic-bezier(0, 0.93, 0.59, 0.87);
  ${(props) =>
    props.active &&
    `
    background-color: ${cons.COLOR_PRIMARY_2};
  `};
`;

const SwitchCircle = styled.div<{ active: boolean }>`
  position: absolute;
  height: 1.78rem;
  width: 1.78rem;
  background-color: white;
  border-radius: 100%;
  left: 0.4rem;
  top: 0.25rem;
  transition: 0.3s all cubic-bezier(0, 0.93, 0.59, 0.87);

  ${(props) =>
    props.active &&
    `
    left: calc(100% - 2.1rem);
  `};
`;

const Text = styled.div<{ active: boolean }>`
  font-weight: 500;
  margin-left: 1rem;
  color: ${cons.FONT_COLOR_LIGHT};

  ${(props) =>
    props.active &&
    `
    color: ${cons.COLOR_PRIMARY_1};
  `};
`;
