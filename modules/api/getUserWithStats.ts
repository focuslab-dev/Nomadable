import { Point } from "mapbox-gl";
import { UserWithStats } from "../../redux/slices/userSlice";

export const getUserWithStats = async (
  userId: string,
  mongoose: any,
  myAccount: boolean
) => {
  const User = mongoose.model("User");
  const Point = mongoose.model("Point");
  const Place = mongoose.model("Place");
  const CheckIn = mongoose.model("CheckIn");
  const Review = mongoose.model("Review");

  try {
    const user = await User.findOne({ _id: userId }).lean();
    // const monthAgo = Date.now() - 1000 * 60 * 60 * 24 * 30;

    // get point ranking
    const ranking = await Point.aggregate([
      // { $match: { timestamp: { $gt: monthAgo } } },
      { $group: { _id: "$userId", total: { $sum: "$point" } } },
      { $sort: { total: -1 } },
    ]);

    const indexOfUser = ranking.findIndex(
      (r: any) => r._id.toString() === userId
    );

    // discovered places
    const discoveredPlaceCnt = await Place.count({ discoveredBy: userId });
    const reviewCnt = await Review.count({ userId });

    // check ins
    const checkInCnt = await CheckIn.count({ userId });

    const userWithStats: UserWithStats = {
      _id: user._id,
      id: user.id,
      email: myAccount ? user.email : "",
      name: user.name,
      picture: user.picture,
      title: user.title,
      description: user.description,
      link: user.link,
      created: user.created,
      // outer data
      points: ranking[indexOfUser] ? ranking[indexOfUser].total : 0,
      ranking: indexOfUser < 0 ? ranking.length + 1 : indexOfUser + 1,
      discovered: discoveredPlaceCnt,
      reviews: reviewCnt,
      checkIns: checkInCnt,
    };

    return userWithStats;
  } catch (err) {
    throw err;
  }
};
