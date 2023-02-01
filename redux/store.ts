import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";
import uiReducer from "./slices/uiSlice";
import placeReducer from "./slices/placeSlice";
import newPlaceReducer from "./slices/newPlaceSlice";
import contributerReducer from "./slices/contributerSlice";
import eventReducer from "./slices/eventSlice";
import notificationReducer from "./slices/notificationSlice";
import reviewFormReducer from "./slices/reviewFormSlice";
import checkInReducer from "./slices/checkInSlice";
import envReducer from "./slices/envSlice";
import apiUserReducer from "./slices/api/apiUserSlice";
import apiSpotReducer from "./slices/api/apiSpotSlice";
import apiPlaceReducer from "./slices/api/apiPlaceSlice";
import apiEventReducer from "./slices/api/apiEventSlice";
import apiReviewReducer from "./slices/api/apiReviewSlice";
import apiNotificationReducer from "./slices/api/apiNotificationSlice";
import apiCheckInReducer from "./slices/api/apiCheckInSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    ui: uiReducer,
    place: placeReducer,
    newPlace: newPlaceReducer,
    contributer: contributerReducer,
    event: eventReducer,
    notification: notificationReducer,
    reviewForm: reviewFormReducer,
    checkIn: checkInReducer,
    env: envReducer,
    apiUser: apiUserReducer,
    apiSpot: apiSpotReducer,
    apiPlace: apiPlaceReducer,
    apiEvent: apiEventReducer,
    apiReview: apiReviewReducer,
    apiNotification: apiNotificationReducer,
    apiCheckIn: apiCheckInReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
