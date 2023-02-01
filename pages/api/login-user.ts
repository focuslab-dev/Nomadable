import nextConnect from "next-connect";

import { ERR_LOGIN_FAIL } from "./../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { generateToken, hashWithSalt } from "../../modules/AuthUtils";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.post(async (req: any, res: any) => {
  const { email, password } = req.body;

  try {
    const User = req.mongoose.model("User");

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(500).json(ERR_LOGIN_FAIL);
    }

    const hashedPassword = hashWithSalt(password, user.salt);
    if (hashedPassword !== user.password) throw Error;

    const token = generateToken(user._id);

    return res.status(200).json({ token });
  } catch (error: any) {
    return res.status(500).json(ERR_LOGIN_FAIL);
  }
});

export default handler;
