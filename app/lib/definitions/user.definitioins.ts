import mongoose, { Schema, Model } from "mongoose";

export type User = {
  _id: string;
  name: string;
  email: string;
  password?: string;
};



interface UserDocument extends User, Document {}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: false}
});

const UserModel: Model<UserDocument> =
  mongoose.models.User || mongoose.model<UserDocument>("User", UserSchema);

export default UserModel;
