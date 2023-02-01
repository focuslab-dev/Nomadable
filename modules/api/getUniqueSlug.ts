export const getUniqueSlug = async (
  Collection: any,
  text: string,
  collectionId: string
): Promise<string> => {
  let count = 0;
  let finalCandidate = "";

  while (finalCandidate === "") {
    const candidate = text
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/(-)\1+/g, "-");

    const candidateWithCount = `${candidate}${count > 0 ? `-${count}` : ""}`;

    const existing = await Collection.findOne({
      [collectionId]: candidateWithCount,
    }).lean();

    if (!existing) {
      finalCandidate = candidateWithCount;
    } else {
      count += 1;
    }
  }

  return finalCandidate;
};
