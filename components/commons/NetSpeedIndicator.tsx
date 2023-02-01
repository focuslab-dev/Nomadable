import React, { useEffect, useState } from "react";
import styled from "styled-components";

import * as cons from "../../constants";

interface Props {
  speed: number;
  bgWhite?: boolean;
}

export const getColorOfSpeed = (_speed: number) => {
  if (_speed === 0) return cons.FONT_COLOR_LIGHTEST;
  if (_speed >= 100) return cons.COLOR_BLUE_1;
  if (_speed >= 30) return "#1abb7d";
  if (_speed >= 8) return "#eebb11";
  return cons.COLOR_RED_1;
};

export const NetSpeedIndicator: React.FC<Props> = ({ speed, bgWhite }) => {
  const [color, setColor] = useState("");

  /**
   * Effects
   */

  const updateColor = () => {
    const _color = getColorOfSpeed(speed);
    setColor(_color);
  };

  useEffect(() => {
    updateColor();
  }, [speed]);

  /**
   * Render
   */

  return (
    <Wrapper color={color} bgWhite={bgWhite}>
      <SpeedNumber>{speed}</SpeedNumber>
      <Unit>mbps</Unit>
    </Wrapper>
  );
};

const Wrapper = styled.div<{ color: string; bgWhite: boolean | undefined }>`
  width: 3.7em;
  height: 3.7em;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  border: 0.15em solid ${(props) => props.color};
  & div {
    color: ${(props) => props.color};
  }

  ${(props) =>
    props.bgWhite &&
    `
    background-color: rgba(255,255,255,0.95);
  `};
`;

const SpeedNumber = styled.div`
  font-weight: bold;
  font-size: 1.2em;
`;

const Unit = styled.div`
  font-size: 0.6em;
  font-weight: 400;
`;
