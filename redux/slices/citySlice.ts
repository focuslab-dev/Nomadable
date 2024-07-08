// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { RootState } from "../store";
// import { CityWithData } from "../../data/articles/cities";
// import { apiFetchCitiesWithData } from "./api/apiCitySlice";

// /**
//  * Types
//  */

// interface CityState {
//   citiesWithData: CityWithData[];
//   totalPlaceCnt: number;
// }

// /**
//  * Reducer
//  */

// const initialState: CityState = {
//   citiesWithData: [],
//   totalPlaceCnt: 0,
// };

// const citySlice = createSlice({
//   name: "citiesWithData",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder.addCase(apiFetchCitiesWithData.fulfilled, (state, action) => {
//       state.citiesWithData = action.payload.citiesWithData;
//       state.totalPlaceCnt = action.payload.totalPlaceCnt;
//     });
//   },
// });

// export const {} = citySlice.actions;

// /**
//  * Selectors
//  */

// export const selectCitiesWithData = (state: RootState): CityWithData[] =>
//   state.city.citiesWithData;

// export const selectTotalPlaceCnt = (state: RootState): number =>
//   state.city.totalPlaceCnt;

// /**
//  * Export actions & reducer
//  */

// export default citySlice.reducer;
