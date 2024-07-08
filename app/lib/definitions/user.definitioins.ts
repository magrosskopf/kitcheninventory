import { Schema, Model } from "mongoose";

export type User = {
  id: string;
  name: string;
  email: string;
};

interface UserDocument extends User, Document {}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
});

const UserModel: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;
