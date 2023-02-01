import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CallError } from "../../../calls/Types";
import { RootState } from "../../store";
import * as cons from "../../../constants";
import { ERR_SOMETHING } from "../../../modules/ErrorCode";
import { EventWithData } from "../eventSlice";
import { callFetchLatestEvents } from "../../../calls/eventCalls";
import { CheckInHistoryItem } from "../checkInSlice";
import { callCheckInHistory } from "../../../calls/checkInCalls";

/**
 * Types
 */

interface ApiStatus {
  status: string;
  error: string;
}

interface ApiState {
  // user auth
  apiFetchCheckInHistory: ApiStatus;
}

/**
 * Reducer
 */

const initialApiState = {
  status: cons.API_IDLE,
  error: "",
};

const initialState: ApiState = {
  apiFetchCheckInHistory: initialApiState,
};

const apiCheckInSlice = createSlice({
  name: "apiCheckIn",
  initialState,
  reducers: {
    initApiFetchCheckInHistoryState: (state) => {
      state.apiFetchCheckInHistory.status = cons.API_IDLE;
      state.apiFetchCheckInHistory.error = "";
    },
  },
  extraReducers: (builder) => {
    // CreatePlace

    // FetchPlace
    builder.addCase(apiFetchCheckInHistory.pending, (state, action) => {
      state.apiFetchCheckInHistory.status = cons.API_LOADING;
    });
    builder.addCase(apiFetchCheckInHistory.fulfilled, (state, action) => {
      state.apiFetchCheckInHistory.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiFetchCheckInHistory.rejected, (state, action) => {
      state.apiFetchCheckInHistory.status = cons.API_FALIED;
      if (action.payload) {
        state.apiFetchCheckInHistory.error = action.payload.message;
      } else {
        state.apiFetchCheckInHistory.error = action.error.message || "";
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

export const apiFetchCheckInHistory = createAsyncThunk<
  { checkInHistory: CheckInHistoryItem[] }, // Return type of the payload creator
  { pageIndex: number }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("checkin/FetchCheckInHistory", async ({ pageIndex }, thunkApi) => {
  try {
    const { checkInHistory } = await callCheckInHistory(pageIndex);

    return { checkInHistory };
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

export const { initApiFetchCheckInHistoryState } = apiCheckInSlice.actions;

/**
 * Selectors
 */

export const selectApiFetchCheckInHistoryStatus = (
  state: RootState
): ApiStatus => state.apiCheckIn.apiFetchCheckInHistory;

/**
 * Export actions & reducer
 */

export default apiCheckInSlice.reducer;
