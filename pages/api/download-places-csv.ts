import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { Place } from "../../redux/slices/placeSlice";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

const DELIMITER = "\t";

const makeCsvContent = (placeData: any[]) => {
  const csvMeta = "data:text/csv;charset=utf-8,";
  const headerItems = Object.keys(placeData[0]);
  const csvHeader = headerItems.join(DELIMITER) + "\n";

  const csvBody = placeData
    .map((pd) => {
      const row = Object.entries(pd)
        .map(([_, entry]) => entry || " ")
        .join(DELIMITER);
      return `${row}\n`;
    })
    .join("");

  return `${csvMeta}${csvHeader}${csvBody}`;
};

handler.get(async (req: any, res: any) => {
  const { userId } = req;

  try {
    const Place = req.mongoose.model("Place");
    const SavedPlace = req.mongoose.model("SavedPlace");

    // get data from DB
    const places = await Place.find({}).lean();
    const savedPlaces = !userId ? [] : await SavedPlace.find({ userId }).lean();
    const savedPlaceIds = savedPlaces.map((pl: any) => pl.placeId);

    // make csv data
    const placeData = places.map((place: Place) => {
      return {
        id: place.id,
        placeType: place.placeType,
        // googlePlaceId: place.googlePlaceId,
        name: place.spotName,
        lng: place.location.coordinates[0],
        lat: place.location.coordinates[1],
        address: place.spotAddress,
        country: place.country,
        image: place.thumbnail,
        speedDown: place.speedDown,
        speedUp: place.speedUp,
        checkInCnt: place.testCnt,
        basicInfo: place.availability.join(", "),
        stars: Math.floor(place.reviewStars * 10) / 10,
        status: place.status,
        savedByYou: savedPlaceIds.includes(place.id) ? "saved" : "",
      };
    });

    // make csv content
    const csvContent = makeCsvContent(placeData);

    return res.status(200).json({ csvContent });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING });
  }
});

export default handler;
