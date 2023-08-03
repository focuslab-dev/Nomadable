import React, { Fragment, useEffect, useState } from "react";
import { GetStaticProps } from "next";
import HeadSetter from "../components/commons/HeadSetter";
import { Layout } from "../components/commons/Layout";
import { SplashPage } from "../components/commons/SplashPage";
import { TopPage } from "../components/top-page/TopPage";
import {
  API_IDLE,
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
  selectPlaceSearchResult,
  selectSearchResultTotalCnt,
} from "../redux/slices/placeSlice";
import { callFetchAllPlaces } from "../calls/placeCalls";
import { Boundary, CITIES, City } from "../data/articles/cities";
import { getCurrentLocation } from "../modules/Location";
import { useRouter } from "next/router";
import { set } from "mongoose";

interface TopPageProps {}

export default function TopPageContainer(props: TopPageProps) {
  const dispatch = useAppDispatch();
  // global state
  const places = useAppSelector(selectPlaceSearchResult);
  const searchResultTotalCnt = useAppSelector(selectSearchResultTotalCnt);
  const apiStatus = useAppSelector(selectApiFetchPlacesStatus);
  // local state
  const [defaultBoundary, setDefaultBoundary] = useState<Boundary | null>(null);

  /**
   * Functions
   */

  async function zoomToCurrentCity() {
    try {
      const location = await getCurrentLocation({
        accurate: false,
        useCache: true,
      });

      if (!location) return;

      const currentCity = CITIES.find((c: any) => {
        return (
          c.boundary.latStart < location.lat &&
          c.boundary.latEnd > location.lat &&
          c.boundary.lngStart < location.lng &&
          c.boundary.lngEnd > location.lng
        );
      });

      if (!currentCity) return;

      setDefaultBoundary(currentCity.boundary);
    } catch (err: any) {
      if (err.code === 3) {
        zoomToCurrentCity();
      }
    }
  }

  /**
   * Lifecycle
   */

  useEffect(() => {
    zoomToCurrentCity();

    return () => {
      dispatch(initApiFetchPlacesState());
    };
  }, [null]);

  /**
   * Render
   */

  return (
    <Fragment>
      <SplashPage
        visible={apiStatus.status === API_IDLE}
        message="Loading map..."
      />
      <Layout width={"100%"} fixed>
        <HeadSetter
          pageTitle={`${APP_NAME}: ${APP_SHORT_DESCRIPTION}`}
          pageDescription={APP_LONG_DESCRIPTION}
          pagePath={`${APP_URL}`}
        />
        <TopPage
          places={places || []}
          searchResultTotalCnt={searchResultTotalCnt}
          defaultBoundary={defaultBoundary}
        />
      </Layout>
    </Fragment>
  );
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (!params || typeof params.postId !== "string") throw Error;

    const places = await callFetchAllPlaces();

    return {
      props: {
        places,
      },
      revalidate: 1, // regenerate the static page on the access after 1 second later from the previous access
    };
  } catch (err: any) {
    return {
      props: {
        places: [],
      },
    };
  }
};
