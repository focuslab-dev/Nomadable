import { useGoogleLogin } from "@react-oauth/google";
import React from "react";
import styled from "styled-components";
import { ClickableStyle } from "../../styles/styled-components/Interactions";
import { ButtonSecondaryMedium } from "../../styles/styled-components/Buttons";

interface Props {
  gapiClientId: string;
  label: string;
  loginWithGoogle: (idToken: string) => void;
}

export const GoogleLoginButton: React.FC<Props> = (props) => {
  const loginWithGoogle = useGoogleLogin({
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
    <LoginButton onClick={loginWithGoogle}>
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

export const LoginButton = styled.div`
  box-sizing: border-box;
  ${ClickableStyle}
  ${ButtonSecondaryMedium}
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
