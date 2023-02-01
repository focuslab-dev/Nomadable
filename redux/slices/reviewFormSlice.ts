import { apiDeleteReview, apiPostReview } from "./api/apiReviewSlice";
import { NOTIFICATION_SUCCEED } from "./../../constants";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import * as cons from "../../constants";

/**
 * Types
 */

interface ReviewFormState {
  reviewId: string;
  visible: boolean;
  placeId: string;
  stars: number;
  comment: string;
}

/**
 * Reducer
 */

const initialState: ReviewFormState = {
  reviewId: "",
  visible: false,
  placeId: "",
  stars: 0,
  comment: "",
};

const reviewFormSlice = createSlice({
  name: "reviewForm",
  initialState,
  reducers: {
    openNewReviewForm: (state, action: PayloadAction<{ placeId: string }>) => {
      state.visible = true;
      state.reviewId = "";
      if (state.placeId !== action.payload.placeId) {
        state.placeId = action.payload.placeId;
        state.comment = "";
        state.stars = 0;
      }
    },
    openEditReviewForm: (
      state,
      action: PayloadAction<{
        reviewId: string;
        placeId: string;
        stars: number;
        comment: string;
      }>
    ) => {
      state.visible = true;
      if (state.reviewId !== action.payload.reviewId) {
        state.reviewId = action.payload.reviewId;
        state.placeId = action.payload.placeId;
        state.stars = action.payload.stars;
        state.comment = action.payload.comment;
      }
    },

    hideReviewModal: (state) => {
      state.visible = false;
    },

    updateReviewForm: (
      state,
      action: PayloadAction<{ stars: number; comment: string }>
    ) => {
      state.stars = action.payload.stars;
      state.comment = action.payload.comment;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(apiPostReview.fulfilled, (state, action) => {
      state.visible = false;
    });
    builder.addCase(apiDeleteReview.fulfilled, (state, action) => {
      state.visible = false;
      state.comment = "";
      state.stars = 0;
    });
  },
});

export const {
  openNewReviewForm,
  openEditReviewForm,
  hideReviewModal,
  updateReviewForm,
} = reviewFormSlice.actions;

/**
 * Selectors
 */

export const selectReviewFormState = (state: RootState): ReviewFormState => {
  return state.reviewForm;
};

/**
 * Export actions & reducer
 */

export default reviewFormSlice.reducer;
