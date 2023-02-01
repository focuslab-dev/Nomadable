import { convertStringToId } from "./../../modules/StringConverter";
import nextConnect from "next-connect";

import { getNextSequence } from "./../../modules/getNextSequence";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { ERR_SOMETHING, ERR_USER_EXISTS } from "../../modules/ErrorCode";
import { createPassword } from "../../modules/AuthUtils";
import { sendMailUserVerify } from "../../modules/Email";
import { create } from "domain";
import { addNewUserEvent } from "./verify-user";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

export const generateUserId = async (
  userName: string,
  User: any,
  myUserId?: string
): Promise<string> => {
  const candidateName = convertStringToId(userName);

  let number = 0;
  let finalName = "";

  while (!finalName) {
    const tryName = `${candidateName}${number === 0 ? "" : number}`;

    const existingUser = await User.findOne({
      id: tryName,
      _id: { $ne: myUserId },
    }).lean();
    if (!existingUser) {
      finalName = tryName;
      break;
    }
    number += 1;
  }

  return finalName;
};

handler.post(async (req: any, res: any) => {
  const { email, password, userName } = req.body;

  try {
    const User = req.mongoose.model("User");

    const user = await User.findOne({ email });

    if (user && user.verified) {
      return res.status(500).json(ERR_USER_EXISTS);
    }

    const { salt, hashedPassword } = createPassword(password);

    if (user) {
      // when user exists but not verified, overwrite password
      user.password = hashedPassword;
      user.salt = salt;
      if (userName.length > 0) {
        user.name = userName;
      }
      await user.save();
    } else {
      // signup process
      const id = await generateUserId(userName, User);

      await User.create({
        id,
        email,
        password: hashedPassword,
        name: userName.length > 0 ? userName : id,
        salt,
      });

      // await addNewUserEvent(req.mongoose, id);
    }

    await sendMailUserVerify(email, userName, req.mongoose);
    return res.status(200).json("ok");
  } catch (error: any) {
    console.log("error", error);
    return res.status(500).json(ERR_SOMETHING);
  }
});

export default handler;
