import mongoose from "mongoose";
import nextConnect from "next-connect";

import { UserSchema } from "../models/user.model";
import { SequenceSchema } from "../models/sequence.model";
import { OneTimeCodeSchema } from "../models/onetimecode.model";
import { PlaceSchema } from "../models/place.model";
import { CheckInSchema } from "../models/checkin.model";
import { PointSchema } from "../models/point.model";
import { EventSchema } from "../models/event.model";
import { ReviewSchema } from "../models/review.model";
import { AvailabilitySchema } from "../models/availability.model";
import { NotificationSchema } from "../models/notification.model";
import { SavedPlaceSchema } from "../models/savedplace.model";

mongoose.connect(process.env.DB_URL);

async function database(req: any, res: any, next: any) {
  UserSchema(mongoose);
  SequenceSchema(mongoose);
  OneTimeCodeSchema(mongoose);
  PlaceSchema(mongoose);
  CheckInSchema(mongoose);
  PointSchema(mongoose);
  EventSchema(mongoose);
  ReviewSchema(mongoose);
  AvailabilitySchema(mongoose);
  NotificationSchema(mongoose);
  SavedPlaceSchema(mongoose);
  req.mongoose = mongoose;
  next();
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;
