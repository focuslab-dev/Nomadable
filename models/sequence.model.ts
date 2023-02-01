export const SequenceSchema = (mongoose: any) => {
  const { Schema } = mongoose;

  const SequenceSchema = new Schema({
    itemName: String,
    secValue: Number,
    created: {
      type: Date,
      default: Date.now,
    },
  });
  try {
    mongoose.model("Sequence", SequenceSchema);
  } catch (error: any) {}
};
