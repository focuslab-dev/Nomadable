import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { CityWithData } from "../../data/articles/cities";
import { forMobile } from "../../styles/Responsive";
import * as fs from "../../styles/styled-components/FontSize";
import {
  Paragraph,
  ParagraphLarge,
} from "../../styles/styled-components/Texts";
import { CityItem } from "./CityItem";

interface Props {
  citiesWithData: CityWithData[];
  totalPlaceCnt: number;
}

export const CitiesSection: React.FC<Props> = ({
  citiesWithData,
  totalPlaceCnt,
}) => {
  return (
    <CitiesSectionWrapper>
      <Title>Find Places to Work From</Title>
      <Subtitle>
        List of {totalPlaceCnt || ""} cafes, coworking spaces, hotels for remote
        workers worldwide.
      </Subtitle>
      <Container>
        {citiesWithData.map((ct) => (
          <CityItem key={ct.slug} cityWithData={ct} />
        ))}
      </Container>
    </CitiesSectionWrapper>
  );
};

const CitiesSectionWrapper = styled.div`
  padding-top: 6rem;
`;

const Title = styled.h1`
  ${fs.FontSizeHeaderLarge};
  font-weight: bold;
  color: ${cons.FONT_COLOR_NORMAL};
  margin-bottom: 0.8rem;
  margin-top: 1.5rem;

  ${forMobile(`
    margin-top: 0.8rem;
    margin-bottom: 1rem;
    ${fs.FontSizeLarge};
  `)}
`;

const Container = styled.div`
  display: flex;
  gap: 1.4rem;
  flex-wrap: wrap;

  ${forMobile(`
    gap: 0.7rem;
  `)}
`;

const Subtitle = styled.div`
  ${ParagraphLarge};
  margin-bottom: 2.3rem;
  color: ${cons.FONT_COLOR_LIGHT};
  font-weight: 400;
  font-size: 1.2rem;

  ${forMobile(`
    margin-bottom: 1.5rem;
  `)}
`;
