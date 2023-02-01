import React from "react";
import styled from "styled-components";

import Loader from "./Loader";

interface Props {
  visible: boolean;
  color?: string;
  bgColor?: string;
}

export const SectionLoader: React.FC<Props> = ({ visible, color, bgColor }) => {
  return (
    <PageLoaderWrapper visible={visible} bgColor={bgColor}>
      <Loader color={color || "#aaa"} />
    </PageLoaderWrapper>
  );
};

const PageLoaderWrapper = styled.div<{ visible: boolean; bgColor?: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: none;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.bgColor || "rgba(255, 255, 255, 0.6)"};
  z-index: 1;

  ${(props) =>
    props.visible &&
    `
        pointer-event: none;
        display:flex;
    `};
`;
