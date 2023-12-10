import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { callDownloadPlacesAsCsv } from "../../calls/downloadCalls";

import { Breadcrumb } from "../../components/app-commons/Breadcrumb";
import HeadSetter from "../../components/commons/HeadSetter";
import { Layout } from "../../components/commons/Layout";
import * as cons from "../../constants";
import { useAppDispatch } from "../../redux/hooks";
import { hideSpinner, showSpinner } from "../../redux/slices/uiSlice";
import { forMobile } from "../../styles/Responsive";
import { ButtonBlackSmall } from "../../styles/styled-components/Buttons";
import {
  Header1,
  Header2,
  ParagraphLarge,
} from "../../styles/styled-components/Texts";

interface Props {}

const About: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch();

  const onClickDownloadCsv = async () => {
    dispatch(showSpinner({ message: "Downloading..." }));
    const result = await callDownloadPlacesAsCsv();
    dispatch(hideSpinner());
    if (!result) {
      window.alert("Something went wrong.");
    }
  };

  /*
   * Render
   */

  const renderPointTable = (pointTable: typeof cons.POINT_TABLE) => {
    return pointTable.map((point) => {
      return (
        <li key={point.type}>
          <PointType>{point.description}</PointType>
          <PointPoint>{point.point} pts</PointPoint>
        </li>
      );
    });
  };

  return (
    <Layout width={cons.CONTAINER_WIDTH_SO_NARROW} fixed>
      <HeadSetter
        pageTitle={`About | ${cons.APP_NAME}`}
        pageDescription="This is a about page of Nomadable."
        pagePath={`${cons.APP_URL}/about`}
      />
      <Breadcrumb breadcrumbs={[{ text: "About", url: "/about" }]} />

      <ContentWrapper>
        <Title>How It Works</Title>

        <SectionWrapper>
          <SectionTitle>What is Nomadable</SectionTitle>
          <SectionBody>
            <p>
              Nomadable is a search engine for cafes, coworking spaces where you
              can work/study from. Here is the list of features:
            </p>
            <ul>
              <li>🗺 Easy-to-use map UI</li>
              <li>🔍 Various search filter</li>
              <li>🌐 Wifi speed data</li>
              <li>🪙 Point system for contributors</li>
            </ul>
          </SectionBody>
        </SectionWrapper>

        <SectionWrapper>
          <SectionTitle>How Point System Works</SectionTitle>
          <SectionBody>
            <p>
              Nomadable is maintained by its users. If a user submit a place or
              post a review, etc., the user will get points. These users are
              then credited on a leaderboard. Here is the types of action you
              get points from:
            </p>
            <ul>{renderPointTable(cons.POINT_TABLE)}</ul>
          </SectionBody>
        </SectionWrapper>

        <SectionWrapper>
          <SectionTitle>Open Data</SectionTitle>
          <SectionBody>
            <p>
              All the place data in Nomadable is freely downloadable as CSV
              format. Please click the button below to download.
            </p>
            <DownloadLink onClick={onClickDownloadCsv}>
              Place Data (CSV)
            </DownloadLink>
          </SectionBody>
        </SectionWrapper>

        <SectionWrapper>
          <SectionTitle>Open Code</SectionTitle>
          <SectionBody>
            <p>
              The source code of Nomadable is open to public on{` `}
              <a href="https://github.com/uzura89/nomadable">GitHub</a>. Please
              feel free to copy it or use it for whatever purpose.
            </p>
          </SectionBody>
        </SectionWrapper>
      </ContentWrapper>
    </Layout>
  );
};

export default About;

const ContentWrapper = styled.div`
  margin-bottom: 4em;
  ${forMobile(`
    margin-bottom: 3em;
  `)}
`;

const Title = styled.h1`
  ${Header1};
  margin: 1.5em 0 1.5em 0;

  ${forMobile(`
    margin: 1em 0 1em 0;
  `)}
`;

const SectionWrapper = styled.div`
  /* margin: 1rem 0rem; */
  /* border-top: 1px solid ${cons.FONT_COLOR_SUPER_LIGHT}; */
  margin-top: 1rem;
`;

const SectionTitle = styled.h2`
  ${Header2};
  margin-top: 2.4rem;
`;

const SectionBody = styled.div`
  ${ParagraphLarge}
`;

const PointType = styled.div`
  display: inline-block;
  width: 14rem;
`;

const PointPoint = styled.div`
  display: inline-block;
  width: 6rem;
  text-align: right;
`;

export const DownloadLink = styled.button`
  ${ButtonBlackSmall};
  margin-top: 1.5rem;
`;
