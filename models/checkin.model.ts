export const CheckInSchema = (mongoose: any) => {
  const { Schema } = mongoose;

  const CheckInSchema = new Schema({
    userId: { type: String, required: true },
    placeId: { type: String, required: true },
    speedDown: { type: Number || null },
    speedUp: { type: Number || null },
    checkInTime: { type: Date, required: true },
    isPublic: { type: Boolean, default: false },
  });
  try {
    CheckInSchema.index({
      placeId: 1,
    });

    CheckInSchema.index({
      userId: 1,
      placeId: 1,
    });

    CheckInSchema.index({
      userId: 1,
      checkInTime: -1,
    });

    mongoose.model("CheckIn", CheckInSchema);
  } catch (error: any) {}
};
