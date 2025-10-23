// lib/config/db.js
import mongoose from "mongoose";

export const ConnectDB = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    await mongoose.connect(
      "mongodb+srv://NextJsBlog:C7Ohdnx9d1ccnDPM@cluster0.ursl5kh.mongodb.net/blog-app?retryWrites=true&w=majority"
    );
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    throw new Error("MongoDB connection failed");
  }
};
