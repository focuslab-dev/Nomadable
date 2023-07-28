import nextConnect from "next-connect";

import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import GoogleMapAPI from "../GoogleMapAPI";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

export const getPlacePhotos = async (
  photoReferences: string[]
): Promise<string[]> => {
  try {
    const imageUrls: any[] = await Promise.all(
      photoReferences.map(async (photoReference: string): Promise<any> => {
        const imageUrl = await GoogleMapAPI.retrievePhotoFromReference(
          photoReference
        );
        return imageUrl;
      })
    );
    return imageUrls;
  } catch (err) {
    throw Error;
  }
};
