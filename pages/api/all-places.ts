import { STATUS_OPEN } from "./../../constants";
import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.get(async (req: any, res: any) => {
  const Place = req.mongoose.model("Place");

  try {
    // get place
    const places = await Place.find({ status: STATUS_OPEN })
      .sort({ reviewStars: -1, testCnt: -1 })
      .limit(50)
      .lean();

    const totalPlaceCnt = await Place.countDocuments({ status: STATUS_OPEN });

    return res.status(200).json({ places, totalPlaceCnt });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
