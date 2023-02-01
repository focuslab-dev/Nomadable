import React from "react";
import styled from "styled-components";
import {
  FONT_COLOR_LIGHTEST,
  FONT_COLOR_NORMAL,
  FONT_COLOR_SUPER_LIGHT,
} from "../../constants";
import { ClickableStyle } from "../../styles/styled-components/Interactions";
import { FontSizeNormal } from "../../styles/styled-components/FontSize";

interface Props {
  title: string;
  onClickClose: () => void;
}

export const ModalHeader: React.FC<Props> = ({ title, onClickClose }) => {
  return (
    <HeaderSection>
      <Title>{title}</Title>
      <CloseButton onClick={onClickClose}>
        <CloseIcon src="/icon/cross-black.png" />
      </CloseButton>
    </HeaderSection>
  );
};

const HeaderSection = styled.div`
  border-bottom: 1px solid ${FONT_COLOR_SUPER_LIGHT};
  padding: 1.1rem 1.5rem;
`;

const Title = styled.div`
  ${FontSizeNormal};
  font-weight: bold;
  color: ${FONT_COLOR_NORMAL};
  text-align: center;
`;

const CloseButton = styled.div`
  ${ClickableStyle}
  position: absolute;
  top: 0.7rem;
  right: 0.9rem;

  height: 2.2rem;
  width: 2.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  &:hover {
    background-color: ${FONT_COLOR_SUPER_LIGHT};
  }
  /* transition: all 0.2s ease-out; */
`;

const CloseIcon = styled.img`
  width: 0.7rem;
  opacity: 0.6;
`;
