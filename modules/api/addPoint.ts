import {
  getPointPlan,
  POINT_TYPE_ADD_PLACE,
  POINT_TYPE_BE_CHECKED_IN,
} from "./../../constants";
import {
  POINT_TYPE_CHECK_IN,
  POINT_TYPE_FIRST_CHECK_IN,
} from "../../constants";
import { Point } from "mapbox-gl";

/**
 * Private Functions
 */

const getTotalPointOfUser = async (
  Point: any,
  userId: string
): Promise<number> => {
  const totalPoint = await Point.aggregate([
    {
      $match: {
        userId,
      },
    },
    {
      $group: {
        _id: "$userId",
        total: {
          $sum: "$point",
        },
      },
    },
  ]);

  return totalPoint[0].total;
};

/**
 * Public Functions
 */

const distributePointsCheckIn = async (
  mongoose: any,
  checkInUser: string,
  discoveredBy: string,
  actionId: string,
  placeId: string,
  firstCheckIn: boolean
) => {
  const Point = mongoose.model("Point");

  const checkInType = firstCheckIn
    ? POINT_TYPE_FIRST_CHECK_IN
    : POINT_TYPE_CHECK_IN;

  const checkInPoint = getPointPlan(checkInType);
  const checkedInPoint = getPointPlan(POINT_TYPE_BE_CHECKED_IN);

  // send points to check in user
  await Point.create({
    userId: checkInUser,
    timestamp: Date.now(),
    point: checkInPoint,
    type: checkInType,
    actionId,
    placeId,
  });

  // send points to discoverer user
  await Point.create({
    userId: discoveredBy,
    timestamp: Date.now(),
    point: checkedInPoint,
    type: POINT_TYPE_BE_CHECKED_IN,
    actionId,
    placeId,
  });

  // get totalt point of user
  const totalPoint = await Point.aggregate([
    {
      $match: {
        userId: checkInUser,
      },
    },
    {
      $group: {
        _id: "$userId",
        total: {
          $sum: "$point",
        },
      },
    },
  ]);

  return {
    addingPoint:
      checkInUser === discoveredBy
        ? checkInPoint + checkedInPoint
        : checkInPoint,
    totalPoint: totalPoint[0].total,
  };
};

const distributePointsGeneral = async (
  mongoose: any,
  userId: string,
  actionId: string,
  placeId: string,
  pointType: string
) => {
  const Point = mongoose.model("Point");

  const addingPoint = getPointPlan(pointType);

  await Point.create({
    userId: userId,
    timestamp: Date.now(),
    point: addingPoint,
    type: pointType,
    actionId,
    placeId,
  });

  // get totalt point of user
  const totalPoint = await getTotalPointOfUser(Point, userId);

  return {
    addingPoint,
    totalPoint,
  };
};

const deletePoint = async (mongoose: any, userId: string, actionId: string) => {
  const Point = mongoose.model("Point");

  await Point.remove({
    userId: userId,
    actionId,
  });

  return;
};

export { distributePointsCheckIn, distributePointsGeneral, deletePoint };
