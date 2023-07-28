import axios from "axios";

const getPlaceDetail = async (placeId: string) => {
  try {
    const URL = "https://maps.googleapis.com/maps/api/place/details/json";
    const KEY = `key=${process.env.GAPI_KEY}`;
    const INPUT = `place_id=${placeId}`;
    // const INPUT_TYPE = "inputtype=textquery";
    const LANG = "language=en";
    const ITEMS = "fields=address_component,name,geometry,formatted_address";

    const response = await axios({
      method: "get",
      url: `${URL}?${KEY}&${INPUT}&${LANG}&${ITEMS}`,
    });

    return response.data;
  } catch (error) {
    throw Error;
  }
};

const getOpeningHours = async (placeId: string) => {
  try {
    const URL = "https://maps.googleapis.com/maps/api/place/details/json";
    const KEY = `key=${process.env.GAPI_KEY}`;
    const INPUT = `place_id=${placeId}`;
    const LANG = "language=en";
    const ITEMS = "fields=opening_hours";

    const response = await axios({
      method: "get",
      url: `${URL}?${KEY}&${INPUT}&${LANG}&${ITEMS}`,
    });

    return response.data;
  } catch (error) {
    throw Error;
  }
};

const getPhotosOfPlace = async (placeId: string) => {
  try {
    const URL = "https://maps.googleapis.com/maps/api/place/details/json";
    const KEY = `key=${process.env.GAPI_KEY}`;
    const INPUT = `place_id=${placeId}`;
    const LANG = "language=en";
    const ITEMS = "fields=photos";

    const response = await axios({
      method: "get",
      url: `${URL}?${KEY}&${INPUT}&${LANG}&${ITEMS}`,
    });

    return response.data;
  } catch (error) {
    throw Error;
  }
};

const retrievePhotoFromReference = async (photoReference: string) => {
  try {
    const URL = "https://maps.googleapis.com/maps/api/place/photo";
    const KEY = `key=${process.env.GAPI_KEY}`;
    const INPUT = `photo_reference=${photoReference}`;
    const MAX_WIDTH = "maxwidth=800";

    const response = await axios({
      method: "get",
      url: `${URL}?${MAX_WIDTH}&${INPUT}&${KEY}`,
    });

    return response.request.res.responseUrl;
  } catch (error) {
    throw Error;
  }
};

const getPlaceCandidates = async (
  input: string,
  location: { lat: number; lng: number } | false
) => {
  try {
    const URL = "https://maps.googleapis.com/maps/api/place/textsearch/json";
    const KEY = `key=${process.env.GAPI_KEY}`;
    const INPUT = `query=${encodeURIComponent(input.trim())}`;
    const LOCATION = location
      ? `&location=${location.lat},${location.lng}`
      : "";

    // const INPUT_TYPE = "inputtype=textquery";
    // const LANG = "language=en";
    // const ITEMS = "fields=place_id,name,structured_formatting";

    const response = await axios({
      method: "get",
      url: `${URL}?${KEY}&${INPUT}${LOCATION}`,
    });

    return response.data;
  } catch (error) {
    throw Error;
  }
};

const GoogleMapAPI = {
  getPlaceDetail,
  getPhotosOfPlace,
  retrievePhotoFromReference,
  getPlaceCandidates,
  getOpeningHours,
};

export default GoogleMapAPI;
