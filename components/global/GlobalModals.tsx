import React from "react";
import styled from "styled-components";
import { PointEarnedNotification } from "../app-commons/PointEarnedNotification";
import { UserInfoModal } from "../app-commons/UserInfoModal";
import { LoginModalContainer } from "../login/LoginModalContainer";
import { ReviewFormModal } from "../review-form/ReviewFormModal";
import { GlobalSpinner } from "./GlobalSpinner";

interface Props {}

export const GlobalModals: React.FC<Props> = ({}) => {
  return (
    <GlobalModalsWrapper>
      <LoginModalContainer />
      <PointEarnedNotification />
      <UserInfoModal />
      <ReviewFormModal />
      <GlobalSpinner />
    </GlobalModalsWrapper>
  );
};

const GlobalModalsWrapper = styled.div``;
