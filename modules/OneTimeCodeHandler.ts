import cryptoRandomString from "crypto-random-string";

const TYPE_USER_VERIFY = "user_verify";

// expireIn = minutes
export const makeOneTimeCode = async (
  key: string,
  expireIn: number,
  mongoose: any
): Promise<string> => {
  try {
    const OneTimeCode = mongoose.model("OneTimeCode");

    const code = cryptoRandomString({ length: 16, type: "url-safe" });
    const expireAt = new Date();
    expireAt.setMinutes(expireAt.getMinutes() + expireIn);

    await OneTimeCode.create({
      type: TYPE_USER_VERIFY,
      key,
      value: code,
      expireAt,
    });

    return code;
  } catch (err) {
    throw err;
  }
};
