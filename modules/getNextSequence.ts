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
    console.log("🚀 ~ file: getNextSequence.ts ~ line 30 ~ sequence", sequence);

    const lastValue = sequence.secValue;
    const firstValue = lastValue - amount;

    const values = Array.from({ length: amount }, (_, i) =>
      (firstValue + i).toString()
    );
    console.log("🚀 ~ file: getNextSequence.ts ~ line 36 ~ values", values);

    return values;
  } catch (err) {
    console.log("🚀 ~ file: getNextSequence.ts ~ line 40 ~ err", err);
    throw Error;
  }
};
