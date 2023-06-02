declare var google: any;

import { useGoogleLogin } from "@react-oauth/google";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { ClickableStyle } from "../../styles/styled-components/Interactions";
import { ButtonText } from "../../styles/styled-components/Buttons";
import { ButtonSecondaryLarge } from "../../styles/styled-components/Buttons";
import { ButtonSecondaryMedium } from "../../styles/styled-components/Buttons";

interface Props {
  gapiClientId: string;
  label: string;
  loginWithGoogle: (idToken: string) => void;
}

export const GoogleLoginButton: React.FC<Props> = (props) => {
  const loginWitnGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => {
      props.loginWithGoogle(codeResponse.code);
    },
    onError: (error) => {
      console.log(error);
    },
    flow: "auth-code",
    ux_mode: "popup",
  });

  return (
    <LoginButton onClick={loginWitnGoogle}>
      <GLogo src="/icon/g-logo.png" />
      {props.label}
    </LoginButton>
  );
};

const GLogo = styled.img`
  width: 18px;
  margin-right: 8px;
  /* opacity: 0.6; */
`;

export const LoginButton = styled.button`
  ${ClickableStyle}
  ${ButtonSecondaryMedium}
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
