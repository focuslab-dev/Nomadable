export const EventSchema = (mongoose: any) => {
  const { Schema } = mongoose;

  const EventSchema = new Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    timestamp: { type: Number, default: Date.now },
    placeId: { type: String, required: false },
    body: { type: String, default: "" },
    isOfficial: { type: Boolean, default: false },
  });
  try {
    EventSchema.index({
      timestamp: -1,
    });

    mongoose.model("Event", EventSchema);
  } catch (error: any) {}
};
