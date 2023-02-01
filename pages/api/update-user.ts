import { removeImages, saveSingleImage } from "./../../modules/ImageStorage";
import { EditableUser, User } from "./../../redux/slices/userSlice";
import nextConnect from "next-connect";
import databaseMiddleware from "../../middleware/database";
import authenticationMiddleware from "../../middleware/authentication";
import { ERR_SOMETHING } from "../../modules/ErrorCode";
import { generateUserId } from "./signup-with-email";

const handler = nextConnect();

handler.use(databaseMiddleware);
handler.use(authenticationMiddleware);

handler.post(async (req: any, res: any) => {
  const { userId } = req;
  const editableUser: EditableUser = req.body.editableUser;
  const base64 = req.body.base64;

  const { picture, name, id, title, description, link } = editableUser;

  let imageUrl = "";

  if (base64.length > 0) {
    imageUrl = await saveSingleImage(
      `${userId}-${Date.now()}.jpg`,
      base64,
      320
    );
  }

  try {
    const User = req.mongoose.model("User");

    const newId = await generateUserId(id, User, userId);

    const user = await User.findOne({ _id: userId });

    if (imageUrl) {
      await removeImages([user.picture]);
    }

    user.picture = imageUrl || picture;
    user.name = name;
    user.id = newId;
    user.title = title;
    user.description = description;
    user.link = link;

    await user.save();

    const updatedEditableUser = {
      picture: user.picture,
      name: user.name,
      id: user.id,
      title: user.title,
      description: user.description,
      link: user.link,
    };

    return res.status(200).json({ editableUser: updatedEditableUser });
  } catch (error: any) {
    return res.status(500).json(ERR_SOMETHING);
  }
});

export default handler;
