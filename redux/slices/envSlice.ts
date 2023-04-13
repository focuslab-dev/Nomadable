import { callFetchEnvVariables } from "../../calls/envCalls";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { CallError } from "../../calls/Types";
import { ERR_SOMETHING } from "../../modules/ErrorCode";

/**
 * Types
 */

interface EnvState {
  gapiClientId: string;
  mapboxAccessToken: string;
  speedOfMeAccountCode: string;
  gaMeasurementId: string;
  mapboxStyleUrl: string;
}

/**
 * Reducer
 */

const initialState: EnvState = {
  gapiClientId: "",
  mapboxAccessToken: "",
  speedOfMeAccountCode: "",
  gaMeasurementId: "",
  mapboxStyleUrl: "",
};

const envSlice = createSlice({
  name: "env",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(apiFetchEnvVariables.fulfilled, (state, action) => {
      state.gapiClientId = action.payload.gapiClientId;
      state.mapboxAccessToken = action.payload.mapboxAccessToken;
      state.speedOfMeAccountCode = action.payload.speedOfMeAccountCode;
      state.gaMeasurementId = action.payload.gaMeasurementId;
      state.mapboxStyleUrl = action.payload.mapboxStyleUrl;
    });
  },
});

export const {} = envSlice.actions;

/**
 * Actions
 */
const unknownError = {
  response: {
    data: ERR_SOMETHING,
  },
};

export const apiFetchEnvVariables = createAsyncThunk<
  {
    gapiClientId: string;
    mapboxAccessToken: string;
    speedOfMeAccountCode: string;
    gaMeasurementId: string;
    mapboxStyleUrl: string;
  }, // Return type of the payload creator
  {}, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("env/FetchEnvVariables", async ({}, thunkApi) => {
  try {
    const { data } = await callFetchEnvVariables();
    if (!data) throw unknownError;

    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

/**
 * Selectors
 */

export const selectMapboxAccessToken = (state: RootState): string =>
  state.env.mapboxAccessToken;

export const selectSpeedOfMeAccountCode = (state: RootState): string =>
  state.env.speedOfMeAccountCode;

export const selectGapiClientId = (state: RootState): string =>
  state.env.gapiClientId;

export const selectGaMeasurementId = (state: RootState): string =>
  state.env.gaMeasurementId;

export const selectMapboxStyleUrl = (state: RootState): string =>
  state.env.mapboxStyleUrl;

/**
 * Export actions & reducer
 */

export default envSlice.reducer;
