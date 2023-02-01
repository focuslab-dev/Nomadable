import nextConnect from "next-connect";

import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import axios from "axios";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

const getPlacePhoto = async (photoReference: string) => {
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

export const getPlacePhotos = async (
  photoReferences: string[]
): Promise<string[]> => {
  try {
    const imageUrls: any[] = await Promise.all(
      photoReferences.map(async (photoReference: string): Promise<any> => {
        const imageUrl = await getPlacePhoto(photoReference);
        return imageUrl;
      })
    );
    return imageUrls;
  } catch (err) {
    throw Error;
  }
};
