import React from "react";
import styled from "styled-components";
import {
  AnimationBlink,
  AnimationFadeIn,
  AnimationSlideUp,
} from "../../styles/styled-components/Animations";

import * as cons from "../../constants";
import * as fs from "../../styles/styled-components/FontSize";

import Loader from "./Loader";

interface Props {
  visible: boolean;
  message: string;
}

export const PageLoader: React.FC<Props> = ({ visible, message }) => {
  if (!visible) return null;
  return (
    <PageLoaderWrapper visible={visible}>
      <LoaderWindow>
        <Loader color="#aaa" />
        <Message>{message}</Message>
      </LoaderWindow>
    </PageLoaderWrapper>
  );
};

const PageLoaderWrapper = styled.div<{ visible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  /* background-color: rgba(255, 255, 255, 0.6); */
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 6;
  pointer-events: none;
  ${AnimationFadeIn}
`;

const LoaderWindow = styled.div`
  background-color: white;
  height: 11rem;
  width: 11rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 0.3rem;
  box-shadow: ${cons.SHADOW_3};

  ${AnimationSlideUp}
`;

const Message = styled.div`
  margin-top: 1.5rem;
  font-weight: 400;
  color: ${cons.FONT_COLOR_LIGHT};
  /* ${AnimationBlink}; */
  ${fs.FontSizeNormal}
`;
