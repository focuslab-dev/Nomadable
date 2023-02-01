import { ReviewWithData } from "./../../redux/slices/placeSlice";
import { Review } from "../../redux/slices/placeSlice";

export const makeReviewsWithData = async (
  mongoose: any,
  reviews: Review[],
  myUserId?: string
): Promise<ReviewWithData[]> => {
  try {
    const User = mongoose.model("User");

    const userIds = reviews.map((r) => r.userId);

    const users = await User.find({ _id: { $in: userIds } }).lean();

    const revieswWithData = reviews.map((review) => {
      const user = users.find((u: any) => u._id.toString() === review.userId);
      return {
        ...review,
        userPicture: user.picture,
        userName: user.name,
        myReview: user._id.toString() === myUserId,
      };
    });

    return revieswWithData;
  } catch (err) {
    throw err;
  }
};
