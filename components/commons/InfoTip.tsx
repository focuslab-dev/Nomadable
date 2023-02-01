import React, { ReactNode, useRef, useState } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { useClickOutsideEffect } from "../../modules/hooks/useClickOutsideEffect";
import * as fs from "../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../styles/styled-components/Interactions";

interface Props {
  children: ReactNode;
  position: string;
  width?: string;
}

export const InfoTip: React.FC<Props> = ({ width, children, position }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const onClickInfoTip = (e: any) => {
    e.stopPropagation();
    setVisible(!visible);
  };

  const closeInfoTip = () => {
    setVisible(false);
  };

  useClickOutsideEffect(wrapperRef, closeInfoTip);

  return (
    <Wrapper ref={wrapperRef}>
      <InfoButton onClick={onClickInfoTip}>
        <InfoIcon src="/icon/info-black.svg" />
      </InfoButton>
      <Window visible={visible} width={width} position={position}>
        {children}
      </Window>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  color: ${cons.FONT_COLOR_SECONDARY};
`;

const InfoButton = styled.div`
  ${ClickableStyle}
  width: 1em;
  height: 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
`;

const InfoIcon = styled.img`
  opacity: 0.5;
  height: 100%;
  width: 100%;
`;

const Window = styled.div<{
  visible: boolean;
  position: string;
  width?: string;
}>`
  position: absolute;
  background-color: white;
  display: none;
  padding: 1rem;
  box-shadow: ${cons.SHADOW_4};
  border-radius: 0.3rem;
  line-height: 1.5em;

  ${(props) => props.position};

  ${(props) =>
    props.visible &&
    `
    display:block;
  `};
  width: ${(props) => props.width || "16rem"};
`;
