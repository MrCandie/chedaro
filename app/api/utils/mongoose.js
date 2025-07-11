import mongoose from "mongoose";

let isConnected = false;

async function connectDb() {
  const db = process.env.NEXT_PUBIC_DATABASE;

  if (isConnected) {
    console.log("Already connected to database");

    return;
  }

  if (mongoose.connections[0].readyState) {
    console.log("Using existing database connection");
    isConnected = true;
    return;
  }
  try {
    await mongoose.connect(db);

    console.log("Database connection successful");

    isConnected = true;
  } catch (error) {
    console.log(error);
  }
}

export default connectDb;
