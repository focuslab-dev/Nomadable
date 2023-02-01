import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { NotificationWithData } from "../../redux/slices/notificationSlice";

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
    const Notification = req.mongoose.model("Notification");
    const User = req.mongoose.model("User");
    const Place = req.mongoose.model("Place");

    const latestNotifications = await Notification.find({ notifyTo: userId })
      .sort({ timestamp: -1 })
      .skip(ITEM_PER_PAGE * pageIndex)
      .limit(ITEM_PER_PAGE)
      .lean();

    // get user info
    const userIds = latestNotifications.map((l: any) => l.userId);
    const users = await User.find({ _id: userIds }).lean();

    // get place info
    const placeIds = latestNotifications.map((l: any) => l.placeId);
    const places = await Place.find({ id: placeIds }).lean();

    const latestNotificationsWithData: NotificationWithData[] =
      latestNotifications.map((notificationItem: any) => {
        const user = users.find(
          (user: any) => user._id.toString() === notificationItem.userId
        );
        const place = places.find(
          (place: any) => place.id === notificationItem.placeId
        );

        return {
          ...notificationItem,
          // user
          userPicture: user.picture,
          userSubId: user.id,
          // place
          placePictures: place ? place.images : "",
          placeType: place ? place.placeType : "",
          placeName: place ? place.spotName : "",
          placeAddress: place ? place.spotAddress : "",
        };
      });

    // make all notification seen
    await Notification.update(
      { notifyTo: userId },
      { $set: { seen: true } },
      { multi: true }
    );

    return res
      .status(200)
      .json({ latestNotifications: latestNotificationsWithData });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
