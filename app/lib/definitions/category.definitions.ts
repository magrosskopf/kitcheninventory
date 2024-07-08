import { Schema, Model } from "mongoose";

export type Category = {
  id: string;
  name: string;
};

interface CategoryDocument extends Category, Document {}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
});

const CategoryModel: Model<CategoryDocument> =
  mongoose.models.Category ||
  mongoose.model<CategoryDocument>("Category", CategorySchema);

export default CategoryModel;
