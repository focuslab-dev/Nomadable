import axios from "axios";
import { getPlacePhotos } from "./getPlacePhotos";
import GoogleMapAPI from "../GoogleMapAPI";

export const getImagesOfPlace = async (
  googlePlaceId: string,
  maxImageCnt: number
): Promise<string[]> => {
  try {
    const data = await GoogleMapAPI.getPhotosOfPlace(googlePlaceId);

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
