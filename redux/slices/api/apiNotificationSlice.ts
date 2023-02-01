import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CallError } from "../../../calls/Types";
import { RootState } from "../../store";
import * as cons from "../../../constants";
import { ERR_SOMETHING } from "../../../modules/ErrorCode";
import { NotificationWithData } from "../notificationSlice";
import {
  callFetchLatestNotifications,
  callFetchNotificationUnseenCnt,
} from "../../../calls/notificationCalls";

/**
 * Types
 */

interface ApiStatus {
  status: string;
  error: string;
}

interface ApiState {
  // user auth
  apiFetchLatestNotificationsStatus: ApiStatus;
}

/**
 * Reducer
 */

const initialApiState = {
  status: cons.API_IDLE,
  error: "",
};

const initialState: ApiState = {
  apiFetchLatestNotificationsStatus: initialApiState,
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    initApiFetchLatestNotificationsState: (state) => {
      state.apiFetchLatestNotificationsStatus.status = cons.API_IDLE;
      state.apiFetchLatestNotificationsStatus.error = "";
    },
  },
  extraReducers: (builder) => {
    // CreatePlace

    // FetchPlace
    builder.addCase(apiFetchLatestNotifications.pending, (state, action) => {
      state.apiFetchLatestNotificationsStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiFetchLatestNotifications.fulfilled, (state, action) => {
      state.apiFetchLatestNotificationsStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiFetchLatestNotifications.rejected, (state, action) => {
      state.apiFetchLatestNotificationsStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiFetchLatestNotificationsStatus.error = action.payload.message;
      } else {
        state.apiFetchLatestNotificationsStatus.error =
          action.error.message || "";
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

export const apiFetchLatestNotifications = createAsyncThunk<
  { latestNotifications: NotificationWithData[] }, // Return type of the payload creator
  { pageIndex: number }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("Notification/FetchLatestNotifications", async ({ pageIndex }, thunkApi) => {
  try {
    const { latestNotifications } = await callFetchLatestNotifications(
      pageIndex
    );
    return { latestNotifications };
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

export const apiFetchNotificationUnseenCnt = createAsyncThunk<
  { unseenCnt: number }, // Return type of the payload creator
  {}, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("Notification/FetchNotificationUnseenCnt", async (_, thunkApi) => {
  try {
    const { unseenCnt } = await callFetchNotificationUnseenCnt();
    return { unseenCnt };
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

export const { initApiFetchLatestNotificationsState } = apiSlice.actions;

/**
 * Selectors
 */

export const selectApiFetchLatestNotificationsStatus = (
  state: RootState
): ApiStatus => state.apiNotification.apiFetchLatestNotificationsStatus;

/**
 * Export actions & reducer
 */

export default apiSlice.reducer;
