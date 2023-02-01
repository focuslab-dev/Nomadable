import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { ERR_SOMETHING } from "./../../../modules/ErrorCode";
import {
  callFetchSpotInfo,
  callFetchSpotsByText,
} from "./../../../calls/spotCalls";
import { CallError } from "../../../calls/Types";
import { RootState } from "../../store";
import * as cons from "../../../constants";
import { Spot } from "./../placeSlice";

/**
 * Types
 */

interface ApiStatus {
  status: string;
  error: string;
}

interface ApiState {
  apiFetchSpotsByTextStatus: ApiStatus;
  apiFetchSpotInfoStatus: ApiStatus;
}

export interface SpotPrediction {
  placeId: string;
  mainText: string;
  secondaryText: string;
}

/**
 * Reducer
 */

const initialApiState = {
  status: cons.API_IDLE,
  error: "",
};

export const initialCoordinates: [number, number] = [0, 0];

export const initialSpot: Spot = {
  googlePlaceId: "",
  spotName: "",
  spotAddress: "",
  location: { coordinates: initialCoordinates },
};

const initialState: ApiState = {
  apiFetchSpotsByTextStatus: initialApiState,
  apiFetchSpotInfoStatus: initialApiState,
};

const apiSpotSlice = createSlice({
  name: "spiSpot",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // FetchSpotsByText
    builder.addCase(apiFetchSpotsByText.pending, (state, action) => {
      state.apiFetchSpotsByTextStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiFetchSpotsByText.fulfilled, (state, action) => {
      state.apiFetchSpotsByTextStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiFetchSpotsByText.rejected, (state, action) => {
      state.apiFetchSpotsByTextStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiFetchSpotsByTextStatus.error = action.payload.message;
      } else {
        state.apiFetchSpotsByTextStatus.error = action.error.message || "";
      }
    });

    // FetchSpotInfo
    builder.addCase(apiFetchSpotInfo.pending, (state, action) => {
      state.apiFetchSpotInfoStatus.status = cons.API_LOADING;
      state.apiFetchSpotInfoStatus.error = "";
    });
    builder.addCase(apiFetchSpotInfo.fulfilled, (state, action) => {
      state.apiFetchSpotInfoStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiFetchSpotInfo.rejected, (state, action) => {
      state.apiFetchSpotInfoStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiFetchSpotInfoStatus.error = action.payload.message;
      } else {
        state.apiFetchSpotInfoStatus.error = action.error.message || "";
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

// FetchSpotsByText

export const apiFetchSpotsByText = createAsyncThunk<
  {
    spotPredictions: SpotPrediction[];
  }, // Return type of the payload creator
  {
    text: string;
    location: { lat: number; lng: number } | false;
  }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("spot/FetchSpotsByText", async ({ text, location }, thunkApi) => {
  try {
    const { data } = await callFetchSpotsByText(text, location);
    if (!data) throw unknownError;
    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

// FetchPlaceInfo

export const apiFetchSpotInfo = createAsyncThunk<
  {
    spot: Spot;
  }, // Return type of the payload creator
  {
    placeId: string;
  }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("spot/FetchPlaceInfo", async ({ placeId }, thunkApi) => {
  try {
    const { data } = await callFetchSpotInfo(placeId);
    if (!data) throw unknownError;

    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

/**
 * Actions: call ajax & mutate store (only from here)
 */

export const {} = apiSpotSlice.actions;

/**
 * Selectors
 */

export const selectApiFetchSpotsByTextStatus = (state: RootState): ApiStatus =>
  state.apiSpot.apiFetchSpotsByTextStatus;

export const selectApiFetchSpotInfoStatus = (state: RootState): ApiStatus =>
  state.apiSpot.apiFetchSpotInfoStatus;

/**
 * Export actions & reducer
 */

export default apiSpotSlice.reducer;
