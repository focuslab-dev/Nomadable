import { APP_URL, COOKIE_ACCESS_TOKEN } from "../constants";
import axios from "axios";
import { readCookie } from "../modules/CookieHandler";
import { Event, EventWithData } from "../redux/slices/eventSlice";
import {
  Review,
  ReviewAspects,
  ReviewWithData,
  ReviewWithPlaceData,
} from "../redux/slices/placeSlice";

// check In

export const callPostReview = async (props: {
  placeId: string;
  comment: string;
  reviewAspects: ReviewAspects;
}): Promise<{
  reviewWithData: ReviewWithData;
  reviewStars: number;
  avgReviewAspects: ReviewAspects;
  addingPoint: number;
  totalPoint: number;
}> => {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/post-review`,
      data: props,
      headers: {
        Authorization: readCookie(COOKIE_ACCESS_TOKEN) || "",
      },
    });

    return response.data;
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data.message,
    };
  }
};

// Delete

export const callDeleteReview = async (
  reviewId: string,
  placeId: string
): Promise<{
  reviewStars: number;
}> => {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/delete-review`,
      data: { reviewId, placeId },
      headers: {
        Authorization: readCookie(COOKIE_ACCESS_TOKEN) || "",
      },
    });

    return response.data;
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data.message,
    };
  }
};

// Fetch Reviews

export const callFetchReviews = async (params: {
  userId: string;
  loadedCnt: number;
  loadingCnt: number;
  latest?: boolean;
}): Promise<{
  reviews: ReviewWithPlaceData[];
}> => {
  try {
    const response = await axios({
      method: "get",
      url: `${APP_URL}/api/reviews`,
      params,
    });

    return response.data;
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data.message,
    };
  }
};

// callVoteReview

export const callVoteReview = async (params: {
  reviewId: string;
  isUpvote: boolean;
  clearVote: boolean;
}): Promise<{
  reviewWithData: ReviewWithData;
}> => {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/vote-review`,
      data: params,
      headers: {
        Authorization: readCookie(COOKIE_ACCESS_TOKEN) || "",
      },
    });

    return response.data;
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data.message,
    };
  }
};
