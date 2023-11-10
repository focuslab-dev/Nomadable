import {
  Review,
  ReviewAspects,
  initialReviewAspects,
} from "../../redux/slices/placeSlice";

export const getAvgReviewAspects = (reviews: Review[]) => {
  const reviewAspectsValues: any = {};
  Object.keys(initialReviewAspects).forEach((key) => {
    reviewAspectsValues[key] = [];
  });

  reviews.forEach((review: any) => {
    if (!review.reviewAspects) return;

    Object.keys(reviewAspectsValues).forEach((key) => {
      review.reviewAspects[key] &&
        reviewAspectsValues[key].push(review.reviewAspects[key]);
    });
  });

  const avgReviewAspects: any = {};
  Object.keys(initialReviewAspects).forEach((key) => {
    avgReviewAspects[key] = null;
  });

  Object.keys(reviewAspectsValues).forEach((key) => {
    avgReviewAspects[key] =
      reviewAspectsValues[key].length < 1
        ? null
        : reviewAspectsValues[key].reduce((a: number, b: number) => a + b, 0) /
          reviewAspectsValues[key].length;
  });

  const avgReviewAspectsValues: any = Object.values(avgReviewAspects).filter(
    (value) => typeof value === "number"
  );

  const avgStars =
    avgReviewAspectsValues.reduce((a: number, b: number) => a + b, 0) /
    avgReviewAspectsValues.length;

  return { avgReviewAspects, avgStars };
};

export const updateReviewStarsOfPlace = async (
  mongoose: any,
  placeId: string
): Promise<{
  avgStars: number;
  avgReviewAspects: object;
}> => {
  try {
    const Review = mongoose.model("Review");
    const Place = mongoose.model("Place");

    const reviews = await Review.find({ placeId }).lean();

    const { avgReviewAspects, avgStars } = getAvgReviewAspects(reviews);

    await Place.updateOne(
      { id: placeId },
      {
        $set: {
          avgReviewAspects,
          reviewStars: avgStars || 0,
        },
      }
    );

    return { avgStars, avgReviewAspects };
  } catch (err) {
    throw err;
  }
};
