import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import axios from "axios";
import { Spot } from "../../redux/slices/placeSlice";
import { initialSpot } from "../../redux/slices/api/apiSpotSlice";
import GoogleMapAPI from "../../modules/GoogleMapAPI";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.get(async (req: any, res: any) => {
  const { googlePlaceId } = req.query;

  try {
    const data = await GoogleMapAPI.getPlaceDetail(googlePlaceId);

    const country = data.result.address_components.find(
      (c: any) => c.types[0] === "country"
    ).long_name;

    const spot: Spot = {
      ...initialSpot,
      location: {
        coordinates: [
          data.result.geometry.location.lng,
          data.result.geometry.location.lat,
        ],
      },
      country,
    };

    return res.status(200).json({ spot });
  } catch (error: any) {
    return res.status(500).json(ERR_SOMETHING);
  }
});

export default handler;
