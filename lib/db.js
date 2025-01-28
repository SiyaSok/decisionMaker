/** @format */

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("connected!!!");
    return;
  }

  if (connectionState === 2) {
    console.log("connecting...");
    return;
  }

  try {
    mongoose.connect(MONGODB_URI, {
      dbName: "test",
      bufferCommands: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export default connect;
