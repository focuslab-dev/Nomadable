import { STATUS_OPEN } from "./../constants";

export const SavedPlaceSchema = (mongoose: any) => {
  const { Schema } = mongoose;

  const SavedPlaceSchema = new Schema({
    userId: { type: String, required: true },
    placeId: { type: String, required: true },
    created: {
      type: Date,
      default: Date.now,
    },
  });

  SavedPlaceSchema.index(
    {
      userId: 1,
    },
    { unique: false }
  );

  try {
    mongoose.model("SavedPlace", SavedPlaceSchema);
  } catch (error: any) {}
};
