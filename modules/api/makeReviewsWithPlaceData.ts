import {
  ReviewWithData,
  ReviewWithPlaceData,
} from "./../../redux/slices/placeSlice";
import { Review } from "../../redux/slices/placeSlice";

export const makeReviewsWithPlaceData = async (
  mongoose: any,
  reviews: Review[]
): Promise<ReviewWithPlaceData[]> => {
  try {
    const Place = mongoose.model("Place");

    const placeIds = reviews.map((r) => r.placeId);

    const places = await Place.find({ id: { $in: placeIds } }).lean();

    const reviewsWithPlaceData = reviews.map((review) => {
      const place = places.find((p: any) => p.id === review.placeId);
      return {
        ...review,
        placeType: place.placeType,
        spotName: place.spotName,
        spotAddress: place.spotAddress,
        thumbnail: place.thumbnail,
      };
    });

    return reviewsWithPlaceData;
  } catch (err) {
    throw err;
  }
};
