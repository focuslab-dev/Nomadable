import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.get(async (req: any, res: any) => {
  try {
    return res
      .status(200)
      .json({ mapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING });
  }
});

export default handler;
