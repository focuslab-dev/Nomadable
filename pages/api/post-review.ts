import { POINT_TYPE_REVIEW } from "./../../constants";
import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { updateReviewStarsOfPlace } from "../../modules/api/updateReviewStarsOfPlace";
import { makeReviewsWithData } from "../../modules/api/makeReviewsWithData";
import { distributePointsGeneral } from "../../modules/api/addPoint";
import { ReviewAspects } from "../../redux/slices/placeSlice";

const calcStars = (reviewAcpects: ReviewAspects) => {
  const reviewValues = Object.values(reviewAcpects);
  const reviewOnlyValues = reviewValues.filter(
    (value) => typeof value === "number"
  );

  const reviewValuesSum = reviewOnlyValues.reduce((acc, cur) => acc + cur, 0);
  const reviewValuesCnt = reviewOnlyValues.length;
  const reviewValuesAvg = reviewValuesSum / reviewValuesCnt;
  const reviewValuesAvgRounded = Math.round(reviewValuesAvg * 10) / 10;
  return reviewValuesAvgRounded;
};

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.post(async (req: any, res: any) => {
  const { userId } = req;
  const {
    placeId,
    // stars,
    comment,
    reviewAspects,
  } = req.body;

  try {
    const Review = req.mongoose.model("Review");

    let pointResult = { addingPoint: 0, totalPoint: 0 };

    const existingReview = await Review.findOne({ placeId, userId });

    const stars = calcStars(reviewAspects);

    let review = await Review.findOneAndUpdate(
      {
        placeId,
        userId,
      },
      {
        $set: {
          placeId,
          userId,
          stars: stars || 0,
          comment,
          reviewAspects,
        },
      },
      {
        upsert: true,
        new: true,
      }
    );

    if (!existingReview) {
      pointResult = await distributePointsGeneral(
        req.mongoose,
        userId,
        review._doc._id,
        placeId,
        POINT_TYPE_REVIEW
      );
    }

    const [reviewWithData] = await makeReviewsWithData(
      req.mongoose,
      [review._doc],
      userId
    );

    const { avgStars, avgReviewAspects } = await updateReviewStarsOfPlace(
      req.mongoose,
      placeId
    );

    return res.status(200).json({
      reviewWithData,
      reviewStars: avgStars,
      avgReviewAspects,
      addingPoint: pointResult.addingPoint,
      totalPoint: pointResult.totalPoint,
    });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
