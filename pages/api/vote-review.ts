import {
  getPointPlan,
  NOTIFY_TYPE_UPV_REVIEW,
  POINT_TYPE_REVIEW,
} from "./../../constants";
import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { updateReviewStarsOfPlace } from "../../modules/api/updateReviewStarsOfPlace";
import { makeReviewsWithData } from "../../modules/api/makeReviewsWithData";
import { distributePointsGeneral } from "../../modules/api/addPoint";
import { Review } from "../../redux/slices/placeSlice";
import {
  addNewNotification,
  removeNotification,
} from "../../modules/api/addNewNotification";
import { Notification } from "../../redux/slices/notificationSlice";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.post(async (req: any, res: any) => {
  const { userId } = req;
  const { reviewId, isUpvote, clearVote } = req.body;

  try {
    const Review = req.mongoose.model("Review");

    // update review
    const review = await Review.findOne({ _id: reviewId });

    review.upVoters = review.upVoters.filter(
      (voter: string) => voter !== userId
    );

    review.downVoters = review.downVoters.filter(
      (voter: string) => voter !== userId
    );

    if (!clearVote) {
      if (isUpvote) {
        review.upVoters.push(userId);
      } else {
        review.downVoters.push(userId);
      }
    }

    review.voteScore = review.upVoters.length - review.downVoters.length;

    await review.save();

    const [reviewWithData] = await makeReviewsWithData(
      req.mongoose,
      [review._doc],
      userId
    );

    // add to notification
    if (clearVote || !isUpvote) {
      await removeNotification(
        req.mongoose,
        review.userId,
        userId,
        NOTIFY_TYPE_UPV_REVIEW
      );
    } else {
      const notificationItem: Notification = {
        notifyTo: review.userId,
        userId,
        title: `upvoted your review ⬆️`,
        timestamp: Date.now(),
        placeId: review.placeId,
        body: "",
        isOfficial: false,
        notificationType: NOTIFY_TYPE_UPV_REVIEW,
        seen: false,
      };
      await addNewNotification(req.mongoose, notificationItem);
    }

    return res.status(200).json({ reviewWithData });
  } catch (error: any) {
    console.log("error", error);
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
