import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

/**
 * Main
 */

handler.get(async (req: any, res: any) => {
  const { userId } = req;

  try {
    const Notification = req.mongoose.model("Notification");

    const unseenCnt = await Notification.count({
      notifyTo: userId,
      seen: false,
    });

    return res.status(200).json({ unseenCnt });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
