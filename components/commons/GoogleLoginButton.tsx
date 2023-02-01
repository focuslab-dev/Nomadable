declare var google: any;

import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { GAPI_CLIENT_ID } from "../../constants";

interface Props {
  loginWithGoogle: (idToken: string) => void;
}

export const GoogleLoginButton: React.FC<Props> = (props) => {
  const buttonRef = useRef(null);
  const buttonWrapperRef = useRef<HTMLDivElement | null>(null);

  const handleGoogleLogin = (response: any) => {
    if (response.credential) {
      props.loginWithGoogle(response.credential);
    }
  };

  const prepareGoogleButton = () => {
    try {
      google.accounts.id.initialize({
        client_id: GAPI_CLIENT_ID,
        callback: handleGoogleLogin,
      });

      google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
        width: buttonWrapperRef.current
          ? buttonWrapperRef.current.offsetWidth
          : 0,
        height: buttonWrapperRef.current
          ? buttonWrapperRef.current.offsetHeight
          : 0,
      });
    } catch (err) {
      setTimeout(() => {
        prepareGoogleButton();
      }, 1000);
    }
  };

  useEffect(() => {
    prepareGoogleButton();
  });

  return (
    <LoginButtonWrapper ref={buttonWrapperRef}>
      <LoginButton ref={buttonRef} />
    </LoginButtonWrapper>
  );
};

export const LoginButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const LoginButton = styled.div``;
