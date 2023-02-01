import { initialCoordinates } from "./api/apiSpotSlice";
import { STATUS_OPEN } from "./../../constants";
import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../store";
import * as cons from "../../constants";
import {
  apiChangeStatusOfPlace,
  apiCheckIn,
  apiFetchPlaceForPage,
  apiFetchPlaces,
  apiSavePlace,
  // apiFetchRecentCheckIns,
  apiVoteAvailability,
} from "./api/apiPlaceSlice";
import {
  apiDeleteReview,
  apiPostReview,
  apiVoteReview,
} from "./api/apiReviewSlice";

/**
 * Types
 */

export interface SitemapLink {
  url: string;
  text: string;
}

export interface Spot {
  googlePlaceId: string;
  spotName: string;
  spotAddress: string;
  country?: string;
  location: { coordinates: [number, number] };
}

export interface Place extends Spot {
  id: string;
  placeType: string;
  discoveredBy: string;
  thumbnail: string;
  images: string[];
  speedDown: number;
  speedUp: number;
  testCnt: number;
  availability: string[];
  reviewStars: number;
  status: string;
  created: Date | undefined;
}

export interface PlaceHeader extends Place {
  savedByUser: boolean;
  distance: number | undefined;
}

export interface PlaceUserData {
  userId: string;
  userName: string;
  userPicture: string;
  userDescription: string;
  userTitle: string;
}

export interface PlaceWithData extends Place, PlaceUserData {
  // user
  recentCheckInCnt: number;
  checkedInByUser: boolean;
  // reviews
  reviewsWithData: ReviewWithData[];
  // saved
  savedByUser: boolean;
  checkInUsers: PlaceUserData[];
}

export interface MapArea {
  latStart: number;
  lngStart: number;
  latEnd: number;
  lngEnd: number;
}

export interface FilterObj {
  placeTypes: string[];
  availability: string[];
  saved: boolean;
  sortBy: string;
}

export interface Review {
  _id?: string;
  placeId: string;
  userId: string;
  stars: number;
  comment: string;
  voteScore: number;
  upVoters: string[];
  downVoters: string[];
  created: string;
}

export interface ReviewWithData extends Review {
  userPicture: string;
  userName: string;
  myReview: boolean;
}

export interface ReviewWithPlaceData extends Review {
  placeType: string;
  spotName: string;
  spotAddress: string;
  thumbnail: string;
}

export interface Vote {
  placeType: string;
  availability: string[];
}

export interface Availability {
  userId: string;
  placeId: string;
  vote: Vote;
}

interface PlaceState {
  totalPlaceCnt: number;
  searchResult: PlaceHeader[];
  searchResultHistory: PlaceHeader[];
  searchResultTotalCnt: number;
  recentCheckIns: Place[];
  placeForPage: PlaceWithData;
}

/**
 * Reducer
 */

export const initialFilterObj: FilterObj = {
  placeTypes: [],
  availability: [],
  saved: false,
  sortBy: cons.SORT_BY_REVIEW,
};

export const initialPlace: Place = {
  id: "",
  placeType: cons.PLACE_TYPE_CAFE,
  discoveredBy: "",
  thumbnail: "",
  images: [],
  speedDown: 0,
  speedUp: 0,
  testCnt: 0,
  availability: [],
  reviewStars: 0,
  status: STATUS_OPEN,
  created: undefined,
  googlePlaceId: "",
  spotName: "",
  location: { coordinates: initialCoordinates },
  spotAddress: "",
};

export const initialPlaceWithData: PlaceWithData = {
  ...initialPlace,
  userId: "",
  userName: "",
  userPicture: "",
  userDescription: "",
  userTitle: "",

  recentCheckInCnt: 0,
  checkedInByUser: false,
  reviewsWithData: [],
  savedByUser: false,
  checkInUsers: [],
};

const initialState: PlaceState = {
  totalPlaceCnt: 0,
  searchResult: [],
  searchResultHistory: [],
  searchResultTotalCnt: 0,
  recentCheckIns: [],
  placeForPage: initialPlaceWithData,
};

const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    initPlaceForPage: (state) => {
      state.placeForPage = initialPlaceWithData;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(apiFetchPlaceForPage.fulfilled, (state, action) => {
      state.placeForPage = action.payload.placeWithData;
    });
    builder.addCase(apiFetchPlaces.pending, (state, action) => {
      if (action.meta.arg.filterChanged) {
        state.searchResultHistory = [];
      }
    });
    builder.addCase(apiCheckIn.fulfilled, (state, action) => {
      const {
        checkedInByUser,
        speedDown,
        speedUp,
        recentCheckInCnt,
        checkInUsers,
      } = action.payload.placeWithData;

      state.placeForPage.checkedInByUser = checkedInByUser;
      state.placeForPage.speedDown = speedDown;
      state.placeForPage.speedUp = speedUp;
      state.placeForPage.recentCheckInCnt = recentCheckInCnt;
      state.placeForPage.checkInUsers = checkInUsers;
    });
    builder.addCase(apiFetchPlaces.fulfilled, (state, action) => {
      const existingIds = state.searchResultHistory.map((place) => place.id);
      const newPlaces = action.payload.places.filter(
        (place) => !existingIds.includes(place.id)
      );

      state.searchResultHistory = [
        ...newPlaces,
        ...state.searchResultHistory,
      ].slice(0, 500);

      state.searchResult = action.payload.places;
      state.searchResultTotalCnt = action.payload.totalPlaceCnt;
    });
    // builder.addCase(apiFetchRecentCheckIns.fulfilled, (state, action) => {
    //   state.recentCheckIns = action.payload.recentCheckIns;
    // });
    builder.addCase(apiPostReview.fulfilled, (state, action) => {
      state.placeForPage.reviewStars = action.payload.reviewStars;
      if (action.payload.isNew) {
        state.placeForPage.reviewsWithData.unshift(
          action.payload.reviewWithData
        );
      } else {
        state.placeForPage.reviewsWithData =
          state.placeForPage.reviewsWithData.map((review) => {
            if (!review.myReview) return review;
            return action.payload.reviewWithData;
          });
      }
    });
    builder.addCase(apiDeleteReview.fulfilled, (state, action) => {
      if (state.placeForPage.id === action.payload.placeId) {
        state.placeForPage.reviewStars = action.payload.reviewStars;
        state.placeForPage.reviewsWithData =
          state.placeForPage.reviewsWithData.filter(
            (r) => r._id !== action.payload.reviewId
          );
      }
    });
    builder.addCase(apiVoteAvailability.fulfilled, (state, action) => {
      if (state.placeForPage.id === action.payload.placeId) {
        state.placeForPage.placeType = action.payload.placeType;
        state.placeForPage.availability = action.payload.availability;
      }
    });

    builder.addCase(apiVoteReview.pending, (state, action) => {
      state.placeForPage.reviewsWithData =
        state.placeForPage.reviewsWithData.map((review) => {
          if (review._id !== action.meta.arg.reviewId) return review;

          review.upVoters = review.upVoters.filter(
            (voter) => voter !== action.meta.arg.userId
          );
          review.downVoters = review.downVoters.filter(
            (voter) => voter !== action.meta.arg.userId
          );

          if (!action.meta.arg.clearVote) {
            if (action.meta.arg.isUpvote) {
              review.upVoters.push(action.meta.arg.userId);
            } else {
              review.downVoters.push(action.meta.arg.userId);
            }
          }

          return review;
        });
    });

    builder.addCase(apiVoteReview.fulfilled, (state, action) => {
      state.placeForPage.reviewsWithData =
        state.placeForPage.reviewsWithData.map((review) => {
          if (review._id !== action.payload.reviewWithData._id) return review;
          return action.payload.reviewWithData;
        });
    });
    builder.addCase(apiSavePlace.pending, (state, action) => {
      state.placeForPage.savedByUser = action.meta.arg.saved;
      state.searchResult = state.searchResult.map((place) => {
        if (place.id !== action.meta.arg.placeId) return place;
        place.savedByUser = action.meta.arg.saved;
        return place;
      });
    });
    builder.addCase(apiChangeStatusOfPlace.fulfilled, (state, action) => {
      state.placeForPage.status = action.payload.status;
    });
  },
});

export const { initPlaceForPage } = placeSlice.actions;

/**
 * Selectors
 */

export const selectPlaceForPage = (state: RootState): PlaceWithData =>
  state.place.placeForPage;

export const selectPlaceSearchResult = (state: RootState): PlaceHeader[] =>
  state.place.searchResult;

export const selectPlaceSearchResultHistory = (
  state: RootState
): PlaceHeader[] => state.place.searchResultHistory;

export const selectRecentCheckIns = (state: RootState): Place[] =>
  state.place.recentCheckIns;

export const selectSearchResultTotalCnt = (state: RootState): number =>
  state.place.searchResultTotalCnt;

/**
 * Export actions & reducer
 */

export default placeSlice.reducer;
