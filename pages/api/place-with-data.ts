import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { makePlaceWithData } from "../../modules/api/makePlaceWithData";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.get(async (req: any, res: any) => {
  const userId = req.userId;
  const { placeId } = req.query;

  try {
    const Place = req.mongoose.model("Place");

    // get place
    const place = await Place.findOne({
      id: placeId,
    }).lean();

    if (!place) throw Error;

    // get discoverer
    const placeWithData = await makePlaceWithData(req.mongoose, place, userId);

    return res.status(200).json({ placeWithData });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
