import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import mongoose from "mongoose";
import { getUserWithStats } from "../../modules/api/getUserWithStats";
import { EventWithData } from "../../redux/slices/eventSlice";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

/**
 * Main
 */

const ITEM_PER_PAGE = 15;

handler.get(async (req: any, res: any) => {
  const { userId } = req;
  const { pageIndex } = req.query;

  try {
    const Event = req.mongoose.model("Event");
    const User = req.mongoose.model("User");
    const Place = req.mongoose.model("Place");

    const latestEvents = await Event.find({})
      .sort({ timestamp: -1 })
      .skip(ITEM_PER_PAGE * pageIndex)
      .limit(ITEM_PER_PAGE)
      .lean();

    // get user info
    const userIds = latestEvents.map((l: any) => l.userId);
    const users = await User.find({ _id: userIds }).lean();

    // get place info
    const placeIds = latestEvents.map((l: any) => l.placeId);
    const places = await Place.find({ id: placeIds }).lean();

    const latestEventsWithData: EventWithData[] = latestEvents.map(
      (eventItem: any) => {
        const user = users.find(
          (user: any) => user._id.toString() === eventItem.userId
        );
        const place = places.find(
          (place: any) => place.id === eventItem.placeId
        );

        return {
          _id: eventItem._id,
          userId: eventItem.userId,
          title: eventItem.title,
          timestamp: eventItem.timestamp,
          placeId: eventItem.placeId,
          body: eventItem.body,
          isOfficial: eventItem.isOfficial,
          // user
          userPicture: user.picture,
          userSubId: user.id,
          // place
          placePictures: place ? place.images : "",
          placeType: place ? place.placeType : "",
          placeName: place ? place.spotName : "",
          placeAddress: place ? place.spotAddress : "",
        };
      }
    );

    // get recent checkins
    return res.status(200).json({ latestEvents: latestEventsWithData });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
