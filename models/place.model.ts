import { STATUS_OPEN } from "./../constants";

export const PlaceSchema = (mongoose: any) => {
  const { Schema } = mongoose;

  const PlaceSchema = new Schema({
    id: { type: String, index: { unique: true } },
    placeType: { type: String, default: "" },
    discoveredBy: { type: String, default: "" },
    googlePlaceId: { type: String, default: "" },
    spotName: { type: String, default: "" },
    location: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: { type: [Number], default: [0, 0] },
    },
    spotAddress: { type: String, default: "" },
    country: { type: String, default: "" },
    thumbnail: { type: String, default: "" },
    images: { type: [String], default: [] },
    speedDown: { type: Number, default: 0 },
    speedUp: { type: Number, default: 0 },
    testCnt: { type: Number, default: 0 },
    availability: { type: [String], default: [] },
    reviewStars: { type: Number, default: 0 },
    status: { type: String, default: STATUS_OPEN },
    created: {
      type: Date,
      default: Date.now,
    },
  });
  try {
    PlaceSchema.index({ location: "2dsphere" });

    mongoose.model("Place", PlaceSchema);
  } catch (error: any) {}
};
