import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.post(async (req: any, res: any) => {
  const { userId } = req;
  const placeId: string = req.body.placeId;

  try {
    const User = req.mongoose.model("User");
    const Place = req.mongoose.model("Place");
    const Availability = req.mongoose.model("Availability");
    const CheckIn = req.mongoose.model("CheckIn");
    const Event = req.mongoose.model("Event");
    const Notification = req.mongoose.model("Notification");
    const Point = req.mongoose.model("Point");
    const Review = req.mongoose.model("Review");

    if (!placeId || !userId) throw Error;

    const user = await User.findOne({ _id: userId });
    const place = await Place.findOne({ id: placeId });
    if (!user || !place) throw Error;

    if (!user.admin && user._id.toString() !== place.discoveredBy) throw Error;

    await Place.remove({ id: placeId });
    await Availability.deleteMany({ placeId });
    await CheckIn.deleteMany({ placeId });
    await Event.deleteMany({ placeId });
    await Notification.deleteMany({ placeId });
    await Point.deleteMany({ placeId });
    await Review.deleteMany({ placeId });

    return res.status(200).json({});
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
