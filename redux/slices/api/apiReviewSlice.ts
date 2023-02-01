import { callFetchReviews, callVoteReview } from "./../../../calls/reviewCall";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CallError } from "../../../calls/Types";
import { RootState } from "../../store";
import * as cons from "../../../constants";
import { ERR_SOMETHING } from "../../../modules/ErrorCode";
import { callDeleteReview, callPostReview } from "../../../calls/reviewCall";
import { Review, ReviewWithData, ReviewWithPlaceData } from "../placeSlice";
import { showPointEarned } from "../uiSlice";

/**
 * Types
 */

interface ApiStatus {
  status: string;
  error: string;
  requestId: string;
}

interface ApiState {
  // user auth
  apiPostReviewStatus: ApiStatus;
  apiDeleteReviewStatus: ApiStatus;
  apiFetchReviewsStatus: ApiStatus;
  apiVoteReviewStatus: ApiStatus;
}

/**
 * Reducer
 */

const initialApiState = {
  status: cons.API_IDLE,
  error: "",
  requestId: "",
};

const initialState: ApiState = {
  apiPostReviewStatus: initialApiState,
  apiDeleteReviewStatus: initialApiState,
  apiFetchReviewsStatus: initialApiState,
  apiVoteReviewStatus: initialApiState,
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    initApiPostReviewState: (state) => {
      state.apiPostReviewStatus.status = cons.API_IDLE;
      state.apiPostReviewStatus.error = "";
    },
    initApiFetchReviewsState: (state) => {
      state.apiFetchReviewsStatus.status = cons.API_IDLE;
      state.apiFetchReviewsStatus.error = "";
    },
  },
  extraReducers: (builder) => {
    // PostReview
    builder.addCase(apiPostReview.pending, (state, action) => {
      state.apiPostReviewStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiPostReview.fulfilled, (state, action) => {
      state.apiPostReviewStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiPostReview.rejected, (state, action) => {
      state.apiPostReviewStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiPostReviewStatus.error = action.payload.message;
      } else {
        state.apiPostReviewStatus.error = action.error.message || "";
      }
    });

    // DeleteReview
    builder.addCase(apiDeleteReview.pending, (state, action) => {
      state.apiDeleteReviewStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiDeleteReview.fulfilled, (state, action) => {
      state.apiDeleteReviewStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiDeleteReview.rejected, (state, action) => {
      state.apiDeleteReviewStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiDeleteReviewStatus.error = action.payload.message;
      } else {
        state.apiDeleteReviewStatus.error = action.error.message || "";
      }
    });

    // FetchReviews
    builder.addCase(apiFetchReviews.pending, (state, action) => {
      state.apiFetchReviewsStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiFetchReviews.fulfilled, (state, action) => {
      state.apiFetchReviewsStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiFetchReviews.rejected, (state, action) => {
      state.apiFetchReviewsStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiFetchReviewsStatus.error = action.payload.message;
      } else {
        state.apiFetchReviewsStatus.error = action.error.message || "";
      }
    });

    // Vote Review
    builder.addCase(apiVoteReview.pending, (state, action) => {
      state.apiVoteReviewStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiVoteReview.fulfilled, (state, action) => {
      state.apiVoteReviewStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiVoteReview.rejected, (state, action) => {
      state.apiVoteReviewStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiVoteReviewStatus.error = action.payload.message;
      } else {
        state.apiVoteReviewStatus.error = action.error.message || "";
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

// apiPostReview

export const apiPostReview = createAsyncThunk<
  {
    reviewWithData: ReviewWithData;
    placeId: string;
    reviewStars: number;
    isNew: boolean;
  }, // Return type of the payload creator
  { placeId: string; stars: number; comment: string; isNew: boolean }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("review/PostReview", async ({ placeId, stars, comment, isNew }, thunkApi) => {
  try {
    const { reviewWithData, reviewStars, addingPoint, totalPoint } =
      await callPostReview(placeId, stars, comment);

    if (addingPoint > 0) {
      thunkApi.dispatch(showPointEarned({ addingPoint, totalPoint }));
    }

    return { reviewWithData, placeId, reviewStars, isNew };
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

// apiDeleteReview

export const apiDeleteReview = createAsyncThunk<
  {
    reviewStars: number;
    placeId: string;
    reviewId: string;
  }, // Return type of the payload creator
  { reviewId: string; placeId: string }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("review/DeleteReview", async ({ reviewId, placeId }, thunkApi) => {
  try {
    const { reviewStars } = await callDeleteReview(reviewId, placeId);
    return { reviewStars, placeId, reviewId };
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

// apiFetchReviews

export const apiFetchReviews = createAsyncThunk<
  {
    reviews: ReviewWithPlaceData[];
  }, // Return type of the payload creator
  { userId: string; loadedCnt: number; loadingCnt: number; latest?: boolean }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("review/FetchReviews", async (params, thunkApi) => {
  try {
    const data = await callFetchReviews(params);
    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

// apiVoteReview

export const apiVoteReview = createAsyncThunk<
  {
    reviewWithData: ReviewWithData;
  }, // Return type of the payload creator
  { reviewId: string; isUpvote: boolean; userId: string; clearVote: boolean }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("review/VoteReview", async (params, thunkApi) => {
  try {
    const data = await callVoteReview(params);
    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

export const { initApiPostReviewState, initApiFetchReviewsState } =
  apiSlice.actions;

/**
 * Selectors
 */

export const selectApiPostReviewStatus = (state: RootState): ApiStatus =>
  state.apiReview.apiPostReviewStatus;

export const selectApiDeleteReviewStatus = (state: RootState): ApiStatus =>
  state.apiReview.apiDeleteReviewStatus;

export const selectApiFetchReviewsStatus = (state: RootState): ApiStatus =>
  state.apiReview.apiFetchReviewsStatus;

export const selectApiVoteReviewStatus = (state: RootState): ApiStatus =>
  state.apiReview.apiVoteReviewStatus;

/**
 * Export actions & reducer
 */

export default apiSlice.reducer;
