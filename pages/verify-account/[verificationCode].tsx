import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect } from "react";
import styled from "styled-components";
import {
  API_FALIED,
  API_SUCCEEDED,
  CONTAINER_WIDTH_NARROW,
  FONT_COLOR_LIGHT,
} from "../../constants";
// import { doVerifyUser } from "../../redux/actions/userAction";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  apiVerifyUser,
  initApiVerifyUserState,
  selectApiFetchUserStatus,
  selectApiVerifyUserStatus,
} from "../../redux/slices/api/apiUserSlice";
import { AnimationBlink } from "../../styles/styled-components/Animations";
import { ButtonSecondaryLarge } from "../../styles/styled-components/Buttons";
import { FontSizeNormal } from "../../styles/styled-components/FontSize";
import { ContainerStyle } from "../../styles/styled-components/Layouts";

interface Props {}

const VerifyAccount: React.FC<Props> = ({}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const apiVerifyUserStatus = useAppSelector(selectApiVerifyUserStatus);
  const apiFetchUserStatus = useAppSelector(selectApiFetchUserStatus);

  const renderVerificationResult = (_status: string) => {
    if (_status === API_FALIED) {
      return (
        <MessageWrapper>
          <Message>The verification link has expired.</Message>
          <Message>Please go through the sign-up process again.</Message>
          <Link href="/signup">
            <GoToSignupButton>Sign-up Page</GoToSignupButton>
          </Link>
        </MessageWrapper>
      );
    }

    return <Message blink>Signning up...</Message>;
  };

  useEffect(() => {
    if (router.query && router.query.verificationCode) {
      const { verificationCode } = router.query;
      // doVerifyUser(dispatch, verificationCode.toString());
      dispatch(
        apiVerifyUser({ verificationCode: verificationCode.toString() })
      );
    }
  }, [router.query]);

  useEffect(() => {
    if (apiFetchUserStatus.status === API_SUCCEEDED) {
      dispatch(initApiVerifyUserState());
      router.push("/");
    }
  }, [apiFetchUserStatus.status]);

  return (
    <VerifyAccountWrapper>
      <VerificationContainer width={CONTAINER_WIDTH_NARROW}>
        <BrandIcon src="/img/brand/brandlogo.svg" />
        {renderVerificationResult(apiVerifyUserStatus.status)}
      </VerificationContainer>
    </VerifyAccountWrapper>
  );
};

const BrandIcon = styled.img`
  width: 8rem;
  margin-bottom: 1rem;
`;

const VerifyAccountWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const VerificationContainer = styled.div`
  ${ContainerStyle}
  max-width: 25rem;
  text-align: center;
`;

const MessageWrapper = styled.div``;

const Message = styled.div<{ blink?: boolean }>`
  ${FontSizeNormal};
  /* color: ${FONT_COLOR_LIGHT}; */

  ${(props) =>
    props.blink &&
    `
    ${AnimationBlink}
  `}
`;

const GoToSignupButton = styled.button`
  ${ButtonSecondaryLarge};
  margin-top: 2rem;
  border-radius: 50px;
`;

export default VerifyAccount;
