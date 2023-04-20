import * as cons from "./../../constants";
import { Boundary } from "../../data/articles/cities";
import { FilterObj, PlaceHeader } from "../../redux/slices/placeSlice";
import { group } from "console";

const getAvailabilitiesOfPlaceType = (placeType: string) => {
  switch (placeType) {
    case cons.PLACE_TYPE_CAFE:
      return Object.keys(cons.AVL_CAFE_LIST);
    case cons.PLACE_TYPE_HOTEL:
      return Object.keys(cons.AVL_HOTEL_LIST);
    case cons.PLACE_TYPE_PUBLIC:
      return Object.keys(cons.AVL_PUBLICSPACE_LIST);
    case cons.PLACE_TYPE_WORKSPACE:
      return Object.keys(cons.AVL_WORKSPACE_LIST);
    default:
      return [];
  }
};

const extractAvailabilities = (
  availabilitiesInFilter: string[],
  placeType: string
) => {
  const availabilitiesOfPlaceType = getAvailabilitiesOfPlaceType(placeType);
  const availabilities = availabilitiesInFilter.filter((avl) =>
    availabilitiesOfPlaceType.includes(avl)
  );
  return availabilities;
};

// const getAvailabilityGroups = (availabilities: string[], LISTS: object[]) => {
//   const availabilityGroups = LISTS.map((LIST) => {
//     const availabilitiesOfList = extractAvailabilities(availabilities, LIST);
//     return availabilitiesOfList;
//   });

//   const availabilityGroupsFiltered = availabilityGroups.filter(
//     (group) => group.length > 0
//   );

//   return availabilityGroupsFiltered;
// };

const makeAvailabilityFilter = (
  placeTypes: string[],
  availavilities: string[]
) => {
  const availabilityFilters = placeTypes.map((placeType) => {
    const availabilitiesOfPlaceType = extractAvailabilities(
      availavilities,
      placeType
    );

    return {
      placeType,
      availability:
        availabilitiesOfPlaceType.length > 0
          ? { $all: availabilitiesOfPlaceType }
          : { $exists: true },
    };
  });

  return availabilityFilters;
};

const makeCondition = async (
  mongoose: any,
  filterObj: FilterObj,
  boundary: Boundary | null,
  savedPlaceIds: string[]
) => {
  const placeAndAvailabilityFilters = makeAvailabilityFilter(
    filterObj.placeTypes,
    filterObj.availability
  );

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

  let condition: any = {
    status: { $in: [cons.STATUS_OPEN, cons.STATUS_TEMP_CLOSE] },
    id: filterObj.saved ? { $in: savedPlaceIds } : { $exists: true },
    location: boundaryCondition,
    speedDown: { $gte: filterObj.wifiSpeed },
  };

  if (placeAndAvailabilityFilters.length > 0) {
    condition["$or"] = placeAndAvailabilityFilters;
  }

  return condition;
};

const makeSortCondition = (sortBy: string) => {
  switch (sortBy) {
    case cons.SORT_BY_REVIEW:
      return { reviewStars: -1, testCnt: -1 };
    case cons.SORT_BY_CHECK_INS:
      return { testCnt: -1, reviewStars: -1 };
    case cons.SORT_BY_SPEED:
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

  if (userLng && userLat && filterObj.sortBy === cons.SORT_BY_DISTANCE) {
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

  if (filterObj.sortBy !== cons.SORT_BY_DISTANCE) {
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
