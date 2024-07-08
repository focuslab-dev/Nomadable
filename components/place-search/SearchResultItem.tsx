import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { City } from "../../data/articles/cities";
import { ContainerStyleInside } from "../../styles/styled-components/Layouts";
import { FontSizeSemiSmall } from "../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../styles/styled-components/Interactions";

interface Props {
  city: City;
  onClickCity: (citySlug: string) => void;
}

export const SearchResultItem: React.FC<Props> = (props: Props) => {
  return (
    <Wrapper onClick={() => props.onClickCity(props.city.slug)}>
      <LeftSection>
        <CityName>{props.city.city}</CityName>
        <CityCountry>- {props.city.country}</CityCountry>
      </LeftSection>
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

const LeftSection = styled.div`
  display: flex;
  gap: 0.3rem;
  /* justify-content: space-between; */
  width: 100%;
`;

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
