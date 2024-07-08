// models/PlaceModel.ts
import mongoose, { Document, Schema, Model } from "mongoose";
import { Slot } from "./slot.definitions";

export type Place = {
  _id: string;
  name: string;
  slots?: Slot[];
  items?: string[];
  image?: Buffer;
  userId: string;
};

interface PlaceDocument extends Place, Document {}

const PlaceSchema: Schema = new Schema({
  name: { type: String, required: true },
  slots: [{ type: Schema.Types.ObjectId, ref: "Slot", required: true }],
  items: [{ type: String, required: true }],
  userId: { type: String, required: true },
  image: { type: Buffer }
});

const PlaceModel: Model<PlaceDocument> =
  mongoose.models.Place || mongoose.model<PlaceDocument>("Place", PlaceSchema);

export default PlaceModel;
