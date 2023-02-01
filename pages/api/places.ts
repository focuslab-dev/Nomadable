import { PLACE_TYPE_CAFE } from "./../../constants";
import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { fetchPlacesWithFilter } from "../../modules/api/fetchPlacesWithFilter";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.post(async (req: any, res: any) => {
  const { userId } = req;
  const {
    latStart,
    lngStart,
    latEnd,
    lngEnd,
    pageIndex,
    filterObj,
    userLng,
    userLat,
  } = req.body;

  try {
    const { places, totalPlaceCnt } = await fetchPlacesWithFilter(
      req.mongoose,
      userId,
      { latStart, lngStart, latEnd, lngEnd },
      filterObj,
      0,
      50,
      userLng,
      userLat
    );

    return res.status(200).json({ places, totalPlaceCnt });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
