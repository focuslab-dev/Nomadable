import { APP_URL, COOKIE_ACCESS_TOKEN } from "../constants";
import axios from "axios";
import { readCookie } from "../modules/CookieHandler";
import { NotificationWithData } from "../redux/slices/notificationSlice";

// check In

export const callFetchLatestNotifications = async (
  pageIndex: number
): Promise<{
  latestNotifications: NotificationWithData[];
}> => {
  try {
    const response = await axios({
      method: "get",
      url: `${APP_URL}/api/latest-notifications`,
      params: { pageIndex },
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

// notification-unseens

export const callFetchNotificationUnseenCnt = async (): Promise<{
  unseenCnt: number;
}> => {
  try {
    const response = await axios({
      method: "get",
      url: `${APP_URL}/api/notification-unseens`,
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
