import React, { useEffect, useState } from "react";
import styled from "styled-components";

import * as cons from "../../../constants";
import { getCurrentLocation } from "../../../modules/Location";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  apiFetchSpotInfo,
  apiFetchSpotsByText,
  initialCoordinates,
  selectApiFetchSpotInfoStatus,
  selectApiFetchSpotsByTextStatus,
  SpotPrediction,
} from "../../../redux/slices/api/apiSpotSlice";
import {
  clearPlaceInfoOfNewPlace,
  selectNewPlace,
  selectPlaceSearchResult,
  setSpotNameToNewPlace,
} from "../../../redux/slices/newPlaceSlice";
import { Place } from "../../../redux/slices/placeSlice";
import { MapWithPin } from "../../commons/MapWithPin";
import { SectionLoader } from "../../commons/SectionLoader";
import { PlaceFormShell } from "../PlaceFormShell";
import { PlaceSearchForm } from "./PlaceSearchForm";

interface Props {
  pageIndex: number;
  onClickNext: () => void;
  newPlace: Place;
}

export const PlaceForm: React.FC<Props> = ({
  pageIndex,
  onClickNext,
  newPlace,
}) => {
  const dispatch = useAppDispatch();
  const placeSearchResult = useAppSelector(selectPlaceSearchResult);
  const apiStatusSearchSpot = useAppSelector(selectApiFetchSpotsByTextStatus);
  const apiStatusFetchSpotInfo = useAppSelector(selectApiFetchSpotInfoStatus);
  const [loadingSpots, setLoadingSpots] = useState(false);

  const searchPlace = async (text: string) => {
    setLoadingSpots(true);
    let location: any = false;
    try {
      location = await getCurrentLocation({ accurate: true, useCache: true });
    } catch (e) {}
    dispatch(apiFetchSpotsByText({ text, location }));
  };

  const selectPlace = (spot: SpotPrediction) => {
    dispatch(setSpotNameToNewPlace({ spot }));
    dispatch(apiFetchSpotInfo({ placeId: spot.placeId }));
  };

  const clearSelectedPlace = () => {
    dispatch(clearPlaceInfoOfNewPlace());
  };

  useEffect(() => {
    if (
      [cons.API_FALIED, cons.API_SUCCEEDED].includes(apiStatusSearchSpot.status)
    ) {
      setLoadingSpots(false);
    }
  }, [apiStatusSearchSpot]);

  return (
    <PlaceFormShell
      pageIndex={pageIndex}
      pageLabel="1. What place are you adding?"
      buttonText="Next"
      buttonDisabled={newPlace.spotName === ""}
      onClickSubmit={onClickNext}
    >
      <SearchFormWrapper>
        {/* <Label>Search Place</Label> */}
        <PlaceSearchForm
          searchPlace={searchPlace}
          placeSearchResult={placeSearchResult}
          selectPlace={selectPlace}
          selectedPlace={{
            googlePlaceId: newPlace.googlePlaceId,
            location: newPlace.location,
            spotName: newPlace.spotName,
            spotAddress: newPlace.spotAddress,
          }}
          clearSelectedPlace={clearSelectedPlace}
          isSearching={loadingSpots}
        />
      </SearchFormWrapper>
      <MapWrapper visible>
        <SectionLoader
          visible={apiStatusFetchSpotInfo.status === cons.API_LOADING}
        />
        <MapWithPin
          interactive={false}
          lat={newPlace.location.coordinates[1]}
          lng={newPlace.location.coordinates[0]}
          mapId="create-place"
          withPin
        />
      </MapWrapper>
    </PlaceFormShell>
  );
};

const SearchFormWrapper = styled.div``;

// const Label = styled.div`
//   font-weight: bold;
//   color: ${cons.FONT_COLOR_NORMAL};
//   margin-bottom: 1rem;
// `;

const MapWrapper = styled.div<{ visible: boolean }>`
  position: relative;
  width: 100%;
  height: 20rem;
  background-color: ${cons.FONT_COLOR_SUPER_LIGHT};
  margin-top: 2rem;
  border-radius: 0.4rem;
  overflow: hidden;

  display: none;
  ${(props) =>
    props.visible &&
    `
    
    display:block;
  `};
`;
