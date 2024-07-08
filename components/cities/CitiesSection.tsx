import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { CityWithData, REGIONS } from "../../data/articles/cities";
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
  const citiesByRegion = makeCitiesWithRegion(citiesWithData);

  return (
    <CitiesSectionWrapper>
      <Title>Find Places to Work From</Title>
      <Subtitle>
        List of {totalPlaceCnt || ""} cafes, coworking spaces, hotels for remote
        workers worldwide.
      </Subtitle>
      <div>
        {citiesByRegion.map((region) => (
          <div key={region.region}>
            <RegionName>
              <RegionNameLabel>{region.region}</RegionNameLabel>
              {/* <Line /> */}
            </RegionName>
            <Container>
              {region.cities.map((ct) => (
                <CityItem key={ct.slug} cityWithData={ct} />
              ))}
            </Container>
          </div>
        ))}
      </div>
    </CitiesSectionWrapper>
  );
};

function makeCitiesWithRegion(citiesWithData: CityWithData[]) {
  const citiesByRegionArray: { region: string; cities: CityWithData[] }[] = [];

  REGIONS.forEach((region) => {
    const citiesInRegion = citiesWithData.filter((ct) => ct.region === region);
    if (citiesInRegion.length > 0) {
      citiesByRegionArray.push({
        region: region,
        cities: citiesInRegion.slice(0, 15),
      });
    }
  });

  return citiesByRegionArray;
}

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

const RegionName = styled.div`
  font-weight: 700;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Container = styled.div`
  display: flex;
  gap: 1.4rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;

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

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${cons.FONT_COLOR_SUPER_LIGHT};
`;

const RegionNameLabel = styled.h2`
  flex-shrink: 0;
  font-weight: 700;
`;
