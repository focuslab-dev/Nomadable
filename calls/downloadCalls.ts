import axios from "axios";
import { APP_URL, COOKIE_ACCESS_TOKEN } from "../constants";
import { readCookie } from "../modules/CookieHandler";
import { hideSpinner, showSpinner } from "../redux/slices/uiSlice";

const downloadCSV = (csvContent: any) => {
  const encodedUri = encodeURI(csvContent);

  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "places.csv");
  link.style.visibility = "hidden";
  document.body.appendChild(link); // Required for FF
  link.click(); // This will download the data file named "my_data.csv".
  document.body.removeChild(link);
};

// callFetchPlaceInfo

export const callDownloadPlacesAsCsv = async (): Promise<boolean> => {
  try {
    const response = await axios({
      method: "get",
      url: `${APP_URL}/api/download-places-csv`,
      headers: {
        Authorization: readCookie(COOKIE_ACCESS_TOKEN) || "",
      },
    });

    downloadCSV(response.data.csvContent);
    return true;
  } catch (error: any) {
    return false;
  }
};
