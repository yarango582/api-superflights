import * as mongoose from 'mongoose';

export const PassengerScheme = new mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
});

PassengerScheme.index({ email: 1 }, { unique: true });
