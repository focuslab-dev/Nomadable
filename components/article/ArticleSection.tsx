import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { ArticleWithData } from "../../data/articles/articles";
import { Boundary } from "../../data/articles/cities";
import {
  convertDateToDateStr,
  generateDateText,
} from "../../modules/DateUtils";
import { useInviewElement } from "../../modules/hooks/useInViewElm";
import { useScrolllPosition } from "../../modules/hooks/useScrollPosition";
import { forMobile } from "../../styles/Responsive";
import { ButtonRedMedium } from "../../styles/styled-components/Buttons";
import * as fs from "../../styles/styled-components/FontSize";
import {
  Header1,
  Header3,
  Header4,
} from "../../styles/styled-components/Texts";
import { ArticlePlaceItem } from "./ArticlePlaceItem";
import { IndexSection } from "./IndexSection";

interface Props {
  articleWithData: ArticleWithData;
}

const makeQueryString = (boundary: Boundary | null): string => {
  if (!boundary) return cons.PATH_MAP;
  const { latStart, lngStart, latEnd, lngEnd } = boundary;
  const queryString = `${cons.PATH_MAP}?latStart=${latStart}&lngStart=${lngStart}&latEnd=${latEnd}&lngEnd=${lngEnd}`;
  return queryString;
};

export const ArticleSection: React.FC<Props> = ({ articleWithData }) => {
  const at = articleWithData;
  const [inViewId] = useInviewElement(
    at.placesWithData.map((place) => place.id)
  );

  const jumpTo = (placeId: string) => {
    const elm = document.getElementById(placeId);
    window.scrollTo({ top: elm!.offsetTop, behavior: "smooth" });
  };

  /**
   * Effect
   */

  return (
    <Wrapper>
      <Title>{at.title}</Title>
      <Updated>Updated: {generateDateText(new Date())}</Updated>
      <HeaderImage src={at.placesWithData[0].images[0]} />
      <BodyWrapper>
        <ArticleColumn>
          {at.placesWithData.map((place, index) => (
            <PlaceWrapper key={place.id} id={place.id}>
              <ArticlePlaceItem index={index} placeWithData={place} />
            </PlaceWrapper>
          ))}

          <LinkToMap>
            <LinkToMapText>Find more places in {at.city.city}</LinkToMapText>
            <a href={makeQueryString(at.city.boundary)}>
              <LinkToMapButton>Search on Map</LinkToMapButton>
            </a>
          </LinkToMap>
        </ArticleColumn>
        <IndexColumn>
          <IndexSection
            jumpTo={jumpTo}
            placesWithData={at.placesWithData}
            inViewId={inViewId}
          />
        </IndexColumn>
      </BodyWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-top: 2rem;
  padding-bottom: 5rem;
`;

const Title = styled.h1`
  ${Header1}
`;

const Updated = styled.div`
  color: ${cons.FONT_COLOR_LIGHT};
  ${fs.FontSizeSemiSmall}
  font-weight: 400;
  margin: 1rem 0 1.5rem 0;
`;

const HeaderImage = styled.img`
  width: 100%;
  border-radius: 0.8rem;
  height: 22rem;
  object-fit: cover;

  ${forMobile(`
    height: 15rem;
    width: calc(100% + 1.7rem);
    margin-left: -1rem;
    border-radius: 0;
  `)}
`;
const BodyWrapper = styled.div`
  margin-top: 3.5rem;
  display: flex;
  justify-content: space-between;

  ${forMobile(`
     flex-direction: column-reverse;
  `)}
`;

const ArticleColumn = styled.div`
  width: 30rem;

  ${forMobile(`
    width: 100%;
  `)}
`;
const PlaceWrapper = styled.div``;

const LinkToMap = styled.div``;
const LinkToMapText = styled.div`
  ${Header3}
  margin-bottom: 1.5rem;
`;
const LinkToMapButton = styled.button`
  ${ButtonRedMedium};
  width: 100%;
`;

const IndexColumn = styled.div`
  width: 16rem;
  height: 12rem;
  margin-left: 2rem;

  position: -webkit-sticky;
  position: sticky;
  top: 8rem;

  ${forMobile(`
    position: static;
    height: auto;
    width: 100%;
    margin-left: 0;
    margin-top: -1.5rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT};
    padding-bottom: 1rem;
  `)}
`;
