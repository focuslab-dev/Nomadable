import { apiFetchCheckInHistory } from "./api/apiCheckInSlice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

/**
 * Types
 */

export interface CheckInHistoryItem {
  _id: string;
  placeId: string;
  checkInTime: string;
  // place info
  placeImage: string;
  placeCountry: string;
  placeName: string;
}

interface CheckInHistoryState {
  checkInHistory: CheckInHistoryItem[];
}

/**
 * Reducer
 */

const initialState: CheckInHistoryState = {
  checkInHistory: [],
};

const checkInHistorySlice = createSlice({
  name: "checkInHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(apiFetchCheckInHistory.fulfilled, (state, action) => {
      // state.checkInHistory = action.payload.checkInHistory;

      const existingCheckInId = state.checkInHistory.map((ch) => ch._id);
      const newCheckIns = action.payload.checkInHistory.filter(
        (ch) => !existingCheckInId.includes(ch._id)
      );

      state.checkInHistory = [...state.checkInHistory, ...newCheckIns];
    });
  },
});

export const {} = checkInHistorySlice.actions;

/**
 * Selectors
 */

export const selectCheckInHistory = (state: RootState): CheckInHistoryItem[] =>
  state.checkIn.checkInHistory;

/**
 * Export actions & reducer
 */

export default checkInHistorySlice.reducer;
