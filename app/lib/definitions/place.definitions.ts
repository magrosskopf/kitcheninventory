// models/PlaceModel.ts
import mongoose, { Document, Schema, Model } from "mongoose";
import { Slot } from "./slot.definitions";
import { Item } from "./item.definitions";
import { User } from "./user.definitioins";

export type Place = {
  [x: string]: any;
  name: string;
  slots?: Slot[];
  items?: string[];
  image?: Buffer;
  userId: string;
};

export type PopulatedPlace<T extends keyof Place> = Omit<Place, T> & {
  [K in T]: K extends "items"
    ? Item[]
    : K extends "userId"
      ? User
      : K extends "slots"
        ? Slot[]
        : Place[K];
};

// kann so verwendet werden:  useState<PopulatedPlace<'slots' | 'items' | 'userId'> | null>(null);

interface PlaceDocument extends Place, Document {}

const PlaceSchema: Schema = new Schema({
  name: { type: String, required: true },
  slots: [{ type: Schema.Types.ObjectId, ref: "Slot" }],
  items: [{ type: Schema.Types.ObjectId, ref: "Item" }],
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  image: { type: Buffer },
});

const PlaceModel: Model<PlaceDocument> =
  mongoose.models?.Place || mongoose.model<PlaceDocument>("Place", PlaceSchema);

export default PlaceModel;
