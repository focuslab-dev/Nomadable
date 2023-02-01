import { callSigninWithGoogle } from "./../../../calls/userCalls";
import { logEventSignup } from "./../../../modules/EventLogger";

// import { apiFetchRecentCheckIns } from "./apiPlaceSlice";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { CallError } from "../../../calls/Types";
import { RootState } from "../../store";
import * as cons from "../../../constants";
import { EditableUser, User, UserWithStats } from "../userSlice";
import {
  callDeleteUser,
  callFetchContributersArea,
  callFetchMyAccountWithStats,
  callFetchUser,
  callFetchUserWithStats,
  callLoginUser,
  callSignupWithEmail,
  callUpdateUser,
  callVerifyUser,
} from "../../../calls/userCalls";
import { ERR_SOMETHING } from "../../../modules/ErrorCode";
import { saveTokenToCookie } from "../../../modules/AuthUtils";
import { Contributer } from "../contributerSlice";
import { removeCookie } from "../../../modules/CookieHandler";
import { apiFetchNotificationUnseenCnt } from "./apiNotificationSlice";
import { showSpinner, hideSpinner } from "../uiSlice";

/**
 * Types
 */

interface ApiStatus {
  status: string;
  error: string;
}

interface ApiState {
  // user auth
  apiFetchUserStatus: ApiStatus;
  apiSignupWithEmailStatus: ApiStatus;
  apiVerifyUserStatus: ApiStatus;
  apiLoginUserStatus: ApiStatus;
  // contributers
  apiFetchContributersAreaStatus: ApiStatus;
  apiFetchMyAccountWithStatsStatus: ApiStatus;
  apiFetchUserWithStatsStatus: ApiStatus;
  apiUpdateUserStatus: ApiStatus;
  apiDeleteUserStatus: ApiStatus;
}

/**
 * Reducer
 */

const initialApiState = {
  status: cons.API_IDLE,
  error: "",
};

const initialState: ApiState = {
  // user auth
  apiFetchUserStatus: initialApiState,
  apiSignupWithEmailStatus: initialApiState,
  apiVerifyUserStatus: initialApiState,
  apiLoginUserStatus: initialApiState,
  // others
  apiFetchContributersAreaStatus: initialApiState,
  apiFetchMyAccountWithStatsStatus: initialApiState,
  apiFetchUserWithStatsStatus: initialApiState,
  apiUpdateUserStatus: initialApiState,
  apiDeleteUserStatus: initialApiState,
};

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {
    // Fetch User
    initApiFetchUserState: (state) => {
      state.apiFetchUserStatus.status = cons.API_IDLE;
      state.apiFetchUserStatus.error = "";
    },
    initLoginUserState: (state) => {
      state.apiLoginUserStatus.status = cons.API_IDLE;
      state.apiLoginUserStatus.error = "";
    },
    initApiSignupWithEmailState: (state) => {
      state.apiSignupWithEmailStatus.status = cons.API_IDLE;
      state.apiSignupWithEmailStatus.error = "";
    },
    initApiVerifyUserState: (state) => {
      state.apiVerifyUserStatus.status = cons.API_IDLE;
      state.apiVerifyUserStatus.error = "";
    },
    initApiFetchContributersAreaState: (state) => {
      state.apiFetchContributersAreaStatus.status = cons.API_IDLE;
      state.apiFetchContributersAreaStatus.error = "";
    },
  },
  extraReducers: (builder) => {
    // FetchUser
    builder.addCase(apiFetchUser.pending, (state, action) => {
      state.apiFetchUserStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiFetchUser.fulfilled, (state, action) => {
      state.apiFetchUserStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiFetchUser.rejected, (state, action) => {
      state.apiFetchUserStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiFetchUserStatus.error = action.payload.message;
      } else {
        state.apiFetchUserStatus.error = action.error.message || "";
      }
    });

    // SignupWithEmail
    builder.addCase(apiSignupWithEmail.pending, (state, action) => {
      state.apiSignupWithEmailStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiSignupWithEmail.fulfilled, (state, action) => {
      state.apiSignupWithEmailStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiSignupWithEmail.rejected, (state, action) => {
      state.apiSignupWithEmailStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiSignupWithEmailStatus.error = action.payload.message;
      } else {
        state.apiSignupWithEmailStatus.error = action.error.message || "";
      }
    });

    // VerifyUser
    builder.addCase(apiVerifyUser.pending, (state, action) => {
      state.apiVerifyUserStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiVerifyUser.fulfilled, (state, action) => {
      state.apiVerifyUserStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiVerifyUser.rejected, (state, action) => {
      state.apiVerifyUserStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiVerifyUserStatus.error = action.payload.message;
      } else {
        state.apiVerifyUserStatus.error = action.error.message || "";
      }
    });

    // LoginUser
    builder.addCase(apiLoginUser.pending, (state, action) => {
      state.apiLoginUserStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiLoginUser.fulfilled, (state, action) => {
      state.apiLoginUserStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiLoginUser.rejected, (state, action) => {
      state.apiLoginUserStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiLoginUserStatus.error = action.payload.message;
      } else {
        state.apiLoginUserStatus.error = action.error.message || "";
      }
    });

    // FetchContributersArea
    builder.addCase(apiFetchContributersArea.pending, (state, action) => {
      state.apiFetchContributersAreaStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiFetchContributersArea.fulfilled, (state, action) => {
      state.apiFetchContributersAreaStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiFetchContributersArea.rejected, (state, action) => {
      state.apiFetchContributersAreaStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiFetchContributersAreaStatus.error = action.payload.message;
      } else {
        state.apiFetchContributersAreaStatus.error = action.error.message || "";
      }
    });

    // FetchContributersArea
    builder.addCase(apiFetchMyAccountWithStats.pending, (state, action) => {
      state.apiFetchMyAccountWithStatsStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiFetchMyAccountWithStats.fulfilled, (state, action) => {
      state.apiFetchMyAccountWithStatsStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiFetchMyAccountWithStats.rejected, (state, action) => {
      state.apiFetchMyAccountWithStatsStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiFetchMyAccountWithStatsStatus.error = action.payload.message;
      } else {
        state.apiFetchMyAccountWithStatsStatus.error =
          action.error.message || "";
      }
    });

    // FetchUserWithStats
    builder.addCase(apiFetchUserWithStats.pending, (state, action) => {
      state.apiFetchUserWithStatsStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiFetchUserWithStats.fulfilled, (state, action) => {
      state.apiFetchUserWithStatsStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiFetchUserWithStats.rejected, (state, action) => {
      state.apiFetchUserWithStatsStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiFetchUserWithStatsStatus.error = action.payload.message;
      } else {
        state.apiFetchUserWithStatsStatus.error = action.error.message || "";
      }
    });

    // UpdateUser
    builder.addCase(apiUpdateUser.pending, (state, action) => {
      state.apiUpdateUserStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiUpdateUser.fulfilled, (state, action) => {
      state.apiUpdateUserStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiUpdateUser.rejected, (state, action) => {
      state.apiUpdateUserStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiUpdateUserStatus.error = action.payload.message;
      } else {
        state.apiUpdateUserStatus.error = action.error.message || "";
      }
    });

    // UpdateUser
    builder.addCase(apiDeleteUser.pending, (state, action) => {
      state.apiDeleteUserStatus.status = cons.API_LOADING;
    });
    builder.addCase(apiDeleteUser.fulfilled, (state, action) => {
      state.apiDeleteUserStatus.status = cons.API_SUCCEEDED;
    });
    builder.addCase(apiDeleteUser.rejected, (state, action) => {
      state.apiDeleteUserStatus.status = cons.API_FALIED;
      if (action.payload) {
        state.apiDeleteUserStatus.error = action.payload.message;
      } else {
        state.apiDeleteUserStatus.error = action.error.message || "";
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

// FetchUser

export const apiFetchUser = createAsyncThunk<
  { user: User }, // Return type of the payload creator
  {}, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("user/FetchUser", async (_, thunkApi) => {
  try {
    const { data } = await callFetchUser();
    if (!data) throw unknownError;

    thunkApi.dispatch(apiFetchNotificationUnseenCnt({}));

    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

// SignupWithEmail

export const apiSignupWithEmail = createAsyncThunk<
  {}, // Return type of the payload creator
  { email: string; password: string; userName: string }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("user/SignupWithEmail", async ({ email, password, userName }, thunkApi) => {
  try {
    await callSignupWithEmail(email, password, userName);
    logEventSignup();
    return;
  } catch (error: any) {
    window.alert(error.response.data);
    return thunkApi.rejectWithValue(error as CallError);
  }
});

// SignupWithGoogle

export const apiSigninWithGoogle = createAsyncThunk<
  {}, // Return type of the payload creator
  { idToken: string; refresh?: boolean }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("user/SigninWithGoogle", async ({ idToken, refresh }, thunkApi) => {
  try {
    thunkApi.dispatch(showSpinner({ message: "Signing in..." }));
    const { token } = await callSigninWithGoogle(idToken);

    saveTokenToCookie(token);

    if (refresh) {
      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    } else {
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }

    thunkApi.dispatch(hideSpinner());
    return;
  } catch (error: any) {
    thunkApi.dispatch(hideSpinner());
    return thunkApi.rejectWithValue(error as CallError);
  }
});

// VerifyUser

export const apiVerifyUser = createAsyncThunk<
  { token: string }, // Return type of the payload creator
  { verificationCode: string }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("user/VerifyUser", async ({ verificationCode }, thunkApi) => {
  try {
    const { data } = await callVerifyUser(verificationCode);

    saveTokenToCookie(data.token);

    setTimeout(() => {
      thunkApi.dispatch(apiFetchUser({}));
    }, 500);

    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

// LoginUser

export const apiLoginUser = createAsyncThunk<
  { token: string }, // Return type of the payload creator
  { email: string; password: string }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("user/LoginUser", async ({ email, password }, thunkApi) => {
  try {
    const { data } = await callLoginUser(email, password);

    saveTokenToCookie(data.token);

    setTimeout(() => {
      thunkApi.dispatch(apiFetchUser({}));
      // thunkApi.dispatch(apiFetchRecentCheckIns({}));
    }, 500);

    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

// FetchContributersArea

export const apiFetchContributers = createAsyncThunk<
  { contributers: Contributer[] }, // Return type of the payload creator
  { maxCnt?: number }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("users/FetchContributers", async ({ maxCnt }, thunkApi) => {
  try {
    const { data } = await callFetchContributersArea(null, maxCnt);
    if (!data) throw unknownError;
    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

// FetchContributersArea

export const apiFetchContributersArea = createAsyncThunk<
  { contributers: Contributer[] }, // Return type of the payload creator
  { placeIds: string[] | null; maxCnt?: number }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("users/FetchContributersArea", async ({ placeIds, maxCnt }, thunkApi) => {
  try {
    const { data } = await callFetchContributersArea(placeIds, maxCnt);
    if (!data) throw unknownError;
    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

// FetchMyAccountWithStats

export const apiFetchMyAccountWithStats = createAsyncThunk<
  { userWithStats: UserWithStats }, // Return type of the payload creator
  {}, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("users/FetchMyAccountWithStats", async (_, thunkApi) => {
  try {
    const { data } = await callFetchMyAccountWithStats();
    if (!data) throw unknownError;
    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

export const apiFetchUserWithStats = createAsyncThunk<
  { userWithStats: UserWithStats }, // Return type of the payload creator
  { userId: string }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("users/FetchUserWithStats", async ({ userId }, thunkApi) => {
  try {
    const { data } = await callFetchUserWithStats(userId);
    if (!data) throw unknownError;
    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

// UpdateUser

export const apiUpdateUser = createAsyncThunk<
  {
    editableUser: EditableUser;
  }, // Return type of the payload creator
  {
    editableUser: EditableUser;
    base64: string;
  }, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("users/UpdateUser", async ({ editableUser, base64 }, thunkApi) => {
  try {
    const { data } = await callUpdateUser(editableUser, base64);
    if (!data) throw unknownError;
    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

// DeleteUser

export const apiDeleteUser = createAsyncThunk<
  {}, // Return type of the payload creator
  {}, // First argument to the payload creator
  {
    rejectValue: CallError;
  } // Types for ThunkAPI
>("users/DeleteUser", async (_, thunkApi) => {
  try {
    const { data } = await callDeleteUser();
    removeCookie(cons.COOKIE_ACCESS_TOKEN, "/");
    window.location.href = "/";

    if (!data) throw unknownError;
    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error as CallError);
  }
});

/**
 * Actions: call ajax & mutate store (only from here)
 */

export const {
  initApiFetchUserState,
  initLoginUserState,
  initApiSignupWithEmailState,
  initApiVerifyUserState,
  initApiFetchContributersAreaState,
} = apiSlice.actions;

/**
 * Selectors
 */

export const selectApiFetchUserStatus = (state: RootState): ApiStatus =>
  state.apiUser.apiFetchUserStatus;

export const selectApiSignupWithEmailStatus = (state: RootState): ApiStatus =>
  state.apiUser.apiSignupWithEmailStatus;

export const selectApiVerifyUserStatus = (state: RootState): ApiStatus =>
  state.apiUser.apiVerifyUserStatus;

export const selectApiLoginUserStatus = (state: RootState): ApiStatus =>
  state.apiUser.apiLoginUserStatus;

export const selectApiFetchContributersAreaStatus = (
  state: RootState
): ApiStatus => state.apiUser.apiFetchContributersAreaStatus;

export const selectApiFetchMyAccountWithStatsStatus = (
  state: RootState
): ApiStatus => state.apiUser.apiFetchMyAccountWithStatsStatus;

export const selectApiUpdateUserStatus = (state: RootState): ApiStatus =>
  state.apiUser.apiUpdateUserStatus;

export const selectApiDeleteUserStatus = (state: RootState): ApiStatus =>
  state.apiUser.apiDeleteUserStatus;

/**
 * Export actions & reducer
 */

export default apiSlice.reducer;
