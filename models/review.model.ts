export const ReviewSchema = (mongoose: any) => {
  const { Schema } = mongoose;

  const ReviewSchema = new Schema({
    placeId: { type: String },
    userId: { type: String },
    stars: { type: Number, default: 1 },
    comment: { type: String, default: "" },
    voteScore: { type: Number, default: 0 },
    upVoters: { type: [String], default: [] },
    downVoters: { type: [String], default: [] },
    created: {
      type: Date,
      default: Date.now,
    },
  });
  try {
    ReviewSchema.index(
      {
        placeId: 1,
      },
      { unique: false }
    );

    mongoose.model("Review", ReviewSchema);
  } catch (error: any) {}
};
