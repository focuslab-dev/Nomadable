import {
  logEventCheckIn,
  logEventSubmitPlace,
} from "./../../../modules/EventLogger";

import {
  callChangeStatusOfPlace,
  callDeletePlace,
  callFetchDiscoveredPlaces,
  callFetchPlaces,
  callSavePlace,
  callUpdateImages,
  callVoteAvailability,
} from "./../../../calls/placeCalls";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { CallError } from "../../../calls/Types";
import { RootState } from "../../store";
import * as cons from "../../../constants";
import {
  callCheckIn,
  callCreatePlace,
  callFetchPlace,
} from "../../../calls/placeCalls";
import { ERR_SOMETHING } from "../../../modules/ErrorCode";
import {
  FilterObj,
  MapArea,
  Place,
  PlaceHeader,
  PlaceWithData,
  Vote,
} from "../placeSlice";
import { hideSpinner, showPointEarned, showSpinner } from "../uiSlice";

/**
 * Types
 */

interface ApiStatus {
  status: string;
  error: string;
}

interface ApiState {
  // user auth
  apiCreatePlaceStatus: ApiStatus;
  apiDeletePlaceStatus: ApiStatus;
  apiFetchPlaceForPageStatus: ApiStatus;
  apiCheckInStatus: ApiStatus;
  apiFetchPlacesStatus: ApiStatus;
  // apiFetchRecentCheckInsStatus: ApiStatus;
  apiFetchDiscoveredPlacesStatus: ApiStatus;
  apiVoteAvailabilityStatus: ApiStatus;
}

/**
 * Reducer
 */

const initialApiState = {
  status: cons.API_IDLE,
  error: "",
};

const initialState: ApiState = {
  apiCreatePlaceStatus: initialApiState,
  apiDeletePlaceStatus: initialApiState,
  apiFetchPlaceForPageStatus: initialApiState,
  apiCheckInStatus: initialApiState,
  apiFetchPlacesStatus: initialApiState,
  // apiFetchRecentCheckInsStatus: initialApiState,
  apiFetchDiscoveredPlacesStatus: initialApiState,
  apiVoteAvailabilityStatus: initialApiState,
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    initApiCreatePlaceState: (state) => {
      state.apiCreatePlaceStatus.status = cons.API_IDLE;
      state.apiCreatePlaceStatus.error = "";
    },
    initApiDeletePlaceState: (state) => {
      state.apiDeletePlaceStatus.status = cons.API_IDLE;
      state.apiDeletePlaceStatus.error = "";
    },
    initapiFetchPlaceForPageState: (state) => {
      state.apiFetchPlaceForPageStatus.status = cons.API_IDLE;
      state.apiFetchPlaceForPageStatus.error = "";
    },
    initApiFetchPlacesState: (state) => {
      state.apiFetchPlacesStatus.status = cons.API_IDLE;
      state.apiFetchPlacesStatus.error = "";
    },
    initApiFetchDiscoveredPlacesState: (state) => {
      state.apiFetchDiscoveredPlacesStatus.status = cons.API_IDLE;
      state.apiFetchDiscoveredPlacesStatus.error = "";
    },
  },
  extraReducers: (builder) => {
    // CreatePlace
    builder.addCase(apiCreatePlace.pending, (state, action) => {
      state.apiCreatePlaceStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiCreatePlace.fulfilled, (state, action) => {
      state.apiCreatePlaceStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiCreatePlace.rejected, (state, action) => {
      state.apiCreatePlaceStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiCreatePlaceStatus.error = action.payload.message;
      } else {
        state.apiCreatePlaceStatus.error = action.error.message || "";
      }
    });

    // CreatePlace
    builder.addCase(apiDeletePlace.pending, (state, action) => {
      state.apiDeletePlaceStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiDeletePlace.fulfilled, (state, action) => {
      state.apiDeletePlaceStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiDeletePlace.rejected, (state, action) => {
      state.apiDeletePlaceStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiDeletePlaceStatus.error = action.payload.message;
      } else {
        state.apiDeletePlaceStatus.error = action.error.message || "";
      }
    });

    // FetchPlace
    builder.addCase(apiFetchPlaceForPage.pending, (state, action) => {
      state.apiFetchPlaceForPageStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiFetchPlaceForPage.fulfilled, (state, action) => {
      state.apiFetchPlaceForPageStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiFetchPlaceForPage.rejected, (state, action) => {
      state.apiFetchPlaceForPageStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiFetchPlaceForPageStatus.error = action.payload.message;
      } else {
        state.apiFetchPlaceForPageStatus.error = action.error.message || "";
      }
    });

    // FetchPlace
    builder.addCase(apiCheckIn.pending, (state, action) => {
      state.apiCheckInStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiCheckIn.fulfilled, (state, action) => {
      state.apiCheckInStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiCheckIn.rejected, (state, action) => {
      state.apiCheckInStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiCheckInStatus.error = action.payload.message;
      } else {
        state.apiCheckInStatus.error = action.error.message || "";
      }
    });

    // FetchPlaces
    builder.addCase(apiFetchPlaces.pending, (state, action) => {
      state.apiFetchPlacesStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiFetchPlaces.fulfilled, (state, action) => {
      state.apiFetchPlacesStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiFetchPlaces.rejected, (state, action) => {
      state.apiFetchPlacesStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiFetchPlacesStatus.error = action.payload.message;
      } else {
        state.apiFetchPlacesStatus.error = action.error.message || "";
      }
    });

    // Fetch Recent CheckIns
    // builder.addCase(apiFetchRecentCheckIns.pending, (state, action) => {
    //   state.apiFetchRecentCheckInsStatus.status = cons.API_LOADING;
    // });
    // builder.addCase(apiFetchRecentCheckIns.fulfilled, (state, action) => {
    //   state.apiFetchRecentCheckInsStatus.status = cons.API_SUCCEEDED;
    // });
    // builder.addCase(apiFetchRecentCheckIns.rejected, (state, action) => {
    //   state.apiFetchRecentCheckInsStatus.status = cons.API_FALIED;
    //   if (action.payload) {
    //     state.apiFetchRecentCheckInsStatus.error = action.payload.message;
    //   } else {
    //     state.apiFetchRecentCheckInsStatus.error = action.error.message || "";
    //   }
    // });

    // Fetch Discovered Places
    builder.addCase(apiFetchDiscoveredPlaces.pending, (state, action) => {
      state.apiFetchDiscoveredPlacesStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiFetchDiscoveredPlaces.fulfilled, (state, action) => {
      state.apiFetchDiscoveredPlacesStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiFetchDiscoveredPlaces.rejected, (state, action) => {
      state.apiFetchDiscoveredPlacesStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiFetchDiscoveredPlacesStatus.error = action.payload.message;
      } else {
        state.apiFetchDiscoveredPlacesStatus.error = action.error.message || "";
      }
    });

    // Vote Availability
    builder.addCase(apiVoteAvailability.pending, (state, action) => {
      state.apiVoteAvailabilityStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiVoteAvailability.fulfilled, (state, action) => {
      state.apiVoteAvailabilityStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiVoteAvailability.rejected, (state, action) => {
      state.apiVoteAvailabilityStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiVoteAvailabilityStatus.error = action.payload.message;
      } else {
        state.apiVoteAvailabilityStatus.error = action.error.message || "";
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

// CreatePlace

export const apiCreatePlace = createAsyncThunk<
  { placeId: string }, // Return type of the payload creator
  { place: Place; errorCallback: (placeId: string) => void }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("place/CreatePlace", async ({ place, errorCallback }, thunkApi) => {
  try {
    const { placeId, addingPoint, totalPoint } = await callCreatePlace(place);
    thunkApi.dispatch(showPointEarned({ addingPoint, totalPoint }));
    logEventSubmitPlace();
    return { placeId };
  } catch (error: any) {
    window.alert(error.message);
    if (error.placeId) {
      errorCallback(error.placeId);
    }
    return thunkApi.rejectWithValue(error as CallError);
  }
});

// CreatePlace

export const apiDeletePlace = createAsyncThunk<
  {}, // Return type of the payload creator
  { placeId: string }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("place/DeletePlace", async ({ placeId }, thunkApi) => {
  try {
    await callDeletePlace(placeId);
    return;
  } catch (error: any) {
    window.alert(error.message);
    return thunkApi.rejectWithValue(error as CallError);
  }
});

// Fetch Place

export const apiFetchPlaceForPage = createAsyncThunk<
  { placeWithData: PlaceWithData }, // Return type of the payload creator
  { placeId: string }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("place/FetchPlace", async ({ placeId }, thunkApi) => {
  try {
    const { placeWithData } = await callFetchPlace(placeId);
    return { placeWithData };
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

// Check In

export const apiCheckIn = createAsyncThunk<
  { placeWithData: PlaceWithData }, // Return type of the payload creator
  { placeId: string; speedDown: number; speedUp: number; isPublic: boolean }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("place/CheckIn", async (params, thunkApi) => {
  try {
    const { placeWithData, addingPoint, totalPoint } = await callCheckIn(
      params
    );

    thunkApi.dispatch(showPointEarned({ addingPoint, totalPoint }));
    logEventCheckIn(placeWithData.id);
    return { placeWithData };
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

// callFetchPlaces

export const apiFetchPlaces = createAsyncThunk<
  { places: PlaceHeader[]; totalPlaceCnt: number }, // Return type of the payload creator
  {
    mapArea: MapArea;
    pageIndex: number;
    filterObj: FilterObj;
    filterChanged: boolean;
    userLng?: number;
    userLat?: number;
  }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("place/FetchPlaces", async (params, thunkApi) => {
  try {
    const { places, totalPlaceCnt } = await callFetchPlaces(params);
    return { places, totalPlaceCnt };
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

// callFetchPlaces

// export const apiFetchRecentCheckIns = createAsyncThunk<
//   { recentCheckIns: Place[] }, // Return type of the payload creator
//   {}, // First argument to the payload creator
//   {
//     rejectValue: CallError;
//   } // Types for ThunkAPI
// >("place/FetchRecentCheckIns", async (_, thunkApi) => {
//   try {
//     const { recentCheckIns } = await callRecentCheckIns();
//     return { recentCheckIns };
//   } catch (error: any) {
//     return thunkApi.rejectWithValue(error as CallError);
//   }
// });

// callFetchDiscoveredPlaces

export const apiFetchDiscoveredPlaces = createAsyncThunk<
  { places: Place[] }, // Return type of the payload creator
  { userId: string; loadedCnt: number; loadingCnt: number }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>(
  "place/FetchDiscoveredPlaces",
  async ({ userId, loadedCnt, loadingCnt }, thunkApi) => {
    try {
      const { places } = await callFetchDiscoveredPlaces(
        userId,
        loadedCnt,
        loadingCnt
      );
      return { places };
    } catch (error: any) {
      return thunkApi.rejectWithValue(error as CallError);
    }
  }
);

// apiVoteAvailability

export const apiVoteAvailability = createAsyncThunk<
  { placeId: string; placeType: string; availability: string[] }, // Return type of the payload creator
  { placeId: string; vote: Vote }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("place/VoteAvailability", async (params, thunkApi) => {
  try {
    const data = await callVoteAvailability(params);
    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

// apiUpdateImages

export const apiUpdateImages = createAsyncThunk<
  {}, // Return type of the payload creator
  { placeId: string }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("place/UpdateImages", async (params, thunkApi) => {
  try {
    await callUpdateImages(params);
    return;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

// apiSavePlace

export const apiSavePlace = createAsyncThunk<
  {}, // Return type of the payload creator
  { placeId: string; saved: boolean }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("place/SavePlace", async (params, thunkApi) => {
  try {
    await callSavePlace(params);
    return;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

// apiSavePlace

export const apiChangeStatusOfPlace = createAsyncThunk<
  { status: string }, // Return type of the payload creator
  { placeId: string; status: string }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("place/ChangeStatusOfPlace", async (params, thunkApi) => {
  thunkApi.dispatch(showSpinner({ message: "Saving..." }));
  try {
    const data = await callChangeStatusOfPlace(params);
    thunkApi.dispatch(hideSpinner());
    return data;
  } catch (error: any) {
    thunkApi.dispatch(hideSpinner());
    return thunkApi.rejectWithValue(error as CallError);
  }
});

/**
 * Actions: call ajax & mutate store (only from here)
 */

export const {
  initApiCreatePlaceState,
  initApiDeletePlaceState,
  initapiFetchPlaceForPageState,
  initApiFetchDiscoveredPlacesState,
  initApiFetchPlacesState,
} = apiSlice.actions;

/**
 * Selectors
 */

export const selectApiCreatePlaceStatus = (state: RootState): ApiStatus =>
  state.apiPlace.apiCreatePlaceStatus;

export const selectApiDeletePlaceStatus = (state: RootState): ApiStatus =>
  state.apiPlace.apiDeletePlaceStatus;

export const selectApiFetchPlaceForPageStatus = (state: RootState): ApiStatus =>
  state.apiPlace.apiFetchPlaceForPageStatus;

export const selectApiCheckInStatus = (state: RootState): ApiStatus =>
  state.apiPlace.apiCheckInStatus;

export const selectApiFetchPlacesStatus = (state: RootState): ApiStatus =>
  state.apiPlace.apiFetchPlacesStatus;

// export const selectApiFetchRecentCheckInsStatus = (
//   state: RootState
// ): ApiStatus => state.apiPlace.apiFetchRecentCheckInsStatus;

export const selectApiFetchDiscoveredPlacesStatus = (
  state: RootState
): ApiStatus => state.apiPlace.apiFetchDiscoveredPlacesStatus;

export const selectApiVoteAvailabilityStatus = (state: RootState): ApiStatus =>
  state.apiPlace.apiVoteAvailabilityStatus;

/**
 * Export actions & reducer
 */

export default apiSlice.reducer;
