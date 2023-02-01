export const UserSchema = (mongoose: any) => {
  const { Schema } = mongoose;

  const UserSchema = new Schema({
    id: { type: String, index: { unique: true } },
    googleId: { type: String, default: "" },
    email: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    picture: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    password: {
      type: String,
    },
    salt: {
      type: String,
    },
    subscriber: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    deletedDate: {
      type: Date,
      default: null,
    },
    admin: {
      type: Boolean,
      default: false,
    },
    created: {
      type: Date,
      default: Date.now,
    },
  });
  try {
    UserSchema.index(
      {
        email: 1,
      },
      { unique: false }
    );
    mongoose.model("User", UserSchema);
  } catch (error: any) {}
};
