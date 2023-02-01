import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { PlaceWithData } from "../../redux/slices/placeSlice";
import * as fs from "../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../styles/styled-components/Interactions";
import { Header3, Header4 } from "../../styles/styled-components/Texts";

interface Props {
  jumpTo: (placeId: string) => void;
  placesWithData: PlaceWithData[];
  inViewId: string;
}

export const IndexSection: React.FC<Props> = ({
  jumpTo,
  placesWithData,
  inViewId,
}) => {
  return (
    <IndexSectionWrapper>
      <Label>
        <Square />
        List
      </Label>
      <IndexesWrapper>
        {placesWithData.map((place, index) => (
          <IndexItem
            key={place.id}
            active={place.id === inViewId}
            onClick={() => jumpTo(place.id)}
          >
            <Number>{index + 1}. </Number>
            {place.spotName}
          </IndexItem>
        ))}
      </IndexesWrapper>
    </IndexSectionWrapper>
  );
};

const IndexSectionWrapper = styled.div``;

const Label = styled.div`
  display: flex;
  align-items: center;
  ${Header3};
  margin-bottom: 1.5rem;
`;
const Square = styled.div`
  width: 0.6rem;
  height: 1.5rem;
  background-color: ${cons.COLOR_RED_0};
  border-radius: 0.2rem;
  margin-right: 1rem;
`;

const IndexesWrapper = styled.div``;

const IndexItem = styled.div<{ active: boolean }>`
  ${ClickableStyle}
  margin-bottom: 1rem;
  display: flex;
  align-items: flex-start;
  font-weight: 500;
  color: ${cons.FONT_COLOR_LIGHT};

  &:hover {
    color: ${cons.FONT_COLOR_NORMAL};
  }

  ${(props) => props.active && `color: ${cons.FONT_COLOR_NORMAL};`}
`;

const Number = styled.div`
  margin-right: 0.2rem;
`;
