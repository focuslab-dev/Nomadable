import {
  apiFetchSpotInfo,
  apiFetchSpotsByText,
  initialCoordinates,
  SpotPrediction,
} from "./api/apiSpotSlice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { Place, initialPlace, Spot } from "./placeSlice";
import { apiCreatePlace } from "./api/apiPlaceSlice";

/**
 * Types
 */

interface NewPlaceState {
  newPlace: Place;
  placeSearchResult: SpotPrediction[];
}

/**
 * Reducer
 */

const initialState: NewPlaceState = {
  newPlace: initialPlace,
  placeSearchResult: [],
};

const placeSlice = createSlice({
  name: "newPlace",
  initialState,
  reducers: {
    setSpotNameToNewPlace: (
      state,
      action: PayloadAction<{ spot: SpotPrediction }>
    ) => {
      state.newPlace.googlePlaceId = action.payload.spot.placeId;
      state.newPlace.spotName = action.payload.spot.mainText;
      state.newPlace.spotAddress = action.payload.spot.secondaryText;
    },

    clearPlaceInfoOfNewPlace: (state) => {
      state.newPlace = initialPlace;
    },

    toggleAvailabilityOfPlace: (
      state,
      action: PayloadAction<{ item: string }>
    ) => {
      if (state.newPlace.availability.includes(action.payload.item)) {
        state.newPlace.availability = state.newPlace.availability.filter(
          (a) => a !== action.payload.item
        );
      } else {
        state.newPlace.availability.push(action.payload.item);
      }
    },

    changePlaceType: (state, action: PayloadAction<{ placeType: string }>) => {
      state.newPlace.placeType = action.payload.placeType;
      state.newPlace.availability = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(apiFetchSpotsByText.fulfilled, (state, action) => {
      state.placeSearchResult = action.payload.spotPredictions;
    });
    builder.addCase(apiFetchSpotInfo.fulfilled, (state, action) => {
      state.newPlace = {
        ...state.newPlace,
        location: action.payload.spot.location,
        country: action.payload.spot.country,
      };
    });
    builder.addCase(apiCreatePlace.fulfilled, (state, action) => {
      state.newPlace.id = action.payload.placeId;
    });
  },
});

export const {
  setSpotNameToNewPlace,
  clearPlaceInfoOfNewPlace,
  toggleAvailabilityOfPlace,
  changePlaceType,
} = placeSlice.actions;

/**
 * Selectors
 */

export const selectNewPlace = (state: RootState): Place =>
  state.newPlace.newPlace;

export const selectPlaceSearchResult = (state: RootState): SpotPrediction[] =>
  state.newPlace.placeSearchResult;

/**
 * Export actions & reducer
 */

export default placeSlice.reducer;
