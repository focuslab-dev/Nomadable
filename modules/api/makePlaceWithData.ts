import {
  Place,
  PlaceUserData,
  PlaceWithData,
} from "../../redux/slices/placeSlice";
import { uniqueArray } from "../ArrayUtils";
import { makeReviewsWithData } from "./makeReviewsWithData";

export const getCheckInUsers = async (
  recentCheckIns: any[],
  User: any
): Promise<PlaceUserData[]> => {
  try {
    const publicCheckIns = recentCheckIns.filter((c: any) => c.isPublic);

    const recentCheckInUserIds = uniqueArray(
      publicCheckIns.map((c: any) => c.userId)
    );

    const recentCheckInUsers = await User.find({
      _id: { $in: recentCheckInUserIds },
    }).lean();

    const checkInUsers: PlaceUserData[] = recentCheckInUserIds.map(
      (userId: any) => {
        const user = recentCheckInUsers.find((u: any) => {
          return u._id.toString() === userId;
        });
        return {
          userId: user.id,
          userName: user.name,
          userPicture: user.picture,
          userDescription: user.description,
          userTitle: user.title,
        };
      }
    );

    return checkInUsers.slice(0, 4);
  } catch (err) {
    return [];
  }
};

export const makePlaceWithData = async (
  mongoose: any,
  place: Place,
  userId?: string
) => {
  try {
    const User = mongoose.model("User");
    const CheckIn = mongoose.model("CheckIn");
    const Review = mongoose.model("Review");
    const SavedPlace = mongoose.model("SavedPlace");

    // get user
    const discoverUser = await User.findOne({ _id: place.discoveredBy });

    // check if there is a check-in by the same user in 6 hours
    const ago = new Date();
    ago.setHours(ago.getHours() - 6);

    const recentCheckInByUser = await CheckIn.findOne({
      placeId: place.id,
      userId,
      checkInTime: { $gt: ago },
    }).lean();

    const recentCheckIns = await CheckIn.find({
      placeId: place.id,
      // checkInTime: { $gt: yearAgo },
    })
      .sort({ checkInTime: -1 })
      .lean();

    // get reviews
    const reviews = await Review.find({ placeId: place.id })
      .sort({
        votedValue: -1,
      })
      .lean();

    const reviewsWithData = await makeReviewsWithData(
      mongoose,
      reviews,
      userId
    );

    const savedByUser = await SavedPlace.exists({ userId, placeId: place.id });

    const checkInUsers = await getCheckInUsers(recentCheckIns, User);

    // make
    const placeWithData: PlaceWithData = {
      ...place,
      userId: discoverUser ? discoverUser.id : "",
      userName: discoverUser ? discoverUser.name : "",
      userPicture: discoverUser ? discoverUser.picture : "",
      userDescription: discoverUser ? discoverUser.description : "",
      userTitle: discoverUser ? discoverUser.title : "",
      recentCheckInCnt: recentCheckIns.length,
      checkedInByUser: recentCheckInByUser ? true : false,
      checkInUsers,
      savedByUser,
      reviewsWithData,
    };

    return placeWithData;
  } catch (err) {
    throw err;
  }
};
