import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { makeReviewsWithPlaceData } from "../../modules/api/makeReviewsWithPlaceData";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.get(async (req: any, res: any) => {
  const { userId, loadedCnt, loadingCnt, latest } = req.query;

  try {
    const Review = req.mongoose.model("Review");

    const sortObj = latest ? { created: -1 } : { voteScore: -1 };

    const reviews = await Review.find({ userId })
      .sort(sortObj)
      .skip(loadedCnt)
      .limit(loadingCnt)
      .lean();

    const reviewsWithPlaceData = await makeReviewsWithPlaceData(
      req.mongoose,
      reviews
    );

    return res.status(200).json({ reviews: reviewsWithPlaceData });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING });
  }
});

export default handler;
