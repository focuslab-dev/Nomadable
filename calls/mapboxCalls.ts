import axios from "axios";

import { APP_URL } from "../constants";

export const callFetchMapBoxAccessToken = async (): Promise<{
  data: { mapboxAccessToken: string };
}> => {
  try {
    const response = await axios({
      method: "get",
      url: `${APP_URL}/api/mapbox-access-token`,
    });

    return { data: response.data };
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data,
    };
  }
};
