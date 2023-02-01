import { NOTIFICATION_SUCCEED } from "./../../constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import * as cons from "../../constants";

/**
 * Types
 */

interface NotificationState {
  timestamp: number;
  type: string;
  message: string;
  seconds: number;
}

interface UiState {
  notification: NotificationState;
  visibleModal: {
    modalId: string;
    referenceId: string;
  };
  pointEarned: {
    updated: number;
    addingPoint: number;
    totalPoint: number;
  };
  spinner: {
    visible: boolean;
    message: string;
  };
}

/**
 * Reducer
 */

const initialNotification: NotificationState = {
  timestamp: 0,
  type: cons.NOTIFICATION_SUCCEED,
  message: "",
  seconds: 0,
};

const initialState: UiState = {
  notification: initialNotification,
  visibleModal: {
    modalId: "",
    referenceId: "",
  },
  pointEarned: {
    updated: 0,
    addingPoint: 0,
    totalPoint: 0,
  },
  spinner: {
    visible: false,
    message: "",
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // Show Notification
    showNotification: (
      state,
      action: PayloadAction<{ type: string; message: string; seconds: number }>
    ) => {
      state.notification.timestamp = Date.now();
      state.notification.type = action.payload.type;
      state.notification.message = action.payload.message;
      state.notification.seconds = action.payload.seconds;
    },
    // Update Visible Modal
    updateVisibleModal: (
      state,
      action: PayloadAction<{ id: string; referenceId?: string }>
    ) => {
      state.visibleModal.modalId = action.payload.id;
      state.visibleModal.referenceId = action.payload.referenceId || "";
    },
    closeModalGlobal: (state) => {
      state.visibleModal.modalId = "";
      state.visibleModal.referenceId = "";
    },
    showPointEarned: (
      state,
      action: PayloadAction<{
        addingPoint: number;
        totalPoint: number;
      }>
    ) => {
      state.pointEarned.updated = Date.now();
      state.pointEarned.addingPoint = action.payload.addingPoint;
      state.pointEarned.totalPoint = action.payload.totalPoint;
    },
    showSpinner: (state, action: PayloadAction<{ message: string }>) => {
      state.spinner.visible = true;
      state.spinner.message = action.payload.message;
    },
    hideSpinner: (state) => {
      state.spinner.visible = false;
      state.spinner.message = "";
    },
  },
});

export const {
  showNotification,
  updateVisibleModal,
  showPointEarned,
  closeModalGlobal,
  showSpinner,
  hideSpinner,
} = uiSlice.actions;

/**
 * Selectors
 */

export const selectNotificationState = (state: RootState): NotificationState =>
  state.ui.notification;

export const selectVisibleModal = (
  state: RootState
): { modalId: string; referenceId: string } => state.ui.visibleModal;

export const selectPointEarned = (
  state: RootState
): { updated: number; addingPoint: number; totalPoint: number } =>
  state.ui.pointEarned;

export const selectSpinner = (
  state: RootState
): { visible: boolean; message: string } => state.ui.spinner;

/**
 * Export actions & reducer
 */

export default uiSlice.reducer;
