import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import * as cons from "../../constants";
import { apiFetchLatestEvents } from "./api/apiEventSlice";

/**
 * Types
 */

export interface Event {
  _id?: string;
  userId: string;
  title: string;
  timestamp: number;
  placeId: string;
  body: string;
  isOfficial: boolean;
}

export interface EventWithData extends Event {
  // user
  userPicture: string;
  userSubId: string;
  // place
  placePictures: string[];
  placeType: string;
  placeName: string;
  placeAddress: string;
}

interface EventState {
  latestEvents: EventWithData[];
}

/**
 * Reducer
 */

const initialState: EventState = {
  latestEvents: [],
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    initLatestEvents: (state) => {
      state.latestEvents = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(apiFetchLatestEvents.fulfilled, (state, action) => {
      const existingEventIds = state.latestEvents.map((ev) => ev._id);
      const newEvents = action.payload.latestEvents.filter(
        (ev) => !existingEventIds.includes(ev._id)
      );
      state.latestEvents = [...state.latestEvents, ...newEvents];
    });
  },
});

export const { initLatestEvents } = eventSlice.actions;

/**
 * Selectors
 */

export const selectLatestEvents = (state: RootState): EventWithData[] =>
  state.event.latestEvents;

/**
 * Export actions & reducer
 */

export default eventSlice.reducer;
