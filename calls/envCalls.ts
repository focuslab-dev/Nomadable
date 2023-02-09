import axios from "axios";

import { APP_URL } from "../constants";

export const callFetchEnvVariables = async (): Promise<{
  data: {
    mapboxAccessToken: string;
    speedOfMeAccountCode: string;
    gapiClientId: string;
    gaMeasurementId: string;
  };
}> => {
  try {
    const response = await axios({
      method: "get",
      url: `${APP_URL}/api/env-variables`,
    });

    return { data: response.data };
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data,
    };
  }
};
