import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { CityWithData } from "../../data/articles/cities";
import {
  ContainerStyle,
  ContainerStyleInside,
} from "../../styles/styled-components/Layouts";
import { FontSizeSemiSmall } from "../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../styles/styled-components/Interactions";
import Link from "next/link";

interface Props {
  city: CityWithData;
  onClickCity: (citySlug: string) => void;
}

export const SearchResultItem: React.FC<Props> = (props: Props) => {
  return (
    <Wrapper onClick={() => props.onClickCity(props.city.slug)}>
      <LeftSection>
        <CityName>{props.city.city}</CityName>
        <CityCountry>{props.city.country}</CityCountry>
      </LeftSection>
      <RightSection>
        <PlaceCnt>{props.city.spotCnt}</PlaceCnt>
        <PlaceCntUnit>places</PlaceCntUnit>
      </RightSection>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${ClickableStyle}
  ${ContainerStyleInside};
  padding-top: 0.7rem;
  padding-bottom: 0.7rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background-color: ${cons.FONT_COLOR_SUPER_LIGHT};
  }
`;

const LeftSection = styled.div``;
const CityName = styled.div`
  font-weight: bold;
  color: ${cons.FONT_COLOR_NORMAL};
`;
const CityCountry = styled.div`
  color: ${cons.FONT_COLOR_LIGHT};
  ${FontSizeSemiSmall};
  font-weight: 500;
  margin-top: 0.1rem;
`;
const RightSection = styled.div`
  display: flex;
  align-items: center;
`;
const PlaceCnt = styled.div`
  margin-right: 0.5rem;
  /* font-weight: bold; */
  color: ${cons.FONT_COLOR_LIGHT};
  ${FontSizeSemiSmall};
`;

const PlaceCntUnit = styled.div`
  ${FontSizeSemiSmall};
  color: ${cons.FONT_COLOR_LIGHT};
`;
