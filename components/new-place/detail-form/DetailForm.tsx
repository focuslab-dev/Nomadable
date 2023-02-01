import React, { Fragment, useEffect } from "react";

import * as cons from "../../../constants";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  changePlaceType,
  toggleAvailabilityOfPlace,
} from "../../../redux/slices/newPlaceSlice";
import { PlaceFormShell } from "../PlaceFormShell";
import { Place } from "../../../redux/slices/placeSlice";
import { selectApiCreatePlaceStatus } from "../../../redux/slices/api/apiPlaceSlice";
import { SectionLoader } from "../../commons/SectionLoader";
import { PageLoader } from "../../commons/PageLoader";
import { AvailabilityForm } from "../../app-commons/AvailabilityForm";

interface Props {
  pageIndex: number;
  onClickNext: () => void;
  newPlace: Place;
}

export const DetailForm: React.FC<Props> = ({
  pageIndex,
  onClickNext,
  newPlace,
}) => {
  const dispatch = useAppDispatch();
  const apiStatusCreatePlace = useAppSelector(selectApiCreatePlaceStatus);

  /**
   * User Interface
   */
  const onChangePlaceType = (placeType: string) => {
    dispatch(changePlaceType({ placeType }));
  };

  const onClickSwitch = (item: string) => {
    dispatch(toggleAvailabilityOfPlace({ item }));
  };

  const handleClickSubmit = () => {
    onClickNext();
  };

  /**
   * Render
   */

  return (
    <PlaceFormShell
      pageIndex={pageIndex}
      pageLabel="2. Please tell us more about the place."
      buttonText="Submit"
      buttonDisabled={apiStatusCreatePlace.status === cons.API_LOADING}
      onClickSubmit={handleClickSubmit}
    >
      <SectionLoader
        visible={apiStatusCreatePlace.status === cons.API_LOADING}
      />

      <AvailabilityForm
        placeType={newPlace.placeType}
        availability={newPlace.availability}
        onChangePlaceType={onChangePlaceType}
        onClickSwitch={onClickSwitch}
      />

      <PageLoader
        visible={apiStatusCreatePlace.status === cons.API_LOADING}
        message="Adding Place"
      />
    </PlaceFormShell>
  );
};
