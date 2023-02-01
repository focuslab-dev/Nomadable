import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import axios from "axios";
import { config } from "aws-sdk";
import { text } from "stream/consumers";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

const getPlaceCandidates = async (
  input: string,
  location: { lat: number; lng: number } | false
) => {
  try {
    const URL = "https://maps.googleapis.com/maps/api/place/textsearch/json";
    const KEY = `key=${process.env.GAPI_KEY}`;
    const INPUT = `query=${encodeURIComponent(input.trim())}`;
    const LOCATION = location
      ? `&location=${location.lat},${location.lng}`
      : "";

    // const INPUT_TYPE = "inputtype=textquery";
    // const LANG = "language=en";
    // const ITEMS = "fields=place_id,name,structured_formatting";

    const response = await axios({
      method: "get",
      url: `${URL}?${KEY}&${INPUT}${LOCATION}`,
    });

    return response.data;
  } catch (error) {
    throw Error;
  }
};

handler.get(async (req: any, res: any) => {
  const { text } = req.query;
  const location = JSON.parse(req.query.location);

  try {
    const { results } = await getPlaceCandidates(text, location);

    const resultsFiltered = results.filter((p: any) => {
      return (
        typeof p.place_id === "string" &&
        p.business_status !== "CLOSED_PERMANENTLY"
      );
    });

    const spotPredictions = resultsFiltered.map((p: any) => ({
      placeId: p.place_id,
      mainText: p.name,
      secondaryText: p.formatted_address,
    }));

    return res
      .status(200)
      .json({ spotPredictions: spotPredictions.slice(0, 5) });
  } catch (error: any) {
    return res.status(500).json(ERR_SOMETHING);
  }
});

export default handler;
