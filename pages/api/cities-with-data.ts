import { fetchPlacesWithFilter } from "./../../modules/api/fetchPlacesWithFilter";
import { APP_URL, PLACE_TYPE_CAFE, STATUS_OPEN } from "./../../constants";
import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { Boundary, City, CityWithData } from "../../data/articles/cities";
import places from "./places";
import { initialFilterObj } from "../../redux/slices/placeSlice";
import { getAverage } from "../../modules/Math";
import { getUnsplashImageTop } from "../../modules/api/getUnslashImageTop";
import mongoose from "mongoose";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

const getCityMetaData = async (boundary: Boundary | null, mongoose: any) => {
  const { places } = await fetchPlacesWithFilter(
    mongoose,
    "",
    boundary,
    initialFilterObj,
    0,
    1000
  );

  const spotCnt = places.length;
  const placesWithSpeed = places.filter((place) => place.speedDown !== 0);
  const downSpeedArr = placesWithSpeed.map((place) => place.speedDown);
  const avgSpeed = downSpeedArr.length > 0 ? getAverage(downSpeedArr) : 0;

  return {
    spotCnt,
    avgSpeed,
  };
};

handler.post(async (req: any, res: any) => {
  const Place = mongoose.model("Place");
  //   const { userId } = req;
  const { cities } = req.body;

  try {
    const citiesWithData: CityWithData[] = [];
    let loopCnt = 0;

    // add world
    // const { spotCnt, avgSpeed } = await getCityMetaData(null, req.mongoose);
    // const world: CityWithData = {
    //   avgSpeed,
    //   boundary: null,
    //   city: "World",
    //   country: "",
    //   spotCnt,
    //   slug: "world",
    //   thumbnail: `${APP_URL}/img/img/world/world1.jpg`,
    // };
    // citiesWithData.push(world);

    // add cities
    while (citiesWithData.length < cities.length) {
      const city: City = cities[loopCnt];

      const { spotCnt, avgSpeed } = await getCityMetaData(
        city.boundary,
        req.mongoose
      );

      // get image
      const image = await getUnsplashImageTop(`${city.city}, ${city.country}`);

      citiesWithData.push({
        ...city,
        spotCnt,
        avgSpeed,
        thumbnail: image || city.thumbnail,
      });

      loopCnt += 1;
    }

    citiesWithData.sort((a, b) => b.spotCnt - a.spotCnt);

    const totalPlaceCnt = await Place.count({ status: STATUS_OPEN });

    return res.status(200).json({ citiesWithData, totalPlaceCnt });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
