import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import axios from "axios";
import { Spot } from "../../redux/slices/placeSlice";
import { initialSpot } from "../../redux/slices/api/apiSpotSlice";
import { getPlacePhotos } from "../../modules/api/getPlacePhotos";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

const getPlaceDetail = async (placeId: string) => {
  try {
    const URL = "https://maps.googleapis.com/maps/api/place/details/json";
    const KEY = `key=${process.env.GAPI_KEY}`;
    const INPUT = `place_id=${placeId}`;
    // const INPUT_TYPE = "inputtype=textquery";
    const LANG = "language=en";
    const ITEMS = "fields=address_component,name,geometry,formatted_address";

    const response = await axios({
      method: "get",
      url: `${URL}?${KEY}&${INPUT}&${LANG}&${ITEMS}`,
    });

    return response.data;
  } catch (error) {
    throw Error;
  }
};

handler.get(async (req: any, res: any) => {
  const { placeId } = req.query;

  try {
    const data = await getPlaceDetail(placeId);

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
