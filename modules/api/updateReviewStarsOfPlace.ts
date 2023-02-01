export const updateReviewStarsOfPlace = async (
  mongoose: any,
  placeId: string
): Promise<number> => {
  try {
    const Review = mongoose.model("Review");
    const Place = mongoose.model("Place");

    const averageStars = await Review.aggregate([
      {
        $match: { placeId },
      },
      {
        $group: {
          _id: "$placeId",
          avgStars: { $avg: "$stars" },
        },
      },
    ]);

    const reviewStars: number =
      averageStars.length > 0 ? averageStars[0].avgStars : 0;

    await Place.update(
      { id: placeId },
      {
        $set: { reviewStars },
      }
    );

    return reviewStars;
  } catch (err) {
    throw err;
  }
};
