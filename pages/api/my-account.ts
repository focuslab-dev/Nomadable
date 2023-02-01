import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import mongoose from "mongoose";
import { getUserWithStats } from "../../modules/api/getUserWithStats";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

/**
 * Main
 */

handler.get(async (req: any, res: any) => {
  const { userId } = req;

  try {
    const userWithStats = await getUserWithStats(userId, mongoose, true);

    // get recent checkins
    return res.status(200).json({ userWithStats });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING, placeId: "" });
  }
});

export default handler;
