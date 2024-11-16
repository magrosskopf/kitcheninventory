import mongoose, { Schema, Model } from "mongoose";
import { Category } from "./category/category.definitions";
import { Place } from "./place.definitions";
import { User } from "./user.definitioins";

export type Item = {
  _id: string;
  name: string;
  amount: number;
  place?: Place;
  category?: Category[];
  user: User;
};

interface ItemDocument extends Item, Document {}

const ItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  place: { type: Schema.Types.ObjectId, ref: "Place", required: false },
  category: [{ type: Schema.Types.ObjectId, ref: "Category", required: false }],
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const ItemModel: Model<ItemDocument> = mongoose.models?.Item || mongoose.model<ItemDocument>("Item", ItemSchema);

export default ItemModel;
// ListItem is the data type for displaying them in the ItemList component
export type ListItem = Omit<Item, ""> & {
  show: boolean;
};
