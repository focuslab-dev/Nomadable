import { distributePointsCheckIn } from "./../../modules/api/addPoint";
import {
  getPointPlan,
  POINT_TYPE_BE_CHECKED_IN,
  POINT_TYPE_CHECK_IN,
} from "./../../constants";
import { getAverage } from "./../../modules/Math";
import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { makePlaceWithData } from "../../modules/api/makePlaceWithData";
import { addNewEvent } from "../../modules/api/addNewEvent";
import user from "./user";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

/**
 * Function
 */

const updateWifiSpeedOfPlace = async (
  Place: any,
  CheckIn: any,
  placeId: string
) => {
  try {
    const checkIns = await CheckIn.find({
      placeId,
      speedDown: { $ne: null },
      speedUp: { $ne: null },
    }).lean();

    const averageSpeedDown = getAverage(
      checkIns.map((checkin: any) => checkin.speedDown)
    );
    const averageSpeedUp = getAverage(
      checkIns.map((checkin: any) => checkin.speedUp)
    );

    const updatedPlace = await Place.findOneAndUpdate(
      { id: placeId },
      {
        speedDown: Math.round(averageSpeedDown),
        speedUp: Math.round(averageSpeedUp),
        testCnt: checkIns.length,
      },
      { new: true }
    ).lean();

    return updatedPlace;
  } catch (err) {
    throw err;
  }
};

/**
 * Main
 */

handler.post(async (req: any, res: any) => {
  const { userId } = req;

  const { speedDown, speedUp, placeId, isPublic } = req.body;

  try {
    const Place = req.mongoose.model("Place");
    const CheckIn = req.mongoose.model("CheckIn");

    const firstCheckIn = !(await CheckIn.exists({ placeId }));

    // create check in
    const checkin = await CheckIn.create({
      userId,
      placeId,
      speedDown,
      speedUp,
      isPublic,
      checkInTime: new Date(),
    });

    // update wifi speed of the place
    const updatedPlace = await updateWifiSpeedOfPlace(Place, CheckIn, placeId);

    const placeWithData = await makePlaceWithData(
      req.mongoose,
      updatedPlace,
      userId
    );

    // distribute points
    const { addingPoint, totalPoint } = await distributePointsCheckIn(
      req.mongoose,
      userId,
      updatedPlace.discoveredBy,
      checkin._id,
      placeId,
      firstCheckIn
    );

    // update event
    if (isPublic) {
      await addNewEvent(req.mongoose, {
        userId,
        title: `checked in to a place ✅`,
        timestamp: Date.now(),
        body: "",
        isOfficial: false,
        placeId,
      });
    }

    return res.status(200).json({ placeWithData, addingPoint, totalPoint });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
