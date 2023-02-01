import { SORT_BY_DISTANCE } from "./../../constants";
import { initialFilterObj } from "./../../redux/slices/placeSlice";
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
  const { userLng, userLat, maxDistance, maxPlaces } = req.body;

  try {
    const { places } = await fetchPlacesWithFilter(
      req.mongoose,
      userId,
      null,
      { ...initialFilterObj, sortBy: SORT_BY_DISTANCE },
      0,
      maxPlaces,
      userLng,
      userLat,
      maxDistance
    );

    return res.status(200).json({ places });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
