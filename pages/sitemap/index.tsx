import { GetStaticProps } from "next";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { callFetchPlaceLinks } from "../../calls/placeCalls";
import { Breadcrumb } from "../../components/app-commons/Breadcrumb";
import HeadSetter from "../../components/commons/HeadSetter";
import { Layout } from "../../components/commons/Layout";
import { ListOfLinks } from "../../components/sitemap/ListOfLinks";
import * as cons from "../../constants";
import { ARTICLE_LINKS } from "../../data/articles/articles";
import { forMobile } from "../../styles/Responsive";
import { Header1, Header2 } from "../../styles/styled-components/Texts";

interface Link {
  url: string;
  text: string;
}

interface Props {
  articleLinks: Link[];
  placeLinks: Link[];
}

const Sitemap: React.FC<Props> = ({ articleLinks, placeLinks }) => {
  const [_articleLinks, setArticleLinks] = useState(articleLinks || []);
  const [_placeLinks, setPlaceLinks] = useState(placeLinks || []);

  //   const fetchPlaceLinks = async () => {
  //     const { placeLinks } = await callFetchPlaceLinks();
  //     setArticleLinks(ARTICLE_LINKS);
  //     setPlaceLinks(placeLinks);
  //   };

  //   useEffect(() => {
  //     if (placeLinks.length < 1) {
  //       fetchPlaceLinks();
  //     }
  //   }, [articleLinks, placeLinks]);

  return (
    <Layout width={cons.CONTAINER_WIDTH_NARROW} fixed>
      <HeadSetter
        pageTitle={`Sitemap | ${cons.APP_NAME}`}
        pageDescription="This is a sitemap page of Nomadable."
        pagePath={`${cons.APP_URL}/sitemap`}
      />
      <Breadcrumb breadcrumbs={[{ text: "Sitemap", url: "/sitemap" }]} />

      <ContentWrapper>
        <Title>Sitemap</Title>

        <SectionWrapper>
          <SectionTitle>Articles</SectionTitle>
          <ListOfLinks links={_articleLinks || []} />
        </SectionWrapper>

        <SectionWrapper>
          <SectionTitle>Places</SectionTitle>
          <ListOfLinks links={_placeLinks || []} />
        </SectionWrapper>
      </ContentWrapper>
    </Layout>
  );
};

export default Sitemap;

const ContentWrapper = styled.div`
  margin-bottom: 4em;
  ${forMobile(`
    margin-bottom: 3em;
  `)}
`;

const Title = styled.h1`
  ${Header1};
`;

const SectionWrapper = styled.div`
  /* margin: 1rem 0rem; */
`;

const SectionTitle = styled.h2`
  ${Header2};
`;

export const getStaticProps: GetStaticProps = async ({}) => {
  try {
    const { placeLinks } = await callFetchPlaceLinks();

    return {
      props: {
        articleLinks: ARTICLE_LINKS,
        placeLinks,
      },
      revalidate: 1, // regenerate the static page on the access after 1 second later from the previous access
    };
  } catch (err: any) {
    return {
      props: {
        articleLinks: [],
        placeLinks: [],
      },
    };
  }
};
