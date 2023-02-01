import { POINT_TYPE_REVIEW } from "./../../constants";
import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { updateReviewStarsOfPlace } from "../../modules/api/updateReviewStarsOfPlace";
import { makeReviewsWithData } from "../../modules/api/makeReviewsWithData";
import { distributePointsGeneral } from "../../modules/api/addPoint";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.post(async (req: any, res: any) => {
  const { userId } = req;
  const { placeId, stars, comment } = req.body;

  try {
    const Review = req.mongoose.model("Review");

    let pointResult = { addingPoint: 0, totalPoint: 0 };

    let review = await Review.findOne({ placeId, userId });

    if (review) {
      review.stars = stars > 5 ? 5 : stars;
      review.comment = comment;
      await review.save();
    } else {
      review = await Review.create({
        placeId,
        userId,
        stars,
        comment,
      });

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

    const reviewStars = await updateReviewStarsOfPlace(req.mongoose, placeId);

    return res.status(200).json({
      reviewWithData,
      reviewStars,
      addingPoint: pointResult.addingPoint,
      totalPoint: pointResult.totalPoint,
    });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
