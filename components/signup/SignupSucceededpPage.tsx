import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { forMobile } from "../../styles/Responsive";
import { DottedBackground } from "../../styles/styled-components/Background";
import {
  FontSizeSemiLarge,
  FontSizeLarge,
} from "../../styles/styled-components/FontSize";
import { ContainerStyle } from "../../styles/styled-components/Layouts";
import { LayoutPlain } from "../commons/LayoutPlain";

interface Props {}

export const SignupSucceededPage: React.FC<Props> = ({}) => {
  return (
    <LayoutPlain>
      <ContentsWrapper imageUrl="/img/img/background3.jpg">
        <MessageModal>
          <MailIcon src="/icon/mail-send-green.svg" />
          <Title>The verification email has been sent.</Title>
          <Subtitle>
            Please click on the link in the email to complete the sign-up
            process.
          </Subtitle>
        </MessageModal>
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
      padding-left: 1rem;
      padding-right: 1rem;
      min-height: 100vh;
  `)}
`;

const MessageModal = styled.div`
  /* color: white; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  max-width: 30rem;
  height: 100%;
  text-align: center;

  background-color: white;
  color: ${cons.FONT_COLOR_NORMAL};
  /* color: ${cons.COLOR_PRIMARY_0}; */
  border-radius: 0.3rem;
  padding: 3rem 6rem 4rem 6rem;
  /* color: ${cons.COLOR_PRIMARY_0}; */

  animation: fadein-up 1s ease-out;
  opacity: 0.95;

  ${forMobile(`
    padding: 2rem 2rem 3rem 2rem;
    `)}
`;

const MailIcon = styled.img`
  width: 8rem;
  margin-bottom: 2rem;
`;

const Title = styled.div`
  ${FontSizeLarge}
  font-weight: bold;
`;

const Subtitle = styled.div`
  ${FontSizeSemiLarge}
  /* font-weight: bold; */
  opacity: 0.9;
  margin-top: 1em;
  color: ${cons.FONT_COLOR_NORMAL};
`;
