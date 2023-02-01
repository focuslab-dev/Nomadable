import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import * as cons from "../../constants";
import {
  apiFetchLatestNotifications,
  apiFetchNotificationUnseenCnt,
} from "./api/apiNotificationSlice";

/**
 * Types
 */

export interface Notification {
  _id?: string;
  notifyTo: string;
  userId: string;
  title: string;
  timestamp: number;
  placeId: string;
  body: string;
  isOfficial: boolean;
  notificationType: string;
  seen: boolean;
}

export interface NotificationWithData extends Notification {
  // user
  userPicture: string;
  userSubId: string;
  // place
  placePictures: string[];
  placeType: string;
  placeName: string;
  placeAddress: string;
}

interface NotificationState {
  latestNotifications: NotificationWithData[];
  unseenCnt: number;
}

/**
 * Reducer
 */

const initialState: NotificationState = {
  latestNotifications: [],
  unseenCnt: 0,
};

const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    initLatestNotifications: (state) => {
      state.latestNotifications = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(apiFetchLatestNotifications.fulfilled, (state, action) => {
      const existingNotificationIds = state.latestNotifications.map(
        (ev) => ev._id
      );
      const newNotifications = action.payload.latestNotifications.filter(
        (ev: any) => !existingNotificationIds.includes(ev._id)
      );
      state.latestNotifications = [
        ...state.latestNotifications,
        ...newNotifications,
      ];
      state.unseenCnt = 0;
    });
    builder.addCase(
      apiFetchNotificationUnseenCnt.fulfilled,
      (state, action) => {
        state.unseenCnt = action.payload.unseenCnt;
      }
    );
  },
});

export const { initLatestNotifications } = NotificationSlice.actions;

/**
 * Selectors
 */

export const selectLatestNotifications = (
  state: RootState
): NotificationWithData[] => state.notification.latestNotifications;

export const selectUnseenNotificationCnt = (state: RootState): number =>
  state.notification.unseenCnt;

/**
 * Export actions & reducer
 */

export default NotificationSlice.reducer;
