import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { callFetchAllPlaceIds, callFetchPlace } from "../../calls/placeCalls";
import HeadSetter from "../../components/commons/HeadSetter";
import { Layout } from "../../components/commons/Layout";
import { SectionLoader } from "../../components/commons/SectionLoader";
import { PlacePage } from "../../components/place/PlacePage";

import * as cons from "../../constants";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  apiFetchPlaceForPage,
  initapiFetchPlaceForPageState,
  selectApiFetchPlaceForPageStatus,
} from "../../redux/slices/api/apiPlaceSlice";
import {
  initialPlaceWithData,
  initPlaceForPage,
  PlaceWithData,
  selectPlaceForPage,
} from "../../redux/slices/placeSlice";
import placeWithData from "../api/place-with-data";

interface Props {
  placeWithData?: PlaceWithData;
}

const PlaceContainer: React.FC<Props> = (props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const apiStatusFetchPlace = useAppSelector(selectApiFetchPlaceForPageStatus);
  const placeWithData = useAppSelector(selectPlaceForPage);

  const pd = placeWithData.id
    ? placeWithData
    : props.placeWithData || initialPlaceWithData;

  const generateDescription = () => {
    return `Is ${props.placeWithData?.spotName} a good place to work from? Find out their wifi speed, power outlets, and more, and read reviews by other digital nomads.`;
  };

  /**
   * Effect
   */

  useEffect(() => {
    if (router.query.placeId) {
      const { placeId } = router.query;

      if (!placeId || typeof placeId !== "string") return;
      dispatch(apiFetchPlaceForPage({ placeId }));
    }

    return () => {
      dispatch(initPlaceForPage());
    };
  }, [router.query]);

  /**
   * Render
   */

  return (
    <Layout width={cons.CONTAINER_WIDTH_NARROW}>
      <HeadSetter
        pageTitle={`WiFi Speed of ${pd.spotName} | ${cons.APP_NAME}`}
        pageDescription={generateDescription()}
        pagePath={`${cons.APP_URL}/place/${pd.id}`}
        pageImg={pd.images[0]}
      />
      {/* <SectionLoader
        visible={apiStatusFetchPlace.status === cons.API_LOADING}
      /> */}
      <PlacePage placeWithData={pd} />
    </Layout>
  );
};

export default PlaceContainer;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const { placeIds } = await callFetchAllPlaceIds();

    const paths = placeIds.map((placeId: string) => {
      return {
        params: {
          placeId,
        },
      };
    });

    return {
      paths,
      fallback: true,
    };
  } catch (err) {
    return {
      paths: [{ params: { placeId: "" } }],
      fallback: true,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (!params || typeof params.placeId !== "string") throw Error;

    const { placeWithData } = await callFetchPlace(params.placeId, true);

    return {
      props: {
        placeWithData,
      },
      revalidate: 1, // regenerate the static page on the access after 1 second later from the previous access
    };
  } catch (err: any) {
    return {
      props: {
        placeWithData: initialPlaceWithData,
      },
    };
  }
};
