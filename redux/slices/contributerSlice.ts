import {
  apiFetchContributers,
  apiFetchContributersArea,
} from "./api/apiUserSlice";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

/**
 * Types
 */

export interface Contributer {
  userId: string;
  name: string;
  picture: string;
  title: string;
  point: number;
}

interface ContributerState {
  contributers: Contributer[];
  contributersArea: Contributer[];
}

/**
 * Reducer
 */

const initialState: ContributerState = {
  contributers: [],
  contributersArea: [],
};

const contributerSlice = createSlice({
  name: "newPlace",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(apiFetchContributers.fulfilled, (state, action) => {
      state.contributers = action.payload.contributers;
    });
    builder.addCase(apiFetchContributersArea.fulfilled, (state, action) => {
      state.contributersArea = action.payload.contributers;
    });
  },
});

export const {} = contributerSlice.actions;

/**
 * Selectors
 */

export const selectContributers = (state: RootState): Contributer[] =>
  state.contributer.contributers;

export const selectContributersArea = (state: RootState): Contributer[] =>
  state.contributer.contributersArea;

/**
 * Export actions & reducer
 */

export default contributerSlice.reducer;
