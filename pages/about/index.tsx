import { GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { callDownloadPlacesAsCsv } from "../../calls/downloadCalls";

import { callFetchPlaceLinks } from "../../calls/placeCalls";
import { Breadcrumb } from "../../components/app-commons/Breadcrumb";
import HeadSetter from "../../components/commons/HeadSetter";
import { Layout } from "../../components/commons/Layout";
import { ListOfLinks } from "../../components/sitemap/ListOfLinks";
import * as cons from "../../constants";
import { ARTICLE_LINKS } from "../../data/articles/articles";
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
          <SectionTitle>Download Place Data</SectionTitle>
          <SectionBody>
            <p>
              All the place data in Nomadable is freely downloadable as CSV
              format. Please click the button below and the download will start.
            </p>
            <DownloadLink onClick={onClickDownloadCsv}>
              Place Data (CSV)
            </DownloadLink>
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
`;

const SectionTitle = styled.h2`
  ${Header2};
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
