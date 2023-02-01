import { removeImages } from "./../../modules/ImageStorage";
import { ERR_LOGIN_FAIL } from "./../../modules/ErrorCode";
import nextConnect from "next-connect";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { ERR_SOMETHING } from "../../modules/ErrorCode";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.post(async (req: any, res: any) => {
  const { userId } = req;

  try {
    const User = req.mongoose.model("User");
    const Event = req.mongoose.model("Event");

    if (!userId || userId.length < 1) throw Error;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      throw Error;
    }

    // delete image
    await removeImages([user.picture]);

    // clear user info
    user.name = "Deleted User";
    const iconNum = Math.floor(Math.random() * 8);
    user.id = `${Date.now()}`;
    user.email = "";
    user.picture = `/img/profile-icons/profile-icon${iconNum}.png`;
    user.title = "";
    user.description = "";
    user.link = "";
    user.password = "";
    user.salt = "";
    user.verified = false;
    user.deletedDate = new Date();
    await user.save();

    // clear event
    await Event.deleteMany({ userId });

    return res.status(200).json({});
  } catch (error: any) {
    return res.status(500).json(ERR_SOMETHING);
  }
});

export default handler;
