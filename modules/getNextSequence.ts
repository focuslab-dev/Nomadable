export const getNextSequence = async (
  mongoose: any,
  itemName: string
): Promise<string> => {
  try {
    const Sequence = mongoose.model("Sequence");
    const sequence = await Sequence.findOneAndUpdate(
      { itemName },
      { $inc: { secValue: 1 } },
      { upsert: true, new: true }
    );
    return sequence.secValue;
  } catch (err) {
    throw Error;
  }
};

export const getNextSequences = async (
  mongoose: any,
  itemName: string,
  amount: number
): Promise<string[]> => {
  try {
    const Sequence = mongoose.model("Sequence");
    const sequence = await Sequence.findOneAndUpdate(
      { itemName },
      { $inc: { secValue: amount } },
      { upsert: true, new: true }
    );

    const lastValue = sequence.secValue;
    const firstValue = lastValue - amount;

    const values = Array.from({ length: amount }, (_, i) =>
      (firstValue + i).toString()
    );

    return values;
  } catch (err) {
    throw Error;
  }
};
