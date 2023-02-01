import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.post(async (req: any, res: any) => {
  const { placeId, saved } = req.body;
  const { userId } = req;

  try {
    const SavedPlace = req.mongoose.model("SavedPlace");

    if (!userId || !placeId) throw Error;

    if (saved) {
      await SavedPlace.findOneAndUpdate(
        { userId, placeId },
        { userId, placeId },
        { upsert: true }
      );
    } else {
      await SavedPlace.deleteMany({ userId, placeId });
    }

    return res.status(200).json({ message: "success" });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING });
  }
});

export default handler;
