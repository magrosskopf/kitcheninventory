// models/SlotModel.ts
import mongoose, { Schema, Model } from "mongoose";

export type Slot = {
  _id: string;
  name: string;
  item: string;
  capacity: number;
};

interface SlotDocument extends Slot, Document {}

const SlotSchema: Schema = new Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  item: { type: Schema.Types.ObjectId, ref: "Item", required: true },
});

const SlotModel: Model<SlotDocument> =
  mongoose.models?.Slot || mongoose.model<SlotDocument>("Slot", SlotSchema);

export default SlotModel;
