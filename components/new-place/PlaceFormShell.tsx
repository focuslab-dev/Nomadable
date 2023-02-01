import React, { ReactNode } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { forMobile } from "../../styles/Responsive";
import { AnimationSlideLeft } from "../../styles/styled-components/Animations";
import {
  ButtonBlackLarge,
  ButtonBlackSmall,
} from "../../styles/styled-components/Buttons";
import * as fs from "../../styles/styled-components/FontSize";

interface Props {
  children: ReactNode;
  pageIndex: number;
  pageLabel: string;
  buttonText: string;
  buttonDisabled: boolean;
  onClickSubmit: () => void;
}

export const PlaceFormShell: React.FC<Props> = ({
  children,
  pageIndex,
  pageLabel,
  buttonText,
  buttonDisabled,
  onClickSubmit,
}) => {
  return (
    <NewPlaceWrapper>
      <NewPlaceContainer>
        <Title>Add New Place</Title>
        <PageIndicator>
          <IndicatorItem active={pageIndex >= 0} />
          <IndicatorItem active={pageIndex >= 1} />
        </PageIndicator>
        <PageLabel>{pageLabel}</PageLabel>
        <FormCard>
          {children}
          <Buttons>
            <NextButton onClick={onClickSubmit} disabled={buttonDisabled}>
              {buttonText}
            </NextButton>
          </Buttons>
        </FormCard>
      </NewPlaceContainer>
    </NewPlaceWrapper>
  );
};

const NewPlaceWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 5rem;
`;

const NewPlaceContainer = styled.div`
  width: 36rem;
`;

const Title = styled.div`
  ${fs.FontSizeLarge}
  text-align:center;
  font-weight: bold;
  color: ${cons.FONT_COLOR_NORMAL};
  margin-top: 3rem;

  ${forMobile(`
    margin-top: 2rem;
    ${fs.FontSizeSemiLarge}
  `)}
`;

const PageIndicator = styled.div`
  display: flex;
  margin-top: 1.5rem;
  justify-content: center;
`;

const IndicatorItem = styled.div<{ active: boolean }>`
  height: 0.35rem;
  width: 2.2rem;
  margin: 0 0.4rem;

  background-color: white;

  ${(props) =>
    props.active &&
    `
        background-color: ${cons.FONT_COLOR_NORMAL};
    `};
`;

const PageLabel = styled.div`
  margin-top: 4rem;
  font-weight: bold;
  ${fs.FontSizeSemiLarge}
  color: ${cons.FONT_COLOR_LIGHT};
  color: ${cons.FONT_COLOR_NORMAL};

  ${forMobile(`
    margin-top: 2.7rem;
  `)}
`;

const FormCard = styled.div`
  position: relative;
  ${AnimationSlideLeft}
  margin-top: 1.5rem;
  background-color: white;
  box-shadow: ${cons.SHADOW_0};
  width: 100%;
  border-radius: 0.3rem;
  padding: 2rem 1.5rem 0rem 1.5rem;
  box-sizing: border-box;
`;

const Buttons = styled.div`
  margin-top: 2rem;
  border-top: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT};
  display: flex;
  justify-content: flex-end;
  padding: 1.5rem 0;
`;

const NextButton = styled.button`
  ${ButtonBlackSmall}
`;
