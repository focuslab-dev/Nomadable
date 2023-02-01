import React, { Fragment } from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import * as fs from "../../../styles/styled-components/FontSize";
import {
  ButtonPrimaryLarge,
  ButtonPrimaryMedium,
} from "../../../styles/styled-components/Buttons";
import { NetSpeedIndicator } from "../../commons/NetSpeedIndicator";
import { SectionLoader } from "../../commons/SectionLoader";
import { forMobile } from "../../../styles/Responsive";
import { PlaceUserData } from "../../../redux/slices/placeSlice";

interface Props {
  speedUp: number;
  speedDown: number;
  testCnt: number;
  onClickSpeedTest: () => void;
  loading: boolean;
  checkedInByUser: boolean;
  checkInUsers: PlaceUserData[];
}

export const InternetSpeed: React.FC<Props> = ({
  speedUp,
  speedDown,
  testCnt,
  onClickSpeedTest,
  loading,
  checkedInByUser,
  checkInUsers,
}) => {
  return (
    <InternetSpeedWrapper>
      <SectionLoader visible={loading} />
      <SpeedSection>
        <Download>
          <Label>Download</Label>
          <SpeedResultWrapper>
            <NetSpeedIndicator speed={speedDown} />
          </SpeedResultWrapper>
        </Download>
        <Upload>
          <Label>Upload</Label>{" "}
          <SpeedResultWrapper>
            <NetSpeedIndicator speed={speedUp} />{" "}
          </SpeedResultWrapper>
        </Upload>
      </SpeedSection>
      <Devider />
      <TestSection>
        <TestButtonWrapper>
          <CheckInInfo>
            <CheckInNumber>{testCnt}</CheckInNumber> checked in{" "}
            <UserPics>
              {checkInUsers.map((user, index) => (
                <UserPicWrapper key={user.userId} zIndex={0 - index}>
                  <UserPic src={user.userPicture} />
                </UserPicWrapper>
              ))}
            </UserPics>
          </CheckInInfo>

          <CheckInButton onClick={onClickSpeedTest} disabled={checkedInByUser}>
            {checkedInByUser ? (
              <Fragment>
                <ButtonText>Check-In Completed</ButtonText>
                <ButtonSubtext>(disabeld for 6 hours)</ButtonSubtext>
              </Fragment>
            ) : (
              <Fragment>
                <ButtonText>Check In & Test WiFi</ButtonText>
                <ButtonSubtext>
                  (earn {cons.getPointPlan(cons.POINT_TYPE_CHECK_IN)}pt)
                </ButtonSubtext>
              </Fragment>
            )}
          </CheckInButton>
        </TestButtonWrapper>
      </TestSection>
    </InternetSpeedWrapper>
  );
};

const InternetSpeedWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  ${forMobile(`
    flex-direction: column;
    align-items: flex-start;
 `)}
`;

const SpeedSection = styled.div`
  flex-grow: 1;
  display: flex;
  ${forMobile(`
    justify-content: flex-start;
    width: 100%;
 `)}
`;

const TestSection = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TestButtonWrapper = styled.div`
  ${forMobile(`
  margin-top: 2rem;
 `)}
`;

const Download = styled.div`
  flex-grow: 1;
  ${forMobile(`
  flex-grow: 0;
 `)}
`;

const Upload = styled.div`
  flex-grow: 1;
  ${forMobile(`
  flex-grow: 0;
  margin-left: 2rem;
 `)}
`;

const Label = styled.div`
  color: ${cons.FONT_COLOR_LIGHT};
  ${fs.FontSizeSemiSmall}
  font-weight: 400;
  margin-bottom: 0.7rem;
`;

const SpeedResultWrapper = styled.div`
  ${fs.FontSizeLarge}
`;

const Devider = styled.div`
  height: 4rem;
  width: 1px;
  background-color: ${cons.FONT_COLOR_SUPER_LIGHT};

  ${forMobile(`
  display:none;
 `)}
`;

const CheckInInfo = styled.div`
  font-weight: 500;
  ${fs.FontSizeSemiSmall};
  color: ${cons.FONT_COLOR_LIGHT};
  display: flex;
  align-items: center;
`;

const CheckInNumber = styled.span`
  color: ${cons.FONT_COLOR_NORMAL};
  font-weight: 700;
  ${fs.FontSizeNormal}
  margin-right: 0.3rem;
`;

const UserPics = styled.div`
  margin-left: 0.5rem;
  display: flex;
`;

const UserPicWrapper = styled.div<{ zIndex: number }>`
  width: 1.6rem;
  z-index: ${(props) => props.zIndex};
`;

const UserPic = styled.img`
  border: 0.1rem solid white;
  width: 1.9rem;
  height: 1.9rem;
  object-fit: cover;
  border-radius: 50%;
`;

const CheckInButton = styled.button`
  ${ButtonPrimaryMedium};
  margin-top: 0.6rem;
  height: 5rem;
  padding-left: 2rem;
  padding-right: 2rem;

  ${(props) =>
    props.disabled &&
    `
    background-color: #bee7e4;
    color: #044742;
    border: 1px solid #22b8ad;
  `};
`;

const ButtonText = styled.div``;

const ButtonSubtext = styled.div`
  ${fs.FontSizeSemiSmall}
  font-weight: 500;
  margin-top: 0.2rem;
  opacity: 0.9;
`;
