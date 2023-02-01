import React, { Fragment } from "react";
import styled from "styled-components";
import HeadSetter from "../../components/commons/HeadSetter";
import { SignupPage } from "../../components/signup/SignupPage";
import { APP_NAME, APP_LONG_DESCRIPTION, APP_URL } from "../../constants";

interface Props {}

const SignupContainer: React.FC<Props> = ({}) => {
  return (
    <Fragment>
      <HeadSetter
        pageTitle={`Sign Up Page | ${APP_NAME}`}
        pageDescription={APP_LONG_DESCRIPTION}
        pagePath={`${APP_URL}/signup`}
      />
      <SignupPage />
    </Fragment>
  );
};

const Wrapper = styled.div``;

export default SignupContainer;
