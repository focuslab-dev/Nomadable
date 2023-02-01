import React from "react";
import styled from "styled-components";

import {
  CONTAINER_WIDTH_NARROW,
  FONT_COLOR_NORMAL,
  FONT_COLOR_LIGHTEST,
  APP_LONG_DESCRIPTION,
  APP_NAME,
  APP_URL,
} from "../../constants";
import placeWithData from "../../pages/api/place-with-data";
import { forMobile } from "../../styles/Responsive";
import { DottedBackground } from "../../styles/styled-components/Background";
import {
  ButtonPrimaryLarge,
  ButtonText,
} from "../../styles/styled-components/Buttons";
import {
  FontSizeSemiLarge,
  FontSizeNormal,
  FontSizeHeroLarge,
  FontSizeLarge,
  FontSizeExLarge,
} from "../../styles/styled-components/FontSize";
import { ContainerStyle } from "../../styles/styled-components/Layouts";
import HeadSetter from "../commons/HeadSetter";
import { LayoutPlain } from "../commons/LayoutPlain";
import { SignupForm } from "./SignupForm";

interface Props {}

export const SignupPage: React.FC<Props> = ({}) => {
  return (
    <LayoutPlain>
      <ContentsWrapper imageUrl="/img/img/background3.jpg">
        <HeroSection width={CONTAINER_WIDTH_NARROW}>
          <CatchCopy>
            <Title>Join the Nomadable Community</Title>
            <Subtitle>
              Nomadable is powered by digital nomads around the world. Submit
              your favorite places and make your own map.
            </Subtitle>
          </CatchCopy>

          <Contents>
            <Label>Create Your Account</Label>
            <FormBox>
              <SignupForm />
            </FormBox>
          </Contents>
        </HeroSection>

        <Mention>
          Image by{` `}
          <a
            href="https://unsplash.com/@potofgold07?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
            target="_blank"
            rel="noreferrer"
          >
            Raman
          </a>
          {` `}
          <a
            href="https://unsplash.com/ja/@potofgold07?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
            target="_blank"
            rel="noreferrer"
          >
            [Unsplash]
          </a>
        </Mention>
      </ContentsWrapper>
    </LayoutPlain>
  );
};

const ContentsWrapper = styled.div`
  display: flex;
  min-height: calc(100vh - 5rem);
  justify-content: center;
  align-items: center;
  width: 100%;

  ${DottedBackground}

  ${forMobile(`
    padding-bottom: 3rem;
  `)}
`;

const HeroSection = styled.div`
  ${ContainerStyle}
  display: flex;
  justify-content: space-between;

  ${forMobile(`
    margin-top: 3rem;
    flex-direction: column;
    align-items: flex-start;
  `)}
`;

const CatchCopy = styled.div`
  color: white;
  /* max-width: 36rem; */
  margin-right: 5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 5rem;

  ${forMobile(`
    margin-top: 0rem;
    margin-right:0;
  `)}

  text-shadow: 0px 0px 10px rgba(0,0,0,0.5);
`;

const Title = styled.div`
  ${FontSizeHeroLarge}
  font-weight: bold;

  ${forMobile(`
    font-size: 2.8rem;
  `)}
`;

const Subtitle = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  opacity: 1;
  margin-top: 1.5em;
  line-height: 1.5em;

  ${forMobile(`
    font-size: 1rem;
    line-height: 1.4em;
  `)}
`;

const Contents = styled.div`
  ${forMobile(`
  margin-top: 1.5rem;
  width: 100%;
  `)}
`;

const Label = styled.div`
  font-weight: bold;
  color: ${FONT_COLOR_NORMAL};
  ${FontSizeSemiLarge}
  margin-bottom: 1rem;
  color: white;

  text-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

const FormBox = styled.div`
  border: 1px solid ${FONT_COLOR_LIGHTEST};
  border-radius: 0.3rem;
  width: 26rem;
  background-color: rgba(255, 255, 255, 1);

  ${forMobile(`
  width: 100%;
  `)}
`;

const Mention = styled.div`
  position: absolute;
  /* right: 1rem; */
  bottom: 1rem;
  /* margin: auto; */
  right: 2rem;

  color: white;
  & a {
    color: white;
  }
`;
