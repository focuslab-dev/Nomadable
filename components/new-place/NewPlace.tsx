import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  apiCreatePlace,
  initApiCreatePlaceState,
  selectApiCreatePlaceStatus,
} from "../../redux/slices/api/apiPlaceSlice";
import {
  clearPlaceInfoOfNewPlace,
  selectNewPlace,
} from "../../redux/slices/newPlaceSlice";
import { DetailForm } from "./detail-form/DetailForm";
import { PlaceForm } from "./place-form/PlaceForm";
import * as cons from "../../constants";
import { SectionLoader } from "../commons/SectionLoader";

interface Props {}

export const NewPlace: React.FC<Props> = ({}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const newPlace = useAppSelector(selectNewPlace);
  const apiStatusCreatePlace = useAppSelector(selectApiCreatePlaceStatus);

  /**
   * User Interface
   */

  const goToPage2 = () => {
    router.push({
      query: { page: "1" },
    });
  };

  const createNewPlace = () => {
    dispatch(
      apiCreatePlace({
        place: newPlace,
        errorCallback: (placeId: string) => {
          router.push({ pathname: `/place/${placeId}` });
        },
      })
    );
  };

  /**
   * Effect
   */

  useEffect(() => {
    if (
      router.query.page === "1" &&
      newPlace.location.coordinates[1] === null
    ) {
      router.push({
        query: {},
      });
    }
  }, [newPlace, router]);

  useEffect(() => {
    if (apiStatusCreatePlace.status === cons.API_SUCCEEDED && newPlace.id) {
      router.push({ pathname: `/place/${newPlace.id}` });
    }
  }, [apiStatusCreatePlace.status]);

  useEffect(() => {
    return () => {
      setTimeout(() => {
        dispatch(initApiCreatePlaceState());
        dispatch(clearPlaceInfoOfNewPlace());
      }, 1000);
    };
  }, [null]);

  /**
   * Render
   */

  switch (router.query.page) {
    case "0":
      return (
        <PlaceForm pageIndex={0} onClickNext={goToPage2} newPlace={newPlace} />
      );
    case "1":
      return (
        <DetailForm
          pageIndex={1}
          onClickNext={createNewPlace}
          newPlace={newPlace}
        />
      );
    default:
      return (
        <PlaceForm pageIndex={0} onClickNext={goToPage2} newPlace={newPlace} />
      );
  }
};
