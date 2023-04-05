import React, { Fragment, useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import HeadSetter from "../components/commons/HeadSetter";
import { Layout } from "../components/commons/Layout";
import { SplashPage } from "../components/commons/SplashPage";
import { TopPage } from "../components/top-page/TopPage";
import {
  APP_NAME,
  APP_LONG_DESCRIPTION,
  APP_URL,
  APP_SHORT_DESCRIPTION,
} from "../constants";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  selectApiFetchPlacesStatus,
  initApiFetchPlacesState,
} from "../redux/slices/api/apiPlaceSlice";
import {
  MapArea,
  PlaceHeader,
  selectPlaceSearchResult,
  selectSearchResultTotalCnt,
} from "../redux/slices/placeSlice";
import { callFetchPlaces } from "../calls/placeCalls";
import { CITIES, City } from "../data/articles/cities";
import { initialFilterObj } from "../redux/slices/placeSlice";
import { initialMapArea } from "../redux/slices/placeSlice";
import { useRouter } from "next/router";

interface TopPageProps {
  places: PlaceHeader[];
  totalPlaceCnt: number;
  city?: City;
}

export default function TopPageContainer(props: TopPageProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  // from store
  const places = useAppSelector(selectPlaceSearchResult);
  const searchResultTotalCnt = useAppSelector(selectSearchResultTotalCnt);
  const apiStatus = useAppSelector(selectApiFetchPlacesStatus);
  // local state
  const [city, setCity] = useState<City | undefined>(undefined);
  // decide which deta to use
  const _city = city || props.city;

  const generatePageDescription = () => {
    return `Best cafes & co-working spaces in ${
      _city ? _city.city : ""
    } (with WiFi speed information): 
      ${places.map((p, index) => ` ${index + 1}. ${p.spotName}`).join(" · ")}.
    `;
  };

  useEffect(() => {
    return () => {
      dispatch(initApiFetchPlacesState());
    };
  }, [null]);

  useEffect(() => {
    if (!router.query.citySlug) return;
    const city = CITIES.find((ct) => ct.slug === router.query.citySlug);
    if (!city) return;
    setCity(city);
  }, [router.query.citySlug]);

  return (
    <Fragment>
      {/* <SplashPage
        visible={apiStatus.status === API_IDLE}
        message="Loading map..."
      /> */}
      <Layout width={"100%"} fixed>
        <HeadSetter
          pageTitle={`${
            props.totalPlaceCnt > 10 ? `${props.totalPlaceCnt} ` : ""
          }Best Work Cafes & Co-working Spaces in ${props.city?.city}`}
          pageDescription={generatePageDescription()}
          pagePath={`${APP_URL}/${props.city?.slug}`}
        />
        <TopPage
          places={places && places.length > 0 ? places : props.places || []}
          searchResultTotalCnt={
            searchResultTotalCnt && searchResultTotalCnt > 0
              ? searchResultTotalCnt
              : props.totalPlaceCnt || 0
          }
          city={_city}
        />
      </Layout>
    </Fragment>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const paths = CITIES.map((ct) => ({ params: { citySlug: ct.slug } }));

    return {
      paths,
      fallback: true,
    };
  } catch (err) {
    return {
      paths: [{ params: { citySlug: "" } }],
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (!params || typeof params.citySlug !== "string") throw Error;

    const city = CITIES.find((ct) => ct.slug === params.citySlug);
    const mapAreaOfCity = city?.boundary || initialMapArea;

    const places = await callFetchPlaces({
      mapArea: mapAreaOfCity,
      pageIndex: 0,
      filterObj: initialFilterObj,
    });

    return {
      props: {
        places: places.places,
        totalPlaceCnt: places.totalPlaceCnt,
        city,
      },
      revalidate: 1, // regenerate the static page on the access after 1 second later from the previous access
    };
  } catch (err: any) {
    return {
      props: {
        places: [],
        totalPlaceCnt: 0,
        city: null,
      },
    };
  }
};
