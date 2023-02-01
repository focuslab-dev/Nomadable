import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.post(async (req: any, res: any) => {
  const User = req.mongoose.model("User");
  const Place = req.mongoose.model("Place");

  const userId = req.userId;
  const { placeId, status } = req.body;

  try {
    const user = await User.findOne({ _id: userId });
    const place = await Place.findOne({ id: placeId });

    if (!user) throw Error;
    if (!place) throw Error;
    if (!user.admin && userId !== place.discoveredBy) throw Error;

    place.status = status;
    await place.save();

    return res.status(200).json({ status: place.status });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
