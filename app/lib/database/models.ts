// models/ExampleModel.js
import mongoose from "mongoose";

const Item = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.Example ||
  mongoose.model("Example", ExampleSchema);
