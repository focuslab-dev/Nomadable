import axios from "axios";
import { getPlacePhotos } from "./getPlacePhotos";

const getPlaceDetail = async (placeId: string) => {
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

export const getImagesOfPlace = async (
  googlePlaceId: string,
  maxImageCnt: number
): Promise<string[]> => {
  try {
    const data = await getPlaceDetail(googlePlaceId);

    const photoReferences = data.result.photos.map((p: any) => {
      return p.photo_reference;
    });

    const imageUrls = await getPlacePhotos(
      photoReferences.slice(0, maxImageCnt)
    );
    return imageUrls;
  } catch (error) {
    throw Error;
  }
};
