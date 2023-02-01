import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import * as fs from "../../styles/styled-components/FontSize";

interface Props {}

export const CircleAndBorder: React.FC<Props> = ({}) => {
  return (
    <CircleAndBorderWrapper>
      <CircleOuter>
        <CircleInner />
      </CircleOuter>
      <Border />
    </CircleAndBorderWrapper>
  );
};

const CircleAndBorderWrapper = styled.div`
  position: absolute;
  left: 0rem;
  top: 0.2rem;
  height: 100%;
`;

export const CircleOuter = styled.div`
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 50%;
  background-color: ${cons.FONT_COLOR_SUPER_LIGHT};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CircleInner = styled.div`
  width: 0.7rem;
  height: 0.7rem;
  border-radius: 50%;
  background-color: white;
`;

export const Border = styled.div`
  height: calc(100% + 0.9rem);
  width: 0.18rem;
  background-color: ${cons.FONT_COLOR_SUPER_LIGHT};
  position: absolute;
  left: 0.45rem;
`;
