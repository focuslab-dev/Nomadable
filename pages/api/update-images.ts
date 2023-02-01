import { getImagesOfPlace } from "./../../modules/api/getImagesOfPlace";
import nextConnect from "next-connect";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { ERR_SOMETHING } from "../../modules/ErrorCode";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.post(async (req: any, res: any) => {
  const { userId } = req;
  const { placeId } = req.body;

  try {
    const User = req.mongoose.model("User");
    const Place = req.mongoose.model("Place");

    const user = await User.findOne({ _id: userId }).lean();

    const place = await Place.findOne({ id: placeId });

    if (user && user.admin && place) {
      const imageUrls = await getImagesOfPlace(place.googlePlaceId, 5);
      place.images = imageUrls;
      place.thumbnail = imageUrls[0];
      await place.save();
    }

    return res.status(200).json("ok");
  } catch (error: any) {
    return res.status(500).json(ERR_SOMETHING);
  }
});

export default handler;
