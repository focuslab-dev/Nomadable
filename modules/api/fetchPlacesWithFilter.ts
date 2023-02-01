import {
  SORT_BY_CHECK_INS,
  SORT_BY_DISTANCE,
  SORT_BY_REVIEW,
  SORT_BY_SPEED,
  STATUS_OPEN,
  STATUS_TEMP_CLOSE,
} from "./../../constants";
import { Boundary } from "../../data/articles/cities";
import { FilterObj, PlaceHeader } from "../../redux/slices/placeSlice";
import places from "../../pages/api/places";
import { pipeline } from "stream";

const makeCondition = async (
  mongoose: any,
  filterObj: FilterObj,
  boundary: Boundary | null,
  savedPlaceIds: string[]
) => {
  const SavedPlace = mongoose.model("SavedPlace");

  const placeTypeFilter =
    filterObj.placeTypes.length > 0
      ? { $in: filterObj.placeTypes }
      : { $exists: true };

  const availabilityFilter =
    filterObj.availability.length > 0
      ? { $all: filterObj.availability }
      : { $exists: true };

  const boundaryCondition = boundary
    ? {
        $geoWithin: {
          $box: [
            [boundary.lngStart, boundary.latStart],
            [boundary.lngEnd, boundary.latEnd],
          ],
        },
      }
    : { $exists: true };

  // }

  const condition = {
    placeType: placeTypeFilter,
    availability: availabilityFilter,
    status: { $in: [STATUS_OPEN, STATUS_TEMP_CLOSE] },
    id: filterObj.saved ? { $in: savedPlaceIds } : { $exists: true },
    location: boundaryCondition,
  };

  return condition;
};

const makeSortCondition = (sortBy: string) => {
  switch (sortBy) {
    case SORT_BY_REVIEW:
      return { reviewStars: -1, testCnt: -1 };
    case SORT_BY_CHECK_INS:
      return { testCnt: -1, reviewStars: -1 };
    case SORT_BY_SPEED:
      return { speedDown: -1 };
    default:
      return { reviewStars: -1, testCnt: -1 };
  }
};

const makePipeline = (
  condition: any,
  filterObj: FilterObj,
  userLng: number | undefined,
  userLat: number | undefined,
  maxDistance?: number
) => {
  const pipeline: any[] = [];

  if (userLng && userLat && filterObj.sortBy === SORT_BY_DISTANCE) {
    pipeline.push({
      $geoNear: {
        near: { type: "Point", coordinates: [userLng, userLat] },
        spherical: true,
        maxDistance: maxDistance || 100 * 1000,
        distanceField: "distance",
      },
    });
  }

  pipeline.push({ $match: condition });

  if (filterObj.sortBy !== SORT_BY_DISTANCE) {
    pipeline.push({
      $sort: makeSortCondition(filterObj.sortBy),
    });
  }

  return pipeline;
};

export const fetchPlacesWithFilter = async (
  mongoose: any,
  userId: string,
  boundary: Boundary | null,
  filterObj: FilterObj,
  skip: number,
  limit: number,
  userLng?: number,
  userLat?: number,
  maxDistance?: number
): Promise<{ places: PlaceHeader[]; totalPlaceCnt: number }> => {
  try {
    const Place = mongoose.model("Place");
    const SavedPlace = mongoose.model("SavedPlace");

    const savedPlaces = await SavedPlace.find({ userId }).lean();
    const savedPlaceIds = savedPlaces.map((p: any) => p.placeId);

    const condition = await makeCondition(
      mongoose,
      filterObj,
      boundary,
      savedPlaceIds
    );

    // get place
    const pipeline: any[] = makePipeline(
      condition,
      filterObj,
      userLng,
      userLat,
      maxDistance
    );

    const places = await Place.aggregate(
      pipeline.concat([{ $skip: skip }, { $limit: limit }])
    );

    const placeHeaders = places.map((p: any) => {
      return {
        ...p,
        savedByUser: savedPlaceIds.includes(p.id),
      };
    });

    const totalPlaceCnt = await Place.aggregate(
      pipeline.concat([{ $count: "cnt" }])
    );

    return {
      places: placeHeaders,
      totalPlaceCnt: totalPlaceCnt.length > 0 ? totalPlaceCnt[0].cnt : 0,
    };
  } catch (err) {
    throw err;
  }
};
