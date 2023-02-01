import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import * as fs from "../../../styles/styled-components/FontSize";
import {
  ButtonPrimarySmall,
  ButtonText,
} from "../../../styles/styled-components/Buttons";
import { NetSpeedIndicator } from "../../commons/NetSpeedIndicator";
import { Title, Description, Footer } from "./CheckInModalStyles";
import {
  AnimationBlink,
  AnimationSlideLeft,
} from "../../../styles/styled-components/Animations";
import { doNetSpeedTest } from "../../../modules/SpeedOfMe";
import { ClickableStyle } from "../../../styles/styled-components/Interactions";
import { InfoTip } from "../../commons/InfoTip";

interface Props {
  modalVisible: boolean;
  onFinishTest: (speedDown: number, speedUp: number, isPublic: boolean) => void;
}

// const TEST_COUNT = 0;

export const WifiSpeedTest: React.FC<Props> = (props) => {
  // const dispatch = useAppDispatch();
  // const apiStatus = useAppSelector(selectApiGetSpeedStatus);
  // const { speedDown, speedUp } = useAppSelector(selectSpeedResult);

  const [testFinished, setTestFinished] = useState(false);
  const [testStarted, setTestStarted] = useState(false);
  const [resultSpeedUp, setResultSpeedUp] = useState(0);
  const [resultSpeedDown, setResultSpeedDown] = useState(0);
  const [isPublic, setIsPublic] = useState(false);
  const testCntDownRef = useRef(0);
  const testCntUpRef = useRef(0);

  /**
   * Modules
   */

  const initializeState = () => {
    // dispatch(initApiGetSpeedState());
    setTestFinished(false);
    setTestStarted(false);
    setResultSpeedDown(0);
    setResultSpeedUp(0);
    testCntDownRef.current = 0;
    testCntUpRef.current = 0;
  };

  /**
   * User Interface
   */

  const onClickStart = () => {
    // dispatch(apiGetSpeed({}));
    setTestStarted(true);

    // test
    // setResultSpeedDown(10);
    // setResultSpeedUp(10);
    // setTestFinished(true);
    // setTestStarted(false);
    // return;

    doNetSpeedTest({
      onProgressDownload: (mbps: number) => {
        setResultSpeedDown(Math.round(mbps));
      },
      onProgressUpload: (mbps: number) => {
        setResultSpeedUp(Math.round(mbps));
      },
      onError: () => {
        window.alert("Something went wrong. Please contact support.");
        setTestFinished(false);
        setTestStarted(false);
      },
      onCompleted: (download: number, upload: number) => {
        setResultSpeedDown(download);
        setResultSpeedUp(upload);
        setTestFinished(true);
        setTestStarted(false);
      },
    });
  };

  const onClickAgain = () => {
    initializeState();
  };

  const onClickSubmit = () => {
    props.onFinishTest(resultSpeedDown, resultSpeedUp, isPublic);
    initializeState();
  };

  useEffect(() => {
    onClickStart();
  }, [null]);

  useEffect(() => {
    if (!props.modalVisible) {
      initializeState();
    }
  }, [props.modalVisible]);

  /**
   * Render
   */

  return (
    <Wrapper>
      <Title>Test WiFi Speeed</Title>

      <Description>It will take about an minute.</Description>

      <TestResultWrapper testStarted={testStarted}>
        <TestResultItem>
          <Label>Download</Label>
          <NetSpeedIndicator speed={resultSpeedDown} />
        </TestResultItem>
        <TestResultItem>
          <Label>Upload</Label>
          <NetSpeedIndicator speed={resultSpeedUp} />
        </TestResultItem>
      </TestResultWrapper>

      <Footer>
        <PublicCheckInWrapper>
          <PublicCheckInClickable onClick={() => setIsPublic(!isPublic)}>
            <CheckBox type="checkbox" checked={isPublic} onChange={() => {}} />
            Make this check-in public?{" "}
          </PublicCheckInClickable>
          <InfoTip position="right: -7.4rem; bottom: 1.5rem;" width="14rem">
            If you enabled this option, the check-in event will be posted on the
            Community page.
          </InfoTip>
        </PublicCheckInWrapper>

        {testFinished ? (
          <Buttons>
            <ButtonTestAgain onClick={onClickAgain}>Test Again</ButtonTestAgain>
            <ButtonNext onClick={onClickSubmit}>Submit</ButtonNext>
          </Buttons>
        ) : (
          <ButtonStart onClick={onClickStart} disabled={testStarted}>
            {testStarted ? "Testing..." : "Start"}
          </ButtonStart>
        )}
      </Footer>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${AnimationSlideLeft}
`;

const TestResultWrapper = styled.div<{ testStarted: boolean }>`
  /* border-top: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT}; */

  padding: 1rem 0 2rem 0;
  /* border-radius: 0.5em; */
  /* background-color: ${cons.FONT_COLOR_SUPER_LIGHT}; */

  display: flex;
  font-size: 2em;

  ${(props) =>
    props.testStarted &&
    `
    ${AnimationBlink}
  `};
`;

const TestResultItem = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PublicCheckInWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const PublicCheckInClickable = styled.div`
  ${ClickableStyle}
  color: ${cons.FONT_COLOR_SECONDARY};
  font-weight: 400;
  display: inline-flex;
  align-items: center;
  margin-right: 0.3rem;
`;

const CheckBox = styled.input`
  margin-right: 0.5rem;
`;

const Label = styled.div`
  ${fs.FontSizeNormal};
  color: ${cons.FONT_COLOR_LIGHTEST};
  font-weight: 600;
  margin-bottom: 1rem;
`;

const ButtonNext = styled.button`
  ${ButtonPrimarySmall};
  width: calc(50% - 1rem);
`;

const ButtonStart = styled.button`
  ${ButtonPrimarySmall};
  width: 100%;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ButtonTestAgain = styled.button`
  ${ButtonText};
  margin-left: 10%;
`;
