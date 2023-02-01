import { ERR_LOGIN_FAIL } from "./../../modules/ErrorCode";
import nextConnect from "next-connect";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { ERR_SOMETHING } from "../../modules/ErrorCode";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.get(async (req: any, res: any) => {
  const { userId } = req;

  try {
    const User = req.mongoose.model("User");

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(500).json(ERR_LOGIN_FAIL);
    }

    return res.status(200).json({ user });
  } catch (error: any) {
    return res.status(500).json(ERR_SOMETHING);
  }
});

export default handler;
