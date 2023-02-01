export const NotificationSchema = (mongoose: any) => {
  const { Schema } = mongoose;

  const NotificationSchema = new Schema({
    notifyTo: { type: String, required: true },
    userId: { type: String, required: false },
    title: { type: String, required: true },
    timestamp: { type: Number, default: Date.now },
    placeId: { type: String, required: false },
    body: { type: String, default: "" },
    isOfficial: { type: Boolean, default: false },
    notificationType: { type: String, required: true },
    seen: { type: Boolean, default: false },
  });
  try {
    NotificationSchema.index({
      timestamp: -1,
    });

    mongoose.model("Notification", NotificationSchema);
  } catch (error: any) {}
};
