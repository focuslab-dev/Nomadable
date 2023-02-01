import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

/**
 * Function
 */

/**
 * Main
 */

handler.get(async (req: any, res: any) => {
  const { userId } = req;

  try {
    const Place = req.mongoose.model("Place");
    const CheckIn = req.mongoose.model("CheckIn");

    // get recent checkins
    const recentCheckIns = await CheckIn.aggregate([
      {
        $match: {
          userId,
        },
      },
      {
        $group: {
          _id: "$placeId",
          lastCheckIn: {
            $max: "$checkInTime",
          },
        },
      },
      {
        $sort: {
          lastCheckIn: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    const placeIds = recentCheckIns.map((ch: any) => ch._id);

    const places = await Place.find({ id: placeIds }).lean();

    const placeInOrder = recentCheckIns.map((ch: any) => {
      const place = places.find((p: any) => p.id === ch._id);
      return place;
    });

    return res.status(200).json({ recentCheckIns: placeInOrder });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
