import { GetStaticProps } from "next";
import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import { callFetchCitiesWithData } from "../../calls/placeCalls";
import { callFetchContributersArea } from "../../calls/userCalls";
import { CitiesSection } from "../../components/cities/CitiesSection";
import HeadSetter from "../../components/commons/HeadSetter";
import { Layout } from "../../components/commons/Layout";
import { Contributers } from "../../components/top-page/search-result/Contributers";
import {
  CONTAINER_WIDTH_WIDE,
  APP_NAME,
  APP_SHORT_DESCRIPTION,
  APP_URL,
  FONT_COLOR_SUPER_LIGHT,
  PATH_CITIES,
  CONTAINER_WIDTH_NORMAL,
} from "../../constants";
import { CityWithData, CITIES } from "../../data/articles/cities";
import { Contributer } from "../../redux/slices/contributerSlice";
import { forMobile } from "../../styles/Responsive";

interface Props {
  citiesWithData: CityWithData[];
  totalPlaceCnt: number;
  contributers: Contributer[];
}

const Cities: React.FC<Props> = (props) => {
  const [_citiesWithData, setCitiesWithData] = useState<CityWithData[]>(
    props.citiesWithData || []
  );
  const [_totalPlaceCnt, setTotalPlaceCnt] = useState<number>(
    props.totalPlaceCnt || 0
  );
  const [_contributers, setContributers] = useState(props.contributers || []);

  const generatePageDescription = () => {
    return `
      Find best places to work from wherever you are: 
      ${_citiesWithData
        .map((city, index) => ` ${index + 1}. ${city.city}`)
        .join(" · ")}.
    `;
  };

  const fetchData = async () => {
    const { citiesWithData, totalPlaceCnt } = await callFetchCitiesWithData(
      CITIES
    );
    setCitiesWithData(citiesWithData);
    setTotalPlaceCnt(totalPlaceCnt);
  };

  const fetchContributers = async () => {
    const {
      data: { contributers },
    } = await callFetchContributersArea(null, 10);

    setContributers(contributers);
  };

  useEffect(() => {
    fetchData();
    fetchContributers();
  }, [null]);

  return (
    <Layout width={CONTAINER_WIDTH_NORMAL} fixed>
      <HeadSetter
        pageTitle={`Cities | ${APP_NAME}`}
        pageDescription={generatePageDescription()}
        pagePath={`${APP_URL}/${PATH_CITIES}`}
      />
      {/* <Breadcrumb breadcrumbs={BREADCRUMBS} /> */}
      <PageWrapper>
        <LeftWrapper>
          <CitiesSection
            citiesWithData={_citiesWithData}
            totalPlaceCnt={_totalPlaceCnt}
          />
        </LeftWrapper>
        {/* <RightWrapper>
          <Contributers contributers={_contributers} />
        </RightWrapper> */}
      </PageWrapper>
    </Layout>
  );
};

export default Cities;

export const getStaticProps: GetStaticProps = async ({}) => {
  try {
    const { citiesWithData, totalPlaceCnt } = await callFetchCitiesWithData(
      CITIES
    );

    const {
      data: { contributers },
    } = await callFetchContributersArea(null, 10);
    // const totalPlaceCnt = citiesWithData
    //   .filter((c) => c.boundary !== null)
    //   .reduce((total, city) => total + city.spotCnt, 0);

    return {
      props: {
        citiesWithData,
        totalPlaceCnt,
        contributers,
      },
      revalidate: 1, // regenerate the static page on the access after 1 second later from the previous access
    };
  } catch (err: any) {
    return {
      props: {
        citiesWithData: [],
        totalPlaceCnt: 0,
        contributers: [],
      },
    };
  }
};

const PageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 2rem;

  ${forMobile(`
    flex-direction: column;
    gap:0;
  `)}
`;

const LeftWrapper = styled.div``;

const RightWrapper = styled.div`
  width: 50rem;
  padding-top: 10rem;
  max-width: 100%;

  ${forMobile(`
    padding-top: 0rem;
    margin-top: -13rem;
    border-top: 1px solid ${FONT_COLOR_SUPER_LIGHT};
    margin-top: 1rem;
  `)}
`;
