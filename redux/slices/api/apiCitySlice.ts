import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CallError } from "../../../calls/Types";
import { RootState } from "../../store";
import * as cons from "../../../constants";
import { ERR_SOMETHING } from "../../../modules/ErrorCode";
import { CITIES, CityWithData } from "../../../data/articles/cities";
import { callFetchCitiesWithData } from "../../../calls/placeCalls";

/**
 * Types
 */

interface ApiStatus {
  status: string;
  error: string;
}

interface ApiState {
  // user auth
  apiFetchCitiesWithData: ApiStatus;
}

/**
 * Reducer
 */

const initialApiState = {
  status: cons.API_IDLE,
  error: "",
};

const initialState: ApiState = {
  apiFetchCitiesWithData: initialApiState,
};

const apiCheckInSlice = createSlice({
  name: "apiCity",
  initialState,
  reducers: {
    initApiFetchCitiesWithDataStatus: (state) => {
      state.apiFetchCitiesWithData.status = cons.API_IDLE;
      state.apiFetchCitiesWithData.error = "";
    },
  },
  extraReducers: (builder) => {
    // CreatePlace

    // FetchPlace
    builder.addCase(apiFetchCitiesWithData.pending, (state, action) => {
      state.apiFetchCitiesWithData.status = cons.API_LOADING;
    });
    builder.addCase(apiFetchCitiesWithData.fulfilled, (state, action) => {
      state.apiFetchCitiesWithData.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiFetchCitiesWithData.rejected, (state, action) => {
      state.apiFetchCitiesWithData.status = cons.API_FALIED;
      if (action.payload) {
        state.apiFetchCitiesWithData.error = action.payload.message;
      } else {
        state.apiFetchCitiesWithData.error = action.error.message || "";
      }
    });
  },
});

/**
 * Async Thunk
 */

const unknownError = {
  response: {
    data: ERR_SOMETHING,
  },
};

export const apiFetchCitiesWithData = createAsyncThunk<
  { citiesWithData: CityWithData[]; totalPlaceCnt: number }, // Return type of the payload creator
  {}, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("city/FetchCitiesWithData", async ({}, thunkApi) => {
  try {
    const { citiesWithData, totalPlaceCnt } = await callFetchCitiesWithData(
      CITIES
    );

    return { citiesWithData, totalPlaceCnt };
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

export const { initApiFetchCitiesWithDataStatus } = apiCheckInSlice.actions;

/**
 * Selectors
 */

export const selectApiFetchCheckInHistoryStatus = (
  state: RootState
): ApiStatus => state.apiCity.apiFetchCitiesWithData;

/**
 * Export actions & reducer
 */

export default apiCheckInSlice.reducer;
