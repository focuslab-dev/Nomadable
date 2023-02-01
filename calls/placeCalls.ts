import {
  initialPlaceWithData,
  PlaceHeader,
} from "./../redux/slices/placeSlice";
import { APP_URL, COOKIE_ACCESS_TOKEN } from "../constants";
import axios from "axios";
import {
  FilterObj,
  MapArea,
  Place,
  PlaceWithData,
  SitemapLink,
  Vote,
} from "../redux/slices/placeSlice";
import { readCookie } from "../modules/CookieHandler";
import { City, CityWithData } from "../data/articles/cities";
import { Article, ArticleWithData } from "../data/articles/articles";

const callCreatePlace = async (
  place: Place
): Promise<{ placeId: string; addingPoint: number; totalPoint: number }> => {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/create-place`,
      data: { place },
      headers: {
        Authorization: readCookie(COOKIE_ACCESS_TOKEN) || "",
      },
    });

    return response.data;
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data.message,
      placeId: error.response.data.placeId,
    };
  }
};

const callDeletePlace = async (placeId: string) => {
  try {
    await axios({
      method: "post",
      url: `${APP_URL}/api/delete-place`,
      data: { placeId },
      headers: {
        Authorization: readCookie(COOKIE_ACCESS_TOKEN) || "",
      },
    });

    return;
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data.message,
      placeId: error.response.data.placeId,
    };
  }
};

// callFetchPlace

const callFetchPlace = async (
  placeId: string,
  forSSR?: boolean
): Promise<{ placeWithData: PlaceWithData }> => {
  try {
    const response = await axios({
      method: "get",
      url: `${APP_URL}/api/place-with-data`,
      params: { placeId },
      headers: {
        Authorization: forSSR ? "" : readCookie(COOKIE_ACCESS_TOKEN) || "",
      },
    });

    return response.data;
    // return { placeWithData: initialPlaceWithData };
  } catch (error: any) {
    return { placeWithData: initialPlaceWithData };
    // throw {
    //   code: "",
    //   message: error.response.data.message,
    // };
  }
};

// check In

const callCheckIn = async (data: {
  placeId: string;
  speedDown: number;
  speedUp: number;
  isPublic: boolean;
}): Promise<{
  placeWithData: PlaceWithData;
  addingPoint: number;
  totalPoint: number;
}> => {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/check-in`,
      data,
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

// fetch places

const callFetchPlaces = async (params: {
  mapArea: MapArea;
  pageIndex: number;
  filterObj: FilterObj;
  userLng?: number;
  userLat?: number;
}): Promise<{ places: PlaceHeader[]; totalPlaceCnt: number }> => {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/places`,
      data: {
        latStart: params.mapArea.latStart,
        lngStart: params.mapArea.lngStart,
        latEnd: params.mapArea.latEnd,
        lngEnd: params.mapArea.lngEnd,
        pageIndex: params.pageIndex,
        filterObj: params.filterObj,
        userLng: params.userLng,
        userLat: params.userLat,
      },
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

// fetch places

const callFetchAllPlaces = async (): Promise<{
  places: Place[];
  totalPlaceCnt: number;
}> => {
  try {
    const response = await axios({
      method: "get",
      url: `${APP_URL}/api/all-places`,
    });

    return response.data;
  } catch (error: any) {
    return { places: [], totalPlaceCnt: 0 };
  }
};

// fetch recent checkins

const callRecentCheckIns = async (): Promise<{
  recentCheckIns: Place[];
}> => {
  try {
    const response = await axios({
      method: "get",
      url: `${APP_URL}/api/recent-checkins`,
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

// callFetchAllPlaceIds

const callFetchAllPlaceIds = async (): Promise<{
  placeIds: string[];
}> => {
  try {
    const response = await axios({
      method: "get",
      url: `${APP_URL}/api/all-place-ids`,
    });

    return response.data;
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data.message,
    };
  }
};

// callFetchAllPlaceIds

const callFetchDiscoveredPlaces = async (
  userId: string,
  loadedCnt: number,
  loadingCnt: number
): Promise<{
  places: Place[];
}> => {
  try {
    const response = await axios({
      method: "get",
      url: `${APP_URL}/api/discovered-places`,
      params: { userId, loadedCnt, loadingCnt },
    });

    return response.data;
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data.message,
    };
  }
};

// callVoteAvailability

const callVoteAvailability = async (params: {
  placeId: string;
  vote: Vote;
}): Promise<{
  placeId: string;
  placeType: string;
  availability: string[];
}> => {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/vote-availability`,
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

//

const callFetchCitiesWithData = async (
  params: City[]
): Promise<{ citiesWithData: CityWithData[]; totalPlaceCnt: number }> => {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/cities-with-data`,
      data: { cities: params },
    });

    return response.data;
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data.message,
    };
  }
};

// callFetchArticlesWithData

const callFetchArticlesWithData = async (
  params: Article[]
): Promise<{ articlesWithData: ArticleWithData[] }> => {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/articles-with-data`,
      data: { articles: params },
    });

    return response.data;
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data.message,
    };
  }
};

// callUpdateImages

const callUpdateImages = async (params: { placeId: string }) => {
  try {
    await axios({
      method: "post",
      url: `${APP_URL}/api/update-images`,
      data: params,
      headers: {
        Authorization: readCookie(COOKIE_ACCESS_TOKEN) || "",
      },
    });

    return;
  } catch (error: any) {
    throw {
      code: "",
      message: error.response.data.message,
    };
  }
};

// fetch places links

const callFetchPlaceLinks = async (): Promise<{
  placeLinks: SitemapLink[];
}> => {
  try {
    const response = await axios({
      method: "get",
      url: `${APP_URL}/api/sitemap-links`,
    });

    return response.data;
  } catch (error: any) {
    return { placeLinks: [] };
  }
};

// call save place

const callSavePlace = async (params: {
  placeId: string;
  saved: boolean;
}): Promise<{}> => {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/save-place`,
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

const callChangeStatusOfPlace = async (params: {
  placeId: string;
  status: string;
}): Promise<{ status: string }> => {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/change-status-of-place`,
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

// fetch places

const callFetchNearbyPlaces = async (params: {
  userLng: number;
  userLat: number;
  maxDistance: number;
  maxPlaces: number;
}): Promise<{ places: PlaceHeader[] }> => {
  try {
    const response = await axios({
      method: "post",
      url: `${APP_URL}/api/nearby-places`,
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

/**
 * Exports
 */

export {
  callFetchPlace,
  callFetchPlaces,
  callFetchAllPlaceIds,
  callFetchDiscoveredPlaces,
  callVoteAvailability,
  callFetchCitiesWithData,
  callFetchArticlesWithData,
  callUpdateImages,
  callFetchPlaceLinks,
  callSavePlace,
  callChangeStatusOfPlace,
  callDeletePlace,
  callCheckIn,
  callCreatePlace,
  callFetchAllPlaces,
  callFetchNearbyPlaces,
};
