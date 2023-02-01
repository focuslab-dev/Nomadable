import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { forMobile } from "../../styles/Responsive";
import {
  FontSizeLarge,
  FontSizeSemiLarge,
  FontSizeSemiSmall,
} from "../../styles/styled-components/FontSize";
import { ContainerStyleInside } from "../../styles/styled-components/Layouts";

interface Props {
  points: number;
  ranking: number;
  discovered: number;
  checkIns: number;
}

export const StatsItems: React.FC<Props> = ({
  points,
  ranking,
  discovered,
  checkIns,
}) => {
  const StatsItem = ({ number, unit }: { number: string; unit: string }) => {
    return (
      <ItemWrapper>
        <Number>{number}</Number>
        <Unit>{unit}</Unit>
      </ItemWrapper>
    );
  };

  return (
    <StatsItemsWrapper>
      <StatsItem number={`${points}`} unit="points" />
      <StatsItem number={`#${ranking}`} unit="contributer" />
      {/* <StatsItem number={`${discovered}`} unit="discovered" /> */}
      <StatsItem number={`${checkIns}`} unit="check-ins" />
    </StatsItemsWrapper>
  );
};

const StatsItemsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  /* ${ContainerStyleInside} */
`;

const ItemWrapper = styled.div`
  text-align: center;
  margin-right: 2rem;

  ${forMobile(`
    margin-right: 1rem;
  `)}
`;

const Number = styled.div`
  color: ${cons.FONT_COLOR_NORMAL};
  font-weight: bold;
  ${FontSizeLarge};

  ${forMobile(`
    font-size: 1.2rem;
  `)}
`;

const Unit = styled.div`
  color: ${cons.FONT_COLOR_LIGHT};
  ${FontSizeSemiSmall};
  font-weight: 500;
  margin-top: 0.3rem;

  ${forMobile(`
    font-size: 0.8rem;
  `)}
`;
