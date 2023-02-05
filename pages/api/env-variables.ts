import nextConnect from "next-connect";

import { ERR_SOMETHING } from "../../modules/ErrorCode";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.get(async (req: any, res: any) => {
  try {
    return res.status(200).json({
      gapiClientId: process.env.GAPI_CLIENT_ID,
      mapboxAccessToken: process.env.MAPBOX_ACCESS_TOKEN,
      speedOfMeAccountCode: process.env.SPEED_OF_ME_ACCOUNT_CODE,
    });
  } catch (error: any) {
    return res.status(500).json({ message: ERR_SOMETHING });
  }
});

export default handler;
