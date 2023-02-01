import Link from "next/link";
import React from "react";
import styled from "styled-components";

import * as cons from "../../constants";
import { Boundary, CityWithData } from "../../data/articles/cities";
import { forMobile } from "../../styles/Responsive";
import {
  AnimationFadeIn,
  AnimationSlideUp,
} from "../../styles/styled-components/Animations";
import * as fs from "../../styles/styled-components/FontSize";
import { ClickableStyle } from "../../styles/styled-components/Interactions";

interface Props {
  cityWithData: CityWithData;
}

export const CityItem: React.FC<Props> = ({ cityWithData }) => {
  const ct = cityWithData;

  const makeQueryString = (boundary: Boundary | null): string => {
    if (!boundary) return cons.PATH_HOME;
    const { latStart, lngStart, latEnd, lngEnd } = boundary;
    const queryString = `${cons.PATH_HOME}?latStart=${latStart}&lngStart=${lngStart}&latEnd=${latEnd}&lngEnd=${lngEnd}`;
    return queryString;
  };

  return (
    <Link href={makeQueryString(ct.boundary)} passHref>
      <CityItemWrapper>
        <CityCard imgUrl={ct.thumbnail || ""}>
          <CityTitle>
            <CityName>{ct.city}</CityName>
            <CountryName>{ct.country}</CountryName>
          </CityTitle>
        </CityCard>
        <LabelSection>
          {/* <LabelUpper>
            <Bold>
              {ct.city}, {ct.country}
            </Bold>
          </LabelUpper> */}
          <LabelLower>
            <PlaceCnt>
              <Bold>{ct.spotCnt}</Bold> places
            </PlaceCnt>
            <Dot>&#x2022;</Dot>
            <InternetSpeed>
              <Bold>{Math.round(ct.avgSpeed)}</Bold> mbps
            </InternetSpeed>
          </LabelLower>
        </LabelSection>
      </CityItemWrapper>
    </Link>
  );
};

const CityItemWrapper = styled.a`
  color: white;
  ${ClickableStyle}
  ${AnimationFadeIn} 
  width: calc(20% - 1.12rem);

  @media only screen and (max-width: 1280px) {
    width: calc(25% - 1.3rem);
    margin-bottom: 3rem;
    margin-bottom: auto;
  }

  @media only screen and (max-width: 1120px) {
    width: calc(33.3333% - 1rem);
    margin-bottom: 3rem;
    margin-bottom: auto;
  }

  @media only screen and (max-width: 1000px) {
    width: calc(50% - 0.8rem);
  }

  ${forMobile(`
    width: calc(50% - 0.35rem);
  `)}
`;

const CityCard = styled.div<{ imgUrl: string }>`
  position: relative;
  height: 100%;
  border-radius: 0.8rem;
  background: url(${(props) => props.imgUrl});
  background-size: cover;
  height: 10rem;

  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 0.25),
      rgba(0, 0, 0, 0.25)
    ),
    url(${(props) => props.imgUrl});

  @media only screen and (max-width: 1120px) {
    height: 8rem;
  }
`;

const Label = styled.div`
  color: ${cons.FONT_COLOR_NORMAL};
`;

const LabelUpper = styled(Label)`
  margin-top: 0.5rem;

  ${forMobile(`
  margin-top: 0.3rem;
  `)};

  ${fs.FontSizeNormal}
`;

const LabelLower = styled(Label)`
  margin-top: 0.3rem;
  display: flex;
  gap: 0.2rem;
  align-items: center;
  ${fs.FontSizeSemiSmall}
  color: ${cons.FONT_COLOR_LIGHT};
  font-weight: 500;
`;

const Bold = styled.span`
  font-weight: bold;
  color: ${cons.FONT_COLOR_NORMAL};
`;

const LabelSection = styled.div``;

const Dot = styled.div`
  color: ${cons.FONT_COLOR_LIGHT};
`;

const PlaceCnt = styled.div``;

const InternetSpeed = styled.div``;

const CityTitle = styled.div`
  position: absolute;
  bottom: 1rem;
  font-weight: bold;
  width: 100%;
  padding: 0 1rem;

  text-shadow: 0px 0px 8px rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
`;

const CityName = styled.div`
  font-size: 1.5rem;
  word-wrap: break-word;
`;

const CountryName = styled.div`
  margin-top: 0.1rem;
`;
