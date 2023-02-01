import React, { useEffect } from "react";
import styled from "styled-components";
import { CONTAINER_WIDTH_NARROW, FONT_COLOR_LIGHT } from "../../constants";
import { AnimationBlink } from "../../styles/styled-components/Animations";
import { FontSizeNormal } from "../../styles/styled-components/FontSize";
import { ContainerStyle } from "../../styles/styled-components/Layouts";

interface Props {
  message: string;
  visible: boolean;
}

export const SplashPage: React.FC<Props> = ({ message, visible }) => {
  useEffect(() => {
    if (typeof document !== undefined) {
      if (visible) {
        document.body.setAttribute("style", "overflow: hidden;");
      } else {
        document.body.setAttribute("style", "overflow: auto;");
      }
    }
  }, [visible]);

  return (
    <SplashPageWrapper visible={visible}>
      <SplashContainer width={CONTAINER_WIDTH_NARROW}>
        <BrandIcon src="/img/brand/brandlogo.svg" />
        <Message blink>{message}</Message>
      </SplashContainer>
    </SplashPageWrapper>
  );
};

const BrandIcon = styled.img`
  width: 8rem;
  margin-bottom: 1rem;
`;

const SplashPageWrapper = styled.div<{ visible: boolean }>`
  background-color: white;
  /* pointer-events: none; */
  z-index: 1000;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;

  transition: all 0.2s ease-in-out;

  opacity: 0;
  pointer-events: none;

  display: flex;
  ${(props) =>
    props.visible &&
    `
    opacity: 1;
    pointer-events: auto;
  `};
`;

const SplashContainer = styled.div`
  ${ContainerStyle}
  max-width: 25rem;
  text-align: center;
`;

const Message = styled.div<{ blink?: boolean }>`
  ${FontSizeNormal};

  ${(props) =>
    props.blink &&
    `
    ${AnimationBlink}
  `}
`;
