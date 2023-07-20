import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  apiDeleteUser,
  selectApiDeleteUserStatus,
} from "../../redux/slices/api/apiUserSlice";
import {
  FontSizeExLarge,
  FontSizeLarge,
  FontSizeNormal,
  FontSizeSemiLarge,
} from "../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../styles/styled-components/Interactions";
import { PageLoader } from "../commons/PageLoader";
import {
  ButtonBlackSmall,
  ButtonBlackSmallest,
} from "../../styles/styled-components/Buttons";
import { callDownloadPlacesAsCsv } from "../../calls/downloadCalls";
import { showSpinner, hideSpinner } from "../../redux/slices/uiSlice";
// import { Description } from "../place/check-in-modal/CheckInModalStyles";

interface Props {}

export const SettingContents: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const apiDeleteStatus = useAppSelector(selectApiDeleteUserStatus);

  const onClickDownloadCsv = async () => {
    dispatch(showSpinner({ message: "Downloading..." }));
    const result = await callDownloadPlacesAsCsv();
    dispatch(hideSpinner());
    if (!result) {
      window.alert("Something went wrong.");
    }
  };

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
        <Wrapper>
          <SectionDiv>
            <Label>Download Place Data</Label>
            <Description>
              You can download all the place data as CSV file.
            </Description>
            <DownloadLink onClick={onClickDownloadCsv}>
              Download (CSV)
            </DownloadLink>
          </SectionDiv>
        </Wrapper>
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

export const DownloadLink = styled.button`
  ${ButtonBlackSmallest};
  margin-top: 1rem;
`;

const SectionDiv = styled.div``;

const Label = styled.div`
  color: ${cons.FONT_COLOR_NORMAL};
  ${FontSizeSemiLarge};
`;

const Description = styled.div`
  font-weight: normal;
  margin-top: 0.6rem;
`;
