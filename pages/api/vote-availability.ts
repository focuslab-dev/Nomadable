import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { Availability, Vote } from "../../redux/slices/placeSlice";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

/**
 * Function
 */

const makeNewAvailability = async (
  mongoose: any,
  placeId: string
): Promise<Vote> => {
  const AvailabilitySchema = mongoose.model("Availability");

  const availabilities: Availability[] = await AvailabilitySchema.find({
    placeId,
  }).lean();

  // determine most voted placeType
  let finalPlaceType: string = "";
  let maxCount = 0;
  let placeTypeMap: any = {};

  availabilities.forEach((availability) => {
    const _placeType = availability.vote.placeType;

    if (placeTypeMap[_placeType] == null) {
      placeTypeMap[_placeType] = 1;
    } else {
      placeTypeMap[_placeType] += 1;
    }

    if (placeTypeMap[_placeType] > maxCount) {
      finalPlaceType = _placeType;
      maxCount = placeTypeMap[_placeType];
    }
  });

  // determine most voted availabilities
  let availabilityMap: any = {};
  const availabilitiesOfPlaceType = availabilities.filter(
    (avl) => avl.vote.placeType === finalPlaceType
  );

  availabilitiesOfPlaceType.forEach((availability) => {
    // add elms
    availability.vote.availability.forEach((item) => {
      if (!availabilityMap[item]) {
        availabilityMap[item] = 1;
      } else {
        availabilityMap[item] += 1;
      }
    });
  });

  const halfNumber = availabilitiesOfPlaceType.length / 2;
  const finalAvailabilities: string[] = [];
  Object.entries(availabilityMap).forEach(([key, value]: any) => {
    if (value > halfNumber) {
      finalAvailabilities.push(key);
    }
  });

  return {
    placeType: finalPlaceType,
    availability: finalAvailabilities,
  };
};

/**
 * Main
 */

handler.post(async (req: any, res: any) => {
  const { userId } = req;
  const { placeId, vote } = req.body;

  try {
    const Place = req.mongoose.model("Place");
    const AvailabilitySchema = req.mongoose.model("Availability");

    await AvailabilitySchema.findOneAndUpdate(
      {
        userId,
        placeId,
      },
      {
        userId,
        placeId,
        vote,
      },
      {
        upsert: true,
      }
    );

    const { placeType, availability } = await makeNewAvailability(
      req.mongoose,
      placeId
    );

    await Place.findOneAndUpdate(
      { id: placeId },
      {
        placeType,
        availability,
      }
    );

    return res.status(200).json({ placeId, placeType, availability });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
