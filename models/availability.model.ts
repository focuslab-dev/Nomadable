export const AvailabilitySchema = (mongoose: any) => {
  const { Schema } = mongoose;

  const AvailabilitySchema = new Schema({
    userId: { type: String, required: true },
    placeId: { type: String, required: true },
    vote: { type: Object, default: {} },
    created: { type: Date, default: Date.now },
  });
  try {
    AvailabilitySchema.index({
      placeId: 1,
    });

    mongoose.model("Availability", AvailabilitySchema);
  } catch (error: any) {}
};
