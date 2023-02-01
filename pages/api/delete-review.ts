import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { updateReviewStarsOfPlace } from "../../modules/api/updateReviewStarsOfPlace";
import { makeReviewsWithData } from "../../modules/api/makeReviewsWithData";
import { deletePoint } from "../../modules/api/addPoint";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.post(async (req: any, res: any) => {
  const { userId } = req;
  const { reviewId, placeId } = req.body;

  try {
    const Review = req.mongoose.model("Review");

    await Review.remove({ userId, _id: reviewId });

    const reviewStars = await updateReviewStarsOfPlace(req.mongoose, placeId);
    await deletePoint(req.mongoose, userId, reviewId);

    return res.status(200).json({ reviewStars });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
