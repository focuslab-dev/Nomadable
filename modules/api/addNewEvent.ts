import { Event } from "../../redux/slices/eventSlice";

export const addNewEvent = async (mongoose: any, eventItem: Event) => {
  const Event = mongoose.model("Event");
  await Event.create(eventItem);
  return;
};
