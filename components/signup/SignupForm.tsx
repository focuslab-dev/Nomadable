import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import * as cons from "../../constants";
import {
  PASSWORD_MIN_LENGTH,
  validateEmail,
  validateName,
  validatePassword,
} from "../../modules/StringValidator";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  apiSigninWithGoogle,
  apiSignupWithEmail,
  initApiSignupWithEmailState,
  selectApiSignupWithEmailStatus,
} from "../../redux/slices/api/apiUserSlice";
import { updateVisibleModal } from "../../redux/slices/uiSlice";

import {
  ButtonPrimaryLarge,
  ButtonText,
} from "../../styles/styled-components/Buttons";

import {
  DividerStyle,
  ErrorMsgStyle,
  FooterWrapperStyle,
  FormLabelStyle,
  InfotipStyle,
  InputFormStyle,
  RedSpanStyle,
  SignupErrorStyle,
  TermsAndPrivacyStyle,
} from "../../styles/styled-components/Forms";
import { GoogleLoginButton } from "../commons/GoogleLoginButton";
import { OrLine } from "../commons/OrLine";

interface Props {}

export const SignupForm: React.FC<Props> = ({}) => {
  const router = useRouter();
  const apiSignupStatus = useAppSelector(selectApiSignupWithEmailStatus);
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userName, setUserName] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [userNameError, setUserNameError] = useState("");

  const canSubmit = () => {
    if (validateEmail(email)) return false;
    if (validatePassword(password)) return false;
    if (validateName(userName)) return false;
    return true;
  };

  const onClickSubmit = () => {
    if (canSubmit()) {
      dispatch(apiSignupWithEmail({ email, password, userName }));
    }
  };

  const onChangeEmail = (e: any) => {
    const input = e.target.value;

    setEmail(input);
    if (input === "") return;

    setEmailError(validateEmail(input));
  };

  const onChangePassword = (e: any) => {
    const input = e.target.value;
    setPassword(input);

    if (input === "") return;
    setPasswordError(validatePassword(input));
  };

  const onChangeUserName = (e: any) => {
    const input = e.target.value;
    setUserName(input);

    if (input === "") return;
    setUserNameError(validateName(input));
  };

  const onClickLogin = () => {
    dispatch(updateVisibleModal({ id: cons.MODAL_LOGIN }));
  };

  const loginWithGoogle = (idToken: string) => {
    dispatch(apiSigninWithGoogle({ idToken, refresh: true }));
  };

  /**
   * Effect
   */

  useEffect(() => {
    if (apiSignupStatus.status === cons.API_SUCCEEDED) {
      router.push("/signup-succeeded");
    }
  }, [apiSignupStatus.status]);

  useEffect(() => {
    return () => {
      dispatch(initApiSignupWithEmailState());
    };
  }, []);

  return (
    <FormContainer autoComplete="off">
      <FormSet>
        <FormLabelStyle>
          Email
          {/* <RedSpanStyle>*</RedSpanStyle> */}
        </FormLabelStyle>
        <InputFormStyle
          placeholder="example@mail.com"
          value={email}
          onChange={onChangeEmail}
          error={emailError.length > 0}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <ErrorMsgStyle>{emailError}</ErrorMsgStyle>
      </FormSet>
      <FormSet>
        <FormLabelStyle>
          Password
          {/* <RedSpanStyle>*</RedSpanStyle> */}
        </FormLabelStyle>
        <InfotipStyle>
          {PASSWORD_MIN_LENGTH}+ characters, including number
        </InfotipStyle>
        <InputFormStyle
          type="password"
          placeholder=""
          value={password}
          onChange={onChangePassword}
          error={passwordError.length > 0}
          autoComplete="new-password"
          autoCorrect="off"
          autoCapitalize="off"
        />
        <ErrorMsgStyle>{passwordError}</ErrorMsgStyle>
      </FormSet>
      <FormSet>
        <FormLabelStyle>Name</FormLabelStyle>
        <InputFormStyle
          placeholder="User Name"
          value={userName}
          onChange={onChangeUserName}
          error={userNameError.length > 0}
          autoCorrect="off"
          autoCapitalize="off"
        />
        <ErrorMsgStyle>{userNameError}</ErrorMsgStyle>
      </FormSet>
      {apiSignupStatus.error.length > 0 && (
        <SignupErrorStyle>{apiSignupStatus.error}</SignupErrorStyle>
      )}
      <SignUpButton
        type="button"
        disabled={
          !canSubmit() ||
          apiSignupStatus.status === cons.API_LOADING ||
          apiSignupStatus.status === cons.API_SUCCEEDED
        }
        onClick={onClickSubmit}
      >
        Sign Up
      </SignUpButton>

      <OrLine />

      <GoogleLoginWrapper>
        <GoogleLoginButton loginWithGoogle={loginWithGoogle} />
      </GoogleLoginWrapper>

      <TermsAndPrivacyStyle></TermsAndPrivacyStyle>
      <DividerStyle />
      <FooterWrapperStyle>
        <Link
          href={{
            pathname: router.pathname,
            query: { ...router.query, modal: cons.MODAL_LOGIN },
          }}
          passHref
          shallow
          replace
        >
          <GoToLoginButton onClick={onClickLogin}>Login</GoToLoginButton>
        </Link>
      </FooterWrapperStyle>
    </FormContainer>
  );
};

const FormContainer = styled.form`
  padding: 1.5rem 1.5rem;
  box-sizing: border-box;
`;

const FormSet = styled.div``;

const SignUpButton = styled.button`
  ${ButtonPrimaryLarge}
  width: 100%;
  margin-top: 2rem;
`;

const GoToLoginButton = styled.button`
  ${ButtonText}
`;

const GoogleLoginWrapper = styled.div`
  margin-top: 18px;
`;
