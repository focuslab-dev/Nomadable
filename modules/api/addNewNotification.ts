import { Notification } from "../../redux/slices/notificationSlice";

export const addNewNotification = async (
  mongoose: any,
  notificationItem: Notification
) => {
  const NotificationSchema = mongoose.model("Notification");
  await NotificationSchema.create(notificationItem);
  return;
};

export const removeNotification = async (
  mongoose: any,
  notifyTo: string,
  userId: string,
  notificationType: string
) => {
  const NotificationSchema = mongoose.model("Notification");
  await NotificationSchema.deleteMany({ notifyTo, userId, notificationType });
  return;
};
