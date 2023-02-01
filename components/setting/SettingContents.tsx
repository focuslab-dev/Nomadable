import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  apiDeleteUser,
  selectApiDeleteUserStatus,
} from "../../redux/slices/api/apiUserSlice";
import { FontSizeNormal } from "../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../styles/styled-components/Interactions";
import { PageLoader } from "../commons/PageLoader";

interface Props {}

export const SettingContents: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const apiDeleteStatus = useAppSelector(selectApiDeleteUserStatus);

  const onClickDeleteAccount = () => {
    const response = window.confirm(
      `Your account data will be deleted permanently. Are you sure you want to proceed?`
    );

    if (response) {
      dispatch(apiDeleteUser({}));
    }
  };

  return (
    <EventContentsWrapper>
      <PageLoader
        visible={apiDeleteStatus.status === cons.API_LOADING}
        message="Deleting..."
      />
      <BodyWrapper>
        <Wrapper>Comming soon...</Wrapper>
      </BodyWrapper>
      <Footer>
        <DeleteAccountButton onClick={onClickDeleteAccount}>
          Delete Account
        </DeleteAccountButton>
      </Footer>
    </EventContentsWrapper>
  );
};

const EventContentsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const BodyWrapper = styled.div`
  position: relative;
`;

const Wrapper = styled.div`
  padding: 2rem;
  color: ${cons.FONT_COLOR_LIGHT};
  font-weight: bold;
`;

const Footer = styled.div`
  margin-top: 1rem;
  border-top: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT};

  text-align: center;
  height: 3.5rem;
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteAccountButton = styled.div`
  ${ClickableStyle};
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: ${cons.COLOR_RED_1};
`;
