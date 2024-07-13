// lib/mongoose.js
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose 
}

async function connectToDatabase() {
  console.log("MONGODB_URI", MONGODB_URI);
  
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = await mongoose.connect(MONGODB_URI, opts)
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectToDatabase;
