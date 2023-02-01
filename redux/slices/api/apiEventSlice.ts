import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CallError } from "../../../calls/Types";
import { RootState } from "../../store";
import * as cons from "../../../constants";
import { ERR_SOMETHING } from "../../../modules/ErrorCode";
import { EventWithData } from "../eventSlice";
import { callFetchLatestEvents } from "../../../calls/eventCalls";

/**
 * Types
 */

interface ApiStatus {
  status: string;
  error: string;
}

interface ApiState {
  // user auth
  apiFetchLatestEventsStatus: ApiStatus;
}

/**
 * Reducer
 */

const initialApiState = {
  status: cons.API_IDLE,
  error: "",
};

const initialState: ApiState = {
  apiFetchLatestEventsStatus: initialApiState,
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    initApiFetchLatestEventsState: (state) => {
      state.apiFetchLatestEventsStatus.status = cons.API_IDLE;
      state.apiFetchLatestEventsStatus.error = "";
    },
  },
  extraReducers: (builder) => {
    // CreatePlace

    // FetchPlace
    builder.addCase(apiFetchLatestEvents.pending, (state, action) => {
      state.apiFetchLatestEventsStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiFetchLatestEvents.fulfilled, (state, action) => {
      state.apiFetchLatestEventsStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiFetchLatestEvents.rejected, (state, action) => {
      state.apiFetchLatestEventsStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiFetchLatestEventsStatus.error = action.payload.message;
      } else {
        state.apiFetchLatestEventsStatus.error = action.error.message || "";
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

export const apiFetchLatestEvents = createAsyncThunk<
  { latestEvents: EventWithData[] }, // Return type of the payload creator
  { pageIndex: number }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("event/FetchLatestEvents", async ({ pageIndex }, thunkApi) => {
  try {
    const { latestEvents } = await callFetchLatestEvents(pageIndex);
    return { latestEvents };
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

export const { initApiFetchLatestEventsState } = apiSlice.actions;

/**
 * Selectors
 */

export const selectApiFetchLatestEventsStatus = (state: RootState): ApiStatus =>
  state.apiEvent.apiFetchLatestEventsStatus;

/**
 * Export actions & reducer
 */

export default apiSlice.reducer;
