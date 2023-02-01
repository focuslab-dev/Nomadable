import { addNewEvent } from "./../../modules/api/addNewEvent";
import { APP_URL } from "./../../constants";
import nextConnect from "next-connect";

import { ERR_VERIFICATION_EXPIRED } from "./../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { generateToken } from "../../modules/AuthUtils";
import user from "./user";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

export const addNewUserEvent = async (mongoose: any, userId: string) => {
  await addNewEvent(mongoose, {
    userId,
    title: "has just joined the community 🎉",
    timestamp: Date.now(),
    body: "",
    isOfficial: false,
    placeId: "",
  });
};

handler.post(async (req: any, res: any) => {
  const { verificationCode } = req.body;

  try {
    const User = req.mongoose.model("User");
    const OneTimeCode = req.mongoose.model("OneTimeCode");

    // get verification code object
    const code = await OneTimeCode.findOne({ value: verificationCode });

    if (!code || code.expireAt < new Date()) throw Error;

    // get user
    const user = await User.findOne({
      email: code.key,
    });

    if (!user) throw Error;

    // modify user
    user.verified = true;
    const iconNum = Math.floor(Math.random() * 8);
    user.picture = `/img/profile-icons/profile-icon${iconNum}.png`;
    await user.save();

    const token = generateToken(user._id);

    await addNewUserEvent(req.mongoose, user._id.toString());

    return res.status(200).json({ token });
  } catch (error: any) {
    return res.status(500).json(ERR_VERIFICATION_EXPIRED);
  }
});

export default handler;
