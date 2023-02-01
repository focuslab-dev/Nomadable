import { ERR_SOMETHING } from "./../modules/ErrorCode";
import { COOKIE_ACCESS_TOKEN } from "./../constants";
import { APP_URL } from "../constants";
import axios, { AxiosError, AxiosResponse } from "axios";
import { readCookie } from "../modules/CookieHandler";
import { EditableUser, User, UserWithStats } from "../redux/slices/userSlice";
import { CallError } from "./Types";
import { Contributer } from "../redux/slices/contributerSlice";

export const callFetchUser = async (): Promise<{
  data: { user: User };
}> => {
  try {
    const response = await axios({
      method: "get",
      url: `${APP_URL}/api/user`,
      headers: {
        Authorization: readCookie(COOKIE_ACCESS_TOKEN) || "",
      },
    });

    return { data: response.data };
  } catch (error: any) {
    throw { code: "", message: error.response.data };
  }
};

export const callSignupWithEmail = async (
  email: string,
  password: string,
  userName: string
) => {
  try {
    await axios({
      method: "post",
      url: `${APP_URL}/api/signup-with-email`,
      data: { email, password, userName },
    });

    return true;
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data,
    };
  }
};

export const callSigninWithGoogle = async (
  idToken: string
): Promise<{ token: string }> => {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/signin-with-google`,
      data: { idToken },
    });

    return response.data;
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data,
    };
  }
};

// callVerifyUser
export const callVerifyUser = async (
  verificationCode: string
): Promise<{
  data: { token: string };
}> => {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/verify-user`,
      data: { verificationCode },
    });

    return { data: response.data };
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data,
    };
  }
};

// callVerifyUser
export const callLoginUser = async (
  email: string,
  password: string
): Promise<{
  data: { token: string };
}> => {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/login-user`,
      data: { email, password },
    });

    return { data: response.data };
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data,
    };
  }
};

// callFetchContributersArea

export const callFetchContributersArea = async (
  placeIds: string[] | null,
  maxCnt?: number
): Promise<{
  data: { contributers: Contributer[] };
}> => {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/contributers-area`,
      data: { placeIds, maxCnt },
    });

    return { data: response.data };
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data,
    };
  }
};

// callFetchMyAccountWithStats

export const callFetchMyAccountWithStats = async (): Promise<{
  data: { userWithStats: UserWithStats };
}> => {
  try {
    const response = await axios({
      method: "get",
      url: `${APP_URL}/api/my-account`,
      headers: {
        Authorization: readCookie(COOKIE_ACCESS_TOKEN) || "",
      },
    });

    return { data: response.data };
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data,
    };
  }
};

// callFetchUserWithStats

export const callFetchUserWithStats = async (
  userId: string
): Promise<{
  data: { userWithStats: UserWithStats };
}> => {
  try {
    const response = await axios({
      method: "get",
      url: `${APP_URL}/api/user-with-stats`,
      params: { userId },
    });

    return { data: response.data };
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data,
    };
  }
};

// updateUser

export const callUpdateUser = async (
  editableUser: EditableUser,
  base64: string
): Promise<{
  data: {
    editableUser: EditableUser;
  };
}> => {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/update-user`,
      data: { editableUser, base64 },
      headers: {
        Authorization: readCookie(COOKIE_ACCESS_TOKEN) || "",
      },
    });

    return { data: response.data };
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data,
    };
  }
};

// deleteUser

export const callDeleteUser = async (): Promise<{
  data: {};
}> => {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/delete-user`,
      headers: {
        Authorization: readCookie(COOKIE_ACCESS_TOKEN) || "",
      },
    });

    return { data: response.data };
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data,
    };
  }
};
