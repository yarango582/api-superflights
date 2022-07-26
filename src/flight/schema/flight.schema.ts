import * as mongoose from 'mongoose';
import { PASSENGER } from 'src/common/models/models';

export const FlightSchema = new mongoose.Schema(
  {
    pilot: { type: String, require: true },
    airplane: { type: String, require: true },
    destinationCity: { type: String, require: true },
    flightDate: { type: Date, require: true },
    passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: PASSENGER.name }],
  },
  { timestamps: true },
);
