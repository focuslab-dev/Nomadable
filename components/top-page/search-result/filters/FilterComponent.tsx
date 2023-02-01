import React from "react";
import styled from "styled-components";

import * as cons from "../../../../constants";
import { forMobile } from "../../../../styles/Responsive";
import * as fs from "../../../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../../../styles/styled-components/Interactions";

interface Props {
  onChangeFilterItems: (filterItems: string[]) => void;
  filterItems: string[];
  typeDict: any;
  allowAllSelect?: boolean;
}

export const FilterComponent: React.FC<Props> = ({
  onChangeFilterItems,
  filterItems,
  typeDict,
  allowAllSelect,
}) => {
  const onClickItem = (placeType: string) => {
    let newFilterItems: string[] = [];

    if (filterItems.includes(placeType)) {
      newFilterItems = filterItems.filter((pt) => pt !== placeType);
    } else {
      newFilterItems = [...filterItems, placeType];
    }

    if (!allowAllSelect) {
      if (newFilterItems.length >= Object.keys(typeDict).length) {
        newFilterItems = [];
      }
    }

    onChangeFilterItems(newFilterItems);
  };

  return (
    <PlaceTypeFormWrapper>
      {Object.keys(typeDict).map((typeId: any) => {
        const typeText = typeDict[typeId].text;
        const typeIcon = typeDict[typeId].icon;

        return (
          <PlaceTypeItem
            key={typeText}
            onClick={() => onClickItem(typeId)}
            active={filterItems.includes(typeId)}
          >
            <PlaceTypeEmoji>{typeIcon}</PlaceTypeEmoji>
            {typeText}
          </PlaceTypeItem>
        );
      })}
    </PlaceTypeFormWrapper>
  );
};

const PlaceTypeFormWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const PlaceTypeItem = styled.div<{ active: boolean }>`
  ${ClickableStyle}
  padding: 0.6rem 1.2rem;
  border: 0.1rem solid ${cons.FONT_COLOR_LIGHTEST};
  border-radius: 0.3rem;
  font-weight: 500;
  color: ${cons.FONT_COLOR_LIGHT};
  margin-right: 0.8rem;
  margin-bottom: 0.8rem;
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
