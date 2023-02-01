import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.get(async (req: any, res: any) => {
  const { userId, loadedCnt, loadingCnt } = req.query;

  try {
    const Place = req.mongoose.model("Place");

    const places = await Place.find({ discoveredBy: userId })
      .sort({
        created: -1,
      })
      .skip(loadedCnt)
      .limit(loadingCnt)
      .lean();

    return res.status(200).json({ places });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING });
  }
});

export default handler;
