import { type } from "os";
import React from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import * as fs from "../../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../../styles/styled-components/Interactions";

interface Props {
  onChange: (placeType: string) => void;
  placeType: string;
}

export const PlaceTypeForm: React.FC<Props> = ({ onChange, placeType }) => {
  return (
    <PlaceTypeFormWrapper>
      {Object.keys(cons.PLACE_TYPE_LIST).map((placeId: string) => {
        const text = cons.PLACE_TYPE_LIST[placeId].text;
        const icon = cons.PLACE_TYPE_LIST[placeId].icon;

        return (
          <PlaceTypeItem
            key={placeId}
            onClick={() => onChange(placeId)}
            active={placeId === placeType}
          >
            <PlaceTypeEmoji>{icon}</PlaceTypeEmoji>
            {text}
          </PlaceTypeItem>
        );
      })}
    </PlaceTypeFormWrapper>
  );
};

const PlaceTypeFormWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const PlaceTypeItem = styled.div<{ active: boolean }>`
  ${ClickableStyle}
  padding: 0.6rem 1.2rem;
  border: 0.1rem solid ${cons.FONT_COLOR_LIGHTEST};
  border-radius: 0.3rem;
  font-weight: 500;
  color: ${cons.FONT_COLOR_LIGHT};
  /* margin-right: 0.8rem; */
  display: flex;
  align-items: center;
  ${fs.FontSizeSemiSmall}

  ${(props) =>
    props.active &&
    `
    border: 0.1rem solid ${cons.COLOR_ERROR_2};
    color: ${cons.COLOR_ERROR_0};
    background-color: ${cons.COLOR_ERROR_6}
  `};
`;

const PlaceTypeEmoji = styled.div`
  margin-right: 0.6rem;
  font-size: 1.2rem;
`;
