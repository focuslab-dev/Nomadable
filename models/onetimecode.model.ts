export const OneTimeCodeSchema = (mongoose: any) => {
  const { Schema } = mongoose;

  const OneTimeCodeSchema = new Schema({
    type: String,
    key: String,
    value: String,
    expireAt: Date,
    created: {
      type: Date,
      default: Date.now,
    },
  });
  try {
    OneTimeCodeSchema.index(
      {
        value: 1,
      },
      { unique: false }
    );

    mongoose.model("OneTimeCode", OneTimeCodeSchema);
  } catch (error: any) {}
};
