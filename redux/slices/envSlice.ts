import { callFetchMapBoxAccessToken } from "./../../calls/mapboxCalls";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { CallError } from "../../calls/Types";
import { ERR_SOMETHING } from "../../modules/ErrorCode";

/**
 * Types
 */

interface EnvState {
  mapboxAccessToken: string;
}

/**
 * Reducer
 */

const initialState: EnvState = {
  mapboxAccessToken: "",
};

const envSlice = createSlice({
  name: "env",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(apiFetchMapboxAccessToken.fulfilled, (state, action) => {
      state.mapboxAccessToken = action.payload.mapboxAccessToken;
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

export const apiFetchMapboxAccessToken = createAsyncThunk<
  {
    mapboxAccessToken: string;
  }, // Return type of the payload creator
  {}, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("env/FetchMapboxAccessToken", async ({}, thunkApi) => {
  try {
    const { data } = await callFetchMapBoxAccessToken();
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

/**
 * Export actions & reducer
 */

export default envSlice.reducer;
