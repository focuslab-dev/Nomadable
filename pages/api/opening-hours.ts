import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { makePlaceWithData } from "../../modules/api/makePlaceWithData";
import GoogleMapAPI from "../../modules/GoogleMapAPI";
import placeWithData from "./place-with-data";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.get(async (req: any, res: any) => {
  const { googlePlaceId } = req.query;

  try {
    if (!googlePlaceId) throw Error;

    // get discoverer
    const data = await GoogleMapAPI.getOpeningHours(googlePlaceId);
    const weekday_text = data.result.opening_hours.weekday_text;

    return res.status(200).json({ openHours: weekday_text });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
