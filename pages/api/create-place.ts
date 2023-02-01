import { ERR_PLACE_EXISTS } from "./../../modules/ErrorCode";
import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import axios from "axios";
import { getPlacePhotos } from "../../modules/api/getPlacePhotos";
import { Place } from "../../redux/slices/placeSlice";
import { getUniqueSlug } from "../../modules/api/getUniqueSlug";
import { addNewEvent } from "../../modules/api/addNewEvent";
import { distributePointsGeneral } from "../../modules/api/addPoint";
import { getPointPlan, POINT_TYPE_ADD_PLACE } from "../../constants";
import { getImagesOfPlace } from "../../modules/api/getImagesOfPlace";

const PLACE_ID = "place_id";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: "100mb",
//     },
//   },
// };

handler.post(async (req: any, res: any) => {
  const { userId } = req;
  const place: Place = req.body.place;

  try {
    const Place = req.mongoose.model("Place");

    const existingPlace = await Place.findOne({
      googlePlaceId: place.googlePlaceId,
    });

    if (existingPlace) {
      return res
        .status(500)
        .json({ message: ERR_PLACE_EXISTS, placeId: existingPlace.id });
    }

    // const placeId = await getNextSequence(req.mongoose, PLACE_ID);
    const placeId = await getUniqueSlug(Place, place.spotName, "id");

    /**
     * Update Photos
     */

    const imageUrls = await getImagesOfPlace(place.googlePlaceId, 5);

    // create post

    const newPlace = await Place.create({
      ...place,
      id: placeId,
      discoveredBy: userId,
      images: imageUrls,
      thumbnail: imageUrls[0],
    });

    if (!newPlace) throw Error;

    await addNewEvent(req.mongoose, {
      userId,
      title: "has discovered a new place 🆕",
      timestamp: Date.now(),
      placeId: newPlace.id,
      body: "",
      isOfficial: false,
    });

    const { addingPoint, totalPoint } = await distributePointsGeneral(
      req.mongoose,
      userId,
      placeId,
      placeId,
      POINT_TYPE_ADD_PLACE
    );

    return res
      .status(200)
      .json({ placeId: newPlace.id, addingPoint, totalPoint });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
