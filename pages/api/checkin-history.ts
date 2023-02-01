import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import mongoose from "mongoose";
import { getUserWithStats } from "../../modules/api/getUserWithStats";
import { EventWithData } from "../../redux/slices/eventSlice";
import { CheckInHistoryItem } from "../../redux/slices/checkInSlice";
import { Place } from "../../redux/slices/placeSlice";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

/**
 * Main
 */

const ITEM_PER_PAGE = 100;

handler.get(async (req: any, res: any) => {
  const { userId } = req;
  const { pageIndex } = req.query;

  try {
    const CheckIn = req.mongoose.model("CheckIn");
    const Place = req.mongoose.model("Place");

    const latestCheckIns = await CheckIn.find({ userId })
      .sort({ checkInTime: -1 })
      .skip(ITEM_PER_PAGE * pageIndex)
      .limit(ITEM_PER_PAGE)
      .lean();

    // get place info
    const placeIds = latestCheckIns.map((l: any) => l.placeId);
    const places = await Place.find({ id: placeIds }).lean();

    const latestCheckInWithData: CheckInHistoryItem[] = latestCheckIns.map(
      (checkInItem: any) => {
        const place: Place = places.find(
          (place: any) => place.id === checkInItem.placeId
        );

        return {
          _id: checkInItem._id.toString(),
          placeId: checkInItem.placeId,
          checkInTime: checkInItem.checkInTime,
          placeImage: place.images[0],
          placeCountry:
            place.country || place.spotAddress.split(",").pop()?.trim(),
          placeName: place.spotName,
        };
      }
    );

    // get recent checkins
    return res.status(200).json({ checkInHistory: latestCheckInWithData });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
