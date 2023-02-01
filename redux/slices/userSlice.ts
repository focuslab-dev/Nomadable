import { API_FALIED, API_SUCCEEDED } from "./../../constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AppDispatch, RootState } from "../store";
import {
  apiFetchMyAccountWithStats,
  apiFetchUser,
  apiFetchUserWithStats,
  apiUpdateUser,
} from "./api/apiUserSlice";
import { Place, Review, ReviewWithPlaceData } from "./placeSlice";
import { apiFetchDiscoveredPlaces } from "./api/apiPlaceSlice";
import { apiFetchReviews } from "./api/apiReviewSlice";

/**
 * Types
 */

export interface EditableUser {
  id: string;
  email: string;
  name: string;
  picture: string;
  title: string;
  description: string;
  link: string;
}

export interface User extends EditableUser {
  _id: string;
  password: string;
  salt: string;
  subscriber: string;
  verified: boolean;
  admin: boolean;
  deletedDate: Date | null;
  created: Date | undefined;
}

export interface UserWithStats {
  _id: string;
  id: string;
  email: string;
  name: string;
  picture: string;
  title: string;
  description: string;
  link: string;
  created: Date | undefined;
  // outer data
  points: number;
  ranking: number;
  discovered: number;
  reviews: number;
  checkIns: number;
}

interface UserState {
  user: User;
  userWithStatsMine: UserWithStats;
  userWithStats: UserWithStats;
  discoveredPlaces: Place[];
  reviews: ReviewWithPlaceData[];
}

/**
 * Reducer
 */

export const initialUser: User = {
  _id: "",
  id: "",
  email: "",
  name: "test user",
  picture: "",
  title: "",
  description: "",
  link: "",
  password: "",
  salt: "",
  subscriber: "",
  verified: false,
  admin: false,
  deletedDate: null,
  created: undefined,
};

export const initialUserWithStats: UserWithStats = {
  _id: "",
  id: "",
  email: "",
  name: "",
  picture: "",
  title: "",
  description: "",
  link: "",
  created: undefined,
  // outer data
  points: 0,
  ranking: 0,
  discovered: 0,
  reviews: 0,
  checkIns: 0,
};

const initialState: UserState = {
  user: initialUser,
  userWithStatsMine: initialUserWithStats,
  userWithStats: initialUserWithStats,
  discoveredPlaces: [],
  reviews: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // Fetch User
    updateUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user;
    },
    initUserWithStats: (state) => {
      state.userWithStats = initialUserWithStats;
    },
    initDiscoveredAndReviews: (state) => {
      state.discoveredPlaces = [];
      state.reviews = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(apiFetchUser.fulfilled, (state, action) => {
      state.user = action.payload.user;
    });
    builder.addCase(apiFetchMyAccountWithStats.fulfilled, (state, action) => {
      state.userWithStatsMine = action.payload.userWithStats;
    });
    builder.addCase(apiFetchUserWithStats.fulfilled, (state, action) => {
      state.userWithStats = action.payload.userWithStats;
    });
    builder.addCase(apiUpdateUser.fulfilled, (state, action) => {
      state.userWithStatsMine = {
        ...state.userWithStatsMine,
        ...action.payload.editableUser,
      };
      state.user = {
        ...state.user,
        ...action.payload.editableUser,
      };
    });
    builder.addCase(apiFetchDiscoveredPlaces.fulfilled, (state, action) => {
      const existingPlaceIds = state.discoveredPlaces.map((pl) => pl.id);
      const newPlaces = action.payload.places.filter(
        (pl) => !existingPlaceIds.includes(pl.id)
      );
      state.discoveredPlaces = [...state.discoveredPlaces, ...newPlaces];
    });
    builder.addCase(apiFetchReviews.fulfilled, (state, action) => {
      const existingReviewIds = state.reviews.map((rv) => rv._id);
      const newReviews = action.payload.reviews.filter(
        (rv) => !existingReviewIds.includes(rv._id)
      );
      state.reviews = [...state.reviews, ...newReviews];
    });
  },
});

export const { updateUser, initUserWithStats, initDiscoveredAndReviews } =
  userSlice.actions;

/**
 * Selectors
 */

export const selectUser = (state: RootState): User => state.user.user;

export const selectAuthenticated = (state: RootState): boolean | undefined => {
  if (state.apiUser.apiFetchUserStatus.status === API_FALIED) return false;

  if (state.apiUser.apiFetchUserStatus.status !== API_SUCCEEDED)
    return undefined;
  return state.user.user._id !== "";
};

export const selectMyAccountWithStats = (state: RootState): UserWithStats =>
  state.user.userWithStatsMine;

export const selectUserWithStats = (state: RootState): UserWithStats =>
  state.user.userWithStats;

export const selectDiscoveredPlaces = (state: RootState): Place[] =>
  state.user.discoveredPlaces;

export const selectUserReviews = (state: RootState): ReviewWithPlaceData[] =>
  state.user.reviews;

/**
 * Export actions & reducer
 */

export default userSlice.reducer;
