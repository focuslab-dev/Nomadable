import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import axios from "axios";
import { config } from "aws-sdk";
import { text } from "stream/consumers";
import { SpotPrediction } from "../../redux/slices/api/apiSpotSlice";

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

const deg2rad = (deg: number) => {
  return deg * (Math.PI / 180);
};

const calcDistanceInKm = (
  location1: { lat: number; lng: number } | false,
  location2: { lat: number; lng: number }
) => {
  if (!location1) return null;

  const lat1 = location1.lat;
  const lon1 = location1.lng;
  const lat2 = location2.lat;
  const lon2 = location2.lng;

  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km

  return d;
};

handler.get(async (req: any, res: any) => {
  const { text } = req.query;
  const location = JSON.parse(req.query.location);
  const Place = req.mongoose.model("Place");

  try {
    const { results } = await getPlaceCandidates(text, location);

    const resultsFiltered = results.filter((p: any) => {
      return (
        typeof p.place_id === "string" &&
        p.business_status !== "CLOSED_PERMANENTLY"
      );
    });

    // make spotPredictions

    const allPlaces = await Place.find({}).lean();

    const spotPredictions = resultsFiltered.map((p: any) => {
      const distance = calcDistanceInKm(location, p.geometry.location);
      const place = allPlaces.find((place: any) => {
        return place.googlePlaceId === p.place_id;
      });

      const spotPrediction: SpotPrediction = {
        googlePlaceId: p.place_id,
        mainText: p.name,
        secondaryText: p.formatted_address,
        placeId: place ? place.id : "",
        distance,
      };

      return spotPrediction;
    });

    return res
      .status(200)
      .json({ spotPredictions: spotPredictions.slice(0, 5) });
  } catch (error: any) {
    return res.status(500).json(ERR_SOMETHING);
  }
});

export default handler;
